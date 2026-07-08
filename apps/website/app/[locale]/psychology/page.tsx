import React from 'react';
import Link from 'next/link';
import { BrainCircuit, User, Users, Video, Star, Clock, ChevronRight, ShieldCheck, Zap } from 'lucide-react';
import { getPsychologyCourses } from '@/lib/payload';
import { getServerLocale } from '@/lib/locale';
import { localizedPath } from '@/lib/i18n';
import BackButton from '@/components/BackButton';

const TEXT = {
  fa: {
    clinicBadge: 'کلینیک روانشناسی ترید',
    heading: 'مدیریت ذهن،',
    headingHighlight: 'راز پنهان تریدرهای موفق',
    hero: 'ترید کردن ۹۰٪ جنگ روانی با خودتان است. در اینجا یاد می‌گیرید چگونه ذهن خود را برای برنده شدن در بازارهای مالی برنامه‌ریزی مجدد کنید و از تله‌های ذهنی دوری کنید.',
    personalityTests: 'تست‌های شخصیت شناسی',
    privateCoaching: 'کوچینگ اختصاصی',
    specialOffer: 'پیشنهاد ویژه',
    typePrivate: 'خصوصی',
    typePublic: 'گروهی',
    typeHybrid: 'هیبرید',
    score: '۵.۰',
    fullSatisfaction: '(رضایت کامل)',
    priceLabel: 'شهریه دوره:',
    viewCourse: 'مشاهده دوره',
  },
  en: {
    clinicBadge: 'Trading Psychology Clinic',
    heading: 'Master your mind,',
    headingHighlight: 'the hidden secret of successful traders',
    hero: 'Trading is 90% a psychological battle with yourself. Here you learn how to reprogram your mind to win in the financial markets and avoid mental traps.',
    personalityTests: 'Personality assessments',
    privateCoaching: 'Private coaching',
    specialOffer: 'Special offer',
    typePrivate: 'Private',
    typePublic: 'Group',
    typeHybrid: 'Hybrid',
    score: '5.0',
    fullSatisfaction: '(Full satisfaction)',
    priceLabel: 'Course tuition:',
    viewCourse: 'View course',
  },
} as const;

export default async function PsychologyPage() {
    const locale = await getServerLocale();
    const text = TEXT[locale];
    let courses: Awaited<ReturnType<typeof getPsychologyCourses>> = [];
    try {
      courses = await getPsychologyCourses({ locale });
    } catch {
      courses = [];
    }
    return (
    <div className="min-h-screen bg-background pb-20 pt-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <BackButton />

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1e1b4b] to-[#312e81] border border-indigo-900/50 p-8 md:p-16 mb-16 shadow-2xl">
            <div className="absolute top-0 start-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
            <div className="absolute -bottom-24 -start-24 w-64 h-64 bg-pink-500/20 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="flex-1 text-center lg:text-start space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20">
                        <BrainCircuit className="w-3 h-3" />
                        {text.clinicBadge}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                        {text.heading} <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-300">{text.headingHighlight}</span>
                    </h2>
                    <p className="text-indigo-200 text-lg leading-8 max-w-2xl">
                        {text.hero}
                    </p>

                     <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                        <div className="flex items-center gap-2 bg-white/5 backdrop-blur px-4 py-2 rounded-xl border border-white/10">
                            <ShieldCheck className="w-5 h-5 text-green-400" />
                            <span className="text-gray-300 text-sm">{text.personalityTests}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 backdrop-blur px-4 py-2 rounded-xl border border-white/10">
                            <Zap className="w-5 h-5 text-pink-400" />
                            <span className="text-gray-300 text-sm">{text.privateCoaching}</span>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:block relative w-80 h-80">
                   <div className="absolute inset-0 bg-indigo-500/30 blur-3xl rounded-full"></div>
                   <img src="https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=400&auto=format&fit=crop" className="relative z-10 w-full h-full object-cover rounded-3xl border border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500" alt="Psychology" />
                </div>
            </div>
        </div>

        {/* Course Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
                <Link key={course.id} href={localizedPath(`/psychology/${course.id}`, locale)} className="group flex flex-col rounded-2xl overflow-hidden bg-surface border border-border hover:border-primary-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-900/10 cursor-pointer relative top-0 hover:-top-2">

                    {course.isPopular && (
                        <div className="absolute top-4 end-4 z-20 bg-primary-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                            <Star className="w-3 h-3 fill-black text-black"/>
                            {text.specialOffer}
                        </div>
                    )}

                    <div className="flex-shrink-0 relative overflow-hidden h-56">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                        <img className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-500" src={course.image} alt={course.title} />
                        <span className="absolute top-4 start-4 z-20 bg-black/60 backdrop-blur-md text-white border border-gray-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                            {course.type === 'Private' ? <User className="w-3 h-3"/> : course.type === 'Public' ? <Users className="w-3 h-3"/> : <Video className="w-3 h-3"/>}
                            {course.type === 'Private' ? text.typePrivate : course.type === 'Public' ? text.typePublic : text.typeHybrid}
                        </span>
                    </div>

                    <div className="flex-1 p-5 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-1 mb-2">
                                <Star className="w-3 h-3 text-amber-400 fill-amber-400"/>
                                <span className="text-xs font-bold text-foreground ms-1">{text.score}</span>
                                <span className="text-[10px] text-muted">{text.fullSatisfaction}</span>
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary-500 transition-colors">
                                {course.title}
                            </h3>
                            <p className="text-sm text-muted line-clamp-2 leading-relaxed mb-4">
                                {course.description}
                            </p>
                        </div>

                        <div className="mt-2 pt-4 border-t border-border">
                            <div className="flex items-center justify-between text-xs text-muted mb-4">
                                <div className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5 text-primary-500" />
                                    <span>{course.duration}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <User className="w-3.5 h-3.5 text-primary-500" />
                                    <span>{course.instructor}</span>
                                </div>
                            </div>

                            <div className="bg-background rounded-xl p-3 flex items-center justify-between group-hover:bg-primary-500/5 transition-colors">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-muted">{text.priceLabel}</span>
                                    <span className="text-lg font-black text-foreground group-hover:text-primary-600 transition-colors">{course.price}</span>
                                </div>
                                <button type="button" aria-label={text.viewCourse} className="bg-primary-500 text-black w-8 h-8 flex items-center justify-center rounded-lg shadow-lg hover:bg-primary-400 transition-all">
                                  <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                                </button>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
