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
  "Commercial real estate guidance from a broker who knows the deal behind the property.",
  "Circle K",
  "Tennessee, Mississippi, and Alabama",
  "Marcus &amp; Millichap",
  "Perkins Family Restaurants",
  "13 new Perkins locations",
  "Sperry Commercial Global Affiliates",
  "Loan Packaging",
  "gas stations, convenience stores, and strip centers",
  "leasing, rent collection, vacancy marketing, management, and deposits",
  "Commercial Deal Matrix",
  "near seven figures or above",
  "Investment Sales",
  "Seller Representation",
  "Buyer Representation",
  "Landlord Representation",
  "Tenant Representation",
  "Business Brokerage",
  "Listings",
  "Sale Listings",
  "Commercial Lease Listings",
  "Current Availability",
  "Lease Availability",
  "Asset Types",
  "Multifamily",
  "Office and Industrial",
  "Land",
  "Hospitality",
  "Special Property and Specialty Realty",
  "Private Equity",
  "Training",
  "Terms &amp; Conditions",
  "Privacy Policy",
  "https://www.linkedin.com/in/j-max-hamidi-ccim-65599624/",
  "Business Sales and Ownership Transitions",
  "Business Exit Strategy Planning",
  "Confidential Marketing of Businesses",
  "Retail Centers",
  "Hard Money Lending and Bank Conversations",
  "Property Evaluation and Financial Analysis",
  "Market Positioning and Pricing Strategy",
  "Buyer Qualification and Investor Targeting",
  "Ginny comes with economic development experience",
  "Sprouts, The Lake District, Orange Theory Fitness",
  "Advisor Agents and Mentees",
  "assets/j-max-hamidi.jpg",
  "assets/ginny-dunn.jpg",
  "assets/magellan-group-logo.png",
  "assets/favicon.ico",
  "Vision",
  "Fun",
  "Thoughtful, cooperative, and ethical commercial real estate service.",
  "assets/magellan-loop.svg",
  "15s",
  "How Max Works",
  "Commercial inquiry form",
  "Property or deal type",
  "Estimated value or range",
  "Thanks for reaching out. Max will review the details and follow up if this looks like a fit.",
  "max@ccim.net",
  "Office: (866) 724-2629",
  "Cell: (901) 606-4941",
];

for (const text of requiredText) {
  assert.ok(normalizedCombined.includes(text), `Expected site to include: ${text}`);
}

const requiredIds = [
  "about",
  "background",
  "services",
  "matrix",
  "process",
  "proof",
  "team",
  "contact",
];

for (const id of requiredIds) {
  assert.ok(combined.includes(`id="${id}"`), `Expected section id="${id}"`);
}

const expectedPageTitles = {
  "index.html": "Magellan CRE | J. Max Hamidi, CCIM",
  "about.html": "About Max | Magellan CRE",
  "services.html": "Services | Magellan CRE",
  "asset-types.html": "Asset Types | Magellan CRE",
  "investment-sales.html": "Investment Sales | Magellan CRE",
  "seller-representation.html": "Seller Representation | Magellan CRE",
  "buyer-representation.html": "Buyer Representation | Magellan CRE",
  "landlord-representation.html": "Landlord Representation | Magellan CRE",
  "tenant-representation.html": "Tenant Representation | Magellan CRE",
  "business-brokerage.html": "Business Brokerage | Magellan CRE",
  "property-management.html": "Property Management | Magellan CRE",
  "loan-packaging.html": "Loan Packaging | Magellan CRE",
  "listings.html": "Listings | Magellan CRE",
  "sale-listings.html": "Sale Listings | Magellan CRE",
  "commercial-lease-listings.html": "Commercial Lease Listings | Magellan CRE",
  "deal-matrix.html": "Commercial Deal Matrix | Magellan CRE",
  "team.html": "Team | Magellan CRE",
  "contact.html": "Contact | Magellan CRE",
  "terms-conditions.html": "Terms &amp; Conditions | Magellan CRE",
  "privacy-policy.html": "Privacy Policy | Magellan CRE",
};

for (const [file, title] of Object.entries(expectedPageTitles)) {
  assert.ok(pages[file].includes(`<title>${title}</title>`), `Expected ${file} title: ${title}`);
}

const homeOnlyDeepSections = [
  "Circle K brand across Tennessee, Mississippi, and Alabama",
  "Investment Sales",
  "Commercial inquiry form",
];

for (const text of homeOnlyDeepSections) {
  assert.ok(!pages["index.html"].includes(text), `Homepage should link to deeper content instead of carrying: ${text}`);
}

assert.ok(existsSync("assets/j-max-hamidi.jpg"), "Expected Max photo asset");
assert.ok(statSync("assets/j-max-hamidi.jpg").size > 1000, "Expected Max photo asset to be a real image");
assert.ok(existsSync("assets/ginny-dunn.jpg"), "Expected Ginny photo asset");
assert.ok(statSync("assets/ginny-dunn.jpg").size > 1000, "Expected Ginny photo asset to be a real image");
assert.ok(existsSync("assets/magellan-group-logo.png"), "Expected Magellan logo asset");
assert.ok(statSync("assets/magellan-group-logo.png").size > 1000, "Expected Magellan logo asset to be a real image");
assert.ok(existsSync("assets/favicon.ico"), "Expected favicon ico asset");
assert.ok(existsSync("assets/favicon.png"), "Expected favicon png asset");
assert.ok(existsSync("assets/magellan-loop.svg"), "Expected loop background asset");

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
  "deal-type",
  "location",
  "estimated-value",
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

console.log("Static site verification passed.");
