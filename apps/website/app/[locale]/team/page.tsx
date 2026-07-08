import Link from 'next/link';
import { Target, Users, Globe, Award, Twitter, Linkedin } from 'lucide-react';
import BackButton from '@/components/BackButton';
import { INSTITUTE_NAME } from '@/constants';
import { getTeamMembers } from '@/lib/payload';
import { getServerLocale } from '@/lib/locale';
import { localizedPath } from '@/lib/i18n';

const TEXT = {
  fa: {
    heading: 'داستان',
    headingHighlight: 'کیاوش',
    subtitle: 'ما معتقدیم بازارهای مالی جای قمار نیستند، بلکه میدانی برای نبرد هوش و صبر هستند.',
    valueTransparencyTitle: 'شفافیت مطلق',
    valueTransparencyBody: 'ما تمام نتایج، چه سود و چه ضرر را در کانال عمومی منتشر می‌کنیم.',
    valueCommunityTitle: 'جامعه محور',
    valueCommunityBody: 'دانشجویان ما وارد یک اکوسیستم می‌شوند که دائما در حال یادگیری هستند.',
    valueStandardTitle: 'استاندارد جهانی',
    valueStandardBody: 'محتوای آموزشی ما دائما با تغییرات الگوریتم‌های بانکی (HFT) بروزرسانی می‌شود.',
    valueQualityTitle: 'کیفیت بر کمیت',
    valueQualityBody: 'دوره‌های ما محدود، تخصصی و نتیجه‌گرا هستند.',
    teamHeading: 'تیم تحلیل و آموزش',
    teamHeadingHighlight: 'کیاوش',
    viewBio: 'برای مشاهده رزومه کلیک کنید',
    originTitle: 'پیدایش پاندولیسم',
    originP1: 'در سال ۱۳۹۵، پس از سال‌ها فعالیت در بازارهای جهانی و مشاهده ضررهای سنگین تریدرهای ایرانی که از روش‌های منسوخ استفاده می‌کردند، ایده تاسیس یک آکادمی متفاوت شکل گرفت.',
    originP2: 'استاد کیاوش با ترکیب قوانین فیزیک (قانون سوم نیوتن) و روانشناسی رفتاری بازار، متدی را ابداع کرد که به جای دنبال کردن قیمت، منتظر بازگشت آن به نقطه تعادل می‌ماند. ما این متد را',
    originMethodName: 'پاندولیسم',
    originP3: (name: string) => `امروز، موسسه ${name} با بیش از ۵۰۰۰ دانشجو و ده‌ها تریدر فعال، بزرگترین کامیونیتی تخصصی بازگشت روند (Reversal Trading) در ایران است.`,
  },
  en: {
    heading: 'The',
    headingHighlight: 'Kiawosch Story',
    subtitle: 'We believe financial markets are not a place for gambling, but an arena for the battle of intellect and patience.',
    valueTransparencyTitle: 'Absolute Transparency',
    valueTransparencyBody: 'We publish all results, wins and losses alike, in our public channel.',
    valueCommunityTitle: 'Community Driven',
    valueCommunityBody: 'Our students join an ecosystem that is constantly learning.',
    valueStandardTitle: 'Global Standard',
    valueStandardBody: 'Our educational content is constantly updated with changes in bank (HFT) algorithms.',
    valueQualityTitle: 'Quality over Quantity',
    valueQualityBody: 'Our courses are limited, specialized, and results-driven.',
    teamHeading: 'The Kiawosch',
    teamHeadingHighlight: 'Analysis & Education Team',
    viewBio: 'Click to view resume',
    originTitle: 'The Origin of Pendulism',
    originP1: 'In 2016, after years of activity in global markets and witnessing the heavy losses of Iranian traders using outdated methods, the idea of founding a different kind of academy took shape.',
    originP2: 'Master Kiawosch combined the laws of physics (Newton’s third law) with market behavioral psychology to devise a method that, instead of following the price, waits for it to return to its equilibrium point. We called this method',
    originMethodName: 'Pendulism',
    originP3: (name: string) => `Today, the ${name} Institute, with over 5,000 students and dozens of active traders, is the largest specialized reversal-trading community in Iran.`,
  },
} as const;

