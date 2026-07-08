'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { TeamMember } from '@/types';
import { ArrowRight, Twitter, Linkedin, Instagram, Award, Briefcase } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const TEXT = {
  fa: {
    backToTeam: 'بازگشت به تیم ما',
    about: (name: string) => `درباره ${name}`,
    specialties: 'تخصص‌ها',
    academyStats: 'آمار آکادمی کیاوش',
    tradingHistory: 'سابقه فعالیت',
    tradingHistoryValue: '10+ سال',
    studentCount: 'تعداد دانشجویان',
    studentCountValue: '5,200+',
    strategyWinRate: 'وین‌ریت استراتژی پاندولیسم',
    strategyWinRateValue: '85%',
    bookConsultation: 'رزرو جلسه مشاوره اختصاصی',
  },
  en: {
    backToTeam: 'Back to our team',
    about: (name: string) => `About ${name}`,
    specialties: 'Specialties',
    academyStats: 'Kiawosch Academy Stats',
    tradingHistory: 'Track record',
    tradingHistoryValue: '10+ years',
    studentCount: 'Number of students',
    studentCountValue: '5,200+',
    strategyWinRate: 'Pendulism strategy win rate',
    strategyWinRateValue: '85%',
    bookConsultation: 'Book a private consultation',
  },
} as const;

interface TeamDetailProps {
  member: TeamMember;
}

const TeamDetail: React.FC<TeamDetailProps> = ({ member }) => {
  const router = useRouter();
  const { locale } = useLanguage();
  const text = TEXT[locale];
  return (
    <div className="min-h-screen bg-background pt-10 pb-20 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center text-muted hover:text-primary-500 mb-8 transition-colors"
        >
            <ArrowRight className="w-5 h-5 me-2" />
            {text.backToTeam}
        </button>

        <div className="bg-surface rounded-3xl overflow-hidden shadow-2xl border border-border">
            <div className="h-48 bg-gradient-to-r from-background to-surface relative">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            </div>

            <div className="px-8 pb-12">
                <div className="relative flex flex-col md:flex-row items-center md:items-end -mt-24 mb-8 gap-6">
                    <div className="w-48 h-48 rounded-3xl p-2 bg-surface shadow-xl">
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>
                    <div className="text-center md:text-start flex-1 pb-2">
                        <h1 className="text-3xl font-extrabold text-foreground mb-2">{member.name}</h1>
                        <p className="text-primary-500 font-bold text-lg">{member.role}</p>
                    </div>
                    <div className="flex gap-3 pb-4">
                        <a href="#" className="p-3 bg-background rounded-xl text-muted hover:text-white hover:bg-blue-600 transition-all"><Linkedin className="w-5 h-5"/></a>
                        <a href="#" className="p-3 bg-background rounded-xl text-muted hover:text-white hover:bg-pink-600 transition-all"><Instagram className="w-5 h-5"/></a>
                        <a href="#" className="p-3 bg-background rounded-xl text-muted hover:text-white hover:bg-blue-400 transition-all"><Twitter className="w-5 h-5"/></a>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
                    <div className="md:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-primary-500" />
                                {text.about(member.name)}
                            </h2>
                            <p className="text-muted leading-8 text-lg">
                                {member.fullBio || member.bio}
                            </p>
                        </div>

                        {member.specialties && (
                            <div>
                                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                                    <Award className="w-5 h-5 text-primary-500" />
                                    {text.specialties}
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {member.specialties.map((skill, idx) => (
                                        <span key={idx} className="px-4 py-2 bg-background border border-border rounded-lg text-muted text-sm">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div className="bg-background p-6 rounded-2xl border border-border">
                            <h3 className="font-bold text-foreground mb-4">{text.academyStats}</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted">{text.tradingHistory}</span>
                                    <span className="text-foreground font-mono">{text.tradingHistoryValue}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted">{text.studentCount}</span>
                                    <span className="text-foreground font-mono">{text.studentCountValue}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted">{text.strategyWinRate}</span>
                                    <span className="text-green-400 font-mono">{text.strategyWinRateValue}</span>
                                </div>
                            </div>
                        </div>

                        <button type="button" className="w-full bg-primary-600 hover:bg-primary-500 text-black font-bold py-4 rounded-xl transition-colors">
                            {text.bookConsultation}
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;
