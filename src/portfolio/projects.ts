import { portfolioRoute, type PortfolioLocale } from "./i18n";

export type Project = {
  slug: string;
  type: "implemented" | "concept";
  title: string;
  industry: string;
  description: string;
  line: string;
  theme: string;
  cover: string;
  mobileCover: string;
  heroImage: string;
  liveUrl: string;
  goal: string;
  direction: string;
  solution: string;
  features: string[];
  technologies: string[];
  result: string;
};

export const projects: Project[] = [
  {
    slug: "forma",
    type: "implemented",
    title: "FORMA",
    industry: "Архитектура и интерьеры",
    description:
      "Цифровой журнал об архитектуре. Место, свет и материал — в центре внимания.",
    line: "Сначала место. Затем форма.",
    theme: "forma",
    cover: "/portfolio/media/forma-desktop.webp",
    mobileCover: "/portfolio/media/forma-mobile.webp",
    heroImage: "/images/projects/saya-house-hero-v2.webp",
    liveUrl: "/",
    goal: "Представить архитектурную практику через проекты и детали. Это реализованный сайт вымышленной студии, а не подтверждённый коммерческий заказ.",
    direction:
      "Редакционная композиция, тёплая бумажная палитра, контраст Cormorant Garamond и IBM Plex Sans. Крупные фотографии и свободное пространство.",
    solution:
      "33 статические страницы на русском, казахском и английском. Портфолио с фильтрами, отдельные истории проектов и форма подготовки письма.",
    features: [
      "RU / ҚАЗ / EN с сохранением текущей страницы",
      "Фильтрация шести архитектурных концептов",
      "Галерея с управлением кнопками, клавиатурой и жестами",
      "Адаптивная видеозаставка с паузой и статичным fallback",
      "Проверка формы и подготовка mailto-письма",
    ],
    technologies: [
      "Astro",
      "TypeScript",
      "GSAP",
      "Tailwind CSS",
      "GitHub Pages",
    ],
    result:
      "Работающий многоязычный сайт с опубликованной версией. Данные о продажах, конверсии и коммерческих результатах отсутствуют.",
  },
  {
    slug: "oryn",
    type: "concept",
    title: "ORYN",
    industry: "Девелопмент",
    description:
      "Архитектура повседневной жизни. Спокойная сила формы и масштаб большого пространства.",
    line: "Место для вашей жизни.",
    theme: "oryn",
    cover: "/portfolio/media/oryn-desktop.webp",
    mobileCover: "/portfolio/media/oryn-mobile.webp",
    heroImage: "/portfolio/media/architecture-800.webp",
    liveUrl: "/portfolio/demos/oryn/",
    goal: "Исследовать, как сайт современного девелопера Казахстана может соединить выразительную архитектуру с понятным выбором недвижимости.",
    direction:
      "Графит, бетон и тёплый песок. Большая типографика, строгая сетка и архитектурные изображения.",
    solution:
      "Каталог демонстрационных объектов с фильтрами, направления работы и последовательный рассказ о строительстве. Контактный сценарий ясно помечен как демонстрационный.",
    features: [
      "Фильтр жилых и коммерческих объектов",
      "Сведения о вымышленном жилом комплексе",
      "Пошаговый процесс строительства",
      "Демонстрация формы консультации",
    ],
    technologies: ["Astro", "TypeScript", "CSS", "Web APIs"],
    result:
      "Полноценный интерактивный концепт. Бренд, объекты и характеристики вымышлены; изображение — архитектурная визуализация.",
  },
  {
    slug: "aq-tis",
    type: "concept",
    title: "AQ TIS",
    industry: "Стоматология",
    description:
      "Меньше тревоги. Больше ясности. Заботливый интерфейс для первого шага к улыбке.",
    line: "Забота начинается с доверия.",
    theme: "dental",
    cover: "/portfolio/media/aq-tis-desktop.webp",
    mobileCover: "/portfolio/media/aq-tis-mobile.webp",
    heroImage: "/portfolio/media/dental-800.webp",
    liveUrl: "/portfolio/demos/aq-tis/",
    goal: "Спроектировать спокойный и понятный путь от знакомства с услугой до выбора удобного времени консультации.",
    direction:
      "Светлый фон, шалфейный зелёный, мягкая геометрия и крупные удобные элементы управления.",
    solution:
      "Услуги, прозрачная структура цен, блок команды и ответы на вопросы. Форму можно попробовать без отправки персональных данных.",
    features: [
      "Выбор услуги и даты консультации",
      "FAQ на нативных раскрывающихся элементах",
      "Мобильный CTA записи",
      "Явные placeholders врачей, отзывов и результатов",
    ],
    technologies: ["Astro", "TypeScript", "CSS", "Native forms"],
    result:
      "Демонстрационный сайт вымышленной клиники. Медицинские результаты, отзывы, специалисты и контакты не выдуманы: для них оставлены обозначенные места.",
  },
  {
    slug: "sary",
    type: "concept",
    title: "SARY",
    industry: "Ресторан",
    description:
      "Вкус оставаться. Атмосферная история о сезонной кухне и неспешных встречах.",
    line: "Вечер, который хочется продлить.",
    theme: "restaurant",
    cover: "/portfolio/media/sary-desktop.webp",
    mobileCover: "/portfolio/media/sary-mobile.webp",
    heroImage: "/portfolio/media/restaurant-800.webp",
    liveUrl: "/portfolio/demos/sary/",
    goal: "Создать эмоциональный сайт ресторана для Алматы, который знакомит с атмосферой и меню, затем ведёт к бронированию.",
    direction:
      "Глубокий винный, сливочная типографика, тактильные фотографии и крупные редакционные композиции.",
    solution:
      "Переключаемые разделы меню, акцент на сезонном блюде, галерея интерьера и демонстрационная форма бронирования.",
    features: [
      "Меню с фильтром по разделам",
      "Сезонное блюдо и атмосферная галерея",
      "Выбор даты, времени и числа гостей",
      "Мобильная навигация и бронирование",
    ],
    technologies: ["Astro", "TypeScript", "CSS", "Web APIs"],
    result:
      "Самостоятельный концепт вымышленного ресторана. Меню и цены — демонстрационные; бронирование не отправляется.",
  },
];

