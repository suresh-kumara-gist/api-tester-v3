import React from 'react';
import useStore from '../store';
import './History.css';

function History() {
  const { history, loadRequestFromHistory } = useStore();

  const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return '#4ec9b0';
    if (status >= 400 && status < 500) return '#f48771';
    if (status >= 500) return '#f48771';
    return '#d4d4d4';
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  if (history.length === 0) {
    return (
      <div className="history-empty">
        <p>No requests yet</p>
        <small>Send a request to see it here</small>
      </div>
    );
  }

  return (
    <div className="history">
      {history.map((item) => (
        <div
          key={item.id}
          className="history-item"
          onClick={() => loadRequestFromHistory(item)}
        >
          <div className="history-header">
            <span className="history-method" data-method={item.method}>
              {item.method}
            </span>
            <span className="history-status" style={{ color: getStatusColor(item.status) }}>
              {item.status}
            </span>
          </div>
          <div className="history-url" title={item.url}>
            {item.url.length > 50 ? item.url.substr(0, 50) + '...' : item.url}
          </div>
          <div className="history-time">
            {formatTime(item.timestamp)}
            <span className="history-duration">{item.responseTime}ms</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default History;