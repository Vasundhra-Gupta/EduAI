import { useState } from 'react';

export default function Test() {
    const questions = [
      {
        id: 1,
        text: "Which method is most efficient for solving x² + 5x + 6 = 0?",
        options: [
          { id: 'a', text: "Quadratic formula", correct: false },
          { id: 'b', text: "Factoring", correct: true },
          { id: 'c', text: "Completing the square", correct: false },
          { id: 'd', text: "Graphical method", correct: false }
        ],
        source: "From 12 student doubts about factoring",
        difficulty: "Medium",
        topic: "Quadratic Equations",
        points: 100,
        timeBonus: 15 // seconds for time bonus
      },
      {
        id: 2,
        text: "What is the first step when factoring 2x² + 7x + 3?",
        options: [
          { id: 'a', text: "Find factors of 2 and 3", correct: true },
          { id: 'b', text: "Multiply a and c", correct: false },
          { id: 'c', text: "Use quadratic formula", correct: false },
          { id: 'd', text: "Complete the square", correct: false }
        ],
        source: "From 9 student doubts about advanced factoring",
        difficulty: "Hard",
        topic: "Polynomial Factoring",
        points: 150,
        timeBonus: 20
      }
    ];
  
    const testStats = {
      totalQuestions: 8,
      estimatedTime: "15-20 mins",
      coverage: ["Quadratic Equations (75%)", "Factoring (25%)"],
      difficulty: "60% Medium, 40% Hard",
      totalPoints: 1000,
      streakBonus: true,
      powerUps: ["Double Points", "Time Freeze", "50/50"]
    };

    const [gameMode, setGameMode] = useState("adventure"); // adventure, time-attack, versus
    const [playerStats, setPlayerStats] = useState({
      points: 0,
      streak: 0,
      powerUps: 3,
      avatar: "🧙‍♂️",
      level: 1
    });

    const handleAnswer = (questionId, optionId, isCorrect) => {
      // Update player stats based on answer
      setPlayerStats(prev => {
        const newStreak = isCorrect ? prev.streak + 1 : 0;
        const streakBonus = newStreak >= 3 ? Math.floor(newStreak / 3) * 50 : 0;
        const questionPoints = questions.find(q => q.id === questionId).points;
        
        return {
          ...prev,
          points: prev.points + (isCorrect ? questionPoints : 0) + streakBonus,
          streak: newStreak,
          level: Math.floor((prev.points + (isCorrect ? questionPoints : 0)) / 200 + 1)
        };
      });
    };

    const usePowerUp = (powerUp) => {
      setPlayerStats(prev => ({
        ...prev,
        powerUps: prev.powerUps - 1
      }));
      // Add power-up specific logic here
    };
  
    return (
      <div className="min-h-screen bg-gray-50 p-5">
        <div className="max-w-4xl mx-auto">
          {/* Header with Player Stats */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Math Quest</h1>
              <p className="text-gray-600">Earn points, unlock achievements!</p>
            </div>
            <div className="flex items-center justify-evenly space-x-4 bg-white p-3 rounded-lg shadow-sm">
              <div className="text-center">
                <div className="text-2xl">{playerStats.avatar}</div>
                <div className="text-xs">Level {playerStats.level}</div>
              </div>
              <div className="border-l border-gray-200 h-10"></div>
              <div>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="font-bold">{playerStats.points}</span>
                </div>
                <div className="text-xs text-gray-500">
                  Streak: {playerStats.streak} {playerStats.streak >= 3 && "🔥"}
                </div>
              </div>
              <div className="border-l border-gray-200 h-10"></div>
              <div>
                <div className="flex space-x-1">
                  {[...Array(playerStats.powerUps)].map((_, i) => (
                    <span key={i} className="text-blue-500">✨</span>
                  ))}
                </div>
                <div className="text-xs text-gray-500">Power-ups</div>
              </div>
            </div>
          </div>

          {/* Game Mode Selector */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <button 
              onClick={() => setGameMode("adventure")}
              className={`p-3 rounded-lg border-2 ${gameMode === "adventure" ? "border-indigo-500 bg-indigo-50" : "border-gray-200"}`}
            >
              <div className="text-xl mb-1">🏰</div>
              <div className="font-medium">Adventure</div>
              <div className="text-xs text-gray-500">Learn at your pace</div>
            </button>
            <button 
              onClick={() => setGameMode("time-attack")}
              className={`p-3 rounded-lg border-2 ${gameMode === "time-attack" ? "border-red-500 bg-red-50" : "border-gray-200"}`}
            >
              <div className="text-xl mb-1">⏱️</div>
              <div className="font-medium">Time Attack</div>
              <div className="text-xs text-gray-500">Beat the clock</div>
            </button>
            <button 
              onClick={() => setGameMode("versus")}
              className={`p-3 rounded-lg border-2 ${gameMode === "versus" ? "border-green-500 bg-green-50" : "border-gray-200"}`}
            >
              <div className="text-xl mb-1">⚔️</div>
              <div className="font-medium">Versus</div>
              <div className="text-xs text-gray-500">Challenge friends</div>
            </button>
          </div>
  
          {/* Test Overview - Now as a Game Info Card */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-100 opacity-20 rounded-bl-full"></div>
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">📜</span> Quest Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Total Challenges</p>
                  <p className="text-2xl font-bold">{testStats.totalQuestions}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Possible XP</p>
                  <p className="text-2xl font-bold">{testStats.totalPoints}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Topics</p>
                  <p className="text-lg font-semibold">{testStats.coverage.join(', ')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Special Bonuses</p>
                  <p className="text-lg font-semibold">{testStats.streakBonus ? "Streak Rewards ✅" : "None"}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-sm font-medium mb-2">Available Power-ups:</p>
                <div className="flex space-x-2">
                  {testStats.powerUps.map(power => (
                    <span key={power} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {power}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
  
          {/* Questions List - Now as Challenges */}
          <div className="space-y-6 mb-6">
            {questions.map(question => (
              <div key={question.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
                {question.difficulty === "Hard" && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    BOSS BATTLE
                  </div>
                )}
                
                <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">Challenge #{question.id}</span>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                      {question.topic}
                    </span>
                    <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded-full">
                      {question.points} XP
                    </span>
                    {gameMode === "time-attack" && (
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                        +{question.timeBonus}s bonus
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="mb-4 text-lg">{question.text}</p>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {question.options.map(option => (
                      <button
                        key={option.id}
                        onClick={() => handleAnswer(question.id, option.id, option.correct)}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                          option.correct 
                            ? "hover:border-green-500 hover:bg-green-50" 
                            : "hover:border-red-500 hover:bg-red-50"
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="mr-3 font-medium">{option.id.toUpperCase()}</span>
                          <span>{option.text}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      <span className="font-medium">Source:</span> {question.source}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
  
          {/* Test Actions - Now as Game Controls */}
          <div className="bg-white rounded-xl mb-34 shadow-sm border border-gray-200 p-4">
            <div className="flex md:flex-row flex-col md:justify-between gap-4 md:items-center">
              <div>
                <h3 className="font-medium">Quest Controls</h3>
                <p className="text-sm text-gray-500">Manage your adventure</p>
              </div>
              <div className="flex space-x-3 flex-col md:flex-row gap-3">
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center">
                  <span className="mr-2">🔄</span>
                  Shuffle Challenges
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center">
                  <span className="mr-2">⚡</span>
                  Use Power-up
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center">
                  <span className="mr-2">🏁</span>
                  Complete Quest
                </button>
              </div>
            </div>
          </div>

          {/* Achievement Toast (would appear conditionally) */}
          <div className="fixed z-[10] bottom-4 right-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg shadow-lg max-w-xs animate-bounce">
            <div className="flex items-start">
              <div className="text-xl mr-3">🏆</div>
              <div>
                <p className="font-bold">Achievement Unlocked!</p>
                <p className="text-sm">3-in-a-row: Answered 3 questions correctly consecutively</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }