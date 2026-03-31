import { AiOutlineWarning } from 'react-icons/ai';
import type { User } from '../../libs/data';

function IconClose() {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
        >
            <path d="M3 3l10 10M13 3L3 13" />
        </svg>
    );
}

export function DeleteConfirmModal({
    user,
    onConfirm,
    onCancel,
}: {
    user: User;
    onConfirm: (user: User) => void;
    onCancel: () => void;
}) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            onClick={onCancel}
        >
            <div
                className="bg-soft-white border border-lightgrey rounded-xl w-full max-w-sm overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-5 py-4 border-b border-lightgrey flex items-center justify-between">
                    <h3 className="font-roboto-slab text-[15px] font-bold text-darkgrey">
                        <span className="text-orange">Delete</span> User
                    </h3>
                    <button
                        onClick={onCancel}
                        className="text-mid-grey hover:text-darkgrey transition-colors"
                    >
                        <IconClose />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col items-center gap-4 text-center">
                    <AiOutlineWarning className="text-3xl text-orange" />
                    <div>
                        <p className="font-roboto-slab text-[15px] font-bold text-darkgrey">
                            Are your sure you want to delete? <br />
                            <span className="text-orange">{user.name}</span>
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-3 w-full mt-1">
                        <button
                            onClick={onCancel}
                            className="flex-1 py-2 font-roboto text-[12px] text-darkgrey bg-[#f0ede4] border border-lightgrey rounded-lg hover:bg-lightgrey/60 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => onConfirm(user)}
                            className="flex-1 py-2 font-roboto text-[12px] text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                        >
                            OK, Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
