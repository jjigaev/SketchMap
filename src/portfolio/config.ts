import type { PortfolioLocale } from "./i18n";

/** Public studio information supplied by the Cerebrum team. */
export const studio = {
  name: "Cerebrum",
  nameIsPlaceholder: false,
  locale: "ru" as const,
  description:
    "Разрабатываем сайты, веб-приложения и CRM-системы для бизнеса в Казахстане и США. Помогаем автоматизировать рабочие процессы, упрощать управление и превращать идеи в работающие продукты.",
  contact: {
    whatsapp: "+7 708 491 73 54",
    telegram: "@xcheney",
    email: "hempelkazakhstan@gmail.com",
    phone: "",
    instagram: "",
  },
  team: [
    {
      name: "Ибрахим Абдибек",
      initials: "ИА",
      role: "Основатель Cerebrum",
      description:
        "Участник хакатона, работал над разработкой и внедрением CRM-систем для бизнеса и организаций. Отвечает за развитие студии, общение с заказчиками и организацию работы команды — от обсуждения задачи до запуска продукта. Участвует в разработке и помогает переводить потребности клиента в конкретные технические решения.",
      skills: [] as string[],
    },
    {
      name: "Бекзат Муратбай",
      initials: "БМ",
      role: "Главный разработчик · Специалист по кибербезопасности",
      description:
        "Участник хакатонов, занимается разработкой и безопасностью программных решений. Отвечает за техническую архитектуру проектов, реализацию основного функционала и качество кода. Уделяет особое внимание защите данных и надёжности создаваемых систем.",
      skills: [
        "Python",
        "C++",
        "Django",
        "FastAPI",
        "TypeScript",
        "React",
        "Docker",
        "Kubernetes",
      ],
    },
  ],
};

export const services = [
  {
    title: "Дизайн, который узнают.",
    tag: "UI / UX DESIGN",
    text: "Находим характер вашего бизнеса и переводим его в понятный, выразительный интерфейс.",
  },
  {
    title: "Сайты, которыми пользуются.",
    tag: "DEVELOPMENT",
    text: "Разрабатываем сайты для компаний в Казахстане и США: адаптивные страницы с аккуратной анимацией, быстрой загрузкой и удобной навигацией.",
  },
  {
    title: "Один продукт. Точный фокус.",
    tag: "LANDING PAGES",
    text: "Собираем историю продукта в посадочную страницу с ясным предложением и логичным действием.",
  },
  {
    title: "Меньше рутины. Больше контроля.",
    tag: "WEB APPS / CRM",
    text: "Разрабатываем веб-приложения и CRM-системы под процессы бизнеса: автоматизируем повседневные задачи и упрощаем управление.",
  },
  {
    title: "Новый взгляд на знакомое.",
    tag: "REDESIGN",
    text: "Пересматриваем структуру и визуальный язык сайта, сохраняя то, что уже работает.",
  },
  {
    title: "Запуск — это начало.",
    tag: "SUPPORT",
    text: "Помогаем обновлять контент, добавлять страницы и развивать сайт после публикации.",
  },
];

export const process = [
  [
    "Анализ бизнеса",
    "Разбираемся, кому нужен ваш продукт и что человек должен сделать на сайте.",
  ],
  [
    "Концепция",
    "Определяем структуру, характер и ключевую идею. Согласовываем направление.",
  ],
  [
    "UI / UX",
    "Проектируем путь пользователя. Собираем дизайн для телефона и большого экрана.",
  ],
  [
    "Разработка",
    "Превращаем дизайн в работающий сайт. Добавляем уместное движение и взаимодействия.",
  ],
  [
    "Проверка",
    "Проверяем страницы, формы, доступность и адаптивность на разных размерах экранов.",
  ],
  [
    "Запуск",
    "Публикуем сайт, проверяем адреса и передаём понятные инструкции.",
  ],
  [
    "Поддержка",
    "Договариваемся об обновлениях и следующих шагах по развитию сайта.",
  ],
] as const;

const studioEn = {
  ...studio,
  locale: "en" as const,
  description:
    "We build websites, web applications, and CRM systems for businesses in Kazakhstan and the United States. We help automate everyday work, simplify management, and turn ideas into working products.",
  team: [
    {
      ...studio.team[0],
      name: "Ibrahim Abdibek",
      initials: "IA",
      role: "Founder of Cerebrum",
      description:
        "A hackathon participant with experience developing and implementing CRM systems for businesses and organizations. Ibrahim leads the studio's growth, client communication, and team coordination, from the first conversation to launch. He also contributes to development and translates client needs into practical technical solutions.",
    },
    {
      ...studio.team[1],
      name: "Bekzat Muratbay",
      initials: "BM",
      role: "Lead Developer · Cybersecurity Specialist",
      description:
        "A hackathon participant focused on software development and security. Bekzat is responsible for technical architecture, core functionality, and code quality, with particular attention to data protection and system reliability.",
    },
  ],
};

const servicesEn = [
  {
    title: "Design with a distinct identity.",
    text: "We find what makes your business distinctive and turn it into a clear, expressive interface.",
  },
  {
    title: "Websites made to be used.",
    text: "We build websites for businesses in Kazakhstan and the United States, with responsive layouts, thoughtful motion, fast loading, and clear navigation.",
  },
  {
    title: "One product. A clear focus.",
    text: "We shape your product's story into a landing page with a clear offer and a natural next step.",
  },
  {
    title: "Less routine. More control.",
    text: "We build web applications and CRM systems around your business processes to automate everyday tasks and simplify management.",
  },
  {
    title: "A fresh perspective.",
    text: "We rethink your website's structure and visual identity while keeping what already works.",
  },
  {
    title: "Launch is just the beginning.",
    text: "We help update content, add pages, and develop your website further after launch.",
  },
].map((service, index) => ({ ...services[index], ...service }));

const processEn = [
  [
    "Understand the business",
    "We explore who your product is for and what visitors need to do on your website.",
  ],
  [
    "Define the concept",
    "We establish the structure, character, and central idea, then agree on a direction.",
  ],
  [
    "UI / UX",
    "We plan the user journey and design for both mobile and desktop screens.",
  ],
  [
    "Development",
    "We turn the design into a working website with purposeful motion and interactions.",
  ],
  [
    "Testing",
    "We check pages, forms, accessibility, and responsive layouts across screen sizes.",
  ],
  [
    "Launch",
    "We publish the website, check its URLs, and hand over clear instructions.",
  ],
  [
    "Support",
    "We agree on updates and the next steps for your website's development.",
  ],
] as const;

export const getStudio = (locale: PortfolioLocale) =>
  locale === "en" ? studioEn : studio;
export const getServices = (locale: PortfolioLocale) =>
  locale === "en" ? servicesEn : services;
export const getProcess = (locale: PortfolioLocale) =>
  locale === "en" ? processEn : process;

/** Empty demo contacts are intentional; never send visitors to fictional recipients. */
export const demoContacts = {
  oryn: { phone: "", whatsapp: "", address: "", map: "" },
  aqtis: { phone: "", whatsapp: "", address: "", map: "" },
  sary: { phone: "", whatsapp: "", address: "", map: "", hours: "" },
};
