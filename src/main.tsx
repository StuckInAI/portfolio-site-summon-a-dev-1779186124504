import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/global.css';
import App from '@/App';
import { PortfolioProvider } from '@/context/PortfolioContext';

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <PortfolioProvider>
        <App />
      </PortfolioProvider>
    </StrictMode>
  );
}
