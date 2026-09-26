import type { Locale } from '../i18n';

/** Category IDs and slugs are stable across languages. */
export type ProjectCategory = 'Residential' | 'Commercial' | 'Hospitality' | 'Cultural';

export interface ProjectImage {
  /** Root-relative path; the site base is added in the rendering component. */
  src: string;
  alt: string;
  width: number;
  height: number;
  credit: string;
  source: string;
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  location: string;
  year: number;
  summary: string;
  description: string[];
  hero: ProjectImage;
  gallery: ProjectImage[];
}

interface ProjectCopy {
  title: string;
  location: string;
  summary: string;
  description: [string, string, string];
  imageAlts: [string, string, string];
}

interface ProjectRecord {
  slug: string;
  category: ProjectCategory;
  year: number;
  detailSize?: [width: number, height: number];
  copy: Record<Locale, ProjectCopy>;
}

export const categoryLabels: Record<Locale, Record<ProjectCategory, string>> = {
  ru: { Residential: 'Жилые', Commercial: 'Коммерческие', Hospitality: 'Гостеприимство', Cultural: 'Культура' },
  kk: { Residential: 'Тұрғын үй', Commercial: 'Коммерциялық', Hospitality: 'Қонақжайлық', Cultural: 'Мәдениет' },
  en: { Residential: 'Residential', Commercial: 'Commercial', Hospitality: 'Hospitality', Cultural: 'Cultural' },
};

