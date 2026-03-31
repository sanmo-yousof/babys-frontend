import type { UserDetail } from "../../types/UserDetail";

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

function formatDate(iso: string): string {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

function getInitials(firstName: string, lastName: string): string {
    return `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase();
}

export function UserDetailModal({ detail, onClose }: { detail: UserDetail; onClose: () => void }) {
    const fullName = `${detail.firstName} ${detail.lastName}`;
    const initials = getInitials(detail.firstName, detail.lastName);

    const fields = [
        { label: 'Full Name', value: fullName },
        { label: 'Email', value: detail.email },
        { label: 'Role', value: detail.role },
        { label: 'Birthday', value: formatDate(detail.birthday) },
        { label: 'Joined', value: formatDate(detail.createdAt) },
        { label: 'Last Update', value: formatDate(detail.updatedAt) },
    ];

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            onClick={onClose}
        >
            <div
                className="bg-soft-white border border-lightgrey rounded-xl w-full max-w-md overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-5 py-4 border-b border-lightgrey flex items-center justify-between">
                    <h3 className="font-roboto-slab text-[15px] font-bold text-darkgrey">
                        <span className="text-orange">User</span> Details
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-mid-grey hover:text-darkgrey transition-colors"
                    >
                        <IconClose />
                    </button>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col gap-5">
                    {/* Avatar */}
                    <div className="flex items-center gap-4">
                        {detail.imageURL ? (
                            <img
                                src={detail.imageURL}
                                alt={fullName}
                                className="w-14 h-14 rounded-full object-cover border border-lightgrey shrink-0"
                            />
                        ) : (
                            <div className="w-14 h-14 rounded-full bg-orange flex items-center justify-center font-roboto text-[18px] font-bold text-white shrink-0">
                                {initials}
                            </div>
                        )}
                        <div>
                            <p className="font-roboto-slab text-[16px] font-bold text-darkgrey">
                                {fullName}
                            </p>
                            <span
                                className={`font-roboto inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize
                                    ${
                                        detail.role === 'admin'
                                            ? 'bg-[#fef0e0] text-[#8a4a0c]'
                                            : 'bg-[#e0eefc] text-[#174070]'
                                    }`}
                            >
                                {detail.role}
                            </span>
                        </div>
                    </div>

                    {/* Fields */}
                    <div className="border-t border-lightgrey pt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                        {fields.map((f) => (
                            <div key={f.label}>
                                <p className="font-roboto text-[10px] text-mid-grey uppercase tracking-wider mb-1">
                                    {f.label}
                                </p>
                                <p className="font-roboto text-[13px] text-darkgrey break-all">
                                    {f.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
