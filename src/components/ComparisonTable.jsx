import { policyPages } from '../data/marketingPages';

export default function ComparisonTable() {
  const pricing = policyPages.find(page => page.path === '/pricing/');
  return <section id="compare" className="mx-auto max-w-5xl px-6 py-20 text-white">
    <h2 className="text-4xl font-bold">Compare starting prices</h2>
    <p className="mt-4 max-w-3xl text-lg">{pricing.intro}</p>
    <p className="my-4">Restaurant POS, online stores, custom applications and automation receive individual quotations.</p>
    <a className="underline" href="/pricing/">View pricing and payment details</a>
  </section>;
}
