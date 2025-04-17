import { StudentCount } from '..';

export default function SubDoubt({ subDoubt }) {
    return (
        <div className="p-2 bg-gray-50 rounded border border-gray-100">
            <div className="flex justify-between items-start">
                <p className="text-sm">{subDoubt.text}</p>
                <span className="text-xs text-gray-500">
                    {subDoubt.timestamp}
                </span>
            </div>
            <div className="flex items-center space-x-3 mt-1">
                <StudentCount count={subDoubt.students} />
            </div>
        </div>
    );
}
