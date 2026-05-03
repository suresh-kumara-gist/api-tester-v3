import React, { useState, useEffect } from 'react';
import Tabs from './components/Tabs';
import RequestBuilder from './components/RequestBuilder';
import ResponseViewer from './components/ResponseViewer';
import History from './components/History';
import Collections from './components/Collections';
import useStore from './store';
import './App.css';

function App() {
  const [sidebarTab, setSidebarTab] = useState('history');
  const { addToHistory } = useStore();

  const handleResponse = (response) => {
    addToHistory(response);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>API Tester v3</h2>
        </div>
        <div className="sidebar-tabs">
          <button 
            className={`sidebar-tab ${sidebarTab === 'history' ? 'active' : ''}`}
            onClick={() => setSidebarTab('history')}
          >
            History
          </button>
          <button 
            className={`sidebar-tab ${sidebarTab === 'collections' ? 'active' : ''}`}
            onClick={() => setSidebarTab('collections')}
          >
            Collections
          </button>
        </div>
        <div className="sidebar-content">
          {sidebarTab === 'history' && <History />}
          {sidebarTab === 'collections' && <Collections />}
        </div>
      </div>
      
      <div className="main-content">
        <Tabs />
        <RequestBuilder onResponse={handleResponse} />
        <ResponseViewer />
      </div>
    </div>
  );
}

export default App;