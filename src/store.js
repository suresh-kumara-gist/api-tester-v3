import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loadRequests, saveRequest, deleteRequest, loadCollections, saveCollection, deleteCollection } from './utils/storage';

const useStore = create(
  persist(
    (set, get) => ({
      // Tabs state
      tabs: [{ id: '1', name: 'Untitled Request', method: 'GET', url: '', headers: {}, body: '', authToken: '' }],
      activeTabId: '1',
      
      // Response state
      responses: {},
      
      // History state
      history: [],
      
      // Collections state
      collections: [],
      
      // Actions
      addTab: () => {
        const newId = Date.now().toString();
        const newTab = {
          id: newId,
          name: 'Untitled Request',
          method: 'GET',
          url: '',
          headers: {},
          body: '',
          authToken: ''
        };
        set((state) => ({
          tabs: [...state.tabs, newTab],
          activeTabId: newId
        }));
      },
      
      removeTab: (tabId) => {
        set((state) => {
          const newTabs = state.tabs.filter(tab => tab.id !== tabId);
          let newActiveId = state.activeTabId;
          if (state.activeTabId === tabId && newTabs.length > 0) {
            newActiveId = newTabs[0].id;
          }
          return {
            tabs: newTabs,
            activeTabId: newActiveId
          };
        });
      },
      
      setActiveTab: (tabId) => {
        set({ activeTabId: tabId });
      },
      
      updateCurrentTab: (updates) => {
        set((state) => ({
          tabs: state.tabs.map(tab =>
            tab.id === state.activeTabId ? { ...tab, ...updates } : tab
          )
        }));
      },
      
      setResponse: (tabId, response) => {
        set((state) => ({
          responses: { ...state.responses, [tabId]: response }
        }));
      },
      
      addToHistory: (requestData) => {
        set((state) => {
          const newHistory = [
            {
              id: Date.now().toString(),
              timestamp: new Date().toISOString(),
              ...requestData
            },
            ...state.history
          ].slice(0, 20);
          return { history: newHistory };
        });
      },
      
      loadRequestFromHistory: (request) => {
        set((state) => ({
          tabs: state.tabs.map(tab =>
            tab.id === state.activeTabId
              ? {
                  ...tab,
                  method: request.method,
                  url: request.url,
                  headers: request.headers || {},
                  body: request.body || '',
                  authToken: request.authToken || ''
                }
              : tab
          )
        }));
      },
      
      // Collections
      saveCurrentToCollection: (name) => {
        const state = get();
        const currentTab = state.tabs.find(tab => tab.id === state.activeTabId);
        if (currentTab && name) {
          const newCollection = {
            id: Date.now().toString(),
            name,
            request: {
              method: currentTab.method,
              url: currentTab.url,
              headers: currentTab.headers,
              body: currentTab.body,
              authToken: currentTab.authToken
            },
            createdAt: new Date().toISOString()
          };
          set((state) => ({
            collections: [...state.collections, newCollection]
          }));
          saveCollection(newCollection);
        }
      },
      
      loadCollection: (collection) => {
        set((state) => ({
          tabs: state.tabs.map(tab =>
            tab.id === state.activeTabId
              ? {
                  ...tab,
                  method: collection.request.method,
                  url: collection.request.url,
                  headers: collection.request.headers || {},
                  body: collection.request.body || '',
                  authToken: collection.request.authToken || ''
                }
              : tab
          )
        }));
      },
      
      deleteCollection: (collectionId) => {
        set((state) => ({
          collections: state.collections.filter(c => c.id !== collectionId)
        }));
        deleteCollection(collectionId);
      },
      
      initCollections: (collections) => {
        set({ collections });
      }
    }),
    {
      name: 'api-tester-storage',
      partialize: (state) => ({ 
        history: state.history,
        collections: state.collections,
        tabs: state.tabs
      })
    }
  )
);

export default useStore;