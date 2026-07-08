'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Course, TeamMember } from '@/types';
import { getTeamMembers } from '@/lib/payload';
import { useLanguage } from './LanguageContext';
import { localizedPath } from '@/lib/i18n';
import { courseCategoryLabel } from '@/lib/course-categories';
import { ArrowRight, Clock, User, CheckCircle2, ShieldCheck, TrendingUp, Sparkles, ChevronRight, Calendar, Layers, MessageCircle, BookOpen, ExternalLink, PlusCircle, Check } from 'lucide-react';

const TEXT = {
  fa: {
    backToAcademy: 'بازگشت به آکادمی',
    genericCategory: 'دوره آموزشی',
    enrollmentOpen: 'وضعیت: ثبت نام باز',
    duration: 'مدت دوره',
    instructorLabel: 'مدرس',
    chapterCount: 'تعداد سرفصل',
    chapterSuffix: 'فصل',
    startDate: 'شروع دوره',
    instantAccess: 'دسترسی آنی',
    aboutCourse: 'درباره این دوره',
    extraParagraph: (instructor: string) =>
      `در این دوره تخصصی، ما فراتر از تحلیل تکنیکال کلاسیک می‌رویم. استراتژی پاندولیسم به شما می‌آموزد که چارت را نه به صورت کندل‌های تصادفی، بلکه به عنوان یک سیستم فیزیکی زنده ببینید که همواره به دنبال تعادل است. این دوره حاصل سال‌ها تجربه استاد ${instructor} در بازارهای مالی است.`,
    whyEssential: 'چرا این دوره ضروری است؟',
    whyEssentialBody: 'تسلط بر این مباحث به شما کمک می‌کند تا نقاط چرخش بازار را با دقت بالا شناسایی کنید و از تله‌های نقدینگی که اکثر معامله‌گران خرد درگیر آن می‌شوند، دوری کنید.',
    syllabus: 'سرفصل‌های آموزشی',
    chaptersComplete: (n: number) => `${n} فصل جامع`,
    finalPrice: 'قیمت نهایی دوره',
    addonsTitle: 'خدمات تکمیلی (اختیاری)',
    enrollWithAddons: 'ثبت نام با خدمات ویژه',
    enroll: 'ثبت نام در دوره',
    capacity: 'ظرفیت دوره:',
    capacityOpen: 'ثبت نام آزاد',
    supportFeature: 'پشتیبانی مستقیم مدرس',
    updatesFeature: 'آپدیت‌های رایگان',
    moneyBack: 'گارانتی بازگشت وجه (۷ روز)',
    seniorInstructor: 'مدرس ارشد کیاوش',
    instructorQuote: '"بازار همیشه فرصت‌های جدیدی می‌سازد، اما سرمایه شما محدود است. ما به شما یاد می‌دهیم فقط بهترین فرصت‌ها را شکار کنید."',
    viewBio: 'مشاهده بیوگرافی و رزومه',
    haveQuestion: 'سوال دارید؟',
    freeConsult: 'مشاوره رایگان قبل از خرید',
    finalPriceShort: 'قیمت نهایی',
    coursePriceShort: 'قیمت دوره',
    enrollOnline: 'ثبت نام آنلاین',
    currencySuffix: ' تومان',
    numberLocale: 'fa-IR',
  },
  en: {
    backToAcademy: 'Back to Academy',
    genericCategory: 'Course',
    enrollmentOpen: 'Status: Enrollment open',
    duration: 'Duration',
    instructorLabel: 'Instructor',
    chapterCount: 'Chapters',
    chapterSuffix: 'chapters',
    startDate: 'Start date',
    instantAccess: 'Instant access',
    aboutCourse: 'About this course',
    extraParagraph: (instructor: string) =>
      `In this specialized course, we go beyond classic technical analysis. The Pendulism strategy teaches you to see the chart not as random candles, but as a living physical system always seeking equilibrium. This course is the product of years of experience from instructor ${instructor} in the financial markets.`,
    whyEssential: 'Why is this course essential?',
    whyEssentialBody: 'Mastering these topics helps you identify market turning points with high precision and avoid the liquidity traps that most retail traders get caught in.',
    syllabus: 'Course Syllabus',
    chaptersComplete: (n: number) => `${n} comprehensive chapters`,
    finalPrice: 'Final course price',
    addonsTitle: 'Add-on services (optional)',
    enrollWithAddons: 'Enroll with add-ons',
    enroll: 'Enroll in course',
    capacity: 'Capacity:',
    capacityOpen: 'Open enrollment',
    supportFeature: 'Direct instructor support',
    updatesFeature: 'Free updates',
    moneyBack: 'Money-back guarantee (7 days)',
    seniorInstructor: 'Kiawosch Senior Instructor',
    instructorQuote: '"The market always creates new opportunities, but your capital is limited. We teach you to hunt only the best ones."',
    viewBio: 'View bio and resume',
    haveQuestion: 'Have a question?',
    freeConsult: 'Free consultation before purchase',
    finalPriceShort: 'Final price',
    coursePriceShort: 'Course price',
    enrollOnline: 'Enroll online',
    currencySuffix: ' Toman',
    numberLocale: 'en-US',
  },
} as const;

