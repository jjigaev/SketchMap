export type Project = {
  slug: string;
  type: "implemented" | "concept";
  title: string;
  industry: string;
  description: string;
  line: string;
  theme: string;
  cover: string;
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

export const caseUrl = (slug: string) => `/portfolio/work/${slug}/`;
export const projectLabel = (project: Project) =>
  project.type === "implemented" ? "РЕАЛИЗОВАННЫЙ САЙТ" : "CONCEPT PROJECT";
