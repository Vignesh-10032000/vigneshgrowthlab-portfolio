import React from 'react'
import ReactDOM from 'react-dom/client'
import MarketingPage from './components/MarketingPage'
import { pageForPath } from './data/marketingPages'
import './styles/index.css'

const root = document.getElementById('root')
const page = pageForPath(window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/?$/, '/'))
function render(content) {
  const app = <React.StrictMode>{content}</React.StrictMode>
  if (root.hasChildNodes()) {
    ReactDOM.hydrateRoot(root, app)
  } else {
    ReactDOM.createRoot(root).render(app)
  }
}

if (page) {
  render(<MarketingPage page={page} />)
} else {
  // Preserve the prerendered homepage while its interactive bundle loads.
  import('./App').then(({ default: App }) => render(<App />)).catch(error => {
    // Keep the prerender readable if the homepage bundle cannot be fetched.
    root.querySelector('[data-site-preloader]')?.remove()
    root.classList.add('homepage-hydration-failed')
    console.error(error)
  })
}
