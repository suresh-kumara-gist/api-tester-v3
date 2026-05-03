import React from 'react';
import useStore from '../store';
import './Tabs.css';

function Tabs() {
  const { tabs, activeTabId, setActiveTab, addTab, removeTab, updateCurrentTab } = useStore();

  const handleTabNameChange = (tabId, newName) => {
    updateCurrentTab({ name: newName });
  };

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`tab ${activeTabId === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <input
              type="text"
              value={tab.name}
              onChange={(e) => handleTabNameChange(tab.id, e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="tab-name-input"
            />
            {tabs.length > 1 && (
              <button
                className="tab-close"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTab(tab.id);
                }}
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button className="tab-add" onClick={addTab}>
          + New Tab
        </button>
      </div>
    </div>
  );
}

export default Tabs;