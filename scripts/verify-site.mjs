import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";

const pageFiles = [
  "index.html",
  "about.html",
  "services.html",
  "investment-sales.html",
  "seller-representation.html",
  "buyer-representation.html",
  "landlord-representation.html",
  "tenant-representation.html",
  "business-brokerage.html",
  "property-management.html",
  "loan-packaging.html",
  "deal-matrix.html",
  "team.html",
  "contact.html",
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
  "investment-sales.html": "Investment Sales | Magellan CRE",
  "seller-representation.html": "Seller Representation | Magellan CRE",
  "buyer-representation.html": "Buyer Representation | Magellan CRE",
  "landlord-representation.html": "Landlord Representation | Magellan CRE",
  "tenant-representation.html": "Tenant Representation | Magellan CRE",
  "business-brokerage.html": "Business Brokerage | Magellan CRE",
  "property-management.html": "Property Management | Magellan CRE",
  "loan-packaging.html": "Loan Packaging | Magellan CRE",
  "deal-matrix.html": "Commercial Deal Matrix | Magellan CRE",
  "team.html": "Team | Magellan CRE",
  "contact.html": "Contact | Magellan CRE",
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
];

for (const link of serviceDetailLinks) {
  assert.ok(pages["services.html"].includes(`href="${link}"`), `Expected Services directory to link to ${link}`);
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
