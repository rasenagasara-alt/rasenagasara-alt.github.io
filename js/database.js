// Database configuration
const MAIN_TITLE = "Oliy taʼlim muassasasida oʻquv jarayonini sifati hamda samaradorligini oshirish boʻyicha";
const STORAGE_KEY = 'hemis_db_final_v4';

// Initial database structure
const getInitialDatabase = () => ({
    1: {
        title: MAIN_TITLE,
        questions: [
            {
                id: 1,
                text: "Sizga taʼlim berayotgan professor-oʻqituvchilarning talabalar bilan muloqot (dialog) darajasini qanday baholaysiz?",
                options: ["aʼlo", "yaxshi", "qoniqarli", "qoniqarsiz"],
                correctAnswer: "aʼlo"
            },
            {
                id: 2,
                text: "Professor-oʻqituvchilarning dars mashgʻulotlarida ilgʻor va innovatsion texnologiyalar va sohadagi oxirgi yangiliklarni talabalarga yetkazib berish darajasini qanday baholaysiz?",
                options: ["aʼlo", "yaxshi", "qoniqarli", "qoniqarsiz"],
                correctAnswer: "aʼlo"
            },
            {
                id: 3,
                text: "Sizningcha, siz tahsil olayotgan oliy taʼlim muassasasida talabalarga grantlarni taqdim etish va qayta taqsimlash jarayoni qay darajada shaffof va adolatli amalga oshirildi?",
                options: [
                    "Toʻliq adolatli va shaffof tarzda o'tkazildi",
                    "Qisman adolatli, ayrim hollarda tanish-bilishchilik holatlari kuzatildi",
                    "Asosan tanish-bilishchilik asosida o'tkazildi"
                ],
                correctAnswer: "Toʻliq adolatli va shaffof tarzda o'tkazildi"
            },
            {
                id: 4,
                text: "Professor-oʻqituvchilarning talabalar fikrlarini eshitishi hamda ularning bilimini shaffof baholash darajasi boʻyicha fikringiz?",
                options: ["aʼlo", "yaxshi", "qoniqarli", "qoniqarsiz"],
                correctAnswer: "aʼlo"
            },
            {
                id: 5,
                text: "Mustaqil taʼlim olish tizimi (professor-oʻqituvchilarning oʻz vaqtida topshiriqlarni berish va baholashga masʼuliyati) hamda talabalarning sifatli taʼlim olishi uchun yaratilgan sharoitlarni qanday baholaysiz?",
                options: ["aʼlo", "yaxshi", "qoniqarli", "qoniqarsiz"],
                correctAnswer: "aʼlo"
            },
            {
                id: 6,
                text: "Oliy taʼlim muassasasida oʻqitilayotgan fanlarning amaliyot bilan bogʻlanganligiga munosabatingiz qanday?",
                options: [
                    "fanlar amaliyot bilan uygʻun holda tashkil etiladi, menga yoqadi",
                    "fanlar asosan nazariyaga bogʻlangan holda tashkil etiladi"
                ],
                correctAnswer: "fanlar amaliyot bilan uygʻun holda tashkil etiladi, menga yoqadi"
            },
            {
                id: 7,
                text: "Oliy taʼlim muassasasining ARM (kutubxona) faoliyati sizni qoniqtiradimi?",
                options: [
                    "qoniqtiradi, koʻpgina xorijiy va milliy adabiyot, darslik va maqolalarni elektron shaklda yuklab olish mumkin",
                    "qoniqtirmaydi, xorijiy va milliy adabiyot, darslik va maqolalarni elektron shaklda yuklab olish imkoniyati mavjud emas"
                ],
                correctAnswer: "qoniqtiradi, koʻpgina xorijiy va milliy adabiyot, darslik va maqolalarni elektron shaklda yuklab olish mumkin"
            },
            {
                id: 8,
                text: "Oliy taʼlim muassasasining moddiy-texnik bazasi – zamonaviy kompyuterlar, proyektor, smart doska, oʻquv laboratoriya jihozlari va boshqalar bilan taʼminlanganlik darajasini qanday baholaysiz?",
                options: ["aʼlo", "yaxshi", "qoniqarli", "qoniqarsiz"],
                correctAnswer: "aʼlo"
            },
            {
                id: 9,
                text: "Oliy taʼlim muassasasida talabalarning boʻsh vaqtlarini mazmunli oʻtkazishlari uchun yaratilgan sharoitlar. Jumladan, sport va fan toʻgaraklari, madaniy hordiq uchun yaratilgan sharoitlar, yotoqxonada talabalarning dam olishi va ularning maʼnaviy yuksalishi uchun yaratilgan shart-sharoitlar sifatini qanday baholaysiz?",
                options: ["aʼlo", "yaxshi", "qoniqarli", "qoniqarsiz"],
                correctAnswer: "aʼlo"
            },
            {
                id: 10,
                text: "Tyutorlarning talabalarni bilim olishi, ularni oʻzlashtirish koʻrsatkichlarini doimiy ravishda tahlil qilib borishi va tegishli choralarni koʻrishini qanday baholaysiz?",
                options: ["aʼlo", "yaxshi", "qoniqarli", "qoniqarsiz"],
                correctAnswer: "aʼlo"
            },
            {
                id: 11,
                text: "HEMIS tizimidan foydalanish (fanning oʻquv meʼyoriy hujjatlarini tizimdan olish, oʻquv kontentlari bilan tanishish, oʻzlashtirish koʻrsatkichlarini kuzatib borish va boshqa oʻquv jarayoniga oid amallar) Sizni qoniqtiradimi?",
                options: [
                    "Toʻliq qoniqaman",
                    "Qoniqaman",
                    "Qoniqmayman",
                    "Umuman qoniqmayman"
                ],
                correctAnswer: "Toʻliq qoniqaman"
            },
            {
                id: 12,
                text: "Siz tahsil olayotgan oliy taʼlim muassasasidagi taʼlim sifatidan umumiy qoniqishingiz qay darajada?",
                options: [
                    "Toʻliq qoniqaman",
                    "Qoniqaman",
                    "Qoniqmayman",
                    "Umuman qoniqmayman"
                ],
                correctAnswer: "Toʻliq qoniqaman"
            },
            {
                id: 13,
                text: "Taʼlim sifatini oshirish uchun qanday takliflaringiz bor?",
                type: "text",
                correctAnswer: "Professor-o'qituvchilarning malakasini oshirish, zamonaviy texnologiyalardan foydalanish va amaliy mashg'ulotlarni ko'paytirish zarur."
            },
            {
                id: 14,
                text: "Qoʻshimcha izohlar yoki fikr-mulohazalar?",
                type: "text",
                correctAnswer: "Umumiy holda ta'lim sifati yaxshi darajada, ammo ba'zi jihozlar yangilanishi kerak."
            }
        ]
    },
    2: { title: "Ikkinchi so'rovnoma", questions: [] },
    3: { title: "Uchinchi so'rovnoma", questions: [] },
    4: { title: "To'rtinchi so'rovnoma", questions: [] },
    5: { title: "Beshinchi so'rovnoma", questions: [] },
    6: { title: "Oltinchi so'rovnoma", questions: [] },
    7: { title: "Ettinchi so'rovnoma", questions: [] },
    8: { title: "Sakkizinchi so'rovnoma", questions: [] },
    9: { title: "To'qqizinchi so'rovnoma", questions: [] },
    10: { title: "O'ninchi so'rovnoma", questions: [] },
    11: { title: "O'n birinchi so'rovnoma", questions: [] },
    12: { title: "O'n ikkinchi so'rovnoma", questions: [] },
    13: { title: "O'n uchinchi so'rovnoma", questions: [] },
    14: { title: "O'n to'rtinchi so'rovnoma", questions: [] }
});

