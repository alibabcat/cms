import { Target, Users, Globe, Award, Shield, TrendingUp, type LucideIcon } from 'lucide-react';
import type { AboutValueIcon } from '@/types';

/** Maps an About value icon key to a lucide-react icon. */
export const ABOUT_VALUE_ICONS: Record<AboutValueIcon, LucideIcon> = {
  target: Target,
  users: Users,
  globe: Globe,
  award: Award,
  shield: Shield,
  'trending-up': TrendingUp,
};
