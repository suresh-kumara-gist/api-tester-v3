import React, { useEffect } from 'react';
import useStore from '../store';
import { loadAllCollections } from '../utils/storage';
import './Collections.css';

function Collections() {
  const { collections, loadCollection, deleteCollection, initCollections } = useStore();

  useEffect(() => {
    const saved = loadAllCollections();
    if (saved.length > 0) {
      initCollections(saved);
    }
  }, []);

  if (collections.length === 0) {
    return (
      <div className="collections-empty">
        <p>No saved collections</p>
        <small>Save a request to a collection from the request builder</small>
      </div>
    );
  }

  return (
    <div className="collections">
      <div className="collections-list">
        {collections.map((collection) => (
          <div key={collection.id} className="collection-item">
            <div className="collection-header">
              <span className="collection-name">{collection.name}</span>
              <button
                className="collection-delete"
                onClick={() => deleteCollection(collection.id)}
              >
                Delete
              </button>
            </div>
            <div className="collection-method" data-method={collection.request.method}>
              {collection.request.method}
            </div>
            <div className="collection-url" title={collection.request.url}>
              {collection.request.url.length > 60 
                ? collection.request.url.substr(0, 60) + '...' 
                : collection.request.url}
            </div>
            <button
              className="collection-load"
              onClick={() => loadCollection(collection)}
            >
              Load Request
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Collections;