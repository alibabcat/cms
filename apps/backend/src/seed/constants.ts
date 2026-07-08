
import { Course, NavItem, SocialLink, TeamMember, BlogPost, SignalPackage, PsychologyCourse, MarketSymbol, SignalHistoryItem } from './types';

export const INSTITUTE_NAME = "KIAWOSCH";
export const INSTITUTE_FULL_NAME = "موسسه مالی و آموزشی کیاوش";
export const INSTITUTE_DESCRIPTION = "تنها مرکز تخصصی آموزش استراتژی انحصاری پاندولیسم (Pendulism) و شکار نقاط بازگشتی بازار.";
export const INSTITUTE_ADDRESS = "تهران، جردن، خیابان پدیدار، پلاک ۲۰، ساختمان کیاوش";
export const INSTITUTE_EMAIL = "info@kiawosch.co";
export const INSTITUTE_TEL = "021 - 88 88 20 20";

export const FOOTER_QUICK_LINKS: NavItem[] = [
  { label: 'دوره‌های آموزشی', id: 'courses-page' },
  { label: 'سیگنال VIP و مشاوره', id: 'signals-page' },
  { label: 'دیدبان هوشمند بازار', id: 'symbols-page' },
  { label: 'مجله و مقالات', id: 'blog-page' },
];

export const FOOTER_SERVICES: NavItem[] = [
  { label: 'تحلیل‌های بلند مدت', id: 'long-term-analysis' },
  { label: 'کلینیک روانشناسی ترید', id: 'psychology-page' },
  { label: 'درباره موسسه', id: 'about-page' },
  { label: 'تماس با ما', id: 'contact-page' },
];

export const NAV_ITEMS: NavItem[] = [
  { label: 'خانه', id: 'home' },
  { 
    label: 'آکادمی کیاوش', 
    id: 'academy',
    subItems: [
        { label: 'دوره‌های پاندولیسم', id: 'courses-page' },
        { label: 'روانشناسی ترید', id: 'psychology-page' },
    ]
  },
  { 
      label: 'تحلیل بازار', 
      id: 'market',
      subItems: [
          { label: 'دیدبان نمادها', id: 'symbols-page' },
          { label: 'تحلیل‌های بلند مدت (رایگان)', id: 'long-term-analysis' }, // New Item
      ]
  }, 
  { label: 'خدمات مشاوره', id: 'signals-page' }, 
  { label: 'وبلاگ و مقالات', id: 'blog-page' },
  { 
    label: 'درباره ما', 
    id: 'about',
    subItems: [
        { label: 'داستان ما و تیم', id: 'about-page' },
        { label: 'تماس با ما', id: 'contact-page' },
    ]
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'telegram', label: 'تلگرام', url: 'https://t.me/kiawosch' },
  { platform: 'instagram', label: 'اینستاگرام', url: 'https://instagram.com/kiawosch' },
  { platform: 'whatsapp', label: 'واتساپ', url: 'https://wa.me/989000000000' },
  { platform: 'youtube', label: 'یوتیوب', url: 'https://youtube.com/@kiawosch' },
];

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

export const MARKET_SYMBOLS: MarketSymbol[] = [
    {
        id: 'sym-1',
        ticker: 'XAUUSD',
        name: 'انس جهانی طلا',
        icon: 'https://cdn-icons-png.flaticon.com/512/2535/2535567.png',
        price: '2,045.50',
        change: '+1.25%',
        isPositive: true,
        description: 'طلا به عنوان پادشاه بازارهای مالی، محبوب‌ترین دارایی برای تریدرهای سبک پاندولیسم است. این فلز گرانبها همبستگی معکوسی با شاخص دلار (DXY) و نرخ بهره آمریکا دارد.',
        characteristics: [
            { label: 'نوسان روزانه', value: 'بسیار بالا (۱۵۰+ پیپ)' },
            { label: 'بهترین سشن', value: 'لندن و نیویورک' },
            { label: 'اسپرد میانگین', value: '۱.۵ پیپ' },
            { label: 'همبستگی', value: 'معکوس با USD' }
        ],
        technicalSummary: 'روند صعودی قوی در تایم فریم روزانه. قیمت به ناحیه عرضه هفتگی واکنش نشان داده و در حال پولبک به حمایت ۲۰۳۰ است.',
        chartImage: 'https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 'sym-2',
        ticker: 'BTCUSD',
        name: 'بیت‌کوین',
        icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968260.png',
        price: '64,200.00',
        change: '-0.85%',
        isPositive: false,
        description: 'بیت‌کوین به عنوان طلای دیجیتال، رفتار پاندولی بسیار منظمی در تایم‌فریم‌های بالا دارد. نوسانات شدید آن فرصت‌های اسکالپ عالی ایجاد می‌کند.',
        characteristics: [
            { label: 'نوسان روزانه', value: 'شدید (۳-۵ درصد)' },
            { label: 'بهترین سشن', value: '۲۴ ساعته (فعال در آسیا)' },
            { label: 'مارکت کپ', value: '۱.۲ تریلیون دلار' },
            { label: 'دامیننس', value: '۵۲٪' }
        ],
        technicalSummary: 'در حال رنج زدن بین ۶۰ تا ۶۵ هزار. واگرایی منفی در RSI دیده می‌شود که احتمال اصلاح تا ۵۸ هزار را تقویت می‌کند.',
        chartImage: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 'sym-3',
        ticker: 'EURUSD',
        name: 'یورو به دلار',
        icon: 'https://cdn-icons-png.flaticon.com/512/330/330430.png',
        price: '1.0850',
        change: '+0.10%',
        isPositive: true,
        description: 'نقدشونده‌ترین جفت ارز دنیا. حرکات آن نسبت به طلا نرم‌تر و تکنیکال‌پذیرتر است و برای شروع کار با استراتژی پاندولیسم پیشنهاد می‌شود.',
        characteristics: [
            { label: 'نوسان روزانه', value: 'متوسط (۶۰-۸۰ پیپ)' },
            { label: 'بهترین سشن', value: 'همپوشانی لندن/نیویورک' },
            { label: 'اسپرد میانگین', value: '۰.۵ پیپ' },
            { label: 'تاثیرپذیری', value: 'خبرهای ECB و Fed' }
        ],
        technicalSummary: 'روند خنثی. قیمت در یک کانال صعودی ضعیف قرار دارد. منتظر شکست ۱.۰۹۰۰ برای ورود به پوزیشن خرید هستیم.',
        chartImage: 'https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 'sym-4',
        ticker: 'USOIL',
        name: 'نفت خام WTI',
        icon: 'https://cdn-icons-png.flaticon.com/512/2103/2103328.png',
        price: '78.40',
        change: '+2.10%',
        isPositive: true,
        description: 'نفت طلای سیاه بازار است و به شدت تحت تاثیر اخبار ژئوپلیتیک قرار دارد. ترید نفت نیازمند مدیریت ریسک دقیق است.',
        characteristics: [
            { label: 'نوسان روزانه', value: 'بالا' },
            { label: 'بهترین سشن', value: 'نیویورک' },
            { label: 'عوامل موثر', value: 'اوپک، جنگ، ذخایر آمریکا' },
            { label: 'اسپرد', value: '۳ پیپ' }
        ],
        technicalSummary: 'شکست مقاومت ۷۸ دلار با کندل مومنتوم. هدف بعدی ۸۲ دلار در دسترس است.',
        chartImage: 'https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=1000&auto=format&fit=crop'
    }
];

