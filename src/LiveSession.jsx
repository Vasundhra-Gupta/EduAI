import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Priority Badge Component
const PriorityBadge = ({ urgency }) => {
  const config = {
    high: { color: 'bg-red-100 text-red-600', label: 'High Priority' },
    medium: { color: 'bg-amber-100 text-amber-600', label: 'Medium Priority' },
    low: { color: 'bg-blue-100 text-blue-600', label: 'Low Priority' }
  };
  
  return (
    <span className={`px-2 py-0.5 text-xs rounded-full ${config[urgency].color}`}>
      {config[urgency].label}
    </span>
  );
};

// Student Count Component
const StudentCount = ({ count }) => (
  <span className="flex items-center text-xs text-gray-500">
    <span className="mr-1">👥</span>
    {count} students
  </span>
);

// AI Insight Card Component
const AIInsightCard = ({ insight }) => (
  <div className="p-3 bg-white border border-gray-200 rounded-lg">
    <h4 className="text-xs font-semibold text-gray-500 mb-1">AI INSIGHT</h4>
    <p className="text-sm">{insight}</p>
  </div>
);

// Teacher Response Component
const TeacherResponse = ({ response, onUpvote, onDownvote }) => (
  <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-lg">
    <div className="flex justify-between items-start mb-2">
      <div className="flex items-center">
        <span className="bg-blue-100 text-blue-600 p-1 rounded-full mr-2">👨‍🏫</span>
        <span className="text-sm font-medium text-blue-800">Teacher's Response</span>
      </div>
      <span className="text-xs text-gray-500">{response.timestamp}</span>
    </div>
    <p className="text-sm mb-3">{response.text}</p>
    {response.attachment && (
      <div className="mb-3">
        <p className="text-xs text-gray-500 mb-1">Attachment:</p>
        <span className="text-xs bg-white border border-blue-200 px-2 py-0.5 rounded-full">
          {response.attachment.type === 'image' ? '🖼️' : '📄'} {response.attachment.name}
        </span>
      </div>
    )}
    <div className="flex items-center space-x-3">
      <button 
        className="flex items-center text-xs bg-white border border-green-200 text-green-600 px-2 py-0.5 rounded-full hover:bg-green-50"
        onClick={onUpvote}
      >
        <span className="mr-1">👍</span> Helpful ({response.upvotes})
      </button>
      <button 
        className="flex items-center text-xs bg-white border border-red-200 text-red-600 px-2 py-0.5 rounded-full hover:bg-red-50"
        onClick={onDownvote}
      >
        <span className="mr-1">👎</span> Unclear ({response.downvotes})
      </button>
    </div>
  </div>
);

