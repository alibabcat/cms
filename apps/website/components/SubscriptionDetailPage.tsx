'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { SignalPackage, SignalHistoryItem } from '@/types';
import { ArrowRight, CheckCircle, Clock, BarChart3, ArrowDown, ArrowUp, Lock, CreditCard, Globe, Zap, Copy, Shield, History, Trophy } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import LocalDate from './LocalDate';

const TEXT = {
  fa: {
    backToPlans: 'بازگشت به لیست پلن‌ها',
    bestSeller: 'پرفروش‌ترین',
    yourInvestment: 'سرمایه‌گذاری شما',
    livePerformance: 'گزارش عملکرد سیگنال‌ها (Signal Performance)',
    netPips: 'برآیند خالص پیپ',
    winCount: 'سیگنال‌های سودده',
    totalSignals: 'کل سیگنال‌های ثبت شده',
    marketSchedule: 'زمان‌بندی مارکت',
    marketScheduleSub: 'ما فقط در زمان‌های نوسان (Volatility) ترید می‌کنیم',
    tokyo: 'توکیو (Tokyo)',
    london: 'لندن (London)',
    newYork: 'نیویورک (New York)',
    volumeDistribution: 'توزیع حجم سیگنال‌ها در سشن‌ها',
    signalHistory: 'تاریخچه سیگنال‌های اخیر',
    noHistory: 'هنوز سیگنالی برای این پلن ثبت نشده است.',
    scrollForMore: 'اسکرول کنید تا تاریخچه بیشتر را ببینید',
    entry: 'Entry',
    exit: 'Exit',
    result: 'Result',
    tpHit: 'حد سود لمس شد',
    slHit: 'حد ضرر فعال شد',
    planFeatures: 'امکانات این پلن',
    finalInvoice: 'صورتحساب نهایی',
    payableAmount: 'مبلغ قابل پرداخت:',
    payAndActivate: 'پرداخت آنلاین و فعال‌سازی',
    securePaymentBadge: 'پرداخت امن با پروتکل SSL و شاپرک',
    postPaymentNote: 'بلافاصله پس از پرداخت، لینک عضویت در کانال VIP به شماره موبایل شما پیامک می‌شود.',
    moneyBackGuarantee: 'تضمین بازگشت وجه',
    moneyBackBody: 'در صورت عدم رضایت از کیفیت سیگنال‌ها در هفته اول',
  },
  en: {
    backToPlans: 'Back to plans list',
    bestSeller: 'Best seller',
    yourInvestment: 'Your investment',
    livePerformance: 'Signal Performance Report',
    netPips: 'Net pips',
    winCount: 'Winning signals',
    totalSignals: 'Total recorded signals',
    marketSchedule: 'Market Schedule',
    marketScheduleSub: 'We only trade during volatile market hours',
    tokyo: 'Tokyo',
    london: 'London',
    newYork: 'New York',
    volumeDistribution: 'Signal volume distribution by session',
    signalHistory: 'Recent Signal History',
    noHistory: 'No signals have been recorded for this plan yet.',
    scrollForMore: 'Scroll to see more history',
    entry: 'Entry',
    exit: 'Exit',
    result: 'Result',
    tpHit: 'Take-profit hit',
    slHit: 'Stop-loss hit',
    planFeatures: 'This plan includes',
    finalInvoice: 'Final Invoice',
    payableAmount: 'Amount payable:',
    payAndActivate: 'Pay online and activate',
    securePaymentBadge: 'Secure payment via SSL and Shaparak',
    postPaymentNote: 'Immediately after payment, the VIP channel membership link is sent to your mobile number via SMS.',
    moneyBackGuarantee: 'Money-back guarantee',
    moneyBackBody: 'If you are not satisfied with the signal quality in the first week',
  },
} as const;

interface SubscriptionDetailPageProps {
    pkg: SignalPackage;
    recentSignals: SignalHistoryItem[];
}

