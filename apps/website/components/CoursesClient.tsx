'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Course } from '@/types';
import { Search, BookOpen, Clock, Users, ChevronRight, Star, MonitorPlay, GraduationCap, ArrowRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { localizedPath } from '@/lib/i18n';
import { courseCategoryLabel } from '@/lib/course-categories';

const TEXT = {
  fa: {
    backToHome: 'بازگشت به خانه',
    badge: 'آکادمی آموزش معامله‌گری',
    heading: 'مهارت پول‌ساز',
    headingHighlight: 'قرن ۲۱ را بیاموزید',
    hero: 'دسترسی به جامع‌ترین آرشیو آموزش‌های پاندولیسم. از مبانی مقدماتی تا استراتژی‌های پیشرفته شکار نهنگ‌ها، قدم به قدم با شما هستیم.',
    hdVideos: 'ویدیوهای با کیفیت 4K',
    certificate: 'مدرک پایان دوره',
    searchPlaceholder: 'جستجو در بین دوره‌ها...',
    categories: {
      all: 'همه دوره‌ها',
      management: 'روانشناسی',
      programming: 'استراتژی پاندولیسم',
      language: 'زبان تخصصی',
    },
    score: '۴.۹',
    students: '(۱۲۰ دانشجو)',
    priceLabel: 'شهریه دوره:',
    viewCourse: 'مشاهده دوره',
    empty: 'هیچ دوره‌ای با این مشخصات پیدا نشد.',
  },
  en: {
    backToHome: 'Back to home',
    badge: 'Trading Education Academy',
    heading: 'Learn the money-making skill',
    headingHighlight: 'of the 21st century',
    hero: 'Access the most comprehensive Pendulism training archive. From basic fundamentals to advanced whale-hunting strategies, we walk with you step by step.',
    hdVideos: '4K quality videos',
    certificate: 'Completion certificate',
    searchPlaceholder: 'Search courses...',
    categories: {
      all: 'All courses',
      management: 'Psychology',
      programming: 'Pendulism Strategy',
      language: 'Technical Language',
    },
    score: '4.9',
    students: '(120 students)',
    priceLabel: 'Course tuition:',
    viewCourse: 'View course',
    empty: 'No courses found matching these criteria.',
  },
} as const;

export default function CoursesClient({ courses }: { courses: Course[] }) {
  const router = useRouter();
  const { locale } = useLanguage();
  const text = TEXT[locale];
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: text.categories.all },
    { id: 'management', label: text.categories.management },
    { id: 'programming', label: text.categories.programming },
    { id: 'language', label: text.categories.language },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.includes(searchTerm) || course.description.includes(searchTerm);
    const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background pb-20 pt-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Navigation */}
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

        {/* Redesigned Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0f172a] to-[#334155] border border-gray-800 p-8 md:p-16 mb-16 shadow-2xl">
            {/* Abstract Background Pattern */}
            <div className="absolute top-0 start-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
            <div className="absolute -bottom-24 -end-24 w-64 h-64 bg-primary-500/20 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="flex-1 text-center lg:text-start space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-500 text-xs font-bold border border-primary-500/20">
                        <BookOpen className="w-3 h-3" />
                        {text.badge}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                        {text.heading} <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-300">{text.headingHighlight}</span>
                    </h2>
                    <p className="text-gray-300 text-lg leading-8 max-w-2xl">
                        {text.hero}
                    </p>

                     <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                        <div className="flex items-center gap-2 bg-white/5 backdrop-blur px-4 py-2 rounded-xl border border-white/10">
                            <MonitorPlay className="w-5 h-5 text-blue-400" />
                            <span className="text-gray-300 text-sm">{text.hdVideos}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 backdrop-blur px-4 py-2 rounded-xl border border-white/10">
                            <GraduationCap className="w-5 h-5 text-green-400" />
                            <span className="text-gray-300 text-sm">{text.certificate}</span>
                        </div>
                    </div>
                </div>

                {/* Decorative Visual */}
                <div className="hidden lg:block relative w-80 h-80">
                   <div className="absolute inset-0 bg-primary-500/20 blur-3xl rounded-full"></div>
                   <div className="relative z-10 bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-2xl rotate-6 hover:rotate-0 transition-transform duration-500">
                        <div className="flex items-center gap-4 mb-4 border-b border-slate-700 pb-4">
                            <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center font-bold text-2xl text-black">K</div>
                            <div>
                                <div className="text-white font-bold">Kiawosch Academy</div>
                                <div className="text-slate-400 text-xs">Premium Education</div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="h-2 bg-slate-700 rounded-full w-3/4"></div>
                            <div className="h-2 bg-slate-700 rounded-full w-full"></div>
                            <div className="h-2 bg-slate-700 rounded-full w-5/6"></div>
                        </div>
                        <div className="mt-6 flex justify-between items-center">
                            <div className="text-xs text-slate-400">Total Courses</div>
                            <div className="text-xl font-bold text-white">12+</div>
                        </div>
                   </div>
                </div>
            </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10 bg-surface p-4 rounded-2xl border border-border">
            <div className="flex overflow-x-auto pb-2 lg:pb-0 gap-2 w-full lg:w-auto hide-scrollbar">
                {categories.map((cat) => (
                    <button
                        type="button"
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`whitespace-nowrap px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                            activeCategory === cat.id
                            ? 'bg-primary-500 text-black shadow-lg'
                            : 'bg-background text-muted hover:bg-muted/10 hover:text-foreground'
                        }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            <div className="relative w-full lg:w-96">
                <input
                    type="text"
                    placeholder={text.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-background text-foreground border border-border rounded-xl py-3 ps-12 pe-4 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder-muted"
                />
                <Search className="absolute start-4 top-1/2 -translate-y-1/2 text-muted w-5 h-5" />
            </div>
        </div>

        {/* Course Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <div key={course.id} onClick={() => router.push(localizedPath(`/courses/${course.id}`, locale))} className="group flex flex-col rounded-2xl overflow-hidden bg-surface border border-border hover:border-primary-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-900/10 cursor-pointer relative top-0 hover:-top-2 active:scale-[0.98]">
              <div className="flex-shrink-0 relative overflow-hidden h-56">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-500" src={course.image} alt={course.title} />
                {courseCategoryLabel(course.category, locale) && (
                  <span className="absolute top-4 start-4 z-20 bg-black/60 backdrop-blur-md text-white border border-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                    {courseCategoryLabel(course.category, locale)}
                  </span>
                )}
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-3">
                     <Star className="w-4 h-4 text-primary-500 fill-primary-500"/>
                     <span className="text-sm font-bold text-foreground ms-1">{text.score}</span>
                     <span className="text-xs text-muted ms-1">{text.students}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary-500 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted line-clamp-2 leading-relaxed mb-4">
                    {course.description}
                  </p>
                </div>

                <div className="mt-2 pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-xs text-muted mb-4">
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-primary-500" />
                            <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Users className="w-4 h-4 text-primary-500" />
                            <span>{course.instructor}</span>
                        </div>
                    </div>

                    {/* Enhanced Price Section */}
                    <div className="bg-background rounded-xl p-3 flex items-center justify-between group-hover:bg-primary-500/5 transition-colors">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-muted">{text.priceLabel}</span>
                            <span className="text-lg font-black text-foreground group-hover:text-primary-600 transition-colors">
                                {course.priceRangeLabel || course.price}
                            </span>
                        </div>
                        <button type="button" aria-label={text.viewCourse} className="bg-primary-500 text-black w-8 h-8 flex items-center justify-center rounded-lg shadow-lg hover:bg-primary-400 transition-all">
                          <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                        </button>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
            <div className="text-center py-20 text-muted">
                <p>{text.empty}</p>
            </div>
        )}

      </div>
    </div>
  );
}