type ProjectCopy = Pick<
  Project,
  | "industry"
  | "description"
  | "line"
  | "goal"
  | "direction"
  | "solution"
  | "features"
  | "result"
>;

const englishProjectCopy: Record<string, ProjectCopy> = {
  forma: {
    industry: "Architecture & interiors",
    description:
      "A digital architecture journal. Place, light, and material take center stage.",
    line: "First the place. Then the form.",
    goal: "Present an architectural practice through its projects and details. This is a built website for a fictional studio, not a verified client commission.",
    direction:
      "Editorial layouts, a warm paper palette, and the contrast of Cormorant Garamond and IBM Plex Sans. Large photographs with room to breathe.",
    solution:
      "33 static pages in Russian, Kazakh, and English. A filterable portfolio, individual project stories, and a form that prepares an email draft.",
    features: [
      "Russian, Kazakh, and English with language switching on the current page",
      "Filters for six architectural concepts",
      "A gallery with button, keyboard, and touch controls",
      "A responsive video hero with a pause control and a static fallback",
      "Form validation and an email draft opened through mailto",
    ],
    result:
      "A working multilingual website with a published version. No sales, conversion, or commercial performance data is available.",
  },
  oryn: {
    industry: "Property development",
    description:
      "Architecture for everyday life. Quiet confidence in form and a sense of generous space.",
    line: "A place for your life.",
    goal: "Explore how a modern property developer's website in Kazakhstan can combine expressive architecture with a clear path to choosing a property.",
    direction:
      "Graphite, concrete, and warm sand. Bold typography, a precise grid, and architectural imagery.",
    solution:
      "A filterable catalog of sample properties, an overview of services, and a step-by-step explanation of the building process. The inquiry flow is clearly labeled as a demonstration.",
    features: [
      "Filters for residential and commercial properties",
      "Details of a fictional residential development",
      "A step-by-step building process",
      "An interactive consultation form demo",
    ],
    result:
      "A complete interactive concept. The brand, properties, and specifications are fictional; the imagery is an architectural visualization.",
  },
  "aq-tis": {
    industry: "Dentistry",
    description:
      "Less anxiety. More clarity. A welcoming interface for the first step toward a smile.",
    line: "Care begins with trust.",
    goal: "Design a calm, straightforward journey from exploring a service to choosing a convenient consultation date.",
    direction:
      "A light background, sage green, soft geometry, and large, easy-to-use controls.",
    solution:
      "Services, a clear pricing structure, a team section, and answers to common questions. Visitors can try the form without sending personal data.",
    features: [
      "Service and consultation date selection",
      "FAQ built with native disclosure elements",
      "A mobile appointment button",
      "Clearly marked placeholders for dentists, reviews, and results",
    ],
    result:
      "A demonstration website for a fictional clinic. Medical outcomes, reviews, practitioner profiles, and contact details are left as labeled placeholders rather than invented claims.",
  },
  sary: {
    industry: "Restaurant",
    description:
      "A reason to stay. An atmospheric story of seasonal cooking and unhurried company.",
    line: "An evening worth lingering over.",
    goal: "Create an evocative restaurant website for Almaty that introduces the atmosphere and menu, then guides visitors toward a reservation.",
    direction:
      "Deep wine tones, cream lettering, tactile photography, and generous editorial layouts.",
    solution:
      "Filterable menu sections, a seasonal dish feature, an interior gallery, and a demonstration reservation form.",
    features: [
      "A menu with category filters",
      "A seasonal dish and atmospheric gallery",
      "Date, time, and party size selection",
      "Mobile navigation and reservation controls",
    ],
    result:
      "An independent concept for a fictional restaurant. The menu and prices are for demonstration; reservation requests are not sent.",
  },
};

const englishProjects: Project[] = projects.map((project) => ({
  ...project,
  ...englishProjectCopy[project.slug],
  cover: `/portfolio/media/${project.slug}-en-desktop.webp`,
  mobileCover: `/portfolio/media/${project.slug}-en-mobile.webp`,
  liveUrl:
    project.slug === "forma"
      ? "/en/"
      : portfolioRoute("en", `demos/${project.slug}/`),
}));

export const getProjects = (locale: PortfolioLocale) =>
  locale === "en" ? englishProjects : projects;

export const caseUrl = (slug: string, locale: PortfolioLocale = "ru") =>
  portfolioRoute(locale, `work/${slug}/`);
export const projectLabel = (
  project: Project,
  locale: PortfolioLocale = "ru",
) =>
  project.type === "implemented"
    ? locale === "en"
      ? "BUILT WEBSITE"
      : "РЕАЛИЗОВАННЫЙ САЙТ"
    : "CONCEPT PROJECT";
