'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Target, Twitter, Linkedin } from 'lucide-react';
import { TeamMember, AboutContent } from '@/types';
import { ABOUT_VALUE_ICONS } from '@/components/aboutIcons';
import { useLanguage } from './LanguageContext';
import { t } from '@/lib/ui-strings';
import { localizedPath } from '@/lib/i18n';

const FALLBACK_TEXT = {
  fa: { heroTitle: 'داستان', teamHeading: 'تیم تحلیل و آموزش', viewBio: 'برای مشاهده رزومه کلیک کنید' },
  en: { heroTitle: 'The Story', teamHeading: 'The Analysis & Education Team', viewBio: 'Click to view resume' },
} as const;

interface AboutPageClientProps {
  members: TeamMember[];
  about: AboutContent | null;
}

const AboutPageClient: React.FC<AboutPageClientProps> = ({ members, about }) => {
  const router = useRouter();
  const { locale } = useLanguage();
  const fallback = FALLBACK_TEXT[locale];
  const values = about?.values ?? [];
  return (
    <div className="min-h-screen bg-background pb-20 pt-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <button
                type="button"
                onClick={() => router.back()}
                className="flex items-center text-muted hover:text-primary-500 mb-8 transition-colors"
            >
                <ArrowRight className="w-5 h-5 me-2" />
                {t(locale, 'backToHome')}
            </button>

            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-black text-foreground mb-6">
                    {about?.heroTitle ?? fallback.heroTitle}{' '}
                    {about?.heroHighlight && (
                        <span className="text-primary-500">{about.heroHighlight}</span>
                    )}
                </h1>
                {about?.heroSubtitle && (
                    <p className="text-xl text-muted leading-relaxed max-w-3xl mx-auto">
                        {about.heroSubtitle}
                    </p>
                )}
            </div>

            {/* Values Grid */}
            {values.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                {values.map((value, i) => {
                    const Icon = ABOUT_VALUE_ICONS[value.icon] ?? Target;
                    return (
                        <div key={i} className="bg-surface p-8 rounded-2xl border border-border">
                            <div className="bg-primary-500/10 w-12 h-12 rounded-lg flex items-center justify-center text-primary-500 mb-4">
                                <Icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                            <p className="text-muted text-sm">{value.description}</p>
                        </div>
                    );
                })}
              </div>
            )}

            {/* Team Grid */}
            <div className="mb-20">
                <h2 className="text-3xl font-black text-foreground text-center mb-12">
                    {about?.teamHeading ?? fallback.teamHeading}{' '}
                    {about?.teamHighlight && (
                        <span className="text-primary-500">{about.teamHighlight}</span>
                    )}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {members.map((member) => (
                        <div 
                            key={member.id} 
                            onClick={() => router.push(localizedPath(`/team/${member.id}`, locale))}
                            className="bg-surface rounded-3xl overflow-hidden border border-border hover:border-primary-500 transition-all duration-300 group cursor-pointer hover:-translate-y-2 shadow-xl"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img 
                                    src={member.image} 
                                    alt={member.name} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-90"></div>
                                <div className="absolute bottom-4 start-4">
                                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                                    <p className="text-primary-500 font-medium text-sm">{member.role}</p>
                                </div>
                            </div>
                            <div className="p-6 pt-2">
                                <p className="text-muted text-sm leading-relaxed mb-6 h-12 line-clamp-2">
                                    {member.bio}
                                </p>
                                <div className="flex items-center justify-between border-t border-border pt-4">
                                    <span className="text-xs text-muted">{fallback.viewBio}</span>
                                    <div className="flex gap-3">
                                        <Linkedin className="w-4 h-4 text-muted hover:text-foreground" />
                                        <Twitter className="w-4 h-4 text-muted hover:text-foreground" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Story Section */}
            {(about?.storyHeading || about?.storyHtml) && (
              <div className="bg-surface rounded-3xl p-8 md:p-12 border border-border mb-12">
                {about?.storyHeading && (
                    <h2 className="text-2xl font-bold text-foreground mb-6">{about.storyHeading}</h2>
                )}
                {about?.storyHtml && (
                    <div
                        className="prose prose-invert max-w-none text-muted leading-8 text-lg"
                        dangerouslySetInnerHTML={{ __html: about.storyHtml }}
                    />
                )}
              </div>
            )}

        </div>
    </div>
  );
};

export default AboutPageClient;
