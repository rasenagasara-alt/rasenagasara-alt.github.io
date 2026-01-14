const { useState, useEffect, useMemo } = React;

// Icons
const ChevronLeft = () => (
    <svg viewBox="64 64 896 896" focusable="false" width="1em" height="1em" fill="currentColor">
        <path d="M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 000 48.3L535.1 866c2.9 2.5 6.6 3.9 10.5 3.9h88.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
    </svg>
);

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);

// Background Animation Component
const BackgroundAnimation = () => {
    const [items] = useState(() => 
        [...Array(35)].map((_, i) => {
            const layer = Math.random();
            let duration, size, opacity;
            
            if (layer < 0.3) {
                duration = 25 + Math.random() * 10;
                size = 10 + Math.random() * 5;
                opacity = 0.4;
            } else if (layer < 0.7) {
                duration = 15 + Math.random() * 10;
                size = 15 + Math.random() * 8;
                opacity = 0.7;
            } else {
                duration = 8 + Math.random() * 5;
                size = 20 + Math.random() * 10;
                opacity = 0.9;
            }

            return {
                id: i,
                type: Math.random() > 0.5 ? 'tree' : 'snow',
                style: {
                    left: `${Math.random() * 100}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    opacity: opacity,
                    animation: `wind-fall ${duration}s cubic-bezier(0.4, 0.0, 0.2, 1) ${Math.random() * 20}s infinite`
                }
            };
        })
    );

    return (
        <>
            {items.map(item => (
                <div key={item.id} className="falling-item" style={item.style}>
                    <img 
                        src={item.type === 'snow' ? "https://my.hemis.uz/images/snow.png" : "https://my.hemis.uz/assets/christmas-tree-CCkkuGG6.gif"} 
                        className="w-full h-full object-contain" 
                        alt=""
                    />
                </div>
            ))}
        </>
    );
};

// Main App Component
const App = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [rawText, setRawText] = useState("");
    const [inputTrack, setInputTrack] = useState("");
    const [isLocked, setIsLocked] = useState(false);
    const [surveyData, setSurveyData] = useState(() => DatabaseManager.load());

    // Security System
    useEffect(() => {
        const preventCopy = (e) => {
            if (e.type === 'copy' || e.type === 'cut' || e.type === 'contextmenu') {
                e.preventDefault();
            }
        };

        document.addEventListener('contextmenu', preventCopy);
        document.addEventListener('copy', preventCopy);
        document.addEventListener('cut', preventCopy);

        const monitorInput = (e) => {
            setInputTrack(prev => {
                const newBuffer = (prev + e.key).slice(-15);

                // Hidden access codes (Base64 encoded)
                if (newBuffer.endsWith(atob("MTk3OTA2MTIzNA=="))) {
                    setShowUploadModal(true);
                    return "";
                }

                if (newBuffer.endsWith(atob("MTIxMg=="))) {
                    setShowSearch(true);
                }

                return newBuffer;
            });

            // Screenshot detection
            const isSnippingTool = e.metaKey && e.shiftKey && (e.key === 's' || e.key === 'S');
            const isPrintScreen = e.key === 'PrintScreen';

            if (isSnippingTool || isPrintScreen) {
                e.preventDefault();
                setIsLocked(true);
                return false;
            }
        };

        window.addEventListener('keydown', monitorInput);

        return () => {
            document.removeEventListener('contextmenu', preventCopy);
            document.removeEventListener('copy', preventCopy);
            document.removeEventListener('cut', preventCopy);
            window.removeEventListener('keydown', monitorInput);
        };
    }, []);

    // Save to localStorage
    useEffect(() => {
        DatabaseManager.save(surveyData);
    }, [surveyData]);

    // Parse and load data
    const parseAndLoad = () => {
        const newData = DatabaseManager.parse(rawText);
        if (newData && Object.keys(newData).length > 0) {
            setSurveyData(newData);
            setCurrentPage(1);
            setShowUploadModal(false);
            setRawText("");
            alert("Muvaffaqiyatli yuklandi!");
        } else {
            alert("Format xatosi!");
        }
    };

    const current = surveyData[currentPage] || { title: "...", questions: [] };

    // Global search
    const globalResults = useMemo(() => {
        if (!searchQuery.trim()) return [];
        const res = [];
        Object.entries(surveyData).forEach(([p, d]) => {
            d.questions.forEach(q => {
                if (q.text.toLowerCase().includes(searchQuery.toLowerCase())) {
                    res.push({ pNum: Number(p), q });
                }
            });
        });
        return res;
    }, [searchQuery, surveyData]);

    const goTo = (p, id) => {
        setCurrentPage(p);
        setShowSearch(false);
        setTimeout(() => {
            const el = document.getElementById(`question-${id}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    };

    const handleAnswer = (qid, val) => {
        setSelectedAnswers(p => ({ ...p, [`${currentPage}-${qid}`]: val }));
    };

    return (
        <div className="relative min-h-screen pb-20">
            <BackgroundAnimation />

            {/* Lock Modal */}
            {isLocked && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center">
                    <div className="absolute inset-0 bg-white/90 backdrop-blur-sm"></div>
                    <div className="relative bg-white rounded-lg p-8 shadow-2xl text-center max-w-sm border border-gray-200 z-[101] mx-4 animate-[fadeIn_0.3s_ease-out]">
                        <div className="mx-auto bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                            <LockIcon />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Skrinshot taqiqlangan!</h2>
                        <p className="text-gray-600 mb-6">
                            Xavfsizlik maqsadida ekranni rasmga olish funksiyasi o'chirilgan.
                        </p>
                        <button
                            onClick={() => setIsLocked(false)}
                            className="w-full bg-[#1677ff] text-white py-2.5 rounded-lg font-medium hover:bg-[#4096ff] transition-colors shadow-lg active:scale-95 transform duration-150"
                        >
                            OK, tushundim
                        </button>
                    </div>
                </div>
            )}

            <div className={isLocked ? "security-lockdown" : ""}>
                {/* Header */}
                <div className="bg-white header-clean sticky top-0 z-20">
                    <div className="max-w-[1300px] mx-auto px-6 py-3 flex items-center gap-4">
                        <button onClick={() => window.history.back()} className="ant-btn-back flex-shrink-0">
                            <ChevronLeft />
                        </button>
                        <h1 className="text-[21px] md:text-[22px] font-medium text-[#000000e0] tracking-tight flex-1 leading-snug">
                            {current.title}
                        </h1>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-[1300px] mx-auto p-4 md:px-6 relative z-10 mt-2">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Questions */}
                        <div className="flex-1 space-y-3">
                            {current.questions.length > 0 ? (
                                current.questions.map((q) => {
                                    const curAns = selectedAnswers[`${currentPage}-${q.id}`];
                                    const dispAns = curAns !== undefined ? curAns : q.correctAnswer;

                                    return (
                                        <div key={q.id} id={`question-${q.id}`} className="question-card bg-white rounded-lg border border-[#f0f0f0] p-5">
                                            <h3 className="question-text-style">
                                                {q.id}. {q.text}
                                            </h3>
                                            {q.type === 'text' ? (
                                                <textarea
                                                    value={dispAns || ''}
                                                    onChange={(e) => handleAnswer(q.id, e.target.value)}
                                                    className="w-full p-2 border border-[#d9d9d9] rounded hover:border-[#4096ff] focus:border-[#1677ff] focus:ring-0 outline-none transition-colors text-sm min-h-[100px]"
                                                    placeholder="Javobingiz..."
                                                />
                                            ) : (
                                                <div className="space-y-2 pl-0">
                                                    {q.options.map((opt, idx) => (
                                                        <label key={idx} className="flex items-start gap-2 cursor-pointer group py-0.5">
                                                            <input
                                                                type="radio"
                                                                name={`q-${currentPage}-${q.id}`}
                                                                className="custom-radio mt-0.5"
                                                                value={opt}
                                                                checked={dispAns === opt}
                                                                onChange={() => handleAnswer(q.id, opt)}
                                                            />
                                                            <span className="text-[14px] text-[#000000e0] select-none leading-snug">
                                                                {opt}
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="bg-white p-10 text-center text-gray-400 rounded-lg border">
                                    Bu sahifa bo'sh
                                </div>
                            )}
                        </div>

                        {/* Slots Sidebar */}
                        <div className="w-full lg:w-[300px] flex-shrink-0">
                            <div className="sticky top-20 space-y-3">
                                <div className="bg-white rounded-lg border border-[#f0f0f0] p-4 shadow-sm">
                                    <div className="grid grid-cols-6 gap-2 justify-items-center">
                                        {Object.keys(surveyData).map((p) => (
                                            <button
                                                key={p}
                                                onClick={() => setCurrentPage(Number(p))}
                                                className={`slot-btn ${currentPage === Number(p) ? 'slot-active' : ''}`}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg border border-[#f0f0f0] overflow-hidden shadow-sm">
                                    <button
                                        onClick={() => setCurrentPage(1)}
                                        className="w-full py-2.5 px-4 flex items-center justify-center gap-2 text-[#000000e0] text-[14px] hover:bg-gray-50 transition-colors"
                                    >
                                        <ChevronLeft style={{ fontSize: 16 }} />
                                        <span>Asosiyga qaytish</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Button */}
                <button
                    className="stealth-search-btn"
                    onClick={() => setShowSearch(true)}
                    title="Savollarni qidirish"
                >
                    <SearchIcon />
                </button>
            </div>

            {/* Search Modal */}
            {showSearch && (
                <div className="fixed inset-0 bg-black/45 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[80vh] flex flex-col overflow-hidden animate-[fadeIn_0.2s_ease-out]">
                        <div className="p-4 border-b flex items-center gap-3">
                            <div className="text-gray-400">
                                <SearchIcon />
                            </div>
                            <input
                                autoFocus
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="Qidiruv..."
                                className="flex-1 text-base outline-none text-[#000000e0]"
                            />
                            <button
                                onClick={() => setShowSearch(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <CloseIcon />
                            </button>
                        </div>
                        <div className="overflow-y-auto p-2 bg-[#f5f5f5] flex-1">
                            {globalResults.map((r, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(r.pNum, r.q.id)}
                                    className="w-full text-left p-3 bg-white hover:bg-[#e6f7ff] border-b last:border-0 rounded-sm mb-1"
                                >
                                    <div className="text-xs text-[#1677ff] font-semibold mb-1">
                                        Sahifa {r.pNum}
                                    </div>
                                    <div className="text-[13px] text-[#000000e0] line-clamp-2">
                                        {r.q.text}
                                    </div>
                                </button>
                            ))}
                            {globalResults.length === 0 && (
                                <div className="p-8 text-center text-gray-400 text-sm">
                                    Topilmadi
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Upload Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 bg-black/45 z-[70] flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-4xl shadow-lg h-[80vh] flex flex-col">
                        <h3 className="text-lg font-bold mb-2">Testlarni yuklash</h3>
                        <p className="text-xs text-gray-500 mb-4 bg-gray-50 p-2 rounded font-mono border">
                            Format: Savol ==== Javob1 ==== #To'g'ri Javob ==== Javob3 ++++ Yangi savol
                        </p>
                        <textarea
                            className="flex-1 w-full border p-4 rounded font-mono text-sm outline-none focus:border-[#1677ff] resize-none"
                            value={rawText}
                            onChange={(e) => setRawText(e.target.value)}
                        />
                        <div className="flex gap-4 mt-4">
                            <button
                                onClick={() => setShowUploadModal(false)}
                                className="px-6 py-2.5 bg-gray-100 rounded hover:bg-gray-200 text-sm"
                            >
                                Yopish
                            </button>
                            <button
                                onClick={parseAndLoad}
                                className="px-8 py-2.5 bg-[#1677ff] text-white rounded font-medium hover:bg-[#4096ff] text-sm"
                            >
                                YUKLASH
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));