'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { BlogPost } from '@/types';
import LocalDate from './LocalDate';
import { Calendar, User, Tag, ArrowRight, Share2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const TEXT = {
  fa: {
    backToArticles: 'بازگشت به مقالات',
    todayFallback: 'امروز',
    analysisTeam: 'تیم تحلیل کیاوش',
    premiumOnly: 'متن کامل این مقاله برای اعضای ویژه در دسترس است.',
    wasHelpful: 'آیا این مطلب مفید بود؟',
    shareWithFriends: 'آن را با دوستان تریدر خود به اشتراک بگذارید.',
    share: 'اشتراک گذاری',
  },
  en: {
    backToArticles: 'Back to articles',
    todayFallback: 'Today',
    analysisTeam: 'Kiawosch Analysis Team',
    premiumOnly: 'The full text of this article is available to premium members only.',
    wasHelpful: 'Was this article helpful?',
    shareWithFriends: 'Share it with your trader friends.',
    share: 'Share',
  },
} as const;

interface BlogPostProps {
  post: BlogPost;
}

const BlogPostDetail: React.FC<BlogPostProps> = ({ post }) => {
  const router = useRouter();
  const { locale } = useLanguage();
  const text = TEXT[locale];
  return (
    <div className="min-h-screen bg-background pt-10 pb-20 transition-colors duration-300">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center text-muted hover:text-primary-500 mb-8 transition-colors"
        >
            <ArrowRight className="w-5 h-5 me-2" />
            {text.backToArticles}
        </button>

        <header className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-500 text-xs font-bold mb-4">
                <Tag className="w-3 h-3" />
                {post.category}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-6 leading-tight">
                {post.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-muted text-sm">
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4"/> <LocalDate value={post.date} fallback={text.todayFallback} /></span>
                <span className="flex items-center gap-2"><User className="w-4 h-4"/> {text.analysisTeam}</span>
            </div>
        </header>

        <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-12 shadow-2xl border border-border">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div className="prose prose-invert prose-lg max-w-none text-muted leading-8">
            <div dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }} />

            {!post.content && (
                <div className="bg-surface p-8 rounded-2xl border border-border mt-8 text-center">
                    <p>{text.premiumOnly}</p>
                </div>
            )}
        </div>

        <hr className="my-12 border-border" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 bg-surface p-6 rounded-2xl border border-border">
            <div>
                <span className="text-foreground font-bold block mb-1">{text.wasHelpful}</span>
                <span className="text-muted text-sm">{text.shareWithFriends}</span>
            </div>
            <button type="button" className="flex items-center gap-2 bg-background hover:bg-muted/20 text-foreground px-6 py-3 rounded-xl transition-colors border border-border">
                <Share2 className="w-4 h-4" />
                {text.share}
            </button>
        </div>

      </article>
    </div>
  );
};

export default BlogPostDetail;
