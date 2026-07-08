'use client'


import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BlogPost } from '@/types';
import LocalDate from './LocalDate';
import { ArrowRight, Search, Tag, Calendar, ChevronRight, BookOpen, Clock, Activity } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { localizedPath } from '@/lib/i18n';

const ALL_CATEGORY = '__all__';

const TEXT = {
  fa: {
    backToHome: 'بازگشت به خانه',
    magazineTitle: 'مجله تخصصی',
    magazineTitleHighlight: 'کیاوش',
    badge: 'دانشنامه معامله‌گری',
    heading: 'تحلیل‌ها و مقالات',
    headingHighlight: 'پاندولیسم',
    hero: 'در اینجا آخرین تحلیل‌های تکنیکال طلا، آموزش‌های روانشناسی و مقالات تخصصی استراتژی پاندولیسم را به صورت دسته‌بندی شده مطالعه کنید.',
    allCategory: 'همه',
    searchPlaceholder: 'جستجو در مقالات...',
    publishedFallback: 'منتشر شده',
    viewSymbol: 'مشاهده نماد در دیدبان',
    readTime: 'زمان مطالعه: ۵ دقیقه',
    readMore: 'ادامه مطلب',
    emptyTitle: 'نتیجه‌ای یافت نشد',
    emptyBody: 'لطفا عبارت دیگری را جستجو کنید یا دسته‌بندی را تغییر دهید.',
  },
  en: {
    backToHome: 'Back to home',
    magazineTitle: 'The Kiawosch',
    magazineTitleHighlight: 'Magazine',
    badge: 'Trading Encyclopedia',
    heading: 'Pendulism',
    headingHighlight: 'Analysis & Articles',
    hero: 'Here you can read the latest gold technical analyses, psychology tutorials, and specialized Pendulism strategy articles, organized by category.',
    allCategory: 'All',
    searchPlaceholder: 'Search articles...',
    publishedFallback: 'Published',
    viewSymbol: 'View symbol on the watch',
    readTime: 'Reading time: 5 min',
    readMore: 'Read more',
    emptyTitle: 'No results found',
    emptyBody: 'Please try a different search term or change the category.',
  },
} as const;

const BlogPage: React.FC<{ posts: BlogPost[] }> = ({ posts }) => {
  const router = useRouter();
  const { locale } = useLanguage();
  const text = TEXT[locale];
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORY);

  // Extract unique categories from posts
  const categories = [ALL_CATEGORY, ...Array.from(new Set(posts.map(post => post.category)))];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.includes(searchTerm) || post.excerpt.includes(searchTerm);
    const matchesCategory = activeCategory === ALL_CATEGORY || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background pb-20 pt-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Navigation */}
        <div className="flex items-center justify-between mb-12">
            <button
                type="button"
                onClick={() => router.back()}
                className="flex items-center text-muted hover:text-primary-500 transition-colors"
            >
                <ArrowRight className="w-5 h-5 me-2" />
                {text.backToHome}
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-foreground hidden md:block">
                {text.magazineTitle} <span className="text-primary-500">{text.magazineTitleHighlight}</span>
            </h1>
        </div>

        {/* Hero Section */}
        <div className="bg-surface rounded-3xl border border-border p-8 md:p-12 mb-12 relative overflow-hidden transition-colors duration-300">
            <div className="absolute top-0 start-0 w-1/3 h-full bg-gradient-to-l from-primary-900/10 to-transparent pointer-events-none"></div>
            <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-500 text-sm font-bold mb-6">
                    <BookOpen className="w-4 h-4" />
                    {text.badge}
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">
                    {text.heading} <span className="text-primary-500">{text.headingHighlight}</span>
                </h2>
                <p className="text-muted text-lg max-w-2xl leading-relaxed">
                    {text.hero}
                </p>
            </div>
        </div>

        {/* Controls: Search & Categories */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <button
                        type="button"
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                            activeCategory === cat
                            ? 'bg-primary-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                            : 'bg-surface text-muted hover:text-foreground hover:bg-muted/10 border border-border'
                        }`}
                    >
                        {cat === ALL_CATEGORY ? text.allCategory : cat}
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-80">
                <input
                    type="text"
                    placeholder={text.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-surface text-foreground border border-border rounded-xl py-3 ps-12 pe-4 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder-muted"
                />
                <Search className="absolute start-4 top-1/2 -translate-y-1/2 text-muted w-5 h-5" />
            </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
                <article
                    key={post.id}
                    onClick={() => router.push(localizedPath(`/blog/${post.id}`, locale))}
                    className="flex flex-col bg-surface rounded-2xl overflow-hidden border border-border hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer group"
                >
                    <div className="h-52 overflow-hidden relative">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
                        <div className="absolute top-4 start-4 bg-black/70 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-700 flex items-center gap-1.5">
                            <Tag className="w-3 h-3 text-primary-500" />
                            {post.category}
                        </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                        {/* Author Info (New) */}
                        {post.author && (
                            <div className="flex items-center gap-3 mb-4 border-b border-border pb-3">
                                <img src={post.authorImage} alt={post.author} className="w-9 h-9 rounded-full object-cover border border-border" />
                                <div>
                                    <p className="text-xs font-bold text-foreground">{post.author}</p>
                                    <p className="text-[10px] text-muted">{post.authorRole}</p>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-between text-xs text-muted mb-4">
                            <div className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                <LocalDate value={post.date} fallback={text.publishedFallback} />
                            </div>
                            {/* Time (New) */}
                            {post.time && (
                                <div className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    {post.time}
                                </div>
                            )}
                        </div>

                        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary-500 transition-colors line-clamp-2">
                            {post.title}
                        </h3>

                        <p className="text-muted text-sm leading-relaxed mb-6 line-clamp-3">
                            {post.excerpt}
                        </p>

                        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                            {/* Symbol Button (New) */}
                            {post.relatedSymbol ? (
                                <Link
                                    href={localizedPath(`/signals/${post.relatedSymbol}`, locale)}
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex items-center gap-1.5 text-[10px] font-bold bg-primary-500/10 text-primary-500 px-3 py-1.5 rounded-lg hover:bg-primary-500 hover:text-black transition-colors border border-primary-500/20"
                                >
                                    <Activity className="w-3 h-3" />
                                    {text.viewSymbol}
                                </Link>
                            ) : (
                                <span className="text-xs text-muted">{text.readTime}</span>
                            )}

                            <button type="button" className="text-foreground text-sm font-bold flex items-center gap-1 group-hover:text-primary-500 transition-all">
                                {text.readMore}
                                <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                            </button>
                        </div>
                    </div>
                </article>
            ))}
        </div>

        {filteredPosts.length === 0 && (
            <div className="text-center py-24 bg-surface rounded-3xl border border-border border-dashed">
                <div className="bg-muted/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-muted" />
                </div>
                <h3 className="text-foreground font-bold text-lg mb-2">{text.emptyTitle}</h3>
                <p className="text-muted text-sm">{text.emptyBody}</p>
            </div>
        )}

      </div>
    </div>
  );
};

export default BlogPage;
