'use client'


import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MarketSymbol, BlogPost } from '@/types';
import { getBlogPosts } from '@/lib/payload';
import { PAST_VIP_SIGNALS, PAST_VIP_SIGNALS_EN } from '@/constants';
import LocalDate from './LocalDate';
import { useLanguage } from './LanguageContext';
import { localizedPath } from '@/lib/i18n';
import { ArrowRight, TrendingUp, TrendingDown, BarChart2, BookOpen, FileText, Share2, AlertCircle, Trophy, Shield, ArrowUp, ArrowDown, Zap, Headset } from 'lucide-react';

declare const TradingView: any;

const ANALYSIS_CATEGORY_SLUGS = ['technical-analysis', 'long-term-analysis'];

const TEXT = {
  fa: {
    backToList: 'بازگشت به لیست نمادها',
    getConsultation: 'دریافت مشاوره',
    resumeTab: 'رزومه و مشخصات',
    analysisTab: 'تحلیل‌های مرتبط',
    articlesTab: 'مقالات آموزشی',
    about: (name: string) => `درباره ${name}`,
    technicalSummary: 'خلاصه تکنیکال (پاندولیسم)',
    keySpecs: 'مشخصات کلیدی',
    vipAlert: (ticker: string) => `این بخش گزارش عملکرد سیگنال‌های VIP بسته شده برای ${ticker} است.`,
    vipRecent: 'کارنامه VIP اخیر',
    noSignalsYet: 'هنوز سیگنال ثبت شده‌ای برای این نماد وجود ندارد.',
    entry: 'ورود:',
    exit: 'خروج:',
    joinVip: 'عضویت در کانال VIP',
    noAnalysisYet: 'هنوز تحلیل اختصاصی برای این نماد ثبت نشده است.',
    noArticlesFound: 'مقاله آموزشی مرتبطی یافت نشد.',
  },
  en: {
    backToList: 'Back to symbols list',
    getConsultation: 'Get consultation',
    resumeTab: 'Overview & Specs',
    analysisTab: 'Related Analysis',
    articlesTab: 'Educational Articles',
    about: (name: string) => `About ${name}`,
    technicalSummary: 'Technical Summary (Pendulism)',
    keySpecs: 'Key Specifications',
    vipAlert: (ticker: string) => `This section reports the performance of closed VIP signals for ${ticker}.`,
    vipRecent: 'Recent VIP Track Record',
    noSignalsYet: 'No signals have been recorded for this symbol yet.',
    entry: 'Entry:',
    exit: 'Exit:',
    joinVip: 'Join the VIP Channel',
    noAnalysisYet: 'No dedicated analysis has been recorded for this symbol yet.',
    noArticlesFound: 'No related educational articles found.',
  },
} as const;

interface SymbolDetailProps {
  symbol: MarketSymbol;
}

