import { useState } from 'react';

export default function CreatePollPopup({ onClose, onCreate }) {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState('');

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h3 className="text-lg font-semibold mb-4">
                    Create Quick Poll
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Poll Question
                        </label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            placeholder="E.g. Which method would you use to solve this?"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Options (comma separated)
                        </label>
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
                                options: options
                                    .split(',')
                                    .map((opt) => opt.trim()),
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
}
