import { useState } from 'react';

export default function Poll({ question, options, onVote, onClose }) {
    const [selectedOption, setSelectedOption] = useState(null);

    return (
        <div className="bg-white border border-indigo-200 rounded-lg shadow-md mb-4 p-4">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-indigo-700">
                    Live Poll: {question}
                </h3>
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
                            <div
                                className={`w-4 h-4 rounded-full border mr-2 flex-shrink-0 ${selectedOption === index ? 'border-indigo-500 bg-indigo-500' : 'border-gray-400'}`}
                            ></div>
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
}
