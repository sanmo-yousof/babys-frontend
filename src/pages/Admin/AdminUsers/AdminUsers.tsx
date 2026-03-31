import { useState } from 'react';
import { USERS, type User } from '../../../libs/data';

import type { UserDetail } from '../../../types/UserDetail';
import { AdminAction } from './AdminAction/AdminAction';
import { UserDetailModal } from '../../../components/UserDetailsModal/UserDetailModal';
import { DeleteConfirmModal } from '../../../components/DeleteConfirmModel/DeleteConfirmModel';

// helpers
const roleStyle: Record<User['role'], string> = {
    User: 'bg-[#e0eefc] text-[#174070]',
    Admin: 'bg-[#fef0e0] text-[#8a4a0c]',
};

export default function AdminUsers() {
    const [users, setUsers] = useState<User[]>(USERS);

    const [detailModal, setDetailModal] = useState<UserDetail | null>(null);
    const [deleteModal, setDeleteModal] = useState<User | null>(null);

    //   Open User Detail Modal
    const handleViewDetail = (user: User) => {
        const mockDetail: UserDetail = {
            firstName: user.name.split(' ')[0] ?? user.name,
            lastName: user.name.split(' ')[1] ?? '',
            email: user.email,
            role: user.role.toLowerCase(),
            birthday: '2003-02-19',
            imageURL: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        setDetailModal(mockDetail);
    };

    // delete confirmation
    const handleDeleteConfirm = (user: User) => {
        setUsers((prev) => prev.filter((u) => u.id !== user.id));
        setDeleteModal(null);
    };

    return (
        <>
            <div className="p-4 sm:p-6">
                <div className="bg-soft-white border border-lightgrey rounded-[10px] overflow-hidden">
                    {/* Card header */}
                    <div className="px-4 sm:px-5 py-4 border-b border-lightgrey flex items-center justify-between">
                        <h2 className="font-roboto-slab text-lg font-bold text-darkgrey">
                            <span className="text-orange">All</span> Users
                        </h2>
                        <span className="font-roboto text-base text-mid-grey">
                            Total: {users.length}
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
                                        'Email',
                                        'Joined',
                                        'Recipes',
                                        'Role',
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
                                {users.map((u) => (
                                    <tr
                                        key={u.id}
                                        className="hover:bg-[#f9f7f2] transition-colors text-center"
                                    >
                                        <td className="font-roboto text-sm text-mid-grey px-5 py-3 border-b border-lightgrey">
                                            {u.id}
                                        </td>
                                        <td className="font-roboto text-sm text-darkgrey font-medium px-5 py-3 border-b border-lightgrey">
                                            {u.name}
                                        </td>
                                        <td className="font-roboto text-sm text-mid-grey px-5 py-3 border-b border-lightgrey">
                                            {u.email}
                                        </td>
                                        <td className="font-roboto text-sm text-mid-grey px-5 py-3 border-b border-lightgrey">
                                            {u.joined}
                                        </td>
                                        <td className="font-roboto text-sm text-darkgrey px-5 py-3 border-b border-lightgrey">
                                            {u.recipes}
                                        </td>
                                        <td className="px-5 py-3 border-b border-lightgrey">
                                            <span
                                                className={`font-roboto inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${roleStyle[u.role]}`}
                                            >
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 border-b border-lightgrey">
                                            <AdminAction
                                                user={u}
                                                onViewDetail={handleViewDetail}
                                                onDelete={setDeleteModal}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* User Detail Modal */}
            {detailModal && (
                <UserDetailModal detail={detailModal} onClose={() => setDetailModal(null)} />
            )}

            {/* Delete Confirm Modal */}
            {deleteModal && (
                <DeleteConfirmModal
                    user={deleteModal}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDeleteModal(null)}
                />
            )}
        </>
    );
}
