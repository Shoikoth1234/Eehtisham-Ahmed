import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Ensure window.fetch has both getter and setter so external scripts/extensions/proxies cannot throw getter-only TypeError
if (typeof window !== 'undefined') {
  try {
    const origFetch = window.fetch;
    let currentFetch = origFetch;
    Object.defineProperty(window, 'fetch', {
      get() {
        return currentFetch;
      },
      set(newFn) {
        currentFetch = newFn;
      },
      configurable: true,
      enumerable: true,
    });
  } catch {
    // Ignore if not reconfigurable
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