// Database management functions
const DatabaseManager = {
    load: () => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : getInitialDatabase();
    },
    
    save: (data) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    },
    
    parse: (rawText) => {
        try {
            const blocks = rawText.split('++++').map(b => b.trim()).filter(b => b);
            const parsed = [];
            
            blocks.forEach((block, idx) => {
                const parts = block.split('====').map(p => p.trim()).filter(p => p);
                if (parts.length > 0) {
                    const qText = parts[0];
                    const rawOptions = parts.slice(1);
                    const options = [];
                    let correct = "";
                    
                    rawOptions.forEach(opt => {
                        if (opt.startsWith('#')) {
                            const clean = opt.substring(1).trim();
                            options.push(clean);
                            correct = clean;
                        } else {
                            options.push(opt);
                        }
                    });
                    
                    parsed.push({
                        id: idx + 1,
                        text: qText,
                        options: options,
                        correctAnswer: correct || options[0]
                    });
                }
            });
            
            const newData = {};
            for (let i = 0; i < parsed.length; i += 14) {
                const pNum = Math.floor(i / 14) + 1;
                newData[pNum] = {
                    title: pNum === 1 ? MAIN_TITLE : `So'rovnoma davomi (${pNum}-qism)`,
                    questions: parsed.slice(i, i + 14)
                };
            }
            
            return newData;
        } catch (e) {
            console.error('Parse error:', e);
            return null;
        }
    }
};

window.DatabaseManager = DatabaseManager;
window.MAIN_TITLE = MAIN_TITLE;