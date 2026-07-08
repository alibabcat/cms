'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/payload';
import { BlogPost, AnalysisSectionContent } from '@/types';
import LocalDate from './LocalDate';
import Highlighted from './Highlighted';
import { useLanguage } from './LanguageContext';
import { localizedPath } from '@/lib/i18n';
import { Calendar, Clock, ChevronRight, TrendingUp } from 'lucide-react';

interface AnalysisSectionProps {
  data: AnalysisSectionContent;
}

const AnalysisSection: React.FC<AnalysisSectionProps> = ({ data }) => {
  const [analysisPosts, setAnalysisPosts] = useState<BlogPost[]>([]);
  const { locale } = useLanguage();

  useEffect(() => {
    getBlogPosts({ locale })
      .then((all) => setAnalysisPosts(all.filter((post) => post.isLongTerm).slice(0, 3)))
      .catch(console.error);
  }, [locale]);

  return (
    <section className="py-16 md:py-20 bg-background border-t border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-12 gap-6">
            <div>
                {data.badge && (
                  <span className="text-primary-500 font-bold tracking-wider uppercase text-xs md:text-sm mb-2 block">{data.badge}</span>
                )}
                <h2 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight">
                    <Highlighted
                      heading={data.heading}
                      highlight={data.highlight}
                      className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-300"
                    />
                </h2>
                {data.subheading && (
                  <p className="text-muted mt-3 max-w-2xl text-sm md:text-base leading-relaxed">
                      {data.subheading}
                  </p>
                )}
            </div>
            {data.ctaLabel && (
              <Link
                  href={localizedPath('/analysis', locale)}
                  className="hidden md:flex items-center text-muted hover:text-foreground text-sm transition-colors whitespace-nowrap"
              >
                  {data.ctaLabel}
                  <ChevronRight className="w-4 h-4 ms-1 rtl:rotate-180" />
              </Link>
            )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {analysisPosts.map((post) => (
                <Link
                    href={localizedPath(`/blog/${post.id}`, locale)}
                    key={post.id}
                    className="flex flex-col bg-surface rounded-2xl overflow-hidden shadow-lg border border-border hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer group active:scale-[0.98]"
                >
                    <div className="h-48 md:h-56 overflow-hidden relative">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                        {data.freeBadge && (
                          <div className="absolute top-4 start-4 bg-green-500 text-black text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              {data.freeBadge}
                          </div>
                        )}
                        <div className="absolute bottom-0 end-0 start-0 bg-gradient-to-t from-black/90 to-transparent p-4 flex items-center justify-between">
                             <div className="flex items-center gap-2">
                                <img src={post.authorImage} alt={post.author} className="w-8 h-8 rounded-full border-2 border-primary-500 object-cover" />
                                <div className="text-white">
                                    <p className="text-xs font-bold">{post.author}</p>
                                    <p className="text-[10px] text-gray-300">{post.authorRole}</p>
                                </div>
                             </div>
                        </div>
                    </div>

                    <div className="p-5 md:p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-4 text-xs text-muted mb-4 border-b border-border pb-4">
                            <div className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                <LocalDate value={post.date} />
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {post.time}
                            </div>
                        </div>

                        <h3 className="text-base md:text-lg font-bold text-foreground mb-3 group-hover:text-primary-500 transition-colors line-clamp-1">
                            {post.title}
                        </h3>

                        <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-2">
                            {post.excerpt}
                        </p>

                        <div className="mt-auto pt-4 flex items-center justify-between">
                             <span className="text-xs bg-background px-2 py-1 rounded text-muted border border-border">
                                {post.relatedSymbol}
                             </span>
                            <button type="button" className="text-primary-500 text-sm font-medium hover:underline inline-flex items-center">
                                {data.readMoreLabel}
                                <ChevronRight className="w-3 h-3 ms-1 rtl:rotate-180" />
                            </button>
                        </div>
                    </div>
                </Link>
            ))}
        </div>

        {/* Mobile View All Button */}
        {data.ctaLabel && (
          <div className="mt-8 md:hidden">
              <Link
                  href={localizedPath('/analysis', locale)}
                  className="w-full flex items-center justify-center gap-2 bg-surface border border-border text-muted hover:text-foreground py-3 rounded-xl transition-colors font-medium text-sm"
              >
                  {data.ctaLabel}
                  <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default AnalysisSection;
