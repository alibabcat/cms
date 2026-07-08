import {
  Send,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  Globe,
  MessageCircle,
  Video,
  type LucideIcon,
} from 'lucide-react';

/** Platform values must stay in sync with the Social global's `platform` select. */
export type SocialPlatform =
  | 'telegram'
  | 'instagram'
  | 'whatsapp'
  | 'youtube'
  | 'twitter'
  | 'linkedin'
  | 'aparat'
  | 'email'
  | 'phone'
  | 'website';

export interface SocialLink {
  platform: SocialPlatform;
  label?: string;
  url: string;
}

/** Maps each platform to a lucide-react icon. */
export const SOCIAL_ICONS: Record<SocialPlatform, LucideIcon> = {
  telegram: Send,
  instagram: Instagram,
  whatsapp: MessageCircle,
  youtube: Youtube,
  twitter: Twitter,
  linkedin: Linkedin,
  aparat: Video,
  email: Mail,
  phone: Phone,
  website: Globe,
};

/** Brand-coloured hover background per platform. */
export const SOCIAL_HOVER: Record<SocialPlatform, string> = {
  telegram: 'hover:bg-[#0088cc]',
  instagram: 'hover:bg-gradient-to-tr hover:from-purple-600 hover:to-pink-600',
  whatsapp: 'hover:bg-[#25D366]',
  youtube: 'hover:bg-[#ff0000]',
  twitter: 'hover:bg-black',
  linkedin: 'hover:bg-[#0a66c2]',
  aparat: 'hover:bg-[#ed145b]',
  email: 'hover:bg-primary-500',
  phone: 'hover:bg-primary-500',
  website: 'hover:bg-primary-500',
};

/** Fallback used when a stored platform value is unknown. */
export const FALLBACK_SOCIAL_ICON: LucideIcon = Globe;

/**
 * Builds the correct href for a platform — `mailto:`/`tel:` for email and
 * phone, otherwise the URL as-is.
 */
export function socialHref(link: SocialLink): string {
  if (link.platform === 'email') return link.url.startsWith('mailto:') ? link.url : `mailto:${link.url}`;
  if (link.platform === 'phone') return link.url.startsWith('tel:') ? link.url : `tel:${link.url}`;
  return link.url;
}
