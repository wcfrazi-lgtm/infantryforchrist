# Infantry for Christ — store redesign brief

## Confirmed scope

- The merchant supplied a Ritual 3.3.1 export, then authorized replacing any existing theme or design that does not support the store. The implementation replaces its generic homepage while retaining its native commerce components.
- Store domain: infantryforchrist.com.
- Christian apparel, with an existing Shopify print-on-demand supplier integration.
- Merchant-provided Facebook URL: https://www.facebook.com/profile.php?id=61585848563985. Use this exact URL for the store's Facebook link; page contents have not been independently reviewed.
- Prepare the changes for review in an unpublished Shopify theme before any live release.

## Proposed creative direction

Modern Christian streetwear: oversized editorial typography, charcoal, warm cream, and muted olive. Present the name with confidence and emphasize faith, service, and community. Keep the mobile shopping experience direct and legible.

Suggested homepage copy, subject to merchant review:

- Eyebrow: Infantry for Christ
- Heading: Wear your faith. Walk with purpose.
- Supporting copy: Christian apparel for the everyday walk.
- Primary action: Shop the collection
- Secondary action: Our story — only if an actual story page exists.

Use real product and lifestyle photography supplied by the merchant or already attached to products. Do not invent garments, product specifications, reviews, charitable commitments, discounts, or delivery promises.

## Page priorities

1. Home: clear brand statement, real featured products, concise mission, and useful navigation.
2. Collection: readable titles and prices, available filters, mobile sorting, visible stock state.
3. Product: actual variants, accessible size selection, product-specific size guide, material/care information, accurate fulfillment and shipping details, and clear add-to-cart feedback.
4. Cart: editable quantities, clear totals, policy links, and working Shopify checkout handoff.
5. Support: contact method, shipping policy, returns policy, privacy policy, and terms. Merchant must approve operational and legal wording.

Preserve supplier-managed product IDs, variant IDs, SKUs, inventory settings, app blocks, required scripts, and fulfillment connections. Do not regenerate or reimport the catalog during a visual redesign.

## Audit evidence and limitations

The local repository was initially empty. The merchant subsequently supplied a Ritual theme ZIP, and the public storefront and seven-product catalog became accessible. See [the completed audit](store-audit.md) for observed findings.

Initial network requests were denied by the environment proxy. After the network configuration changed, the store, competitor HTML, public catalog, and Shopify-hosted product images were retrieved successfully.

Competitor review: Elevated Faith, HolStrength, and Kerusso. Public messaging and merchandising observations are recorded in the audit; no sales, conversion, or profitability claims were verified.

Full mobile interaction and checkout testing on the new Shopify theme remains outstanding. Use competitor patterns as research; do not copy brand assets or designs.

## Inputs needed for implementation

- Shopify access through the merchant's theme-upload workflow to validate the unpublished theme with the real store.
- Optional merchant-approved logo or editorial imagery; the current design works with the brand name and actual product photography.
- Supplier's actual production, shipping, return, and size guidance before those claims are displayed.

Theme downloads may contain app configuration or embedded third-party credentials. Review privately, keep credentials out of Git, and inspect the export before committing any extracted files.
