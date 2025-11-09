/* Cosmic Calendar Data */
const cosmicEvents = [
    // Січень (January)
    {
        date: "01-01",
        time: "00:00",
        title: "Великий вибух",
        titleEn: "Big Bang",
        description: "Початок Всесвіту. Виникнення простору, часу, матерії та енергії.",
        category: "universe",
        importance: "critical"
    },
    {
        date: "01-10",
        time: "00:00",
        title: "Формування перших галактик",
        titleEn: "First Galaxies Form",
        description: "Перші галактики почали формуватися з хмар газу та темної матерії.",
        category: "galaxies",
        importance: "high"
    },
    {
        date: "01-22",
        time: "00:00",
        title: "Формування Чумацького Шляху",
        titleEn: "Milky Way Forms",
        description: "Наша галактика почала формуватися близько 13.2 мільярдів років тому.",
        category: "galaxies",
        importance: "high"
    },
    
    // Березень-Серпень (March-August)
    {
        date: "03-15",
        time: "00:00",
        title: "Найстаріші відомі зірки",
        titleEn: "Oldest Known Stars",
        description: "Формування найстаріших зірок у нашій галактиці.",
        category: "galaxies",
        importance: "medium"
    },
    
    // Вересень (September)
    {
        date: "09-02",
        time: "00:00",
        title: "Формування Сонячної системи",
        titleEn: "Solar System Forms",
        description: "Наше Сонце та планети почали формуватися з протопланетного диску.",
        category: "solar",
        importance: "critical"
    },
    {
        date: "09-06",
        time: "00:00",
        title: "Формування Землі",
        titleEn: "Earth Forms",
        description: "Планета Земля сформувалася приблизно 4.54 мільярдів років тому.",
        category: "solar",
        importance: "critical"
    },
    {
        date: "09-14",
        time: "00:00",
        title: "Найдавніші породи на Землі",
        titleEn: "Oldest Rocks on Earth",
        description: "Формування найдавніших відомих гірських порід.",
        category: "solar",
        importance: "medium"
    },
    {
        date: "09-21",
        time: "00:00",
        title: "Перші ознаки життя",
        titleEn: "First Signs of Life",
        description: "Поява перших одноклітинних організмів на Землі.",
        category: "life",
        importance: "critical"
    },
    
    // Жовтень (October)
    {
        date: "10-09",
        time: "00:00",
        title: "Киснева катастрофа",
        titleEn: "Great Oxygenation Event",
        description: "Ціанобактерії почали виробляти кисень, змінюючи атмосферу Землі.",
        category: "life",
        importance: "high"
    },
    
    // Листопад (November)
    {
        date: "11-09",
        time: "00:00",
        title: "Сучасна атмосфера",
        titleEn: "Modern Atmosphere",
        description: "Атмосфера Землі набула сучасного складу.",
        category: "life",
        importance: "medium"
    },
    
    // Грудень (December)
    {
        date: "12-01",
        time: "00:00",
        title: "Перші багатоклітинні організми",
        titleEn: "First Multicellular Life",
        description: "Поява перших багатоклітинних організмів.",
        category: "life",
        importance: "high"
    },
    {
        date: "12-05",
        time: "00:00",
        title: "Камбрійський вибух",
        titleEn: "Cambrian Explosion",
        description: "Швидка диверсифікація життя. Поява більшості основних груп тварин.",
        category: "evolution",
        importance: "high"
    },
    {
        date: "12-15",
        time: "00:00",
        title: "Вихід на сушу",
        titleEn: "Life Moves to Land",
        description: "Перші рослини і тварини виходять на сушу.",
        category: "evolution",
        importance: "high"
    },
    {
        date: "12-23",
        time: "00:00",
        title: "Перші динозаври",
        titleEn: "First Dinosaurs",
        description: "Поява перших динозаврів у Тріасовому періоді.",
        category: "evolution",
        importance: "high"
    },
    {
        date: "12-26",
        time: "00:00",
        title: "Вимирання динозаврів",
        titleEn: "Dinosaur Extinction",
        description: "Падіння астероїда призвело до вимирання динозаврів 65 млн років тому.",
        category: "evolution",
        importance: "high"
    },
    {
        date: "12-27",
        time: "00:00",
        title: "Розквіт ссавців",
        titleEn: "Rise of Mammals",
        description: "Ссавці стають домінуючою групою тварин після вимирання динозаврів.",
        category: "evolution",
        importance: "medium"
    },
    {
        date: "12-31",
        time: "13:30",
        title: "Перші гомініди",
        titleEn: "First Hominids",
        description: "Поява перших людиноподібних приматів.",
        category: "humanity",
        importance: "high"
    },
    {
        date: "12-31",
        time: "22:24",
        title: "Homo sapiens",
        titleEn: "Homo sapiens",
        description: "Поява сучасної людини приблизно 300,000 років тому.",
        category: "humanity",
        importance: "critical"
    },
    {
        date: "12-31",
        time: "23:44",
        title: "Перша цивілізація",
        titleEn: "First Civilization",
        description: "Виникнення перших цивілізацій в Месопотамії.",
        category: "humanity",
        importance: "high"
    },
    {
        date: "12-31",
        time: "23:52",
        title: "Давня Греція",
        titleEn: "Ancient Greece",
        description: "Розквіт давньогрецької цивілізації.",
        category: "humanity",
        importance: "medium"
    },
    {
        date: "12-31",
        time: "23:59:46",
        title: "Відкриття Америки",
        titleEn: "Discovery of America",
        description: "Христофор Колумб досягає Америки.",
        category: "humanity",
        importance: "medium"
    },
    {
        date: "12-31",
        time: "23:59:50",
        title: "Промислова революція",
        titleEn: "Industrial Revolution",
        description: "Початок індустріалізації та технологічного прогресу.",
        category: "humanity",
        importance: "medium"
    },
    {
        date: "12-31",
        time: "23:59:59",
        title: "Сьогодення",
        titleEn: "Present Day",
        description: "Сучасний період людської історії.",
        category: "humanity",
        importance: "critical"
    }
];

// Category colors
const categoryColors = {
    universe: "#ff6b6b",
    galaxies: "#4ecdc4",
    solar: "#45b7d1",
    life: "#96ceb4",
    evolution: "#ffeaa7",
    humanity: "#fd79a8"
};

// Months in Ukrainian
const monthsUA = [
    "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
    "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"
];
