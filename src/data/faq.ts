export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Do you ship across the EU?",
    answer:
      "Yes. SnugLite ships to all EU member states. Standard delivery takes five to ten business days depending on destination. We coordinate freight directly with each supplier so larger items arrive insured and assembled where possible.",
  },
  {
    question: "How does pricing work?",
    answer:
      "All prices on the site are quoted in EUR and include VAT. Volume orders for offices over twenty pieces qualify for trade pricing — contact us for a tailored quote.",
  },
  {
    question: "Do you have a physical showroom?",
    answer:
      "No — SnugLite operates as an online curated catalogue. We do not hold stock; orders ship direct from the supplier's EU warehouse. The full spec sheet, dimensions, and materials are published on every listing so you can compare before buying.",
  },
  {
    question: "What is your return policy?",
    answer:
      "Unused items in original packaging may be returned within fourteen days of delivery. See the refund policy page for full conditions.",
  },
  {
    question: "Do you offer lighting?",
    answer:
      "Yes — task lamps, clamp lamps, ceiling fixtures, table lamps, and pendants are listed under the Lighting category. Every unit ships with an EU plug, CE declaration of conformity, and a written warranty.",
  },
  {
    question: "How are products selected?",
    answer:
      "Suppliers are vetted on registration, current certifications (BIFMA, EN 1335, CE, REACH where applicable), and reference checks against existing customer reviews. We require a full technical spec sheet on file before any SKU goes live, and we publish that sheet on every listing.",
  },
];
