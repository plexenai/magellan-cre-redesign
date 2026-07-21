import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";

const pageFiles = [
  "index.html",
  "about.html",
  "services.html",
  "asset-types.html",
  "investment-sales.html",
  "seller-representation.html",
  "buyer-representation.html",
  "landlord-representation.html",
  "tenant-representation.html",
  "business-brokerage.html",
  "property-management.html",
  "loan-packaging.html",
  "listings.html",
  "sale-listings.html",
  "commercial-lease-listings.html",
  "deal-matrix.html",
  "team.html",
  "contact.html",
  "terms-conditions.html",
  "privacy-policy.html",
];

for (const file of pageFiles) {
  assert.ok(existsSync(file), `Expected page file to exist: ${file}`);
}

const pages = Object.fromEntries(pageFiles.map((file) => [file, readFileSync(file, "utf8")]));
const html = pages["index.html"];
const contactHtml = pages["contact.html"];
const css = readFileSync("styles.css", "utf8");
const combined = `${Object.values(pages).join("\n")}\n${css}`;
const normalizedCombined = combined.replace(/\s+/g, " ");

const requiredText = [
  "The Magellan Group",
  "J. Max Hamidi, CCIM",
  "Thirty years of deals. <em>One phone call</em> to start.",
  "Circle K",
  "Tennessee, Mississippi, and Alabama",
  "Marcus &amp; Millichap",
  "Perkins Family Restaurants",
  "13 new Perkins locations",
  "Sperry Commercial Global Affiliates",
  "Loan Packaging",
  "gas stations, convenience stores, and strip centers",
  "leasing, rent collection, vacancy marketing, management, deposits",
  "Commercial Deal Matrix",
  "near seven figures or above",
  "Seller Representation",
  "Buyer Representation",
  "Landlord Representation",
  "Tenant Representation",
  "Business Broker",
  "Listings",
  "Sale Listings",
  "Commercial Lease Listings",
  "Find an <em>eXp listing.</em>",
  "Property Inventory",
  "buildout.com/plugins/1e870beae6e5127a301814258bfa58158c22d2b4/www.magellancre.com/inventory/",
  "Sale <em>Listings.</em>",
  "Lease <em>Listings.</em>",
  "https://www.crexi.com/lease/widgets/483",
  "Active sale inventory",
  "Active lease inventory",
  "Asset Types",
  "Multifamily",
  "Office &amp; Industrial",
  "Land",
  "Hospitality",
  "Special Property &amp; Specialty Realty",
  "Private Equity",
  "Training",
  "Terms &amp; Conditions",
  "Privacy Policy",
  "https://www.linkedin.com/in/j-max-hamidi-ccim-65599624/",
  "Business Sales &amp; Ownership Transitions",
  "Exit Strategy Planning",
  "Confidential Marketing",
  "Retail &amp; Convenience Real Estate",
  "Hard Money &amp; Bank Conversations",
  "Property Evaluation &amp; Financial Analysis",
  "Market Positioning &amp; Pricing Strategy",
  "Buyer Qualification &amp; Investor Targeting",
  "Ginny brings economic development experience",
  "Sprouts, The Lake District, Orange Theory Fitness",
  "Advisor agents &amp; mentees",
  "assets/j-max-hamidi.jpg",
  "assets/ginny-dunn.jpg",
  "assets/favicon.ico",
  "assets/live-office-hallway.webp",
  "assets/live-retail-storefront.webp",
  "assets/live-model-city.webp",
  "assets/manus-advisory-desk.webp",
  "assets/manus-strip-center.webp",
  "hero-slide",
  "Vision",
  "Fun",
  "thoughtful, cooperative, and ethical practices.",
  "How Max Works",
  "Commercial Inquiry",
  "Property or deal type",
  "Estimated value or range",
  "Submitting opens your email app with the details addressed to max@ccim.net.",
  "max@ccim.net",
  "Office: (866) 724-2629",
  "Cell: (901) 606-4941",
];

for (const text of requiredText) {
  assert.ok(normalizedCombined.includes(text), `Expected site to include: ${text}`);
}

const requiredHomeLinks = [
  "about.html",
  "services.html",
  "asset-types.html",
  "deal-matrix.html",
  "team.html",
  "contact.html",
];

for (const href of requiredHomeLinks) {
  assert.ok(html.includes(`href="${href}"`), `Expected homepage to link to ${href}`);
}

const expectedPageTitles = {
  "index.html": "Magellan CRE | J. Max Hamidi, CCIM — Commercial Real Estate Advisor in Germantown, TN",
  "about.html": "About Max | J. Max Hamidi, CCIM | Magellan CRE",
  "services.html": "Services | Magellan CRE",
  "asset-types.html": "Asset Types | Magellan CRE",
  "investment-sales.html": "Investment Sales | Magellan CRE",
  "seller-representation.html": "Seller Representation | Magellan CRE",
  "buyer-representation.html": "Buyer Representation | Magellan CRE",
  "landlord-representation.html": "Landlord Representation | Magellan CRE",
  "tenant-representation.html": "Tenant Representation | Magellan CRE",
  "business-brokerage.html": "Business Broker | Magellan CRE",
  "property-management.html": "Property Management | Magellan CRE",
  "loan-packaging.html": "Hard Money Lending &amp; Loan Packaging | Magellan CRE",
  "listings.html": "Listings | Magellan CRE",
  "sale-listings.html": "Sale Listings | Magellan CRE",
  "commercial-lease-listings.html": "Commercial Lease Listings | Magellan CRE",
  "deal-matrix.html": "Commercial Deal Matrix | Magellan CRE",
  "team.html": "Team | Magellan CRE",
  "contact.html": "Contact | Magellan CRE",
  "terms-conditions.html": "Terms & Conditions | Magellan CRE",
  "privacy-policy.html": "Privacy Policy | Magellan CRE",
};

