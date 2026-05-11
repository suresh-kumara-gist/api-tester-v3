import React, { useState } from 'react';
import useStore from '../store';
import './ResponseViewer.css';

function ResponseViewer() {
  const { responses, activeTabId } = useStore();
  const response = responses[activeTabId];
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('body');

  if (!response) {
    return (
      <div className="response-viewer">
        <div className="response-empty">
          <p>No response yet. Send a request to see results.</p>
        </div>
      </div>
    );
  }

  const copyToClipboard = () => {
    let content = '';
    if (activeTab === 'body') {
      content = typeof response.body === 'string' 
        ? response.body 
        : JSON.stringify(response.body, null, 2);
    } else {
      content = JSON.stringify(response.headers, null, 2);
    }
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatBody = () => {
    if (typeof response.body === 'string') {
      try {
        const parsed = JSON.parse(response.body);
        return JSON.stringify(parsed, null, 2);
      } catch {
        return response.body;
      }
    }
    return JSON.stringify(response.body, null, 2);
  };

  const formatHeaders = () => {
    return JSON.stringify(response.headers, null, 2);
  };

  const getStatusColor = () => {
    if (response.status >= 200 && response.status < 300) return '#4ec9b0';
    if (response.status >= 400 && response.status < 500) return '#f48771';
    if (response.status >= 500) return '#f48771';
    return '#d4d4d4';
  };

  return (
    <div className="response-viewer">
      <div className="response-header">
        <div className="response-status">
          <span className="status-label">Status:</span>
          <span className="status-code" style={{ color: getStatusColor() }}>
            {response.status} {response.statusText}
          </span>
        </div>
        <div className="response-time">
          <span className="time-label">Time:</span>
          <span className="time-value">{response.time}ms</span>
        </div>
        <button className="copy-button" onClick={copyToClipboard}>
          {copied ? '✓ Copied!' : '📋 Copy'}
        </button>
      </div>

      <div className="response-body">
        <div className="response-tabs">
          <button 
            className={`response-tab ${activeTab === 'body' ? 'active' : ''}`}
            onClick={() => setActiveTab('body')}
          >
            Body
          </button>
          <button 
            className={`response-tab ${activeTab === 'headers' ? 'active' : ''}`}
            onClick={() => setActiveTab('headers')}
          >
            Headers ({Object.keys(response.headers).length})
          </button>
        </div>
        
        <div className="response-content">
          {activeTab === 'body' ? (
            <pre className="response-pre">
              {formatBody()}
            </pre>
          ) : (
            <div className="headers-view">
              {Object.entries(response.headers).map(([key, value]) => (
                <div key={key} className="header-row">
                  <div className="header-key">{key}:</div>
                  <div className="header-value">{value}</div>
                </div>
              ))}
              {Object.keys(response.headers).length === 0 && (
                <div className="no-headers">No headers received</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResponseViewer;