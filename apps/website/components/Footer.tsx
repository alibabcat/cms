import React from 'react';
import Link from 'next/link';
import { INSTITUTE_NAME } from '@/constants';
import { TrendingUp, MapPin, Phone, Mail, ChevronLeft } from 'lucide-react';
import { getRoute } from '@/lib/navigation';
import { getSocialLinks, getInstitute, getFooterNav } from '@/lib/payload';
import { getServerLocale } from '@/lib/locale';
import { SOCIAL_ICONS, SOCIAL_HOVER, FALLBACK_SOCIAL_ICON, socialHref } from '@/components/socialIcons';

const FOOTER_TEXT = {
  fa: {
    quickLinks: 'دسترسی سریع',
    services: 'خدمات و منابع',
    contact: 'راه‌های ارتباطی',
    rights: (name: string) => `کلیه حقوق مادی و معنوی این وبسایت متعلق به موسسه ${name} می‌باشد.`,
  },
  en: {
    quickLinks: 'Quick Access',
    services: 'Services & Resources',
    contact: 'Contact',
    rights: (name: string) => `All rights reserved for ${name} Institute.`,
  },
} as const;

const Footer = async () => {
  const locale = await getServerLocale();
  const [socialLinks, institute, footerNav] = await Promise.all([
    getSocialLinks({ locale }),
    getInstitute({ locale }),
    getFooterNav({ locale }),
  ]);
  const t = FOOTER_TEXT[locale];
  const instituteName = institute?.name || INSTITUTE_NAME;

  return (
    <footer className="bg-surface border-t border-border pt-20 pb-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-6">
            <Link href={getRoute('home', locale)}>
              <div className="flex items-center gap-2 text-primary-500 cursor-pointer">
                  <TrendingUp className="h-10 w-10" />
                  <span className="font-black text-2xl tracking-tighter text-foreground">{instituteName}<span className="text-primary-500">.CO</span></span>
              </div>
            </Link>
            {institute?.description && (
              <p className="text-muted text-sm leading-7 text-justify">
                {institute.description}
              </p>
            )}
            {/* Social Icons — driven by the Social global, one lucide icon per platform */}
            {socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-4 pt-4">
                {socialLinks.map((link, i) => {
                  const Icon = SOCIAL_ICONS[link.platform] ?? FALLBACK_SOCIAL_ICON;
                  const hover = SOCIAL_HOVER[link.platform] ?? 'hover:bg-primary-500';
                  return (
                    <a
                      key={`${link.platform}-${i}`}
                      href={socialHref(link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label || link.platform}
                      title={link.label || link.platform}
                      className={`group w-10 h-10 rounded-xl bg-background flex items-center justify-center transition-all ${hover} shadow-lg border border-border hover:border-transparent`}
                    >
                      <Icon className="w-5 h-5 text-muted group-hover:text-white transition-colors" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                {t.quickLinks}
            </h3>
            <ul className="space-y-3">
                {footerNav.quickLinks.map((link) => (
                  <li key={link.id}>
                      <Link href={getRoute(link.id, locale)} className="text-muted hover:text-primary-500 hover:ps-2 transition-all flex items-center gap-1 w-full text-start">
                          <ChevronLeft className="w-3 h-3" />
                          {link.label}
                      </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Resources & Services */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                {t.services}
            </h3>
            <ul className="space-y-3">
                {footerNav.services.map((link) => (
                  <li key={link.id}>
                      <Link href={getRoute(link.id, locale)} className="text-muted hover:text-foreground hover:ps-2 transition-all flex items-center gap-1 w-full text-start">
                           <ChevronLeft className="w-3 h-3" />
                          {link.label}
                      </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
             <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                {t.contact}
            </h3>
            <ul className="space-y-6">
                {institute?.address && (
                  <li className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                      <span className="text-muted text-sm leading-6">{institute.address}</span>
                  </li>
                )}
                {institute?.tel && (
                  <li className="flex items-center gap-4 min-w-0">
                      <Phone className="w-6 h-6 text-primary-500 flex-shrink-0" />
                      <a dir="ltr" href={`tel:${institute.tel.replace(/\s/g, '')}`} className="text-muted font-mono text-lg hover:text-primary-500 transition-colors cursor-pointer text-start">{institute.tel}</a>
                  </li>
                )}
                {institute?.email && (
                  <li className="flex items-center gap-4 min-w-0">
                      <Mail className="w-6 h-6 text-primary-500 flex-shrink-0" />
                      <a href={`mailto:${institute.email}`} className="text-muted font-mono hover:text-primary-500 transition-colors cursor-pointer break-all min-w-0">{institute.email}</a>
                  </li>
                )}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted text-center md:text-start">
            <p className="leading-6">{t.rights(instituteName)}</p>
            <p className="font-mono opacity-50 flex items-center gap-1 flex-wrap justify-center">
                Designed with <span className="text-red-500">♥</span> by Kiawosch Tech Team
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
