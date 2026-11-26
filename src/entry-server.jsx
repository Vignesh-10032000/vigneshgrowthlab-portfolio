import { renderToString } from 'react-dom/server';
import App from './App';
import MarketingPage from './components/MarketingPage';
export { pages } from './data/marketingPages';
export { marketingHead, sitemap } from './data/seo';

export function renderPage(page) {
  return renderToString(page ? <MarketingPage page={page} /> : <App />);
}