export const SIGNAL_PACKAGES: SignalPackage[] = [
    {
      id: 'sig-1',
      title: 'سیگنال VIP - یک ماهه',
      duration: '۱ ماه',
      price: '۲,۵۰۰,۰۰۰ تومان',
      priceNum: 2500000,
      features: ['۵ تا ۱۰ سیگنال روزانه', 'اسکالپ طلا و فارکس', 'تحلیل ویدیویی هر صبح', 'پشتیبانی آنلاین'],
      description: 'مناسب برای تست کیفیت سیگنال‌ها و شروع کار با سرمایه کم.',
      longDescription: 'در این پلن شما به مدت ۳۰ روز به کانال VIP تلگرام دسترسی خواهید داشت. تمامی سیگنال‌ها دارای نقطه ورود، حد ضرر و حد سود دقیق هستند. همچنین هر روز صبح یک ویدیو کوتاه از تحلیل مارکت دریافت می‌کنید تا دیدگاه معاملاتی استاد کیاوش را درک کنید.'
    },
    {
      id: 'sig-3',
      title: 'سیگنال VIP - سه ماهه',
      duration: '۳ ماه',
      price: '۶,۵۰۰,۰۰۰ تومان',
      priceNum: 6500000,
      isPopular: true,
      features: ['شامل تمام مزایای پلن یک ماهه', 'سیگنال‌های اختصاصی بیت‌کوین', 'وبینار رفع اشکال ماهانه', 'تخفیف ۲۰ درصدی'],
      description: 'بهترین انتخاب برای معامله‌گرانی که به دنبال سود مستمر هستند.',
      longDescription: 'با تهیه اشتراک سه ماهه، علاوه بر سیگنال‌های طلا و جفت‌ارزها، به سیگنال‌های نوسان‌گیری کریپتو (بیت‌کوین و اتریوم) نیز دسترسی خواهید داشت. همچنین ماهی یک بار می‌توانید در وبینار پرسش و پاسخ آنلاین با تیم تحلیل شرکت کنید.'
    },
    {
      id: 'sig-6',
      title: 'مشاوره اختصاصی (PAMM)',
      duration: '۶ ماه',
      price: '۱۲,۰۰۰,۰۰۰ تومان',
      priceNum: 12000000,
      features: ['مدیریت ریسک اختصاصی', 'ارتباط مستقیم با منتور', 'لایو ترید هفتگی', 'تضمین بازگشت وجه'],
      description: 'برای سرمایه‌گذاران حرفه‌ای که نیاز به کوچینگ و نظارت دارند.',
      longDescription: 'این پلن فراتر از یک کانال سیگنال ساده است. شما یک منتور اختصاصی خواهید داشت که ژورنال معاملاتی شما را بررسی می‌کند. همچنین هفته‌ای یک بار در جلسه لایو ترید شرکت می‌کنید تا نحوه اجرای معاملات را به صورت زنده ببینید. اگر در پایان دوره سودآور نباشید، وجه اشتراک عودت داده می‌شود.'
    }
];

