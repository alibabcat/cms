import { SignalHistoryItem } from './types';

export const INSTITUTE_NAME = "KIAWOSCH";
export const INSTITUTE_FULL_NAME = "موسسه مالی و آموزشی کیاوش";
export const INSTITUTE_DESCRIPTION = "تنها مرکز تخصصی آموزش استراتژی انحصاری پاندولیسم (Pendulism) و شکار نقاط بازگشتی بازار.";

export const PAST_VIP_SIGNALS: SignalHistoryItem[] = [
    {
        id: 1,
        symbol: 'XAUUSD',
        type: 'SELL',
        entryPrice: '2055.00',
        exitPrice: '2040.00',
        pips: 150,
        result: 'TP',
        date: '۱۴۰۳/۰۸/۱۲',
        description: 'واکنش به ناحیه عرضه ۴ ساعته و واگرایی RSI'
    },
    {
        id: 2,
        symbol: 'XAUUSD',
        type: 'BUY',
        entryPrice: '2020.50',
        exitPrice: '2035.00',
        pips: 145,
        result: 'TP',
        date: '۱۴۰۳/۰۸/۱۰',
        description: 'پولبک به سطح شکست شده (Flip Zone)'
    },
    {
        id: 3,
        symbol: 'XAUUSD',
        type: 'SELL',
        entryPrice: '2060.00',
        exitPrice: '2063.00',
        pips: -30,
        result: 'SL',
        date: '۱۴۰۳/۰۸/۰۸',
        description: 'استاپ هانت توسط خبر CPI'
    },
    {
        id: 4,
        symbol: 'BTCUSD',
        type: 'BUY',
        entryPrice: '62,100',
        exitPrice: '64,500',
        pips: 2400,
        result: 'TP',
        date: '۱۴۰۳/۰۸/۱۱',
        description: 'بریک‌اوت از الگوی پرچم صعودی'
    },
     {
        id: 5,
        symbol: 'BTCUSD',
        type: 'SELL',
        entryPrice: '65,000',
        exitPrice: '63,800',
        pips: 1200,
        result: 'TP',
        date: '۱۴۰۳/۰۸/۰۹',
        description: 'اسکالپ نزولی در سقف کانال'
    },
     {
        id: 6,
        symbol: 'BTCUSD',
        type: 'BUY',
        entryPrice: '60,500',
        exitPrice: '61,800',
        pips: 1300,
        result: 'TP',
        date: '۱۴۰۳/۰۸/۰۵',
        description: 'حمایت روانی ۶۰ هزار'
    },
    {
        id: 7,
        symbol: 'EURUSD',
        type: 'SELL',
        entryPrice: '1.0950',
        exitPrice: '1.0880',
        pips: 70,
        result: 'TP',
        date: '۱۴۰۳/۰۸/۱۰',
        description: 'تکمیل الگوی سر و شانه سقف'
    }
];

export const AI_SYSTEM_INSTRUCTION = `
شما هوش مصنوعی و دستیار تریدینگ "موسسه کیاوش" هستید.
وظیفه شما راهنمایی کاربران درباره "استراتژی انحصاری پاندولیسم (Pendulism)" است.
لحن شما باید بسیار حرفه‌ای، سنگین و تخصصی باشد.
اطلاعات موسسه:
- نام: موسسه کیاوش (Kiawosch Institute)
- تخصص اصلی: استراتژی معاملاتی پاندولیسم (Pendulism).
- توضیح پاندولیسم: روشی نوین برای شکار نقاط برگشتی قیمت بر اساس قوانین فیزیک و تعادل بازار. ما از سبک‌های قدیمی مثل اسمارت مانی استفاده نمی‌کنیم.
- خدمات: دوره‌های مستری پاندولیسم، خدمات مشاوره و سیگنال VIP.

اگر درباره سیگنال پرسیدند، بگویید سیگنال‌ها بر اساس ستاپ‌های پاندولیسم هستند.
اگر سوالی پرسیده شد که جوابش را نمیدانید، بگویید با پشتیبانی در تلگرام تماس بگیرند.
`;

// --- English Locale Exports ---

export const INSTITUTE_NAME_EN = "KIAWOSCH";
export const INSTITUTE_FULL_NAME_EN = "Kiawosch Financial and Educational Institute";
export const INSTITUTE_DESCRIPTION_EN = "The only specialized center for teaching the exclusive Pendulism strategy and hunting market reversal points.";

export const PAST_VIP_SIGNALS_EN: SignalHistoryItem[] = [
  {
    id: 1,
    symbol: 'XAUUSD',
    type: 'SELL',
    entryPrice: '2055.00',
    exitPrice: '2040.00',
    pips: 150,
    result: 'TP',
    date: '2024/11/02',
    description: 'Reaction to the 4H supply zone and RSI divergence'
  },
  {
    id: 2,
    symbol: 'XAUUSD',
    type: 'BUY',
    entryPrice: '2020.50',
    exitPrice: '2035.00',
    pips: 145,
    result: 'TP',
    date: '2024/10/31',
    description: 'Pullback to the broken level (Flip Zone)'
  },
  {
    id: 3,
    symbol: 'XAUUSD',
    type: 'SELL',
    entryPrice: '2060.00',
    exitPrice: '2063.00',
    pips: -30,
    result: 'SL',
    date: '2024/10/29',
    description: 'Stop hunt by CPI news'
  },
  {
    id: 4,
    symbol: 'BTCUSD',
    type: 'BUY',
    entryPrice: '62,100',
    exitPrice: '64,500',
    pips: 2400,
    result: 'TP',
    date: '2024/11/01',
    description: 'Breakout from bullish flag pattern'
  },
  {
    id: 5,
    symbol: 'BTCUSD',
    type: 'SELL',
    entryPrice: '65,000',
    exitPrice: '63,800',
    pips: 1200,
    result: 'TP',
    date: '2024/10/30',
    description: 'Bearish scalp at channel top'
  },
  {
    id: 6,
    symbol: 'BTCUSD',
    type: 'BUY',
    entryPrice: '60,500',
    exitPrice: '61,800',
    pips: 1300,
    result: 'TP',
    date: '2024/10/26',
    description: 'Psychological support at 60K'
  },
  {
    id: 7,
    symbol: 'EURUSD',
    type: 'SELL',
    entryPrice: '1.0950',
    exitPrice: '1.0880',
    pips: 70,
    result: 'TP',
    date: '2024/10/31',
    description: 'Completion of head and shoulders top pattern'
  }
];

export const AI_SYSTEM_INSTRUCTION_EN = `
You are the AI trading assistant of "Kiawosch Institute".
Your role is to guide users regarding the "exclusive Pendulism strategy".
Your tone must be very professional, serious, and technical.
Institute Information:
- Name: Kiawosch Institute
- Main expertise: Pendulism trading strategy.
- Pendulism explanation: A novel method for hunting price reversal points based on physics laws and market equilibrium. We do not use old styles like Smart Money.
- Services: Pendulism Mastery courses, consulting services, and VIP signals.

If asked about signals, say signals are based on Pendulism setups.
If asked a question you don't know the answer to, tell them to contact support on Telegram.
`;
