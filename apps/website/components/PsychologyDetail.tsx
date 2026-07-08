'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PsychologyCourse, TeamMember } from '@/types';
import { ArrowRight, Clock, Users, User, Video, CheckCircle2, ShieldCheck, BrainCircuit, Target, Sparkles, ChevronRight, Calendar, Layers, ChevronDown, ChevronUp, MessageCircle, ExternalLink, PlusCircle, Check } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { localizedPath } from '@/lib/i18n';

const TEXT = {
  fa: {
    backToClinic: 'بازگشت به کلینیک روانشناسی',
    tradingPsychology: 'روانشناسی ترید',
    typePrivate: 'خصوصی (VIP)',
    typePublic: 'وبینار گروهی',
    typeHybrid: 'دوره هیبرید',
    duration: 'مدت دوره',
    instructor: 'مدرس',
    sessionCount: 'تعداد جلسات',
    sessionSuffix: 'جلسه',
    schedule: 'زمان برگزاری',
    aboutCourse: 'درباره این دوره',
    whyEssential: 'چرا این دوره ضروری است؟',
    whyEssentialBody: 'تحلیل تکنیکال به شما می‌گوید "کی" وارد شوید، اما روانشناسی تعیین می‌کند که آیا "جرات" ورود را دارید یا خیر. این دوره حلقه گمشده موفقیت شماست.',
    outcomes: 'دستاوردهای شما',
    syllabus: 'سرفصل‌های آموزشی',
    sessionsComprehensive: (n: number) => `${n} جلسه تخصصی`,
    finalPrice: 'قیمت نهایی دوره',
    addonsTitle: 'خدمات تکمیلی (اختیاری)',
    enrollWithAddons: 'ثبت نام با خدمات ویژه',
    enrollOnline: 'ثبت نام آنلاین',
    limitedCapacity: 'ظرفیت این دوره محدود است',
    effectivenessGuarantee: 'گارانتی اثربخشی دوره',
    seniorInstructor: 'مدرس ارشد روانشناسی',
    instructorQuote: '"تکنیکال به شما نقطه ورود می‌دهد، اما این روانشناسی است که به شما اجازه می‌دهد سود را نگه دارید. در این دوره، سیم‌کشی مغزتان را برای موفقیت تغییر می‌دهیم."',
    viewBio: 'مشاهده بیوگرافی و رزومه',
    needConsultation: 'نیاز به مشاوره دارید؟',
    talkToExperts: 'با کارشناسان ما صحبت کنید',
    finalPriceShort: 'قیمت نهایی',
    coursePriceShort: 'قیمت دوره',
    currencySuffix: ' تومان',
    numberLocale: 'fa-IR',
  },
  en: {
    backToClinic: 'Back to psychology clinic',
    tradingPsychology: 'Trading Psychology',
    typePrivate: 'Private (VIP)',
    typePublic: 'Group webinar',
    typeHybrid: 'Hybrid course',
    duration: 'Duration',
    instructor: 'Instructor',
    sessionCount: 'Number of sessions',
    sessionSuffix: 'sessions',
    schedule: 'Schedule',
    aboutCourse: 'About this course',
    whyEssential: 'Why is this course essential?',
    whyEssentialBody: 'Technical analysis tells you "when" to enter, but psychology determines whether you have the "courage" to enter. This course is the missing link to your success.',
    outcomes: 'Your outcomes',
    syllabus: 'Course Syllabus',
    sessionsComprehensive: (n: number) => `${n} specialized sessions`,
    finalPrice: 'Final course price',
    addonsTitle: 'Add-on services (optional)',
    enrollWithAddons: 'Enroll with add-ons',
    enrollOnline: 'Enroll online',
    limitedCapacity: 'This course has limited capacity',
    effectivenessGuarantee: 'Course effectiveness guarantee',
    seniorInstructor: 'Senior Psychology Instructor',
    instructorQuote: '"Technical analysis gives you the entry point, but it\'s psychology that lets you keep the profit. In this course, we rewire your brain for success."',
    viewBio: 'View bio and resume',
    needConsultation: 'Need a consultation?',
    talkToExperts: 'Talk to our specialists',
    finalPriceShort: 'Final price',
    coursePriceShort: 'Course price',
    currencySuffix: ' Toman',
    numberLocale: 'en-US',
  },
} as const;

interface PsychologyDetailProps {
  course: PsychologyCourse;
  teamMembers: TeamMember[];
}

