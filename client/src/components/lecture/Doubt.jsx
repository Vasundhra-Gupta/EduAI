import { useState } from 'react';
import {
    AIInsightCard,
    Response,
    SubDoubt,
    PriorityBadge,
    StudentCount,
} from '..';

export default function Doubt({ doubt, isActive, onClick, onRespond }) {
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
                        <StudentCount
                            count={doubt.subDoubts.reduce(
                                (sum, d) => sum + d.students,
                                0
                            )}
                        />
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
                        {doubt.subDoubts.map((sub) => (
                            <SubDoubt key={sub.id} subDoubt={sub} />
                        ))}
                    </div>

                    {doubt.teacherResponse ? (
                        <Response
                            response={doubt.teacherResponse}
                            onUpvote={() => onRespond(doubt.id, null, 'upvote')}
                            onDownvote={() =>
                                onRespond(doubt.id, null, 'downvote')
                            }
                        />
                    ) : showResponseForm ? (
                        <div className="mt-3 space-y-2">
                            <textarea
                                className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                                rows="3"
                                placeholder="Type your response here..."
                                value={responseText}
                                onChange={(e) =>
                                    setResponseText(e.target.value)
                                }
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
}
