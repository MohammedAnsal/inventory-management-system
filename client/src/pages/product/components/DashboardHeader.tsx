import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Package, Plus, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { useAuthStore } from "../../../store/useAuthStore";

interface DashboardHeaderProps {
  onAddProduct: () => void;
}

function getInitials(name: string | null): string {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(name: string | null): string {
  const colors = [
    "from-violet-500 to-indigo-600",
    "from-rose-500 to-pink-600",
    "from-amber-500 to-orange-600",
    "from-teal-500 to-emerald-600",
    "from-sky-500 to-blue-600",
  ];
  if (!name) return colors[0];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

export function DashboardHeader({ onAddProduct }: DashboardHeaderProps) {
  const navigate = useNavigate();
  const { fullName, email, logout } = useAuthStore(
    useShallow((state) => ({
      fullName: state.fullName,
      email: state.email,
      logout: state.logout,
    })),
  );
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  const initials = getInitials(fullName);
  const avatarGradient = getAvatarColor(fullName);

  return (
    <motion.header
      className="sticky top-0 z-30 border-b border-white/80 bg-white/70 backdrop-blur-xl"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        {/* Logo / Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-md shadow-indigo-200">
            <Package className="h-[18px] w-[18px] text-white" strokeWidth={2} />
          </div>
          <div>
            <p className="hidden text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400 sm:block">
              Inventory
            </p>
            <h1 className="text-base font-bold text-slate-900 sm:text-lg">
              Product Dashboard
            </h1>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Add product button */}
          <motion.button
            onClick={onAddProduct}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-200/60 sm:gap-2 sm:px-4 sm:text-sm"
            whileHover={{
              scale: 1.03,
              boxShadow: "0 8px 25px rgba(99,102,241,0.4)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Add Product</span>
            <span className="sm:hidden">Add</span>
          </motion.button>

          {/* Profile dropdown */}
          <div className="relative" ref={dropdownRef}>
            <motion.button
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-2 rounded-xl p-1 pr-2.5 transition hover:bg-slate-100"
              whileTap={{ scale: 0.96 }}
              aria-expanded={open}
              aria-haspopup="true"
            >
              {/* Avatar */}
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${avatarGradient} text-xs font-bold text-white shadow-sm`}
              >
                {initials}
              </div>
              {/* Name — hidden on small screens */}
              <span className="hidden max-w-[100px] truncate text-sm font-semibold text-slate-700 sm:block">
                {fullName ?? "User"}
              </span>
              {/* Chevron */}
              <motion.svg
                className="hidden h-3.5 w-3.5 text-slate-400 sm:block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </motion.button>

            {/* Dropdown panel */}
            <AnimatePresence>
              {open && (
                <motion.div
                  className="absolute right-0 mt-2 w-64 origin-top-right"
                  initial={{ opacity: 0, scale: 0.94, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -8 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/60 ring-1 ring-black/5">
                    {/* User info section */}
                    <div className="bg-gradient-to-br from-slate-50 to-indigo-50/40 px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${avatarGradient} text-sm font-bold text-white shadow-md`}
                        >
                          {initials}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-bold text-slate-900">
                            {fullName ?? "User"}
                          </p>
                          <p className="truncate text-xs text-slate-400">
                            {email ?? ""}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-slate-100" />

                    {/* Menu items */}
                    <div className="p-1.5">
                      <button
                        onClick={() => setOpen(false)}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50"
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100">
                          <User className="h-3.5 w-3.5 text-slate-500" />
                        </div>
                        <span className="font-medium">My Profile</span>
                      </button>

                      {/* Divider */}
                      <div className="my-1 h-px bg-slate-100" />

                      <motion.button
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-500 transition hover:bg-red-50"
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50">
                          <LogOut className="h-3.5 w-3.5 text-red-400" />
                        </div>
                        <span className="font-medium">Sign Out</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
