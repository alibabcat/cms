import React from 'react';
import Image from 'next/image'

import { ArrowRight, PlayCircle } from 'lucide-react';
import type { HomePageContent } from '@/types';

const Hero = async ({ data }: { data: HomePageContent }) => {
  const hero = data;

  return (
    <div className="relative overflow-hidden bg-background pt-12 pb-20 md:pt-16 md:pb-32 transition-colors duration-300">
        {/* Background Effects */}
        <div className="absolute top-0 end-1/2 w-full -translate-x-1/2 h-full z-0 pointer-events-none">
            <div className="absolute top-[-10%] end-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary-600/20 rounded-full blur-[80px] md:blur-[120px] mix-blend-screen opacity-30 animate-pulse"></div>
            <div className="absolute bottom-[0%] start-[-10%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-blue-600/10 rounded-full blur-[60px] md:blur-[100px] mix-blend-screen opacity-20"></div>
        </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
        
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-start w-full">
          {hero?.badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-surface border border-border text-primary-400 text-xs md:text-sm font-medium mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary-500 animate-ping"></span>
              {hero.badge}
            </div>
          )}

          <h1 className="text-3xl tracking-tight font-extrabold text-foreground sm:text-5xl md:text-6xl lg:leading-tight">
            {hero?.title} <br/>
            {hero?.titleHighlight && (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-300">
                {hero.titleHighlight}
              </span>
            )}
          </h1>

          {hero?.description && (
            <p className="mt-6 text-base md:text-lg text-muted leading-7 md:leading-8 max-w-2xl mx-auto lg:mx-0">
              {hero.description}
            </p>
          )}

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full">
            <a
              href="#courses"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-black bg-primary-500 hover:bg-primary-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] active:scale-95"
            >
              {hero?.primaryCtaLabel}
              <ArrowRight className="ms-2 w-5 h-5 rtl:rotate-180" />
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-border text-base font-medium rounded-xl text-foreground bg-surface/50 hover:bg-surface transition-colors backdrop-blur-sm active:scale-95"
            >
               <PlayCircle className="me-2 w-5 h-5 text-primary-500" />
               {hero?.secondaryCtaLabel}
            </a>
          </div>

          {hero?.stats && hero.stats.length > 0 && (
            <div className="mt-10 md:mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6 md:gap-8 text-muted text-sm font-medium">
              {hero.stats.map((stat, i) => (
                <React.Fragment key={`${stat.label}-${i}`}>
                  {i > 0 && <div className="hidden sm:block w-px h-8 bg-border"></div>}
                  <div className="flex items-center gap-2">
                    <span className="text-foreground font-bold text-xl">{stat.value}</span> {stat.label}
                  </div>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* Image/Visual */}
        <div className="flex-1 w-full max-w-lg lg:max-w-none relative mt-8 lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border bg-surface aspect-video md:aspect-[4/3] group">
                <Image 
                    src={`${process.env.NEXT_PUBLIC_CMS}/api/media/file/photo-1640340434855-6084b1f4901c.jpg`}
                    fill={true}
                    alt="Pendulism Strategy Chart" 
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                
                {/* Floating Card */}
                <div className="absolute bottom-4 start-4 end-4 md:bottom-6 md:start-6 md:end-6 bg-surface/90 backdrop-blur-md p-4 rounded-xl border border-border shadow-xl">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-muted text-[10px] md:text-xs">{hero?.cardTag}</span>
                        <span className="text-green-500 text-[10px] md:text-xs font-bold">{hero?.cardStatus}</span>
                    </div>
                    <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[100%]"></div>
                    </div>
                    <div className="mt-2 text-[10px] md:text-xs text-foreground">{hero?.cardInfo}</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
