import type { Locale } from '../i18n';

export const contactEmail = 'hello@forma-studio.example';

type ContactCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  lede: string;
  detailsLabel: string;
  correspondence: string;
  locationLabel: string;
  location: string;
};

export const contactCopy: Record<Locale, ContactCopy> = {
  ru: {
    metaTitle: 'Контакты — FORMA Архитектура и интерьеры',
    metaDescription: 'Расскажите FORMA о будущем доме, общественном пространстве или интерьере. Студия архитектуры и интерьеров в Алматы.',
    eyebrow: 'Новый проект / Контакты',
    title: 'Всё начинается с',
    titleAccent: 'разговора.',
    lede: 'Расскажите о своей идее, даже если она пока только складывается. Нам важно узнать о месте, людях и о том, каким вы видите будущее пространство.',
    detailsLabel: 'Контакты студии',
    correspondence: 'Напишите нам',
    locationLabel: 'Работаем в',
    location: 'Казахстане и за его пределами · Алматы',
  },
  kk: {
    metaTitle: 'Байланыс — FORMA Сәулет және интерьер',
    metaDescription: 'Болашақ үй, қоғамдық кеңістік немесе интерьер туралы FORMA студиясына айтыңыз. Алматыдағы сәулет және интерьер студиясы.',
    eyebrow: 'Жаңа жоба / Байланыс',
    title: 'Бәрі әңгімеден',
    titleAccent: 'басталады.',
    lede: 'Ойыңыз әлі қалыптасып жатса да, бізге айтып беріңіз. Біз үшін орын, адамдар және болашақ кеңістікті қалай елестететініңіз маңызды.',
    detailsLabel: 'Студиямен байланыс',
    correspondence: 'Бізге жазыңыз',
    locationLabel: 'Жұмыс аймағымыз',
    location: 'Қазақстан және басқа елдер · Алматы',
  },
  en: {
    metaTitle: 'Contact — FORMA Architecture & Interiors',
    metaDescription: 'Start a conversation about a home, public space, or interior with FORMA, an architecture and interiors studio in Almaty.',
    eyebrow: 'A new commission / Contact',
    title: 'A place starts with a',
    titleAccent: 'conversation.',
    lede: 'Tell us what you have in mind, even if it is still taking shape. We are interested in the place, the people, and the possibilities between them.',
    detailsLabel: 'Studio contact details',
    correspondence: 'Correspondence',
    locationLabel: 'Working across',
    location: 'Kazakhstan and beyond · Almaty',
  },
};

type FormCopy = {
  heading: string;
  intro: string;
  summary: string;
  labels: { name: string; email: string; projectType: string; budget: string; message: string };
  selectType: string;
  types: { residential: string; commercial: string; hospitality: string; cultural: string; other: string };
  selectBudget: string;
  budgets: { under: string; mid: string; upper: string; over: string; undecided: string };
  placeholder: string;
  hint: string;
  submit: string;
  disclaimer: string;
  successEyebrow: string;
  successTitle: string;
  successText: string;
  openMail: string;
  reset: string;
  errors: {
    name: string;
    email: string;
    projectType: string;
    budget: string;
    message: string;
    nameShort: string;
    emailInvalid: string;
    messageShort: string;
  };
};