export default async function TeamPage() {
  const locale = await getServerLocale();
  const text = TEXT[locale];
  let members: Awaited<ReturnType<typeof getTeamMembers>> = [];
  try {
    members = await getTeamMembers({ locale });
  } catch {
    members = [];
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <BackButton />

            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-black text-foreground mb-6">
                    {text.heading} <span className="text-primary-500">{text.headingHighlight}</span>
                </h1>
                <p className="text-xl text-muted leading-relaxed max-w-3xl mx-auto">
                    {text.subtitle}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                <div className="bg-surface p-8 rounded-2xl border border-border">
                    <div className="bg-primary-500/10 w-12 h-12 rounded-lg flex items-center justify-center text-primary-500 mb-4"><Target className="w-6 h-6" /></div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{text.valueTransparencyTitle}</h3>
                    <p className="text-muted text-sm">{text.valueTransparencyBody}</p>
                </div>
                <div className="bg-surface p-8 rounded-2xl border border-border">
                    <div className="bg-primary-500/10 w-12 h-12 rounded-lg flex items-center justify-center text-primary-500 mb-4"><Users className="w-6 h-6" /></div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{text.valueCommunityTitle}</h3>
                    <p className="text-muted text-sm">{text.valueCommunityBody}</p>
                </div>
                <div className="bg-surface p-8 rounded-2xl border border-border">
                    <div className="bg-primary-500/10 w-12 h-12 rounded-lg flex items-center justify-center text-primary-500 mb-4"><Globe className="w-6 h-6" /></div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{text.valueStandardTitle}</h3>
                    <p className="text-muted text-sm">{text.valueStandardBody}</p>
                </div>
                <div className="bg-surface p-8 rounded-2xl border border-border">
                    <div className="bg-primary-500/10 w-12 h-12 rounded-lg flex items-center justify-center text-primary-500 mb-4"><Award className="w-6 h-6" /></div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{text.valueQualityTitle}</h3>
                    <p className="text-muted text-sm">{text.valueQualityBody}</p>
                </div>
            </div>

            <div className="mb-20">
                <h2 className="text-3xl font-black text-foreground text-center mb-12">{text.teamHeading} <span className="text-primary-500">{text.teamHeadingHighlight}</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {members.map((member) => (
                        <Link
                            key={member.id}
                            href={localizedPath(`/team/${member.id}`, locale)}
                            className="bg-surface rounded-3xl overflow-hidden border border-border hover:border-primary-500 transition-all duration-300 group cursor-pointer hover:-translate-y-2 shadow-xl block"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-90"></div>
                                <div className="absolute bottom-4 start-4">
                                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                                    <p className="text-primary-500 font-medium text-sm">{member.role}</p>
                                </div>
                            </div>
                            <div className="p-6 pt-2">
                                <p className="text-muted text-sm leading-relaxed mb-6 h-12 line-clamp-2">{member.bio}</p>
                                <div className="flex items-center justify-between border-t border-border pt-4">
                                    <span className="text-xs text-muted">{text.viewBio}</span>
                                    <div className="flex gap-3">
                                        <Linkedin className="w-4 h-4 text-muted hover:text-foreground" />
                                        <Twitter className="w-4 h-4 text-muted hover:text-foreground" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="bg-surface rounded-3xl p-8 md:p-12 border border-border mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6">{text.originTitle}</h2>
                <div className="prose prose-invert max-w-none text-muted leading-8 text-lg">
                    <p>{text.originP1}</p>
                    <p>{text.originP2} <strong>&quot;{text.originMethodName}&quot;</strong>.</p>
                    <p>{text.originP3(INSTITUTE_NAME)}</p>
                </div>
            </div>

        </div>
    </div>
  );
}
