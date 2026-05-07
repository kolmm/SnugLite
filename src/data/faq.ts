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
    question: "Can I see a piece before ordering?",
    answer:
      "Selected pieces are available to view at our Bucharest showroom. Reach out via the contact form and we will arrange access.",
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
      "Every SKU is tested in our studio before listing — we log gas-lift drop, fastener loosening, finish wear, and daily-use comfort. Suppliers are vetted on registration, certifications, and audit references; we publish the full spec sheet on every listing.",
  },
];
