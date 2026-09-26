/** The Russian site lives at the root; Kazakh and English use static prefixes. */
export type Locale = 'ru' | 'kk' | 'en';

export const locales: readonly Locale[] = ['ru', 'kk', 'en'];

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

function routePath(path: string): string {
  let pathname = path || '/';
  if (base && (pathname === base || pathname.startsWith(`${base}/`))) {
    pathname = pathname.slice(base.length) || '/';
  }
  if (!pathname.startsWith('/')) pathname = `/${pathname}`;
  return pathname.replace(/^\/(?:ru|kk|en)(?=\/|$)/, '') || '/';
}

export function getLocale(pathname: string): Locale {
  const normalized = pathname.split(/[?#]/, 1)[0];
  const relative = base && (normalized === base || normalized.startsWith(`${base}/`))
    ? normalized.slice(base.length) || '/'
    : normalized;
  const segment = relative.split('/').filter(Boolean)[0];
  return segment === 'kk' || segment === 'en' ? segment : 'ru';
}

/** Accepts a root route or an already localized URL path; keeps query and hash. */
export function localizedPath(path: string, locale: Locale): string {
  const match = path.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/);
  const pathname = routePath(match?.[1] || '/');
  const suffix = `${match?.[2] || ''}${match?.[3] || ''}`;
  const prefix = locale === 'ru' ? '' : `/${locale}`;
  const trailing = pathname === '/' ? '/' : pathname.endsWith('/') ? pathname : `${pathname}/`;
  return `${base}${prefix}${trailing}${suffix}`;
}

export const siteCopy = {
  ru: {
    descriptor: 'Архитектура и интерьеры',
    navLabel: 'Основная навигация',
    footerNavLabel: 'Навигация в подвале',
    brandLabel: 'FORMA, главная',
    menu: 'Меню',
    close: 'Закрыть',
    languageLabel: 'Язык сайта',
    skip: 'Перейти к содержимому',
    projects: 'Проекты',
    studio: 'Студия',
    services: 'Услуги',
    contact: 'Контакты',
    statement: 'Пространство для',
    statementEmphasis: 'жизни.',
    inquiry: 'Обсудить проект',
    toTop: 'Наверх ↑',
    footerLegal: 'Архитектура и интерьеры.',
    title: 'FORMA — архитектура и интерьеры',
    description: 'Архитектура и интерьеры, вдохновлённые местом, светом и жизнью людей.',
  },
  kk: {
    descriptor: 'Сәулет және интерьер',
    navLabel: 'Негізгі навигация',
    footerNavLabel: 'Төменгі навигация',
    brandLabel: 'FORMA, басты бет',
    menu: 'Мәзір',
    close: 'Жабу',
    languageLabel: 'Сайт тілі',
    skip: 'Негізгі мазмұнға өту',
    projects: 'Жобалар',
    studio: 'Студия',
    services: 'Қызметтер',
    contact: 'Байланыс',
    statement: 'Өмірге арналған',
    statementEmphasis: 'кеңістік.',
    inquiry: 'Жобаны талқылау',
    toTop: 'Жоғарыға ↑',
    footerLegal: 'Сәулет және интерьер.',
    title: 'FORMA — сәулет және интерьер',
    description: 'Орын, жарық және адам өмірі шабыттандырған сәулет пен интерьер.',
  },
  en: {
    descriptor: 'Architecture & Interiors',
    navLabel: 'Main navigation',
    footerNavLabel: 'Footer navigation',
    brandLabel: 'FORMA, home',
    menu: 'Menu',
    close: 'Close',
    languageLabel: 'Site language',
    skip: 'Skip to content',
    projects: 'Projects',
    studio: 'Studio',
    services: 'Services',
    contact: 'Contact',
    statement: 'For the life that happens',
    statementEmphasis: 'within.',
    inquiry: 'Begin a conversation',
    toTop: 'Back to top ↑',
    footerLegal: 'Architecture & Interiors.',
    title: 'FORMA — Architecture & Interiors',
    description: 'Architecture and interiors shaped by light, material, and the ways we live.',
  },
} as const;

export function ui(locale: Locale) {
  return siteCopy[locale];
}