// Doubt Item Component
const DoubtItem = ({ doubt, isActive, onClick, onRespond }) => {
  const [responseText, setResponseText] = useState('');
  const [showResponseForm, setShowResponseForm] = useState(false);

  const handleSubmit = () => {
    if (responseText.trim()) {
      onRespond(responseText);
      setResponseText('');
      setShowResponseForm(false);
    }
  };

  return (
    <div 
      className={`p-4 transition-all ${isActive ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <PriorityBadge urgency={doubt.urgency} />
            <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full">
              {doubt.category}
            </span>
          </div>
          <h3 className="font-medium">{doubt.summary}</h3>
          <div className="flex items-center space-x-3 mt-1">
            <StudentCount count={doubt.subDoubts.reduce((sum, d) => sum + d.students, 0)} />
          </div>
        </div>
        <button className="text-indigo-600 hover:text-indigo-800">
          {isActive ? '▲' : '▼'}
        </button>
      </div>
      
      {isActive && (
        <div className="mt-3 space-y-3 animate-fadeIn px-0 pb-4">
          <AIInsightCard insight={doubt.aiInsight} />
          
          <div className="space-y-2">
            {doubt.subDoubts.map(sub => <SubDoubtItem subDoubt={sub}/>)}
          </div>
          
          {doubt.teacherResponse ? (
            <TeacherResponse 
              response={doubt.teacherResponse}
              onUpvote={() => onRespond(doubt.id, null, 'upvote')}
              onDownvote={() => onRespond(doubt.id, null, 'downvote')}
            />
          ) : showResponseForm ? (
            <div className="mt-3 space-y-2">
              <textarea
                className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                rows="3"
                placeholder="Type your response here..."
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
              />
              <div className="flex justify-end space-x-2">
                <button 
                  className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                  onClick={() => setShowResponseForm(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  onClick={handleSubmit}
                >
                  Post Response
                </button>
              </div>
            </div>
          ) : (
            <button 
              className="w-full py-2 bg-white border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition flex items-center justify-center space-x-2"
              onClick={(e) => {
                e.stopPropagation();
                setShowResponseForm(true);
              }}
            >
              <span>✏️</span>
              <span>Respond to This Doubt</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// SubDoubt Item Component
const SubDoubtItem = ({ subDoubt }) => (
  <div className="p-2 bg-gray-50 rounded border border-gray-100">
    <div className="flex justify-between items-start">
      <p className="text-sm">{subDoubt.text}</p>
      <span className="text-xs text-gray-500">{subDoubt.timestamp}</span>
    </div>
    <div className="flex items-center space-x-3 mt-1">
      <StudentCount count={subDoubt.students} />
    </div>
  </div>
);

// Live Poll Component
const LivePoll = ({ question, options, onVote, onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  
  return (
    <div className="bg-white border border-indigo-200 rounded-lg shadow-md mb-4 p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-indigo-700">Live Poll: {question}</h3>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Close poll"
        >
          ×
        </button>
      </div>
      <div className="space-y-2 mb-3">
        {options.map((option, index) => (
          <div 
            key={index}
            className={`p-2 rounded border cursor-pointer transition-all ${selectedOption === index ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'}`}
            onClick={() => setSelectedOption(index)}
          >
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full border mr-2 flex-shrink-0 ${selectedOption === index ? 'border-indigo-500 bg-indigo-500' : 'border-gray-400'}`}></div>
              <span>{option}</span>
            </div>
          </div>
        ))}
      </div>
      <button 
        className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        disabled={selectedOption === null}
        onClick={() => onVote(selectedOption)}
      >
        Submit Vote
      </button>
    </div>
  );
};

// Poll Results Component
const PollResults = ({ poll, results, onClose }) => {
  const totalVotes = results.reduce((sum, count) => sum + count, 0);
  
  return (
    <div className="bg-white border border-indigo-200 rounded-lg shadow-md mb-4 p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-indigo-700">Poll Results: {poll.question}</h3>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Close results"
        >
          ×
        </button>
      </div>
      <div className="space-y-3">
        {poll.options.map((option, index) => {
          const percentage = totalVotes > 0 ? Math.round((results[index] / totalVotes) * 100) : 0;
          
          return (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span>{option}</span>
                <span className="text-sm text-gray-600">{percentage}% ({results[index]})</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 text-sm text-gray-500">
        Total votes: {totalVotes} of 32 students
      </div>
    </div>
  );
};

// Intervention Modal Component
const InterventionModal = ({ onClose, onCreatePoll }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 max-w-md w-full">
      <h3 className="text-lg font-semibold mb-4">AI Suggested Intervention</h3>
      <div className="space-y-3">
        <p className="text-sm text-gray-600">
          Based on clustered doubts about <span className="font-medium">Quadratic Applications</span>, 
          I recommend:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>Show real-world example (projectile motion)</li>
          <li>Compare factoring vs formula on same problem</li>
          <li>Quick poll: "Which method would you use for..."</li>
        </ul>
      </div>
      <div className="mt-6 flex justify-end space-x-3">
        <button 
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          onClick={onClose}
        >
          Cancel
        </button>
        <button 
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          onClick={onCreatePoll}
        >
          Create Poll
        </button>
      </div>
    </div>
  </div>
);

// Poll Modal Component
const PollModal = ({ onClose, onCreate }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState("");
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold mb-4">Create Quick Poll</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Poll Question</label>
            <input 
              type="text" 
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="E.g. Which method would you use to solve this?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Options (comma separated)</label>
            <input 
              type="text" 
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Factoring, Quadratic Formula, Completing Square"
              value={options}
              onChange={(e) => setOptions(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button 
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            onClick={() => {
              onCreate({
                question,
                options: options.split(',').map(opt => opt.trim())
              });
              onClose();
            }}
            disabled={!question || !options}
          >
            Launch Poll
          </button>
        </div>
      </div>
    </div>
  );
};

export default function CompleteTeachingInterface() {
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
      summary: "Quadratic formula applications",
      category: "Algebra",
      urgency: "high",
      subDoubts: [
        { id: 'alg1-1', text: "When to use quadratic formula vs factoring?", students: 12, timestamp: "12:45" },
        { id: 'alg1-2', text: "Real-world applications of the formula", students: 9, timestamp: "12:50" }
      ],
      aiInsight: "Students need help connecting formulas to real applications",
      teacherResponse: {
        text: "The quadratic formula works for all cases, but factoring is faster when the equation is factorable. For real-world applications, think about projectile motion - the path of a ball follows a quadratic curve!",
        timestamp: "12:55",
        attachment: { type: 'image', name: 'projectile-example.png' },
        upvotes: 15,
        downvotes: 2
      }
    },
    {
      id: 'alg2',
      summary: "Polynomial factoring techniques",
      category: "Algebra",
      urgency: "medium",
      subDoubts: [
        { id: 'alg2-1', text: "How to factor trinomials with a≠1?", students: 9, timestamp: "13:00" }
      ],
      aiInsight: "Visual demonstrations would help with factoring steps",
      teacherResponse: null
    },
    {
      id: 'wp1',
      summary: "Quadratic word problems",
      category: "Application",
      urgency: "high",
      subDoubts: [
        { id: 'wp1-1', text: "How to set up projectile motion problems?", students: 14, timestamp: "13:35" }
      ],
      aiInsight: "Students struggle with translating word problems to equations",
      teacherResponse: null
    }
  ]);

  // All individual doubts
  const allDoubts = [
    { id: 'alg-d1', text: "Why does the discriminant matter?", student: "Alice", timestamp: "12:38", category: "Algebra" },
    { id: 'alg-d2', text: "Can we derive the quadratic formula?", student: "Bob", timestamp: "12:42", category: "Algebra" },
    { id: 'alg-d3', text: "What's the difference between roots and zeros?", student: "Charlie", timestamp: "12:47", category: "Algebra" }
  ];

  // Handle teacher response
  const handleRespond = (doubtId, responseText, action) => {
    if (action === 'upvote' || action === 'downvote') {
      setClubbedDoubts(doubts => doubts.map(doubt => {
        if (doubt.id === doubtId && doubt.teacherResponse) {
          return {
            ...doubt,
            teacherResponse: {
              ...doubt.teacherResponse,
              upvotes: action === 'upvote' ? doubt.teacherResponse.upvotes + 1 : doubt.teacherResponse.upvotes,
              downvotes: action === 'downvote' ? doubt.teacherResponse.downvotes + 1 : doubt.teacherResponse.downvotes
            }
          };
        }
        return doubt;
      }));
    } else if (responseText) {
      setClubbedDoubts(doubts => doubts.map(doubt => 
        doubt.id === doubtId 
          ? { 
              ...doubt, 
              teacherResponse: {
                text: responseText,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' }),
                attachment: { type: 'document', name: 'example-solution.pdf' },
                upvotes: 0,
                downvotes: 0
              }
            } 
          : doubt
      ));
    }
  };

  // Handle voting in the poll
  const handleVote = (optionIndex) => {
    const simulatedResults = activePoll.options.map((_, i) => 
      i === optionIndex ? 10 + Math.floor(Math.random() * 10) : Math.floor(Math.random() * 5)
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
              <p className="text-xs opacity-80">Live Session - Quadratic Equations</p>
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
            <div className="text-4xl md:text-6xl mb-2 md:mb-6 animate-pulse">▶️</div>
            <p className="text-xl md:text-2xl font-light mb-2">Live Teaching Session</p>
            <p className="text-sm opacity-80">Solving Quadratic Equations</p>
          </div>
          
          {/* Floating Controls */}
          <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 flex space-x-4">
            <button className="text-white hover:text-indigo-300 transition" title="Toggle Microphone">
              <span className="text-xl">🎤</span>
            </button>
            <button className="text-white hover:text-indigo-300 transition" title="Toggle Camera">
              <span className="text-xl">📷</span>
            </button>
            <button className="text-white hover:text-indigo-300 transition" title="Share Screen">
              <span className="text-xl">🖥️</span>
            </button>
          </div>
        </div>

        {/* Session Controls */}
        <div className="p-4 border-t border-gray-200 bg-white flex justify-between gap-2">
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition" title="Pause the live session">
            Pause Session
          </button>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition" title="Open teaching resources">
              Resources
            </button>
            <button onClick={()=>navigate('/post')} className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition" title="End the current session">
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
              <span className="bg-indigo-100 text-indigo-600 p-2 rounded-lg mr-3">🤖</span>
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
            <LivePoll 
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
              {clubbedDoubts.map(doubt => (
                <DoubtItem
                  key={doubt.id}
                  doubt={doubt}
                  isActive={activeDoubt === doubt.id}
                  onClick={() => setActiveDoubt(activeDoubt === doubt.id ? null : doubt.id)}
                  onRespond={(response) => handleRespond(doubt.id, response)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {allDoubts.map(doubt => (
                <div key={doubt.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start">
                    <p className="text-sm">{doubt.text}</p>
                    <span className="text-xs text-gray-500">{doubt.timestamp}</span>
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
        <InterventionModal 
          onClose={() => setShowInterventionModal(false)}
          onCreatePoll={() => {
            setShowInterventionModal(false);
            setActivePoll({
              question: "Which method would you use to solve: x² + 5x + 6 = 0?",
              options: ["Factoring", "Quadratic Formula", "Completing Square", "Graphing"]
            });
          }}
        />
      )}
      {showPollModal && (
        <PollModal 
          onClose={() => setShowPollModal(false)}
          onCreate={(poll) => setActivePoll(poll)}
        />
      )}
    </div>
  );
}