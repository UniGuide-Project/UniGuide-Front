import { useState } from 'react'
import './univerlar.scss'

const universitiesData = [
  {
    id: 'stanford',
    title: 'Stanford University',
    rating: '9.8',
    badges: ['dtm_compatible'],
    image: '/stanford.png',
    location: 'Palo Alto, USA',
    descriptions: {
      en: 'A leading research institution in the heart of Silicon Valley, known for its entrepreneurial spirit and academic excellence across all disciplines.',
      uz: "Silikon vodiysi markazidagi yetakchi tadqiqot muassasasi bo'lib, o'zining tadbirkorlik ruhi va barcha fanlar bo'yicha akademik mahorati bilan tanilgan.",
      ru: 'Ведущее исследовательское учреждение в сердце Кремниевой долины, известное своим предпринимательским духом и академическим превосходством во всех дисциплинах.'
    },
    fullDescriptions: {
      en: 'Stanford University is one of the world\'s leading research institutions. Established in 1891, it is located in California\'s Silicon Valley and is famous for its close relationship with the technology industry, its high research impact, and its stellar academic departments in engineering, humanities, sciences, and medicine. Stanford encourages an entrepreneurial mindset, driving breakthroughs in artificial intelligence, biotech, and global leadership.',
      uz: "Stenford universiteti dunyoning yetakchi tadqiqot muassasalaridan biridir. 1891-yilda tashkil etilgan ushbu oliygoh Kaliforniyaning Silikon vodiysida joylashgan. U texnologiya sanoati bilan yaqin aloqalari, yuqori ilmiy tadqiqot salohiyati hamda muhandislik, gumanitar va tabiiy fanlar, tibbiyot sohalaridagi yuksak o'quv dasturlari bilan mashhur. Stenford talabalarda tadbirkorlik va innovatsion tafakkurni shakllantiradi.",
      ru: 'Стэнфордский университет — одно из ведущих научно-исследовательских учреждений мира. Основанный в 1891 году в Кремниевой долине Калифорнии, он знаменит своими тесными связями с технологической индустрией, высоким влиянием исследований и выдающимися факультетами в области инженерии, гуманитарных наук, естествознания и медицины. Стэнфорд развивает дух предпринимательства и инноваций.'
    },
    stats: {
      en: [
        { label: 'Established', value: '1891' },
        { label: 'World Ranking', value: '#2' },
        { label: 'Enrollment', value: '17,000+' },
        { label: 'Acceptance Rate', value: '4.3%' }
      ],
      uz: [
        { label: 'Tashkil etilgan', value: '1891' },
        { label: 'Jahon reytingi', value: '#2' },
        { label: 'Talabalar soni', value: '17,000+' },
        { label: 'Qabul darajasi', value: '4.3%' }
      ],
      ru: [
        { label: 'Основан', value: '1891' },
        { label: 'Мировой рейтинг', value: '#2' },
        { label: 'Всего студентов', value: '17,000+' },
        { label: 'Процент приёма', value: '4.3%' }
      ]
    },
    faculties: [
      {
        id: 'cs',
        iconType: 'computer',
        titles: { en: 'Computer Science', uz: 'Kompyuter fanlari', ru: 'Компьютерные науки' },
        subtitles: { en: 'SCHOOL OF ENGINEERING', uz: 'MUHANDISLIK MAKTABI', ru: 'ИНЖЕНЕРНАЯ ШКОЛА' },
        programs: 'B.S., M.S., Ph.D.',
        statLabel: { en: 'Faculty Count', uz: 'Fakultet a\'zolari', ru: 'Преподаватели' },
        statValue: { en: '60+ Core Members', uz: '60+ asosiy a\'zolar', ru: '60+ профессоров' },
        highlightLabel: { en: 'PRIMARY RESEARCH AREAS', uz: 'ASOSIY TADQIQOT YO\'NALISHLARI', ru: 'ОСНОВНЫЕ НАПРАВЛЕНИЯ ИССЛЕДОВАНИЙ' },
        highlightValue: {
          en: 'Artificial Intelligence, Robotics, Human-Computer Interaction, Security, and Systems.',
          uz: 'Sun\'iy intellekt, robototexnika, inson-kompyuter aloqasi, xavfsizlik va tizimlar.',
          ru: 'Искусственный интеллект, робототехника, человеко-компьютерное взаимодействие, безопасность и системы.'
        }
      },
      {
        id: 'eng',
        iconType: 'engineering',
        titles: { en: 'Engineering', uz: 'Muhandislik', ru: 'Инженерия' },
        subtitles: { en: 'INTERDISCIPLINARY EXCELLENCE', uz: 'FAKULTETLARARO MUKAMMALLIK', ru: 'МЕЖДИСЦИПЛИНАРНОЕ ПРЕВОСХОДСТВО' },
        programs: 'B.S., M.S., Ph.D.',
        statLabel: { en: 'Faculty Count', uz: 'Fakultet a\'zolari', ru: 'Преподаватели' },
        statValue: { en: '150+ Faculty Members', uz: '150+ fakultet a\'zolari', ru: '150+ преподавателей' },
        highlightLabel: { en: 'PRIMARY RESEARCH AREAS', uz: 'ASOSIY TADQIQOT YO\'NALISHLARI', ru: 'ОСНОВНЫЕ НАПРАВЛЕНИЯ ИССЛЕДОВАНИЙ' },
        highlightValue: {
          en: 'Bioengineering, Chemical Engineering, Civil & Environmental, Electrical, and Mechanical Engineering.',
          uz: 'Biomuhandislik, kimyo muhandisligi, fuqarolik va atrof-muhit, elektr va mexanika muhandisligi.',
          ru: 'Биоинженерия, химическая инженерия, гражданское и экологическое строительство, электротехника и машиностроение.'
        }
      },
      {
        id: 'med',
        iconType: 'medicine',
        titles: { en: 'Medicine', uz: 'Tibbiyot', ru: 'Медицина' },
        subtitles: { en: 'SCHOOL OF MEDICINE', uz: 'TIBBIYOT MAKTABI', ru: 'МЕДИЦИНСКАЯ ШКОЛА' },
        programs: 'MD, PA, Research MS/PhD',
        statLabel: { en: 'Clinical Partners', uz: 'Klinik hamkorlar', ru: 'Клинические партнеры' },
        statValue: { en: 'Stanford Health Care', uz: 'Stanford Sog\'liqni Saqlash', ru: 'Стэнфордское здравоохранение' },
        highlightLabel: { en: 'EXCELLENCE', uz: 'MUKAMMALLIK SOHASI', ru: 'ПРЕВОСХОДСТВО' },
        highlightValue: {
          en: 'Leaders in clinical innovation and basic science research aimed at human health.',
          uz: 'Inson salomatligiga qaratilgan klinik innovatsiyalar va fundamental ilmiy tadqiqotlar yetakchisi.',
          ru: 'Лидеры в области клинических инноваций и фундаментальных научных исследований здоровья человека.'
        }
      },
      {
        id: 'hum',
        iconType: 'humanities',
        titles: { en: 'Humanities & Sciences', uz: 'Gumanitar va Tabiiy Fanlar', ru: 'Гуманитарные и естественные науки' },
        subtitles: { en: 'LIBERAL ARTS HUB', uz: 'GUMANITAR FANLAR MARKAZI', ru: 'ЦЕНТР СВОБОДНЫХ ИСКУССТВ' },
        programs: 'B.A., B.S., M.A., Ph.D.',
        statLabel: { en: 'Departments', uz: 'Kafedralar soni', ru: 'Департаменты' },
        statValue: { en: '40+ Departments', uz: '40+ kafedralar', ru: '40+ департаментов' },
        highlightLabel: { en: 'PRIMARY RESEARCH AREAS', uz: 'ASOSIY TADQIQOT YO\'NALISHLARI', ru: 'ОСНОВНЫЕ НАПРАВЛЕНИЯ ИССЛЕДОВАНИЙ' },
        highlightValue: {
          en: 'Physics, Literature, Sociology, Applied Physics, History, and Performing Arts.',
          uz: 'Fizika, adabiyot, sotsiologiya, amaliy fizika, tarix va ijrochilik san\'ati.',
          ru: 'Физика, литература, социология, прикладная физика, история и исполнительское искусство.'
        }
      }
    ]
  },
  {
    id: 'eth',
    title: 'ETH Zürich',
    rating: '9.6',
    badges: ['top_rated'],
    image: '/eth.png',
    location: 'Zürich, Switzerland',
    descriptions: {
      en: "Consistently ranked as one of the world's best universities for science and technology, ETH Zürich is a hub for innovation in Europe.",
      uz: "Fan va texnologiya sohasida dunyodagi eng yaxshi oliy ta'lim muassasalaridan biri bo'bir, Yevropadagi innovatsiyalar markazi hisoblanadi.",
      ru: 'Стабильно входит в число лучших университетов мира в области науки и технологий, ETH Zürich является центром инноваций в Европе.'
    },
    fullDescriptions: {
      en: 'ETH Zürich is a public research university in Zürich, Switzerland. Founded by the Swiss Federal Government in 1854, the school focuses centrally on science, technology, engineering, and mathematics. It is highly regarded as one of the most prestigious technical universities in the world, with over 20 Nobel Laureates having trained or taught at this academic hub.',
      uz: "Suryadagi Syurix Oliy Texnika Maktabi (ETH Zürich) - Shveysariyaning eng nufuzli davlat tadqiqot universitetidir. 1854-yilda tashkil etilgan oliygoh asosan aniq fanlar, texnologiya, muhandislik va matematika (STEM) yo'nalishlariga ixtisoslashgan. Dunyodagi eng yaxshi texnik oliygohlardan biri bo'lib, uning tarixi davomida 20 dan ortiq Nobel mukofoti sovrindorlari tahsil olgan.",
      ru: 'ETH Zürich — один из самых престижных политехнических университетов мира, основанный швейцарским правительством в 1854 году. Вуз сосредоточен на науке, технологиях, инженерии и математике. В числе его выпускников и преподавателей числятся более 20 лауреатов Нобелевской премии, включая Альберта Эйнштейна.'
    },
    stats: {
      en: [
        { label: 'Established', value: '1854' },
        { label: 'World Ranking', value: '#7' },
        { label: 'Enrollment', value: '22,000+' },
        { label: 'Acceptance Rate', value: '27%' }
      ],
      uz: [
        { label: 'Tashkil etilgan', value: '1854' },
        { label: 'Jahon reytingi', value: '#7' },
        { label: 'Talabalar soni', value: '22,000+' },
        { label: 'Qabul darajasi', value: '27%' }
      ],
      ru: [
        { label: 'Основан', value: '1854' },
        { label: 'Мировой рейтинг', value: '#7' },
        { label: 'Всего студентов', value: '22,000+' },
        { label: 'Процент приёма', value: '27%' }
      ]
    },
    faculties: [
      {
        id: 'cs',
        iconType: 'computer',
        titles: { en: 'Computer Science', uz: 'Kompyuter fanlari', ru: 'Компьютерные науки' },
        subtitles: { en: 'DEPARTMENT OF COMPUTER SCIENCE', uz: 'KOMPYUTER FANLARI DEPARTAMENTI', ru: 'ДЕПАРТАМЕНТ КОМПЬЮТЕРНЫХ НАУК' },
        programs: 'B.Sc., M.Sc., Ph.D.',
        statLabel: { en: 'Core Professors', uz: 'Asosiy professorlar', ru: 'Профессора' },
        statValue: { en: '30+ Professors', uz: '30+ yetakchi professorlar', ru: '30+ профессоров' },
        highlightLabel: { en: 'PRIMARY RESEARCH AREAS', uz: 'ASOSIY TADQIQOT YO\'NALISHLARI', ru: 'ОСНОВНЫЕ НАПРАВЛЕНИЯ ИССЛЕДОВАНИЙ' },
        highlightValue: {
          en: 'Information Security, Software Engineering, Visual Computing, Theory and Algorithms, and Intelligent Systems.',
          uz: 'Axborot xavfsizligi, dasturiy ta\'minot muhandisligi, vizual hisoblash, nazariya va algoritmlar, intellektual tizimlar.',
          ru: 'Информационная безопасность, программная инженерия, визуальные вычисления, теория и алгоритмы, интеллектуальные системы.'
        }
      },
      {
        id: 'phys',
        iconType: 'engineering',
        titles: { en: 'Physics & Mathematics', uz: 'Fizika va Matematika', ru: 'Физика и математика' },
        subtitles: { en: 'NATURAL SCIENCES DIVISION', uz: 'TABIIY FANLAR BO\'LIMI', ru: 'ОТДЕЛЕНИЕ ЕСТЕСТВЕННЫХ НАУК' },
        programs: 'B.Sc., M.Sc., Ph.D.',
        statLabel: { en: 'Nobel Laureates', uz: 'Nobel mukofoti egalari', ru: 'Нобелевские лауреаты' },
        statValue: { en: '5 Laureates', uz: '5 ta Nobel mukofoti', ru: '5 лауреатов' },
        highlightLabel: { en: 'PRIMARY RESEARCH AREAS', uz: 'ASOSIY TADQIQOT YO\'NALISHLARI', ru: 'ОСНОВНЫЕ НАПРАВЛЕНИЯ ИССЛЕДОВАНИЙ' },
        highlightValue: {
          en: 'Quantum Computing, High-Energy Physics, Applied Mathematics, Astrophisics, and Theoretical Science.',
          uz: 'Kvant hisoblash, yuqori energiya fizikasi, amaliy matematika, astrofizika va nazariy fanlar.',
          ru: 'Квантовые вычисления, физика высоких энергий, прикладная математика, астрофизика и теоретическая физика.'
        }
      }
    ]
  },
  {
    id: 'oxford',
    title: 'Oxford University',
    rating: '9.9',
    badges: [],
    image: '/oxford.png',
    location: 'Oxford, UK',
    descriptions: {
      en: 'The oldest university in the English-speaking world, offering a unique collegiate system and a centuries-old tradition of academic rigor.',
      uz: "Ingliz tilida so'zlashuvchi dunyodagi eng qadimiy universitet bo'lib, o'ziga xos kollegial tizim va ko'p asrlik akademik an'analarni taklif etadi.",
      ru: 'Старейший университет в англоязычном мире, предлагающий уникальную коллегиальную систему и многовековые традиции академической строгости.'
    },
    fullDescriptions: {
      en: 'The University of Oxford is a collegiate research university in Oxford, England. With evidence of teaching as early as 1096, it is the oldest university in the English-speaking world. Oxford has educated numerous world leaders, prime ministers, scientists, and writers, maintaining its premier position through its unique tutorial teaching model and unmatched research output.',
      uz: "Oksford universiteti - Buyuk Britaniyaning Oksford shahrida joylashgan nufuzli kollegial tadqiqot universitetidir. O'qitish 1096-yildan boshlangan bo'lib, u ingliz tilida so'zlashuvchi dunyodagi eng qadimgi oliygoh hisoblanadi. Oksford ko'plab dunyo yetakchilari, bosh vazirlar, buyuk olimlar va yozuvchilarni tarbiyalagan.",
      ru: 'Оксфордский университет — старейший англоязычный университет в мире, расположенный в городе Оксфорд, Великобритания. Обучение там велось еще в 1096 году. Университет состоит из 39 уникальных колледжей и известен своей традиционной системой тьюторских занятий, высоким академическим статусом и мировым влиянием.'
    },
    stats: {
      en: [
        { label: 'Established', value: '1096' },
        { label: 'World Ranking', value: '#1' },
        { label: 'Enrollment', value: '25,000+' },
        { label: 'Acceptance Rate', value: '14.3%' }
      ],
      uz: [
        { label: 'Tashkil etilgan', value: '1096' },
        { label: 'Jahon reytingi', value: '#1' },
        { label: 'Talabalar soni', value: '25,000+' },
        { label: 'Qabul darajasi', value: '14.3%' }
      ],
      ru: [
        { label: 'Основан', value: '1096' },
        { label: 'Мировой рейтинг', value: '#1' },
        { label: 'Всего студентов', value: '25,000+' },
        { label: 'Процент приёма', value: '14.3%' }
      ]
    },
    faculties: [
      {
        id: 'hum',
        iconType: 'humanities',
        titles: { en: 'Humanities Division', uz: 'Gumanitar fanlar bo\'limi', ru: 'Гуманитарное отделение' },
        subtitles: { en: 'LIBERAL ARTS & CLASSICS', uz: 'GUMANITAR VA KLASSIK FANLAR', ru: 'ГУМАНИТАРНЫЕ НАУКИ И КЛАССИКА' },
        programs: 'B.A., M.St., D.Phil.',
        statLabel: { en: 'Faculties', uz: 'Yo\'nalishlar soni', ru: 'Факультеты' },
        statValue: { en: '11 Academic Faculties', uz: '11 ta akademik kafedralar', ru: '11 академических факультетов' },
        highlightLabel: { en: 'PRIMARY RESEARCH AREAS', uz: 'ASOSIY TADQIQOT YO\'NALISHLARI', ru: 'ОСНОВНЫЕ НАПРАВЛЕНИЯ ИССЛЕДОВАНИЙ' },
        highlightValue: {
          en: 'History, Philosophy, Classics, Modern Languages, English Literature, and Theology.',
          uz: 'Tarix, falsafa, klassik adabiyot, zamonaviy tillar, ingliz adabiyoti va ilohiyot.',
          ru: 'История, философия, классика, современные языки, английская литература и теология.'
        }
      },
      {
        id: 'med',
        iconType: 'medicine',
        titles: { en: 'Medical Sciences Division', uz: 'Tibbiyot fanlari bo\'limi', ru: 'Отделение медицинских наук' },
        subtitles: { en: 'OXFORD MEDICINE', uz: 'OKSFORD TIBBIYOTI', ru: 'ОКСФОРДСКАЯ МЕДИЦИНА' },
        programs: 'BM BCh, MSc, D.Phil.',
        statLabel: { en: 'Clinical Partners', uz: 'Klinik hamkorlar', ru: 'Клинические партнеры' },
        statValue: { en: 'John Radcliffe Hospital', uz: 'Jon Redkliff shifoxonasi', ru: 'Больница Джона Радклиффа' },
        highlightLabel: { en: 'PRIMARY RESEARCH AREAS', uz: 'ASOSIY TADQIQOT YO\'NALISHLARI', ru: 'ОСНОВНЫЕ НАПРАВЛЕНИЯ ИССЛЕДОВАНИЙ' },
        highlightValue: {
          en: 'Immunology, Neuroscience, Oncology, Vaccine Development (Oxford-AstraZeneca), and Cardiovascular Medicine.',
          uz: 'Immunologiya, neyrobiologiya, onkologiya, vaksina yaratish (Oxford-AstraZeneca) va kardiologiya.',
          ru: 'Иммунология, нейробиология, онкология, разработка вакцин (Oxford-AstraZeneca) и кардиология.'
        }
      }
    ]
  },
  {
    id: 'nus',
    title: 'National University of Singapore',
    rating: '9.5',
    badges: ['dtm_compatible'],
    image: '/stanford.png', // fallback
    location: 'Singapore',
    descriptions: {
      en: "Singapore's flagship university, providing a global approach to education and research with a focus on Asian perspectives and expertise.",
      uz: "Singapurning yetakchi universiteti bo'lib, Osiyo istiqbollari va tajribasiga e'tibor qaratgan holda ta'lim va tadqiqotlarga global yondashuvni taqdim etadi.",
      ru: 'Флагманский университет Сингапура, предлагающий глобальный подход к образованию и исследованиям с акцентом на азиатские перспективы и опыт.'
    },
    fullDescriptions: {
      en: 'The National University of Singapore (NUS) is Singapore\'s flagship, top-ranked university. Offering a global approach to education and research, NUS is prominent for its Asian focus and expertise. It features strong departments in computer science, business, and design engineering, preparing graduates for the dynamic global economy.',
      uz: "Singapur Milliy Universiteti (NUS) - mamlakatning yetakchi davlat universiteti. Ta'lim va tadqiqotga global yondashuvni taqdim etadigan ushbu oliygoh, ayniqsa, Osiyo istiqbollari bo'yicha tadqiqotlari bilan mashhur. Kompyuter texnologiyalari, biznes va muhandislik yo'nalishlarida kuchli reytinglarga ega.",
      ru: 'Национальный университет Сингапура (NUS) — флагманский вуз Сингапура. Он сочетает глобальный подход к образованию с азиатской спецификой и экспертизой. Предоставляет сильные учебные программы в области программирования, бизнеса, инженерии и естественных наук.'
    },
    stats: {
      en: [
        { label: 'Established', value: '1905' },
        { label: 'World Ranking', value: '#8' },
        { label: 'Enrollment', value: '38,000+' },
        { label: 'Acceptance Rate', value: '8%' }
      ],
      uz: [
        { label: 'Tashkil etilgan', value: '1905' },
        { label: 'Jahon reytingi', value: '#8' },
        { label: 'Talabalar soni', value: '38,000+' },
        { label: 'Qabul darajasi', value: '8%' }
      ],
      ru: [
        { label: 'Основан', value: '1905' },
        { label: 'Мировой рейтинг', value: '#8' },
        { label: 'Всего студентов', value: '38,000+' },
        { label: 'Процент приёма', value: '8%' }
      ]
    },
    faculties: [
      {
        id: 'cs',
        iconType: 'computer',
        titles: { en: 'School of Computing', uz: 'Hisoblash maktabi', ru: 'Школа компьютерных технологий' },
        subtitles: { en: 'TOP 10 WORLD CS', uz: 'DUNYODA K-10 CS O\'RINDA', ru: 'ТОП-10 В МИРЕ ПО ИТ' },
        programs: 'B.Comp., M.Comp., Ph.D.',
        statLabel: { en: 'Academic Staff', uz: 'O\'qituvchilar tarkibi', ru: 'Преподаватели' },
        statValue: { en: '100+ Staff Members', uz: '100+ o\'qituvchilar', ru: '100+ преподавателей' },
        highlightLabel: { en: 'PRIMARY RESEARCH AREAS', uz: 'ASOSIY TADQIQOT YO\'NALISHLARI', ru: 'ОСНОВНЫЕ НАПРАВЛЕНИЯ ИССЛЕДОВАНИЙ' },
        highlightValue: {
          en: 'Cybersecurity, Artificial Intelligence, Database Systems, Computer Networks, and FinTech.',
          uz: 'Kiberxavfsizlik, sun\'iy intellekt, ma\'lumotlar bazasi tizimlari, kompyuter tarmoqlari va FinTex.',
          ru: 'Кибербезопасность, искусственный интеллект, базы данных, компьютерные сети и финтех.'
        }
      }
    ]
  },
  {
    id: 'mit',
    title: 'MIT',
    rating: '10.0',
    badges: [],
    image: '/eth.png', // fallback
    location: 'Cambridge, USA',
    descriptions: {
      en: 'Massachusetts Institute of Technology is synonymous with cutting-edge research, engineering brilliance, and solving the world\'s toughest problems.',
      uz: "Massachusets texnologiya instituti ilg'or tadqiqotlar, muhandislik yutuqlari va dunyodagi eng qiyin muammolarni hal qilish bilan tenglashtiriladi.",
      ru: 'Массачусетский технологический институт является синонимом передовых исследований, инженерного блеска и решения самых сложных мировых проблем.'
    },
    fullDescriptions: {
      en: 'The Massachusetts Institute of Technology (MIT) is a private research university in Cambridge, Massachusetts. Known for its intense academic environment, science and engineering research brilliance, MIT operates as a global hub for innovation. It boasts over 95 Nobel Laureates and has birthed modern technologies from the internet to digital computation.',
      uz: "Massachusets Texnologiya Instituti (MIT) - AQShning Massachusets shtati Kembrij shahrida joylashgan xususiy tadqiqot universitetidir. Dunyoning eng ilg'or muhandislik va ilmiy markazi hisoblanadigan MIT, texnologik inqiloblar vatani hisoblanadi. Uning bitiruvchilari orasida 95 dan ortiq Nobel mukofoti egalari bor.",
      ru: 'Массачусетский технологический институт (MIT) — один из ведущих исследовательских университетов мира, расположенный в Кембридже, США. MIT является синонимом передовой науки, инженерного блеска и инноваций. Университет воспитал более 95 нобелевских лауреатов.'
    },
    stats: {
      en: [
        { label: 'Established', value: '1861' },
        { label: 'World Ranking', value: '#1 (QS)' },
        { label: 'Enrollment', value: '11,500+' },
        { label: 'Acceptance Rate', value: '4.0%' }
      ],
      uz: [
        { label: 'Tashkil etilgan', value: '1861' },
        { label: 'Jahon reytingi', value: '#1 (QS)' },
        { label: 'Talabalar soni', value: '11,500+' },
        { label: 'Qabul darajasi', value: '4.0%' }
      ],
      ru: [
        { label: 'Основан', value: '1861' },
        { label: 'Мировой рейтинг', value: '#1 (QS)' },
        { label: 'Всего студентов', value: '11,500+' },
        { label: 'Процент приёма', value: '4.0%' }
      ]
    },
    faculties: [
      {
        id: 'eecs',
        iconType: 'computer',
        titles: { en: 'EECS Department', uz: 'EECS bo\'limi', ru: 'Департамент EECS' },
        subtitles: { en: 'ELECTRICAL ENG & COMPUTER SCIENCE', uz: 'ELEKTR MUHANDISLIGI VA AXBOROT TEXNOLOGIYALARI', ru: 'ЭЛЕКТРОТЕХНИКА И КОМПЬЮТЕРНЫЕ НАУКИ' },
        programs: 'S.B., M.Eng., Ph.D.',
        statLabel: { en: 'Faculty Members', uz: 'Kafedra a\'zolari', ru: 'Преподаватели' },
        statValue: { en: '120+ Professors', uz: '120+ professor-o\'qituvchilar', ru: '120+ профессоров' },
        highlightLabel: { en: 'PRIMARY RESEARCH AREAS', uz: 'ASOSIY TADQIQOT YO\'NALISHLARI', ru: 'ОСНОВНЫЕ НАПРАВЛЕНИЯ ИССЛЕДОВАНИЙ' },
        highlightValue: {
          en: 'Computation Theory, Artificial Intelligence, Robotics, Circuit Systems, Nanotechnology, and Telecommunications.',
          uz: 'Hisoblash nazariyasi, sun\'iy intellekt, robototexnika, integral mikrosxemalar, nanotexnologiyalar va telekommunikatsiya.',
          ru: 'Теория вычислений, искусственный интеллект, робототехника, схемотехника, нанотехнологии и телекоммуникации.'
        }
      }
    ]
  },
  {
    id: 'tsinghua',
    title: 'Tsinghua University',
    rating: '9.4',
    badges: ['top_rated'],
    image: '/oxford.png', // fallback
    location: 'Beijing, China',
    descriptions: {
      en: 'A premier institution in China, leading in technical sciences and fostering the next generation of global leaders and innovators.',
      uz: "Xitoydagi yetakchi muassasa bo'lib, texnik fanlar sohasida peshqadam va global liderlar hamda innovatorlarning keyingi avlodini tarbiyalaydi.",
      ru: 'Ведущее учебное заведение в Китае, лидирующее в технических науках и воспитывающее следующее поколение глобальных лидеров и инноваторов.'
    },
    fullDescriptions: {
      en: 'Tsinghua University is a major public research university in Beijing, China. Established in 1911, it consistently ranks as one of the best universities in Asia and excels globally in engineering, computer science, and technical disciplines. Tsinghua serves as a training ground for China\'s political, economic, and scientific elite.',
      uz: "Sinxua Universiteti (Tsinghua) - Xitoyning Pekin shahrida joylashgan yirik davlat tadqiqot universitetidir. 1911-yilda tashkil etilgan. U muhandislik va kompyuter texnologiyalari yo'nalishlarida dunyoning eng ilg'or oliygohlaridan biridir. Xitoyning siyosiy, iqtisodiy va ilmiy elitasini tayyorlash markazi hisoblanadi.",
      ru: 'Университет Цинхуа — ведущий государственный исследовательский вуз в Пекине, Китай. Основанный в 1911 году, он стабильно занимает лидирующие позиции в рейтингах Азии и мира по инженерии, компьютерным наукам и технологическим исследованиям, являясь центром подготовки научной элиты Китая.'
    },
    stats: {
      en: [
        { label: 'Established', value: '1911' },
        { label: 'World Ranking', value: '#12' },
        { label: 'Enrollment', value: '50,000+' },
        { label: 'Acceptance Rate', value: '1.2%' }
      ],
      uz: [
        { label: 'Tashkil etilgan', value: '1911' },
        { label: 'Jahon reytingi', value: '#12' },
        { label: 'Talabalar soni', value: '50,000+' },
        { label: 'Qabul darajasi', value: '1.2%' }
      ],
      ru: [
        { label: 'Основан', value: '1911' },
        { label: 'Мировой рейтинг', value: '#12' },
        { label: 'Всего студентов', value: '50,000+' },
        { label: 'Процент приёма', value: '1.2%' }
      ]
    },
    faculties: [
      {
        id: 'cs',
        iconType: 'computer',
        titles: { en: 'Computer Science', uz: 'Kompyuter fanlari', ru: 'Компьютерные науки' },
        subtitles: { en: 'SCHOOL OF SOFTWARE & CS', uz: 'KOMPYUTER FANLARI VA DASTURIY TA\'MINOT MAKTABI', ru: 'ШКОЛА ПРОГРАММИРОВАНИЯ И ИТ' },
        programs: 'B.E., M.S., Ph.D.',
        statLabel: { en: 'Turing Labs', uz: 'Tyuring laboratoriyalari', ru: 'Тьюринг-лаборатории' },
        statValue: { en: '4 Turing Research Labs', uz: '4 ta Tyuring ilmiy markazlari', ru: '4 научные лаборатории Тьюринга' },
        highlightLabel: { en: 'PRIMARY RESEARCH AREAS', uz: 'ASOSIY TADQIQOT YO\'NALISHLARI', ru: 'ОСНОВНЫЕ НАПРАВЛЕНИЯ ИССЛЕДОВАНИЙ' },
        highlightValue: {
          en: 'Machine Learning, Quantum Information, Cryptography, Database Systems, and Network Architecture.',
          uz: 'Mashinali o\'qitish, kvant ma\'lumotlari, kriptografiya, ma\'lumotlar bazasi tizimlari va tarmoq arxitekturasi.',
          ru: 'Машинное обучение, квантовая информация, криптография, базы данных и сетевая архитектура.'
        }
      }
    ]
  }
]

