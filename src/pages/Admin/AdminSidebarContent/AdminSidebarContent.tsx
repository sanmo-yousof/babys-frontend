// icons
import { RxDashboard } from 'react-icons/rx';
import { PiArticleLight } from 'react-icons/pi';
import { HiOutlineUsers } from 'react-icons/hi2';
import { MdSunny } from 'react-icons/md';
import { NAV_ITEMS, type Page } from '../../../libs/data';

// nav icon helper
function NavIcon({ page }: { page: Page }) {
    if (page === 'overview') return <RxDashboard className="w-3.75 h-3.75 shrink-0" />;
    if (page === 'recipes') return <PiArticleLight className="w-3.75 h-3.75 shrink-0" />;
    if (page === 'users') return <HiOutlineUsers className="w-3.75 h-3.75 shrink-0" />;
    if (page === 'profile') return <MdSunny className="w-3.75 h-3.75 shrink-0" />;
    return null;
}

export default function AdminSidebarContent({
    activePage,
    onNavigate,
}: {
    activePage: Page;
    onNavigate: (p: Page) => void;
}) {
    return (
        <>
            {/* Logo */}
            <div className="px-5 py-5.5 border-b border-white/[0.07]">
                <p className="font-roboto-slab text-[20px] font-bold text-orange">Baby's</p>
                <p className="font-roboto text-[10px] text-mid-grey mt-0.75 tracking-[0.05em]">
                    Admin Panel
                </p>
            </div>

            {/* Nav */}
            <nav className="flex-1 py-3">
                {NAV_ITEMS.map(({ label, page }) => (
                    <button
                        key={page}
                        onClick={() => onNavigate(page)}
                        className={`w-full flex items-center gap-2.5 px-5 py-2.5 text-[13px] font-roboto border-l-[3px] transition-all text-left
                            ${
                                activePage === page
                                    ? 'text-orange border-l-orange bg-orange/9'
                                    : 'text-mid-grey border-l-transparent hover:text-[#ccc] hover:bg-white/4'
                            }`}
                    >
                        <span className={activePage === page ? 'opacity-100' : 'opacity-65'}>
                            <NavIcon page={page} />
                        </span>
                        {label}
                    </button>
                ))}
            </nav>

            {/* Footer */}
            <div className="px-5 py-3.5 border-t border-white/[0.07] flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-orange flex items-center justify-center font-roboto text-[11px] font-bold text-white shrink-0">
                    AD
                </div>
                <div className="min-w-0">
                    <p className="font-roboto text-[12px] text-[#ccc] truncate">Super Admin</p>
                    <p className="font-roboto text-[10px] text-[#555]">Administrator</p>
                </div>
                <button
                    title="Log out"
                    className="ml-auto opacity-50 hover:opacity-100 transition-opacity shrink-0"
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="#aaa"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3" />
                        <path d="M11 11l3-3-3-3M14 8H6" />
                    </svg>
                </button>
            </div>
        </>
    );
}
