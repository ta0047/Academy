"use client";

import Image from "next/image";
import Link from "next/link";
import { GoSun } from "react-icons/go";
import { IoMoonOutline } from "react-icons/io5";
import { useTheme } from "./ThemeProvider";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const handleLogout = async () => {
    
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok) {
        throw new Error("Logout failed");
      }
      router.replace("/auth/login");
      toast.success("You have been logged out.");
      router.refresh();
    } catch {
      console.error("Logout failed:", Error);
    }
  };

  return (
    <div className="sticky top-0 navbar bg-base-200 text-base-content shadow-sm z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            ☰
          </div>

          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <Link href="/">HOME</Link>
            </li>
            <li>
              <Link href="/courses">COURSES</Link>
            </li>
            <li>
              <Link href="/about">ABOUT</Link>
            </li>
            <li>
              <Link href="/contact">CONTACT</Link>
            </li>
          </ul>
        </div>
        <Image src="/logo.png" alt="Logo" width={50} height={50} />
        <div className="flex gap-0">
          <a className="font-bold">Apex Academy</a>
          <a className=""></a>
        </div>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">HOME</Link>
          </li>
          <li>
            <Link href="/courses">COURSES</Link>
          </li>
          <li>
            <Link href="/about">ABOUT</Link>
          </li>
          <li>
            <Link href="/contact">CONTACT</Link>
          </li>
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end gap-2">
        <button className="btn btn-ghost" onClick={toggleTheme}>
          {theme === "dark" ? (
            <GoSun className="w-5 h-5" />
          ) : (
            <IoMoonOutline className="w-5 h-5" />
          )}
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="btn btn-sm border border-base-content"
        >
          Logout 
        </button>
      </div>
    </div>
  );
}
