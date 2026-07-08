import React from 'react';
import Link from 'next/link';
import { getCourses } from '@/lib/payload';
import { getServerLocale } from '@/lib/locale';
import { localizedPath } from '@/lib/i18n';
import { courseCategoryLabel } from '@/lib/course-categories';
import { CoursesSectionContent } from '@/types';
import Highlighted from './Highlighted';
import { Clock, Users, ChevronRight, Star, TrendingUp, ShieldCheck, Zap } from 'lucide-react';

// Presentation icons for the feature pills, keyed by index.
const PILL_ICONS = [
  <ShieldCheck className="w-5 h-5 text-green-400" key="shield" />,
  <Zap className="w-5 h-5 text-amber-400" key="zap" />,
];

const RATING_TEXT = {
  fa: { score: '۴.۹', votes: '(از ۱۲۰ رای)', viewCourse: 'مشاهده دوره' },
  en: { score: '4.9', votes: '(120 reviews)', viewCourse: 'View course' },
} as const;

interface CourseListProps {
  data: CoursesSectionContent;
}

const CourseList: React.FC<CourseListProps> = async ({ data }) => {
  const locale = await getServerLocale();
  const courses = (await getCourses({ locale })).slice(0, 4);

  return (
    <div id="courses" className="bg-background py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* Redesigned Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0f172a] to-[#1e293b] border border-gray-800 p-8 md:p-16 mb-16 shadow-2xl">
            {/* Abstract Background Pattern */}
            <div className="absolute top-0 start-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
            <div className="absolute -top-24 -end-24 w-64 h-64 bg-primary-500/20 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="flex-1 text-center lg:text-start space-y-6">
                    {data.badge && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-500 text-xs font-bold border border-primary-500/20">
                          <TrendingUp className="w-3 h-3" />
                          {data.badge}
                      </div>
                    )}
                    <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                        <Highlighted
                          heading={data.heading}
                          highlight={data.highlight}
                          className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-300"
                        />
                    </h2>
                    {data.description && (
                      <p className="text-gray-400 text-lg leading-8 max-w-2xl">
                          {data.description}
                      </p>
                    )}

                    {data.featurePills.length > 0 && (
                      <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                          {data.featurePills.map((pill, index) => (
                            <div key={index} className="flex items-center gap-2 bg-white/5 backdrop-blur px-4 py-2 rounded-xl border border-white/10">
                                {PILL_ICONS[index % PILL_ICONS.length]}
                                <span className="text-gray-300 text-sm">{pill.text}</span>
                            </div>
                          ))}
                      </div>
                    )}
                </div>

                {/* Decorative Stats Box */}
                {(data.statsValue || data.statsLabel || data.statsSubtext) && (
                  <div className="hidden lg:block relative">
                      <div className="absolute inset-0 bg-primary-500 blur-xl opacity-20 rounded-2xl"></div>
                      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl w-64 text-center">
                          {data.statsValue && <span className="block text-4xl font-black text-white mb-1">{data.statsValue}</span>}
                          {data.statsLabel && <span className="text-gray-400 text-sm">{data.statsLabel}</span>}
                          <div className="w-full h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
                              <div className="w-[85%] h-full bg-primary-500 rounded-full"></div>
                          </div>
                          {data.statsSubtext && <span className="text-xs text-primary-400 mt-2 block">{data.statsSubtext}</span>}
                      </div>
                  </div>
                )}
            </div>
        </div>

        {/* Course Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {courses.map((course) => {
            const categoryLabel = courseCategoryLabel(course.category, locale);
            return (
              <Link key={course.id} href={localizedPath(`/courses/${course.slug || course.id}`, locale)} className="group flex flex-col rounded-2xl overflow-hidden bg-surface border border-border hover:border-primary-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-900/10 cursor-pointer relative top-0 hover:-top-2 active:scale-[0.98]">
                <div className="flex-shrink-0 relative overflow-hidden h-48">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-500" src={course.image} alt={course.title} />
                  {categoryLabel && (
                    <span className="absolute top-4 start-4 z-20 bg-black/60 backdrop-blur-md text-white border border-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                      {categoryLabel}
                    </span>
                  )}
                </div>
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 mb-2">
                       <Star className="w-3 h-3 text-amber-400 fill-amber-400"/>
                       <span className="text-xs font-bold text-foreground ms-1">{RATING_TEXT[locale].score}</span>
                       <span className="text-[10px] text-muted">{RATING_TEXT[locale].votes}</span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary-500 transition-colors line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted line-clamp-2 leading-relaxed mb-4 h-10">
                      {course.description}
                    </p>
                  </div>

                  <div className="mt-2 pt-4 border-t border-border">
                      <div className="flex items-center justify-between text-xs text-muted mb-4">
                          <div className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                              <Users className="w-3.5 h-3.5" />
                              <span>{course.instructor}</span>
                          </div>
                      </div>

                    {/* Enhanced Price Section */}
                    <div className="bg-background rounded-xl p-3 flex items-center justify-between group-hover:bg-primary-500/5 transition-colors">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-muted">{data.priceLabel}</span>
                            <span className="text-lg font-black text-foreground group-hover:text-primary-600 transition-colors">{course.price}</span>
                        </div>
                        <button type="button" aria-label={RATING_TEXT[locale].viewCourse} className="bg-primary-500 text-black w-8 h-8 flex items-center justify-center rounded-lg shadow-lg hover:bg-primary-400 transition-all">
                          <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                        </button>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {data.mobileNote && (
          <div className="mt-12 text-center md:hidden">
              <span className="text-muted text-sm">{data.mobileNote}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
