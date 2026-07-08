'use client'

import React, { useEffect, useRef, memo } from 'react';
import { useRouter } from 'next/navigation';
import { MarketSymbol } from '@/types';
import { ArrowRight, Search, Activity, ChevronRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { localizedPath } from '@/lib/i18n';

const TEXT = {
  fa: {
    backToHome: 'بازگشت به خانه',
    badge: 'دیدبان هوشمند بازار',
    heading: 'رصد لحظه‌ای',
    headingHighlight: 'نمادهای پاندولی',
    hero: 'در این صفحه می‌توانید وضعیت تکنیکال نمادهای مهم را زیر نظر داشته باشید. نمودارهای زیر به صورت زنده از سرورهای جهانی دریافت می‌شوند.',
    searchPlaceholder: 'جستجوی نماد (مثلا: طلا، BTC)...',
    fullAnalysis: 'تحلیل کامل',
    status: 'وضعیت:',
    liveMarket: 'بازار زنده',
    notFoundTitle: 'نمادی یافت نشد',
    notFoundBody: 'لطفا عبارت جستجو را تغییر دهید.',
  },
  en: {
    backToHome: 'Back to home',
    badge: 'Smart Market Watch',
    heading: 'Live tracking of',
    headingHighlight: 'Pendulism Symbols',
    hero: 'On this page you can monitor the technical status of key symbols. The charts below are streamed live from global servers.',
    searchPlaceholder: 'Search a symbol (e.g. Gold, BTC)...',
    fullAnalysis: 'Full analysis',
    status: 'Status:',
    liveMarket: 'Live market',
    notFoundTitle: 'No symbol found',
    notFoundBody: 'Please change your search term.',
  },
} as const;

// --- Helper Components for TradingView Widgets ---

const TickerTapeWidget = memo(({ locale }: { locale: 'fa' | 'en' }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    // Clear previous script if any (though memo helps prevent re-renders)
    container.current.innerHTML = '';

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols": [
        { "proName": "FOREXCOM:SPXUSD", "title": "S&P 500" },
        { "proName": "FOREXCOM:NSXUSD", "title": "US 100" },
        { "proName": "FX_IDC:EURUSD", "title": "EUR/USD" },
        { "proName": "BITSTAMP:BTCUSD", "title": "Bitcoin" },
        { "proName": "BITSTAMP:ETHUSD", "title": "Ethereum" },
        { "proName": "TVC:USOIL", "title": "Crude Oil" },
        { "proName": "TVC:GOLD", "title": "Gold" }
      ],
      "showSymbolLogo": true,
      "colorTheme": "dark",
      "isTransparent": true,
      "displayMode": "adaptive",
      "locale": locale
    });

    container.current.appendChild(script);
  }, [locale]);

  return (
    <div className="tradingview-widget-container w-full h-12">
      <div className="tradingview-widget-container__widget" ref={container}></div>
    </div>
  );
});

const MiniChartWidget = memo(({ symbol, locale, onClick }: { symbol: string, locale: 'fa' | 'en', onClick: () => void }) => {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!container.current) return;

      // Mapping internal tickers to TradingView symbols
      let tvSymbol = symbol;
      if (symbol === 'XAUUSD') tvSymbol = 'FX:XAUUSD';
      if (symbol === 'BTCUSD') tvSymbol = 'BINANCE:BTCUSD';
      if (symbol === 'EURUSD') tvSymbol = 'FX:EURUSD';
      if (symbol === 'USOIL') tvSymbol = 'TVC:USOIL';

      container.current.innerHTML = '';

      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "symbol": tvSymbol,
        "width": "100%",
        "height": "100%",
        "locale": locale,
        "dateRange": "12M",
        "colorTheme": "dark",
        "isTransparent": true,
        "autosize": true,
        "largeChartUrl": ""
      });

      container.current.appendChild(script);
    }, [symbol, locale]);

    return (
      <div
        className="tradingview-widget-container w-full h-full relative cursor-pointer"
        onClick={onClick}
      >
        {/* Transparent overlay to capture clicks since iframe might block them */}
        <div className="absolute inset-0 z-10 bg-transparent"></div>
        <div className="tradingview-widget-container__widget" ref={container}></div>
      </div>
    );
});

// --- Main Component ---

