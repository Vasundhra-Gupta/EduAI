export default function PriorityBadge({ urgency }) {
    const config = {
        high: { color: 'bg-red-100 text-red-600', label: 'High Priority' },
        medium: {
            color: 'bg-amber-100 text-amber-600',
            label: 'Medium Priority',
        },
        low: { color: 'bg-blue-100 text-blue-600', label: 'Low Priority' },
    };

    return (
        <span
            className={`px-2 py-0.5 text-xs rounded-full ${config[urgency].color}`}
        >
            {config[urgency].label}
        </span>
    );
}
