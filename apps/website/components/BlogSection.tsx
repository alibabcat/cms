'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/payload';
import { BlogPost, BlogSectionContent } from '@/types';
import Highlighted from './Highlighted';
import LocalDate from './LocalDate';
import { useLanguage } from './LanguageContext';
import { localizedPath } from '@/lib/i18n';
import { Calendar, ChevronRight } from 'lucide-react';

const TODAY_FALLBACK = { fa: 'امروز', en: 'Today' } as const;

interface BlogSectionProps {
  data: BlogSectionContent;
}

const BlogSection: React.FC<BlogSectionProps> = ({ data }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const { locale } = useLanguage();

  useEffect(() => {
    getBlogPosts({ locale })
      .then((all) => setPosts(all.slice(0, 3)))
      .catch(console.error);
  }, [locale]);

  return (
    <section id="blog" className="py-20 bg-background border-t border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
            <div>
                <h2 className="text-3xl font-extrabold text-foreground">
                  <Highlighted heading={data.heading} highlight={data.highlight} className="text-primary-500" />
                </h2>
            </div>
            {data.archiveLinkLabel && (
              <Link
                  href={localizedPath('/blog', locale)}
                  className="hidden md:flex items-center text-muted hover:text-foreground text-sm transition-colors cursor-pointer"
              >
                  {data.archiveLinkLabel}
                  <ChevronRight className="w-4 h-4 ms-1 rtl:rotate-180" />
              </Link>
            )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
                <Link href={localizedPath(`/blog/${post.id}`, locale)} key={post.id} className="flex flex-col bg-surface rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 cursor-pointer border border-border">
                    <div className="h-48 overflow-hidden relative">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"/>
                        <div className="absolute top-4 start-4 bg-black/60 backdrop-blur text-white text-xs px-2 py-1 rounded">
                            {post.category}
                        </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center text-xs text-muted mb-3">
                            <Calendar className="w-3 h-3 me-1" />
                            <LocalDate value={post.date} fallback={TODAY_FALLBACK[locale]} />
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-3 hover:text-primary-500 transition-colors">
                            {post.title}
                        </h3>
                        <p className="text-muted text-sm leading-relaxed mb-4 flex-1">
                            {post.excerpt}
                        </p>
                        <button type="button" className="text-primary-500 text-sm font-medium hover:underline inline-flex items-center">
                            {data.readMoreLabel}
                            <ChevronRight className="w-3 h-3 ms-1 rtl:rotate-180" />
                        </button>
                    </div>
                </Link>
            ))}
        </div>

        {data.archiveLinkLabelMobile && (
          <div className="mt-8 text-center md:hidden">
              <Link
                  href={localizedPath('/blog', locale)}
                  className="text-muted hover:text-foreground text-sm border border-border px-4 py-2 rounded-lg inline-block"
              >
                  {data.archiveLinkLabelMobile}
              </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