const records: ProjectRecord[] = [
  {
    slug: 'saya-house', category: 'Residential', year: 2025, detailSize: [960, 1200],
    copy: {
      ru: {
        title: 'Дом Сая', location: 'Алматы, Казахстан',
        summary: 'Дом у предгорий, где свет, тень и защищённый двор определяют повседневный ритм.',
        description: [
          'Дом Сая задуман для участка на границе города и предгорий. Низкие объёмы следуют рельефу, открывая комнаты к саду и дальнему силуэту гор.',
          'Камень, светлая штукатурка и тёплое дерево образуют спокойную материальную основу. Глубокие проёмы защищают от летнего солнца, а внутренний двор продолжает жилые комнаты.',
          'Архитектура здесь не конкурирует с местом. Она помогает замечать перемены света, погоды и сезонов.',
        ],
        imageAlts: ['Дом Сая в лиственном саду у заснеженного Заилийского Алатау', 'Каменная лестница, дерево и широкие свесы крыши дома Сая', 'Гостиная дома Сая с видом на сад, двор и горы'],
      },
      kk: {
        title: 'Сая үйі', location: 'Алматы, Қазақстан',
        summary: 'Тау етегіндегі үйде жарық, көлеңке және қорғалған аула күнделікті өмір ырғағын қалыптастырады.',
        description: [
          'Сая үйі қала мен тау етегінің түйіскен жеріндегі телімге арналған. Аласа көлемдер жер бедеріне бейімделіп, бөлмелерді бақ пен алыстағы тау көрінісіне қарай ашады.',
          'Тас, ашық түсті сылақ және жылы ағаш байсалды негіз құрайды. Терең ойықтар жазғы күннен қорғайды, ал ішкі аула тұрғын бөлмелердің жалғасына айналады.',
          'Бұл сәулет орынмен жарыспайды. Ол жарықтың, ауа райының және маусымдардың өзгерісін байқауға мүмкіндік береді.',
        ],
        imageAlts: ['Іле Алатауының қарлы шыңдары етегіндегі жапырақты бақтағы Сая үйі', 'Сая үйінің тас баспалдағы, ағашы және кең шатыр жиегі', 'Баққа, аулаға және тауға қарайтын Сая үйінің қонақ бөлмесі'],
      },
      en: {
        title: 'Saya House', location: 'Almaty, Kazakhstan',
        summary: 'A foothill home where daylight, shade and a sheltered courtyard shape the rhythm of everyday life.',
        description: [
          'Saya House is conceived for a site where the city meets the foothills. Low volumes follow the terrain, opening rooms toward a garden and the distant mountain line.',
          'Stone, pale plaster and warm timber establish a quiet material base. Deep openings temper the summer sun, while the courtyard extends the living rooms outdoors.',
          'The architecture does not compete with its setting. It makes room to notice the changing light, weather and seasons.',
        ],
        imageAlts: ['Saya House in a leafy garden beneath the snowy Trans-Ili Alatau', 'Stone steps, timber and deep roof eaves at Saya House', 'Saya House living room facing the garden, courtyard and mountains'],
      },
    },
  },
  {
    slug: 'atelier-almaty', category: 'Commercial', year: 2026, detailSize: [960, 1200],
    copy: {
      ru: {
        title: 'Ателье Алматы', location: 'Алматы, Казахстан',
        summary: 'Рабочее пространство, в котором сосредоточенная работа и обмен идеями связаны единым столом.',
        description: [
          'Ателье Алматы предлагает гибкое пространство для небольшой творческой команды. Общий стол проходит через интерьер и объединяет зоны макетирования, обсуждения и тихой работы.',
          'Новые деревянные элементы соседствуют с минеральными стенами и открытой конструкцией. Дневной свет задаёт пространству ясный порядок, сохраняя его рабочий характер.',
          'План допускает изменения: новые команды и задачи могут приходить сюда без полной перестройки интерьера.',
        ],
        imageAlts: ['Ателье Алматы с общим деревянным столом, городскими деревьями и горами за окном', 'Материалы и макеты на рабочем столе ателье Алматы', 'Рабочая зона ателье Алматы с высокими окнами и видом на город'],
      },
      kk: {
        title: 'Алматы ательесі', location: 'Алматы, Қазақстан',
        summary: 'Зейін қойып жұмыс істеу мен ой алмасуды ортақ үстел байланыстыратын кеңістік.',
        description: [
          'Алматы ательесі шағын шығармашылық командаға икемді орта ұсынады. Ортақ үстел интерьер бойымен созылып, макет жасау, талқылау және тыныш жұмыс аймақтарын біріктіреді.',
          'Жаңа ағаш элементтер минералды қабырғалармен және ашық құрылыммен қатар орналасады. Күндізгі жарық кеңістікке айқын тәртіп беріп, оның жұмыс сипатын сақтайды.',
          'Жоспар өзгеріске бейім: жаңа командалар мен міндеттер интерьерді толық қайта құрмай-ақ осы жерге орналаса алады.',
        ],
        imageAlts: ['Ортақ ағаш үстелі бар Алматы ательесі, терезе сыртында қала ағаштары мен таулар', 'Алматы ательесінің жұмыс үстеліндегі материалдар мен макеттер', 'Биік терезелерінен қала көрінетін Алматы ательесінің жұмыс аймағы'],
      },
      en: {
        title: 'Atelier Almaty', location: 'Almaty, Kazakhstan',
        summary: 'A workplace where focused making and the exchange of ideas meet along one shared table.',
        description: [
          'Atelier Almaty proposes an adaptable home for a small creative team. A shared table runs through the interior, connecting model making, discussion and quiet work.',
          'New timber elements sit alongside mineral walls and an exposed structure. Daylight gives the space a clear order without erasing its working character.',
          'The plan can change with its occupants: new teams and disciplines can arrive without remaking the entire interior.',
        ],
        imageAlts: ['Atelier Almaty with a shared timber table, city trees and mountains beyond its windows', 'Material samples and models on the Atelier Almaty worktable', 'Atelier Almaty work area with tall windows overlooking the city'],
      },
    },
  },
  {
    slug: 'karatau-retreat', category: 'Hospitality', year: 2025, detailSize: [960, 1200],
    copy: {
      ru: {
        title: 'Каратау', location: 'Туркестанская область, Казахстан',
        summary: 'Небольшое место для отдыха, открытое к сухому ландшафту и защищённое от полуденного солнца.',
        description: [
          'Каратау задуман как последовательность тихих гостевых помещений на краю открытого ландшафта. Низкий силуэт и земляные оттенки связывают архитектуру с окружающим рельефом.',
          'Глубокие навесы, прохладные переходы и внутренние дворы позволяют находиться на воздухе даже в жаркий день. Камень и утрамбованная земля делают природный характер места осязаемым.',
          'Гостеприимство выражено здесь через простые вещи: тень, простор, тишину и возможность остановиться.',
        ],
        imageAlts: ['Низкий комплекс Каратау из земли и камня в ландшафте Туркестанской области', 'Фактура земляной стены и камня в Каратау', 'Гостевая комната Каратау с затенённым проёмом к ландшафту'],
      },
      kk: {
        title: 'Қаратау', location: 'Түркістан облысы, Қазақстан',
        summary: 'Қуаң ландшафтқа ашылып, түскі күннен қорғалған шағын демалыс орны.',
        description: [
          'Қаратау ашық ландшафт шетіндегі тыныш қонақ бөлмелер тізбегі ретінде ойластырылған. Аласа сұлбасы мен жер түстес реңктері сәулетті айналадағы бедермен байланыстырады.',
          'Терең қалқалар, салқын өткелдер мен ішкі аулалар ыстық күннің өзінде сыртта отыруға мүмкіндік береді. Тас пен тапталған топырақ жердің табиғи сипатын сездіреді.',
          'Мұндағы қонақжайлық қарапайым нәрселерден көрінеді: көлеңке, кеңдік, тыныштық және аялдауға уақыт.',
        ],
        imageAlts: ['Түркістан облысының қуаң ландшафтындағы топырақ пен тастан жасалған аласа Қаратау кешені', 'Қаратау жобасындағы топырақ қабырға мен тас фактурасы', 'Ландшафтқа қарайтын көлеңкелі ойығы бар Қаратау қонақ бөлмесі'],
      },
      en: {
        title: 'Karatau Retreat', location: 'Turkistan Region, Kazakhstan',
        summary: 'A small retreat open to an arid landscape and sheltered from the midday sun.',
        description: [
          'Karatau Retreat is conceived as a sequence of quiet guest spaces at the edge of an open landscape. Its low silhouette and earth tones connect the architecture to the surrounding terrain.',
          'Deep canopies, cool passages and courtyards offer ways to be outdoors even on a hot day. Stone and rammed earth make the character of the place tangible.',
          'Hospitality is expressed through simple things: shade, room to breathe, stillness and time to pause.',
        ],
        imageAlts: ['Low rammed-earth and stone Karatau retreat in the arid Turkistan landscape', 'Rammed earth and stone detail at Karatau Retreat', 'Karatau guest room with a shaded opening toward the landscape'],
      },
    },
  },
  {
    slug: 'north-light-gallery', category: 'Cultural', year: 2026, detailSize: [960, 1200],
    copy: {
      ru: {
        title: 'Северный свет', location: 'Астана, Казахстан',
        summary: 'Галерея, в которой рассеянный дневной свет становится частью выставочного пространства.',
        description: [
          'Северный свет — камерная галерея для меняющихся выставок и долгого разговора с искусством. Залы различаются пропорциями и характером естественного освещения.',
          'Низкий внешний объём отвечает открытому небу Астаны. Внутри верхний свет, глубокие проёмы и спокойная фактура стен помогают сосредоточиться на работах.',
          'Сдержанная архитектура оставляет посетителю время смотреть, возвращаться и открывать новые связи между произведениями.',
        ],
        imageAlts: ['Невысокая галерея Северный свет среди снега и степных трав под небом Астаны', 'Мягкий верхний свет на фактурной стене галереи', 'Выставочный зал Северный свет с видом на зимний городской ландшафт'],
      },
      kk: {
        title: 'Солтүстік жарық', location: 'Астана, Қазақстан',
        summary: 'Шашыраңқы күндізгі жарық көрме кеңістігінің бір бөлігіне айналатын галерея.',
        description: [
          'Солтүстік жарық — ауысып отыратын көрмелер мен өнерді асықпай тамашалауға арналған шағын галерея. Залдардың өлшемі мен табиғи жарық сипаты әртүрлі.',
          'Аласа сыртқы көлем Астананың кең аспанымен үндеседі. Ішінде жоғарыдан түскен жарық, терең ойықтар мен қабырғалардың сабырлы фактурасы назарды туындыларға аударады.',
          'Ұстамды сәулет келушіге қарап шығуға, қайта оралуға және туындылар арасындағы жаңа байланыстарды табуға уақыт береді.',
        ],
        imageAlts: ['Астананың кең аспаны астындағы қар мен дала шөптері арасындағы аласа Солтүстік жарық галереясы', 'Галереяның фактуралы қабырғасына түскен жұмсақ жоғары жарық', 'Қысқы қала көрінісіне ашылатын Солтүстік жарық көрме залы'],
      },
      en: {
        title: 'Northern Light Gallery', location: 'Astana, Kazakhstan',
        summary: 'A gallery where diffuse daylight becomes part of the exhibition space.',
        description: [
          'Northern Light Gallery is an intimate place for changing exhibitions and unhurried encounters with art. The rooms differ in proportion and quality of natural light.',
          'A low exterior volume responds to Astana’s open sky. Inside, rooflights, deep reveals and quiet wall textures direct attention toward the work.',
          'The restrained architecture gives visitors time to look, return and discover new connections between pieces.',
        ],
        imageAlts: ['Low Northern Light Gallery amid snow and steppe grasses beneath Astana’s wide sky', 'Soft rooflight on a textured wall at Northern Light Gallery', 'Northern Light exhibition room overlooking a wintry urban landscape'],
      },
    },
  },
  {
    slug: 'tide-house', category: 'Residential', year: 2024,
    copy: {
      ru: {
        title: 'Tide House', location: 'Порту, Португалия',
        summary: 'Прибрежный дом, где защищённая лоджия связывает повседневную жизнь с Атлантикой.',
        description: [
          'Tide House расположен у меняющегося атлантического берега. Последовательность каменных стен и затенённых проёмов позволяет видеть горизонт из разных комнат.',
          'Лоджия становится главным жилым пространством между террасой и домом. Известняк хранит солнечное тепло, а деревянные ниши создают места для короткой остановки.',
          'План предлагает много спокойных встреч с морем, ветром и светом вместо одного эффектного вида.',
        ],
        imageAlts: ['Прибрежный дом Tide House на каменистом атлантическом берегу Порту', 'Защищённая каменная лоджия Tide House с видом на океан', 'Столовая Tide House с деревянным потолком и видом на Атлантику'],
      },
      kk: {
        title: 'Tide House', location: 'Порту, Португалия',
        summary: 'Қорғалған лоджиясы күнделікті өмірді Атлант мұхитымен байланыстыратын жағалаудағы үй.',
        description: [
          'Tide House Атлант жағалауының құбылмалы ауа райына бейімделген. Тас қабырғалар мен көлеңкелі ойықтардың реті әр бөлмеден көкжиекті көруге мүмкіндік береді.',
          'Лоджия терраса мен үйдің арасындағы басты тұрғын кеңістікке айналады. Әктас күн жылуын сақтайды, ал ағашпен қапталған қуыстар аялдап, сыртқа қарауға орын ұсынады.',
          'Жоспар бір ғана әсерлі көріністің орнына теңізді, желді және жарықты сезінудің бірнеше тыныш жолын ашады.',
        ],
        imageAlts: ['Портудағы Атлант мұхитының тасты жағасындағы Tide House', 'Мұхитқа қарайтын Tide House үйінің қорғалған тас лоджиясы', 'Ағаш төбесі бар, Атлант мұхитына қарайтын Tide House ас бөлмесі'],
      },
      en: {
        title: 'Tide House', location: 'Porto, Portugal',
        summary: 'A coastal home where a sheltered loggia brings the Atlantic into the rhythm of daily life.',
        description: [
          'Tide House responds to the changing weather of the Atlantic edge. A sequence of stone walls and shaded openings makes the horizon present in different rooms.',
          'The loggia becomes the main living space between terrace and house. Limestone holds the warmth of the sun, while timber-lined recesses offer places to pause.',
          'The plan offers many quiet encounters with sea, wind and light rather than pursuing a single spectacular view.',
        ],
        imageAlts: ['Tide House on the rocky Atlantic shore near Porto', 'Sheltered stone loggia at Tide House overlooking the ocean', 'Tide House dining room with a timber ceiling and Atlantic view'],
      },
    },
  },
  {
    slug: 'morrow-store', category: 'Commercial', year: 2023,
    copy: {
      ru: {
        title: 'Morrow Store', location: 'Лондон, Великобритания',
        summary: 'Магазин, построенный как последовательность камня, дерева и света, а не привычный торговый зал.',
        description: [
          'Morrow Store даёт небольшой коллекции ясность выставки. Каменные подиумы задают размеренный маршрут, а дневной свет ведёт посетителя вглубь помещения.',
          'Деревянная мебель и тонкие металлические рейлы добавляют тепла и точности. Экспозиция может меняться вместе с коллекцией, не нарушая основу интерьера.',
          'Пространство приглашает задержаться и рассмотреть форму, ткань и материал вблизи.',
        ],
        imageAlts: ['Витрина Morrow Store на дождливой улице Лондона', 'Ткани на деревянных полках рядом с каменным подиумом в Morrow Store', 'Интерьер Morrow Store с каменными подиумами и видом на улицу'],
      },
      kk: {
        title: 'Morrow Store', location: 'Лондон, Ұлыбритания',
        summary: 'Әдеттегі сауда залы емес, тас, ағаш және жарық тізбегі ретінде құрылған дүкен.',
        description: [
          'Morrow Store шағын топтаманы көрме секілді анық көрсетеді. Тас тұғырлар баяу жүретін бағыт құрады, ал күндізгі жарық келушіні ішке жетелейді.',
          'Ағаш жиһаз бен жіңішке металл ілгіштер кеңістікке жылылық пен дәлдік береді. Экспозиция топтамамен бірге өзгерсе де, интерьердің негізі сақталады.',
          'Кеңістік пішінді, матаны және материалды жақыннан қарауға, аялдауға шақырады.',
        ],
        imageAlts: ['Лондонның жаңбырлы көшесіндегі Morrow Store витринасы', 'Morrow Store дүкеніндегі ағаш сөрелердегі маталар мен тас тұғыр', 'Көшеге қарайтын тас тұғырлары бар Morrow Store интерьері'],
      },
      en: {
        title: 'Morrow Store', location: 'London, United Kingdom',
        summary: 'A retail interior composed as a sequence of stone, timber and light rather than a conventional shop floor.',
        description: [
          'Morrow Store gives a small collection the clarity of an exhibition. Stone plinths establish a measured route, while daylight draws visitors deeper into the space.',
          'Timber joinery and slim metal rails bring warmth and precision. Displays can change with the collection without disturbing the underlying interior.',
          'The space invites visitors to pause and notice form, fabric and material at close range.',
        ],
        imageAlts: ['Morrow Store frontage on a rain-wet London street', 'Folded textiles on timber shelving beside a stone plinth at Morrow Store', 'Morrow Store interior with stone display plinths and a street view'],
      },
    },
  },
];

const image = (file: string, alt: string, width = 1536, height = 1024): ProjectImage => ({
  src: `/images/projects/${file}.webp`, alt, width, height,
  credit: 'Original AI-generated image for the fictional FORMA studio',
  source: 'OpenAI ImageGen, 2026',
});

/** Materialize one locale without duplicating structural metadata or image paths. */
export function getProjects(locale: Locale): Project[] {
  return records.map((record) => {
    const copy = record.copy[locale];
    const [detailWidth, detailHeight] = record.detailSize ?? [1024, 1536];
    return {
      slug: record.slug,
      category: record.category,
      categoryLabel: categoryLabels[locale][record.category],
      year: record.year,
      title: copy.title,
      location: copy.location,
      summary: copy.summary,
      description: copy.description,
      hero: image(`${record.slug}-hero-v2`, copy.imageAlts[0]),
      gallery: [
        image(`${record.slug}-detail-v2`, copy.imageAlts[1], detailWidth, detailHeight),
        image(`${record.slug}-interior-v2`, copy.imageAlts[2]),
      ],
    };
  });
}

/** Default-language compatibility while other sections receive locale plumbing. */
export const projects = getProjects('ru');
export const projectSlugs = records.map((record) => record.slug);
