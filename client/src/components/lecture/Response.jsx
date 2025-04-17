export default function Response({ response, onUpvote, onDownvote }) {
    return (
        <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-lg">
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                    <span className="bg-blue-100 text-blue-600 p-1 rounded-full mr-2">
                        👨‍🏫
                    </span>
                    <span className="text-sm font-medium text-blue-800">
                        Teacher's Response
                    </span>
                </div>
                <span className="text-xs text-gray-500">
                    {response.timestamp}
                </span>
            </div>
            <p className="text-sm mb-3">{response.text}</p>
            {response.attachment && (
                <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Attachment:</p>
                    <span className="text-xs bg-white border border-blue-200 px-2 py-0.5 rounded-full">
                        {response.attachment.type === 'image' ? '🖼️' : '📄'}{' '}
                        {response.attachment.name}
                    </span>
                </div>
            )}
            <div className="flex items-center space-x-3">
                <button
                    className="flex items-center text-xs bg-white border border-green-200 text-green-600 px-2 py-0.5 rounded-full hover:bg-green-50"
                    onClick={onUpvote}
                >
                    <span className="mr-1">👍</span> Helpful ({response.upvotes}
                    )
                </button>
                <button
                    className="flex items-center text-xs bg-white border border-red-200 text-red-600 px-2 py-0.5 rounded-full hover:bg-red-50"
                    onClick={onDownvote}
                >
                    <span className="mr-1">👎</span> Unclear (
                    {response.downvotes})
                </button>
            </div>
        </div>
    );
}
