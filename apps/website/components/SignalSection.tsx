import React from 'react';
import { CheckCircle2, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import type { SignalSectionContent } from '@/types';
import Highlighted from './Highlighted';

// Presentation icons keyed by feature index.
const FEATURE_ICONS = [
  <Zap className="w-6 h-6" key="zap" />,
  <TrendingUp className="w-6 h-6" key="trending" />,
  <ShieldCheck className="w-6 h-6" key="shield" />,
];

interface SignalSectionProps {
  data: SignalSectionContent;
}

const SignalSection: React.FC<SignalSectionProps> = ({ data }) => {
  return (
    <section id="signals" className="py-20 bg-background border-t border-border relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-0 start-0 w-1/3 h-full bg-gradient-to-l from-primary-900/10 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          {data.badge && (
            <span className="text-primary-500 font-semibold tracking-wider uppercase text-sm">{data.badge}</span>
          )}
          <h2 className="mt-2 text-3xl font-extrabold text-foreground sm:text-4xl">
            <Highlighted
              heading={data.heading}
              highlight={data.highlight}
              className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-300"
            />
          </h2>
          {data.subheading && (
            <p className="mt-4 max-w-2xl text-lg md:text-xl text-muted mx-auto leading-relaxed">
              {data.subheading}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
                {data.features.map((feature, index) => (
                  <div className="flex gap-4" key={index}>
                      <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary-500/10 text-primary-500">
                              {FEATURE_ICONS[index % FEATURE_ICONS.length]}
                          </div>
                      </div>
                      <div>
                          <h3 className="text-xl font-bold text-foreground mb-2">{feature.heading}</h3>
                          {feature.body && <p className="text-muted leading-relaxed">{feature.body}</p>}
                      </div>
                  </div>
                ))}

                {data.ctaLabel && (
                  <div className="pt-4">
                      <button className="w-full sm:w-auto bg-surface hover:bg-background text-foreground border border-border font-bold py-3.5 px-8 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm">
                           {data.ctaLabel}
                          <CheckCircle2 className="w-5 h-5 text-primary-500" />
                      </button>
                  </div>
                )}
            </div>

            {/* Stats Card */}
            <div className="relative mt-8 md:mt-0">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl blur opacity-30"></div>
                <div className="relative bg-surface border border-border rounded-2xl p-6 md:p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        {data.statsCardHeading && <h4 className="text-muted text-sm uppercase">{data.statsCardHeading}</h4>}
                        {data.statsCardValue && <div className="text-4xl md:text-5xl font-black text-foreground mt-2 font-mono">{data.statsCardValue}</div>}
                        {data.statsCardSubtext && <div className="text-green-500 text-sm mt-1 font-medium">{data.statsCardSubtext}</div>}
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted">XAUUSD</span>
                            <span className="text-green-400 font-mono">+850 Pips</span>
                        </div>
                        <div className="w-full bg-background h-2 rounded-full overflow-hidden">
                            <div className="bg-primary-500 h-full w-[85%]"></div>
                        </div>

                        <div className="flex justify-between items-center text-sm pt-2">
                            <span className="text-muted">EURUSD</span>
                            <span className="text-green-400 font-mono">+320 Pips</span>
                        </div>
                        <div className="w-full bg-background h-2 rounded-full overflow-hidden">
                            <div className="bg-blue-500 h-full w-[60%]"></div>
                        </div>

                         <div className="flex justify-between items-center text-sm pt-2">
                            <span className="text-muted">BTCUSD</span>
                            <span className="text-green-400 font-mono">+2100 Pips</span>
                        </div>
                        <div className="w-full bg-background h-2 rounded-full overflow-hidden">
                            <div className="bg-primary-500 h-full w-[90%]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default SignalSection;
