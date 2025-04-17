export default function InterventionPopup({ onClose, onCreatePoll }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h3 className="text-lg font-semibold mb-4">
                    AI Suggested Intervention
                </h3>
                <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                        Based on clustered doubts about{' '}
                        <span className="font-medium">
                            Quadratic Applications
                        </span>
                        , I recommend:
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
}
