// Cosmic Calendar Events Data with Multilingual Support
// 13.8 billion years compressed to 1 year

const COSMIC_EVENTS = [
    {
        id: 1,
        month: 1,
        day: 1,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 13800000000,
        title: {
            uk: "Великий вибух",
            en: "Big Bang"
        },
        description: {
            uk: "Початок Всесвіту. Вся матерія та енергія виникли з сингулярності. Простір і час почали існувати.",
            en: "The beginning of the Universe. All matter and energy emerged from a singularity. Space and time began to exist."
        },
        category: "universe"
    },
    {
        id: 2,
        month: 1,
        day: 2,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 13760000000,
        title: {
            uk: "Перші галактики",
            en: "First Galaxies"
        },
        description: {
            uk: "Формування перших галактик у Всесвіті. Гравітація почала збирати матерію у великі структури.",
            en: "Formation of the first galaxies in the Universe. Gravity began gathering matter into large structures."
        },
        category: "universe"
    },
    {
        id: 3,
        month: 1,
        day: 10,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 13500000000,
        title: {
            uk: "Перші зірки",
            en: "First Stars"
        },
        description: {
            uk: "Народження перших зірок у Всесвіті. Ці масивні зірки почали синтезувати важчі елементи.",
            en: "Birth of the first stars in the Universe. These massive stars began synthesizing heavier elements."
        },
        category: "universe"
    },
    {
        id: 4,
        month: 5,
        day: 1,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 10000000000,
        title: {
            uk: "Формування Чумацького Шляху",
            en: "Milky Way Formation"
        },
        description: {
            uk: "Початок формування нашої галактики - Чумацького Шляху. Процес тривав мільярди років.",
            en: "Beginning of our galaxy's formation - the Milky Way. The process lasted billions of years."
        },
        category: "galaxy"
    },
    {
        id: 5,
        month: 9,
        day: 1,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 4600000000,
        title: {
            uk: "Народження Сонця",
            en: "Birth of the Sun"
        },
        description: {
            uk: "Формування Сонця з газопилової туманності. Наша зірка почала своє існування.",
            en: "Formation of the Sun from a gas and dust nebula. Our star began its existence."
        },
        category: "solar-system"
    },
    {
        id: 6,
        month: 9,
        day: 2,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 4560000000,
        title: {
            uk: "Формування Землі",
            en: "Formation of Earth"
        },
        description: {
            uk: "Земля сформувалася з протопланетного диску навколо молодого Сонця шляхом акреції.",
            en: "Earth formed from the protoplanetary disk around the young Sun through accretion."
        },
        category: "earth"
    },
    {
        id: 7,
        month: 9,
        day: 3,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 4510000000,
        title: {
            uk: "Утворення Місяця",
            en: "Moon Formation"
        },
        description: {
            uk: "Гігантське зіткнення Землі з об'єктом розміром з Марс призвело до утворення Місяця.",
            en: "A giant collision of Earth with a Mars-sized object led to the formation of the Moon."
        },
        category: "earth"
    },
    {
        id: 8,
        month: 9,
        day: 14,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 4100000000,
        title: {
            uk: "Перше життя на Землі",
            en: "First Life on Earth"
        },
        description: {
            uk: "Виникнення перших одноклітинних організмів. Життя почалося в океанах первісної Землі.",
            en: "Emergence of the first single-celled organisms. Life began in the oceans of primordial Earth."
        },
        category: "life"
    },
    {
        id: 9,
        month: 9,
        day: 21,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 3800000000,
        title: {
            uk: "Фотосинтез",
            en: "Photosynthesis"
        },
        description: {
            uk: "Перші фотосинтезуючі організми (ціанобактерії) почали виробляти кисень, змінюючи атмосферу Землі.",
            en: "First photosynthetic organisms (cyanobacteria) began producing oxygen, changing Earth's atmosphere."
        },
        category: "life"
    },
    {
        id: 10,
        month: 12,
        day: 1,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 1200000000,
        title: {
            uk: "Складні клітини (еукаріоти)",
            en: "Complex Cells (Eukaryotes)"
        },
        description: {
            uk: "Виникнення перших еукаріотичних клітин з ядром та органелами - важливий крок в еволюції.",
            en: "Emergence of the first eukaryotic cells with nucleus and organelles - an important step in evolution."
        },
        category: "life"
    },
    {
        id: 11,
        month: 12,
        day: 5,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 1000000000,
        title: {
            uk: "Багатоклітинне життя",
            en: "Multicellular Life"
        },
        description: {
            uk: "Перші багатоклітинні організми з'явилися в океанах. Початок складної організації життя.",
            en: "First multicellular organisms appeared in the oceans. Beginning of complex life organization."
        },
        category: "life"
    },
    {
        id: 12,
        month: 12,
        day: 14,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 650000000,
        title: {
            uk: "Кембрійський вибух",
            en: "Cambrian Explosion"
        },
        description: {
            uk: "Швидка диверсифікація життя. З'явилася більшість сучасних типів тварин.",
            en: "Rapid diversification of life. Most modern animal phyla appeared."
        },
        category: "life"
    },
    {
        id: 13,
        month: 12,
        day: 19,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 475000000,
        title: {
            uk: "Рослини на суші",
            en: "Plants on Land"
        },
        description: {
            uk: "Перші рослини колонізували сушу, змінюючи ландшафт Землі назавжди.",
            en: "First plants colonized land, changing Earth's landscape forever."
        },
        category: "life"
    },
    {
        id: 14,
        month: 12,
        day: 21,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 400000000,
        title: {
            uk: "Перші комахи",
            en: "First Insects"
        },
        description: {
            uk: "З'явилися перші комахи - найуспішніша група тварин на планеті.",
            en: "First insects appeared - the most successful group of animals on the planet."
        },
        category: "life"
    },
    {
        id: 15,
        month: 12,
        day: 23,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 320000000,
        title: {
            uk: "Перші рептилії",
            en: "First Reptiles"
        },
        description: {
            uk: "Виникнення перших рептилій, які могли жити далеко від води.",
            en: "Emergence of the first reptiles that could live far from water."
        },
        category: "life"
    },
    {
        id: 16,
        month: 12,
        day: 26,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 230000000,
        title: {
            uk: "Ера динозаврів починається",
            en: "Age of Dinosaurs Begins"
        },
        description: {
            uk: "Перші динозаври з'явилися на Землі. Початок тріасового періоду.",
            en: "First dinosaurs appeared on Earth. Beginning of the Triassic period."
        },
        category: "life"
    },
    {
        id: 17,
        month: 12,
        day: 27,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 200000000,
        title: {
            uk: "Перші ссавці",
            en: "First Mammals"
        },
        description: {
            uk: "Поява перших ссавців - невеликих нічних створінь, які жили в тіні динозаврів.",
            en: "Appearance of first mammals - small nocturnal creatures living in the shadow of dinosaurs."
        },
        category: "life"
    },
    {
        id: 18,
        month: 12,
        day: 28,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 150000000,
        title: {
            uk: "Перші птахи",
            en: "First Birds"
        },
        description: {
            uk: "Птахи еволюціонували від динозаврів-тероподів. Археоптерикс - перехідна форма.",
            en: "Birds evolved from theropod dinosaurs. Archaeopteryx was a transitional form."
        },
        category: "life"
    },
    {
        id: 19,
        month: 12,
        day: 28,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 130000000,
        title: {
            uk: "Квіткові рослини",
            en: "Flowering Plants"
        },
        description: {
            uk: "Поява квіткових рослин (покритонасінних), які швидко стали домінувати на суші.",
            en: "Appearance of flowering plants (angiosperms), which quickly became dominant on land."
        },
        category: "life"
    },
    {
        id: 20,
        month: 12,
        day: 30,
        hour: 6,
        minute: 24,
        second: 0,
        yearsAgo: 66000000,
        title: {
            uk: "Вимирання динозаврів",
            en: "Dinosaur Extinction"
        },
        description: {
            uk: "Астероїд зіткнувся з Землею, спричинивши масове вимирання. Загинули динозаври та багато інших видів.",
            en: "An asteroid collided with Earth, causing mass extinction. Dinosaurs and many other species perished."
        },
        category: "extinction"
    },
    {
        id: 21,
        month: 12,
        day: 31,
        hour: 13,
        minute: 30,
        second: 0,
        yearsAgo: 15000000,
        title: {
            uk: "Перші людиноподібні мавпи",
            en: "First Great Apes"
        },
        description: {
            uk: "Виникнення перших людиноподібних мавп - предків людини та інших гомінідів.",
            en: "Emergence of the first great apes - ancestors of humans and other hominids."
        },
        category: "human"
    },
    {
        id: 22,
        month: 12,
        day: 31,
        hour: 22,
        minute: 24,
        second: 0,
        yearsAgo: 2500000,
        title: {
            uk: "Перші знаряддя праці",
            en: "First Stone Tools"
        },
        description: {
            uk: "Наші предки почали виготовляти перші кам'яні знаряддя. Початок кам'яного віку.",
            en: "Our ancestors began making the first stone tools. Beginning of the Stone Age."
        },
        category: "human"
    },
    {
        id: 23,
        month: 12,
        day: 31,
        hour: 23,
        minute: 44,
        second: 0,
        yearsAgo: 400000,
        title: {
            uk: "Приборкання вогню",
            en: "Control of Fire"
        },
        description: {
            uk: "Люди навчилися контролювати вогонь - революційний крок у розвитку цивілізації.",
            en: "Humans learned to control fire - a revolutionary step in civilization development."
        },
        category: "human"
    },
    {
        id: 24,
        month: 12,
        day: 31,
        hour: 23,
        minute: 52,
        second: 0,
        yearsAgo: 200000,
        title: {
            uk: "Homo sapiens",
            en: "Homo sapiens"
        },
        description: {
            uk: "Поява сучасної людини (Homo sapiens) в Африці. Наші безпосередні предки.",
            en: "Appearance of modern humans (Homo sapiens) in Africa. Our direct ancestors."
        },
        category: "human"
    },
    {
        id: 25,
        month: 12,
        day: 31,
        hour: 23,
        minute: 56,
        second: 0,
        yearsAgo: 70000,
        title: {
            uk: "Міграція з Африки",
            en: "Out of Africa Migration"
        },
        description: {
            uk: "Люди почали мігрувати з Африки і заселяти інші континенти.",
            en: "Humans began migrating from Africa and populating other continents."
        },
        category: "human"
    },
    {
        id: 26,
        month: 12,
        day: 31,
        hour: 23,
        minute: 58,
        second: 35,
        yearsAgo: 12000,
        title: {
            uk: "Сільськогосподарська революція",
            en: "Agricultural Revolution"
        },
        description: {
            uk: "Початок землеробства та одомашнення тварин. Люди перейшли до осілого способу життя.",
            en: "Beginning of agriculture and animal domestication. Humans transitioned to sedentary lifestyle."
        },
        category: "civilization"
    },
    {
        id: 27,
        month: 12,
        day: 31,
        hour: 23,
        minute: 59,
        second: 32,
        yearsAgo: 5000,
        title: {
            uk: "Перша писемність",
            en: "First Writing"
        },
        description: {
            uk: "Винайдення писемності в Mesopotamії. Початок записаної історії людства.",
            en: "Invention of writing in Mesopotamia. Beginning of recorded human history."
        },
        category: "civilization"
    },
    {
        id: 28,
        month: 12,
        day: 31,
        hour: 23,
        minute: 59,
        second: 46,
        yearsAgo: 2500,
        title: {
            uk: "Класичні цивілізації",
            en: "Classical Civilizations"
        },
        description: {
            uk: "Розквіт класичних цивілізацій: Греція, Рим, Китай, Індія. Золота доба філософії та науки.",
            en: "Flourishing of classical civilizations: Greece, Rome, China, India. Golden age of philosophy and science."
        },
        category: "civilization"
    },
    {
        id: 29,
        month: 12,
        day: 31,
        hour: 23,
        minute: 59,
        second: 50,
        yearsAgo: 1500,
        title: {
            uk: "Наукова революція",
            en: "Scientific Revolution"
        },
        description: {
            uk: "Початок наукової революції. Коперник, Галілей, Ньютон закладають основи сучасної науки.",
            en: "Beginning of the Scientific Revolution. Copernicus, Galileo, Newton lay foundations of modern science."
        },
        category: "civilization"
    },
    {
        id: 30,
        month: 12,
        day: 31,
        hour: 23,
        minute: 59,
        second: 54,
        yearsAgo: 250,
        title: {
            uk: "Промислова революція",
            en: "Industrial Revolution"
        },
        description: {
            uk: "Промислова революція назавжди змінила людське суспільство. Початок технологічної ери.",
            en: "Industrial Revolution forever changed human society. Beginning of the technological era."
        },
        category: "civilization"
    },
    {
        id: 31,
        month: 12,
        day: 31,
        hour: 23,
        minute: 59,
        second: 58,
        yearsAgo: 75,
        title: {
            uk: "Космічна ера",
            en: "Space Age"
        },
        description: {
            uk: "Людина вийшла в космос і висадилася на Місяці. Початок дослідження космосу.",
            en: "Humans went to space and landed on the Moon. Beginning of space exploration."
        },
        category: "civilization"
    },
    {
        id: 32,
        month: 12,
        day: 31,
        hour: 23,
        minute: 59,
        second: 59,
        yearsAgo: 25,
        title: {
            uk: "Цифрова революція",
            en: "Digital Revolution"
        },
        description: {
            uk: "Інтернет та комп'ютерні технології з'єднали світ. Епоха інформації.",
            en: "Internet and computer technologies connected the world. Information age."
        },
        category: "civilization"
    },
    {
        id: 33,
        month: 12,
        day: 31,
        hour: 23,
        minute: 59,
        second: 59,
        yearsAgo: 0,
        title: {
            uk: "Сьогодення",
            en: "Present Day"
        },
        description: {
            uk: "Ми тут і зараз. Продовження історії Всесвіту залежить від нас.",
            en: "We are here and now. The continuation of the Universe's history depends on us."
        },
        category: "civilization"
    }
];

