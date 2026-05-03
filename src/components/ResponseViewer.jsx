import React, { useState } from 'react';
import useStore from '../store';
import './ResponseViewer.css';

function ResponseViewer() {
  const { responses, activeTabId } = useStore();
  const response = responses[activeTabId];
  const [copied, setCopied] = useState(false);

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
    const bodyStr = typeof response.body === 'string' 
      ? response.body 
      : JSON.stringify(response.body, null, 2);
    navigator.clipboard.writeText(bodyStr);
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
          {copied ? '✓ Copied!' : '📋 Copy Response'}
        </button>
      </div>

      <div className="response-body">
        <div className="response-tabs">
          <button className="response-tab active">Body</button>
          <button className="response-tab">Headers</button>
        </div>
        
        <div className="response-content">
          <pre className="response-pre">
            {formatBody()}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default ResponseViewer;