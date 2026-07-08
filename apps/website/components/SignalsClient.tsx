'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { SignalPackage } from '@/types';
import { CheckCircle, Zap, ShieldCheck, TrendingUp, AlertTriangle, ArrowRight, Lock } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { t } from '@/lib/ui-strings';
import { localizedPath } from '@/lib/i18n';

const TEXT = {
  fa: {
    heroTitle: 'خدمات مشاوره و',
    heroTitleHighlight: 'سیگنال VIP',
    heroBody: 'با عضویت در بخش مشاوره VIP، دقیقاً همان معاملاتی را انجام دهید که استاد کیاوش روی حساب شخصی خود اجرا می‌کند.',
    heroBodyBold: 'بدون نیاز به تحلیل، فقط از مشاوره ما استفاده کنید.',
    monthlyPips: '+۱۵۰۰ پیپ سود ماهانه',
    riskReward: 'ریسک به ریوارد ۱:۳',
    scalp: 'اسکالپ طلا و بیت‌کوین',
    whyDifferentTitle: 'چرا خدمات مشاوره ما متفاوت است؟',
    whyDifferentBody: 'بیشتر کانال‌های سیگنال از اندیکاتورهای تاخیری استفاده می‌کنند، اما ما از منطق پاندولیسم بهره می‌بریم. ما منتظر می‌مانیم تا قیمت به نقطه "عدم تعادل" برسد و سپس خلاف جهت جمعیت وارد می‌شویم. این یعنی ورود در جایی که دیگران استاپ می‌خورند.',
    whyDifferentHighlight: 'منطق پاندولیسم',
    qualityGuarantee: 'تضمین کیفیت',
    qualityGuaranteeBody: 'اگر در پایان دوره اشتراک، برآیند پیپ‌های کانال مثبت نبود، اشتراک ماه بعد شما رایگان تمدید خواهد شد.',
    qualityGuaranteeHighlight: 'رایگان',
    winRateValue: '۸۵٪',
    onlineSupportValue: '۲۴/۷',
    dailySignalsValue: '۵+',
    avgRiskRewardValue: '۱:۳',
    winRate6Month: 'وین‌ریت ۶ ماه اخیر',
    onlineSupport: 'پشتیبانی آنلاین',
    dailySignals: 'سیگنال روزانه',
    avgRiskReward: 'میانگین ریسک/ریوارد',
    choosePlan: 'پلن مشاوره مناسب خود را انتخاب کنید',
    mostPopular: 'محبوب‌ترین',
    viewDetailsAndBuy: 'مشاهده جزئیات و خرید',
    securePayment: 'پرداخت امن و تحویل آنی',
    securePaymentBody: 'لینک کانال تلگرام بلافاصله پس از پرداخت برای شما پیامک می‌شود. تمام پرداخت‌ها از طریق درگاه امن بانکی انجام می‌شود.',
  },
  en: {
    heroTitle: 'Consultation &',
    heroTitleHighlight: 'VIP Signal Services',
    heroBody: 'By joining the VIP consultation section, you make exactly the same trades that Master Kiawosch executes on his own personal account.',
    heroBodyBold: 'No need for analysis, just use our consultation.',
    monthlyPips: '+1,500 pips monthly profit',
    riskReward: 'Risk-to-reward 1:3',
    scalp: 'Gold and Bitcoin scalping',
    whyDifferentTitle: 'Why is our consultation service different?',
    whyDifferentBody: 'Most signal channels use lagging indicators, but we rely on Pendulism logic. We wait for the price to reach a point of "disequilibrium" and then enter against the crowd. This means entering exactly where others get stopped out.',
    whyDifferentHighlight: 'Pendulism logic',
    qualityGuarantee: 'Quality Guarantee',
    qualityGuaranteeBody: 'If the channel\'s net pips are not positive by the end of your subscription period, your next month\'s subscription will be renewed for free.',
    qualityGuaranteeHighlight: 'free',
    winRateValue: '85%',
    onlineSupportValue: '24/7',
    dailySignalsValue: '5+',
    avgRiskRewardValue: '1:3',
    winRate6Month: 'Win rate, last 6 months',
    onlineSupport: 'Online support',
    dailySignals: 'Daily signals',
    avgRiskReward: 'Average risk/reward',
    choosePlan: 'Choose the consultation plan that fits you',
    mostPopular: 'Most popular',
    viewDetailsAndBuy: 'View details and buy',
    securePayment: 'Secure payment & instant delivery',
    securePaymentBody: 'The Telegram channel link is sent to you via SMS immediately after payment. All payments are processed through a secure bank gateway.',
  },
} as const;

