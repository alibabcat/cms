'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { t } from '@/lib/ui-strings';

interface BackButtonProps {
  /** Optional override; defaults to the localized "back to home" label. */
  label?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ label }) => {
  const router = useRouter();
  const { locale } = useLanguage();
  const text = label ?? t(locale, 'backToHome');
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center text-muted hover:text-primary-500 mb-8 transition-colors"
    >
      <ArrowRight className="w-5 h-5 me-2" />
      {text}
    </button>
  );
};

export default BackButton;