const SymbolList: React.FC<{ symbols: MarketSymbol[] }> = ({ symbols }) => {
  const router = useRouter();
  const { locale } = useLanguage();
  const text = TEXT[locale];
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredSymbols = symbols.filter(sym =>
    sym.name.includes(searchTerm) || sym.ticker.includes(searchTerm.toUpperCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20 pt-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
            <button
                type="button"
                onClick={() => router.back()}
                className="flex items-center text-muted hover:text-primary-500 transition-colors"
            >
                <ArrowRight className="w-5 h-5 me-2" />
                {text.backToHome}
            </button>
        </div>

        {/* Animated Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-surface border border-border mb-12 shadow-2xl group">

            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-[#1e293b] to-slate-900 bg-[length:200%_200%] animate-gradient-xy"></div>

            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

            {/* Floating Candlestick Animation Effect (CSS only) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute bottom-[-20%] end-[10%] w-2 h-32 bg-green-500/20 rounded blur-md animate-float-up delay-0"></div>
                <div className="absolute bottom-[-30%] end-[25%] w-2 h-48 bg-red-500/20 rounded blur-md animate-float-up delay-1000"></div>
                <div className="absolute bottom-[-10%] end-[60%] w-2 h-24 bg-green-500/20 rounded blur-md animate-float-up delay-2000"></div>
                <div className="absolute bottom-[-40%] end-[85%] w-2 h-56 bg-primary-500/20 rounded blur-md animate-float-up delay-500"></div>
            </div>

            <div className="relative z-10 p-8 md:p-12 pb-0 md:pb-0 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-500 border border-primary-500/20 mb-6 backdrop-blur-md">
                    <Activity className="w-4 h-4 animate-pulse" />
                    <span className="text-sm font-bold">{text.badge}</span>
                </div>

                <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                    {text.heading} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-300">{text.headingHighlight}</span>
                </h1>

                <p className="text-gray-400 max-w-2xl text-lg mb-8 leading-relaxed">
                    {text.hero}
                </p>

                {/* Search Bar */}
                <div className="w-full max-w-md relative mb-10">
                    <input
                        type="text"
                        placeholder={text.searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl py-4 ps-12 pe-4 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:bg-white/20 transition-all shadow-lg"
                    />
                    <Search className="absolute start-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
            </div>

            {/* Ticker Tape Animation at Bottom */}
            <div className="relative z-20 border-t border-white/10 bg-slate-900/50 backdrop-blur">
                <TickerTapeWidget locale={locale} />
            </div>
        </div>

        {/* Grid System: 2 Columns on Desktop/Tablet, 1 on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSymbols.map((symbol) => (
                <div
                    key={symbol.id}
                    className="bg-surface border border-border rounded-3xl overflow-hidden hover:border-primary-500 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-900/10 flex flex-col h-[380px] group"
                >
                    {/* Header Part */}
                    <div className="p-5 flex justify-between items-start border-b border-border/50 bg-background/50">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-surface p-2.5 border border-border shadow-sm group-hover:scale-105 transition-transform">
                                <img src={symbol.icon} alt={symbol.name} className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <h3 className="font-black text-foreground text-xl tracking-tight flex items-center gap-2">
                                    {symbol.ticker}
                                    <ChevronRight className="w-4 h-4 text-primary-500 opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1 transition-all" />
                                </h3>
                                <span className="text-sm text-muted font-medium">{symbol.name}</span>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => router.push(localizedPath(`/signals/${symbol.ticker}`, locale))}
                            className="px-4 py-2 rounded-xl bg-primary-500/10 text-primary-500 text-xs font-bold hover:bg-primary-500 hover:text-black transition-colors"
                        >
                            {text.fullAnalysis}
                        </button>
                    </div>

                    {/* Chart Part */}
                    <div className="flex-1 bg-gradient-to-b from-surface to-background relative">
                        <MiniChartWidget symbol={symbol.ticker} locale={locale} onClick={() => router.push(localizedPath(`/signals/${symbol.ticker}`, locale))} />
                    </div>

                    {/* Footer Info */}
                    <div className="p-3 bg-surface border-t border-border flex justify-between items-center text-xs text-muted">
                        <span className="flex items-center gap-1">
                             <Activity className="w-3 h-3 text-primary-500" />
                             {text.status} <span className="text-foreground font-bold">{text.liveMarket}</span>
                        </span>
                        <span className="truncate max-w-[50%] opacity-70">
                            {symbol.technicalSummary.substring(0, 30)}...
                        </span>
                    </div>
                </div>
            ))}
        </div>

        {filteredSymbols.length === 0 && (
            <div className="text-center py-20">
                <div className="bg-surface inline-block p-6 rounded-full border border-border mb-4 shadow-lg">
                    <Search className="w-8 h-8 text-muted" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{text.notFoundTitle}</h3>
                <p className="text-muted text-sm mt-2">{text.notFoundBody}</p>
            </div>
        )}

      </div>

      <style>{`
        @keyframes float-up {
            0% { transform: translateY(100px) scale(0.8); opacity: 0; }
            50% { opacity: 0.5; }
            100% { transform: translateY(-100px) scale(1); opacity: 0; }
        }
        .animate-float-up {
            animation: float-up 8s infinite linear;
        }
        .animate-gradient-xy {
            animation: gradient-xy 15s ease infinite;
        }
        @keyframes gradient-xy {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
};

export default SymbolList;
