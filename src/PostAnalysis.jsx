import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';

// Register Chart.js components
Chart.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function PostAnalysis() {
  const navigate = useNavigate();
  
  const topics = [
    {
      name: "Quadratic Equations",
      mastery: 65,
      doubts: 14,
      engagement: 82,
      clubbedDoubts: [
        {
          id: 'qd1',
          summary: "Formula applications",
          priority: "high",
          subDoubts: [
            { text: "When to use formula vs factoring", students: 12, upvotes: 8 },
            { text: "Real-world applications", students: 7, upvotes: 5 },
            { text: "Complex roots interpretation", students: 5, upvotes: 3 },
            { text: "Vertex form conversion", students: 4, upvotes: 2 }
          ]
        },
        {
          id: 'qd2',
          summary: "Graph interpretation",
          priority: "medium",
          subDoubts: [
            { text: "Finding vertex from graph", students: 8, upvotes: 6 },
            { text: "Axis of symmetry", students: 5, upvotes: 4 }
          ]
        }
      ],
      resources: ["Video: Quadratic Applications", "Worksheet: Formula Practice"]
    },
    {
      name: "Polynomial Factoring",
      mastery: 78,
      doubts: 8,
      engagement: 76,
      clubbedDoubts: [
        {
          id: 'pf1',
          summary: "Advanced techniques",
          priority: "medium",
          subDoubts: [
            { text: "Factoring trinomials with a≠1", students: 9, upvotes: 6 },
            { text: "Difference of squares", students: 6, upvotes: 4 },
            { text: "Sum/product method", students: 4, upvotes: 3 }
          ]
        }
      ],
      resources: ["Visual Guide: Factoring Methods"]
    }
  ];

  const recommendations = [
    {
      title: "Review quadratic formula applications",
      priority: "high",
      type: "Content Review",
      details: "Focus on real-world examples and comparison with factoring method"
    },
    {
      title: "Practice complex equation solving",
      priority: "medium",
      type: "Practice Session",
      details: "Include problems with negative discriminants"
    }
  ];

  const doubtDistributionData = {
    labels: ['Quadratic Equations', 'Polynomial Factoring', 'Graphing', 'Word Problems'],
    datasets: [
      {
        data: [14, 8, 5, 3],
        backgroundColor: [
          'rgba(79, 70, 229, 0.8)',
          'rgba(99, 102, 241, 0.8)',
          'rgba(129, 140, 248, 0.8)',
          'rgba(167, 139, 250, 0.8)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const timelineData = {
    labels: ['0:00', '5:00', '10:00', '15:00', '20:00', '25:00', '30:00', '35:00', '40:00'],
    datasets: [
      {
        label: 'Engagement',
        data: [65, 72, 80, 76, 82, 78, 85, 82, 88],
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      },
      {
        label: 'Doubts Raised',
        data: [0, 2, 5, 8, 12, 15, 18, 20, 22],
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 2,
        tension: 0.4
      }
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Session Analysis</h1>
            <p className="text-sm text-gray-600">Advanced Algebra - Quadratic Equations</p>
          </div>
          <div className="flex space-x-2 w-full sm:w-auto">
            <button className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center">
              <span className="mr-1">📤</span>
              Export
            </button>
            <button onClick={()=>navigate("/test")} className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center">
              <span className="mr-1">✏️</span>
              Generate Test
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white p-3 rounded-lg shadow-xs border border-gray-200">
            <p className="text-xs text-gray-500">Class Mastery</p>
            <p className="text-xl font-bold">72%</p>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 h-1.5 rounded-full" style={{ width: '72%' }}></div>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-lg shadow-xs border border-gray-200">
            <p className="text-xs text-gray-500">Total Doubts</p>
            <p className="text-xl font-bold">22</p>
          </div>
          
          <div className="bg-white p-3 rounded-lg shadow-xs border border-gray-200">
            <p className="text-xs text-gray-500">Active Students</p>
            <p className="text-xl font-bold">28/32</p>
          </div>
          
          <div className="bg-white p-3 rounded-lg shadow-xs border border-gray-200">
            <p className="text-xs text-gray-500">Avg. Engagement</p>
            <p className="text-xl font-bold">84%</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded-lg shadow-xs border border-gray-200">
            <h3 className="text-sm font-medium mb-2">Doubt Distribution</h3>
            <div className="h-40">
              <Doughnut 
                data={doubtDistributionData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: 'bottom' } }
                }}
              />
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-lg shadow-xs border border-gray-200">
            <h3 className="text-sm font-medium mb-2">Session Timeline</h3>
            <div className="h-40">
              <Bar
                data={timelineData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: { y: { beginAtZero: true, max: 100 } },
                  plugins: { legend: { position: 'bottom' } }
                }}
              />
            </div>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {topics.map(topic => (
            <div key={topic.name} className="bg-white rounded-lg shadow-xs border border-gray-200 overflow-hidden">
              <div className="p-3 border-b flex justify-between items-center">
                <h2 className="font-medium text-gray-800">{topic.name}</h2>
                <div className="flex items-center space-x-2">
                  <div className="text-center">
                    <div className="w-12 h-12 relative">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#e6e6e6"
                          strokeWidth="3"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke={topic.mastery > 70 ? "#10b981" : "#f59e0b"}
                          strokeWidth="3"
                          strokeDasharray={`${topic.mastery}, 100`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                        {topic.mastery}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 border-b grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-xs text-gray-500">Doubts</p>
                  <p className="font-semibold">{topic.doubts}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Engagement</p>
                  <p className="font-semibold">{topic.engagement}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Resources</p>
                  <p className="font-semibold">{topic.resources.length}</p>
                </div>
              </div>
              
              {/* Doubts Grid */}
              <div className="p-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                {topic.clubbedDoubts.map(doubt => (
                  <div key={doubt.id} className="border rounded-lg p-2 hover:bg-gray-50 transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-1 mb-1">
                          <span className={`px-1.5 py-0.5 text-[10px] rounded-full ${
                            doubt.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                          }`}>
                            {doubt.priority}
                          </span>
                          <span className="text-[10px] text-gray-500">
                            {doubt.subDoubts.length} sub-doubts
                          </span>
                        </div>
                        <h3 className="text-sm font-medium">{doubt.summary}</h3>
                      </div>
                    </div>
                    
                    <div className="mt-2 space-y-1">
                      {doubt.subDoubts.map((sub, i) => (
                        <div key={i} className="pl-2 border-l-2 border-gray-200 py-0.5">
                          <p className="text-xs line-clamp-1" title={sub.text}>{sub.text}</p>
                          <div className="flex items-center space-x-2 mt-0.5 text-[10px] text-gray-500">
                            <span>👤 {sub.students}</span>
                            <span>👍 {sub.upvotes}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {topic.resources.length > 0 && (
                <div className="p-2 bg-gray-50 border-t">
                  <h4 className="text-xs font-medium text-gray-700 mb-1">Resources</h4>
                  <div className="flex flex-wrap gap-1">
                    {topic.resources.map((resource, i) => (
                      <span key={i} className="text-[10px] bg-white border border-gray-200 px-1.5 py-0.5 rounded-full">
                        {resource}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-lg shadow-xs border border-gray-200 overflow-hidden">
          <div className="p-3 border-b bg-indigo-600">
            <h2 className="text-sm font-semibold text-white">AI Recommendations</h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            {recommendations.map((rec, i) => (
              <div key={i} className="p-3 hover:bg-indigo-50/50 transition">
                <div className="flex items-start">
                  <div className={`p-1 rounded mr-2 text-xs ${
                    rec.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                  }`}>
                    {rec.priority === 'high' ? '⚠️' : '💡'}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium">{rec.title}</h3>
                      <span className="text-[10px] bg-gray-100 text-gray-600 px-1 py-0.5 rounded">
                        {rec.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-0.5">{rec.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}