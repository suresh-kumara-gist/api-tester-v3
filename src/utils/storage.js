const COLLECTIONS_KEY = 'api-tester-collections';
const REQUESTS_KEY = 'api-tester-requests';

export const saveCollection = (collection) => {
  const collections = loadAllCollections();
  const existing = collections.find(c => c.id === collection.id);
  if (existing) {
    Object.assign(existing, collection);
  } else {
    collections.push(collection);
  }
  localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections));
};

export const loadAllCollections = () => {
  const stored = localStorage.getItem(COLLECTIONS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const deleteCollection = (id) => {
  const collections = loadAllCollections();
  const filtered = collections.filter(c => c.id !== id);
  localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(filtered));
};

export const saveRequest = (request) => {
  const requests = loadAllRequests();
  const existing = requests.find(r => r.id === request.id);
  if (existing) {
    Object.assign(existing, request);
  } else {
    requests.push(request);
  }
  localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
};

export const loadAllRequests = () => {
  const stored = localStorage.getItem(REQUESTS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const deleteRequest = (id) => {
  const requests = loadAllRequests();
  const filtered = requests.filter(r => r.id !== id);
  localStorage.setItem(REQUESTS_KEY, JSON.stringify(filtered));
};

export const loadRequests = () => loadAllRequests();
export const loadCollections = () => loadAllCollections();