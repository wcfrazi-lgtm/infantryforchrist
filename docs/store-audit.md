# Store and competitor review

Reviewed October 21, 2026 (America/New_York). Observations below come from public storefront HTML and the public product/collection feeds. They are not traffic, sales, conversion, or profitability measurements. Competitor mobile interactions and checkout were not independently exercised.

## Infantry for Christ

Sources: [store](https://infantryforchrist.com), [catalog](https://infantryforchrist.com/products.json?limit=250), [collections](https://infantryforchrist.com/collections.json?limit=250), and the merchant-provided Ritual export.

- The live storefront identifies itself as Dawn 8.0.0. The supplied ZIP is Ritual 3.3.1. The redesign uses Ritual's commerce components with a new homepage and visual identity; it does not assume the export matches the current live store.
- The public catalog contains seven products: three hoodies, two caps, and two T-shirts. Only one product has a nonempty product type. The collections feed returned only a Home page collection, in addition to Shopify's all-products route.
- The live homepage has a basic brand heading and Featured products section. The export uses unrelated fashion copy, blank collection selections, and empty footer menu columns. The new homepage removes these defaults.
- Product names such as “Faith 2” and “FGLJ” give shoppers little information about garment type. “Child of God hoodie” is a youth garment with YXS–YXL variants; its title does not say youth.
- Product descriptions are predominantly supplier specifications. The “Make the most of it!” description contains seller-oriented language about printing and profitability. Replace this with useful customer copy.
- The homepage HTML did not include a meta description. The theme supplies Shopify's meta-tag component, but the merchant still needs to set a useful store description in Online Store preferences.
- The contact page returned HTTP 200. Direct checks of `/policies/shipping-policy`, `/policies/refund-policy`, `/policies/privacy-policy`, and `/policies/terms-of-service` each returned HTTP 404. These are launch blockers until accurate policies are saved in Shopify and their links work.
- The live mission emphasizes biblical truth, encouragement, integrity, creativity, compassion, and community. The new copy carries this direction forward without inventing a founding story or charitable promises.

## Comparable stores

| Store | Observed public content | Useful principle for IFC |
| --- | --- | --- |
| [Elevated Faith](https://elevatedfaith.com) | Mission language centered on conversation starters; best sellers and new arrivals; apparel and jewelry; clubs and community/ambassador content; review claims presented on its own site. | State why the brand exists, then make real products easy to discover. Build community over time. IFC should not copy its review counts or add unearned social proof. |
| [HolStrength](https://www.holstrength.com) | Explicit Christian athletic positioning; workout and streetwear collections in its description; best-seller navigation and garment-specific names such as training shorts and oversized tees. | Make the product category and intended use immediately clear. IFC's current basics do not justify premium athletic or technical-performance claims. |
| [Kerusso](https://www.kerusso.com) | Christian apparel messaging; seasonal collections; multiple apparel lines, gifts, and accessories; social content. | Organize the assortment for understandable shopping paths. IFC's seven-product assortment needs a focused shop before a large category menu. |

These stores demonstrate merchandising patterns, not evidence that any one design will increase IFC sales. Do not copy their artwork, photography, claims, or brand language.

## Priorities

1. Fix operational clarity: policies, sizes, youth labeling, product specifications, contact, and shipping costs.
2. Present a distinctive faith-centered identity and real product imagery. Keep the first call to action prominent.
3. Rename and categorize products in Shopify without changing variant identifiers, SKUs, supplier assignments, or existing handles.
4. Publish only after testing the unpublished theme with the real store and supplier configuration.
5. Establish a baseline for product views, add-to-cart, checkout starts, purchases, and mobile performance. Use Shopify analytics and a privacy-appropriate measurement setup; no conversion scripts were added by this redesign.
6. Develop a smaller, coherent product collection and test demand before adding a large catalog. Product development is the next agreed phase.
