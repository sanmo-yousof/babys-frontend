export default function AdminOverview() {
    return (
        <div className="p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-soft-white border border-lightgrey rounded-[10px] p-5 sm:p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-0.75 bg-orange rounded-t-[10px]" />
                    <p className="font-roboto text-[10px] text-mid-grey uppercase tracking-widest mb-2">
                        Total Recipes
                    </p>
                    <p className="font-roboto-slab text-[28px] sm:text-[32px] font-bold text-darkgrey leading-none">
                        284
                    </p>
                    <p className="font-roboto text-[11px] text-mid-grey mt-2">
                        <span className="text-green">▲ 12%</span> this month
                    </p>
                </div>
                <div className="bg-soft-white border border-lightgrey rounded-[10px] p-5 sm:p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-0.75 bg-green rounded-t-[10px]" />
                    <p className="font-roboto text-[10px] text-mid-grey uppercase tracking-widest mb-2">
                        Total Users
                    </p>
                    <p className="font-roboto-slab text-[28px] sm:text-[32px] font-bold text-darkgrey leading-none">
                        3,740
                    </p>
                    <p className="font-roboto text-[11px] text-mid-grey mt-2">
                        <span className="text-green">+21</span> this week
                    </p>
                </div>
            </div>
        </div>
    );
}