const translationsSet = {
  uz: {
    tag: 'Next-Gen Ta\'lim Intellekti',
    title: 'Dunyoning eng nufuzli institutlarini kashf eting, AI bilan boshqariladi.',
    subtitle: 'Bizning Sun\'iy Intellekt yordamida universitetlarni moslashtirish tizimimiz va real vaqtdagi imtihon simulyatorimiz orqali ideal akademik yo\'lingizni toping.',
    placeholder: 'Nomi, dasturi yoki joylashuvi bo\'yicha qidirish...',
    filters: 'Filtrlar',
    dtmCompatible: 'DTM mos keladi',
    topRated: 'Yuqori baholangan',
    viewDetails: 'Batafsil ma\'lumot',
    noResults: 'Hech qanday universitet topilmadi.',
    backToList: 'Ro\'yxatga qaytish',
    tabDescription: 'Tavsif',
    tabFaculties: 'Fakultetlar',
    programsLabel: 'Dasturlar'
  },
  en: {
    tag: 'Next-Gen Education Intelligence',
    title: 'Explore the World\'s Finest Institutions, Guided by AI.',
    subtitle: 'Find your ideal academic path with our AI-enhanced university matching system and real-time admission simulator.',
    placeholder: 'Search by name, program, or location...',
    filters: 'Filters',
    dtmCompatible: 'DTM Compatible',
    topRated: 'Top Rated',
    viewDetails: 'View Details',
    noResults: 'No universities found.',
    backToList: 'Back to List',
    tabDescription: 'Description',
    tabFaculties: 'Faculties',
    programsLabel: 'Programs'
  },
  ru: {
    tag: 'Интеллект образования нового поколения',
    title: 'Исследуйте лучшие институты мира под руководством ИИ.',
    subtitle: 'Найдите свой идеальный академический путь с помощью нашей системы подбора университетов на базе ИИ и симулятора поступления в реальном времени.',
    placeholder: 'Поиск по названию, программе или локации...',
    filters: 'Фильтры',
    dtmCompatible: 'Совместимо с DTM',
    topRated: 'Лучший выбор',
    viewDetails: 'Подробнее',
    noResults: 'Университеты не найдены.',
    backToList: 'Назад к списку',
    tabDescription: 'Описание',
    tabFaculties: 'Факультеты',
    programsLabel: 'Программы'
  }
}

