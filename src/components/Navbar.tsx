"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";

export default function Navbar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // TAMBAHAN UNTUK MOBILE MENU
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItemsUser = [
    { label: "Dashboard", href: "/dashboard", protected: true },
    { label: "Materi", href: "/materi", protected: true },
    { label: "Tutorial", href: "/tutorial", protected: true },
    { label: "Portfolio", href: "/portfolio", protected: true },
  ];

  const menuItemsGuest = [
    { label: "Home", href: "/", protected: false },
    { label: "Materi", href: "/materi", protected: true },
    { label: "Tutorial", href: "/tutorial", protected: true },
    { label: "Portfolio", href: "/portfolio", protected: true },
  ];

  const menuItems = user ? menuItemsUser : menuItemsGuest;

  const handleMenuClick = (href: string, isProtected: boolean) => {
    if (isProtected && !user) {
      router.push("/login");
      return;
    }
    router.push(href);
    setIsMobileMenuOpen(false); // TAMBAHAN: tutup menu mobile setelah klik
  };

  return (
    <nav className="bg-slate-950 text-white sticky top-0 z-40">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16 sm:h-20">

        {/* LOGO - Tetap seperti kode Anda */}
        <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2 shrink-0">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-blue-600 font-black text-xs sm:text-sm text-white">
            LC
          </div>
          <span className="text-base sm:text-xl font-bold">
            Logo<span className="text-blue-400">Craft</span>
          </span>
        </Link>

        {/* DESKTOP MENU - Tetap seperti kode Anda */}
        <ul className="hidden md:flex gap-6 lg:gap-10 text-sm font-medium">
          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => handleMenuClick(item.href, item.protected)}
                className={`transition hover:text-blue-400 ${pathname === item.href
                    ? "text-blue-400 font-semibold"
                    : "text-slate-300"
                  }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* DESKTOP RIGHT SIDE - Tetap seperti kode Anda */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          {user ? (
            <>
              <span className="text-slate-300 text-xl cursor-pointer">🔔</span>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 lg:h-9 lg:w-9 items-center justify-center rounded-full bg-blue-600 font-bold text-xs lg:text-sm">
                  {user.displayName?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="text-xs lg:text-sm font-medium hidden lg:inline">
                  {user.displayName?.split(" ")[0] || user.email?.split("@")[0]}
                </span>
              </div>
              <button
                onClick={() => {
                  signOut(auth);
                  router.push("/");
                }}
                className="rounded-xl bg-red-600 px-3 lg:px-4 py-2 text-xs lg:text-sm font-semibold text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-xl bg-blue-600 px-4 lg:px-6 py-2 lg:py-3 text-sm font-semibold hover:bg-blue-700 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* ========== TAMBAHAN UNTUK MOBILE (HP) ========== */}
        {/* Tombol ☰ Hamburger Menu - hanya muncul di HP */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
          aria-label="Menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE MENU DRAWER - TAMBAHAN BARU (muncul saat ☰ ditekan) */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay gelap di belakang */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Drawer dari kanan */}
          <div className="fixed top-0 right-0 h-full w-72 max-w-[80vw] bg-slate-950 z-50 shadow-2xl md:hidden animate-slide-in">
            {/* Header Drawer dengan Avatar User */}
            <div className="p-5 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 font-bold text-lg text-white">
                  {user?.displayName?.charAt(0).toUpperCase() || "LC"}
                </div>
                <div>
                  <p className="font-bold text-white">
                    {user?.displayName || "LogoCraft"}
                  </p>
                  <p className="text-xs text-slate-400">
                    {user?.email || "Belajar Desain Logo"}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <ul className="p-3 space-y-1">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleMenuClick(item.href, item.protected)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${pathname === item.href
                        ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white"
                        : "text-slate-300 hover:bg-white/10"
                      }`}
                  >
                    <span className="text-xl w-7">
                      {item.label === "Dashboard" && "⊞"}
                      {item.label === "Materi" && "📚"}
                      {item.label === "Tutorial" && "🎬"}
                      {item.label === "Portfolio" && "🖼️"}
                      {item.label === "Home" && "🏠"}
                    </span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}

              {/* Logout untuk user yang sudah login */}
              {user && (
                <li className="pt-2 mt-2 border-t border-slate-800">
                  <button
                    onClick={() => {
                      signOut(auth);
                      router.push("/");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition"
                  >
                    <span className="text-xl w-7">🚪</span>
                    <span>Logout</span>
                  </button>
                </li>
              )}

              {/* Login untuk user yang belum login */}
              {!user && (
                <li>
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-blue-600 text-white"
                  >
                    <span className="text-xl w-7">🔑</span>
                    <span>Login</span>
                  </Link>
                </li>
              )}
            </ul>

            {/* Footer Drawer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
              <p className="text-xs text-slate-500 text-center">
                LogoCraft - Belajar Desain Logo
              </p>
            </div>
          </div>
        </>
      )}

      {/* CSS Animasi untuk slide-in */}
      <style jsx>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
}