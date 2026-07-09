import { PayloadSDK } from '@payloadcms/sdk';
import type {
  Config,
  TeamMember as PTeamMember,
  Course as PCourse,
  PsychologyCourse as PPsychologyCourse,
  SignalPackage as PSignalPackage,
  MarketSymbol as PMarketSymbol,
  BlogPost as PBlogPost,
  SignalHistory as PSignalHistory,
} from '@payload-types';
import {
  TeamMember,
  Course,
  PsychologyCourse,
  SignalPackage,
  MarketSymbol,
  BlogPost,
  SignalHistoryItem,
  AboutContent,
  HomePageContent,
  HomePageStat,
  HomePageStatsItem,
  HomePageFeature,
  HomePageTextItem,
  CoursesSectionContent,
} from '@/types';
import type { SocialLink, SocialPlatform } from '@/components/socialIcons';

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:5000';
const PAYLOAD_API_KEY = process.env.PAYLOAD_API_KEY;

// Server-only auth header. Never expose PAYLOAD_API_KEY to the browser.
const authHeaders: Record<string, string> = PAYLOAD_API_KEY
  ? { Authorization: `users API-Key ${PAYLOAD_API_KEY}` }
  : {};

const payload = new PayloadSDK<Config>({
  baseURL: `${PAYLOAD_URL}/api`,
  baseInit: { headers: authHeaders },
});

export type Locale = 'en' | 'fa';

// Default fetch caching for published reads. Preview reads pass cache: 'no-store'.
const REVALIDATE = { next: { revalidate: 60 } } as const;

// ---------------------------------------------------------------------------
// Relationship / rich-text helpers
// ---------------------------------------------------------------------------

/** A populated upload/relationship is an object; an unpopulated one is an id. */
function isPopulated<T>(rel: unknown): rel is T {
  return typeof rel === 'object' && rel !== null;
}

function mediaUrl(rel: unknown): string {
  return isPopulated<{ url?: string | null }>(rel) ? rel.url || '' : '';
}

function iconUrl(rel: unknown): string {
  return isPopulated<{ url?: string | null }>(rel) ? rel.url || '' : '';
}

function categoryName(rel: unknown): string {
  return isPopulated<{ name?: string | null }>(rel) ? rel.name || '' : '';
}

function categoryValue(rel: unknown): string {
  return isPopulated<{ value?: string | null }>(rel) ? rel.value || '' : '';
}

const TEXT_FORMAT = { bold: 1, italic: 2, strikethrough: 4, underline: 8, code: 16 };