const SubscriptionDetailPage: React.FC<SubscriptionDetailPageProps> = ({ pkg, recentSignals }) => {
    const router = useRouter();
    const { locale } = useLanguage();
    const text = TEXT[locale];

    const netPips = recentSignals.reduce((sum, sig) => sum + (sig.result === 'TP' ? sig.pips : -sig.pips), 0);
    const winCount = recentSignals.filter((sig) => sig.result === 'TP').length;

    return (
        <div className="min-h-screen bg-background pt-10 pb-32 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Back Button */}
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex items-center text-muted hover:text-primary-500 mb-8 transition-colors group"
                >
                    <ArrowRight className="w-5 h-5 me-2 group-hover:-translate-x-1 transition-transform" />
                    {text.backToPlans}
                </button>

                {/* Header */}
                <div className="bg-surface rounded-3xl p-8 md:p-10 border border-border mb-12 shadow-2xl relative overflow-hidden transition-colors duration-300">
                    <div className="absolute top-0 end-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none"></div>
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <div className="flex items-center gap-4 mb-3">
                                <h1 className="text-3xl md:text-5xl font-black text-foreground">{pkg.title}</h1>
                                {pkg.isPopular && (
                                    <span className="bg-gradient-to-r from-primary-500 to-amber-400 text-black text-xs font-bold px-3 py-1 rounded-full animate-pulse shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                                        {text.bestSeller}
                                    </span>
                                )}
                            </div>
                            <p className="text-muted text-lg max-w-2xl mt-4 leading-relaxed border-s-4 border-primary-500 ps-4">
                                {pkg.longDescription || pkg.description}
                            </p>
                        </div>
                        <div className="hidden md:block bg-background/50 p-6 rounded-2xl border border-border backdrop-blur-sm text-center min-w-[200px]">
                            <span className="text-muted text-sm block mb-1">{text.yourInvestment}</span>
                            <span className="text-3xl font-black text-primary-500">{pkg.price}</span>
                        </div>
                    </div>
                </div>

                {/* Main Grid Layout - Content Right, Sidebar Left */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">

                    {/* MAIN CONTENT COLUMN */}
                    <div className="lg:col-span-8 space-y-8 order-1">

                        {/* 1. Performance Dashboard */}
                        <div className="bg-surface rounded-3xl p-8 border border-border shadow-lg transition-colors duration-300">
                            <div className="flex items-center gap-3 mb-8 border-b border-border pb-4">
                                <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                                    <BarChart3 className="w-6 h-6" />
                                </div>
                                <h2 className="text-xl font-bold text-foreground">{text.livePerformance}</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-background p-5 rounded-2xl border border-border text-center relative overflow-hidden hover:border-green-500/30 transition-colors">
                                    <div className="absolute top-0 start-0 w-full h-1 bg-gradient-to-l from-green-500 to-transparent"></div>
                                    <span className="text-muted text-xs font-medium block mb-3">{text.netPips}</span>
                                    <div className="flex items-center justify-center gap-2">
                                        <span className={`text-3xl font-black dir-ltr ${netPips >= 0 ? 'text-green-400' : 'text-red-400'}`}>{netPips >= 0 ? '+' : ''}{netPips}</span>
                                        <span className="text-[10px] text-muted uppercase">Pips</span>
                                    </div>
                                </div>
                                <div className="bg-background p-5 rounded-2xl border border-border text-center relative overflow-hidden hover:border-primary-500/30 transition-colors">
                                     <div className="absolute top-0 start-0 w-full h-1 bg-gradient-to-l from-primary-500 to-transparent"></div>
                                    <span className="text-muted text-xs font-medium block mb-3">{text.winCount}</span>
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="text-3xl font-black text-primary-400 dir-ltr">{winCount}</span>
                                    </div>
                                </div>
                                <div className="bg-background p-5 rounded-2xl border border-border text-center relative overflow-hidden hover:border-purple-500/30 transition-colors">
                                     <div className="absolute top-0 start-0 w-full h-1 bg-gradient-to-l from-purple-500 to-transparent"></div>
                                    <span className="text-muted text-xs font-medium block mb-3">{text.totalSignals}</span>
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="text-3xl font-black text-purple-400 dir-ltr">{recentSignals.length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Schedule & Majority Chart */}
                        <div className="bg-surface rounded-3xl p-8 border border-border shadow-lg transition-colors duration-300">
                             <div className="flex items-center gap-3 mb-8 border-b border-border pb-4">
                                <div className="p-2 bg-primary-500/10 rounded-lg text-primary-500">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-foreground">{text.marketSchedule}</h3>
                                    <p className="text-xs text-muted mt-1">{text.marketScheduleSub}</p>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-8">
                                {/* Text Schedule */}
                                <div className="flex-1 space-y-3 w-full">
                                    <div className="flex items-center justify-between bg-background p-3 px-4 rounded-xl border-s-4 border-pink-500 hover:bg-background/80 transition-colors">
                                        <div className="flex items-center gap-2">
                                            <Globe className="w-4 h-4 text-pink-500" />
                                            <span className="text-foreground text-sm">{text.tokyo}</span>
                                        </div>
                                        <span className="text-muted font-mono text-xs">03:30 - 09:30</span>
                                    </div>
                                    <div className="flex items-center justify-between bg-background p-3 px-4 rounded-xl border-s-4 border-blue-500 hover:bg-background/80 transition-colors">
                                        <div className="flex items-center gap-2">
                                            <Globe className="w-4 h-4 text-blue-500" />
                                            <span className="text-foreground text-sm">{text.london}</span>
                                        </div>
                                        <span className="text-muted font-mono text-xs">10:30 - 13:30</span>
                                    </div>
                                    <div className="flex items-center justify-between bg-background p-3 px-4 rounded-xl border-s-4 border-orange-500 hover:bg-background/80 transition-colors">
                                        <div className="flex items-center gap-2">
                                            <Globe className="w-4 h-4 text-orange-500" />
                                            <span className="text-foreground text-sm">{text.newYork}</span>
                                        </div>
                                        <span className="text-muted font-mono text-xs">16:30 - 20:00</span>
                                    </div>
                                </div>

                                {/* The Majority Chart */}
                                <div className="flex-1 w-full bg-background p-6 rounded-2xl border border-border flex flex-col items-center justify-center relative overflow-hidden">
                                    <h4 className="text-muted text-xs mb-6 z-10 bg-background px-2 rounded">{text.volumeDistribution}</h4>
                                    <div className="absolute inset-0 grid grid-cols-1 gap-4 opacity-10 pointer-events-none">
                                         <div className="border-t border-muted w-full mt-10"></div>
                                         <div className="border-t border-muted w-full mt-10"></div>
                                    </div>

                                    <div className="flex items-end gap-4 h-40 w-full justify-center z-10 pb-4">
                                        {/* Tokyo Bar */}
                                        <div className="relative w-14 bg-pink-500/10 rounded-t-lg h-full flex items-end justify-center group cursor-pointer">
                                            <div className="w-full bg-pink-500 rounded-t-lg h-[25%] relative transition-all duration-500 group-hover:bg-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.3)]">
                                                <span className="absolute -top-7 end-1/2 -translate-x-1/2 text-xs font-bold text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity">25%</span>
                                            </div>
                                            <span className="absolute -bottom-6 text-[10px] text-muted font-bold">Tokyo</span>
                                        </div>
                                        {/* London Bar */}
                                        <div className="relative w-14 bg-blue-500/10 rounded-t-lg h-full flex items-end justify-center group cursor-pointer">
                                            <div className="w-full bg-blue-500 rounded-t-lg h-[40%] relative transition-all duration-500 group-hover:bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                                                <span className="absolute -top-7 end-1/2 -translate-x-1/2 text-xs font-bold text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">40%</span>
                                            </div>
                                            <span className="absolute -bottom-6 text-[10px] text-muted font-bold">London</span>
                                        </div>
                                        {/* NY Bar */}
                                        <div className="relative w-14 bg-orange-500/10 rounded-t-lg h-full flex items-end justify-center group cursor-pointer">
                                            <div className="w-full bg-orange-500 rounded-t-lg h-[75%] relative transition-all duration-500 group-hover:bg-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                                                 <div className="absolute top-0 w-full h-1 bg-white/50 animate-pulse"></div>
                                                <span className="absolute -top-7 end-1/2 -translate-x-1/2 text-xs font-bold text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity">75%</span>
                                            </div>
                                            <span className="absolute -bottom-6 text-[10px] text-muted font-bold">New York</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. History Signals Scroller */}
                        <div className="bg-surface rounded-3xl border border-border shadow-xl overflow-hidden flex flex-col h-[600px] transition-colors duration-300">
                             <div className="p-6 border-b border-border bg-surface z-10 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <History className="text-primary-500 w-5 h-5" />
                                    <h3 className="text-foreground font-bold">{text.signalHistory}</h3>
                                </div>
                                <span className="text-[10px] bg-primary-500/10 text-primary-500 px-2 py-1 rounded border border-primary-500/20">
                                    Live History
                                </span>
                            </div>

                            {/* Scrollable Area */}
                            <div className="overflow-y-auto p-6 space-y-6 flex-1 bg-background scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent transition-colors duration-300">
                                {recentSignals.length === 0 && (
                                    <div className="text-center py-10 text-muted text-sm">{text.noHistory}</div>
                                )}
                                {recentSignals.map((signal) => {
                                    const isWin = signal.result === 'TP';
                                    return (
                                    <div key={signal.id} className="relative group">
                                        <div className={`absolute -inset-0.5 bg-gradient-to-r ${isWin ? 'from-green-600 to-emerald-600' : 'from-red-600 to-orange-600'} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300`}></div>
                                        <div className="relative bg-surface rounded-xl border border-border p-5">

                                            {/* Header */}
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${isWin ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                                                        {signal.type === 'BUY' ? <ArrowUp className="w-5 h-5" /> : <ArrowDown className="w-5 h-5" />}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-foreground font-bold flex items-center gap-2">
                                                            {signal.symbol}
                                                        </h4>
                                                        <div className="flex items-center gap-2 text-xs mt-1">
                                                            <span className={`${signal.type === 'BUY' ? 'text-green-400' : 'text-red-400'} font-bold`}>{signal.type}</span>
                                                            <span className="text-muted">•</span>
                                                            <LocalDate value={signal.date} className="text-muted" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`text-start ${isWin ? 'text-green-500' : 'text-red-500'}`}>
                                                    <div className="text-xs font-bold uppercase mb-1">{text.result}</div>
                                                    <div className="flex items-center justify-end gap-1 text-sm font-black">
                                                        {isWin ? <Trophy className="w-3 h-3 text-amber-400" /> : <Shield className="w-3 h-3" />}
                                                        {isWin ? '+' : '-'}{signal.pips} Pips
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Numbers Grid */}
                                            <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono mb-4 bg-background p-3 rounded-lg border border-border">
                                                <div>
                                                    <span className="text-muted block mb-1">{text.entry}</span>
                                                    <span className="text-blue-400 font-bold">{signal.entryPrice}</span>
                                                </div>
                                                <div className="border-s border-border">
                                                    <span className="text-muted block mb-1">{text.exit}</span>
                                                    <span className={`font-bold ${isWin ? 'text-green-400' : 'text-red-400'}`}>{signal.exitPrice}</span>
                                                </div>
                                            </div>

                                            {/* Result Footer */}
                                            <div className={`p-3 rounded-lg flex justify-between items-center text-xs font-bold ${isWin ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                                <span>{isWin ? text.tpHit : text.slHit}</span>
                                                {isWin && <CheckCircle className="w-4 h-4" />}
                                            </div>
                                        </div>
                                    </div>
                                    );
                                })}

                                {recentSignals.length > 0 && (
                                    <div className="text-center pt-4">
                                        <p className="text-xs text-muted mb-2">{text.scrollForMore}</p>
                                        <div className="w-1 h-8 bg-gradient-to-b from-border to-transparent mx-auto rounded-full"></div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* SIDEBAR COLUMN */}
                    <div className="lg:col-span-4 order-2 lg:order-2 space-y-6 lg:sticky lg:top-24">

                        {/* Features List */}
                        <div className="bg-surface rounded-3xl p-6 border border-border transition-colors duration-300">
                            <h3 className="text-lg font-bold text-foreground mb-6 border-b border-border pb-4 flex items-center gap-2">
                                <Zap className="w-5 h-5 text-primary-500" />
                                {text.planFeatures}
                            </h3>
                            <div className="space-y-4">
                                {pkg.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-2 hover:bg-background rounded-lg transition-colors">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-muted text-sm leading-6 font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Payment Card */}
                        <div className="bg-gradient-to-br from-surface to-background rounded-3xl p-6 border border-primary-500/30 shadow-[0_0_30px_rgba(245,158,11,0.1)] relative overflow-hidden transition-colors duration-300">
                            <div className="absolute top-0 start-0 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl -ms-10 -mt-10 pointer-events-none"></div>

                            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2 relative z-10">
                                <CreditCard className="w-5 h-5 text-primary-500" />
                                {text.finalInvoice}
                            </h3>

                            <div className="flex justify-between items-center mb-6 pb-6 border-b border-border">
                                <span className="text-muted text-sm">{text.payableAmount}</span>
                                <span className="text-2xl font-black text-foreground">{pkg.price}</span>
                            </div>

                            <button type="button" className="w-full bg-gradient-to-r from-primary-500 to-amber-400 hover:from-primary-400 hover:to-amber-300 text-black font-bold py-4 rounded-xl shadow-lg hover:shadow-primary-500/30 transition-all transform hover:-translate-y-1 mb-4 flex items-center justify-center gap-2">
                                {text.payAndActivate}
                                <ArrowDown className="w-4 h-4 animate-bounce" />
                            </button>

                            <div className="bg-surface rounded-xl p-3 flex items-center justify-center gap-3 border border-border">
                                <Lock className="w-3 h-3 text-green-500" />
                                <span className="text-[10px] text-muted">{text.securePaymentBadge}</span>
                            </div>

                            <p className="text-xs text-muted mt-4 text-center leading-5">
                                {text.postPaymentNote}
                            </p>
                        </div>

                        {/* Guarantee Badge */}
                        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 text-center">
                            <span className="text-green-500 font-bold text-sm block mb-1">{text.moneyBackGuarantee}</span>
                            <span className="text-muted text-xs">{text.moneyBackBody}</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionDetailPage;
