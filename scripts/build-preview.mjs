import { Liquid } from 'liquidjs';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

export const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const read = (path) => readFile(resolve(root, path), 'utf8');
const execFileAsync = promisify(execFile);
// Python's standard HTTPS client honors the cloud's configured proxy and keeps
// certificate verification enabled. No proxy credentials are read or printed.
async function fetchBytes(url) {
  const { stdout } = await execFileAsync('python3', ['-c', 'import sys,urllib.request; sys.stdout.buffer.write(urllib.request.urlopen(sys.argv[1],timeout=30).read())', url], { encoding: 'buffer', maxBuffer: 20 * 1024 * 1024 });
  return stdout;
}
const parseJson = (text) => JSON.parse(text.replace(/^\/\*[\s\S]*?\*\/\s*/, ''));
export const escape = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const engine = new Liquid();
engine.registerFilter('asset_url', () => '');
engine.registerFilter('stylesheet_tag', () => '');
engine.registerFilter('image_url', (image) => image?.src || image || '');
engine.registerFilter('image_tag', (src, ...args) => {
  const attrs = Object.fromEntries(args.filter(Array.isArray));
  return `<img src="${escape(src)}" alt="FGNE Fear God Nothing Else T-shirt" width="800" height="800" class="${escape(attrs.class)}">`;
});

// This renderer exercises the new sections. It does not emulate Shopify checkout,
// app blocks, theme blocks, or Ritual's native header/product-card runtime.
export async function renderSection(name, settings = {}, context = {}) {
  const source = await read(`theme/sections/${name}.liquid`);
  const schema = JSON.parse(source.match(/{% schema %}([\s\S]*?){% endschema %}/)[1]);
  const defaults = Object.fromEntries(schema.settings.filter((s) => s.default !== undefined).map((s) => [s.id, s.default]));
  return engine.parseAndRender(source.replace(/{% schema %}[\s\S]*?{% endschema %}/, ''), {
    section: { id: name, settings: { ...defaults, ...settings } },
    routes: { all_products_collection_url: 'https://infantryforchrist.com/collections/all' },
    shop: {}, pages: {}, ...context,
  });
}

async function loadProducts() {
  await mkdir(resolve(root, '.cache/images'), { recursive: true });
  let products;
  try { products = JSON.parse(await read('.cache/products.json')); }
  catch {
    products = JSON.parse((await fetchBytes('https://infantryforchrist.com/products.json?limit=250')).toString()).products;
    await writeFile(resolve(root, '.cache/products.json'), JSON.stringify(products, null, 2));
  }
  for (const p of products) {
    if (!p.images?.[0]?.src) continue;
    const path = resolve(root, `.cache/images/${p.handle}.jpg`);
    let image;
    try { image = await readFile(path); }
    catch {
      image = await fetchBytes(`${p.images[0].src}&width=800`);
      await writeFile(path, image);
    }
    p.previewImage = `data:image/jpeg;base64,${image.toString('base64')}`;
  }
  return products;
}

