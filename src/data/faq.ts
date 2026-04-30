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
      "Some pieces are available to view at our partner showrooms in Milan and Bucharest. Reach out via the contact form and we will arrange access.",
  },
  {
    question: "What is your return policy?",
    answer:
      "Unused items in original packaging may be returned within fourteen days of delivery. See the refund policy page for full conditions.",
  },
  {
    question: "Do you offer lighting?",
    answer:
      "A curated lighting range is in development and will launch alongside our autumn collection. Sign up for updates to be notified first.",
  },
  {
    question: "How are products selected?",
    answer:
      "Every piece in the catalog is chosen for material honesty, build quality, and longevity. We work with a small group of European manufacturers and visit production sites annually.",
  },
];
