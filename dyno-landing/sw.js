// Minimal service worker stub (no assets cached)
self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => { self.clients && self.clients.claim && self.clients.claim(); });
self.addEventListener('fetch', (e) => { /* fallback to network */ });
