import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const css = readFileSync("styles.css", "utf8");
const combined = `${html}\n${css}`;
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
  "Property Evaluation and Financial Analysis",
  "Market Positioning and Pricing Strategy",
  "Buyer Qualification and Investor Targeting",
  "Ginny comes with economic development experience",
  "Sprouts, The Lake District, Orange Theory Fitness",
  "Advisor Agents and Mentees",
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
  assert.ok(html.includes(`id="${id}"`), `Expected section id="${id}"`);
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
  assert.ok(html.includes(`name="${name}"`), `Expected form field name="${name}"`);
}

assert.ok(html.includes("data-static-form"), "Expected form to be clearly marked as static");
assert.ok(!/placeholder/i.test(html), "Visible placeholder language should be removed from HTML");
assert.ok(!/preview/i.test(html), "Public page should not use internal preview language");
assert.ok(!/preview\/prototype/i.test(html), "Public page should not describe itself as a preview/prototype");
assert.ok(!/Not the production replacement/i.test(html), "Public footer should not use internal production disclaimer language");

console.log("Static site verification passed.");
