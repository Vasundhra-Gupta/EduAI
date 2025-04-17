export default function PollResults({ poll, results, onClose }) {
    const totalVotes = results.reduce((sum, count) => sum + count, 0);

    return (
        <div className="bg-white border border-indigo-200 rounded-lg shadow-md mb-4 p-4">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-indigo-700">
                    Poll Results: {poll.question}
                </h3>
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
                    const percentage =
                        totalVotes > 0
                            ? Math.round((results[index] / totalVotes) * 100)
                            : 0;

                    return (
                        <div key={index}>
                            <div className="flex justify-between mb-1">
                                <span>{option}</span>
                                <span className="text-sm text-gray-600">
                                    {percentage}% ({results[index]})
                                </span>
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
}