export async function build() {
  const products = await loadProducts();
  const template = parseJson(await read('theme/templates/index.json'));
  const selected = products.find((p) => p.handle === template.sections.ifc_hero.settings.product);
  const heroProduct = selected && { ...selected, featured_image: { src: selected.previewImage }, url: `https://infantryforchrist.com/products/${selected.handle}` };
  const hero = await renderSection('ifc-hero', { ...template.sections.ifc_hero.settings, product: heroProduct, shop_link: 'https://infantryforchrist.com/collections/all' });
  const mission = await renderSection('ifc-mission', template.sections.ifc_mission.settings);
  const guide = await renderSection('ifc-shopping-guide', {}, { pages: { contact: { url: 'https://infantryforchrist.com/pages/contact' } } });
  const cards = products.map((p) => {
    const price = Math.min(...p.variants.map((v) => Number(v.price)));
    const varies = new Set(p.variants.map((v) => v.price)).size > 1;
    return `<article class="preview-card"><a href="https://infantryforchrist.com/products/${escape(p.handle)}"><div class="preview-card__image"><img src="${p.previewImage || ''}" alt="${escape(p.title)}" width="800" height="800" loading="lazy"></div><h3>${escape(p.title)}</h3><p>${varies ? 'From ' : ''}$${price.toFixed(2)} USD</p></a></article>`;
  }).join('');
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Infantry for Christ — design preview</title><style>
  :root{--font-heading--family:Arial,Helvetica,sans-serif;--font-body--family:Arial,Helvetica,sans-serif}*{box-sizing:border-box}body{margin:0;color:#20231e;background:#f5f2e9;font-family:Arial,Helvetica,sans-serif}a{color:inherit}a:focus-visible{outline:3px solid currentColor;outline-offset:4px}.visually-hidden{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}.preview-header{display:flex;justify-content:space-between;align-items:center;gap:20px;padding:25px 5vw;border-bottom:1px solid #20231e25}.preview-header>a{font-size:15px;font-weight:800;text-transform:uppercase;text-decoration:none;letter-spacing:-.02em}.preview-nav{display:flex;gap:25px;align-items:center;font-size:12px}.preview-nav a{text-decoration:none;min-height:44px;display:inline-flex;align-items:center}.preview-products{padding:70px 5vw}.preview-products__heading{display:flex;align-items:end;justify-content:space-between;gap:20px;margin-bottom:28px}.preview-products h2{font-size:clamp(26px,3vw,44px);text-transform:uppercase;letter-spacing:-.045em;margin:0}.preview-products__heading>a{font-size:12px;text-underline-offset:5px;white-space:nowrap}.preview-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:32px 20px}.preview-card a{text-decoration:none}.preview-card__image{background:#fff;aspect-ratio:1;display:flex;align-items:center}.preview-card img{width:100%;height:auto;object-fit:contain}.preview-card h3{font-size:13px;text-transform:uppercase;line-height:1.5;margin:16px 0 4px}.preview-card p{font-size:13px;margin:0}.preview-footer{padding:35px 5vw;background:#e5e9d7;display:flex;justify-content:space-between;gap:20px;font-size:12px;flex-wrap:wrap}.preview-footer a{min-height:44px;display:inline-flex;align-items:center}.preview-skip{position:absolute;top:-100px;left:10px;background:#fff;padding:10px;z-index:99}.preview-skip:focus{top:10px}@media(max-width:700px){.preview-header{padding:16px 20px}.preview-header>a{max-width:140px;line-height:1.2}.preview-nav{gap:18px}.preview-nav .preview-optional{display:none}.preview-products{padding:40px 20px}.preview-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:24px 12px}.preview-card h3{font-size:11px}.preview-products__heading{align-items:start}}
  ${await read('theme/assets/ifc-brand.css')}
  </style></head><body><a class="preview-skip" href="#main">Skip to content</a><header class="preview-header"><a href="https://infantryforchrist.com">Infantry for Christ<span aria-hidden="true"> ✦</span></a><nav class="preview-nav" aria-label="Main navigation"><a href="https://infantryforchrist.com/collections/all">Shop all</a><a class="preview-optional" href="#ifc-mission">Our purpose</a><a href="https://infantryforchrist.com/cart">Cart</a></nav></header><main id="main">${hero}<section class="preview-products" aria-labelledby="products-heading"><div class="preview-products__heading"><h2 id="products-heading">Wear what you stand for.</h2><a href="https://infantryforchrist.com/collections/all">Shop all <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false"><path d="M4 16 16 4M4 4h12v12" stroke="currentColor" stroke-width="1.5"/></svg></a></div><div class="preview-grid">${cards}</div></section>${mission}${guide}</main><footer class="preview-footer"><span>Infantry for Christ / Faith in the everyday.</span><a href="https://www.facebook.com/profile.php?id=61585848563985" target="_blank" rel="noopener noreferrer">Find us on Facebook <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false"><path d="M4 16 16 4M4 4h12v12" stroke="currentColor" stroke-width="1.5"/></svg></a><a href="https://infantryforchrist.com/pages/contact">Contact</a></footer></body></html>`;
  await mkdir(resolve(root, 'dist'), { recursive: true });
  await writeFile(resolve(root, 'dist/design-preview.html'), html);
  console.log(`Built standalone design preview with ${products.length} real catalog products. Native commerce requires a Shopify theme preview.`);
}
if (process.argv[1] === fileURLToPath(import.meta.url)) await build();