export default function SignalsClient({ packages }: { packages: SignalPackage[] }) {
  const router = useRouter();
  const { locale } = useLanguage();
  const text = TEXT[locale];
  return (
    <div className="min-h-screen bg-background pb-20 pt-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <button
                type="button"
                onClick={() => router.back()}
                className="flex items-center text-muted hover:text-primary-500 mb-8 transition-colors"
            >
                <ArrowRight className="w-5 h-5 me-2" />
                {t(locale, 'backToHome')}
            </button>

            {/* Hero Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-surface to-background border border-border p-8 md:p-16 mb-16 text-center">
                 <div className="absolute top-0 start-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                 <div className="absolute -top-24 -start-24 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl"></div>

                 <h1 className="relative z-10 text-4xl md:text-6xl font-black text-foreground mb-6">
                    {text.heroTitle} <span className="text-primary-500">{text.heroTitleHighlight}</span>
                 </h1>
                 <p className="relative z-10 text-xl text-muted max-w-3xl mx-auto leading-relaxed">
                    {text.heroBody}
                    <span className="text-foreground font-bold"> {text.heroBodyBold}</span>
                 </p>

                 <div className="relative z-10 flex flex-wrap justify-center gap-8 mt-10">
                    <div className="flex items-center gap-2 bg-background/50 px-4 py-2 rounded-lg border border-border">
                        <TrendingUp className="text-green-500 w-5 h-5" />
                        <span className="text-muted font-mono text-sm">{text.monthlyPips}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-background/50 px-4 py-2 rounded-lg border border-border">
                        <ShieldCheck className="text-primary-500 w-5 h-5" />
                        <span className="text-muted font-mono text-sm">{text.riskReward}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-background/50 px-4 py-2 rounded-lg border border-border">
                        <Zap className="text-amber-400 w-5 h-5" />
                        <span className="text-muted font-mono text-sm">{text.scalp}</span>
                    </div>
                 </div>
            </div>

            {/* Strategy Explanation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-foreground">{text.whyDifferentTitle}</h2>
                    <p className="text-muted leading-8 text-lg">
                        {text.whyDifferentBody}
                    </p>
                    <div className="bg-surface p-6 rounded-xl border-e-4 border-primary-500">
                        <h4 className="text-foreground font-bold mb-2 flex items-center gap-2">
                            <AlertTriangle className="text-primary-500 w-5 h-5" />
                            {text.qualityGuarantee}
                        </h4>
                        <p className="text-sm text-muted">
                            {text.qualityGuaranteeBody}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-surface p-6 rounded-2xl border border-border text-center hover:border-primary-500 transition-colors">
                        <div className="text-4xl font-black text-foreground mb-2">{text.winRateValue}</div>
                        <div className="text-sm text-muted">{text.winRate6Month}</div>
                    </div>
                    <div className="bg-surface p-6 rounded-2xl border border-border text-center hover:border-primary-500 transition-colors">
                        <div className="text-4xl font-black text-foreground mb-2">{text.onlineSupportValue}</div>
                        <div className="text-sm text-muted">{text.onlineSupport}</div>
                    </div>
                    <div className="bg-surface p-6 rounded-2xl border border-border text-center hover:border-primary-500 transition-colors">
                        <div className="text-4xl font-black text-foreground mb-2">{text.dailySignalsValue}</div>
                        <div className="text-sm text-muted">{text.dailySignals}</div>
                    </div>
                    <div className="bg-surface p-6 rounded-2xl border border-border text-center hover:border-primary-500 transition-colors">
                        <div className="text-4xl font-black text-foreground mb-2">{text.avgRiskRewardValue}</div>
                        <div className="text-sm text-muted">{text.avgRiskReward}</div>
                    </div>
                </div>
            </div>

            {/* Pricing Packages */}
            <h2 className="text-3xl font-bold text-foreground text-center mb-10">{text.choosePlan}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {packages.map((pkg) => (
                    <div
                        key={pkg.id}
                        onClick={() => router.push(localizedPath(`/signals/${pkg.id}`, locale))}
                        className={`cursor-pointer relative flex flex-col p-8 rounded-3xl border ${pkg.isPopular ? 'border-primary-500 bg-surface shadow-[0_0_30px_rgba(245,158,11,0.15)]' : 'border-border bg-background'} transition-all hover:-translate-y-2 hover:shadow-2xl duration-300 group`}
                    >
                        {pkg.isPopular && (
                            <div className="absolute top-0 end-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-500 text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                                {text.mostPopular}
                            </div>
                        )}

                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary-500 transition-colors">{pkg.title}</h3>
                            <div className="text-muted text-sm h-10">{pkg.description}</div>
                        </div>

                        <div className="mb-6">
                            <span className="text-3xl font-black text-foreground">{pkg.price}</span>
                        </div>

                        <div className="space-y-4 mb-8 flex-1">
                            {pkg.features.slice(0, 4).map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <CheckCircle className={`w-5 h-5 flex-shrink-0 ${pkg.isPopular ? 'text-primary-500' : 'text-muted'}`} />
                                    <span className="text-muted text-sm">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <button type="button" className={`w-full py-4 rounded-xl font-bold text-sm transition-all ${pkg.isPopular ? 'bg-primary-500 hover:bg-primary-400 text-black shadow-lg' : 'bg-surface hover:bg-background text-foreground border border-border group-hover:bg-primary-500 group-hover:text-black'}`}>
                            {text.viewDetailsAndBuy}
                        </button>
                    </div>
                ))}
            </div>

            {/* Security */}
            <div className="bg-surface rounded-2xl p-8 border border-border flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                    <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                        <Lock className="text-green-500 w-5 h-5" />
                        {text.securePayment}
                    </h3>
                    <p className="text-muted text-sm">
                        {text.securePaymentBody}
                    </p>
                </div>
                <div className="flex gap-4">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/25/Shaparak_Logo.png" alt="Shaparak" className="h-12 opacity-50 grayscale hover:grayscale-0 transition-all bg-white rounded p-1" />
                    <img src="https://www.enamad.ir/LOGO/New/Enamad-Logo-Small.png" alt="Enamad" className="h-12 opacity-50 grayscale hover:grayscale-0 transition-all bg-white rounded p-1" />
                </div>
            </div>

        </div>
    </div>
  );
}
