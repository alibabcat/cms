import type { GlobalConfig } from 'payload'

// Bilingual content lives here as per-locale `defaultValue` so the English and
// Persian versions ship inside the CMS itself — no seed script required.
// Editors see both locales pre-filled the first time they open the global.
//
// Payload's `defaultValue` only accepts a per-locale map via a function that
// receives `{ locale }` — passing the `{ en, fa }` object directly makes
// Payload store/render that raw object as the field's value (surfacing as
// "[object Object]" in the admin UI and breaking the front-end fetch).
const localizedDefault =
  <T,>(values: { en: T; fa: T }) =>
  ({ locale }: { locale?: string }) =>
    values[locale as 'en' | 'fa'] ?? values.en

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  access: {
    read: () => true,
  },
  label: {
    en: 'Home Page',
    fa: 'صفحه اصلی',
  },
  fields: [
    // -------------------------------------------------------------------------
    // Hero (first section) — fields kept flat + identically named to the old
    // `hero` global so the front-end Hero component only swaps its data source.
    // -------------------------------------------------------------------------
    {
      name: 'badge',
      type: 'text',
      localized: true,
      label: { en: 'Badge', fa: 'برچسب بالا' },
      defaultValue: localizedDefault({
        en: "Iran's only official Pendulism strategy training center",
        fa: 'تنها مرکز رسمی آموزش استراتژی پاندولیسم در ایران',
      }),
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
      label: { en: 'Title', fa: 'عنوان' },
      defaultValue: localizedDefault({
        en: 'The power of swing trading with',
        fa: 'قدرت نوسان‌گیری با',
      }),
    },
    {
      name: 'titleHighlight',
      type: 'text',
      localized: true,
      label: { en: 'Highlighted Word', fa: 'کلمه برجسته' },
      defaultValue: localizedDefault({
        en: 'the Pendulism Strategy',
        fa: 'استراتژی پاندولیسم',
      }),
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: { en: 'Description', fa: 'توضیحات' },
      defaultValue: localizedDefault({
        en: 'The only specialized center for teaching the exclusive Pendulism strategy and hunting market reversal points. By understanding the law of equilibrium in the market, identify price reversal points before everyone else.',
        fa: 'تنها مرکز تخصصی آموزش استراتژی انحصاری پاندولیسم (Pendulism) و شکار نقاط بازگشتی بازار. با درک قانون تعادل در بازار، نقاط چرخش قیمت را قبل از دیگران شناسایی کنید.',
      }),
    },
    {
      type: 'collapsible',
      label: { en: 'Call to Action', fa: 'دکمه‌ها' },
      fields: [
        {
          name: 'primaryCtaLabel',
          type: 'text',
          localized: true,
          label: { en: 'Primary Button', fa: 'دکمه اصلی' },
          defaultValue: localizedDefault({ en: 'Learn Pendulism', fa: 'یادگیری پاندولیسم' }),
        },
        {
          name: 'secondaryCtaLabel',
          type: 'text',
          localized: true,
          label: { en: 'Secondary Button', fa: 'دکمه فرعی' },
          defaultValue: localizedDefault({ en: 'Free Consultation', fa: 'مشاوره رایگان' }),
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      localized: true,
      maxRows: 4,
      label: { en: 'Stats', fa: 'آمار' },
      fields: [
        {
          name: 'value',
          type: 'text',
          localized: true,
          required: true,
          label: { en: 'Value', fa: 'مقدار' },
        },
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
          label: { en: 'Label', fa: 'برچسب' },
        },
      ],
      defaultValue: localizedDefault({
        en: [
          { value: '+5K', label: 'Pendulism Students' },
          { value: '94%', label: 'Success Rate' },
        ],
        fa: [
          { value: '+۵K', label: 'دانشجوی پاندولیسم' },
          { value: '۹۴٪', label: 'نرخ موفقیت' },
        ],
      }),
    },
    {
      type: 'collapsible',
      label: { en: 'Chart Card', fa: 'کارت نمودار' },
      fields: [
        {
          name: 'cardTag',
          type: 'text',
          localized: true,
          label: { en: 'Tag', fa: 'برچسب' },
          defaultValue: localizedDefault({ en: 'PENDULISM SETUP', fa: 'PENDULISM SETUP' }),
        },
        {
          name: 'cardStatus',
          type: 'text',
          localized: true,
          label: { en: 'Status', fa: 'وضعیت' },
          defaultValue: localizedDefault({ en: 'Pendulum target reached', fa: 'تارگت پاندول لمس شد' }),
        },
        {
          name: 'cardInfo',
          type: 'text',
          localized: true,
          label: { en: 'Info', fa: 'اطلاعات' },
          defaultValue: localizedDefault({ en: 'XAUUSD: Equilibrium point 1240', fa: 'XAUUSD: نقطه تعادل ۱۲۴۰' }),
        },
      ],
    },

    // -------------------------------------------------------------------------
    // Stats section (the 4 metric cards under the hero)
    // -------------------------------------------------------------------------
    {
      name: 'statsSection',
      type: 'group',
      label: { en: 'Stats Section', fa: 'بخش آمار' },
      fields: [
        {
          name: 'items',
          type: 'array',
          localized: true,
          maxRows: 4,
          label: { en: 'Items', fa: 'آیتم‌ها' },
          fields: [
            {
              name: 'value',
              type: 'text',
              localized: true,
              required: true,
              label: { en: 'Value', fa: 'مقدار' },
            },
            {
              name: 'label',
              type: 'text',
              localized: true,
              required: true,
              label: { en: 'Label', fa: 'برچسب' },
            },
            {
              name: 'description',
              type: 'text',
              localized: true,
              label: { en: 'Description', fa: 'توضیح' },
            },
          ],
          defaultValue: localizedDefault({
            en: [
              { value: '98%', label: 'Student Satisfaction', description: 'of 5,000 participants' },
              { value: '+85%', label: 'Pendulism Win Rate', description: 'in gold trading' },
              { value: '+1200', label: 'Monthly Profitability', description: 'pips net profit' },
              { value: '#1', label: 'Training Rank', description: 'Pendulism Strategy' },
            ],
            fa: [
              { value: '۹۸٪', label: 'رضایت دانشجویان', description: 'از ۵۰۰۰ شرکت‌کننده' },
              { value: '+۸۵٪', label: 'وین‌ریت پاندولیسم', description: 'در معاملات طلا' },
              { value: '+۱۲۰۰', label: 'سودآوری ماهانه', description: 'پیپ سود خالص' },
              { value: '#۱', label: 'رتبه آموزشی', description: 'استراتژی پاندولیسم' },
            ],
          }),
        },
      ],
    },

    // -------------------------------------------------------------------------
    // Long-term analysis section
    // -------------------------------------------------------------------------
    {
      name: 'analysisSection',
      type: 'group',
      label: { en: 'Analysis Section', fa: 'بخش تحلیل بلند مدت' },
      fields: [
        {
          name: 'badge',
          type: 'text',
          localized: true,
          label: { en: 'Badge', fa: 'برچسب بالا' },
          defaultValue: localizedDefault({ en: 'Long-Term Vision', fa: 'Long-Term Vision' }),
        },
        {
          name: 'heading',
          type: 'text',
          localized: true,
          required: true,
          label: { en: 'Heading', fa: 'عنوان' },
          defaultValue: localizedDefault({ en: 'Long-Term Market Analysis', fa: 'تحلیل‌های بلند مدت بازار' }),
        },
        {
          name: 'highlight',
          type: 'text',
          localized: true,
          label: { en: 'Highlighted Word', fa: 'کلمه برجسته' },
          defaultValue: localizedDefault({ en: 'Long-Term', fa: 'بلند مدت' }),
        },
        {
          name: 'subheading',
          type: 'textarea',
          localized: true,
          label: { en: 'Subheading', fa: 'زیرعنوان' },
          defaultValue: localizedDefault({
            en: "Monthly and yearly market roadmaps from the perspective of Kiawosch's senior mentors. These analyses are completely free.",
            fa: 'نقشه راه ماهانه و سالانه مارکت از دیدگاه اساتید ارشد مجموعه کیاوش. این تحلیل‌ها کاملاً رایگان هستند.',
          }),
        },
        {
          name: 'ctaLabel',
          type: 'text',
          localized: true,
          label: { en: 'Archive Link', fa: 'متن آرشیو' },
          defaultValue: localizedDefault({ en: 'View Analysis Archive', fa: 'مشاهده آرشیو تحلیل‌ها' }),
        },
        {
          name: 'freeBadge',
          type: 'text',
          localized: true,
          label: { en: 'Free Badge', fa: 'برچسب رایگان' },
          defaultValue: localizedDefault({ en: 'Free', fa: 'رایگان' }),
        },
        {
          name: 'readMoreLabel',
          type: 'text',
          localized: true,
          label: { en: 'Read More', fa: 'مطالعه کامل' },
          defaultValue: localizedDefault({ en: 'Read More', fa: 'مطالعه کامل' }),
        },
      ],
    },

    // -------------------------------------------------------------------------
    // About / method section
    // -------------------------------------------------------------------------
    {
      name: 'aboutSection',
      type: 'group',
      label: { en: 'About Section', fa: 'بخش درباره متد' },
      fields: [
        {
          name: 'badge',
          type: 'text',
          localized: true,
          label: { en: 'Badge', fa: 'برچسب بالا' },
          defaultValue: localizedDefault({ en: 'About Our Method', fa: 'درباره متد ما' }),
        },
        {
          name: 'heading',
          type: 'text',
          localized: true,
          required: true,
          label: { en: 'Heading', fa: 'عنوان' },
          defaultValue: localizedDefault({ en: 'Why is the Pendulism Strategy different?', fa: 'چرا استراتژی پاندولیسم متفاوت است؟' }),
        },
        {
          name: 'highlight',
          type: 'text',
          localized: true,
          label: { en: 'Highlighted Word', fa: 'کلمه برجسته' },
          defaultValue: localizedDefault({ en: 'Pendulism', fa: 'پاندولیسم' }),
        },
        {
          name: 'body',
          type: 'textarea',
          localized: true,
          label: { en: 'Body', fa: 'متن' },
          defaultValue: localizedDefault({
            en: 'Unlike common styles such as Smart Money that have become saturated, Pendulism is built on the laws of physics and the price tendency toward equilibrium. We find the points where price, like a pendulum, is forced to return after a sharp deviation.',
            fa: 'برخلاف سبک‌های رایج مثل اسمارت مانی که اشباع شده‌اند، پاندولیسم بر اساس قوانین فیزیک و میل قیمت به تعادل بنا شده است. ما نقاطی را پیدا می‌کنیم که قیمت مانند یک پاندول، پس از انحراف شدید، مجبور به بازگشت است.',
          }),
        },
        {
          name: 'points',
          type: 'array',
          localized: true,
          label: { en: 'Bullet Points', fa: 'نقاط کلیدی' },
          fields: [
            {
              name: 'text',
              type: 'text',
              localized: true,
              required: true,
              label: { en: 'Text', fa: 'متن' },
            },
          ],
          defaultValue: localizedDefault({
            en: [
              { text: 'Precise identification of Reversal Points' },
              { text: 'No need for complex and lagging indicators' },
              { text: 'Suitable for gold scalping and crypto swing trading' },
              { text: 'Dedicated support from Pendulism mentors' },
            ],
            fa: [
              { text: 'شناسایی دقیق نقاط چرخش (Reversal Points)' },
              { text: 'بدون نیاز به اندیکاتورهای پیچیده و تاخیری' },
              { text: 'مناسب برای اسکالپ طلا و نوسان‌گیری کریپتو' },
              { text: 'پشتیبانی اختصاصی منتورهای پاندولیسم' },
            ],
          }),
        },
        {
          name: 'ctaLabel',
          type: 'text',
          localized: true,
          label: { en: 'CTA Link', fa: 'متن دکمه' },
          defaultValue: localizedDefault({ en: 'Free Consultation about Pendulism', fa: 'مشاوره رایگان درباره پاندولیسم' }),
        },
        {
          name: 'imageCaptionTitle',
          type: 'text',
          localized: true,
          label: { en: 'Image Caption Title', fa: 'عنوان روی تصویر' },
          defaultValue: localizedDefault({ en: 'Headquarters', fa: 'دفتر مرکزی' }),
        },
        {
          name: 'imageCaptionSubtitle',
          type: 'text',
          localized: true,
          label: { en: 'Image Caption Subtitle', fa: 'زیرعنوان روی تصویر' },
          defaultValue: localizedDefault({ en: 'Tehran, Financial Towers', fa: 'تهران، برج‌های مالی' }),
        },
        {
          name: 'floatBadgeTitle',
          type: 'text',
          localized: true,
          label: { en: 'Floating Badge Title', fa: 'عنوان بج شناور' },
          defaultValue: localizedDefault({ en: 'Pendulism', fa: 'پاندولیسم' }),
        },
        {
          name: 'floatBadgeSubtitle',
          type: 'text',
          localized: true,
          label: { en: 'Floating Badge Subtitle', fa: 'زیرعنوان بج شناور' },
          defaultValue: localizedDefault({ en: 'The new generation of technical analysis', fa: 'نسل جدید تحلیل تکنیکال' }),
        },
      ],
    },

    // -------------------------------------------------------------------------
    // Courses section (chrome only — courses come from the courses collection)
    // -------------------------------------------------------------------------
    {
      name: 'coursesSection',
      type: 'group',
      label: { en: 'Courses Section', fa: 'بخش دوره‌ها' },
      fields: [
        {
          name: 'badge',
          type: 'text',
          localized: true,
          label: { en: 'Badge', fa: 'برچسب بالا' },
          defaultValue: localizedDefault({ en: 'Kiawosch Specialized Academy', fa: 'آکادمی تخصصی کیاوش' }),
        },
        {
          name: 'heading',
          type: 'text',
          localized: true,
          required: true,
          label: { en: 'Heading', fa: 'عنوان' },
          defaultValue: localizedDefault({ en: 'Path to Mastering Financial Markets', fa: 'مسیر تسلط بر بازارهای مالی' }),
        },
        {
          name: 'highlight',
          type: 'text',
          localized: true,
          label: { en: 'Highlighted Word', fa: 'کلمه برجسته' },
          defaultValue: localizedDefault({ en: 'Financial Markets', fa: 'بازارهای مالی' }),
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          label: { en: 'Description', fa: 'توضیحات' },
          defaultValue: localizedDefault({
            en: 'This is not just a training course; this is where you learn how to spot smart money on the chart. Invest in your financial future.',
            fa: 'اینجا فقط یک دوره آموزشی نیست؛ اینجا جایی است که یاد می‌گیرید چگونه پول هوشمند را در چارت شناسایی کنید. روی آینده مالی خود سرمایه‌گذاری کنید.',
          }),
        },
        {
          name: 'featurePills',
          type: 'array',
          localized: true,
          label: { en: 'Feature Pills', fa: 'ویژگی‌های کلیدی' },
          fields: [
            {
              name: 'text',
              type: 'text',
              localized: true,
              required: true,
              label: { en: 'Text', fa: 'متن' },
            },
          ],
          defaultValue: localizedDefault({
            en: [
              { text: 'Money-back Guarantee' },
              { text: 'Lifetime Updates' },
            ],
            fa: [
              { text: 'گارانتی بازگشت وجه' },
              { text: 'آپدیت‌های مادام‌العمر' },
            ],
          }),
        },
        {
          name: 'statsValue',
          type: 'text',
          localized: true,
          label: { en: 'Stats Value', fa: 'مقدار آمار' },
          defaultValue: localizedDefault({ en: '+5,200', fa: '+۵,۲۰۰' }),
        },
        {
          name: 'statsLabel',
          type: 'text',
          localized: true,
          label: { en: 'Stats Label', fa: 'برچسب آمار' },
          defaultValue: localizedDefault({ en: 'Successful Students', fa: 'دانشجوی موفق' }),
        },
        {
          name: 'statsSubtext',
          type: 'text',
          localized: true,
          label: { en: 'Stats Subtext', fa: 'زیرمتن آمار' },
          defaultValue: localizedDefault({ en: '85% Satisfaction Rate', fa: '۸۵٪ نرخ رضایت' }),
        },
        {
          name: 'priceLabel',
          type: 'text',
          localized: true,
          label: { en: 'Price Label', fa: 'برچسب قیمت' },
          defaultValue: localizedDefault({ en: 'Course Tuition:', fa: 'شهریه دوره:' }),
        },
        {
          name: 'mobileNote',
          type: 'text',
          localized: true,
          label: { en: 'Mobile Note', fa: 'توجه موبایل' },
          defaultValue: localizedDefault({
            en: 'Use the menu to see all courses',
            fa: 'برای مشاهده همه دوره‌ها از منو استفاده کنید',
          }),
        },
      ],
    },

    // -------------------------------------------------------------------------
    // Signal / VIP section
    // -------------------------------------------------------------------------
    {
      name: 'signalSection',
      type: 'group',
      label: { en: 'Signal Section', fa: 'بخش سیگنال' },
      fields: [
        {
          name: 'badge',
          type: 'text',
          localized: true,
          label: { en: 'Badge', fa: 'برچسب بالا' },
          defaultValue: localizedDefault({ en: 'VIP SIGNALS', fa: 'VIP SIGNALS' }),
        },
        {
          name: 'heading',
          type: 'text',
          localized: true,
          required: true,
          label: { en: 'Heading', fa: 'عنوان' },
          defaultValue: localizedDefault({ en: 'Pendulism Signal Channel', fa: 'کانال سیگنال پاندولیسم' }),
        },
        {
          name: 'highlight',
          type: 'text',
          localized: true,
          label: { en: 'Highlighted Word', fa: 'کلمه برجسته' },
          defaultValue: localizedDefault({ en: 'Pendulism', fa: 'پاندولیسم' }),
        },
        {
          name: 'subheading',
          type: 'textarea',
          localized: true,
          label: { en: 'Subheading', fa: 'زیرعنوان' },
          defaultValue: localizedDefault({
            en: 'Earn income even while you sleep by copy trading from the creators of Pendulism.',
            fa: 'با کپی تریدینگ از روی دست خالقین پاندولیسم، حتی در خواب هم کسب درآمد کنید.',
          }),
        },
        {
          name: 'features',
          type: 'array',
          localized: true,
          label: { en: 'Features', fa: 'ویژگی‌ها' },
          fields: [
            {
              name: 'heading',
              type: 'text',
              localized: true,
              required: true,
              label: { en: 'Heading', fa: 'عنوان' },
            },
            {
              name: 'body',
              type: 'textarea',
              localized: true,
              label: { en: 'Body', fa: 'متن' },
            },
          ],
          defaultValue: localizedDefault({
            en: [
              { heading: 'Hunting Zero Points', body: 'Our signals are issued exactly where the price pendulum has stopped and is ready to turn.' },
              { heading: 'Win Rate Above 85%', body: 'Due to the reversal nature of the Pendulism strategy, the risk-to-reward ratio of trades is very high.' },
              { heading: 'Full Transparency', body: 'All setups come with video analysis so you learn the logic of Pendulism.' },
            ],
            fa: [
              { heading: 'شکار نقاط صفر', body: 'سیگنال‌های ما دقیقاً در نقاطی صادر می‌شوند که پاندول قیمت متوقف شده و آماده چرخش است.' },
              { heading: 'وین ریت بالای ۸۵٪', body: 'به دلیل ماهیت بازگشتی استراتژی پاندولیسم، ریسک به ریوارد معاملات بسیار بالاست.' },
              { heading: 'شفافیت کامل', body: 'تمامی ستاپ‌ها همراه با تحلیل ویدئویی ارائه می‌شوند تا منطق پاندولیسم را یاد بگیرید.' },
            ],
          }),
        },
        {
          name: 'ctaLabel',
          type: 'text',
          localized: true,
          label: { en: 'CTA Button', fa: 'متن دکمه' },
          defaultValue: localizedDefault({ en: 'Join the VIP Channel', fa: 'عضویت در کانال VIP' }),
        },
        {
          name: 'statsCardHeading',
          type: 'text',
          localized: true,
          label: { en: 'Stats Card Heading', fa: 'عنوان کارت آمار' },
          defaultValue: localizedDefault({ en: 'Last Month Performance', fa: 'عملکرد ماه گذشته' }),
        },
        {
          name: 'statsCardValue',
          type: 'text',
          localized: true,
          label: { en: 'Stats Card Value', fa: 'مقدار کارت آمار' },
          defaultValue: localizedDefault({ en: '+1,240%', fa: '+1,240%' }),
        },
        {
          name: 'statsCardSubtext',
          type: 'text',
          localized: true,
          label: { en: 'Stats Card Subtext', fa: 'زیرمتن کارت آمار' },
          defaultValue: localizedDefault({ en: 'Net profit with the Pendulism strategy', fa: 'سود خالص با استراتژی پاندولیسم' }),
        },
      ],
    },

    // -------------------------------------------------------------------------
    // Team section (chrome only — members come from the team-members collection)
    // -------------------------------------------------------------------------
    {
      name: 'teamSection',
      type: 'group',
      label: { en: 'Team Section', fa: 'بخش تیم' },
      fields: [
        {
          name: 'heading',
          type: 'text',
          localized: true,
          required: true,
          label: { en: 'Heading', fa: 'عنوان' },
          defaultValue: localizedDefault({ en: 'Creators of the Pendulism Strategy', fa: 'خالقین استراتژی پاندولیسم' }),
        },
        {
          name: 'highlight',
          type: 'text',
          localized: true,
          label: { en: 'Highlighted Word', fa: 'کلمه برجسته' },
          defaultValue: localizedDefault({ en: 'Pendulism', fa: 'پاندولیسم' }),
        },
        {
          name: 'subheading',
          type: 'textarea',
          localized: true,
          label: { en: 'Subheading', fa: 'زیرعنوان' },
          defaultValue: localizedDefault({
            en: 'A team of the best traders who developed the Pendulism strategy.',
            fa: 'تیمی متشکل از بهترین تریدرها که استراتژی پاندولیسم را توسعه داده‌اند.',
          }),
        },
      ],
    },

    // -------------------------------------------------------------------------
    // Psychology section
    // -------------------------------------------------------------------------
    {
      name: 'psychologySection',
      type: 'group',
      label: { en: 'Psychology Section', fa: 'بخش روانشناسی' },
      fields: [
        {
          name: 'badge',
          type: 'text',
          localized: true,
          label: { en: 'Badge', fa: 'برچسب بالا' },
          defaultValue: localizedDefault({ en: 'Psychology of Trading', fa: 'Psychology of Trading' }),
        },
        {
          name: 'heading',
          type: 'text',
          localized: true,
          required: true,
          label: { en: 'Heading', fa: 'عنوان' },
          defaultValue: localizedDefault({ en: '90% of trading success is psychology', fa: '۹۰٪ موفقیت در ترید، روانشناسی است' }),
        },
        {
          name: 'highlight',
          type: 'text',
          localized: true,
          label: { en: 'Highlighted Word', fa: 'کلمه برجسته' },
          defaultValue: localizedDefault({ en: 'psychology', fa: 'روانشناسی' }),
        },
        {
          name: 'subheading',
          type: 'textarea',
          localized: true,
          label: { en: 'Subheading', fa: 'زیرعنوان' },
          defaultValue: localizedDefault({
            en: 'Technical analysis is only 20% of the journey. Without mind control, no strategy is profitable. At Kiawosch, we work on your mindset.',
            fa: 'تکنیکال تنها ۲۰ درصد مسیر است. بدون کنترل ذهن، هیچ استراتژی سودده نیست. در کیاوش، روی ذهنیت شما کار می‌کنیم.',
          }),
        },
        {
          name: 'cards',
          type: 'array',
          localized: true,
          label: { en: 'Cards', fa: 'کارت‌ها' },
          fields: [
            {
              name: 'heading',
              type: 'text',
              localized: true,
              required: true,
              label: { en: 'Heading', fa: 'عنوان' },
            },
            {
              name: 'body',
              type: 'textarea',
              localized: true,
              label: { en: 'Body', fa: 'متن' },
            },
          ],
          defaultValue: localizedDefault({
            en: [
              { heading: 'Emotion Control (FOMO)', body: 'You learn how to overcome the fear of missing out (FOMO) and greed, and trade like a robot.' },
              { heading: 'Discipline & Order', body: 'Trading is not gambling. We help you build an accurate trading journal and stay loyal to your plan.' },
              { heading: 'Resilience in Loss', body: 'Loss is part of the game. What matters is how you recover your mindset after a loss and return to the market.' },
            ],
            fa: [
              { heading: 'کنترل احساسات (Fomo)', body: 'یاد می‌گیرید چگونه بر ترس از دست دادن (FOMO) و طمع غلبه کنید و مانند یک ربات معامله کنید.' },
              { heading: 'دیسیپلین و نظم', body: 'ترید قمار نیست. ما به شما کمک می‌کنیم یک ژورنال معاملاتی دقیق بسازید و به پلن خود وفادار بمانید.' },
              { heading: 'تاب‌آوری در ضرر', body: 'ضرر بخشی از بازی است. مهم این است که چگونه پس از ضرر، ذهنیت خود را بازیابی کنید و به بازار برگردید.' },
            ],
          }),
        },
        {
          name: 'ctaHeading',
          type: 'text',
          localized: true,
          label: { en: 'CTA Heading', fa: 'عنوان دعوت' },
          defaultValue: localizedDefault({ en: 'Free Trading Psychology Course', fa: 'دوره رایگان روانشناسی ترید' }),
        },
        {
          name: 'ctaSubtext',
          type: 'text',
          localized: true,
          label: { en: 'CTA Subtext', fa: 'زیرمتن دعوت' },
          defaultValue: localizedDefault({
            en: 'A 5-session mini course to change your attitude toward the market',
            fa: 'مینی دوره ۵ جلسه‌ای برای تغییر نگرش شما به بازار',
          }),
        },
        {
          name: 'ctaLabel',
          type: 'text',
          localized: true,
          label: { en: 'CTA Button', fa: 'متن دکمه' },
          defaultValue: localizedDefault({ en: 'Get Free', fa: 'دریافت رایگان' }),
        },
      ],
    },

    // -------------------------------------------------------------------------
    // Blog section (chrome only — posts come from the blog-posts collection)
    // -------------------------------------------------------------------------
    {
      name: 'blogSection',
      type: 'group',
      label: { en: 'Blog Section', fa: 'بخش وبلاگ' },
      fields: [
        {
          name: 'heading',
          type: 'text',
          localized: true,
          required: true,
          label: { en: 'Heading', fa: 'عنوان' },
          defaultValue: localizedDefault({ en: 'Latest Articles & Analyses', fa: 'آخرین مقالات و تحلیل‌ها' }),
        },
        {
          name: 'highlight',
          type: 'text',
          localized: true,
          label: { en: 'Highlighted Word', fa: 'کلمه برجسته' },
          defaultValue: localizedDefault({ en: 'Articles', fa: 'مقالات' }),
        },
        {
          name: 'archiveLinkLabel',
          type: 'text',
          localized: true,
          label: { en: 'Archive Link (desktop)', fa: 'متن آرشیو (دسکتاپ)' },
          defaultValue: localizedDefault({ en: 'View Archive', fa: 'مشاهده آرشیو' }),
        },
        {
          name: 'archiveLinkLabelMobile',
          type: 'text',
          localized: true,
          label: { en: 'Archive Link (mobile)', fa: 'متن آرشیو (موبایل)' },
          defaultValue: localizedDefault({ en: 'View Article Archive', fa: 'مشاهده آرشیو مقالات' }),
        },
        {
          name: 'readMoreLabel',
          type: 'text',
          localized: true,
          label: { en: 'Read More', fa: 'ادامه مطلب' },
          defaultValue: localizedDefault({ en: 'Read More', fa: 'ادامه مطلب' }),
        },
      ],
    },

    // -------------------------------------------------------------------------
    // Newsletter section
    // -------------------------------------------------------------------------
    {
      name: 'newsletterSection',
      type: 'group',
      label: { en: 'Newsletter Section', fa: 'بخش خبرنامه' },
      fields: [
        {
          name: 'heading',
          type: 'text',
          localized: true,
          required: true,
          label: { en: 'Heading', fa: 'عنوان' },
          defaultValue: localizedDefault({
            en: "Don't miss out! Daily analyses in your inbox",
            fa: 'جا نمانید! تحلیل‌های روزانه در ایمیل شما',
          }),
        },
        {
          name: 'subheading',
          type: 'textarea',
          localized: true,
          label: { en: 'Subheading', fa: 'زیرعنوان' },
          defaultValue: localizedDefault({
            en: 'Subscribe to the newsletter and receive free daily trading setups for gold and Bitcoin every morning.',
            fa: 'عضو خبرنامه شوید و هر روز صبح، ستاپ‌های معاملاتی طلا و بیت‌کوین را رایگان دریافت کنید.',
          }),
        },
        {
          name: 'inputPlaceholder',
          type: 'text',
          localized: true,
          label: { en: 'Input Placeholder', fa: 'متن جایگزین ایمیل' },
          defaultValue: localizedDefault({ en: 'Enter your email', fa: 'ایمیل خود را وارد کنید' }),
        },
        {
          name: 'buttonLabel',
          type: 'text',
          localized: true,
          label: { en: 'Button', fa: 'متن دکمه' },
          defaultValue: localizedDefault({ en: 'Free Subscription', fa: 'عضویت رایگان' }),
        },
        {
          name: 'disclaimer',
          type: 'text',
          localized: true,
          label: { en: 'Disclaimer', fa: 'توضیح پایین' },
          defaultValue: localizedDefault({
            en: '* We hate spam too. Only educational content is sent.',
            fa: '* ما هم از اسپم متنفریم. فقط مطالب آموزشی ارسال می‌شود.',
          }),
        },
      ],
    },
  ],
}
