import logo from "../../assets/icons/logo_color.svg";
import Container from "../ui/Container";
import { IoMenu, IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { navItems } from "../../libs/data";
import Button from "../ui/Button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout Successfully!");
      setIsMenuOpen(false);
      navigate("/");
    } catch (error) {
      
      toast.error("Logout failed");
    }
  };

  return (
    <header
      className={`w-full bg-soft-white fixed top-0 left-0 z-100 ${scrollY > 50 ? "shadow-md" : ""}`}
    >
      <Container className="py-5 md:py-8 lg:py-10 xl:py-12">
        <div className="flex items-center justify-between">
          {/* header logo */}
          <Link
            to={"/"}
            className="w-26 sm:w-30 md:w-34 lg:w-38 xl:w-44 aspect-auto "
          >
            <img src={logo} alt="Logo" draggable={false} />
          </Link>

          {/* navigation */}
          <ul className="hidden lg:flex items-center gap-3 xl:gap-5">
            {navItems.map((item, i) => (
              <li
                key={item.id}
                className="flex items-center gap-3 xl:gap-5 font-bold text-mid-grey lg:text-lg hover:text-orange transition-colors duration-300"
              >
                {i !== 0 && (
                  <div className="bg-orange w-2.5 aspect-square rounded-full" />
                )}
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `${isActive ? "text-orange" : ""}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            {!user && (
              <>
                <Link to="login">
                  <Button
                    text="login"
                    classname="bg-transparent border-mid-grey text-mid-grey"
                  />
                </Link>
                <span className="mx-5 text-orange font-bold lg:text-base">
                  or
                </span>
                <Link to="create-account">
                  <Button text="create account" />
                </Link>{" "}
              </>
            )}

            {user?.role === "user" && (
              <div className="flex items-center gap-1 xl:gap-1">
                {[
                  {
                    to: "my-recipes",
                    text: "MY RECIPES",
                    style: "text-green hover:text-green",
                  },
                  {
                    to: "user-profile",
                    text: "MY PROFILE",
                    style: "text-orange hover:text-orange",
                  },
                  {
                    logout: true,
                    text: "LOG OUT",
                    style: "text-mid-grey hover:text-green",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-1 xl:gap-1">
                    {i !== 0 && (
                      <div className="bg-orange w-2.5 aspect-square rounded-full" />
                    )}

                    {item.logout ? (
                      <Button
                        text={item.text}
                        classname={`bg-transparent lg:text-lg ${item.style} border-none underline underline-offset-4 decoration-4`}
                        onClick={handleLogout}
                      />
                    ) : (
                      <Link to={item.to as string}>
                        <Button
                          text={item.text}
                          classname={`bg-transparent lg:text-lg ${item.style} border-none underline underline-offset-4 decoration-4`}
                        />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
            {user?.role === "admin" && (
              <>
                <div className="flex items-center gap-1 xl:gap-1">
                  {[
                    {
                      to: "admin/dashboard",
                      text: "DASHBOARD",
                      style: "text-orange hover:text-orange",
                    },
                    {
                      logout: true,
                      text: "LOG OUT",
                      style: "text-mid-grey hover:text-green",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-1 xl:gap-1">
                      {i !== 0 && (
                        <div className="bg-orange w-2.5 aspect-square rounded-full" />
                      )}

                      {item.logout ? (
                        <Button
                          text={item.text}
                          classname={`bg-transparent lg:text-lg ${item.style} border-none underline underline-offset-4 decoration-4`}
                          onClick={handleLogout}
                        />
                      ) : (
                        <Link to={item.to as string}>
                          <Button
                            text={item.text}
                            classname={`bg-transparent lg:text-lg ${item.style} border-none underline underline-offset-4 decoration-4`}
                          />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* hamburger menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-3xl sm:text-4xl md:text-5xl text-darkgrey lg:hidden"
          >
            {isMenuOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>

        {/* mobile navigation */}
        {isMenuOpen && (
          <div>
            <ul className="lg:hidden flex flex-col gap-5 md:gap-8 py-8 md:py-12">
              {navItems.map((item) => (
                <li
                  onClick={() => setIsMenuOpen(false)}
                  key={item.id}
                  className="font-bold text-mid-grey text-lg sm:text-xl md:text-2xl"
                >
                  <Link to={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>

            {/* signin / signup button */}
            <div className="lg:hidden">
              {!user ? (
                <>
                  <Link onClick={() => setIsMenuOpen(false)} to="login">
                    <Button
                      text="login"
                      classname="bg-transparent border-mid-grey text-mid-grey"
                    />
                  </Link>
                  <span className="mx-5 text-orange font-bold text-sm md:text-base">
                    or
                  </span>
                  <Link onClick={() => setIsMenuOpen(false)} to="create-account">
                    <Button text="create account" />
                  </Link>
                </>
              ) : (
                <div className="flex flex-col gap-4">
                  {user.role === "user" && (
                    <>
                      <Link onClick={() => setIsMenuOpen(false)} to="my-recipes">
                        <Button text="MY RECIPES" classname="bg-transparent text-green border-none lg:text-lg" />
                      </Link>
                      <Link onClick={() => setIsMenuOpen(false)} to="user-profile">
                        <Button text="MY PROFILE" classname="bg-transparent text-orange border-none lg:text-lg" />
                      </Link>
                    </>
                  )}
                  {user.role === "admin" && (
                    <Link onClick={() => setIsMenuOpen(false)} to="admin/dashboard">
                      <Button text="DASHBOARD" classname="bg-transparent text-orange border-none lg:text-lg" />
                    </Link>
                  )}
                  <Button
                    text="LOG OUT"
                    classname="bg-transparent text-mid-grey border-none lg:text-lg text-left inline-block"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
