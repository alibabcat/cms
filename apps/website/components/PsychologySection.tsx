import React from 'react';
import { BrainCircuit, HeartPulse, Scale } from 'lucide-react';
import type { PsychologySectionContent } from '@/types';
import Highlighted from './Highlighted';

// Presentation icons keyed by card index.
const CARD_ICONS = [
  <BrainCircuit className="w-6 h-6 text-primary-500" key="brain" />,
  <Scale className="w-6 h-6 text-primary-500" key="scale" />,
  <HeartPulse className="w-6 h-6 text-primary-500" key="heart" />,
];

interface PsychologySectionProps {
  data: PsychologySectionContent;
}

const PsychologySection: React.FC<PsychologySectionProps> = ({ data }) => {
  return (
    <section id="psychology" className="py-20 bg-background relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-16">
          {data.badge && <h2 className="text-base text-primary-500 font-semibold tracking-wide uppercase">{data.badge}</h2>}
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-foreground sm:text-4xl">
            <Highlighted
              heading={data.heading}
              highlight={data.highlight}
              className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-300"
            />
          </p>
          {data.subheading && (
            <p className="mt-4 max-w-2xl text-xl text-muted lg:mx-auto leading-relaxed">
              {data.subheading}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {data.cards.map((card, index) => (
              <div key={index} className="bg-surface rounded-xl p-8 border border-border hover:border-primary-500/50 transition duration-300 group hover:shadow-lg">
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                      {CARD_ICONS[index % CARD_ICONS.length]}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{card.heading}</h3>
                  {card.body && (
                    <p className="text-muted text-sm leading-relaxed">
                        {card.body}
                    </p>
                  )}
              </div>
            ))}
        </div>

        {(data.ctaHeading || data.ctaSubtext || data.ctaLabel) && (
          <div className="mt-12 bg-primary-600/10 border border-primary-600/20 rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-start">
                  {data.ctaHeading && <h4 className="text-xl font-bold text-foreground">{data.ctaHeading}</h4>}
                  {data.ctaSubtext && <p className="text-muted mt-2 text-sm">{data.ctaSubtext}</p>}
              </div>
              {data.ctaLabel && (
                <button className="w-full md:w-auto whitespace-nowrap bg-primary-600 hover:bg-primary-500 text-black font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg active:scale-95">
                    {data.ctaLabel}
                </button>
              )}
          </div>
        )}
      </div>
    </section>
  );
};

export default PsychologySection;