interface CourseDetailProps {
  course: Course;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course }) => {
  const router = useRouter();
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<string>(course.price);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const { locale } = useLanguage();
  const text = TEXT[locale];

  useEffect(() => {
    getTeamMembers({ locale }).then(setMembers).catch(console.error);
  }, [locale]);

  // Find the instructor profile based on the name
  const instructorProfile = members.find(m => course.instructor.includes(m.name) || m.name.includes(course.instructor));

  // Calculate dynamic price
  useEffect(() => {
    if (course.basePrice) {
        let currentTotal = course.basePrice;
        if (course.addons) {
            course.addons.forEach(addon => {
                if (selectedAddons.includes(addon.id)) {
                    currentTotal += addon.price;
                }
            });
        }
        // Format number to currency string
        setTotalPrice(new Intl.NumberFormat(text.numberLocale).format(currentTotal) + text.currencySuffix);
    } else {
        setTotalPrice(course.price);
    }
  }, [selectedAddons, course, text]);

  const toggleAddon = (addonId: string) => {
      setSelectedAddons(prev =>
          prev.includes(addonId)
          ? prev.filter(id => id !== addonId)
          : [...prev, addonId]
      );
  };

  const scrollToPricing = () => {
    const element = document.getElementById('pricing-card');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen bg-background pt-10 pb-24 lg:pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb / Back */}
        <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center text-muted hover:text-primary-500 mb-8 transition-colors"
        >
            <ArrowRight className="w-5 h-5 me-2" />
            {text.backToAcademy}
        </button>

        {/* Layout Grid - Matches PsychologyDetail structure for sticky sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">

            {/* Main Content */}
            <div className="lg:col-span-8 space-y-8">
                {/* Hero Image & Title */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border group">
                    <img src={course.image} alt={course.title} className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
                    <div className="absolute bottom-0 start-0 p-8 w-full">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-primary-500 text-black px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                {courseCategoryLabel(course.category, locale) ?? text.genericCategory}
                            </span>
                             <span className="bg-surface/80 backdrop-blur text-foreground border border-border px-3 py-1 rounded-full text-xs font-bold">
                                {text.enrollmentOpen}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-6 shadow-sm">{course.title}</h1>

                        {/* Course Metadata */}
                        <div className="bg-surface/30 backdrop-blur-md rounded-xl p-4 border border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex flex-col gap-1">
                                <span className="text-muted text-xs">{text.duration}</span>
                                <span className="text-foreground font-bold flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary-500"/> {course.duration}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-muted text-xs">{text.instructorLabel}</span>
                                <span className="text-foreground font-bold flex items-center gap-1.5"><User className="w-4 h-4 text-primary-500"/> {course.instructor}</span>
                            </div>
                             <div className="flex flex-col gap-1">
                                <span className="text-muted text-xs">{text.chapterCount}</span>
                                <span className="text-foreground font-bold flex items-center gap-1.5"><Layers className="w-4 h-4 text-primary-500"/> {course.syllabus ? course.syllabus.length : 0} {text.chapterSuffix}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-muted text-xs">{text.startDate}</span>
                                <span className="text-foreground font-bold flex items-center gap-1.5"><Calendar className="w-4 h-4 text-primary-500"/> {text.instantAccess}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="bg-surface rounded-2xl p-8 border border-border">
                    <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary-500" />
                        {text.aboutCourse}
                    </h2>
                    <p className="text-muted leading-8 text-lg mb-6 text-justify">
                        {course.description}
                    </p>
                     <p className="text-muted leading-8 text-lg mb-6 text-justify">
                        {text.extraParagraph(course.instructor)}
                    </p>
                    <div className="bg-primary-500/5 border border-primary-500/10 rounded-xl p-6">
                        <h3 className="font-bold text-foreground mb-3 text-sm">{text.whyEssential}</h3>
                        <p className="text-muted text-sm leading-6">
                             {text.whyEssentialBody}
                        </p>
                    </div>
                </div>

                {/* Syllabus */}
                {course.syllabus && (
                    <div className="bg-surface rounded-2xl p-8 border border-border">
                         <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
                             <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                                <BookOpen className="w-6 h-6 text-primary-500" />
                                {text.syllabus}
                            </h2>
                            <span className="text-xs bg-primary-500/10 text-primary-500 px-3 py-1 rounded-full font-bold">
                                {text.chaptersComplete(course.syllabus.length)}
                            </span>
                        </div>

                        <div className="space-y-4">
                            {course.syllabus.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 bg-background p-5 rounded-xl border border-border hover:border-primary-500 transition-all duration-300 group">
                                    <div className="w-10 h-10 rounded-full bg-surface border border-border group-hover:bg-primary-500 group-hover:text-black flex items-center justify-center font-bold text-muted group-hover:border-primary-500 transition-colors">
                                        {idx + 1}
                                    </div>
                                    <span className="text-foreground font-medium text-lg">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Sidebar (Sticky) */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6 h-fit z-10">

                {/* Price Card */}
                <div id="pricing-card" className="bg-surface rounded-2xl p-6 border border-border shadow-2xl shadow-primary-500/5 relative overflow-hidden">
                    <div className="absolute top-0 end-0 w-full h-1 bg-gradient-to-r from-primary-500 via-amber-300 to-primary-500"></div>

                    <div className="text-center mb-6 pt-4">
                        {course.priceRangeLabel && selectedAddons.length === 0 ? (
                            <span className="text-primary-500 text-sm font-bold block mb-2 bg-primary-500/10 py-1 px-3 rounded-full mx-auto w-fit border border-primary-500/20">
                                {course.priceRangeLabel}
                            </span>
                        ) : (
                             <span className="text-muted text-xs block mb-2">{text.finalPrice}</span>
                        )}
                        <div className="text-4xl font-black text-foreground transition-all duration-300">{totalPrice}</div>
                    </div>

                    {/* Add-ons Selection */}
                    {course.addons && course.addons.length > 0 && (
                        <div className="mb-6 bg-background rounded-xl p-4 border border-border">
                            <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                                <PlusCircle className="w-4 h-4 text-primary-500" />
                                {text.addonsTitle}
                            </h4>
                            <div className="space-y-3">
                                {course.addons.map(addon => (
                                    <div
                                        key={addon.id}
                                        onClick={() => toggleAddon(addon.id)}
                                        className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                                            selectedAddons.includes(addon.id)
                                            ? 'bg-primary-500/10 border-primary-500'
                                            : 'bg-surface border-transparent hover:bg-surface/80'
                                        }`}
                                    >
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                                            selectedAddons.includes(addon.id) ? 'bg-primary-500 border-primary-500' : 'border-muted'
                                        }`}>
                                            {selectedAddons.includes(addon.id) && <Check className="w-3 h-3 text-black" />}
                                        </div>
                                        <div>
                                            <div className="flex justify-between w-full gap-2">
                                                <span className="text-sm font-bold text-foreground">{addon.title}</span>
                                                <span className="text-xs text-primary-500 font-mono whitespace-nowrap">{addon.priceLabel}</span>
                                            </div>
                                            {addon.description && (
                                                <p className="text-xs text-muted mt-1 leading-4">{addon.description}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <button type="button" className="w-full bg-primary-500 hover:bg-primary-400 text-black font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all transform hover:scale-105 mb-4 flex items-center justify-center gap-2 group">
                        {selectedAddons.length > 0 ? text.enrollWithAddons : text.enroll}
                        <ChevronRight className="w-5 h-5 rtl:rotate-180 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="text-center text-xs text-muted mb-6 bg-background py-2 rounded-lg border border-border">
                        {text.capacity} <span className="text-green-500 font-bold">{text.capacityOpen}</span>
                    </div>

                    <div className="space-y-4 border-t border-border pt-6">
                        {course.features && course.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-sm text-muted">
                                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0"/>
                                <span>{feature}</span>
                            </div>
                        ))}
                         {!course.features && (
                            <>
                                <div className="flex items-center gap-3 text-sm text-muted">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0"/>
                                    <span>{text.supportFeature}</span>
                                </div>
                                 <div className="flex items-center gap-3 text-sm text-muted">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0"/>
                                    <span>{text.updatesFeature}</span>
                                </div>
                            </>
                        )}
                        <div className="flex items-center gap-3 text-sm text-muted bg-green-500/5 p-2 rounded-lg border border-green-500/10">
                            <ShieldCheck className="w-4 h-4 text-green-500 flex-shrink-0"/>
                            <span>{text.moneyBack}</span>
                        </div>
                    </div>
                </div>

                {/* Instructor Card - Clickable if profile exists */}
                <div
                    onClick={() => instructorProfile && router.push(localizedPath(`/team/${instructorProfile.id}`, locale))}
                    className={`bg-gradient-to-br from-primary-900/20 to-background border border-primary-500/20 rounded-2xl p-6 relative overflow-hidden group ${instructorProfile ? 'cursor-pointer hover:border-primary-500 transition-all' : ''}`}
                >
                    {instructorProfile && (
                        <div className="absolute top-4 end-4 bg-primary-500/20 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="w-4 h-4 text-primary-500" />
                        </div>
                    )}
                    <div className="absolute top-0 start-0 w-20 h-20 bg-primary-500/10 rounded-full blur-2xl"></div>
                    <div className="flex items-center gap-3 mb-4 relative z-10">
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary-500 shadow-lg">
                             <img src={instructorProfile ? instructorProfile.image : "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"} alt={course.instructor} className="w-full h-full object-cover"/>
                        </div>
                        <div>
                            <h4 className="font-bold text-foreground text-sm flex items-center gap-1">
                                {course.instructor}
                            </h4>
                            <span className="text-xs text-primary-500 font-bold">{text.seniorInstructor}</span>
                        </div>
                    </div>
                    <div className="relative z-10 bg-surface/50 p-3 rounded-xl border border-border">
                        <p className="text-xs text-muted leading-5 italic">
                            {text.instructorQuote}
                        </p>
                    </div>
                    {instructorProfile && (
                         <div className="mt-4 text-center text-xs text-primary-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                            {text.viewBio}
                        </div>
                    )}
                </div>

                {/* Support Card */}
                <div className="bg-surface rounded-2xl p-4 border border-border flex items-center gap-4 hover:border-primary-500 transition-colors cursor-pointer group shadow-lg">
                    <div className="bg-green-500/10 p-3 rounded-full text-green-500 group-hover:bg-green-500 group-hover:text-black transition-colors">
                        <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="font-bold text-foreground text-sm">{text.haveQuestion}</p>
                        <p className="text-xs text-muted mt-1">{text.freeConsult}</p>
                    </div>
                     <ChevronRight className="w-4 h-4 text-muted ms-auto group-hover:text-primary-500 rtl:rotate-180" />
                </div>

            </div>
        </div>

        {/* Mobile Sticky Register Button */}
        <div className="fixed bottom-0 end-0 start-0 z-40 bg-surface/90 backdrop-blur-lg border-t border-border p-4 lg:hidden pb-safe">
            <div className="flex items-center gap-4">
                 <div className="flex flex-col">
                     <span className="text-xs text-muted mb-0.5">
                         {selectedAddons.length > 0 ? text.finalPriceShort : text.coursePriceShort}
                     </span>
                     <span className="text-foreground font-black text-lg whitespace-nowrap">{totalPrice}</span>
                 </div>
                 <button
                    type="button"
                    onClick={scrollToPricing}
                    className="flex-1 bg-primary-500 hover:bg-primary-400 text-black font-bold py-3.5 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all flex items-center justify-center gap-2"
                 >
                    {text.enrollOnline}
                    <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                 </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
