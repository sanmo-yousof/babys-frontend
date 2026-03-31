import { useEffect, useRef } from 'react';
import type { User } from '../../../../libs/data';

// icons
import { MdDeleteOutline } from 'react-icons/md';
import { CiUser } from 'react-icons/ci';

export function AdminAction({
    user,
    onViewDetail,
    onDelete,
}: {
    user: User;
    onViewDetail: (user: User) => void;
    onDelete: (user: User) => void;
}) {
    // const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        function handleOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                // setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleOutside);
        return () => document.removeEventListener('mousedown', handleOutside);
    }, []);

    return (
        <div ref={ref} className="flex items-center gap-2.5">
            <button
                onClick={() => {
                    // setOpen(false);
                    onViewDetail(user);
                }}
                className="flex items-center gap-2 px-4 py-2 font-roboto text-[12px] md:text-base bg-[#5b8db8] hover:bg-blue-900 text-white transition-colors text-left border rounded-md cursor-pointer"
            >
                <span>
                    <CiUser className="text-base md:text-lg" />
                </span>
                Details
            </button>

            <button
                onClick={() => {
                    // setOpen(false);
                    onDelete(user);
                }}
                className="flex items-center gap-2 px-4 py-2 font-roboto text-[12px] md:text-base bg-red-500 hover:bg-red-700 text-white transition-colors text-left border rounded-md cursor-pointer"
            >
                <MdDeleteOutline className="text-base md:text-lg" />
                Delete
            </button>
        </div>
    );
}
