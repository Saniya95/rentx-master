"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const checkLoginStatus = () => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(!!localStorage.getItem("token"));
    }
  };

  useEffect(() => {
    checkLoginStatus();
    const handleStorageChange = (e) => {
      if (e.key === "token") checkLoginStatus();
    };
    window.addEventListener("storage", handleStorageChange);
    const handleLoginEvent = () => checkLoginStatus();
    window.addEventListener("loginStatusChanged", handleLoginEvent);
    const interval = setInterval(checkLoginStatus, 1000);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("loginStatusChanged", handleLoginEvent);
      clearInterval(interval);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    router.push("/login");
  }

  const isActive = (path) => pathname === path;

  return (
       <header className="sticky top-4 z-50 mx-auto w-[95%] rounded-3xl bg-[#0A0F2C]/60 backdrop-blur-xl shadow-lg border border-white/10 transition-all duration-300 ease-in-out">
        <nav className="flex flex-wrap items-center justify-between py-6 px-4 md:px-8">
               {/* Logo */}
          <Link
            href="/"
            className="flex items-center text-[#F5E6C8] text-2xl font-bold font-serif"
          >
            ⚡ RentX
            <span className="ml-2 bg-[#FFD700] text-[#0A0F2C] text-xs px-2 py-1 rounded-full font-sans">
              AI-POWERED
            </span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-[#F5E6C8]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Links */}
          <div
            className={`w-full md:flex md:items-center md:justify-center md:w-auto ${
              isMobileMenuOpen ? "block" : "hidden"
            } md:block`}
          >
            <ul className="flex flex-col md:flex-row md:items-center gap-4 text-[#F5E6C8] text-sm mt-4 md:mt-0">
              <NavItem href="/" isActive={isActive("/")} label="Home" />
              <NavItem href="/category" isActive={isActive("/category")} label="Categories" />
              <NavItem href="/how-it-works" isActive={isActive("/how-it-works")} label="How it Works" />
              <NavItem href="/contact" isActive={isActive("/contact")} label="Contact" />
            </ul>
          </div>

          {/* Auth Section */}
          <div
            className={`w-full md:w-auto mt-4 md:mt-0 ${
              isMobileMenuOpen ? "block" : "hidden"
            } md:block`}
          >
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="text-sm px-5 py-2 rounded-md bg-[#FFD700] text-[#0A0F2C] hover:bg-white transition"
                >
                  Profile
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col md:flex-row items-center gap-2">
                <Link
                  href="/signup"
                  className="px-5 py-2 text-sm font-medium border border-[#FFD700] text-[#FFD700] rounded hover:bg-[#FFD700] hover:text-[#0A0F2C] transition"
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className="px-5 py-2 text-sm font-medium bg-[#FFD700] text-[#0A0F2C] rounded hover:bg-white transition"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>

  );
}

function NavItem({ href, isActive, label }) {
  return (
    <li>
      <Link
        href={href}
        className={`py-2 px-3 border-b-2 transition-all ${
          isActive
            ? "border-[#FFD700] text-[#FFD700]"
            : "border-transparent hover:text-[#FFD700] hover:border-[#FFD700]"
        }`}
      >
        {label}
      </Link>
    </li>
  );
}
