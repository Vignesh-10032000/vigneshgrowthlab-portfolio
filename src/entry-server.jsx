import { renderToString } from 'react-dom/server';
import App from './App';

export function renderHomepage() {
  return renderToString(<App />);
}
