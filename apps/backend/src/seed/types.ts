
export interface CourseAddon {
  id: string;
  title: string;
  price: number;
  priceLabel: string;
  description?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  price: string;
  basePrice?: number;
  priceRangeLabel?: string;
  addons?: CourseAddon[];
  image: string;
  category: 'programming' | 'language' | 'management' | 'design';
  syllabus?: string[];
  features?: string[];
}

export interface SyllabusItem {
  title: string;
  duration: string;
  topics: string[];
}

export interface PsychologyCourse {
  id: string;
  title: string;
  price: string;
  basePrice?: number;
  priceRangeLabel?: string;
  addons?: CourseAddon[];
  type: 'Public' | 'Private' | 'Hybrid';
  image: string;
  description: string;
  longDescription: string;
  instructor: string;
  duration: string;
  sessionCount: number;
  startDate: string;
  features: string[];
  syllabus: SyllabusItem[];
  isPopular?: boolean;
  outcomes?: string[];
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  fullBio?: string;
  specialties?: string[];
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date?: string;
  time?: string; // New: Time of analysis
  author?: string; // New: Instructor name
  authorRole?: string; // New: Instructor role
  authorImage?: string; // New: Instructor image
  category: string;
  content?: string;
  relatedSymbol?: string;
  isLongTerm?: boolean; // New: Flag for Long-term Analysis section
}

export interface MarketSymbol {
  id: string;
  ticker: string; // e.g. XAUUSD
  name: string; // e.g. Gold
  icon: string;
  price: string;
  change: string; // e.g. +1.2%
  isPositive: boolean;
  description: string; // Short resume
  characteristics: { label: string; value: string }[]; // e.g. Volatility: High
  technicalSummary: string; // e.g. "Strong Buy in 4H"
  chartImage: string; // Schematic chart image
}

export interface SignalPackage {
  id: string;
  title: string;
  duration: string;
  price: string;
  priceNum: number;
  features: string[];
  isPopular?: boolean;
  description: string;
  longDescription?: string; 
}

export interface SignalHistoryItem {
  id: number;
  symbol: string;
  type: 'BUY' | 'SELL';
  entryPrice: string;
  exitPrice: string;
  pips: number;
  result: 'TP' | 'SL';
  date: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface NavItem {
  label: string;
  id: string;
  subItems?: NavItem[];
}

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