for (const [file, title] of Object.entries(expectedPageTitles)) {
  assert.ok(pages[file].includes(`<title>${title}</title>`), `Expected ${file} title: ${title}`);
}

const homeOnlyDeepSections = [
  "Circle K brand across Tennessee, Mississippi, and Alabama",
  "Commercial Inquiry",
];

for (const text of homeOnlyDeepSections) {
  assert.ok(!pages["index.html"].includes(text), `Homepage should link to deeper content instead of carrying: ${text}`);
}

assert.ok(existsSync("assets/j-max-hamidi.jpg"), "Expected Max photo asset");
assert.ok(statSync("assets/j-max-hamidi.jpg").size > 1000, "Expected Max photo asset to be a real image");
assert.ok(existsSync("assets/ginny-dunn.jpg"), "Expected Ginny photo asset");
assert.ok(statSync("assets/ginny-dunn.jpg").size > 1000, "Expected Ginny photo asset to be a real image");
assert.ok(existsSync("assets/favicon.ico"), "Expected favicon ico asset");
assert.ok(existsSync("assets/favicon.png"), "Expected favicon png asset");
for (const asset of [
  "assets/live-office-hallway.webp",
  "assets/live-retail-storefront.webp",
  "assets/live-model-city.webp",
  "assets/manus-advisory-desk.webp",
  "assets/manus-strip-center.webp",
  "assets/live-keys-handoff.webp",
  "assets/live-owner-meeting.webp",
  "assets/live-land.webp",
  "assets/manus-advisory-desk.webp",
  "assets/manus-strip-center.webp",
  "assets/service-investment-sales.webp",
  "assets/service-representation.webp",
  "assets/service-retail-advisory.webp",
  "assets/service-property-management.webp",
  "assets/service-loan-packaging.webp",
  "assets/listing-strip-center.webp",
  "assets/listing-highway-frontage.webp",
  "assets/listing-gas-station.webp",
  "assets/magellan-retail-center-ai.webp",
  "assets/manus-brand-logo.webp",
]) {
  assert.ok(existsSync(asset), `Expected visual asset: ${asset}`);
  assert.ok(statSync(asset).size > 1000, `Expected visual asset to be substantial: ${asset}`);
}

const serviceDetailLinks = [
  "investment-sales.html",
  "seller-representation.html",
  "buyer-representation.html",
  "landlord-representation.html",
  "tenant-representation.html",
  "business-brokerage.html",
  "property-management.html",
  "loan-packaging.html",
  "asset-types.html",
];

for (const link of serviceDetailLinks) {
  assert.ok(pages["services.html"].includes(`href="${link}"`), `Expected Services directory to link to ${link}`);
}

const listingsLinks = [
  "listings.html",
  "sale-listings.html",
  "commercial-lease-listings.html",
];

for (const link of listingsLinks) {
  assert.ok(combined.includes(`href="${link}"`), `Expected site to link to ${link}`);
}

for (const [file, pageHtml] of Object.entries(pages)) {
  assert.ok(pageHtml.includes('href="assets/favicon.ico"'), `Expected ${file} to link favicon`);
  assert.ok(pageHtml.includes('href="terms-conditions.html"'), `Expected ${file} footer to link to terms`);
  assert.ok(pageHtml.includes('href="privacy-policy.html"'), `Expected ${file} footer to link to privacy`);
}

const requiredFormNames = [
  "name",
  "email",
  "phone",
  "role",
  "dealType",
  "location",
  "value",
  "timeline",
  "message",
];

for (const name of requiredFormNames) {
  assert.ok(contactHtml.includes(`name="${name}"`), `Expected contact form field name="${name}"`);
}

assert.ok(contactHtml.includes("data-static-form"), "Expected contact form to be clearly marked as static");
assert.ok(!/placeholder/i.test(html), "Visible placeholder language should be removed from HTML");
assert.ok(!/preview/i.test(html), "Public page should not use internal preview language");
assert.ok(!/preview\/prototype/i.test(html), "Public page should not describe itself as a preview/prototype");
assert.ok(!/Not the production replacement/i.test(html), "Public footer should not use internal production disclaimer language");

const removedListingPlaceholders = [
  "Strip Center — Germantown",
  "Retail Space — Highway Frontage",
  "Convenience Store & Gas Station",
  "Multi-tenant retail strip center with strong occupancy",
  "High-visibility retail space with excellent highway frontage",
  "Established convenience store with fuel operations",
];

for (const text of removedListingPlaceholders) {
  assert.ok(!normalizedCombined.includes(text), `Removed placeholder listing should not appear: ${text}`);
}

console.log("Static site verification passed.");
