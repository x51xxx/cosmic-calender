// Cosmic Calendar Events Data with Multilingual Support
// 13.8 billion years compressed to 1 year
// Based on Carl Sagan's Cosmic Calendar concept

const COSMIC_EVENTS = [
    // January - Beginning of Universe
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
        id: 3,
        month: 1,
        day: 14,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 13100000000,
        title: {
            uk: "Найстарші відомі гамма-спалахи",
            en: "Oldest Known Gamma-Ray Bursts"
        },
        description: {
            uk: "Найстаріші відомі гамма-спалахи - найпотужніші вибухи у Всесвіті.",
            en: "Oldest known gamma-ray bursts - the most powerful explosions in the Universe."
        },
        category: "universe"
    },
    {
        id: 4,
        month: 1,
        day: 22,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 12850000000,
        title: {
            uk: "Виникнення та еволюція галактик",
            en: "Formation and Evolution of Galaxies"
        },
        description: {
            uk: "Формування перших галактик у Всесвіті. Гравітація почала збирати матерію у великі структури.",
            en: "Formation of the first galaxies in the Universe. Gravity began gathering matter into large structures."
        },
        category: "universe"
    },

    // March-May - Milky Way Formation
    {
        id: 5,
        month: 3,
        day: 16,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 11000000000,
        title: {
            uk: "Формування галактики Чумацький Шлях",
            en: "Milky Way Galaxy Formation"
        },
        description: {
            uk: "Початок формування нашої галактики - Чумацького Шляху. Процес тривав мільярди років.",
            en: "Beginning of our galaxy's formation - the Milky Way. The process lasted billions of years."
        },
        category: "galaxy"
    },
    {
        id: 6,
        month: 5,
        day: 12,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 8800000000,
        title: {
            uk: "Тонкий диск Чумацького Шляху",
            en: "Thin Disk of Milky Way"
        },
        description: {
            uk: "Формування тонкого диску нашої галактики з молодими зірками та пиловими хмарами.",
            en: "Formation of the thin disk of our galaxy with young stars and dust clouds."
        },
        category: "galaxy"
    },

    // September - Solar System Formation
    {
        id: 7,
        month: 9,
        day: 2,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 4570000000,
        title: {
            uk: "Формування Сонячної системи",
            en: "Solar System Formation"
        },
        description: {
            uk: "Народження Сонця та формування Сонячної системи з газопилової туманності.",
            en: "Birth of the Sun and formation of the Solar System from a gas and dust nebula."
        },
        category: "solar-system"
    },
    {
        id: 8,
        month: 9,
        day: 6,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 4400000000,
        title: {
            uk: "Найдавніші гірські породи Землі",
            en: "Oldest Known Rocks on Earth"
        },
        description: {
            uk: "Найдавніші гірські породи, відомі на Землі. Свідчення формування твердої земної кори.",
            en: "The oldest known rocks on Earth. Evidence of solid Earth's crust formation."
        },
        category: "earth"
    },
    {
        id: 9,
        month: 9,
        day: 14,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 4100000000,
        title: {
            uk: "Сліди біологічного життя",
            en: "Traces of Biological Life"
        },
        description: {
            uk: "Найдавніші сліди біологічного життя знайдені в породах віком 4,1 млрд років у Західній Австралії.",
            en: "Oldest traces of biological life found in 4.1 billion year old rocks in Western Australia."
        },
        category: "life"
    },
    {
        id: 10,
        month: 9,
        day: 21,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 3800000000,
        title: {
            uk: "Поява життя (прокаріоти)",
            en: "Appearance of Life (Prokaryotes)"
        },
        description: {
            uk: "Виникнення перших одноклітинних організмів (прокаріотів). Життя почалося в океанах первісної Землі.",
            en: "Emergence of the first single-celled organisms (prokaryotes). Life began in the oceans of primordial Earth."
        },
        category: "life"
    },
    {
        id: 11,
        month: 9,
        day: 30,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 3400000000,
        title: {
            uk: "Фотосинтез",
            en: "Photosynthesis"
        },
        description: {
            uk: "Перші фотосинтезуючі організми (ціанобактерії) почали виробляти кисень, революціонізуючи атмосферу Землі.",
            en: "First photosynthetic organisms (cyanobacteria) began producing oxygen, revolutionizing Earth's atmosphere."
        },
        category: "life"
    },

    // October-November - Evolution of Life
    {
        id: 12,
        month: 10,
        day: 29,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 2400000000,
        title: {
            uk: "Оксигенація атмосфери",
            en: "Oxygenation of Atmosphere"
        },
        description: {
            uk: "Велика киснева катастрофа. Накопичення кисню в атмосфері змінило хімію планети назавжди.",
            en: "Great Oxygenation Event. Accumulation of oxygen in atmosphere changed planet's chemistry forever."
        },
        category: "life"
    },
    {
        id: 13,
        month: 11,
        day: 9,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 2000000000,
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

    // December - Explosion of Life and Human Evolution
    {
        id: 14,
        month: 12,
        day: 5,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 800000000,
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
        id: 15,
        month: 12,
        day: 7,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 670000000,
        title: {
            uk: "Прості тварини",
            en: "Simple Animals"
        },
        description: {
            uk: "Поява перших простих тварин. Едіакарська біота - м'які багатоклітинні організми.",
            en: "Appearance of first simple animals. Ediacaran biota - soft-bodied multicellular organisms."
        },
        category: "life"
    },
    {
        id: 16,
        month: 12,
        day: 14,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 550000000,
        title: {
            uk: "Кембрійський вибух",
            en: "Cambrian Explosion"
        },
        description: {
            uk: "Швидка диверсифікація життя. З'явилися членистоногі (предки комах, павукоподібних) та більшість сучасних типів тварин.",
            en: "Rapid diversification of life. Arthropods (ancestors of insects, arachnids) and most modern animal phyla appeared."
        },
        category: "life"
    },
    {
        id: 17,
        month: 12,
        day: 17,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 500000000,
        title: {
            uk: "Риби та прото-амфібії",
            en: "Fish and Proto-Amphibians"
        },
        description: {
            uk: "Поява перших риб та примітивних амфібій. Початок завоювання суші хребетними.",
            en: "Appearance of first fish and primitive amphibians. Beginning of land conquest by vertebrates."
        },
        category: "life"
    },
    {
        id: 18,
        month: 12,
        day: 20,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 450000000,
        title: {
            uk: "Наземні рослини",
            en: "Land Plants"
        },
        description: {
            uk: "Перші рослини колонізували сушу, змінюючи ландшафт Землі назавжди.",
            en: "First plants colonized land, changing Earth's landscape forever."
        },
        category: "life"
    },
    {
        id: 19,
        month: 12,
        day: 21,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 400000000,
        title: {
            uk: "Комахи та насіння",
            en: "Insects and Seeds"
        },
        description: {
            uk: "З'явилися перші комахи та рослини з насінням - найуспішніші групи організмів на планеті.",
            en: "First insects and seed plants appeared - the most successful groups of organisms on the planet."
        },
        category: "life"
    },
    {
        id: 20,
        month: 12,
        day: 22,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 360000000,
        title: {
            uk: "Земноводні",
            en: "Amphibians"
        },
        description: {
            uk: "Розквіт земноводних. Перші тварини, які могли жити і у воді, і на суші.",
            en: "Flourishing of amphibians. First animals that could live both in water and on land."
        },
        category: "life"
    },
    {
        id: 21,
        month: 12,
        day: 23,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 300000000,
        title: {
            uk: "Рептилії",
            en: "Reptiles"
        },
        description: {
            uk: "Виникнення перших рептилій. Перші хребетні, які могли жити далеко від води.",
            en: "Emergence of the first reptiles. First vertebrates that could live far from water."
        },
        category: "life"
    },
    {
        id: 22,
        month: 12,
        day: 24,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 250000000,
        title: {
            uk: "Пермське вимирання",
            en: "Permian Extinction"
        },
        description: {
            uk: "Найбільше масове вимирання в історії Землі. Загинуло 90% усіх видів живих організмів.",
            en: "Largest mass extinction in Earth's history. 90% of all species perished."
        },
        category: "extinction"
    },
    {
        id: 23,
        month: 12,
        day: 25,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 230000000,
        title: {
            uk: "Динозаври",
            en: "Dinosaurs"
        },
        description: {
            uk: "Перші динозаври з'явилися на Землі. Початок тріасового періоду та ери динозаврів.",
            en: "First dinosaurs appeared on Earth. Beginning of the Triassic period and the age of dinosaurs."
        },
        category: "life"
    },
    {
        id: 24,
        month: 12,
        day: 26,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 200000000,
        title: {
            uk: "Ссавці",
            en: "Mammals"
        },
        description: {
            uk: "Поява перших ссавців - невеликих нічних створінь, які жили в тіні динозаврів.",
            en: "Appearance of first mammals - small nocturnal creatures living in the shadow of dinosaurs."
        },
        category: "life"
    },
    {
        id: 25,
        month: 12,
        day: 27,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 150000000,
        title: {
            uk: "Птахи",
            en: "Birds"
        },
        description: {
            uk: "Птахи еволюціонували від динозаврів-тероподів. Археоптерикс - перехідна форма.",
            en: "Birds evolved from theropod dinosaurs. Archaeopteryx was a transitional form."
        },
        category: "life"
    },
    {
        id: 26,
        month: 12,
        day: 28,
        hour: 0,
        minute: 0,
        second: 0,
        yearsAgo: 130000000,
        title: {
            uk: "Квіти",
            en: "Flowers"
        },
        description: {
            uk: "Поява квіткових рослин (покритонасінних), які швидко стали домінувати на суші.",
            en: "Appearance of flowering plants (angiosperms), which quickly became dominant on land."
        },
        category: "life"
    },
    {
        id: 27,
        month: 12,
        day: 30,
        hour: 6,
        minute: 24,
        second: 0,
        yearsAgo: 65000000,
        title: {
            uk: "Крейдове вимирання динозаврів",
            en: "Cretaceous Dinosaur Extinction"
        },
        description: {
            uk: "Астероїд зіткнувся з Землею біля Юкатану, спричинивши масове вимирання. Загинули динозаври та 75% усіх видів.",
            en: "An asteroid collided with Earth near Yucatan, causing mass extinction. Dinosaurs and 75% of all species perished."
        },
        category: "extinction"
    },
    {
        id: 28,
        month: 12,
        day: 30,
        hour: 12,
        minute: 0,
        second: 0,
        yearsAgo: 65000000,
        title: {
            uk: "Примати",
            en: "Primates"
        },
        description: {
            uk: "Після вимирання динозаврів почався розквіт ссавців. Виникли перші примати.",
            en: "After dinosaur extinction, mammals flourished. First primates emerged."
        },
        category: "human"
    },

    // December 31 - Human History
    {
        id: 29,
        month: 12,
        day: 31,
        hour: 6,
        minute: 5,
        second: 0,
        yearsAgo: 15000000,
        title: {
            uk: "Людиноподібні мавпи",
            en: "Great Apes"
        },
        description: {
            uk: "Виникнення перших людиноподібних мавп - предків людини та інших гомінідів.",
            en: "Emergence of the first great apes - ancestors of humans and other hominids."
        },
        category: "human"
    },
    {
        id: 30,
        month: 12,
        day: 31,
        hour: 14,
        minute: 24,
        second: 0,
        yearsAgo: 12300000,
        title: {
            uk: "Гомініди",
            en: "Hominids"
        },
        description: {
            uk: "Розділення ліній людини та шимпанзе. Початок еволюції людини.",
            en: "Separation of human and chimpanzee lines. Beginning of human evolution."
        },
        category: "human"
    },
    {
        id: 31,
        month: 12,
        day: 31,
        hour: 22,
        minute: 24,
        second: 0,
        yearsAgo: 2500000,
        title: {
            uk: "Людина і кам'яні інструменти",
            en: "Humans and Stone Tools"
        },
        description: {
            uk: "Наші предки почали виготовляти перші кам'яні знаряддя. Початок кам'яного віку.",
            en: "Our ancestors began making the first stone tools. Beginning of the Stone Age."
        },
        category: "human"
    },
    {
        id: 32,
        month: 12,
        day: 31,
        hour: 23,
        minute: 44,
        second: 0,
        yearsAgo: 400000,
        title: {
            uk: "Приручення вогню",
            en: "Domestication of Fire"
        },
        description: {
            uk: "Люди навчилися контролювати вогонь - революційний крок у розвитку цивілізації.",
            en: "Humans learned to control fire - a revolutionary step in civilization development."
        },
        category: "human"
    },
    {
        id: 33,
        month: 12,
        day: 31,
        hour: 23,
        minute: 52,
        second: 0,
        yearsAgo: 200000,
        title: {
            uk: "Анатомічно сучасна людина",
            en: "Anatomically Modern Humans"
        },
        description: {
            uk: "Поява анатомічно сучасної людини (Homo sapiens) в Африці. Наші безпосередні предки.",
            en: "Appearance of anatomically modern humans (Homo sapiens) in Africa. Our direct ancestors."
        },
        category: "human"
    },
    {
        id: 34,
        month: 12,
        day: 31,
        hour: 23,
        minute: 55,
        second: 0,
        yearsAgo: 110000,
        title: {
            uk: "Початок останнього льодовикового періоду",
            en: "Start of Last Ice Age"
        },
        description: {
            uk: "Початок останнього льодовикового періоду. Люди адаптувалися до суворих кліматичних умов.",
            en: "Start of the last ice age. Humans adapted to harsh climatic conditions."
        },
        category: "earth"
    },
    {
        id: 35,
        month: 12,
        day: 31,
        hour: 23,
        minute: 58,
        second: 0,
        yearsAgo: 35000,
        title: {
            uk: "Скульптура і малюнки",
            en: "Sculpture and Paintings"
        },
        description: {
            uk: "Виникнення мистецтва. Печерні малюнки та скульптури - початок символічного мислення.",
            en: "Emergence of art. Cave paintings and sculptures - beginning of symbolic thinking."
        },
        category: "civilization"
    },
    {
        id: 36,
        month: 12,
        day: 31,
        hour: 23,
        minute: 59,
        second: 32,
        yearsAgo: 12000,
        title: {
            uk: "Сільське господарство",
            en: "Agriculture"
        },
        description: {
            uk: "Початок землеробства та одомашнення тварин. Неолітична революція - люди перейшли до осілого способу життя.",
            en: "Beginning of agriculture and animal domestication. Neolithic Revolution - humans transitioned to sedentary lifestyle."
        },
        category: "civilization"
    },
    {
        id: 37,
        month: 12,
        day: 31,
        hour: 23,
        minute: 59,
        second: 33,
        yearsAgo: 12000,
        title: {
            uk: "Кінець льодовикового періоду",
            en: "End of Ice Age"
        },
        description: {
            uk: "Закінчення останнього льодовикового періоду. Потепління клімату сприяло розвитку цивілізації.",
            en: "End of the last ice age. Climate warming facilitated civilization development."
        },
        category: "earth"
    },
    {
        id: 38,
        month: 12,
        day: 31,
        hour: 23,
        minute: 59,
        second: 46,
        yearsAgo: 6000,
        title: {
            uk: "Енеоліт",
            en: "Chalcolithic Age"
        },
        description: {
            uk: "Мідно-кам'яний вік. Перше використання металів людиною.",
            en: "Copper-Stone Age. First use of metals by humans."
        },
        category: "civilization"
    },
    {
        id: 39,
        month: 12,
        day: 31,
        hour: 23,
        minute: 59,
        second: 47,
        yearsAgo: 5500,
        title: {
            uk: "Бронзова доба, Стоунхендж",
            en: "Bronze Age, Stonehenge"
        },
        description: {
            uk: "Бронзова доба, протописемність, побудова Стоунгенджу. Розвиток перших цивілізацій.",
            en: "Bronze Age, proto-writing, construction of Stonehenge. Development of first civilizations."
        },
        category: "civilization"
    },
    {
        id: 40,
        month: 12,
        day: 31,
        hour: 23,
        minute: 59,
        second: 48,
        yearsAgo: 5000,
        title: {
            uk: "Перша писемність, Єгипет",
            en: "First Writing, Egypt"
        },
        description: {
            uk: "Перша династія єгипетських фараонів, ранній період династій шумерів, початок Індської цивілізації. Винайдення писемності.",
            en: "First dynasty of Egyptian pharaohs, early dynastic period of Sumer, beginning of Indus civilization. Invention of writing."
        },
        category: "civilization"
    },
    {
        id: 41,
        month: 12,
        day: 31,
        hour: 23,
        minute: 59,
        second: 49,
        yearsAgo: 4500,
        title: {
            uk: "Абетка, Аккад, Колесо",
            en: "Alphabet, Akkad, Wheel"
        },
        description: {
            uk: "Винахід абетки, Імперія Аккад, винахід колеса. Революційні технології давнини.",
            en: "Invention of alphabet, Akkadian Empire, invention of wheel. Revolutionary technologies of antiquity."
        },
        category: "civilization"
    },
    {
        id: 42,
        month: 12,
        day: 31,
        hour: 23,
        minute: 59,
        second: 51,
        yearsAgo: 4000,
        title: {
            uk: "Закони Хаммурапі",
            en: "Code of Hammurabi"
        },
        description: {
            uk: "Закони Хаммурапі - один з найперших кодексів законів. Середнє царство Стародавнього Єгипту.",
            en: "Code of Hammurabi - one of the earliest law codes. Middle Kingdom of Ancient Egypt."
        },
        category: "civilization"
    },
    {
        id: 43,
        month: 12,
        day: 31,
        hour: 23,
        minute: 59,
        second: 53,
        yearsAgo: 3000,
        title: {
            uk: "Залізна доба",
            en: "Iron Age"
        },
        description: {
            uk: "Початок залізної доби та Античної епохи. Перехід від бронзи до заліза.",
            en: "Beginning of Iron Age and Classical Antiquity. Transition from bronze to iron."
        },
        category: "civilization"
    },
    {
        id: 44,
        month: 12,
        day: 31,
        hour: 23,
        minute: 59,
        second: 54,
        yearsAgo: 2500,
        title: {
            uk: "Стародавні цивілізації",
            en: "Ancient Civilizations"
        },
        description: {
            uk: "Будда, Магавіра, Заратуштра, Конфуцій, династія Цінь, Періклова Атени, Імперія Ашока, Веди, Римська республіка.",
            en: "Buddha, Mahavira, Zarathustra, Confucius, Qin dynasty, Periclean Athens, Ashoka Empire, Vedas, Roman Republic."
        },
        category: "civilization"
    },
    {
        id: 45,
        month: 12,
        day: 31,
        hour: 23,
        minute: 59,
        second: 55,
        yearsAgo: 2000,
        title: {
            uk: "Золота доба науки античності",
            en: "Golden Age of Ancient Science"
        },
        description: {
            uk: "Евклідова геометрія, фізика Архімеда, астрономія Птолемея, Римська імперія, Ісус Христос, винахід нуля, Імперія Гуптів.",
            en: "Euclidean geometry, Archimedean physics, Ptolemaic astronomy, Roman Empire, Jesus Christ, invention of zero, Gupta Empire."
        },
        category: "civilization"
    },
    {
        id: 46,
        month: 12,
        day: 31,
        hour: 23,
        minute: 59,
        second: 56,
        yearsAgo: 1500,
        title: {
            uk: "Середньовіччя",
            en: "Middle Ages"
        },
        description: {
            uk: "Магомет, цивілізація майя, династія Сун, Візантійська імперія. Середні віки.",
            en: "Muhammad, Mayan civilization, Song Dynasty, Byzantine Empire. Middle Ages."
        },
        category: "civilization"
    },
    {
        id: 47,
        month: 12,
        day: 31,
        hour: 23,
        minute: 59,
        second: 58,
        yearsAgo: 1000,
        title: {
            uk: "Пізнє середньовіччя",
            en: "Late Middle Ages"
        },
        description: {
            uk: "Монгольська імперія, Імперія Маратха, хрестові походи, відкриття Америки, Епоха Відродження в Європі, класична музика Баха.",
            en: "Mongol Empire, Maratha Empire, Crusades, discovery of America, Renaissance in Europe, Bach's classical music."
        },
        category: "civilization"
    },
    {
        id: 48,
        month: 12,
        day: 31,
        hour: 23,
        minute: 59,
        second: 59,
        yearsAgo: 500,
        title: {
            uk: "Нова історія",
            en: "Modern History"
        },
        description: {
            uk: "Останні 437,5 років: епоха відкриттів, наукова революція, промислова революція, технологічний прогрес.",
            en: "Last 437.5 years: age of discovery, scientific revolution, industrial revolution, technological progress."
        },
        category: "civilization"
    },
    {
        id: 49,
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
            uk: "Ми тут і зараз. Космічна ера, цифрова революція. Продовження історії Всесвіту залежить від нас.",
            en: "We are here and now. Space age, digital revolution. The continuation of the Universe's history depends on us."
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

// Category icons/images (emoji)
const CATEGORY_ICONS = {
    universe: '💥',      // Big Bang, universe events
    galaxy: '🌌',        // Galaxies, cosmic structures
    'solar-system': '🪐', // Solar system formation
    earth: '🌍',         // Earth formation and geology
    life: '🧬',          // Life, DNA, biology
    extinction: '☄️',     // Extinction events, catastrophes
    human: '🦴',         // Human evolution
    civilization: '🏛️'   // Human civilization
};
