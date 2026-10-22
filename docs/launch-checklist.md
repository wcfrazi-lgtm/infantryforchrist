# Launch acceptance checks

Status: local theme implementation and static preview checks completed; unpublished Shopify validation and operational configuration remain pending. Local checks do not establish checkout or supplier readiness.

- [ ] Export and preserve the current theme; work on an unpublished duplicate.
- [ ] Inspect theme source, licensing, app blocks, third-party scripts, and catalog dependencies.
- [x] Review public store/competitor HTML, catalog, and direct policy URL responses; record evidence and limits in the audit.
- [ ] Implement and review desktop and mobile designs with the real catalog.
- [ ] Confirm every linked collection, product, story page, support page, and social URL exists.
- [ ] Verify images, typography, keyboard navigation, focus visibility, contrast, zoom, and mobile overflow.
- [x] Run Shopify Theme Check: zero errors and the same 26 warnings found in the original export; no introduced findings.
- [ ] Test available and sold-out variants, size selection, price changes, add to cart, quantity changes, removal, empty cart, and checkout handoff.
- [ ] Confirm the supplier connection and product/variant mapping remain intact.
- [ ] Verify product-specific size charts, production time, delivery estimates, shipping costs, and return eligibility with the merchant and supplier.
- [ ] Confirm contact information and approve shipping, returns, privacy, and terms pages.
- [ ] Verify Shopify payments, shipping zones/rates, taxes, domain/TLS, and customer notifications in the store's settings.
- [ ] Use Shopify's supported payment test mode for an authorized test order; verify order processing without triggering a paid supplier fulfillment. Confirm supplier test behavior first.
- [ ] Restore production payment settings and remove test content before launch.
- [ ] Review page titles, descriptions, image alt text, and performance using the actual theme preview.
- [x] Validate the local visual preview at 320, 390, 768, and 1440 pixels, image loading, the new guide's keyboard interaction, Facebook URLs, and the custom Liquid branches.
- [x] Run an automated WCAG 2.2 AA accessibility scan on the local design preview; zero reported violations. Full Shopify theme accessibility still needs review.
- [ ] Merchant approves the unpublished theme before publishing it.

Do not describe the store as ready for customers until the relevant operational and storefront checks are completed. Keep the original theme available for rollback.
