
export interface CourseAddon {
  id: string;
  title: string;
  price: number;
  priceLabel: string;
  description?: string;
}

export interface Course {
  id: string;
  slug?: string;
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
  slug?: string;
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
  slug?: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  fullBio?: string;
  specialties?: string[];
}

export type AboutValueIcon =
  | 'target'
  | 'users'
  | 'globe'
  | 'award'
  | 'shield'
  | 'trending-up';

export interface AboutValue {
  icon: AboutValueIcon;
  title: string;
  description: string;
}

export interface AboutContent {
  heroTitle: string;
  heroHighlight?: string;
  heroSubtitle?: string;
  values: AboutValue[];
  teamHeading?: string;
  teamHighlight?: string;
  storyHeading?: string;
  storyHtml?: string;
}

// --- Home page global (editable chrome text for every home section) ---

export interface HomePageStat {
  value: string;
  label: string;
}

export interface HomePageStatsItem {
  value: string;
  label: string;
  description?: string;
}

export interface HomePageFeature {
  heading: string;
  body?: string;
}

export interface HomePageTextItem {
  text: string;
}

export interface StatsSectionContent {
  items: HomePageStatsItem[];
}

export interface AnalysisSectionContent {
  badge?: string;
  heading: string;
  highlight?: string;
  subheading?: string;
  ctaLabel?: string;
  freeBadge?: string;
  readMoreLabel?: string;
}

export interface AboutSectionContent {
  badge?: string;
  heading: string;
  highlight?: string;
  body?: string;
  points: HomePageTextItem[];
  ctaLabel?: string;
  imageCaptionTitle?: string;
  imageCaptionSubtitle?: string;
  floatBadgeTitle?: string;
  floatBadgeSubtitle?: string;
}

export interface CoursesSectionContent {
  badge?: string;
  heading: string;
  highlight?: string;
  description?: string;
  featurePills: HomePageTextItem[];
  statsValue?: string;
  statsLabel?: string;
  statsSubtext?: string;
  priceLabel?: string;
  mobileNote?: string;
}

export interface SignalSectionContent {
  badge?: string;
  heading: string;
  highlight?: string;
  subheading?: string;
  features: HomePageFeature[];
  ctaLabel?: string;
  statsCardHeading?: string;
  statsCardValue?: string;
  statsCardSubtext?: string;
}

export interface TeamSectionContent {
  heading: string;
  highlight?: string;
  subheading?: string;
}

export interface PsychologySectionContent {
  badge?: string;
  heading: string;
  highlight?: string;
  subheading?: string;
  cards: HomePageFeature[];
  ctaHeading?: string;
  ctaSubtext?: string;
  ctaLabel?: string;
}

export interface BlogSectionContent {
  heading: string;
  highlight?: string;
  archiveLinkLabel?: string;
  archiveLinkLabelMobile?: string;
  readMoreLabel?: string;
}

export interface NewsletterSectionContent {
  heading: string;
  subheading?: string;
  inputPlaceholder?: string;
  buttonLabel?: string;
  disclaimer?: string;
}

export interface HomePageContent {
  // Hero
  badge?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  stats: HomePageStat[];
  cardTag?: string;
  cardStatus?: string;
  cardInfo?: string;
  // Sections
  statsSection: StatsSectionContent;
  analysisSection: AnalysisSectionContent;
  aboutSection: AboutSectionContent;
  coursesSection: CoursesSectionContent;
  signalSection: SignalSectionContent;
  teamSection: TeamSectionContent;
  psychologySection: PsychologySectionContent;
  blogSection: BlogSectionContent;
  newsletterSection: NewsletterSectionContent;
}

export interface BlogPost {
  id: string;
  slug?: string;
  title: string;
  excerpt: string;
  image: string;
  date?: string;
  time?: string; // New: Time of analysis
  author?: string; // New: Instructor name
  authorRole?: string; // New: Instructor role
  authorImage?: string; // New: Instructor image
  category: string;
  categorySlug?: string; // Stable, locale-independent category identifier (blog-categories.value)
  content?: string;
  gallery?: string[]; // Additional images from the blog-media library
  relatedSymbol?: string;
  isLongTerm?: boolean; // New: Flag for Long-term Analysis section
}

export interface MarketSymbol {
  id: string;
  slug?: string;
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
  slug?: string;
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
  id: number | string;
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

export type UserStatus =
  | 'pendulist'
  | 'pendulism_student'
  | 'graduate'
  | 'student'
  | 'regular';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  isRead: boolean;
  type: 'info' | 'warning' | 'success';
}