const SymbolDetail: React.FC<SymbolDetailProps> = ({ symbol }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'analysis' | 'articles'>('overview');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const { locale } = useLanguage();
  const text = TEXT[locale];

  useEffect(() => {
    getBlogPosts({ locale }).then(setPosts).catch(console.error);
  }, [locale]);

  // Filter related posts by the stable, locale-independent category slug
  const relatedAnalysis = posts.filter(post =>
    post.relatedSymbol === symbol.ticker && !!post.categorySlug && ANALYSIS_CATEGORY_SLUGS.includes(post.categorySlug)
  );

  const relatedArticles = posts.filter(post =>
    post.relatedSymbol === symbol.ticker && !(post.categorySlug && ANALYSIS_CATEGORY_SLUGS.includes(post.categorySlug))
  );

  // Filter last 3 closed VIP signals for this symbol
  const pastVipSignals = locale === 'en' ? PAST_VIP_SIGNALS_EN : PAST_VIP_SIGNALS;
  const vipSignals = pastVipSignals.filter(sig => sig.symbol === symbol.ticker).slice(0, 3);

  // TradingView Widget Setup
  useEffect(() => {
    if (activeTab === 'overview') {
        const containerId = `tradingview_${symbol.id}`;
        // Clean up previous widget if any
        const existingScript = document.getElementById('tv-widget-script');
        if (existingScript) existingScript.remove();

        const script = document.createElement('script');
        script.id = 'tv-widget-script';
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        script.onload = () => {
            if (typeof TradingView !== 'undefined') {
                new TradingView.widget({
                    "autosize": true,
                    "symbol": symbol.ticker.includes('USD') ? `FX:${symbol.ticker}` : symbol.ticker, // Simple logic, can be refined
                    "interval": "D",
                    "timezone": "Etc/UTC",
                    "theme": "dark",
                    "style": "1",
                    "locale": locale,
                    "toolbar_bg": "#f1f3f6",
                    "enable_publishing": false,
                    "allow_symbol_change": true,
                    "container_id": containerId
                });
            }
        };
        document.body.appendChild(script);
    }
  }, [activeTab, symbol, locale]);

  return (
    <div className="min-h-screen bg-background pb-20 pt-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Navigation */}
        <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center text-muted hover:text-primary-500 mb-8 transition-colors"
        >
            <ArrowRight className="w-5 h-5 me-2" />
            {text.backToList}
        </button>

        {/* Header Section */}
        <div className="bg-surface rounded-3xl border border-border p-6 md:p-10 mb-8 shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-background rounded-full p-4 border border-border shadow-inner">
                        <img src={symbol.icon} alt={symbol.name} className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-4xl font-black text-foreground tracking-tight">{symbol.ticker}</h1>
                            <span className="text-muted text-lg">{symbol.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-3xl font-mono text-foreground font-bold">{symbol.price}</span>
                            <div className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-bold ${symbol.isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                {symbol.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                {symbol.change}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => router.push(localizedPath('/contact', locale))}
                        className="bg-primary-500 text-black font-bold px-6 py-3 rounded-xl hover:bg-primary-400 transition-colors shadow-[0_0_15px_rgba(245,158,11,0.4)] flex items-center gap-2"
                    >
                        <Headset className="w-5 h-5" />
                        {text.getConsultation}
                    </button>
                    <button type="button" aria-label="Share" className="bg-background border border-border text-foreground px-4 py-3 rounded-xl hover:bg-muted/10 transition-colors">
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex gap-4 border-b border-border mb-8 overflow-x-auto pb-1">
            <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-2 px-6 py-3 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${activeTab === 'overview' ? 'border-primary-500 text-primary-500' : 'border-transparent text-muted hover:text-foreground'}`}
            >
                <FileText className="w-4 h-4" />
                {text.resumeTab}
            </button>
            <button
                type="button"
                onClick={() => setActiveTab('analysis')}
                className={`flex items-center gap-2 px-6 py-3 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${activeTab === 'analysis' ? 'border-primary-500 text-primary-500' : 'border-transparent text-muted hover:text-foreground'}`}
            >
                <BarChart2 className="w-4 h-4" />
                {text.analysisTab}
                {relatedAnalysis.length > 0 && <span className="bg-primary-500 text-black text-[10px] px-1.5 py-0.5 rounded-full me-1">{relatedAnalysis.length}</span>}
            </button>
            <button
                type="button"
                onClick={() => setActiveTab('articles')}
                className={`flex items-center gap-2 px-6 py-3 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${activeTab === 'articles' ? 'border-primary-500 text-primary-500' : 'border-transparent text-muted hover:text-foreground'}`}
            >
                <BookOpen className="w-4 h-4" />
                {text.articlesTab}
                {relatedArticles.length > 0 && <span className="bg-primary-500 text-black text-[10px] px-1.5 py-0.5 rounded-full me-1">{relatedArticles.length}</span>}
            </button>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">

            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Real TradingView Chart */}
                        <div className="bg-surface rounded-2xl border border-border overflow-hidden h-[500px]">
                            <div id={`tradingview_${symbol.id}`} className="w-full h-full"></div>
                        </div>

                        {/* Description */}
                        <div className="bg-surface rounded-2xl p-8 border border-border">
                            <h3 className="text-xl font-bold text-foreground mb-4">{text.about(symbol.name)}</h3>
                            <p className="text-muted leading-8 text-lg text-justify">
                                {symbol.description}
                            </p>
                        </div>

                        {/* Technical Summary Box */}
                        <div className="bg-gradient-to-br from-surface to-background rounded-2xl p-8 border border-border relative overflow-hidden">
                             <div className="absolute top-0 start-0 w-1 bg-primary-500 h-full"></div>
                             <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                                <AlertCircle className="text-primary-500 w-5 h-5" />
                                {text.technicalSummary}
                             </h3>
                             <p className="text-foreground/90 font-medium leading-7">
                                {symbol.technicalSummary}
                             </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-surface rounded-2xl p-6 border border-border">
                            <h3 className="text-sm font-bold text-muted mb-4 uppercase tracking-wider">{text.keySpecs}</h3>
                            <div className="space-y-4">
                                {symbol.characteristics.map((char, idx) => (
                                    <div key={idx} className="flex justify-between items-center border-b border-border pb-3 last:border-0 last:pb-0">
                                        <span className="text-muted text-sm">{char.label}</span>
                                        <span className="text-foreground font-bold">{char.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* VIP Performance Report */}
                        <div className="bg-surface rounded-2xl p-6 border border-primary-500/30 shadow-[0_0_20px_rgba(245,158,11,0.1)] relative overflow-hidden">
                            <div className="absolute top-0 end-0 w-full h-1 bg-gradient-to-r from-primary-500 to-amber-300"></div>

                            {/* Alert Banner */}
                            <div className="bg-primary-500/10 border border-primary-500/20 rounded-lg p-3 mb-4 flex gap-2">
                                <Zap className="w-5 h-5 text-primary-500 flex-shrink-0" />
                                <p className="text-xs text-primary-500 leading-5 font-bold">
                                    {text.vipAlert(symbol.ticker)}
                                </p>
                            </div>

                            <h3 className="text-lg font-black text-foreground mb-4 flex items-center gap-2">
                                <Trophy className="text-amber-400 w-5 h-5" />
                                {text.vipRecent}
                            </h3>

                            <div className="space-y-3">
                                {vipSignals.length > 0 ? vipSignals.map((sig) => (
                                    <div key={sig.id} className="bg-background rounded-xl p-3 border border-border flex flex-col gap-2">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${sig.type === 'BUY' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                    {sig.type}
                                                </span>
                                                <LocalDate value={sig.date} className="text-xs text-muted" />
                                            </div>
                                            <span className={`text-xs font-black ${sig.result === 'TP' ? 'text-green-500' : 'text-red-500'}`}>
                                                {sig.result === 'TP' ? `+${sig.pips} Pips` : `${sig.pips} Pips`}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-muted">{text.entry} {sig.entryPrice}</span>
                                            <span className="text-muted">{text.exit} {sig.exitPrice}</span>
                                        </div>
                                        <div className="text-[10px] text-muted border-t border-border pt-2 mt-1 italic">
                                            {sig.description}
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-6 text-muted text-sm">
                                        {text.noSignalsYet}
                                    </div>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={() => router.push(localizedPath('/contact', locale))}
                                className="w-full mt-4 bg-primary-500 text-black text-sm font-bold py-3 rounded-xl hover:bg-primary-400 transition-colors"
                            >
                                {text.joinVip}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ANALYSIS TAB */}
            {activeTab === 'analysis' && (
                <div>
                    {relatedAnalysis.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedAnalysis.map(post => (
                                <div key={post.id} onClick={() => router.push(localizedPath(`/blog/${post.id}`, locale))} className="bg-surface border border-border rounded-xl overflow-hidden cursor-pointer hover:border-primary-500 transition-all hover:shadow-lg group">
                                    <div className="h-48 overflow-hidden">
                                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="p-5">
                                        <LocalDate value={post.date} className="text-xs text-primary-500 font-bold mb-2 block" />
                                        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary-500 transition-colors">{post.title}</h3>
                                        <p className="text-muted text-sm line-clamp-2">{post.excerpt}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-surface rounded-3xl border border-dashed border-border">
                            <p className="text-muted">{text.noAnalysisYet}</p>
                        </div>
                    )}
                </div>
            )}

            {/* ARTICLES TAB */}
            {activeTab === 'articles' && (
                <div>
                     {relatedArticles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {relatedArticles.map(post => (
                                <div key={post.id} onClick={() => router.push(localizedPath(`/blog/${post.id}`, locale))} className="flex bg-surface border border-border rounded-xl overflow-hidden cursor-pointer hover:border-primary-500 transition-all hover:shadow-lg group">
                                    <div className="w-1/3 overflow-hidden">
                                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="w-2/3 p-5 flex flex-col justify-center">
                                        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary-500 transition-colors">{post.title}</h3>
                                        <p className="text-muted text-sm line-clamp-2">{post.excerpt}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-surface rounded-3xl border border-dashed border-border">
                            <p className="text-muted">{text.noArticlesFound}</p>
                        </div>
                    )}
                </div>
            )}

        </div>
      </div>
    </div>
  );
};

export default SymbolDetail;
