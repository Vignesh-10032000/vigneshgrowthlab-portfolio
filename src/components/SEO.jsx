import React, { useEffect } from 'react';
import { SEO_DEFAULTS } from '../data/portfolioData';

const SEO = ({ title, description }) => {
  useEffect(() => {
    document.title = title || SEO_DEFAULTS.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description || SEO_DEFAULTS.description);
    }
  }, [title, description]);

  return null;
};

export default SEO;