export const PSYCHOLOGY_COURSES: PsychologyCourse[] = [
    {
        id: 'psy-1',
        title: 'مدیریت ذهن در بازار (وبینار)',
        price: '۹۰۰,۰۰۰ تومان',
        type: 'Public',
        image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000&auto=format&fit=crop',
        duration: '۸ ساعت',
        sessionCount: 4,
        startDate: '۱۵ آبان ۱۴۰۳',
        instructor: 'دکتر صمیمی',
        description: 'یک دوره فشرده و گروهی برای آشنایی با تله‌های ذهنی رایج در ترید.',
        longDescription: 'در این وبینار تعاملی، ما به بررسی ریشه‌های ترس و طمع می‌پردازیم. چرا وقتی در سود هستید زود خارج می‌شوید اما ضرر را باز نگه می‌دارید؟ این دوره دروازه ورود شما به دنیای روانشناسی معامله‌گری حرفه‌ای است.',
        features: ['۴ جلسه آنلاین گروهی', 'پرسش و پاسخ در پایان جلسه', 'دسترسی به فایل ضبط شده', 'تمرینات کنترل استرس'],
        syllabus: [
            {
                title: 'جلسه اول: آناتومی مغز معامله‌گر',
                duration: '۱۲۰ دقیقه',
                topics: [
                    'معرفی سیستم لیمبیک و نئوکورتکس',
                    'چرا مغز ما برای ترید طراحی نشده است؟',
                    'نقش آمیگدال در واکنش‌های "جنگ یا گریز" در مارکت',
                    'تمرین عملی: شناسایی لحظه فعال شدن ترس'
                ]
            },
            {
                title: 'جلسه دوم: شناخت بایاس‌های شناختی',
                duration: '۱۲۰ دقیقه',
                topics: [
                    'سوگیری تایید (Confirmation Bias) در تحلیل تکنیکال',
                    'ترس از دست دادن (FOMO) و ریشه‌های تکاملی آن',
                    'خطای هزینه غرق شده (Sunk Cost Fallacy)',
                    'چگونه اخبار ذهن ما را شرطی می‌کنند؟'
                ]
            },
            {
                title: 'جلسه سوم: مدیریت هیجان در لایو ترید',
                duration: '۱۲۰ دقیقه',
                topics: [
                    'تکنیک‌های تنفس ۴-۷-۸ برای کاهش ضربان قلب',
                    'ساخت چک‌لیست روانی قبل از ورود به پوزیشن',
                    'مدیریت خشم پس از استاپ خوردن (Revenge Trading)',
                    'رژیم دوپامین برای تریدرها'
                ]
            },
            {
                title: 'جلسه چهارم: ساخت عادت‌های برنده',
                duration: '۱۲۰ دقیقه',
                topics: [
                    'روتین صبحگاهی یک معامله‌گر حرفه‌ای',
                    'اهمیت خواب و تغذیه بر تصمیم‌گیری مالی',
                    'طراحی سیستم پاداش و تنبیه شخصی',
                    'پرسش و پاسخ نهایی'
                ]
            }
        ],
        outcomes: [
            'کاهش استرس حین ترید',
            'جلوگیری از تصمیمات هیجانی',
            'آشنایی با مکانیزم‌های مغز'
        ]
    },
    {
        id: 'psy-2',
        title: 'کوچینگ خصوصی (VIP)',
        price: '۵,۰۰۰,۰۰۰ تومان',
        type: 'Private',
        image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=1000&auto=format&fit=crop',
        duration: '۱۰ ساعت + ۱ ماه پشتیبانی',
        sessionCount: 5,
        startDate: 'شروع پس از مصاحبه',
        instructor: 'دکتر صمیمی',
        isPopular: true,
        description: 'جلسات تک به تک برای ریشه‌یابی مشکلات شخصی شما در ترید و بازنویسی ذهن.',
        longDescription: 'این دوره کاملاً شخصی‌سازی شده است. دکتر صمیمی ژورنال‌های معاملاتی شما را بررسی می‌کند تا الگوی رفتاری مخرب شما را پیدا کند. آیا مشکل شما انتقام از بازار است؟ یا عدم اعتماد به نفس؟ ما با تکنیک‌های CBT و NLP ذهنیت برنده را در شما می‌سازیم.',
        features: ['۵ جلسه اختصاصی با دکتر صمیمی', 'آنالیز شخصیت تریدری شما', 'درمان فومو و انتقام از بازار', 'پشتیبانی مستقیم واتساپ'],
        syllabus: [
            {
                title: 'جلسه ۱: آنالیز شخصیت و تست MBTI',
                duration: '۹۰ دقیقه',
                topics: [
                    'انجام تست‌های روانشناسی تخصصی ترید',
                    'بررسی سابقه معاملاتی و دراودان‌ها',
                    'شناسایی الگوی تکرار شونده ضررده',
                    'تعیین اهداف دوره کوچینگ'
                ]
            },
            {
                title: 'جلسه ۲: بازنویسی باورهای محدودکننده',
                duration: '۹۰ دقیقه',
                topics: [
                    'تکنیک‌های CBT برای تغییر افکار منفی',
                    'درمان ترس از ورود به معامله (Execution Paralysis)',
                    'افزایش اعتماد به نفس در تحلیل',
                    'تمرین عملی: ژورنال‌نویسی احساسی'
                ]
            },
            {
                title: 'جلسه ۳: مدیریت بحران و ضرر',
                duration: '۹۰ دقیقه',
                topics: [
                    'پروتکل‌های اورژانسی هنگام رفتن در ضرر سنگین',
                    'چگونه بعد از یک روز بد، سیستم را خاموش کنیم؟',
                    'پذیرش عدم قطعیت بازار',
                    'تکنیک تصویرسازی ذهنی (Visualization)'
                ]
            },
            {
                title: 'جلسه ۴: بهینه‌سازی عملکرد (Flow State)',
                duration: '۹۰ دقیقه',
                topics: [
                    'چگونه وارد فاز "غرقگی" یا Flow شویم؟',
                    'حذف عوامل حواس‌پرتی محیطی',
                    'مدیریت انرژی ذهنی در سشن‌های معاملاتی طولانی',
                    'بهینه‌سازی ستاپ معاملاتی بر اساس شخصیت'
                ]
            },
            {
                title: 'جلسه ۵: پلن معاملاتی روانشناختی',
                duration: '۹۰ دقیقه',
                topics: [
                    'تدوین قوانین شخصی غیرقابل تخطی',
                    'قرارداد روانشناختی با خود',
                    'برنامه ۳ ماهه برای رشد مستمر',
                    'بررسی نهایی پیشرفت'
                ]
            }
        ],
        outcomes: [
            'حذف کامل ترید انتقامی',
            'افزایش انضباط شخصی',
            'ساخت شخصیت معامله‌گر حرفه‌ای'
        ]
    },
    {
        id: 'psy-3',
        title: 'دوره جامع هیبرید (NeuroTrading)',
        price: '۲,۵۰۰,۰۰۰ تومان',
        type: 'Hybrid',
        image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1000&auto=format&fit=crop',
        duration: '۱۵ ساعت',
        sessionCount: 10,
        startDate: 'دسترسی آنی + جلسات هفتگی',
        instructor: 'تیم روانشناسی کیاوش',
        description: 'ترکیبی از ویدیوهای آموزشی ضبط شده و جلسات رفع اشکال زنده.',
        longDescription: 'در دوره هیبرید، شما ابتدا مبانی نوروساینس در ترید را از طریق ویدیوهای باکیفیت یاد می‌گیرید و سپس در جلسات گروهی هفتگی شرکت می‌کنید تا آموخته‌های خود را به اشتراک بگذارید. این دوره تعادل عالی بین هزینه و کیفیت آموزش است.',
        features: ['دسترسی به ویدیوهای ضبط شده', '۲ جلسه خصوصی رفع اشکال', 'عضویت در گروه تمرین ذهنیت', 'چک‌لیست‌های روانشناسی'],
        syllabus: [
            {
                title: 'ماژول ۱: مبانی نوروساینس مالی',
                duration: '۴ ساعت',
                topics: [
                    'ساختار شیمیایی مغز هنگام ریسک',
                    'نقش دوپامین در اعتیاد به ترید',
                    'کورتیزول و تاثیر استرس بر IQ مالی',
                    'تفاوت مغز آماتور و حرفه‌ای'
                ]
            },
            {
                title: 'ماژول ۲: روانشناسی بازار و جمعیت',
                duration: '۳ ساعت',
                topics: [
                    'چرخه‌های احساسی بازار (Market Cycles)',
                    'چگونه مثل جمعیت فکر نکنیم؟',
                    'خواندن ترس و طمع از روی کندل‌ها',
                    'اندیکاتورهای سنتیمنتال'
                ]
            },
            {
                title: 'ماژول ۳: ابزارهای کنترل ذهن',
                duration: '۴ ساعت',
                topics: [
                    'مدیتیشن مخصوص معامله‌گران (Mindfulness)',
                    'تکنیک‌های خود-هیپنوتیزم برای تمرکز',
                    'استفاده از موسیقی و فرکانس‌های مغزی (Binaural Beats)',
                    'طراحی محیط ترید ارگونومیک'
                ]
            },
            {
                title: 'ماژول ۴: مدیریت سرمایه روانشناختی',
                duration: '۴ ساعت',
                topics: [
                    'رابطه حجم معامله با ضربان قلب',
                    'قانون ۱ درصد و آرامش ذهنی',
                    'چگونه با سودهای بزرگ هیجان‌زده نشویم؟',
                    'برداشت سود به عنوان پاداش مغزی'
                ]
            }
        ],
        outcomes: [
            'درک عمیق از عملکرد مغز',
            'توانایی مدیریت بحران',
            'بهبود وین‌ریت از طریق فیلتر کردن تریدهای احساسی'
        ]
    }
];

