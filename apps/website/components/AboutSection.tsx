import React from 'react';
import { CheckCircle } from 'lucide-react';
import { INSTITUTE_NAME } from '@/constants';
import type { AboutSectionContent } from '@/types';
import Highlighted from './Highlighted';

interface AboutSectionProps {
  data: AboutSectionContent;
}

const AboutSection: React.FC<AboutSectionProps> = ({ data }) => {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden transition-colors duration-300">
        {/* Decorative elements */}
        <div className="absolute top-0 start-0 w-1/2 h-full bg-primary-900/5 skew-x-12 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">

          <div className="mb-12 lg:mb-0 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
                <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
                    alt="Kiawosch Institute Office"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-6 start-6 text-white">
                    <p className="font-bold text-xl">{data.imageCaptionTitle} {INSTITUTE_NAME}</p>
                    {data.imageCaptionSubtitle && <p className="text-sm text-gray-300">{data.imageCaptionSubtitle}</p>}
                </div>
            </div>
            {/* Floating Experience Badge */}
            {(data.floatBadgeTitle || data.floatBadgeSubtitle) && (
              <div className="absolute -bottom-6 -end-6 bg-primary-500 text-black p-6 rounded-xl shadow-xl hidden md:block">
                  {data.floatBadgeTitle && <p className="text-4xl font-black">{data.floatBadgeTitle}</p>}
                  {data.floatBadgeSubtitle && <p className="text-sm font-bold">{data.floatBadgeSubtitle}</p>}
              </div>
            )}
          </div>

          <div>
            {data.badge && (
              <span className="text-primary-500 font-bold tracking-wider uppercase text-sm">{data.badge}</span>
            )}
            <h2 className="mt-2 text-3xl font-extrabold text-foreground sm:text-4xl mb-6">
              <Highlighted
                heading={data.heading}
                highlight={data.highlight}
                className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-300"
              />
            </h2>
            {data.body && (
              <p className="text-muted text-lg leading-relaxed mb-8 text-justify">
                  {data.body}
              </p>
            )}

            <div className="space-y-4">
                {data.points.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-muted">{item.text}</span>
                    </div>
                ))}
            </div>

            {data.ctaLabel && (
              <div className="mt-10">
                  <a href="#contact" className="text-primary-500 font-bold hover:text-primary-400 border-b-2 border-primary-500 pb-1 inline-flex items-center transition-colors">
                      {data.ctaLabel}
                  </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
