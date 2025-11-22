
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const mount = () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    // Retry if root is not yet available (rare race condition)
    setTimeout(mount, 50);
  }
};

// Ensure DOM is fully loaded before mounting
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
