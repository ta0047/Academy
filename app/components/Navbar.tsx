"use client";

import Image from "next/image";
import Link from "next/link";
import { GoSun } from "react-icons/go";
import { IoMoonOutline } from "react-icons/io5";
import { useTheme } from "./ThemeProvider";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("/api/auth/me", {
          cache: "no-store",
        });

        setIsLoggedIn(response.ok);
      } catch {
        setIsLoggedIn(false);
      } finally {
        setIsCheckingAuth(false);
      }
    }

    checkAuth();
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        setIsLoggedIn(false);
        router.replace("/auth/login");
        router.refresh();
        toast.success("Logged out successfully.");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to log out.");
    } finally {
      setIsLoggingOut(false);
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

        {!isCheckingAuth &&
          (isLoggedIn ? (
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="btn btn-primary"
            >
              {isLoggingOut ? <span>Logging out...</span> : <AiOutlineLogout className="w-5 h-5" />}
            </button>
          ) : (
            <>
            
              {/* <Link href="/auth/login" className="btn btn-outline">
                Login
              </Link>

              <Link href="/auth/register" className="btn btn-primary">
                Register
              </Link> */}
            </>
          ))}
      </div>
    </div>
  );
}
