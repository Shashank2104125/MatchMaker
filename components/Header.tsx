"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../app/context/AuthContext";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logOut();
    router.push("/login");
  };

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-semibold hover:text-gray-300"
        >
          MatchMaker
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-lg items-center">
          <Link
            href="/"
            className={`hover:text-gray-300 ${pathname === "/" ? "underline" : ""}`}
          >
            Home
          </Link>
          <Link
            href="/profileMatch"
            className={`hover:text-gray-300 ${
              pathname === "/profileMatch" ? "underline" : ""
            }`}
          >
            Get Your Match
          </Link>
          <Link
            href="/profile"
            className={`hover:text-gray-300 ${pathname === "/profile" ? "underline" : ""}`}
          >
            Profile
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="hover:text-red-400 text-red-300"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className={`hover:text-green-300 ${pathname === "/login" ? "underline" : ""}`}
            >
              Sign Up / Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-4 bg-gray-800 text-lg">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className={`hover:text-gray-300 ${pathname === "/" ? "underline" : ""}`}
          >
            Home
          </Link>
          <Link
            href="/profileMatch"
            onClick={() => setMenuOpen(false)}
            className={`hover:text-gray-300 ${
              pathname === "/profileMatch" ? "underline" : ""
            }`}
          >
            Get Your Match
          </Link>
          <Link
            href="/profile"
            onClick={() => setMenuOpen(false)}
            className={`hover:text-gray-300 ${pathname === "/profile" ? "underline" : ""}`}
          >
            Profile
          </Link>
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="hover:text-red-400 text-red-300 text-left"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className={`hover:text-green-300 ${pathname === "/login" ? "underline" : ""}`}
            >
              Sign Up / Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
