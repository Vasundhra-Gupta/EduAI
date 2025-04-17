export default function StudentCount({ count }) {
    return (
        <span className="flex items-center text-xs text-gray-500">
            <span className="mr-1">👥</span>
            {count} students
        </span>
    );
}