// Month names in different languages
const TRANSLATIONS = {
    uk: {
        months: [
            'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
            'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
        ],
        daysShort: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        categories: {
            universe: 'Всесвіт',
            galaxy: 'Галактика',
            'solar-system': 'Сонячна система',
            earth: 'Земля',
            life: 'Життя',
            extinction: 'Вимирання',
            human: 'Людина',
            civilization: 'Цивілізація'
        },
        ui: {
            timeline: 'Шкала',
            calendar: 'Календар',
            list: 'Список',
            cosmicTime: 'Космічний час',
            realTime: 'Реальний час',
            yearsAgo: 'років тому',
            about: 'Про Космічний календар',
            keyMoments: 'Ключові моменти'
        }
    },
    en: {
        months: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ],
        daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        categories: {
            universe: 'Universe',
            galaxy: 'Galaxy',
            'solar-system': 'Solar System',
            earth: 'Earth',
            life: 'Life',
            extinction: 'Extinction',
            human: 'Human',
            civilization: 'Civilization'
        },
        ui: {
            timeline: 'Timeline',
            calendar: 'Calendar',
            list: 'List',
            cosmicTime: 'Cosmic Time',
            realTime: 'Real Time',
            yearsAgo: 'years ago',
            about: 'About Cosmic Calendar',
            keyMoments: 'Key Moments'
        }
    }
};

// Category colors
const CATEGORY_COLORS = {
    universe: '#6366f1',
    galaxy: '#8b5cf6',
    'solar-system': '#ec4899',
    earth: '#10b981',
    life: '#14b8a6',
    extinction: '#ef4444',
    human: '#f59e0b',
    civilization: '#06b6d4'
};
