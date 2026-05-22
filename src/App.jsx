import { useState, useEffect, useRef } from 'react'
import VanillaTilt from 'vanilla-tilt'
import Univerlar from './components/univerlar/univerlar'
import { useAuth } from './hooks/useAuth'
import './App.scss'
import logo from './assets/logo.png'

// Shared dictionary translations for Navbar, Landing Page, and Footer
const appTranslations = {
  uz: {
    navHome: 'Bosh sahifa',
    navUniversities: 'Universitetlar',
    navSimulator: 'Simulyator',
    navAiMatch: 'AI Match',
    navCareer: 'Karyera',
    navForum: 'Forum',
    loginBtn: 'Kirish / Ro\'yxatdan o\'tish',
    
    // Auth screens UZ
    welcomeBack: 'Xush Kelibsiz',
    diveBackIn: 'Davom etish uchun ma\'lumotlaringizni kiriting.',
    emailOrUsername: 'EMAIL / FOYDALANUVCHI NOMI',
    passwordLabel: 'PAROL',
    forgotPassword: 'Parolni unutdingizmi?',
    signInBtn: 'Tizimga kirish',
    signUpBtn: 'Ro\'yxatdan o\'tish',
    orDivider: 'YOKI',
    continueWithGoogle: 'Google orqali kirish',
    dontHaveAccount: 'Akkauntingiz yo\'qmi?',
    createAccount: 'Akkaunt Yaratish',
    joinScholars: 'Elita talabalar va professionallar tarmog\'iga qo\'shiling.',
    firstNameLabel: 'ISM',
    firstNamePlaceholder: 'Ismingizni kiriting',
    lastNameLabel: 'FAMILIYA',
    lastNamePlaceholder: 'Familiyangizni kiriting',
    emailAddressLabel: 'ELEKTRON POCHTA MANZILI',
    emailAddressPlaceholder: 'name@university.edu',
    phoneNumberLabel: 'TELEFON RAQAMI',
    phoneNumberPlaceholder: '+998 (90) 123-45-67',
    confirmPasswordLabel: 'PAROLNI TASDIQLASH',
    signUpWithGoogle: 'Google orqali ro\'yxatdan o\'tish',
    alreadyHaveAccount: 'Akkauntingiz bormi?',
    
    // Landing page UZ
    tag: '⚡ Kelasi Avlod Ta\'lim Intellekti',
    heroTitlePart1: 'Universitet sari yo\'lingiz, ',
    heroTitlePart2: 'AI ko\'rsatgichida.',
    heroSubtitle: 'DTM natijalari asosida ideal yo\'nalishlarni tanlang va bizning mukammal simulyatorimiz yordamida imtihonlarni oson topshiring.',
    startAiBtn: 'AI Matchni Boshlash',
    takeMockBtn: 'Imtihon topshirish',
    stopMockBtn: 'Simulyatorni To\'xtatish',
    statusActive: '🔴 Imtihon Faol',
    statusStandby: '🟢 Simulyator Tayyor',
    performancePortal: 'Akademik Natijalar Portali',
    dtmHistory: 'Simulyatsiya qilingan DTM Ball Tarixi',
    matchProb: 'AI Moslik Ehtimoli',
    tipText: 'Maslahat: Boshqa oliygohlar uchun hisoblashni ishga tushirish uchun yuqoridagi **AI Matchni Boshlash** tugmasini bosing!',
    uniSelected: 'Oliygoh',
    
    activeStudents: 'Faol Talabalar',
    partnerUnis: 'Hamkor Universitetlar',
    mockTests: 'Topshirilgan Imtihonlar',
    
    precisionTitle: 'Muvaffaqiyat Uchun Aniq Asboblar',
    precisionSubtitle: 'O\'z akademik kelajagingizga ishonch bilan qadam qo\'yishingiz uchun kerakli barcha narsalar.',
    
    tool1Title: 'Universitetlar Ma\'lumotlar Bazasi',
    tool1Desc: 'Nufuzli universitetlarning batafsil reytinglari, kirish talablari va kampus ma\'lumotlaridan foydalaning.',
    tool2Title: 'DTM Simulyatori',
    tool2Desc: 'O\'tgan ballar asosida moslashtirilgan imtihon tizimimiz bilan haqiqiy imtihon muhitini his eting.',
    tool3Title: 'AI Match',
    tool3Desc: 'Bizning maxsus algoritmimiz mamlakatdagi har bir yo\'nalish uchun muvaffaqiyat ehtimolini hisoblaydi.',
    tool4Title: 'Shaxsiy Dashboard',
    tool4Desc: 'Natijalaringiz, imtihon ballaringiz va universitet hujjatlaringizni bir joyda kuzatib boring.',
    tool5Title: 'Karyera Yo\'nalishi',
    tool5Desc: 'Tanlagan yo\'nalishingizni real mehnat bozori talabi va uzoq muddatli karyera muvaffaqiyati bilan bog\'lang.',
    tool6Title: 'Jamiyat Forumi',
    tool6Desc: 'Maslahatlar, manbalar va imtihon strategiyalari bilan o\'rtoqlashadigan minglab talabalar tarmog\'iga qo\'shiling.',

    visionTag: 'Bizning Qarashimiz',
    visionTitle: 'Ma\'lumotlarga asoslangan tahlillar bilan ',
    visionTitleGlow: 'elita ta\'limini ommaviylashtirish.',
    visionDesc: '"Biz har bir talaba o\'z kelajagiga aniq yo\'lga ega bo\'lishiga ishonamiz. Sun\'iy intellektni keng qamrovli akademik ma\'lumotlar bilan birlashtirib, taxminlarga chek qo\'yamiz."',
    
    footerDesc: 'Kelajak yetakchilarini ilg\'or akademik tahlillar va sun\'iy intellekt orqali qo\'llab-quvvatlaymiz.',
    navHeader: 'Navigatsiya',
    supportHeader: 'Yordam',
    privacy: 'Maxfiylik Siyosati',
    terms: 'Foydalanish Shartlari',
    help: 'Yordam Markazi',
    contact: 'Biz Bilan Aloqa',
    allRightsReserved: 'DTM Elite Universitet Platformasi. Barcha huquqlar himoyalangan.'
  },
  en: {
    navHome: 'Home',
    navUniversities: 'Universities',
    navSimulator: 'Simulator',
    navAiMatch: 'AI Match',
    navCareer: 'Career',
    navForum: 'Forum',
    loginBtn: 'Login / Register',
    
    // Auth screens EN
    welcomeBack: 'Welcome Back',
    diveBackIn: 'Enter your credentials to dive back in.',
    emailOrUsername: 'EMAIL / USERNAME',
    passwordLabel: 'PASSWORD',
    forgotPassword: 'Forgot Password?',
    signInBtn: 'Sign In',
    signUpBtn: 'Sign Up',
    orDivider: 'OR',
    continueWithGoogle: 'Continue with Google',
    dontHaveAccount: 'Don\'t have an account?',
    createAccount: 'Create Your Account',
    joinScholars: 'Join the elite global network of scholars and professionals.',
    firstNameLabel: 'FIRST NAME',
    firstNamePlaceholder: 'Enter your first name',
    lastNameLabel: 'LAST NAME',
    lastNamePlaceholder: 'Enter your last name',
    emailAddressLabel: 'EMAIL ADDRESS',
    emailAddressPlaceholder: 'name@university.edu',
    phoneNumberLabel: 'PHONE NUMBER',
    phoneNumberPlaceholder: '+1 (555) 000-0000',
    confirmPasswordLabel: 'CONFIRM PASSWORD',
    signUpWithGoogle: 'Sign Up with Google',
    alreadyHaveAccount: 'Already have an account?',
    
    tag: '⚡ Next-Gen Education Intelligence',
    heroTitlePart1: 'Your Path to University, ',
    heroTitlePart2: 'Guided by AI.',
    heroSubtitle: 'Match with your ideal faculty based on DTM results and master your exams with our premium university simulator.',
    startAiBtn: 'Start AI Match',
    takeMockBtn: 'Take Mock Exam',
    stopMockBtn: 'Stop Simulator',
    statusActive: '🔴 Mock Exam Live',
    statusStandby: '🟢 Simulator Standby',
    performancePortal: 'Academic Performance Portal',
    dtmHistory: 'Simulated DTM Score History',
    matchProb: 'AI Match Probability',
    tipText: 'Tip: Click **Start AI Match** above to dynamically run calculations on other universities!',
    uniSelected: 'Uni',
    
    activeStudents: 'Active Students',
    partnerUnis: 'Partner Universities',
    mockTests: 'Mock Tests Taken',
    
    precisionTitle: 'Precision Tools for Success',
    precisionSubtitle: 'Everything you need to navigate your academic future with confidence.',
    
    tool1Title: 'University Database',
    tool1Desc: 'Access comprehensive rankings, admission requirements, and campus details for top-tier institutions.',
    tool2Title: 'DTM Simulator',
    tool2Desc: 'Experience the actual test environment with our adaptive exam engine powered by past results.',
    tool3Title: 'AI Match',
    tool3Desc: 'Our proprietary algorithm calculates your success probability for every faculty in the country.',
    tool4Title: 'Personal Dashboard',
    tool4Desc: 'Track your progress, monitor test scores, and manage your university applications in one place.',
    tool5Title: 'Career Guidance',
    tool5Desc: 'Connect your choice of study with real-world market demand and long-term professional success.',
    tool6Title: 'Community Forum',
    tool6Desc: 'Join a network of thousands of students sharing advice, resources, and exam strategies.',

    visionTag: 'Our Vision',
    visionTitle: 'Democratizing elite education access through ',
    visionTitleGlow: 'data-driven insights.',
    visionDesc: '"We believe that every student deserves a clear path to their future. By combining advanced AI with comprehensive academic data, we remove the guesswork from university applications."',
    
    footerDesc: 'Empowering future leaders through advanced academic insights and AI integration.',
    navHeader: 'Navigation',
    supportHeader: 'Support',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    help: 'Help Center',
    contact: 'Contact Us',
    allRightsReserved: 'DTM Elite University Platform. All Rights Reserved.'
  },
  ru: {
    navHome: 'Главная',
    navUniversities: 'Университеты',
    navSimulator: 'Симулятор',
    navAiMatch: 'AI Match',
    navCareer: 'Карьера',
    navForum: 'Форум',
    loginBtn: 'Войти / Регистрация',
    
    // Auth screens RU
    welcomeBack: 'С возвращением',
    diveBackIn: 'Введите свои данные для входа.',
    emailOrUsername: 'EMAIL / ИМЯ ПОЛЬЗОВАТЕЛЯ',
    passwordLabel: 'ПАРОЛЬ',
    forgotPassword: 'Забыли пароль?',
    signInBtn: 'Войти',
    signUpBtn: 'Зарегистрироваться',
    orDivider: 'ИЛИ',
    continueWithGoogle: 'Войти через Google',
    dontHaveAccount: 'Нет аккаунта?',
    createAccount: 'Создайте аккаунт',
    joinScholars: 'Присоединяйтесь к элитной глобальной сети ученых и профессионалов.',
    firstNameLabel: 'ИМЯ',
    firstNamePlaceholder: 'Введите ваше имя',
    lastNameLabel: 'ФАМИЛИЯ',
    lastNamePlaceholder: 'Введите вашу фамилию',
    emailAddressLabel: 'ЭЛЕКТРОННАЯ ПОЧТА',
    emailAddressPlaceholder: 'name@university.edu',
    phoneNumberLabel: 'НОМЕР ТЕЛЕФОНА',
    phoneNumberPlaceholder: '+7 (900) 123-45-67',
    confirmPasswordLabel: 'ПОДТВЕРДИТЕ ПАРОЛЬ',
    signUpWithGoogle: 'Зарегистрироваться через Google',
    alreadyHaveAccount: 'Уже есть аккаунт?',
    
    tag: '⚡ Интеллект образования нового поколения',
    heroTitlePart1: 'Ваш путь в университет ',
    heroTitlePart2: 'под руководством ИИ.',
    heroSubtitle: 'Подберите идеальный факультет на основе результатов DTM и сдайте экзамены с помощью нашего премиального симулятора.',
    startAiBtn: 'Запустить AI Match',
    takeMockBtn: 'Пройти экзамен',
    stopMockBtn: 'Остановить симулятор',
    statusActive: '🔴 Экзамен запущен',
    statusStandby: '🟢 Симулятор готов',
    performancePortal: 'Портал академической успеваемости',
    dtmHistory: 'История баллов симуляции DTM',
    matchProb: 'Вероятность подбора ИИ',
    tipText: 'Совет: Нажмите **Запустить AI Match** выше для симуляции расчетов по другим вузам!',
    uniSelected: 'Вуз',
    
    activeStudents: 'Активные студенты',
    partnerUnis: 'Вузы-партнеры',
    mockTests: 'Сдано экзаменов',
    
    precisionTitle: 'Инструменты высокой точности',
    precisionSubtitle: 'Все, что вам нужно для уверенного построения своего академического будущего.',
    
    tool1Title: 'База данных университетов',
    tool1Desc: 'Получите доступ к полным рейтингам, вступительным требованиям и информации о кампусах ведущих вузов.',
    tool2Title: 'Симулятор DTM',
    tool2Desc: 'Испытайте реальную атмосферу тестирования с адаптивным экзаменационным движком на основе прошлых результатов.',
    tool3Title: 'AI Match',
    tool3Desc: 'Наш запатентованный алгоритм рассчитывает вероятность вашего успеха на каждом факультете страны.',
    tool4Title: 'Личный кабинет',
    tool4Desc: 'Отслеживайте свой прогресс, баллы за экзамены и управляйте заявлениями в вузы в одном месте.',
    tool5Title: 'Профориентация',
    tool5Desc: 'Свяжите выбранное направление со спросом на рынке труда и долгосрочным профессиональным успехом.',
    tool6Title: 'Форум сообщества',
    tool6Desc: 'Присоединяйтесь к сети из тысяч студентов, делящихся советами, ресурсами и стратегиями сдачи экзаменов.',

    visionTag: 'Наше видение',
    visionTitle: 'Демократизация элитного образования с помощью ',
    visionTitleGlow: 'аналитики данных.',
    visionDesc: '"Мы верим, что каждый студент заслуживает ясного пути к своему будущему. Сочетая передовой ИИ со всесторонними данными, мы исключаем неопределенность."',
    
    footerDesc: 'Расширение возможностей будущих лидеров посредством передового академического анализа и ИИ.',
    navHeader: 'Навигация',
    supportHeader: 'Поддержка',
    privacy: 'Политика конфиденциальности',
    terms: 'Условия использования',
    help: 'Центр поддержки',
    contact: 'Контакты',
    allRightsReserved: 'Университетская платформа DTM Elite. Все права защищены.'
  }
}