const PsychologyDetail: React.FC<PsychologyDetailProps> = ({ course, teamMembers }) => {
  const router = useRouter();
  const { locale } = useLanguage();
  const text = TEXT[locale];
  const [openSectionIndex, setOpenSectionIndex] = useState<number | null>(0);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<string>(course.price);

  // Find the instructor profile based on the name
  const instructorProfile = teamMembers.find(m => course.instructor.includes(m.name) || m.name.includes(course.instructor));

  const toggleSection = (index: number) => {
    setOpenSectionIndex(openSectionIndex === index ? null : index);
  };

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

  const typeLabel = course.type === 'Private' ? text.typePrivate : course.type === 'Public' ? text.typePublic : text.typeHybrid;

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
            {text.backToClinic}
        </button>

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
                                <BrainCircuit className="w-3 h-3" />
                                {text.tradingPsychology}
                            </span>
                            <span className="bg-surface/80 backdrop-blur text-foreground border border-border px-3 py-1 rounded-full text-xs font-bold">
                                {typeLabel}
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
                                <span className="text-muted text-xs">{text.instructor}</span>
                                <span className="text-foreground font-bold flex items-center gap-1.5"><User className="w-4 h-4 text-primary-500"/> {course.instructor}</span>
                            </div>
                             <div className="flex flex-col gap-1">
                                <span className="text-muted text-xs">{text.sessionCount}</span>
                                <span className="text-foreground font-bold flex items-center gap-1.5"><Layers className="w-4 h-4 text-primary-500"/> {course.sessionCount} {text.sessionSuffix}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-muted text-xs">{text.schedule}</span>
                                <span className="text-foreground font-bold flex items-center gap-1.5"><Calendar className="w-4 h-4 text-primary-500"/> {course.startDate}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Long Description */}
                <div className="bg-surface rounded-2xl p-8 border border-border">
                    <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary-500" />
                        {text.aboutCourse}
                    </h2>
                    <p className="text-muted leading-8 text-lg mb-6 text-justify">
                        {course.longDescription || course.description}
                    </p>
                    <div className="bg-primary-500/5 border border-primary-500/10 rounded-xl p-6">
                        <h3 className="font-bold text-foreground mb-3 text-sm">{text.whyEssential}</h3>
                        <p className="text-muted text-sm leading-6">
                            {text.whyEssentialBody}
                        </p>
                    </div>
                </div>

                {/* Outcomes */}
                {course.outcomes && (
                    <div className="bg-surface rounded-2xl p-8 border border-border">
                        <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-4 flex items-center gap-2">
                            <Target className="w-6 h-6 text-primary-500" />
                            {text.outcomes}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {course.outcomes.map((outcome, idx) => (
                                <div key={idx} className="flex items-start gap-3 bg-background p-3 rounded-xl">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-muted font-medium">{outcome}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Syllabus (Accordion) */}
                {course.syllabus && (
                    <div className="bg-surface rounded-2xl p-8 border border-border">
                        <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
                             <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                                <Layers className="w-6 h-6 text-primary-500" />
                                {text.syllabus}
                            </h2>
                            <span className="text-xs bg-primary-500/10 text-primary-500 px-3 py-1 rounded-full font-bold">
                                {text.sessionsComprehensive(course.syllabus.length)}
                            </span>
                        </div>

                        <div className="space-y-4">
                            {course.syllabus.map((item, idx) => (
                                <div key={idx} className={`border rounded-xl overflow-hidden transition-all duration-300 ${openSectionIndex === idx ? 'border-primary-500 bg-background shadow-lg' : 'border-border bg-background/50 hover:bg-background'}`}>
                                    <button
                                        type="button"
                                        onClick={() => toggleSection(idx)}
                                        className="w-full flex items-center justify-between p-5 text-start focus:outline-none"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${openSectionIndex === idx ? 'bg-primary-500 text-black' : 'bg-surface border border-border text-muted'}`}>
                                                {idx + 1}
                                            </div>
                                            <span className={`font-bold text-lg transition-colors ${openSectionIndex === idx ? 'text-primary-500' : 'text-foreground'}`}>
                                                {item.title}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-muted hidden sm:inline-block bg-surface px-2 py-1 rounded border border-border">
                                                {item.duration}
                                            </span>
                                            {openSectionIndex === idx ? <ChevronUp className="w-5 h-5 text-primary-500" /> : <ChevronDown className="w-5 h-5 text-muted" />}
                                        </div>
                                    </button>

                                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openSectionIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <div className="p-5 pt-0 border-t border-dashed border-border mt-2">
                                            <ul className="space-y-3 mt-4">
                                                {item.topics.map((topic, tIdx) => (
                                                    <li key={tIdx} className="flex items-start gap-3 text-muted text-sm group">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 group-hover:scale-125 transition-transform"></div>
                                                        <span className="group-hover:text-foreground transition-colors">{topic}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Sidebar (Sticky) - Applied sticky here directly */}
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
                        {selectedAddons.length > 0 ? text.enrollWithAddons : text.enrollOnline}
                        <ChevronRight className="w-5 h-5 rtl:rotate-180 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="text-center text-xs text-muted mb-6 bg-background py-2 rounded-lg border border-border">
                        {text.limitedCapacity}
                    </div>

                    <div className="space-y-4 border-t border-border pt-6">
                        {course.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-sm text-muted">
                                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0"/>
                                <span>{feature}</span>
                            </div>
                        ))}
                        <div className="flex items-center gap-3 text-sm text-muted bg-green-500/5 p-2 rounded-lg border border-green-500/10">
                            <ShieldCheck className="w-4 h-4 text-green-500 flex-shrink-0"/>
                            <span>{text.effectivenessGuarantee}</span>
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
                             <img src={instructorProfile ? instructorProfile.image : "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"} alt={course.instructor} className="w-full h-full object-cover"/>
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
                        <p className="font-bold text-foreground text-sm">{text.needConsultation}</p>
                        <p className="text-xs text-muted mt-1">{text.talkToExperts}</p>
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

export default PsychologyDetail;