export const formCopy: Record<Locale, FormCopy> = {
  ru: {
    heading: 'Заявка на проект',
    intro: 'Обозначьте главное. Детали мы обсудим вместе.',
    summary: 'Проверьте отмеченные поля.',
    labels: { name: 'Ваше имя', email: 'Электронная почта', projectType: 'Тип проекта', budget: 'Бюджет реализации', message: 'Расскажите о проекте' },
    selectType: 'Выберите тип проекта',
    types: { residential: 'Жилой', commercial: 'Коммерческий', hospitality: 'Гостеприимство', cultural: 'Культурный', other: 'Другое пространство' },
    selectBudget: 'Выберите диапазон',
    budgets: { under: 'До 25 млн ₸', mid: '25–75 млн ₸', upper: '75–200 млн ₸', over: 'От 200 млн ₸', undecided: 'Пока не определён' },
    placeholder: 'Что вы хотите создать? Где находится объект и что для вас важнее всего?',
    hint: 'Для начала достаточно нескольких предложений.',
    submit: 'Подготовить письмо',
    disclaimer: 'После проверки вы сможете открыть готовое письмо в почтовом приложении.',
    successEyebrow: 'Заявка готова',
    successTitle: 'Остался один шаг.',
    successText: 'Откройте подготовленное письмо и отправьте его из почтового приложения.',
    openMail: 'Открыть письмо',
    reset: 'Изменить заявку',
    errors: {
      name: 'Укажите ваше имя.', email: 'Укажите электронную почту.', projectType: 'Выберите тип проекта.', budget: 'Выберите бюджет.', message: 'Расскажите немного о проекте.',
      nameShort: 'Введите не менее двух символов.', emailInvalid: 'Проверьте адрес электронной почты.', messageShort: 'Добавьте не менее 20 символов о проекте.',
    },
  },
  kk: {
    heading: 'Жоба туралы өтінім',
    intro: 'Негізгі ойды жазыңыз. Егжей-тегжейін бірге талқылаймыз.',
    summary: 'Белгіленген өрістерді тексеріңіз.',
    labels: { name: 'Атыңыз', email: 'Электрондық пошта', projectType: 'Жоба түрі', budget: 'Іске асыру бюджеті', message: 'Жобаңыз туралы айтыңыз' },
    selectType: 'Жоба түрін таңдаңыз',
    types: { residential: 'Тұрғын үй', commercial: 'Коммерциялық', hospitality: 'Қонақжайлық', cultural: 'Мәдени', other: 'Басқа кеңістік' },
    selectBudget: 'Ауқымды таңдаңыз',
    budgets: { under: '25 млн ₸ дейін', mid: '25–75 млн ₸', upper: '75–200 млн ₸', over: '200 млн ₸ бастап', undecided: 'Әлі анықталған жоқ' },
    placeholder: 'Не жасағыңыз келеді? Нысан қайда орналасқан және сіз үшін не маңызды?',
    hint: 'Бастау үшін бірнеше сөйлем жеткілікті.',
    submit: 'Хатты дайындау',
    disclaimer: 'Тексергеннен кейін дайын хатты пошта қолданбасында аша аласыз.',
    successEyebrow: 'Өтінім дайын',
    successTitle: 'Тағы бір қадам қалды.',
    successText: 'Дайын хатты пошта қолданбасында ашып, жіберіңіз.',
    openMail: 'Хатты ашу',
    reset: 'Өтінімді өзгерту',
    errors: {
      name: 'Атыңызды енгізіңіз.', email: 'Электрондық поштаңызды енгізіңіз.', projectType: 'Жоба түрін таңдаңыз.', budget: 'Бюджетті таңдаңыз.', message: 'Жобаңыз туралы аздап жазыңыз.',
      nameShort: 'Кемінде екі таңба енгізіңіз.', emailInvalid: 'Электрондық пошта мекенжайын тексеріңіз.', messageShort: 'Жоба туралы кемінде 20 таңба жазыңыз.',
    },
  },
  en: {
    heading: 'Project inquiry',
    intro: 'Share the first outline. The details can take shape together.',
    summary: 'Please review the highlighted fields.',
    labels: { name: 'Your name', email: 'Email address', projectType: 'Project type', budget: 'Construction budget', message: 'Tell us about the place' },
    selectType: 'Select a project type',
    types: { residential: 'Residential', commercial: 'Commercial', hospitality: 'Hospitality', cultural: 'Cultural', other: 'Another kind of space' },
    selectBudget: 'Select a range',
    budgets: { under: 'Under ₸25 million', mid: '₸25–75 million', upper: '₸75–200 million', over: 'Over ₸200 million', undecided: 'Still to be defined' },
    placeholder: 'What are you hoping to create? Where is the project, and what matters most to you?',
    hint: 'A few sentences are enough to begin.',
    submit: 'Prepare email',
    disclaimer: 'After checking your details, you can open a prepared email in your mail app.',
    successEyebrow: 'Inquiry ready',
    successTitle: 'One last step.',
    successText: 'Open the prepared email and send it from your mail app.',
    openMail: 'Open email',
    reset: 'Edit inquiry',
    errors: {
      name: 'Please enter your name.', email: 'Please enter your email address.', projectType: 'Please select a project type.', budget: 'Please select an indicative budget.', message: 'Please tell us a little about your project.',
      nameShort: 'Please enter at least two characters.', emailInvalid: 'Please enter a valid email address.', messageShort: 'Please add at least 20 characters about the project.',
    },
  },
};