export const SAMPLE_COURSES: Course[] = [
  {
    id: '1',
    title: 'مستری پاندولیسم (Mastery)',
    description: 'آموزش جامع استراتژی پاندولیسم: شناسایی نقاط تعادل و عدم تعادل قیمت با دقت میکروسکوپی.',
    instructor: 'استاد کیاوش',
    duration: '۶۰ ساعت',
    price: '۱۵۰,۰۰۰,۰۰۰ تومان',
    basePrice: 150000000,
    priceRangeLabel: '۱۵۰ تا ۳۳۳ میلیون تومان',
    addons: [
        { id: 'mentor', title: 'کوچینگ خصوصی (۶ ماهه)', price: 120000000, priceLabel: '۱۲۰,۰۰۰,۰۰۰+', description: 'جلسات هفتگی خصوصی با استاد کیاوش' },
        { id: 'vip_signal', title: 'اشتراک VIP مادام‌العمر', price: 45000000, priceLabel: '۴۵,۰۰۰,۰۰۰+', description: 'دسترسی دائم به کانال سیگنال طلا' },
        { id: 'tools', title: 'پکیج ابزارهای ترید', price: 18000000, priceLabel: '۱۸,۰۰۰,۰۰۰+', description: 'داشبورد اختصاصی + ژورنال هوشمند' },
    ],
    image: 'https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=1000&auto=format&fit=crop',
    category: 'management',
    syllabus: [
        'فصل ۱: فیزیک قیمت و قانون تعادل',
        'فصل ۲: شناسایی نقاط Zero-Point در چارت',
        'فصل ۳: ستاپ‌های چرخش پاندولی (Reversal)',
        'فصل ۴: مدیریت سرمایه به سبک پاندولیسم',
        'فصل ۵: لایو ترید روی طلا و بیت‌کوین'
    ],
    features: ['پشتیبانی ۳ ماهه منتور', 'دسترسی به آپدیت‌های مادام‌العمر', 'لایسنس ژورنال نویسی اختصاصی']
  },
  {
    id: '2',
    title: 'روانشناسی پاندولی',
    description: 'هماهنگ سازی ذهن با نوسانات بازار؛ چگونه مثل یک پاندول آرام اما دقیق باشید.',
    instructor: 'دکتر صمیمی',
    duration: '۲۰ ساعت',
    price: '۵,۵۰۰,۰۰۰ تومان',
    image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=1000&auto=format&fit=crop',
    category: 'management',
    syllabus: [
        'شناخت تله‌های ذهنی در نوسانات شدید',
        'مدیریت ترس و طمع با تکنیک‌های نوروساینس',
        'ساخت شخصیت معامله‌گر حرفه‌ای',
        'مدیریت بحران در ضرر'
    ],
    features: ['جلسات کوچینگ گروهی', 'تست‌های شخصیت‌شناسی ترید']
  },
  {
    id: '3',
    title: 'ستاپ‌های طلایی پاندولیسم',
    description: 'کارگاه عملی ترید روی طلا (XAUUSD) با قوانین سخت‌گیرانه پاندولیسم.',
    instructor: 'مهندس راد',
    duration: '۴۵ ساعت',
    price: '۹,۰۰۰,۰۰۰ تومان',
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1000&auto=format&fit=crop',
    category: 'programming',
    syllabus: [
        'تحلیل رفتار انس جهانی طلا',
        'همبستگی طلا با شاخص دلار (DXY)',
        'اسکالپ ۱ دقیقه‌ای با پاندولیسم',
        'ترید در زمان اخبار (NFP, CPI)'
    ],
    features: ['کانال سیگنال ۱ ماهه رایگان', 'چک‌لیست معاملاتی چاپ شده']
  },
  {
    id: '4',
    title: 'زبان تخصصی ترید',
    description: 'درک اخبار و فاندامنتال‌هایی که نوسان پاندول را تشدید می‌کنند.',
    instructor: 'دکتر ایزدی',
    duration: '۳۰ ساعت',
    price: '۴,۰۰۰,۰۰۰ تومان',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop',
    category: 'language',
    syllabus: [
        'واژگان تخصصی فارکس و کریپتو',
        'نحوه خواندن سایت‌های خبری (ForexFactory, Bloomberg)',
        'تحلیل سنتیمنت بازار از روی اخبار',
        'مکاتبات اداری با بروکرها'
    ],
    features: ['جزوه کامل لغات', 'ویدیوهای آموزشی ترجمه شده']
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
    {
        id: 1,
        name: 'استاد کیاوش',
        role: 'مبتکر استراتژی پاندولیسم',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
        bio: 'خالق سبک معاملاتی پاندولیسم و منتور ارشد مجموعه.',
        fullBio: 'استاد کیاوش با بیش از ۱۵ سال سابقه در بازارهای مالی بین‌المللی، پس از سال‌ها تحقیق بر روی رفتار قیمت و فیزیک بازار، سبک "پاندولیسم" را ابداع کرد. او معتقد است قیمت همانند یک پاندول همواره در تلاش برای رسیدن به تعادل است و انحرافات شدید، فرصت‌های طلایی برای ترید هستند. ایشان تاکنون بیش از ۵۰۰۰ دانشجو را در مسیر سودآوری مستمر هدایت کرده‌اند.',
        specialties: ['استراتژی پاندولیسم', 'مدیریت سرمایه پیشرفته', 'طراحی سیستم‌های معاملاتی']
    },
    {
        id: 2,
        name: 'دکتر صمیمی',
        role: 'روانشناس معامله‌گری',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
        bio: 'متخصص کنترل ذهن در نوسانات شدید بازار.',
        fullBio: 'دکتر صمیمی دارای دکتری روانشناسی بالینی و متخصص در حوزه نوروساینس مالی (Neurofinance) است. ایشان در دوره‌های خود به معامله‌گران آموزش می‌دهند که چگونه ساختار مغز خود را برای پذیرش ریسک و تحمل فشارهای روانی بازار بازارهای مالی بازنویسی کنند.',
        specialties: ['روانشناسی ترید', 'کوچینگ توسعه فردی', 'مدیریت استرس']
    },
    {
        id: 3,
        name: 'مهندس راد',
        role: 'هت تریدر (Head Trader)',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
        bio: 'متخصص پیاده‌سازی الگوریتم‌های پاندولیسم روی چارت.',
        fullBio: 'مهندس راد با پیش‌زمینه مهندسی نرم‌افزار، دیدگاه الگوریتمیک را به ترید اضافه کرده است. او مسئولیت بخش لایو ترید موسسه را بر عهده دارد و استراتژی‌های پاندولیسم را در تایم‌فریم‌های پایین (اسکالپ) اجرا می‌کند.',
        specialties: ['پرایس اکشن RTM', 'الگوریتم تریدینگ', 'تحلیل آنچین']
    },
    {
        id: 4,
        name: 'خانم مهندس آریا',
        role: 'تحلیلگر ارشد کریپتو',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
        bio: 'بررسی رفتار بیت‌کوین با دیدگاه پاندولی.',
        fullBio: 'خانم آریا از سال ۲۰۱۶ در بازار ارزهای دیجیتال فعال است و تخصص ایشان شناسایی چرخه‌های مارکت کریپتو با استفاده از مفاهیم پاندولیسم است.',
        specialties: ['کریپتوکارنسی', 'تحلیل فاندامنتال', 'DeFi']
    },
    {
        id: 5,
        name: 'آقای کریمی',
        role: 'مدیر ریسک',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop',
        bio: 'نظارت بر دراودان حساب‌های کپی تریدینگ.',
        fullBio: 'آقای کریمی با سابقه مدیریت صندوق‌های سرمایه‌گذاری، مسئولیت کنترل ریسک حساب‌های VIP و کپی‌تریدینگ موسسه را بر عهده دارد.',
        specialties: ['مدیریت ریسک', 'پرتفوی گردانی', 'آمار و احتمالات']
    }
];

// Combine existing blog posts with new Long-term Analysis posts
export const BLOG_POSTS: BlogPost[] = [
    // Existing Posts
    {
        id: 1,
        title: 'پاندولیسم در طلا (XAUUSD)',
        excerpt: 'چگونه نقاط برگشتی انس جهانی را با دقت پیپ شکار کنیم؟ تحلیل هفتگی...',
        image: 'https://images.unsplash.com/photo-1610375461246-83df859cd871?q=80&w=600&auto=format&fit=crop',
        date: '۲ روز پیش',
        category: 'تحلیل تکنیکال',
        relatedSymbol: 'XAUUSD',
        content: `...`
    },
    {
        id: 2,
        title: 'تفاوت پاندولیسم و اسمارت مانی',
        excerpt: 'چرا سبک‌های کلاسیک دیگر در بازارهای الگوریتمی امروز جواب نمی‌دهند؟',
        image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600&auto=format&fit=crop',
        category: 'آموزشی',
        content: `...`
    },
    {
        id: 3,
        title: 'قدرت صبر در نوسان‌گیری',
        excerpt: 'روانشناسی انتظار برای رسیدن قیمت به نقطه تعادل پاندول...',
        image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=600&auto=format&fit=crop',
        category: 'روانشناسی',
        content: `...`
    },
    {
        id: 4,
        title: 'تحلیل بیت‌کوین: آیا ۶۰ هزار کف است؟',
        excerpt: 'بررسی تکنیکال بیت‌کوین با دیدگاه پاندولی در تایم فریم روزانه...',
        image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=600&auto=format&fit=crop',
        date: 'امروز',
        category: 'تحلیل تکنیکال',
        relatedSymbol: 'BTCUSD',
        content: 'بیت‌کوین در حال تثبیت روی حمایت روانی ۶۰ هزار دلار است...'
    },
    {
        id: 5,
        title: 'همبستگی طلا و دلار',
        excerpt: 'چگونه حرکت شاخص دلار (DXY) مسیر طلا را مشخص می‌کند؟',
        image: 'https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=600&auto=format&fit=crop',
        date: '۳ روز پیش',
        category: 'آموزشی',
        relatedSymbol: 'XAUUSD',
        content: 'درک همبستگی منفی بین این دو دارایی کلید موفقیت در فارکس است...'
    },
    // NEW Long Term Analysis Posts
    {
        id: 6,
        title: 'نقشه راه بیت‌کوین تا پایان ۲۰۲۵',
        excerpt: 'بررسی چرخه‌های هالوینگ و تاثیر اقتصاد کلان آمریکا بر کریپتوکارنسی‌ها.',
        image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=1000&auto=format&fit=crop',
        date: '۱۴۰۳/۰۸/۱۵',
        time: '۱۰:۳۰',
        author: 'خانم مهندس آریا',
        authorRole: 'تحلیلگر ارشد کریپتو',
        authorImage: TEAM_MEMBERS[3].image,
        category: 'تحلیل بلند مدت',
        relatedSymbol: 'BTCUSD',
        isLongTerm: true,
        content: 'تحلیل جامع بلند مدت بیت‌کوین...'
    },
    {
        id: 7,
        title: 'آیا طلا به ۳۰۰۰ دلار می‌رسد؟',
        excerpt: 'بررسی فاندامنتال طلا با توجه به تنش‌های خاورمیانه و نرخ بهره فد.',
        image: 'https://images.unsplash.com/photo-1610375461246-83df859cd871?q=80&w=1000&auto=format&fit=crop',
        date: '۱۴۰۳/۰۸/۱۴',
        time: '۱۴:۴۵',
        author: 'استاد کیاوش',
        authorRole: 'مبتکر پاندولیسم',
        authorImage: TEAM_MEMBERS[0].image,
        category: 'تحلیل بلند مدت',
        relatedSymbol: 'XAUUSD',
        isLongTerm: true,
        content: 'تحلیل جامع طلا...'
    },
    {
        id: 8,
        title: 'سقوط شاخص دلار (DXY)',
        excerpt: 'سناریوی نزولی برای دلار آمریکا و تاثیر آن بر جفت ارزهای اصلی.',
        image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?q=80&w=1000&auto=format&fit=crop',
        date: '۱۴۰۳/۰۸/۱۲',
        time: '۰۹:۰۰',
        author: 'مهندس راد',
        authorRole: 'Head Trader',
        authorImage: TEAM_MEMBERS[2].image,
        category: 'تحلیل بلند مدت',
        relatedSymbol: 'EURUSD',
        isLongTerm: true,
        content: 'تحلیل شاخص دلار...'
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
export const INSTITUTE_ADDRESS_EN = "Tehran, Jordan, Padidar St., No. 20, Kiawosch Building";
export const INSTITUTE_EMAIL_EN = "info@kiawosch.co";
export const INSTITUTE_TEL_EN = "021 - 88 88 20 20";

export const FOOTER_QUICK_LINKS_EN: NavItem[] = [
  { label: 'Training Courses', id: 'courses-page' },
  { label: 'VIP Signals & Consulting', id: 'signals-page' },
  { label: 'Smart Market Watch', id: 'symbols-page' },
  { label: 'Magazine & Articles', id: 'blog-page' },
];

export const FOOTER_SERVICES_EN: NavItem[] = [
  { label: 'Long-term Analysis', id: 'long-term-analysis' },
  { label: 'Trading Psychology Clinic', id: 'psychology-page' },
  { label: 'About the Institute', id: 'about-page' },
  { label: 'Contact Us', id: 'contact-page' },
];

export const NAV_ITEMS_EN: NavItem[] = [
  { label: 'Home', id: 'home' },
  {
    label: 'Kiawosch Academy',
    id: 'academy',
    subItems: [
      { label: 'Pendulism Courses', id: 'courses-page' },
      { label: 'Trading Psychology', id: 'psychology-page' },
    ]
  },
  {
    label: 'Market Analysis',
    id: 'market',
    subItems: [
      { label: 'Symbol Watch', id: 'symbols-page' },
      { label: 'Long-term Analysis (Free)', id: 'long-term-analysis' },
    ]
  },
  { label: 'Consulting Services', id: 'signals-page' },
  { label: 'Blog & Articles', id: 'blog-page' },
  {
    label: 'About Us',
    id: 'about',
    subItems: [
      { label: 'Our Story & Team', id: 'about-page' },
      { label: 'Contact Us', id: 'contact-page' },
    ]
  },
];

export const SOCIAL_LINKS_EN: SocialLink[] = [
  { platform: 'telegram', label: 'Telegram', url: 'https://t.me/kiawosch' },
  { platform: 'instagram', label: 'Instagram', url: 'https://instagram.com/kiawosch' },
  { platform: 'whatsapp', label: 'WhatsApp', url: 'https://wa.me/989000000000' },
  { platform: 'youtube', label: 'YouTube', url: 'https://youtube.com/@kiawosch' },
];

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

export const MARKET_SYMBOLS_EN: MarketSymbol[] = [
  {
    id: 'sym-1',
    ticker: 'XAUUSD',
    name: 'Global Gold',
    icon: 'https://cdn-icons-png.flaticon.com/512/2535/2535567.png',
    price: '2,045.50',
    change: '+1.25%',
    isPositive: true,
    description: 'Gold, as the king of financial markets, is the most popular asset for Pendulism traders. This precious metal has an inverse correlation with the US Dollar Index (DXY) and US interest rates.',
    characteristics: [
      { label: 'Daily Volatility', value: 'Very High (150+ pips)' },
      { label: 'Best Session', value: 'London & New York' },
      { label: 'Average Spread', value: '1.5 pips' },
      { label: 'Correlation', value: 'Inverse with USD' }
    ],
    technicalSummary: 'Strong bullish trend on daily timeframe. Price has reacted to the weekly supply zone and is pulling back to the 2030 support.',
    chartImage: 'https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'sym-2',
    ticker: 'BTCUSD',
    name: 'Bitcoin',
    icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968260.png',
    price: '64,200.00',
    change: '-0.85%',
    isPositive: false,
    description: 'Bitcoin, as digital gold, exhibits very regular pendulum behavior on higher timeframes. Its sharp fluctuations create excellent scalping opportunities.',
    characteristics: [
      { label: 'Daily Volatility', value: 'Severe (3-5%)' },
      { label: 'Best Session', value: '24 hours (active in Asia)' },
      { label: 'Market Cap', value: '1.2 Trillion USD' },
      { label: 'Dominance', value: '52%' }
    ],
    technicalSummary: 'Currently ranging between 60K and 65K. A negative RSI divergence is visible, strengthening the probability of a correction to 58K.',
    chartImage: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'sym-3',
    ticker: 'EURUSD',
    name: 'Euro vs Dollar',
    icon: 'https://cdn-icons-png.flaticon.com/512/330/330430.png',
    price: '1.0850',
    change: '+0.10%',
    isPositive: true,
    description: 'The most liquid currency pair in the world. Its movements are smoother and more technical compared to gold, making it recommended for beginners with the Pendulism strategy.',
    characteristics: [
      { label: 'Daily Volatility', value: 'Medium (60-80 pips)' },
      { label: 'Best Session', value: 'London/NY Overlap' },
      { label: 'Average Spread', value: '0.5 pips' },
      { label: 'Influenced by', value: 'ECB and Fed news' }
    ],
    technicalSummary: 'Neutral trend. Price is in a weak ascending channel. Waiting for a breakout of 1.0900 to enter a long position.',
    chartImage: 'https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'sym-4',
    ticker: 'USOIL',
    name: 'WTI Crude Oil',
    icon: 'https://cdn-icons-png.flaticon.com/512/2103/2103328.png',
    price: '78.40',
    change: '+2.10%',
    isPositive: true,
    description: 'Oil is the black gold of the market and is heavily influenced by geopolitical news. Trading oil requires precise risk management.',
    characteristics: [
      { label: 'Daily Volatility', value: 'High' },
      { label: 'Best Session', value: 'New York' },
      { label: 'Key Factors', value: 'OPEC, war, US reserves' },
      { label: 'Spread', value: '3 pips' }
    ],
    technicalSummary: 'Breakout of 78 USD resistance with momentum candle. Next target of 82 USD is within reach.',
    chartImage: 'https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=1000&auto=format&fit=crop'
  }
];

export const SIGNAL_PACKAGES_EN: SignalPackage[] = [
  {
    id: 'sig-1',
    title: 'VIP Signal - 1 Month',
    duration: '1 Month',
    price: '2,500,000 Toman',
    priceNum: 2500000,
    features: ['5 to 10 daily signals', 'Gold and forex scalping', 'Morning video analysis', 'Online support'],
    description: 'Suitable for testing signal quality and starting with small capital.',
    longDescription: 'In this plan, you will have access to the VIP Telegram channel for 30 days. All signals include precise entry point, stop loss, and take profit. Additionally, every morning you will receive a short video analyzing the market to understand Master Kiawosch\'s trading perspective.'
  },
  {
    id: 'sig-3',
    title: 'VIP Signal - 3 Months',
    duration: '3 Months',
    price: '6,500,000 Toman',
    priceNum: 6500000,
    isPopular: true,
    features: ['Includes all 1-month benefits', 'Exclusive Bitcoin signals', 'Monthly Q&A webinar', '20% discount'],
    description: 'The best choice for traders seeking consistent profits.',
    longDescription: 'With a 3-month subscription, in addition to gold and currency pair signals, you will also have access to crypto swing signals (Bitcoin and Ethereum). Additionally, once a month you can participate in an online Q&A webinar with the analysis team.'
  },
  {
    id: 'sig-6',
    title: 'Private Consulting (PAMM)',
    duration: '6 Months',
    price: '12,000,000 Toman',
    priceNum: 12000000,
    features: ['Private risk management', 'Direct mentor connection', 'Weekly live trading', 'Money-back guarantee'],
    description: 'For professional investors who need coaching and supervision.',
    longDescription: 'This plan goes beyond a simple signal channel. You will have a dedicated mentor who reviews your trading journal. Also, once a week you will participate in a live trading session to see how trades are executed in real time. If you are not profitable by the end of the course, your subscription fee will be refunded.'
  }
];

export const PSYCHOLOGY_COURSES_EN: PsychologyCourse[] = [
  {
    id: 'psy-1',
    title: 'Mind Management in the Market (Webinar)',
    price: '900,000 Toman',
    type: 'Public',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000&auto=format&fit=crop',
    duration: '8 hours',
    sessionCount: 4,
    startDate: 'Nov 5, 2024',
    instructor: 'Dr. Samimi',
    description: 'An intensive group course to familiarize yourself with common mental traps in trading.',
    longDescription: 'In this interactive webinar, we examine the roots of fear and greed. Why do you exit quickly when in profit but hold onto losses? This course is your gateway to the world of professional trading psychology.',
    features: ['4 online group sessions', 'Q&A at the end of each session', 'Access to recorded files', 'Stress control exercises'],
    syllabus: [
      {
        title: 'Session 1: Anatomy of the Trader\'s Brain',
        duration: '120 minutes',
        topics: [
          'Introduction to the limbic system and neocortex',
          'Why is our brain not designed for trading?',
          'The role of the amygdala in "fight or flight" market reactions',
          'Practical exercise: Identifying the moment fear activates'
        ]
      },
      {
        title: 'Session 2: Recognizing Cognitive Biases',
        duration: '120 minutes',
        topics: [
          'Confirmation Bias in technical analysis',
          'FOMO and its evolutionary roots',
          'Sunk Cost Fallacy',
          'How does news condition our minds?'
        ]
      },
      {
        title: 'Session 3: Emotion Management in Live Trading',
        duration: '120 minutes',
        topics: [
          '4-7-8 breathing techniques to reduce heart rate',
          'Building a psychological checklist before entering a position',
          'Managing anger after stop loss (Revenge Trading)',
          'Dopamine regimen for traders'
        ]
      },
      {
        title: 'Session 4: Building Winning Habits',
        duration: '120 minutes',
        topics: [
          'Morning routine of a professional trader',
          'Importance of sleep and nutrition on financial decision-making',
          'Designing a personal reward and punishment system',
          'Final Q&A'
        ]
      }
    ],
    outcomes: [
      'Reduce stress during trading',
      'Prevent emotional decisions',
      'Familiarity with brain mechanisms'
    ]
  },
  {
    id: 'psy-2',
    title: 'Private Coaching (VIP)',
    price: '5,000,000 Toman',
    type: 'Private',
    image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=1000&auto=format&fit=crop',
    duration: '10 hours + 1 month support',
    sessionCount: 5,
    startDate: 'Starts after interview',
    instructor: 'Dr. Samimi',
    isPopular: true,
    description: 'One-on-one sessions to root out your personal trading problems and rewrite your mind.',
    longDescription: 'This course is completely personalized. Dr. Samimi reviews your trading journals to find your destructive behavioral pattern. Is your problem revenge trading? Or lack of confidence? We build a winning mindset using CBT and NLP techniques.',
    features: ['5 private sessions with Dr. Samimi', 'Analysis of your trading personality', 'Treatment of FOMO and revenge trading', 'Direct WhatsApp support'],
    syllabus: [
      {
        title: 'Session 1: Personality Analysis & MBTI Test',
        duration: '90 minutes',
        topics: [
          'Specialized trading psychology tests',
          'Review of trading history and drawdowns',
          'Identifying repeating loss patterns',
          'Setting coaching course goals'
        ]
      },
      {
        title: 'Session 2: Rewriting Limiting Beliefs',
        duration: '90 minutes',
        topics: [
          'CBT techniques to change negative thoughts',
          'Treating fear of entering trades (Execution Paralysis)',
          'Increasing confidence in analysis',
          'Practical exercise: Emotional journaling'
        ]
      },
      {
        title: 'Session 3: Crisis & Loss Management',
        duration: '90 minutes',
        topics: [
          'Emergency protocols during heavy drawdowns',
          'How to shut down the system after a bad day?',
          'Accepting market uncertainty',
          'Mental visualization techniques'
        ]
      },
      {
        title: 'Session 4: Performance Optimization (Flow State)',
        duration: '90 minutes',
        topics: [
          'How to enter the "Flow" state?',
          'Eliminating environmental distractions',
          'Managing mental energy in long trading sessions',
          'Optimizing trading setup based on personality'
        ]
      },
      {
        title: 'Session 5: Psychological Trading Plan',
        duration: '90 minutes',
        topics: [
          'Drafting personal non-negotiable rules',
          'Psychological contract with yourself',
          '3-month growth plan',
          'Final progress review'
        ]
      }
    ],
    outcomes: [
      'Completely eliminate revenge trading',
      'Increase personal discipline',
      'Build a professional trader personality'
    ]
  },
  {
    id: 'psy-3',
    title: 'Comprehensive Hybrid Course (NeuroTrading)',
    price: '2,500,000 Toman',
    type: 'Hybrid',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1000&auto=format&fit=crop',
    duration: '15 hours',
    sessionCount: 10,
    startDate: 'Instant access + weekly sessions',
    instructor: 'Kiawosch Psychology Team',
    description: 'A combination of recorded educational videos and live Q&A sessions.',
    longDescription: 'In the hybrid course, you first learn the basics of neuroscience in trading through high-quality videos, and then participate in weekly group sessions to share your learnings. This course offers an excellent balance between cost and quality.',
    features: ['Access to recorded videos', '2 private Q&A sessions', 'Membership in mindset practice group', 'Psychology checklists'],
    syllabus: [
      {
        title: 'Module 1: Foundations of Financial Neuroscience',
        duration: '4 hours',
        topics: [
          'Chemical structure of the brain during risk',
          'The role of dopamine in trading addiction',
          'Cortisol and its effect on financial IQ',
          'Difference between amateur and professional brains'
        ]
      },
      {
        title: 'Module 2: Market & Crowd Psychology',
        duration: '3 hours',
        topics: [
          'Market emotional cycles',
          'How not to think like the crowd?',
          'Reading fear and greed from candles',
          'Sentimental indicators'
        ]
      },
      {
        title: 'Module 3: Mind Control Tools',
        duration: '4 hours',
        topics: [
          'Meditation for traders (Mindfulness)',
          'Self-hypnosis techniques for focus',
          'Using music and brain frequencies (Binaural Beats)',
          'Designing an ergonomic trading environment'
        ]
      },
      {
        title: 'Module 4: Psychological Capital Management',
        duration: '4 hours',
        topics: [
          'Relationship between trade size and heart rate',
          'The 1% rule and mental calmness',
          'How not to get excited by big profits?',
          'Profit withdrawal as a brain reward'
        ]
      }
    ],
    outcomes: [
      'Deep understanding of brain function',
      'Ability to manage crises',
      'Improving win rate by filtering emotional trades'
    ]
  }
];

export const SAMPLE_COURSES_EN: Course[] = [
  {
    id: '1',
    title: 'Pendulism Mastery',
    description: 'Comprehensive training of the Pendulism strategy: identifying price balance and imbalance points with microscopic precision.',
    instructor: 'Master Kiawosch',
    duration: '60 hours',
    price: '150,000,000 Toman',
    basePrice: 150000000,
    priceRangeLabel: '150 to 333 million Toman',
    addons: [
      { id: 'mentor', title: 'Private Coaching (6 months)', price: 120000000, priceLabel: '120,000,000+', description: 'Weekly private sessions with Master Kiawosch' },
      { id: 'vip_signal', title: 'Lifetime VIP Subscription', price: 45000000, priceLabel: '45,000,000+', description: 'Permanent access to gold signal channel' },
      { id: 'tools', title: 'Trading Tools Package', price: 18000000, priceLabel: '18,000,000+', description: 'Exclusive dashboard + smart journal' },
    ],
    image: 'https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=1000&auto=format&fit=crop',
    category: 'management',
    syllabus: [
      'Chapter 1: Price Physics and the Law of Balance',
      'Chapter 2: Identifying Zero-Point areas on the chart',
      'Chapter 3: Pendulum reversal setups',
      'Chapter 4: Capital management in Pendulism style',
      'Chapter 5: Live trading on gold and Bitcoin'
    ],
    features: ['3-month mentor support', 'Lifetime update access', 'Exclusive journaling license']
  },
  {
    id: '2',
    title: 'Pendulum Psychology',
    description: 'Synchronizing the mind with market fluctuations; how to be calm yet precise like a pendulum.',
    instructor: 'Dr. Samimi',
    duration: '20 hours',
    price: '5,500,000 Toman',
    image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=1000&auto=format&fit=crop',
    category: 'management',
    syllabus: [
      'Recognizing mental traps in severe fluctuations',
      'Managing fear and greed with neuroscience techniques',
      'Building a professional trader personality',
      'Crisis management in loss'
    ],
    features: ['Group coaching sessions', 'Trading personality tests']
  },
  {
    id: '3',
    title: 'Golden Pendulism Setups',
    description: 'Practical trading workshop on gold (XAUUSD) with strict Pendulism rules.',
    instructor: 'Engineer Rad',
    duration: '45 hours',
    price: '9,000,000 Toman',
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1000&auto=format&fit=crop',
    category: 'programming',
    syllabus: [
      'Analyzing global gold behavior',
      'Gold correlation with US Dollar Index (DXY)',
      '1-minute scalping with Pendulism',
      'Trading during news (NFP, CPI)'
    ],
    features: ['1-month free signal channel', 'Printed trading checklist']
  },
  {
    id: '4',
    title: 'Trading Technical Language',
    description: 'Understanding news and fundamentals that intensify the pendulum swing.',
    instructor: 'Dr. Izadi',
    duration: '30 hours',
    price: '4,000,000 Toman',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop',
    category: 'language',
    syllabus: [
      'Specialized forex and crypto terminology',
      'How to read news sites (ForexFactory, Bloomberg)',
      'Market sentiment analysis from news',
      'Official correspondence with brokers'
    ],
    features: ['Complete vocabulary booklet', 'Translated educational videos']
  }
];

export const TEAM_MEMBERS_EN: TeamMember[] = [
  {
    id: 1,
    name: 'Master Kiawosch',
    role: 'Founder of the Pendulism Strategy',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
    bio: 'Creator of the Pendulism trading style and senior mentor of the institute.',
    fullBio: 'Master Kiawosch has over 15 years of experience in international financial markets. After years of research on price behavior and market physics, he invented the "Pendulism" style. He believes price, like a pendulum, always seeks balance, and extreme deviations are golden trading opportunities. He has guided over 5,000 students toward consistent profitability.',
    specialties: ['Pendulism Strategy', 'Advanced Capital Management', 'Trading System Design']
  },
  {
    id: 2,
    name: 'Dr. Samimi',
    role: 'Trading Psychology Specialist',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    bio: 'Specialist in mind control during severe market fluctuations.',
    fullBio: 'Dr. Samimi holds a PhD in clinical psychology and specializes in neurofinance. In his courses, he teaches traders how to rewire their brain structure to accept risk and tolerate the psychological pressures of financial markets.',
    specialties: ['Trading Psychology', 'Personal Development Coaching', 'Stress Management']
  },
  {
    id: 3,
    name: 'Engineer Rad',
    role: 'Head Trader',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
    bio: 'Specialist in implementing Pendulism algorithms on charts.',
    fullBio: 'Engineer Rad brings an algorithmic perspective to trading with his software engineering background. He is responsible for the institute\'s live trading section and executes Pendulism strategies on lower timeframes (scalping).',
    specialties: ['Price Action RTM', 'Algorithmic Trading', 'On-chain Analysis']
  },
  {
    id: 4,
    name: 'Ms. Engineer Aria',
    role: 'Senior Crypto Analyst',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    bio: 'Analyzing Bitcoin behavior from a Pendulum perspective.',
    fullBio: 'Ms. Aria has been active in the cryptocurrency market since 2016. Her expertise lies in identifying crypto market cycles using Pendulism concepts.',
    specialties: ['Cryptocurrency', 'Fundamental Analysis', 'DeFi']
  },
  {
    id: 5,
    name: 'Mr. Karimi',
    role: 'Risk Manager',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop',
    bio: 'Supervising drawdowns of copy trading accounts.',
    fullBio: 'Mr. Karimi has experience managing investment funds and is responsible for risk control of VIP and copy trading accounts at the institute.',
    specialties: ['Risk Management', 'Portfolio Management', 'Statistics & Probability']
  }
];

export const BLOG_POSTS_EN: BlogPost[] = [
  {
    id: 1,
    title: 'Pendulism in Gold (XAUUSD)',
    excerpt: 'How to hunt global gold reversal points with pip precision? Weekly analysis...',
    image: 'https://images.unsplash.com/photo-1610375461246-83df859cd871?q=80&w=600&auto=format&fit=crop',
    date: '2 days ago',
    category: 'Technical Analysis',
    relatedSymbol: 'XAUUSD',
    content: '...'
  },
  {
    id: 2,
    title: 'Difference Between Pendulism and Smart Money',
    excerpt: 'Why do classical styles no longer work in today\'s algorithmic markets?',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600&auto=format&fit=crop',
    category: 'Educational',
    content: '...'
  },
  {
    id: 3,
    title: 'The Power of Patience in Swing Trading',
    excerpt: 'The psychology of waiting for price to reach the pendulum balance point...',
    image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=600&auto=format&fit=crop',
    category: 'Psychology',
    content: '...'
  },
  {
    id: 4,
    title: 'Bitcoin Analysis: Is 60K the Bottom?',
    excerpt: 'Technical review of Bitcoin with a Pendulum perspective on the daily timeframe...',
    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=600&auto=format&fit=crop',
    date: 'Today',
    category: 'Technical Analysis',
    relatedSymbol: 'BTCUSD',
    content: 'Bitcoin is consolidating above the psychological 60K support level...'
  },
  {
    id: 5,
    title: 'Correlation Between Gold and Dollar',
    excerpt: 'How does the US Dollar Index (DXY) movement determine gold\'s path?',
    image: 'https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=600&auto=format&fit=crop',
    date: '3 days ago',
    category: 'Educational',
    relatedSymbol: 'XAUUSD',
    content: 'Understanding the negative correlation between these two assets is key to success in forex...'
  },
  {
    id: 6,
    title: 'Bitcoin Roadmap to End of 2025',
    excerpt: 'Review of halving cycles and the impact of US macroeconomics on cryptocurrencies.',
    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=1000&auto=format&fit=crop',
    date: '2024/11/05',
    time: '10:30',
    author: 'Ms. Engineer Aria',
    authorRole: 'Senior Crypto Analyst',
    authorImage: TEAM_MEMBERS_EN[3].image,
    category: 'Long-term Analysis',
    relatedSymbol: 'BTCUSD',
    isLongTerm: true,
    content: 'Comprehensive long-term Bitcoin analysis...'
  },
  {
    id: 7,
    title: 'Will Gold Reach $3,000?',
    excerpt: 'Fundamental review of gold considering Middle East tensions and Fed interest rates.',
    image: 'https://images.unsplash.com/photo-1610375461246-83df859cd871?q=80&w=1000&auto=format&fit=crop',
    date: '2024/11/04',
    time: '14:45',
    author: 'Master Kiawosch',
    authorRole: 'Founder of Pendulism',
    authorImage: TEAM_MEMBERS_EN[0].image,
    category: 'Long-term Analysis',
    relatedSymbol: 'XAUUSD',
    isLongTerm: true,
    content: 'Comprehensive gold analysis...'
  },
  {
    id: 8,
    title: 'Dollar Index (DXY) Collapse',
    excerpt: 'Bearish scenario for the US dollar and its impact on major currency pairs.',
    image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?q=80&w=1000&auto=format&fit=crop',
    date: '2024/11/02',
    time: '09:00',
    author: 'Engineer Rad',
    authorRole: 'Head Trader',
    authorImage: TEAM_MEMBERS_EN[2].image,
    category: 'Long-term Analysis',
    relatedSymbol: 'EURUSD',
    isLongTerm: true,
    content: 'Dollar index analysis...'
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