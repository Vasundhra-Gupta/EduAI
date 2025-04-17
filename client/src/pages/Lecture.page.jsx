import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Doubt, Poll, PollResults } from '../components';
import { CreatePollPopup, InterventionPopup } from '../components';

export default function LecturePage() {
    const [activeDoubt, setActiveDoubt] = useState(null);
    const [activeTab, setActiveTab] = useState('clubbed');
    const [showInterventionModal, setShowInterventionModal] = useState(false);
    const [showPollModal, setShowPollModal] = useState(false);
    const [activePoll, setActivePoll] = useState(null);
    const [pollResults, setPollResults] = useState(null);
    const navigate = useNavigate();

    // Comprehensive doubt data with sample teacher response
    const [clubbedDoubts, setClubbedDoubts] = useState([
        {
            id: 'alg1',
            summary: 'Quadratic formula applications',
            category: 'Algebra',
            urgency: 'high',
            subDoubts: [
                {
                    id: 'alg1-1',
                    text: 'When to use quadratic formula vs factoring?',
                    students: 12,
                    timestamp: '12:45',
                },
                {
                    id: 'alg1-2',
                    text: 'Real-world applications of the formula',
                    students: 9,
                    timestamp: '12:50',
                },
            ],
            aiInsight:
                'Students need help connecting formulas to real applications',
            teacherResponse: {
                text: 'The quadratic formula works for all cases, but factoring is faster when the equation is factorable. For real-world applications, think about projectile motion - the path of a ball follows a quadratic curve!',
                timestamp: '12:55',
                attachment: { type: 'image', name: 'projectile-example.png' },
                upvotes: 15,
                downvotes: 2,
            },
        },
        {
            id: 'alg2',
            summary: 'Polynomial factoring techniques',
            category: 'Algebra',
            urgency: 'medium',
            subDoubts: [
                {
                    id: 'alg2-1',
                    text: 'How to factor trinomials with a≠1?',
                    students: 9,
                    timestamp: '13:00',
                },
            ],
            aiInsight: 'Visual demonstrations would help with factoring steps',
            teacherResponse: null,
        },
        {
            id: 'wp1',
            summary: 'Quadratic word problems',
            category: 'Application',
            urgency: 'high',
            subDoubts: [
                {
                    id: 'wp1-1',
                    text: 'How to set up projectile motion problems?',
                    students: 14,
                    timestamp: '13:35',
                },
            ],
            aiInsight:
                'Students struggle with translating word problems to equations',
            teacherResponse: null,
        },
    ]);

    // All individual doubts
    const allDoubts = [
        {
            id: 'alg-d1',
            text: 'Why does the discriminant matter?',
            student: 'Alice',
            timestamp: '12:38',
            category: 'Algebra',
        },
        {
            id: 'alg-d2',
            text: 'Can we derive the quadratic formula?',
            student: 'Bob',
            timestamp: '12:42',
            category: 'Algebra',
        },
        {
            id: 'alg-d3',
            text: "What's the difference between roots and zeros?",
            student: 'Charlie',
            timestamp: '12:47',
            category: 'Algebra',
        },
    ];

    // Handle teacher response
    const handleRespond = (doubtId, responseText, action) => {
        if (action === 'upvote' || action === 'downvote') {
            setClubbedDoubts((doubts) =>
                doubts.map((doubt) => {
                    if (doubt.id === doubtId && doubt.teacherResponse) {
                        return {
                            ...doubt,
                            teacherResponse: {
                                ...doubt.teacherResponse,
                                upvotes:
                                    action === 'upvote'
                                        ? doubt.teacherResponse.upvotes + 1
                                        : doubt.teacherResponse.upvotes,
                                downvotes:
                                    action === 'downvote'
                                        ? doubt.teacherResponse.downvotes + 1
                                        : doubt.teacherResponse.downvotes,
                            },
                        };
                    }
                    return doubt;
                })
            );
        } else if (responseText) {
            setClubbedDoubts((doubts) =>
                doubts.map((doubt) =>
                    doubt.id === doubtId
                        ? {
                              ...doubt,
                              teacherResponse: {
                                  text: responseText,
                                  timestamp: new Date().toLocaleTimeString([], {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                  }),
                                  attachment: {
                                      type: 'document',
                                      name: 'example-solution.pdf',
                                  },
                                  upvotes: 0,
                                  downvotes: 0,
                              },
                          }
                        : doubt
                )
            );
        }
    };

    // Handle voting in the poll
    const handleVote = (optionIndex) => {
        const simulatedResults = activePoll.options.map((_, i) =>
            i === optionIndex
                ? 10 + Math.floor(Math.random() * 10)
                : Math.floor(Math.random() * 5)
        );
        setPollResults(simulatedResults);
        setActivePoll(null);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-50 font-sans overflow-scroll">
            {/* Left Panel - Class Interface */}
            <div className="flex-1 flex flex-col border-r border-gray-200 bg-white">
                {/* Class Header */}
                <div className=" bg-gradient-to-r from-indigo-700 to-purple-700 text-white p-[14px] flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <span className="text-xl">📐</span>
                        </div>
                        <div>
                            <h2 className="font-semibold">Advanced Algebra</h2>
                            <p className="text-xs opacity-80">
                                Live Session - Quadratic Equations
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 bg-white/10 px-3 py-1 rounded-full">
                            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
                            <span className="text-sm">LIVE</span>
                        </div>
                        <div className="text-sm bg-white/10 px-3 py-1 rounded-full flex items-center">
                            <span className="mr-1">👥</span>
                            <span>32</span>
                        </div>
                    </div>
                </div>

                {/* Video Area */}
                <div className="flex-1 relative bg-gray-900 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-indigo-900/30"></div>
                    <div className="relative min-h-[200px] z-10 text-center text-white p-6">
                        <div className="text-4xl md:text-6xl mb-2 md:mb-6 animate-pulse">
                            ▶️
                        </div>
                        <p className="text-xl md:text-2xl font-light mb-2">
                            Live Teaching Session
                        </p>
                        <p className="text-sm opacity-80">
                            Solving Quadratic Equations
                        </p>
                    </div>

                    {/* Floating Controls */}
                    <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 flex space-x-4">
                        <button
                            className="text-white hover:text-indigo-300 transition"
                            title="Toggle Microphone"
                        >
                            <span className="text-xl">🎤</span>
                        </button>
                        <button
                            className="text-white hover:text-indigo-300 transition"
                            title="Toggle Camera"
                        >
                            <span className="text-xl">📷</span>
                        </button>
                        <button
                            className="text-white hover:text-indigo-300 transition"
                            title="Share Screen"
                        >
                            <span className="text-xl">🖥️</span>
                        </button>
                    </div>
                </div>

                {/* Session Controls */}
                <div className="p-4 border-t border-gray-200 bg-white flex justify-between gap-2">
                    <button
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                        title="Pause the live session"
                    >
                        Pause Session
                    </button>
                    <div className="flex space-x-2">
                        <button
                            className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition"
                            title="Open teaching resources"
                        >
                            Resources
                        </button>
                        <button
                            onClick={() => navigate('/post')}
                            className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition"
                            title="End the current session"
                        >
                            End Class
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Panel - AI Assistant */}
            <div className="md:w-100 flex w-full flex-col bg-white border-l border-gray-200 shadow-xl">
                {/* Panel Header */}
                <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold text-indigo-800 flex items-center">
                            <span className="bg-indigo-100 text-indigo-600 p-2 rounded-lg mr-3">
                                🤖
                            </span>
                            AI Teaching Assistant
                        </h2>
                        <div className="flex space-x-1">
                            <button
                                className={`px-3 py-1 text-sm rounded-lg ${activeTab === 'clubbed' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                                onClick={() => setActiveTab('clubbed')}
                                title="View clustered doubts"
                            >
                                Clubbed
                            </button>
                            <button
                                className={`px-3 py-1 text-sm rounded-lg ${activeTab === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                                onClick={() => setActiveTab('all')}
                                title="View all individual doubts"
                            >
                                All
                            </button>
                        </div>
                    </div>
                </div>

                {/* Doubts List */}
                <div className="flex-1 overflow-y-auto p-4">
                    {/* Active Poll or Results */}
                    {activePoll && !pollResults && (
                        <Poll
                            question={activePoll.question}
                            options={activePoll.options}
                            onVote={handleVote}
                            onClose={() => setActivePoll(null)}
                        />
                    )}

                    {pollResults && (
                        <PollResults
                            poll={activePoll}
                            results={pollResults}
                            onClose={() => setPollResults(null)}
                        />
                    )}

                    {/* Doubts List Content */}
                    {activeTab === 'clubbed' ? (
                        <div className="divide-y divide-gray-100">
                            {clubbedDoubts.map((doubt) => (
                                <Doubt
                                    key={doubt.id}
                                    doubt={doubt}
                                    isActive={activeDoubt === doubt.id}
                                    onClick={() =>
                                        setActiveDoubt(
                                            activeDoubt === doubt.id
                                                ? null
                                                : doubt.id
                                        )
                                    }
                                    onRespond={(response) =>
                                        handleRespond(doubt.id, response)
                                    }
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {allDoubts.map((doubt) => (
                                <div
                                    key={doubt.id}
                                    className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                                >
                                    <div className="flex justify-between items-start">
                                        <p className="text-sm">{doubt.text}</p>
                                        <span className="text-xs text-gray-500">
                                            {doubt.timestamp}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2 mt-2">
                                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                                            {doubt.category}
                                        </span>
                                        <span className="text-xs text-gray-500 flex items-center">
                                            <span className="mr-1">👤</span>
                                            {doubt.student}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Action Panel */}
                <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            className="text-nowrap px-2 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition flex items-center justify-center space-x-2"
                            onClick={() => setShowInterventionModal(true)}
                            title="Get AI teaching suggestions"
                        >
                            <span>💡</span>
                            <span>Get Intervention</span>
                        </button>
                        <button
                            className="px-4 py-2 bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-lg transition flex items-center justify-center space-x-2"
                            onClick={() => setShowPollModal(true)}
                            title="Create a quick student poll"
                        >
                            <span>📊</span>
                            <span>Quick Poll</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {showInterventionModal && (
                <InterventionPopup
                    onClose={() => setShowInterventionModal(false)}
                    onCreatePoll={() => {
                        setShowInterventionModal(false);
                        setActivePoll({
                            question:
                                'Which method would you use to solve: x² + 5x + 6 = 0?',
                            options: [
                                'Factoring',
                                'Quadratic Formula',
                                'Completing Square',
                                'Graphing',
                            ],
                        });
                    }}
                />
            )}
            {showPollModal && (
                <CreatePollPopup
                    onClose={() => setShowPollModal(false)}
                    onCreate={(poll) => setActivePoll(poll)}
                />
            )}
        </div>
    );
}
