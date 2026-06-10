import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const active = openIndex === index;
        return (
          <button
            key={item.question}
            type="button"
            onClick={() => setOpenIndex(active ? -1 : index)}
            className="w-full rounded-[1.5rem] border border-charcoal/8 bg-white p-5 text-left shadow-[0_10px_30px_rgba(31,41,51,0.05)]"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="font-semibold text-charcoal">{item.question}</span>
              <ChevronDown className={`shrink-0 transition ${active ? 'rotate-180' : ''}`} />
            </div>
            <div className={`grid overflow-hidden transition-all ${active ? 'grid-rows-[1fr] pt-4' : 'grid-rows-[0fr]'}`}>
              <p className="overflow-hidden text-sm leading-7 text-charcoal/70">{item.answer}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
