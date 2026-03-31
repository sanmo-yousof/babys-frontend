export default function AdminProfile() {
    return (
        <div className="p-4 sm:p-6">
            <div className="bg-soft-white border border-lightgrey rounded-[10px] overflow-hidden w-full max-w-lg">
                <div className="px-4 sm:px-5 py-4 border-b border-lightgrey">
                    <h2 className="font-roboto-slab text-[15px] font-bold text-darkgrey">
                        <span className="text-orange">My</span> Profile
                    </h2>
                </div>
                <div className="p-4 sm:p-6 flex flex-col gap-5">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-orange flex items-center justify-center font-roboto text-[16px] sm:text-[18px] font-bold text-white shrink-0">
                            AD
                        </div>
                        <div>
                            <p className="font-roboto-slab text-[15px] sm:text-[16px] font-bold text-darkgrey">
                                Super Admin
                            </p>
                            <p className="font-roboto text-[12px] text-mid-grey">Administrator</p>
                        </div>
                    </div>

                    <div className="border-t border-lightgrey pt-5 flex flex-col gap-4">
                        {[
                            { label: 'Full Name', value: 'Super Admin' },
                            { label: 'Email', value: 'admin@babys.com' },
                            { label: 'Role', value: 'Administrator' },
                            { label: 'Joined', value: 'January 2025' },
                        ].map((field) => (
                            <div key={field.label}>
                                <p className="font-roboto text-[10px] text-mid-grey uppercase tracking-wider mb-1">
                                    {field.label}
                                </p>
                                <p className="font-roboto text-[13px] text-darkgrey">
                                    {field.value}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-lightgrey pt-4">
                        <button className="font-roboto text-[12px] text-orange hover:underline">
                            Edit Profile →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