const renderFacultyIcon = (iconType) => {
  switch (iconType) {
    case 'computer':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      )
    case 'engineering':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    case 'medicine':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="6" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      )
    case 'humanities':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      )
    default:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
      )
  }
}

function Univerlar({ lang }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeUniversityId, setActiveUniversityId] = useState(null)
  const [detailTab, setDetailTab] = useState('description') // 'description' or 'faculties'
  const [expandedFaculties, setExpandedFaculties] = useState({})

  const currentText = translationsSet[lang] || translationsSet.uz

  // Filter universities based on query
  const filteredUniversities = universitiesData.filter((uni) => {
    const query = searchQuery.toLowerCase()
    return (
      uni.title.toLowerCase().includes(query) ||
      uni.location.toLowerCase().includes(query) ||
      uni.descriptions[lang].toLowerCase().includes(query)
    )
  })

  // If a university is active, render its premium detail view
  if (activeUniversityId) {
    const activeUni = universitiesData.find((u) => u.id === activeUniversityId)

    if (activeUni) {
      return (
        <section className="univerlar-section uni-detail-mode">
          {/* Back Nav row */}
          <div className="back-nav">
            <button
              className="back-btn"
              onClick={() => {
                setActiveUniversityId(null)
                setDetailTab('description')
                setExpandedFaculties({})
              }}
              aria-label={currentText.backToList}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>{currentText.backToList}</span>
            </button>
          </div>

          {/* Hero Banner Grid */}
          <div className="uni-detail-hero">
            <img src={activeUni.image} alt={activeUni.title} className="detail-hero-img" />
            <div className="detail-hero-overlay"></div>
            <div className="detail-hero-content">
              <h1 className="detail-title">{activeUni.title}</h1>
            </div>
          </div>

          {/* Details Navigation Tabs */}
          <div className="detail-tabs-row" role="tablist">
            <button
              role="tab"
              aria-selected={detailTab === 'description'}
              className={`tab-link ${detailTab === 'description' ? 'active' : ''}`}
              onClick={() => setDetailTab('description')}
            >
              {currentText.tabDescription}
            </button>
            <button
              role="tab"
              aria-selected={detailTab === 'faculties'}
              className={`tab-link ${detailTab === 'faculties' ? 'active' : ''}`}
              onClick={() => setDetailTab('faculties')}
            >
              {currentText.tabFaculties}
            </button>
          </div>

          {/* Details Content Panels */}
          <div className="detail-content-pane">
            {detailTab === 'description' ? (
              <div className="detail-description-pane">
                <p className="full-desc">{activeUni.fullDescriptions[lang] || activeUni.fullDescriptions.uz}</p>

                {/* Grid of 2x2 key statistical indicators */}
                <div className="uni-stats-grid">
                  {activeUni.stats[lang].map((s, idx) => (
                    <div key={idx} className="uni-stat-card">
                      <span className="stat-value">{s.value}</span>
                      <span className="stat-label">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="detail-faculties-pane">
                {activeUni.faculties && activeUni.faculties.map((fac) => {
                  const isExpanded = !!expandedFaculties[fac.id]
                  return (
                    <div key={fac.id} className={`faculty-accordion-card ${isExpanded ? 'expanded' : ''}`}>
                      {/* Accordion Trigger Header */}
                      <div
                        className="faculty-header"
                        role="button"
                        aria-expanded={isExpanded}
                        onClick={() => {
                          setExpandedFaculties((prev) => ({
                            ...prev,
                            [fac.id]: !prev[fac.id]
                          }))
                        }}
                      >
                        <div className="faculty-header-left">
                          <div className="faculty-icon-container">
                            {renderFacultyIcon(fac.iconType)}
                          </div>
                          <div className="faculty-header-text">
                            <h4>{fac.titles[lang]}</h4>
                            <span className="faculty-subtitle">{fac.subtitles[lang]}</span>
                          </div>
                        </div>

                        <button
                          className="accordion-toggle-btn"
                          aria-label={`Toggle ${fac.titles[lang]}`}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                              transform: isExpanded ? 'rotate(180deg)' : 'none',
                              transition: 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
                            }}
                          >
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </button>
                      </div>

                      {/* Collapsible content panel */}
                      <div className={`faculty-panel ${isExpanded ? 'open' : ''}`}>
                        <div className="faculty-panel-content">
                          <div className="faculty-stats-row">
                            <div className="faculty-stat-subcard">
                              <span className="subcard-label">{currentText.programsLabel}</span>
                              <span className="subcard-val">{fac.programs}</span>
                            </div>
                            <div className="faculty-stat-subcard">
                              <span className="subcard-label">{fac.statLabel[lang]}</span>
                              <span className="subcard-val">{fac.statValue[lang]}</span>
                            </div>
                          </div>

                          <div className="faculty-research-block">
                            <span className="research-title">{fac.highlightLabel[lang]}</span>
                            <p className="research-text">{fac.highlightValue[lang]}</p>
                          </div>
                        </div>
                      </div>

                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      )
    }
  }

  return (
    <section className="univerlar-section" id="universities">
      
      {/* Dynamic Header Block */}
      <div className="uni-header">
        <div className="intelligence-pill">
          <span>⚡ {currentText.tag}</span>
        </div>
        <h2>{currentText.title}</h2>
        <p>{currentText.subtitle}</p>
      </div>

      {/* Dynamic Search & Filter Row */}
      <div className="search-filter-row">
        <div className="search-wrapper">
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder={currentText.placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search universities"
          />
        </div>
        
        <button className="filter-btn" aria-label="Toggle filters list">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
          <span>{currentText.filters}</span>
        </button>
      </div>

      {/* Grid of Universities */}
      <div className="uni-grid">
        {filteredUniversities.map((uni) => (
          <article
            key={uni.id}
            className="uni-card"
            onClick={() => setActiveUniversityId(uni.id)}
            style={{ cursor: 'pointer' }}
          >
            
            {/* Image & Badge overlay */}
            <div className="uni-image-wrapper">
              <img src={uni.image} alt={uni.title} loading="lazy" />
              {uni.badges.map((badge) => (
                <span key={badge} className={`card-badge ${badge === 'dtm_compatible' ? 'dtm-compatible' : 'top-rated'}`}>
                  {badge === 'dtm_compatible' ? currentText.dtmCompatible : currentText.topRated}
                </span>
              ))}
            </div>

            {/* Content Details */}
            <div className="uni-card-body">
              <div className="uni-title-row">
                <h3>{uni.title}</h3>
                <span className="rating-badge" aria-label={`Rating ${uni.rating}`}>{uni.rating}</span>
              </div>
              <p className="uni-desc">{uni.descriptions[lang] || uni.descriptions.uz}</p>
              
              <div className="uni-footer-row">
                <span className="location">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  {uni.location}
                </span>
                
                <a
                  href={`#details-${uni.id}`}
                  className="details-link"
                  aria-label={`View details for ${uni.title}`}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setActiveUniversityId(uni.id)
                  }}
                >
                  <span>{currentText.viewDetails}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </div>

          </article>
        ))}
      </div>

      {filteredUniversities.length === 0 && (
        <p style={{ margin: '36px 0', fontSize: '15px', color: 'var(--on-surface-variant)', textAlign: 'center' }}>
          {currentText.noResults}
        </p>
      )}

      {/* Pagination indicators */}
      <div className="pagination-row" aria-label="Pagination Navigation">
        <button className="page-btn" aria-label="Previous page" disabled>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button className="page-btn active" aria-label="Page 1">1</button>
        <button className="page-btn" aria-label="Page 2">2</button>
        <button className="page-btn" aria-label="Page 3">3</button>
        <button className="page-btn" aria-label="Next page">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

    </section>
  )
}

export default Univerlar
