import { useState } from 'react';
import type { ReactNode } from 'react';
import { Plus, Minus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface AccordionItem {
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  initialOpenIndex?: number;
}

export function Accordion({ items, initialOpenIndex = -1 }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState(initialOpenIndex);

  return (
    <ul className="border-t border-dashed border-stone/60">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <li
            key={item.title}
            className="border-b border-dashed border-stone/60"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : idx)}
              className="w-full flex items-center justify-between gap-6 py-5 text-left hover:text-rust transition-colors"
              aria-expanded={isOpen}
            >
              <span className="caption">{item.title}</span>
              {isOpen ? <Minus size={16} /> : <Plus size={16} />}
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pr-12 text-stone leading-relaxed">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
