export default function AIInsightCard({ insight }) {
    return (
        <div className="p-3 bg-white border border-gray-200 rounded-lg">
            <h4 className="text-xs font-semibold text-gray-500 mb-1">
                AI INSIGHT
            </h4>
            <p className="text-sm">{insight}</p>
        </div>
    );
}