function App() {
  const [currentLanguage, setCurrentLanguage] = useState('uz')
  const [currentPage, setCurrentPage] = useState('home') // Default to 'home' as requested by the user
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)

  // Auth screen interactive states
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  
  const [registerFirstName, setRegisterFirstName] = useState('')
  const [registerLastName, setRegisterLastName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPhone, setRegisterPhone] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('')

  const [userDropdownOpen, setUserDropdownOpen] = useState(false)

  const {
    user,
    isLoading,
    authError,
    authSuccess,
    login,
    register: registerApi,
    logout,
    clearMessages
  } = useAuth()

  // Simulation variables for landing page
  const [examRunning, setExamRunning] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(180)
  const [simulatedScore, setSimulatedScore] = useState(148.5)
  const [selectedUniversity, setSelectedUniversity] = useState('National University')
  const [aiMatchProbability, setAiMatchProbability] = useState(84)

  const tiltRef = useRef(null)
  const langSelectorRef = useRef(null)
  const userSelectorRef = useRef(null)
  const activeText = appTranslations[currentLanguage] || appTranslations.uz

  // Clear authentication messages on page transitions
  useEffect(() => {
    clearMessages();
  }, [currentPage]);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (langSelectorRef.current && !langSelectorRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
      if (userSelectorRef.current && !userSelectorRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Initialize Tilt inside useEffect for home page card
  useEffect(() => {
    const tiltElement = tiltRef.current
    if (currentPage === 'home' && tiltElement) {
      VanillaTilt.init(tiltElement, {
        max: 6,
        speed: 300,
        glare: true,
        'max-glare': 0.25,
        scale: 1.02,
        gyroscope: true
      })
    }
    return () => {
      if (tiltElement && tiltElement.vanillaTilt) {
        tiltElement.vanillaTilt.destroy()
      }
    }
  }, [currentPage])

  // Simulator ticking logic
  useEffect(() => {
    let interval = null
    if (examRunning && currentPage === 'home') {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setExamRunning(false)
            return 180
          }
          return prev - 1
        })
        setSimulatedScore((prev) => {
          const delta = (Math.random() - 0.48) * 2
          const nextScore = prev + delta
          return Math.min(189, Math.max(50, parseFloat(nextScore.toFixed(1))))
        })
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [examRunning, currentPage])

  const handleStartAIMatch = () => {
    const universities = [
      'National University of Uzbekistan',
      'Tashkent State Technical University',
      'Tashkent University of Information Technologies',
      'Westminster International University',
      'Inha University in Tashkent'
    ]
    const randomUni = universities[Math.floor(Math.random() * universities.length)]
    setSelectedUniversity(randomUni)
    
    const targetProb = Math.floor(Math.random() * 36) + 60
    let currentProb = 30
    const timer = setInterval(() => {
      currentProb += 5
      if (currentProb >= targetProb) {
        setAiMatchProbability(targetProb)
        clearInterval(timer)
      } else {
        setAiMatchProbability(currentProb)
      }
    }, 30)
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const result = await login(loginEmail, loginPassword);
    if (result.success) {
      setLoginEmail('');
      setLoginPassword('');
      setCurrentPage('home');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const result = await registerApi({
      email: registerEmail,
      firstName: registerFirstName,
      lastName: registerLastName,
      phoneNumber: registerPhone,
      password: registerPassword,
      passwordConfirm: registerConfirmPassword
    });
    if (result.success) {
      setRegisterFirstName('');
      setRegisterLastName('');
      setRegisterEmail('');
      setRegisterPhone('');
      setRegisterPassword('');
      setRegisterConfirmPassword('');
      setCurrentPage('home');
    }
  };

  const formatTime = (minutes) => {
    const hrs = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
  }

  const handleNavSimulator = (e) => {
    if (e) e.preventDefault()
    setCurrentPage('home')
    setTimeout(() => {
      const el = document.getElementById('simulator')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 100)
  }

  const handleNavAiMatch = (e) => {
    if (e) e.preventDefault()
    setCurrentPage('home')
    handleStartAIMatch()
    setTimeout(() => {
      const el = document.getElementById('simulator')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 100)
  }

  const languageFlags = {
    uz: '🇺🇿',
    en: '🇬🇧',
    ru: '🇷🇺'
  }

  const languageLabels = {
    uz: "O'zbekcha",
    en: 'English',
    ru: 'Русский'
  }

  return (
    <>
      {/* Dynamic water background elements */}
      <div className="caustics-wrapper" aria-hidden="true">
        <div className="orb-1"></div>
        <div className="orb-2"></div>
      </div>

      {/* Navigation Header */}
      <header className="navbar">
        <div className="logo" onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          {/* <div className="logo-dot"></div> */}
          <img src={logo} alt="Logo" />
          <span>UniGuide</span>
        </div>

        <nav>
          <ul className="nav-links">
            <li>
              <a 
                href="#home" 
                className={currentPage === 'home' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                {activeText.navHome}
              </a>
            </li>
            <li>
              <a 
                href="#universities" 
                className={currentPage === 'universities' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); setCurrentPage('universities'); }}
              >
                {activeText.navUniversities}
              </a>
            </li>
            <li>
              <a 
                href="#simulator" 
                onClick={handleNavSimulator}
              >
                {activeText.navSimulator}
              </a>
            </li>
            <li>
              <a 
                href="#ai-match" 
                onClick={handleNavAiMatch}
              >
                {activeText.navAiMatch}
              </a>
            </li>
            <li><a href="#career" onClick={(e) => e.preventDefault()}>{activeText.navCareer}</a></li>
            <li><a href="#forum" onClick={(e) => e.preventDefault()}>{activeText.navForum}</a></li>
          </ul>
        </nav>

        {/* Customized Right Side Navbar: Language dropdown & Login button */}
        <div className="nav-actions" style={{ gap: '12px' }}>
          
          {/* Glassmorphic Language Selector */}
          <div className="lang-dropdown-wrapper" ref={langSelectorRef} style={{ position: 'relative' }}>
            <button 
              className="dashboard-btn" 
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: '96px', justifyContent: 'center' }}
              aria-label="Select Language"
            >
              <span>{languageFlags[currentLanguage]}</span>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>{languageLabels[currentLanguage]}</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ transform: langDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {langDropdownOpen && (
              <ul style={{
                position: 'absolute',
                top: '44px',
                right: '0',
                listStyle: 'none',
                padding: '6px',
                margin: '0',
                background: 'rgba(15, 76, 117, 0.85)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(187, 225, 250, 0.2)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                zIndex: '200',
                width: '130px',
                boxShadow: '0 8px 32px rgba(15, 76, 117, 0.4)'
              }}>
                {Object.keys(languageFlags).map((l) => (
                  <li key={l}>
                    <button
                      onClick={() => {
                        setCurrentLanguage(l);
                        setLangDropdownOpen(false);
                      }}
                      style={{
                        width: '100%',
                        background: currentLanguage === l ? 'rgba(187, 225, 250, 0.15)' : 'none',
                        border: 'none',
                        borderRadius: 'var(--radius-default)',
                        padding: '8px 10px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        color: '#fff',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'background 0.2s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = 'rgba(187, 225, 250, 0.25)'}
                      onMouseOut={(e) => e.currentTarget.style.background = currentLanguage === l ? 'rgba(187, 225, 250, 0.15)' : 'none'}
                    >
                      <span>{languageFlags[l]}</span>
                      <span>{languageLabels[l]}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Login / Register CTA or User Dropdown */}
          {user ? (
            <div className="user-profile-menu-wrapper" ref={userSelectorRef} style={{ position: 'relative' }}>
              <button 
                className="dashboard-btn" 
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  background: 'rgba(187, 225, 250, 0.12)',
                  color: '#fff',
                  borderColor: 'rgba(187, 225, 250, 0.25)',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-default)'
                }}
                aria-label="User Profile"
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  background: 'linear-gradient(135deg, #bbe1fa, #3282b8)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#0f1014'
                }}>
                  {user.first_name ? `${user.first_name[0]}${user.last_name ? user.last_name[0] : ''}`.toUpperCase() : user.email[0].toUpperCase()}
                </div>
                <span style={{ fontSize: '11.5px', fontWeight: 700 }}>
                  {user.first_name ? `${user.first_name} ${user.last_name ? user.last_name[0] + '.' : ''}` : user.email.split('@')[0]}
                </span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ transform: userDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              {userDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '44px',
                  right: '0',
                  background: 'rgba(15, 76, 117, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(187, 225, 250, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  zIndex: '200',
                  width: '220px',
                  boxShadow: '0 8px 32px rgba(15, 76, 117, 0.4)',
                  padding: '12px'
                }}>
                  <div style={{ borderBottom: '1px solid rgba(187, 225, 250, 0.15)', paddingBottom: '8px', marginBottom: '8px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>
                      {user.first_name ? `${user.first_name} ${user.last_name}` : ''}
                    </div>
                    <div style={{ fontSize: '10px', color: 'rgba(187, 225, 250, 0.7)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {user.email}
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', color: '#bbe1fa', marginBottom: '10px' }}>
                    <span>Balans:</span>
                    <span style={{ fontWeight: 800 }}>{user.balance || '0.00'} USD</span>
                  </div>

                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                      setCurrentPage('home');
                    }}
                    style={{
                      width: '100%',
                      background: 'rgba(234, 67, 53, 0.2)',
                      border: '1px solid rgba(234, 67, 53, 0.3)',
                      borderRadius: 'var(--radius-default)',
                      padding: '8px',
                      cursor: 'pointer',
                      color: '#ff8a80',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      textAlign: 'center',
                      transition: 'background 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(234, 67, 53, 0.35)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(234, 67, 53, 0.2)'}
                  >
                    Tizimdan chiqish
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              className="dashboard-btn" 
              onClick={() => setCurrentPage('login')}
              style={{ 
                background: currentPage === 'login' || currentPage === 'register' ? '#fff' : 'rgba(187, 225, 250, 0.95)', 
                color: '#0f1014', 
                borderColor: '#fff',
                fontSize: '12px',
                fontWeight: 800,
                padding: '8px 20px',
                boxShadow: currentPage === 'login' || currentPage === 'register' ? '0 0 15px rgba(255, 255, 255, 0.3)' : 'none'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.3)';
              }}
              onMouseOut={(e) => {
                if (currentPage !== 'login' && currentPage !== 'register') {
                  e.currentTarget.style.background = 'rgba(187, 225, 250, 0.95)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
              aria-label="Login or Register"
            >
              {activeText.loginBtn}
            </button>
          )}
        </div>
      </header>

      <main className="app-container">
        {currentPage === 'universities' ? (
          /* Render localized Universities listing view */
          <Univerlar lang={currentLanguage} />
        ) : currentPage === 'login' ? (
          /* Render Glassmorphic Login Card */
          <div className="auth-container">
            <div className="auth-card">
              <div className="auth-header">
                <h2>{activeText.welcomeBack}</h2>
                <p className="auth-subtitle">{activeText.diveBackIn}</p>
              </div>

              <form onSubmit={handleLoginSubmit} className="auth-form">
                {authError && (
                  <div className="auth-alert error">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <span>{authError}</span>
                  </div>
                )}
                {authSuccess && (
                  <div className="auth-alert success">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span>{authSuccess}</span>
                  </div>
                )}

                <div className="input-group">
                  <label>{activeText.emailOrUsername}</label>
                  <div className="input-wrapper">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="input-icon">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <input 
                      type="text" 
                      value={loginEmail} 
                      onChange={(e) => setLoginEmail(e.target.value)} 
                      placeholder="name@university.edu"
                      required
                    />
                  </div>
                </div>

                <div className="input-group">
                  <div className="label-wrapper">
                    <label>{activeText.passwordLabel}</label>
                    <a href="#forgot" className="forgot-link" onClick={(e) => e.preventDefault()}>{activeText.forgotPassword}</a>
                  </div>
                  <div className="input-wrapper">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="input-icon">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      value={loginPassword} 
                      onChange={(e) => setLoginPassword(e.target.value)} 
                      placeholder="••••••••"
                      required
                    />
                    <button 
                      type="button" 
                      className="pwd-toggle" 
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn-auth-primary btn-signin" disabled={isLoading}>
                  {isLoading ? 'Kirish...' : activeText.signInBtn}
                </button>

                <div className="divider-or">
                  <span>{activeText.orDivider}</span>
                </div>

                <button type="button" className="btn-auth-google">
                  <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                  </svg>
                  <span>{activeText.continueWithGoogle}</span>
                </button>
              </form>

              <p className="auth-footer">
                {activeText.dontHaveAccount}{' '}
                <span onClick={() => setCurrentPage('register')}>{activeText.signUpBtn}</span>
              </p>
            </div>
          </div>
        ) : currentPage === 'register' ? (
          /* Render Glassmorphic Register Card */
          <div className="auth-container">
            <div className="auth-card">
              <div className="auth-header">
                <h2>{activeText.createAccount}</h2>
                <p className="auth-subtitle">{activeText.joinScholars}</p>
              </div>

              <form onSubmit={handleRegisterSubmit} className="auth-form">
                {authError && (
                  <div className="auth-alert error">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <span>{authError}</span>
                  </div>
                )}
                {authSuccess && (
                  <div className="auth-alert success">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span>{authSuccess}</span>
                  </div>
                )}

                <div className="input-row-2col">
                  <div className="input-group">
                    <label>{activeText.firstNameLabel}</label>
                    <div className="input-wrapper">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="input-icon">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <input 
                        type="text" 
                        value={registerFirstName} 
                        onChange={(e) => setRegisterFirstName(e.target.value)} 
                        placeholder={activeText.firstNamePlaceholder}
                        required
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>{activeText.lastNameLabel}</label>
                    <div className="input-wrapper">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="input-icon">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <input 
                        type="text" 
                        value={registerLastName} 
                        onChange={(e) => setRegisterLastName(e.target.value)} 
                        placeholder={activeText.lastNamePlaceholder}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="input-group">
                  <label>{activeText.emailAddressLabel}</label>
                  <div className="input-wrapper">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="input-icon">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <input 
                      type="email" 
                      value={registerEmail} 
                      onChange={(e) => setRegisterEmail(e.target.value)} 
                      placeholder="name@university.edu"
                      required
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>{activeText.phoneNumberLabel}</label>
                  <div className="input-wrapper">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="input-icon">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <input 
                      type="tel" 
                      value={registerPhone} 
                      onChange={(e) => setRegisterPhone(e.target.value)} 
                      placeholder={activeText.phoneNumberPlaceholder}
                      required
                    />
                  </div>
                </div>

                <div className="input-row-2col">
                  <div className="input-group">
                    <label>{activeText.passwordLabel}</label>
                    <div className="input-wrapper">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="input-icon">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      <input 
                        type={showPassword ? 'text' : 'password'} 
                        value={registerPassword} 
                        onChange={(e) => setRegisterPassword(e.target.value)} 
                        placeholder="••••••••"
                        required
                      />
                      <button 
                        type="button" 
                        className="pwd-toggle" 
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="input-group">
                    <label>{activeText.confirmPasswordLabel}</label>
                    <div className="input-wrapper">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="input-icon">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      <input 
                        type={showConfirmPassword ? 'text' : 'password'} 
                        value={registerConfirmPassword} 
                        onChange={(e) => setRegisterConfirmPassword(e.target.value)} 
                        placeholder="••••••••"
                        required
                      />
                      <button 
                        type="button" 
                        className="pwd-toggle" 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      >
                        {showConfirmPassword ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn-auth-primary btn-signup" disabled={isLoading}>
                  {isLoading ? 'Yaratilmoqda...' : activeText.signUpBtn}
                </button>

                <div className="divider-or">
                  <span>{activeText.orDivider}</span>
                </div>

                <button type="button" className="btn-auth-google">
                  <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                  </svg>
                  <span>{activeText.signUpWithGoogle}</span>
                </button>
              </form>

              <p className="auth-footer">
                {activeText.alreadyHaveAccount}{' '}
                <span onClick={() => setCurrentPage('login')}>{activeText.signInBtn}</span>
              </p>
            </div>
          </div>
        ) : (
          /* Render customized Landing Page view */
          <>
            <section className="hero-section">
              <div className="intelligence-pill">
                <span>{activeText.tag}</span>
              </div>

              <h1 className="display-title">
                {activeText.heroTitlePart1}<br />
                <span className="glow-text">{activeText.heroTitlePart2}</span>
              </h1>

              <p className="subtitle">
                {activeText.heroSubtitle}
              </p>

              <div className="cta-group">
                <button className="btn-primary" onClick={handleStartAIMatch} aria-label="Start matching process">
                  <span>{activeText.startAiBtn}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </button>
                
                <button className="btn-secondary" onClick={() => setExamRunning(!examRunning)} aria-label="Toggle exam simulation">
                  <span>{examRunning ? activeText.stopMockBtn : activeText.takeMockBtn}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  </svg>
                </button>
              </div>
            </section>

            {/* 3D Tilted simulated dashboard card */}
            <section className="dashboard-container-wrap">
              <div ref={tiltRef} className="tilted-dashboard-card" id="simulator">
                <div className="dashboard-simulator">
                  
                  <div className="sim-sidebar">
                    <div className="sim-profile">
                      <div className="avatar">
                        {user 
                          ? (user.first_name ? `${user.first_name[0]}${user.last_name ? user.last_name[0] : ''}`.toUpperCase() : user.email[0].toUpperCase())
                          : 'JR'}
                      </div>
                      <div className="profile-info">
                        <span className="name">
                          {user 
                            ? `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email.split('@')[0]
                            : 'Jasur Rahimov'}
                        </span>
                        <span className="role">
                          {user 
                            ? `Joined: ${new Date(user.date_joined).toLocaleDateString(currentLanguage === 'uz' ? 'uz-UZ' : currentLanguage === 'ru' ? 'ru-RU' : 'en-US', {month: 'short', year: 'numeric'})}`
                            : 'Science Candidate'}
                        </span>
                      </div>
                    </div>

                    <ul className="sim-nav">
                      <li className="active">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
                        Dashboard
                      </li>
                      <li>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        DTM Exams
                      </li>
                      <li onClick={handleStartAIMatch}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                        AI Matching
                      </li>
                      <li>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                        Analytics
                      </li>
                    </ul>
                  </div>

                  <div className="sim-body">
                    <div className="sim-header">
                      <h3>{activeText.performancePortal}</h3>
                      <div className="tag">
                        {examRunning ? `${activeText.statusActive}: ${formatTime(timeRemaining)}` : activeText.statusStandby}
                      </div>
                    </div>

                    <div className="sim-grid">
                      <div className="sim-chart-card">
                        <div className="chart-info">
                          <span className="label">{activeText.dtmHistory}</span>
                          <span className="val">{simulatedScore} pts / 189 max</span>
                        </div>

                        <svg className="svg-chart" viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#bbe1fa" />
                              <stop offset="100%" stopColor="#3282b8" />
                            </linearGradient>
                            <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#3282b8" stopOpacity="0.3" />
                              <stop offset="100%" stopColor="#0f4c75" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <line x1="0" y1="20" x2="320" y2="20" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                          <line x1="0" y1="60" x2="320" y2="60" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                          <line x1="0" y1="100" x2="320" y2="100" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                          <path className="area" d="M 0 120 L 0 95 Q 50 60 90 70 T 170 30 T 260 55 T 320 15 L 320 120 Z" />
                          <path className="line" d="M 0 95 Q 50 60 90 70 T 170 30 T 260 55 T 320 15" />
                          <circle cx="320" cy="15" r="4" fill="#bbe1fa" />
                          <circle cx="320" cy="15" r="8" stroke="rgba(187, 225, 250, 0.4)" strokeWidth="2" fill="none" />
                        </svg>
                      </div>

                      <div className="sim-radar-card">
                        <span className="title">{activeText.matchProb}</span>
                        <div className="radial-progress">
                          <svg width="90" height="90" viewBox="0 0 100 100">
                            <circle className="circle-bg" cx="50" cy="50" r="40" />
                            <circle 
                              className="circle-progress" 
                              cx="50" 
                              cy="50" 
                              r="40" 
                              style={{
                                strokeDasharray: '251.2',
                                strokeDashoffset: `${251.2 - (251.2 * aiMatchProbability) / 100}`
                              }}
                            />
                          </svg>
                          <span className="pct">{aiMatchProbability}%</span>
                        </div>
                        <span className="match-lbl" style={{fontSize: '9px', textTransform: 'uppercase'}}>{selectedUniversity.split(' ').slice(0, 3).join(' ')}</span>
                      </div>
                    </div>

                    <div style={{
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      padding: '12px 14px', 
                      background: 'rgba(187,225,250,0.03)', 
                      border: '1px dashed rgba(187,225,250,0.1)', 
                      borderRadius: 'var(--radius-default)',
                      fontSize: '11px',
                      color: 'var(--on-surface-variant)'
                    }}>
                      <span dangerouslySetInnerHTML={{ __html: activeText.tipText }}></span>
                      <span style={{color: '#fff', fontWeight: 600}}>{activeText.uniSelected}: {selectedUniversity.split(' ').slice(0, 2).join(' ')}</span>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Metrics cards */}
            <section className="stats-section">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-val">10,000+</div>
                  <div className="stat-label">{activeText.activeStudents}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-val">80+</div>
                  <div className="stat-label">{activeText.partnerUnis}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-val">500k+</div>
                  <div className="stat-label">{activeText.mockTests}</div>
                </div>
              </div>
            </section>

            {/* Precision Tools Features list */}
            <section className="features-section" id="precision-tools">
              <div className="section-header">
                <h2>{activeText.precisionTitle}</h2>
                <p>{activeText.precisionSubtitle}</p>
              </div>

              <div className="features-grid">
                <div className="feature-card">
                  <div className="icon-container" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
                    </svg>
                  </div>
                  <h3>{activeText.tool1Title}</h3>
                  <p>{activeText.tool1Desc}</p>
                </div>

                <div className="feature-card">
                  <div className="icon-container" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="6"></circle>
                      <circle cx="12" cy="12" r="2"></circle>
                    </svg>
                  </div>
                  <h3>{activeText.tool2Title}</h3>
                  <p>{activeText.tool2Desc}</p>
                </div>

                <div className="feature-card">
                  <div className="icon-container" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                  </div>
                  <h3>{activeText.tool3Title}</h3>
                  <p>{activeText.tool3Desc}</p>
                </div>

                <div className="feature-card">
                  <div className="icon-container" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="9" y1="3" x2="9" y2="21"></line>
                      <line x1="15" y1="3" x2="15" y2="21"></line>
                      <line x1="3" y1="9" x2="21" y2="9"></line>
                      <line x1="3" y1="15" x2="21" y2="15"></line>
                    </svg>
                  </div>
                  <h3>{activeText.tool4Title}</h3>
                  <p>{activeText.tool4Desc}</p>
                </div>

                <div className="feature-card">
                  <div className="icon-container" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                    </svg>
                  </div>
                  <h3>{activeText.tool5Title}</h3>
                  <p>{activeText.tool5Desc}</p>
                </div>

                <div className="feature-card">
                  <div className="icon-container" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <h3>{activeText.tool6Title}</h3>
                  <p>{activeText.tool6Desc}</p>
                </div>
              </div>
            </section>

            {/* Vision statement */}
            <section className="vision-section">
              <div className="vision-container">
                <span className="vision-badge">{activeText.visionTag}</span>
                <h2>
                  {activeText.visionTitle}<br />
                  <span className="gradient-glow">{activeText.visionTitleGlow}</span>
                </h2>
                <p>{activeText.visionDesc}</p>
                <div className="divider-glow" aria-hidden="true"></div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Global Footer (Matches the image structure) */}
      <footer className="app-container" style={{ paddingTop: '0' }}>
        <div className="footer">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="logo">
                <div className="logo-dot"></div>
                <span>DTM Elite</span>
              </div>
              <p>{activeText.footerDesc}</p>
            </div>

            <div style={{ display: 'flex', gap: '64px', flexWrap: 'wrap' }}>
              <div>
                <h4 style={{ fontSize: '12px', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
                  {activeText.navHeader}
                </h4>
                <div className="footer-links" style={{ flexDirection: 'column', display: 'flex', gap: '10px' }}>
                  <a href="#universities" onClick={(e) => { e.preventDefault(); setCurrentPage('universities'); }}>
                    {activeText.navUniversities}
                  </a>
                  <a href="#simulator" onClick={handleNavSimulator}>
                    {activeText.navSimulator}
                  </a>
                  <a href="#ai-match" onClick={handleNavAiMatch}>
                    {activeText.navAiMatch}
                  </a>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '12px', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
                  {activeText.supportHeader}
                </h4>
                <div className="footer-links" style={{ flexDirection: 'column', display: 'flex', gap: '10px' }}>
                  <a href="#privacy">{activeText.privacy}</a>
                  <a href="#terms">{activeText.terms}</a>
                  <a href="#help">{activeText.help}</a>
                  <a href="#contact">{activeText.contact}</a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-divider" aria-hidden="true"></div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} {activeText.allRightsReserved}</span>
            <span>Made with Liquid Deep Glassmorphism</span>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
