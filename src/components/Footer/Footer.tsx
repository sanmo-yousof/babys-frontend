import whiteLogo from '../../assets/icons/logo_white.svg';

import { Link, NavLink } from 'react-router-dom';
import Container from '../ui/Container';
import { navItems } from '../../libs/data';

export default function Footer() {
    return (
        <footer className="bg-darkgrey">
            <Container className="py-5 md:py-8 lg:py-10 xl:py-12">
                <div className="flex items-center justify-between">
                    {/* header logo */}
                    <Link to={'/'} className="w-26 sm:w-30 md:w-34 lg:w-38 xl:w-44 aspect-auto ">
                        <img src={whiteLogo} alt="Logo" draggable={false} />
                    </Link>

                    {/* navigation */}
                    <ul className="hidden lg:flex items-center gap-3 xl:gap-5">
                        {navItems.map((item, i) => (
                            <li
                                key={item.id}
                                className="flex items-center gap-3 xl:gap-5 font-bold text-white lg:text-lg hover:text-orange transition-colors duration-300"
                            >
                                {i !== 0 && (
                                    <div className="bg-white w-2.5 aspect-square rounded-full" />
                                )}
                                <NavLink
                                    to={item.href}
                                    className={({ isActive }) => `${isActive ? 'text-orange' : ''}`}
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* copyright */}
                    <p className="text-white w-full max-w-28.75 text-end font-normal text-sm leading-5 ">
                        Baby&apos;s Food Place copyright &copy; {new Date().getFullYear()}
                    </p>
                </div>
            </Container>
        </footer>
    );
}
