'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getTeamMembers } from '@/lib/payload';
import { TeamMember, TeamSectionContent } from '@/types';
import Highlighted from './Highlighted';
import { useLanguage } from './LanguageContext';
import { localizedPath } from '@/lib/i18n';
import { Twitter, Linkedin, Instagram, ChevronRight, ChevronLeft } from 'lucide-react';

interface TeamSectionProps {
  data: TeamSectionContent;
}

const TeamSection: React.FC<TeamSectionProps> = ({ data }) => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(1);
  const { locale } = useLanguage();

  useEffect(() => {
    getTeamMembers({ locale }).then(setMembers).catch(console.error);
  }, [locale]);

  // Responsive items count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsToShow(3);
      else if (window.innerWidth >= 768) setItemsToShow(2);
      else setItemsToShow(1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(members.length - itemsToShow + 1);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1 >= totalSlides ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? totalSlides - 1 : prev - 1));
  };

  return (
    <section id="team" className="py-24 bg-background relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
            <Highlighted heading={data.heading} highlight={data.highlight} className="text-primary-500" />
          </h2>
          {data.subheading && (
            <p className="mt-4 text-muted max-w-2xl mx-auto">
              {data.subheading}
            </p>
          )}
        </div>

        <div className="relative">
            {/* Buttons */}
            <button
                type="button"
                onClick={prevSlide}
                aria-label={locale === 'fa' ? 'اسلاید قبلی' : 'Previous slide'}
                className="absolute start-0 top-1/2 -translate-y-1/2 z-20 bg-primary-500 text-black p-3 rounded-full shadow-lg hover:bg-primary-400 transition-transform hover:scale-110 -ms-4 md:-ms-6"
            >
                <ChevronLeft className="w-6 h-6 rtl:rotate-180" />
            </button>
            <button
                type="button"
                onClick={nextSlide}
                aria-label={locale === 'fa' ? 'اسلاید بعدی' : 'Next slide'}
                className="absolute end-0 top-1/2 -translate-y-1/2 z-20 bg-primary-500 text-black p-3 rounded-full shadow-lg hover:bg-primary-400 transition-transform hover:scale-110 -me-4 md:-me-6"
            >
                <ChevronRight className="w-6 h-6 rtl:rotate-180" />
            </button>

            {/* Slider Track */}
            <div className="overflow-hidden px-4 py-8">
                <div 
                    className="flex transition-transform duration-500 ease-in-out gap-8"
                    style={{ transform: `translateX(${currentIndex * (100 / itemsToShow)}%)` }}
                >
                    {members.map((member) => (
                        <Link 
                            href={localizedPath(`/team/${member.id}`, locale)}
                            key={member.id} 
                            className="flex-shrink-0 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] bg-surface rounded-2xl p-6 text-center border border-border hover:border-primary-500 transition-all duration-300 group hover:-translate-y-2 shadow-xl cursor-pointer"
                        >
                            <div className="w-32 h-32 mx-auto mb-6 relative">
                                <img 
                                    src={member.image} 
                                    alt={member.name} 
                                    className="w-full h-full object-cover rounded-full border-4 border-background group-hover:border-primary-500 transition-colors"
                                />
                                <div className="absolute bottom-0 start-0 bg-primary-500 rounded-full p-1 border-2 border-surface">
                                    <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                            <p className="text-primary-500 text-sm font-medium mb-4">{member.role}</p>
                            <p className="text-muted text-sm leading-relaxed mb-6 h-12 overflow-hidden">
                                {member.bio}
                            </p>
                            
                            <div className="flex justify-center gap-4 border-t border-border pt-6">
                                <button type="button" aria-label="Twitter" onClick={(e) => e.preventDefault()} className="text-muted hover:text-blue-400 transition-colors"><Twitter className="w-5 h-5" /></button>
                                <button type="button" aria-label="LinkedIn" onClick={(e) => e.preventDefault()} className="text-muted hover:text-blue-600 transition-colors"><Linkedin className="w-5 h-5" /></button>
                                <button type="button" aria-label="Instagram" onClick={(e) => e.preventDefault()} className="text-muted hover:text-pink-600 transition-colors"><Instagram className="w-5 h-5" /></button>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            
            {/* Dots */}
            <div className="flex justify-center mt-6 gap-2">
                {Array.from({ length: totalSlides }).map((_, idx) => (
                    <button
                        type="button"
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={locale === 'fa' ? `اسلاید ${idx + 1}` : `Slide ${idx + 1}`}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentIndex ? 'bg-primary-500 w-8' : 'bg-muted'}`}
                    />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;