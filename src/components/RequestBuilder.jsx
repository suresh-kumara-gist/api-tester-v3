import React, { useState } from 'react';
import useStore from '../store';
import { sendRequest } from '../api';
import './RequestBuilder.css';

function RequestBuilder({ onResponse }) {
  const { tabs, activeTabId, updateCurrentTab, setResponse } = useStore();
  const currentTab = tabs.find(tab => tab.id === activeTabId);
  const [savingCollection, setSavingCollection] = useState(false);
  const [collectionName, setCollectionName] = useState('');
  const [headersText, setHeadersText] = useState('');
  const [headersError, setHeadersError] = useState('');
  const { saveCurrentToCollection } = useStore();

  if (!currentTab) return null;

  // Initialize headers text from current tab
  React.useEffect(() => {
    if (currentTab.headers) {
      setHeadersText(JSON.stringify(currentTab.headers, null, 2));
    } else {
      setHeadersText('{\n  "Content-Type": "application/json"\n}');
    }
  }, [currentTab.id, currentTab.headers]);

  const handleSend = async () => {
    const response = await sendRequest(
      currentTab.method,
      currentTab.url,
      currentTab.headers,
      currentTab.body,
      currentTab.authToken
    );
    
    const requestData = {
      method: currentTab.method,
      url: currentTab.url,
      headers: currentTab.headers,
      body: currentTab.body,
      authToken: currentTab.authToken,
      status: response.status,
      responseTime: response.time,
      success: response.success
    };
    
    setResponse(activeTabId, response);
    onResponse(requestData);
  };

  const handleHeadersChange = (text) => {
    setHeadersText(text);
    setHeadersError('');
    
    try {
      // Check if empty or whitespace only
      if (!text.trim()) {
        updateCurrentTab({ headers: {} });
        return;
      }
      
      const headers = JSON.parse(text);
      updateCurrentTab({ headers });
    } catch (e) {
      setHeadersError('Invalid JSON format. Example: {"Content-Type": "application/json"}');
    }
  };

  const handleFormatHeaders = () => {
    try {
      const formatted = JSON.stringify(currentTab.headers, null, 2);
      setHeadersText(formatted);
      setHeadersError('');
    } catch (e) {
      setHeadersError('Cannot format invalid JSON');
    }
  };

  const handleSaveCollection = () => {
    if (collectionName.trim()) {
      saveCurrentToCollection(collectionName);
      setSavingCollection(false);
      setCollectionName('');
    }
  };

  return (
    <div className="request-builder">
      <div className="request-row">
        <select
          value={currentTab.method}
          onChange={(e) => updateCurrentTab({ method: e.target.value })}
          className="method-select"
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
        
        <input
          type="text"
          placeholder="Enter URL"
          value={currentTab.url}
          onChange={(e) => updateCurrentTab({ url: e.target.value })}
          className="url-input"
        />
        
        <button onClick={handleSend} className="send-button">
          Send
        </button>
      </div>

      <div className="request-section">
        <div className="section-header">
          <h3>Headers (JSON format)</h3>
          <div className="header-actions">
            <button onClick={handleFormatHeaders} className="format-button">
              🔧 Format
            </button>
            <button 
              className="save-collection-btn"
              onClick={() => setSavingCollection(true)}
            >
              💾 Save to Collection
            </button>
          </div>
        </div>
        <textarea
          value={headersText}
          onChange={(e) => handleHeadersChange(e.target.value)}
          placeholder='{
  "Content-Type": "application/json",
  "X-Custom-Header": "value"
}'
          rows={6}
          className={`headers-editor ${headersError ? 'error' : ''}`}
        />
        {headersError && <div className="headers-error">{headersError}</div>}
        <div className="headers-hint">
          💡 Tip: Use valid JSON format with double quotes
        </div>
      </div>

      <div className="request-section">
        <div className="section-header">
          <h3>Auth (Bearer Token)</h3>
        </div>
        <input
          type="text"
          placeholder="Enter Bearer Token"
          value={currentTab.authToken}
          onChange={(e) => updateCurrentTab({ authToken: e.target.value })}
          className="auth-input"
        />
      </div>

      <div className="request-section">
        <h3>Body (JSON)</h3>
        <textarea
          value={currentTab.body}
          onChange={(e) => updateCurrentTab({ body: e.target.value })}
          placeholder='{
  "key": "value"
}'
          rows={8}
          className="body-editor"
        />
      </div>

      {savingCollection && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Save to Collection</h3>
            <input
              type="text"
              placeholder="Collection name"
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
              autoFocus
            />
            <div className="modal-actions">
              <button onClick={handleSaveCollection}>Save</button>
              <button onClick={() => setSavingCollection(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RequestBuilder;