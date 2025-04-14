import { useEffect, useState } from "react";
import { LogOut, Menu, User, X } from "lucide-react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Logo from "../Logo";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutUser } from "@/apis/authentication";
import Spinner from "react-spinner";

function TopBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("/dashboard"); // Track active link
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const handleClick = async () => {
    setLoading(true);
    await SignOutUser();
    navigate("/");
    setLoading(false);
  };

  return (
    <header className="w-full shadow-2xl bg-black/40 backdrop-blur-lg">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Left Side: Logo */}
        <div className="flex items-center gap-4">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex relative justify-center space-x-12 text-lg font-normal">
          {[
            { to: "/dashboard", label: "Dashboard" },
            { to: "/payment", label: "Add Payment" },
            { to: "/friends", label: "Friends" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `relative pb-2 transition duration-300 ${
                  isActive
                    ? "text-slate-400 font-medium"
                    : "text-white hover:text-slate-300"
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {/* Sliding Underline */}
          <div
            className="absolute bottom-0 h-[3px] bg-gradient-to-r from-transparent via-white to-transparent transition-all duration-300"
            style={{
              width: "100px", // Adjust this width to match the links
              left:
                activeLink === "/dashboard"
                  ? "0%"
                  : activeLink === "/payment"
                  ? "33%"
                  : "66%",
            }}
          />
        </nav>

        {/* Right Side: Avatar & Mobile Menu Button */}
        <div className="flex items-center gap-4">
          {/* User Avatar & Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="w-10 h-10 cursor-pointer transition hover:scale-105">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent()}`}
                />
                <AvatarFallback className="bg-gray-600 text-white text-lg font-medium">
                  R
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            {/* Dropdown Menu */}
            <DropdownMenuContent className="w-56 mt-2 shadow-xl rounded-lg bg-black/80 backdrop-blur-lg border border-gray-700">
              <DropdownMenuLabel className="text-gray-300 font-semibold">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-600" />

              {/* Profile Option */}
              <DropdownMenuGroup>
                <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-md transition">
                  <User className="w-5 h-5 text-gray-400" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="bg-gray-600" />

              {/* Logout Option */}
              <DropdownMenuItem
                className="flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-red-700/40 rounded-md transition"
                onClick={handleClick}
              >
                <LogOut className="w-5 h-5" />
                <span>{loading ? <Spinner /> : "Logout"}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden p-1 rounded-md bg-slate-200 hover:bg-gray-200 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className="md:hidden shadow-md">
          <ul className="flex flex-col space-y-4 p-4 text-lg font-normal">
            {[
              { to: "/dashboard", label: "Dashboard" },
              { to: "/payment", label: "Add Payment" },
              { to: "/friends", label: "Friends" },
            ].map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-lg transition ${
                      isActive
                        ? "text-slate-100 font-medium bg-gray-500"
                        : "text-white hover:text-slate-300"
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)} // Close menu when clicking a link
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export default TopBar;
