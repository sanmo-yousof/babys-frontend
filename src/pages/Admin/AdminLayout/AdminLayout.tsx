import { useState } from 'react';
import Container from '../../../components/ui/Container';
import AdminProfile from '../AdminProfile/AdminProfile';
import AdminUsers from '../AdminUsers/AdminUsers';
import AdminRecipes from '../AdminRecipes/AdminRecipes';
import AdminOverview from '../AdminOverview/AdminOverview';
import { LuMenu } from 'react-icons/lu';

import { PAGE_TITLES, type Page } from '../../../libs/data';
import AdminSidebarContent from '../AdminSidebarContent/AdminSidebarContent';

export default function AdminLayout() {
    const [activePage, setActivePage] = useState<Page>('overview');
    const [drawerOpen, setDrawerOpen] = useState(false);

    const title = PAGE_TITLES[activePage];

    const handleNavigate = (page: Page) => {
        setActivePage(page);
        setDrawerOpen(false);
    };

    return (
        <Container className="flex min-h-screen pt-26 md:pt-34 xl:pt-36">
            {/* Mobile overlay — closes drawer on outside tap */}
            {drawerOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-20 lg:hidden"
                    onClick={() => setDrawerOpen(false)}
                />
            )}

            {/* Sidebar — always visible on lg+ */}
            <aside className="hidden lg:flex w-70 shrink-0 bg-darkgrey flex-col">
                <AdminSidebarContent activePage={activePage} onNavigate={handleNavigate} />
            </aside>

            {/* Sidebar — slide-in drawer on mobile */}
            <aside
                className={`fixed top-0 left-0 h-full w-70 bg-darkgrey flex flex-col z-30 transition-transform duration-300 lg:hidden
                    ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <AdminSidebarContent activePage={activePage} onNavigate={handleNavigate} />
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top bar */}
                <header className="bg-soft-white border-b border-lightgrey px-4 sm:px-6 py-3.75 flex items-center gap-3">
                    {/* Hamburger — only on mobile */}
                    <button
                        className="lg:hidden shrink-0 p-1 rounded text-darkgrey hover:bg-lightgrey/50 transition-colors"
                        onClick={() => setDrawerOpen(true)}
                        aria-label="Open menu"
                    >
                        <LuMenu className="text-xl md:text-3xl" />
                    </button>

                    <h1 className="font-roboto-slab text-[18px] sm:text-[20px] font-bold text-darkgrey">
                        <span className="text-orange">{title.prefix}</span>
                        {title.rest}
                    </h1>
                </header>

                {/* Page */}
                <main className="flex-1">
                    {activePage === 'overview' && <AdminOverview />}
                    {activePage === 'recipes' && <AdminRecipes />}
                    {activePage === 'users' && <AdminUsers />}
                    {activePage === 'profile' && <AdminProfile />}
                </main>
            </div>
        </Container>
    );
}