function serializeLexicalNode(node: any): string {
  if (!node) return '';

  // Leaf text node
  if (node.type === 'text' || typeof node.text === 'string') {
    let text = String(node.text ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    const format = typeof node.format === 'number' ? node.format : 0;
    if (format & TEXT_FORMAT.code) text = `<code>${text}</code>`;
    if (format & TEXT_FORMAT.bold) text = `<strong>${text}</strong>`;
    if (format & TEXT_FORMAT.italic) text = `<em>${text}</em>`;
    if (format & TEXT_FORMAT.underline) text = `<u>${text}</u>`;
    if (format & TEXT_FORMAT.strikethrough) text = `<s>${text}</s>`;
    return text;
  }

  const children: string = Array.isArray(node.children)
    ? node.children.map(serializeLexicalNode).join('')
    : '';

  switch (node.type) {
    case 'paragraph':
      return `<p>${children}</p>`;
    case 'heading': {
      const tag = /^h[1-6]$/.test(node.tag) ? node.tag : 'h2';
      return `<${tag}>${children}</${tag}>`;
    }
    case 'quote':
      return `<blockquote>${children}</blockquote>`;
    case 'list': {
      const tag = node.listType === 'number' ? 'ol' : 'ul';
      return `<${tag}>${children}</${tag}>`;
    }
    case 'listitem':
      return `<li>${children}</li>`;
    case 'link': {
      const url = node.fields?.url || node.url || '#';
      return `<a href="${url}">${children}</a>`;
    }
    case 'linebreak':
      return '<br />';
    default:
      return children;
  }
}

/** Converts Payload Lexical rich-text (or a legacy plain string) to HTML. */
function richTextToHtml(content: unknown): string {
  if (!content) return '';
  if (typeof content === 'string') return content;
  const root = (content as any)?.root;
  if (!root?.children) return '';
  return root.children.map(serializeLexicalNode).join('');
}

// ---------------------------------------------------------------------------
// Mappers: Payload document -> front-end view type (@/types)
// ---------------------------------------------------------------------------

function mapTeamMember(doc: PTeamMember): TeamMember {
  return {
    id: doc.memberId,
    slug: doc.slug || String(doc.memberId),
    name: doc.name,
    role: doc.role,
    image: mediaUrl(doc.image),
    bio: doc.bio,
    fullBio: doc.fullBio,
    specialties: doc.specialties?.map((s) => s.specialty) || [],
  };
}

function mapCourse(doc: PCourse): Course {
  return {
    id: String(doc.id),
    slug: doc.slug || String(doc.id),
    title: doc.title,
    description: doc.description,
    instructor: doc.instructor,
    duration: doc.duration,
    price: doc.price,
    basePrice: doc.basePrice ?? undefined,
    priceRangeLabel: doc.priceRangeLabel ?? undefined,
    addons: doc.addons?.map((a) => ({
      id: a.id ?? '',
      title: a.title,
      price: a.price,
      priceLabel: a.priceLabel,
      description: a.description,
    })),
    image: mediaUrl(doc.image),
    category: doc.category as Course['category'],
    syllabus: doc.syllabus?.map((s) => s.item) || [],
    features: doc.features?.map((f) => f.feature) || [],
  };
}

function mapPsychologyCourse(doc: PPsychologyCourse): PsychologyCourse {
  return {
    id: String(doc.id),
    slug: doc.slug || String(doc.id),
    title: doc.title,
    price: doc.price,
    type: doc.type as PsychologyCourse['type'],
    image: mediaUrl(doc.image),
    description: doc.description,
    longDescription: doc.longDescription,
    instructor: doc.instructor,
    duration: doc.duration,
    sessionCount: doc.sessionCount,
    startDate: doc.startDate ?? '',
    isPopular: doc.isPopular ?? undefined,
    features: doc.features?.map((f) => f.feature) || [],
    syllabus:
      doc.syllabus?.map((s) => ({
        title: s.title,
        duration: s.duration,
        topics: s.topics?.map((t) => t.topic) || [],
      })) || [],
    outcomes: doc.outcomes?.map((o) => o.outcome) || [],
  };
}

function mapSignalPackage(doc: PSignalPackage): SignalPackage {
  return {
    id: String(doc.id),
    slug: doc.slug || String(doc.id),
    title: doc.title,
    duration: doc.duration,
    price: doc.price,
    priceNum: doc.priceNum,
    features: doc.features?.map((f) => f.feature) || [],
    isPopular: doc.isPopular ?? undefined,
    description: doc.description,
    longDescription: doc.longDescription ?? undefined,
  };
}

function mapSignalHistory(doc: PSignalHistory): SignalHistoryItem {
  return {
    id: doc.id,
    symbol: doc.symbol,
    type: doc.type,
    entryPrice: doc.entryPrice,
    exitPrice: doc.exitPrice,
    pips: doc.pips,
    result: doc.result,
    date: doc.date,
    description: doc.description,
  };
}

function mapMarketSymbol(doc: PMarketSymbol): MarketSymbol {
  return {
    id: String(doc.id),
    slug: doc.slug || String(doc.id),
    ticker: doc.ticker,
    name: doc.name,
    icon: iconUrl(doc.icon),
    price: doc.price,
    change: doc.change,
    isPositive: doc.isPositive ?? false,
    description: doc.description,
    characteristics: doc.characteristics?.map((c) => ({ label: c.label, value: c.value })) || [],
    technicalSummary: doc.technicalSummary,
    chartImage: doc.chartImage,
  };
}

function mapBlogPost(doc: PBlogPost): BlogPost {
  return {
    id: String(doc.id),
    slug: doc.slug || String(doc.id),
    title: doc.title,
    excerpt: doc.excerpt,
    image: mediaUrl(doc.image),
    date: doc.date ?? undefined,
    time: doc.time ?? undefined,
    author: doc.author ?? undefined,
    authorRole: doc.authorRole ?? undefined,
    authorImage: mediaUrl(doc.authorImage),
    category: categoryName(doc.category),
    categorySlug: categoryValue(doc.category) || undefined,
    content: richTextToHtml(doc.content),
    gallery: Array.isArray(doc.gallery)
      ? doc.gallery.map((m) => mediaUrl(m)).filter(Boolean)
      : [],
    relatedSymbol: doc.relatedSymbol ?? undefined,
    isLongTerm: categoryValue(doc.category) === 'long-term-analysis',
  };
}

// ---------------------------------------------------------------------------
// Fetch options
// ---------------------------------------------------------------------------

interface FetchOpts {
  locale?: Locale;
  /** Bypass the Next data cache (used for live preview). */
  draft?: boolean;
}

function reqInit(opts?: FetchOpts) {
  return opts?.draft ? ({ cache: 'no-store' } as const) : REVALIDATE;
}

// ---------------------------------------------------------------------------
// Team Members
// ---------------------------------------------------------------------------

export async function getTeamMembers(opts?: FetchOpts): Promise<TeamMember[]> {
  const { docs } = await payload.find(
    { collection: 'team-members', limit: 100, depth: 1, locale: opts?.locale },
    reqInit(opts),
  );
  return docs.map(mapTeamMember);
}

export async function getTeamMemberById(id: number, opts?: FetchOpts): Promise<TeamMember | null> {
  const { docs } = await payload.find(
    {
      collection: 'team-members',
      where: { memberId: { equals: id } },
      limit: 1,
      depth: 1,
      locale: opts?.locale,
    },
    reqInit(opts),
  );
  const doc = docs[0];
  return doc ? mapTeamMember(doc) : null;
}

export async function getTeamMemberBySlug(
  slug: string,
  opts?: FetchOpts,
): Promise<TeamMember | null> {
  const { docs } = await payload.find(
    {
      collection: 'team-members',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
      locale: opts?.locale,
    },
    reqInit(opts),
  );
  const doc = docs[0];
  return doc ? mapTeamMember(doc) : null;
}

// ---------------------------------------------------------------------------
// Courses
// ---------------------------------------------------------------------------

export async function getCourses(opts?: FetchOpts): Promise<Course[]> {
  const { docs } = await payload.find(
    { collection: 'courses', limit: 100, depth: 1, locale: opts?.locale },
    reqInit(opts),
  );
  return docs.map(mapCourse);
}

export async function getCourseById(id: string, opts?: FetchOpts): Promise<Course | null> {
  try {
    const doc = await payload.findByID(
      { collection: 'courses', id, depth: 1, locale: opts?.locale },
      reqInit(opts),
    );
    return doc ? mapCourse(doc) : null;
  } catch {
    return null;
  }
}

export async function getCourseBySlug(slug: string, opts?: FetchOpts): Promise<Course | null> {
  const { docs } = await payload.find(
    {
      collection: 'courses',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
      locale: opts?.locale,
    },
    reqInit(opts),
  );
  const doc = docs[0];
  return doc ? mapCourse(doc) : null;
}

// ---------------------------------------------------------------------------
// Psychology Courses
// ---------------------------------------------------------------------------

export async function getPsychologyCourses(opts?: FetchOpts): Promise<PsychologyCourse[]> {
  const { docs } = await payload.find(
    { collection: 'psychology-courses', limit: 100, depth: 1, locale: opts?.locale },
    reqInit(opts),
  );
  return docs.map(mapPsychologyCourse);
}

export async function getPsychologyCourseById(
  id: string,
  opts?: FetchOpts,
): Promise<PsychologyCourse | null> {
  try {
    const doc = await payload.findByID(
      { collection: 'psychology-courses', id, depth: 1, locale: opts?.locale },
      reqInit(opts),
    );
    return doc ? mapPsychologyCourse(doc) : null;
  } catch {
    return null;
  }
}

export async function getPsychologyCourseBySlug(
  slug: string,
  opts?: FetchOpts,
): Promise<PsychologyCourse | null> {
  const { docs } = await payload.find(
    {
      collection: 'psychology-courses',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
      locale: opts?.locale,
    },
    reqInit(opts),
  );
  const doc = docs[0];
  return doc ? mapPsychologyCourse(doc) : null;
}

// ---------------------------------------------------------------------------
// Signal Packages
// ---------------------------------------------------------------------------

export async function getSignalPackages(opts?: FetchOpts): Promise<SignalPackage[]> {
  const { docs } = await payload.find(
    { collection: 'signal-packages', limit: 100, depth: 1, locale: opts?.locale },
    reqInit(opts),
  );
  return docs.map(mapSignalPackage);
}

export async function getSignalPackageById(
  id: string,
  opts?: FetchOpts,
): Promise<SignalPackage | null> {
  try {
    const doc = await payload.findByID(
      { collection: 'signal-packages', id, depth: 1, locale: opts?.locale },
      reqInit(opts),
    );
    return doc ? mapSignalPackage(doc) : null;
  } catch {
    return null;
  }
}

export async function getSignalPackageBySlug(
  slug: string,
  opts?: FetchOpts,
): Promise<SignalPackage | null> {
  const { docs } = await payload.find(
    {
      collection: 'signal-packages',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
      locale: opts?.locale,
    },
    reqInit(opts),
  );
  const doc = docs[0];
  return doc ? mapSignalPackage(doc) : null;
}

/** Most recent closed signals across all symbols, newest first. */
export async function getSignalHistory(opts?: FetchOpts & { limit?: number }): Promise<SignalHistoryItem[]> {
  const { docs } = await payload.find(
    {
      collection: 'signal-history',
      limit: opts?.limit ?? 10,
      depth: 0,
      sort: '-date',
      locale: opts?.locale,
    },
    reqInit(opts),
  );
  return docs.map(mapSignalHistory);
}

// ---------------------------------------------------------------------------
// Market Symbols
// ---------------------------------------------------------------------------

export async function getMarketSymbols(opts?: FetchOpts): Promise<MarketSymbol[]> {
  const { docs } = await payload.find(
    { collection: 'market-symbols', limit: 100, depth: 1, locale: opts?.locale },
    reqInit(opts),
  );
  return docs.map(mapMarketSymbol);
}

export async function getMarketSymbolById(id: string, opts?: FetchOpts): Promise<MarketSymbol | null> {
  try {
    const doc = await payload.findByID(
      { collection: 'market-symbols', id, depth: 1, locale: opts?.locale },
      reqInit(opts),
    );
    return doc ? mapMarketSymbol(doc) : null;
  } catch {
    return null;
  }
}

export async function getMarketSymbolBySlug(
  slug: string,
  opts?: FetchOpts,
): Promise<MarketSymbol | null> {
  const { docs } = await payload.find(
    {
      collection: 'market-symbols',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
      locale: opts?.locale,
    },
    reqInit(opts),
  );
  const doc = docs[0];
  return doc ? mapMarketSymbol(doc) : null;
}

// ---------------------------------------------------------------------------
// Blog Posts
// ---------------------------------------------------------------------------

export async function getBlogPosts(opts?: FetchOpts): Promise<BlogPost[]> {
  const { docs } = await payload.find(
    { collection: 'blog-posts', limit: 100, depth: 2, locale: opts?.locale },
    reqInit(opts),
  );
  return docs.map(mapBlogPost);
}

export async function getBlogPostById(id: string, opts?: FetchOpts): Promise<BlogPost | null> {
  try {
    const doc = await payload.findByID(
      { collection: 'blog-posts', id, depth: 2, locale: opts?.locale },
      reqInit(opts),
    );
    return doc ? mapBlogPost(doc) : null;
  } catch {
    return null;
  }
}

export async function getBlogPostBySlug(slug: string, opts?: FetchOpts): Promise<BlogPost | null> {
  const { docs } = await payload.find(
    {
      collection: 'blog-posts',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
      locale: opts?.locale,
    },
    reqInit(opts),
  );
  const doc = docs[0];
  return doc ? mapBlogPost(doc) : null;
}

// ---------------------------------------------------------------------------
// About (global)
// ---------------------------------------------------------------------------

export async function getAbout(opts?: FetchOpts): Promise<AboutContent | null> {
  try {
    const data = await payload.findGlobal(
      { slug: 'about', depth: 0, locale: opts?.locale },
      reqInit(opts),
    );
    return {
      heroTitle: data.heroTitle,
      heroHighlight: data.heroHighlight ?? undefined,
      heroSubtitle: data.heroSubtitle ?? undefined,
      values:
        data.values?.map((v) => ({
          icon: v.icon,
          title: v.title,
          description: v.description,
        })) || [],
      teamHeading: data.teamHeading ?? undefined,
      teamHighlight: data.teamHighlight ?? undefined,
      storyHeading: data.storyHeading ?? undefined,
      storyHtml: richTextToHtml(data.storyContent),
    };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Institute (global)
// ---------------------------------------------------------------------------

export interface InstituteInfo {
  name: string;
  fullName: string;
  description: string;
  address: string;
  email: string;
  tel: string;
  latitude: number | null;
  longitude: number | null;
  mapZoom: number;
}

export async function getInstitute(opts?: FetchOpts): Promise<InstituteInfo | null> {
  try {
    const data = await payload.findGlobal(
      { slug: 'institute', depth: 0, locale: opts?.locale },
      reqInit(opts),
    );
    return {
      name: data.name ?? '',
      fullName: data.fullName ?? '',
      description: data.description ?? '',
      address: data.address ?? '',
      email: data.email ?? '',
      tel: data.tel ?? '',
      latitude: data.latitude ?? null,
      longitude: data.longitude ?? null,
      mapZoom: data.mapZoom ?? 16,
    };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Home page (global) — hero + every home section's editable text
// ---------------------------------------------------------------------------

function mapStats(arr: { value?: string | null; label?: string | null }[] | null | undefined): HomePageStat[] {
  return (arr || [])
    .filter((s): s is { value: string; label: string } => Boolean(s.value && s.label))
    .map((s) => ({ value: s.value, label: s.label }));
}

function mapStatsItems(
  arr: { value?: string | null; label?: string | null; description?: string | null }[] | null | undefined,
): HomePageStatsItem[] {
  return (arr || [])
    .filter((s): s is { value: string; label: string; description?: string | null } => Boolean(s.value && s.label))
    .map((s) => ({ value: s.value, label: s.label, description: s.description ?? undefined }));
}

function mapFeatures(
  arr: { heading?: string | null; body?: string | null }[] | null | undefined,
): HomePageFeature[] {
  return (arr || [])
    .filter((f): f is { heading: string; body?: string | null } => Boolean(f.heading))
    .map((f) => ({ heading: f.heading, body: f.body ?? undefined }));
}

function mapTextItems(
  arr: { text?: string | null }[] | null | undefined,
): HomePageTextItem[] {
  return (arr || [])
    .filter((p): p is { text: string } => Boolean(p.text))
    .map((p) => ({ text: p.text }));
}

export async function getHomePage(opts?: FetchOpts): Promise<HomePageContent | null> {
  try {
    const data = await payload.findGlobal(
      { slug: 'home-page', depth: 0, locale: opts?.locale },
      reqInit(opts),
    );
    return {
      badge: data.badge ?? undefined,
      title: data.title ?? '',
      titleHighlight: data.titleHighlight ?? undefined,
      description: data.description ?? undefined,
      primaryCtaLabel: data.primaryCtaLabel ?? undefined,
      secondaryCtaLabel: data.secondaryCtaLabel ?? undefined,
      stats: mapStats(data.stats),
      cardTag: data.cardTag ?? undefined,
      cardStatus: data.cardStatus ?? undefined,
      cardInfo: data.cardInfo ?? undefined,
      statsSection: {
        items: mapStatsItems(data.statsSection?.items),
      },
      analysisSection: {
        badge: data.analysisSection?.badge ?? undefined,
        heading: data.analysisSection?.heading ?? '',
        highlight: data.analysisSection?.highlight ?? undefined,
        subheading: data.analysisSection?.subheading ?? undefined,
        ctaLabel: data.analysisSection?.ctaLabel ?? undefined,
        freeBadge: data.analysisSection?.freeBadge ?? undefined,
        readMoreLabel: data.analysisSection?.readMoreLabel ?? undefined,
      },
      aboutSection: {
        badge: data.aboutSection?.badge ?? undefined,
        heading: data.aboutSection?.heading ?? '',
        highlight: data.aboutSection?.highlight ?? undefined,
        body: data.aboutSection?.body ?? undefined,
        points: mapTextItems(data.aboutSection?.points),
        ctaLabel: data.aboutSection?.ctaLabel ?? undefined,
        imageCaptionTitle: data.aboutSection?.imageCaptionTitle ?? undefined,
        imageCaptionSubtitle: data.aboutSection?.imageCaptionSubtitle ?? undefined,
        floatBadgeTitle: data.aboutSection?.floatBadgeTitle ?? undefined,
        floatBadgeSubtitle: data.aboutSection?.floatBadgeSubtitle ?? undefined,
      },
      coursesSection: {
        badge: data.coursesSection?.badge ?? undefined,
        heading: data.coursesSection?.heading ?? '',
        highlight: data.coursesSection?.highlight ?? undefined,
        description: data.coursesSection?.description ?? undefined,
        featurePills: mapTextItems(data.coursesSection?.featurePills),
        statsValue: data.coursesSection?.statsValue ?? undefined,
        statsLabel: data.coursesSection?.statsLabel ?? undefined,
        statsSubtext: data.coursesSection?.statsSubtext ?? undefined,
        priceLabel: data.coursesSection?.priceLabel ?? undefined,
        mobileNote: data.coursesSection?.mobileNote ?? undefined,
      } satisfies CoursesSectionContent,
      signalSection: {
        badge: data.signalSection?.badge ?? undefined,
        heading: data.signalSection?.heading ?? '',
        highlight: data.signalSection?.highlight ?? undefined,
        subheading: data.signalSection?.subheading ?? undefined,
        features: mapFeatures(data.signalSection?.features),
        ctaLabel: data.signalSection?.ctaLabel ?? undefined,
        statsCardHeading: data.signalSection?.statsCardHeading ?? undefined,
        statsCardValue: data.signalSection?.statsCardValue ?? undefined,
        statsCardSubtext: data.signalSection?.statsCardSubtext ?? undefined,
      },
      teamSection: {
        heading: data.teamSection?.heading ?? '',
        highlight: data.teamSection?.highlight ?? undefined,
        subheading: data.teamSection?.subheading ?? undefined,
      },
      psychologySection: {
        badge: data.psychologySection?.badge ?? undefined,
        heading: data.psychologySection?.heading ?? '',
        highlight: data.psychologySection?.highlight ?? undefined,
        subheading: data.psychologySection?.subheading ?? undefined,
        cards: mapFeatures(data.psychologySection?.cards),
        ctaHeading: data.psychologySection?.ctaHeading ?? undefined,
        ctaSubtext: data.psychologySection?.ctaSubtext ?? undefined,
        ctaLabel: data.psychologySection?.ctaLabel ?? undefined,
      },
      blogSection: {
        heading: data.blogSection?.heading ?? '',
        highlight: data.blogSection?.highlight ?? undefined,
        archiveLinkLabel: data.blogSection?.archiveLinkLabel ?? undefined,
        archiveLinkLabelMobile: data.blogSection?.archiveLinkLabelMobile ?? undefined,
        readMoreLabel: data.blogSection?.readMoreLabel ?? undefined,
      },
      newsletterSection: {
        heading: data.newsletterSection?.heading ?? '',
        subheading: data.newsletterSection?.subheading ?? undefined,
        inputPlaceholder: data.newsletterSection?.inputPlaceholder ?? undefined,
        buttonLabel: data.newsletterSection?.buttonLabel ?? undefined,
        disclaimer: data.newsletterSection?.disclaimer ?? undefined,
      },
    };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Navigation (global) — footer link columns
// ---------------------------------------------------------------------------

export interface NavLink {
  label: string;
  id: string;
}

export interface NavMenuItem extends NavLink {
  subItems?: NavLink[];
}

export interface FooterNav {
  quickLinks: NavLink[];
  services: NavLink[];
}

/** Keeps only entries that have both a label and an id, narrowing the type. */
function toNavLinks(
  arr: { label?: string | null; id?: string | null }[] | null | undefined,
): NavLink[] {
  return (arr || [])
    .filter((l): l is { label: string; id: string } => Boolean(l.label && l.id))
    .map((l) => ({ label: l.label, id: l.id }));
}

/** Header menu items (with optional dropdown sub-items), localized. */
export async function getNavItems(opts?: FetchOpts): Promise<NavMenuItem[]> {
  try {
    const data = await payload.findGlobal(
      { slug: 'navigation', depth: 0, locale: opts?.locale },
      reqInit(opts),
    );
    return (data.items || [])
      .filter((i): i is typeof i & { label: string; id: string } => Boolean(i.label && i.id))
      .map((i) => ({
        label: i.label,
        id: i.id,
        subItems: i.subItems?.length ? toNavLinks(i.subItems) : undefined,
      }));
  } catch {
    return [];
  }
}

export async function getFooterNav(opts?: FetchOpts): Promise<FooterNav> {
  try {
    const data = await payload.findGlobal(
      { slug: 'navigation', depth: 0, locale: opts?.locale },
      reqInit(opts),
    );
    return {
      quickLinks: toNavLinks(data.quickLinks),
      services: toNavLinks(data.services),
    };
  } catch {
    return { quickLinks: [], services: [] };
  }
}

// ---------------------------------------------------------------------------
// Social (global)
// ---------------------------------------------------------------------------

export async function getSocialLinks(opts?: FetchOpts): Promise<SocialLink[]> {
  try {
    const data = await payload.findGlobal(
      { slug: 'social', depth: 0, locale: opts?.locale },
      reqInit(opts),
    );
    return (data.links || [])
      .filter((l): l is typeof l & { url: string } => Boolean(l.url))
      .map((l) => ({
        platform: l.platform as SocialPlatform,
        label: l.label ?? undefined,
        url: l.url,
      }));
  } catch {
    return [];
  }
}
