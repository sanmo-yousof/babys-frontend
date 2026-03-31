import { useState, useRef, useEffect } from 'react';
import { AdminRecipesData, type AdminRecipesDataProps } from '../../../libs/data';
import { MdDeleteOutline } from 'react-icons/md';
import { CiUser } from 'react-icons/ci';

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */
type RecipeDetail = {
    imageURL: string;
    title: string;
    category: string;
    preparationTime: number;
    numberPersons: number;
    shortDescription: string;
    longDescription: string;
    authorId: string;
    likes: number;
    status: string;
    createdAt: string;
    updatedAt: string;
};

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
const recipeStatusStyle: Record<string, string> = {
    Published: 'bg-[#e7f2da] text-[#3a5c18]',
    Draft: 'bg-[#fef0e0] text-[#8a4a0c]',
    pending: 'bg-[#fef0e0] text-[#8a4a0c]',
    approve: 'bg-[#e7f2da] text-[#3a5c18]',
    reject: 'bg-[#fde8e8] text-[#8c1a1a]',
};

function formatDate(iso: string): string {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

/* ─────────────────────────────────────────
   ICONS
───────────────────────────────────────── */
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

function IconWarning() {
    return (
        <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            stroke="#e07b2a"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 4L3 31h30L18 4z" />
            <path d="M18 14v8M18 25v1.5" />
        </svg>
    );
}

function IconChevron({ open }: { open: boolean }) {
    return (
        <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
            <path d="M3 4.5L6 7.5L9 4.5" />
        </svg>
    );
}

/* ─────────────────────────────────────────
   CHANGE STATUS DROPDOWN
───────────────────────────────────────── */
const STATUS_OPTIONS = [
    {
        value: 'approve',
        label: 'Approve',
        dot: 'bg-[#3a5c18]',
        style: 'text-[#3a5c18] hover:bg-[#e7f2da]',
    },
    {
        value: 'pending',
        label: 'Pending',
        dot: 'bg-[#8a4a0c]',
        style: 'text-[#8a4a0c] hover:bg-[#fef0e0]',
    },
    {
        value: 'reject',
        label: 'Reject',
        dot: 'bg-[#8c1a1a]',
        style: 'text-[#8c1a1a] hover:bg-[#fde8e8]',
    },
];

function ChangeStatusDropdown({
    currentStatus,
    onSelect,
}: {
    currentStatus: string;
    onSelect: (status: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleOutside);
        return () => document.removeEventListener('mousedown', handleOutside);
    }, []);

    return (
        <div ref={ref} className="relative inline-block shrink-0">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 font-roboto text-[12px] bg-green-500 hover:bg-green-600 text-white transition-colors border rounded-md cursor-pointer shrink-0"
            >
                <MdDeleteOutline className="text-sm" />
                Change Status
                <IconChevron open={open} />
            </button>

            {open && (
                <div className="absolute left-0 top-full mt-1.5 w-[140px] bg-soft-white border border-lightgrey rounded-[8px] overflow-hidden z-20">
                    {STATUS_OPTIONS.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => {
                                onSelect(opt.value);
                                setOpen(false);
                            }}
                            disabled={currentStatus === opt.value}
                            className={`w-full flex items-center gap-2 px-4 py-2.5 font-roboto text-[12px] font-semibold transition-colors text-left ${opt.style} ${currentStatus === opt.value ? 'opacity-40 cursor-not-allowed' : ''}`}
                        >
                            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${opt.dot}`} />
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

/* ─────────────────────────────────────────
   RECIPE DETAIL MODAL
───────────────────────────────────────── */
function RecipeDetailModal({
    detail,
    onClose,
}: {
    recipe: AdminRecipesDataProps;
    detail: RecipeDetail;
    onClose: () => void;
}) {
    const fields = [
        { label: 'Title', value: detail.title },
        { label: 'Category', value: detail.category },
        { label: 'Preparation Time', value: `${detail.preparationTime} minutes` },
        { label: 'Serves', value: `${detail.numberPersons} persons` },
        { label: 'Likes', value: String(detail.likes) },
        { label: 'Status', value: detail.status },
        { label: 'Created', value: formatDate(detail.createdAt) },
        { label: 'Updated', value: formatDate(detail.updatedAt) },
    ];

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 overflow-y-auto"
            onClick={onClose}
        >
            <div
                className="bg-soft-white border border-lightgrey rounded-[12px] w-full max-w-lg overflow-hidden my-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-5 py-4 border-b border-lightgrey flex items-center justify-between">
                    <h3 className="font-roboto-slab text-[15px] font-bold text-darkgrey">
                        <span className="text-orange">Recipe</span> Details
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
                    {/* Image */}
                    {detail.imageURL && (
                        <img
                            src={detail.imageURL}
                            alt={detail.title}
                            className="w-full h-44 object-cover rounded-[8px] border border-lightgrey"
                        />
                    )}

                    {/* Short description */}
                    <div>
                        <p className="font-roboto text-[10px] text-mid-grey uppercase tracking-wider mb-1">
                            Short Description
                        </p>
                        <p className="font-roboto text-[13px] text-darkgrey leading-relaxed">
                            {detail.shortDescription}
                        </p>
                    </div>

                    {/* Long description */}
                    <div>
                        <p className="font-roboto text-[10px] text-mid-grey uppercase tracking-wider mb-1">
                            Full Description
                        </p>
                        <p className="font-roboto text-[13px] text-darkgrey leading-relaxed">
                            {detail.longDescription}
                        </p>
                    </div>

                    {/* Fields grid */}
                    <div className="border-t border-lightgrey pt-4 grid grid-cols-2 gap-x-6 gap-y-4">
                        {fields.map((f) => (
                            <div key={f.label}>
                                <p className="font-roboto text-[10px] text-mid-grey uppercase tracking-wider mb-1">
                                    {f.label}
                                </p>
                                <p className="font-roboto text-[13px] text-darkgrey capitalize break-all">
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

/* ─────────────────────────────────────────
   DELETE CONFIRM MODAL
───────────────────────────────────────── */
function DeleteConfirmModal({
    recipe,
    onConfirm,
    onCancel,
}: {
    recipe: AdminRecipesDataProps;
    onConfirm: (recipe: AdminRecipesDataProps) => void;
    onCancel: () => void;
}) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            onClick={onCancel}
        >
            <div
                className="bg-soft-white border border-lightgrey rounded-[12px] w-full max-w-sm overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-5 py-4 border-b border-lightgrey flex items-center justify-between">
                    <h3 className="font-roboto-slab text-[15px] font-bold text-darkgrey">
                        <span className="text-orange">Delete</span> Recipe
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
                    <IconWarning />
                    <div>
                        <p className="font-roboto-slab text-[15px] font-bold text-darkgrey">
                            Are you sure you want to delete?
                        </p>
                        <p className="font-roboto text-[13px] text-orange font-medium mt-1">
                            &ldquo;{recipe.name}&rdquo;
                        </p>
                        <p className="font-roboto text-[12px] text-mid-grey mt-2 leading-relaxed">
                            এই কাজটি আর undo করা যাবে না।
                        </p>
                    </div>

                    <div className="flex items-center gap-3 w-full mt-1">
                        <button
                            onClick={onCancel}
                            className="flex-1 py-2 font-roboto text-[12px] text-darkgrey bg-[#f0ede4] border border-lightgrey rounded-[8px] hover:bg-lightgrey/60 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => onConfirm(recipe)}
                            className="flex-1 py-2 font-roboto text-[12px] text-white bg-red-500 rounded-[8px] hover:bg-red-600 transition-colors"
                        >
                            OK, Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────
   ADMIN RECIPES — MAIN COMPONENT
───────────────────────────────────────── */
export default function AdminRecipes() {
    const [recipes, setRecipes] = useState<AdminRecipesDataProps[]>(AdminRecipesData);

    const [detailModal, setDetailModal] = useState<{
        recipe: AdminRecipesDataProps;
        detail: RecipeDetail;
    } | null>(null);

    const [deleteModal, setDeleteModal] = useState<AdminRecipesDataProps | null>(null);

    /* ── View Detail ──
       API call দিয়ে replace করো:
       const { data } = await axios.get(`/api/admin/recipes/${recipe.id}`);
       setDetailModal({ recipe, detail: data });
    ─────────────────────────────────────── */
    const handleViewDetail = (recipe: AdminRecipesDataProps) => {
        const mockDetail: RecipeDetail = {
            imageURL: 'https://example.com/food.jpg',
            title: recipe.name,
            category: recipe.category,
            preparationTime: 60,
            numberPersons: 4,
            shortDescription: 'A flavorful and aromatic dish.',
            longDescription:
                'This recipe is made with fresh ingredients and a blend of spices. Perfect for family dinners and special occasions.',
            authorId: '69c7c93d899f2e9a03252e6c',
            likes: 0,
            status: recipe.status,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        setDetailModal({ recipe, detail: mockDetail });
    };

    /* ── Change Status ──
       API call দিয়ে replace করো:
       await axios.patch(`/api/admin/recipes/${recipe.id}/status`, { status });
    ─────────────────────────────────────── */
    const handleStatusChange = (recipeId: number, newStatus: string) => {
        setRecipes((prev) =>
            prev.map((r) =>
                r.id === recipeId
                    ? { ...r, status: newStatus as AdminRecipesDataProps['status'] }
                    : r,
            ),
        );
    };

    /* ── Delete ──
       API call দিয়ে replace করো:
       await axios.delete(`/api/admin/recipes/${recipe.id}`);
    ─────────────────────────────────────── */
    const handleDeleteConfirm = (recipe: AdminRecipesDataProps) => {
        setRecipes((prev) => prev.filter((r) => r.id !== recipe.id));
        setDeleteModal(null);
    };

    return (
        <>
            <div className="p-4 sm:p-6">
                <div className="bg-soft-white border border-lightgrey rounded-[10px] overflow-hidden">
                    {/* Card header */}
                    <div className="px-4 sm:px-5 py-4 border-b border-lightgrey flex items-center justify-between">
                        <h2 className="font-roboto-slab text-lg font-bold text-darkgrey">
                            <span className="text-orange">All</span> Recipes
                        </h2>
                        <span className="font-roboto text-base text-mid-grey">
                            Total: {recipes.length}
                        </span>
                    </div>

                    {/* ── table ── */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    {[
                                        '#',
                                        'Name',
                                        'Category',
                                        'Author Email',
                                        'Status',
                                        'Action',
                                    ].map((h) => (
                                        <th
                                            key={h}
                                            className="font-roboto text-sm text-mid-grey uppercase tracking-wider p-5 text-center font-semibold border-b border-lightgrey bg-[#f4f2ec]"
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {recipes.map((r) => (
                                    <tr
                                        key={r.id}
                                        className="hover:bg-[#f9f7f2] transition-colors text-center"
                                    >
                                        <td className="font-roboto text-sm text-mid-grey px-5 py-3 border-b border-lightgrey whitespace-nowrap">
                                            {r.id}
                                        </td>
                                        <td className="font-roboto text-sm text-darkgrey font-medium px-5 py-3 border-b border-lightgrey whitespace-nowrap">
                                            {r.name}
                                        </td>
                                        <td className="font-roboto text-sm text-mid-grey px-5 py-3 border-b border-lightgrey whitespace-nowrap">
                                            {r.category}
                                        </td>
                                        <td className="font-roboto text-sm text-darkgrey px-5 py-3 border-b border-lightgrey whitespace-nowrap">
                                            {r.email}
                                        </td>
                                        <td className="px-5 py-3 border-b border-lightgrey whitespace-nowrap">
                                            <span
                                                className={`font-roboto inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${recipeStatusStyle[r.status]}`}
                                            >
                                                {r.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 border-b border-lightgrey whitespace-nowrap">
                                            <div className="flex items-center justify-center gap-2">
                                                <ChangeStatusDropdown
                                                    currentStatus={r.status}
                                                    onSelect={(status) =>
                                                        handleStatusChange(r.id, status)
                                                    }
                                                />

                                                <button
                                                    onClick={() => handleViewDetail(r)}
                                                    className="flex items-center gap-2 px-2.5 py-1.5 font-roboto text-[12px] md:text-sm bg-[#5b8db8] hover:bg-blue-900 text-white transition-colors border rounded-md cursor-pointer shrink-0"
                                                >
                                                    <CiUser className="text-sm" />
                                                    Details
                                                </button>

                                                <button
                                                    onClick={() => setDeleteModal(r)}
                                                    className="flex items-center gap-2 px-2.5 py-1.5 font-roboto text-[12px] md:text-sm bg-red-500 hover:bg-red-700 text-white transition-colors border rounded-md cursor-pointer shrink-0"
                                                >
                                                    <MdDeleteOutline className="text-sm" />
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Recipe Detail Modal */}
            {detailModal && (
                <RecipeDetailModal
                    recipe={detailModal.recipe}
                    detail={detailModal.detail}
                    onClose={() => setDetailModal(null)}
                />
            )}

            {/* Delete Confirm Modal */}
            {deleteModal && (
                <DeleteConfirmModal
                    recipe={deleteModal}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDeleteModal(null)}
                />
            )}
        </>
    );
}
