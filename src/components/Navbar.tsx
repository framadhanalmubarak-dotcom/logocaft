"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Navbar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = user
    ? [
      { label: "Home", href: "/", protected: false },
      { label: "Dashboard", href: "/dashboard", protected: true },
      { label: "Materi", href: "/materi", protected: true },
      { label: "Tutorial", href: "/tutorial", protected: true },
      { label: "Portfolio", href: "/portfolio", protected: true },
    ]
    : [
      { label: "Home", href: "/", protected: false },
      { label: "Materi", href: "/materi", protected: true },
      { label: "Tutorial", href: "/tutorial", protected: true },
      { label: "Portfolio", href: "/portfolio", protected: true },
    ];

  const handleMenuClick = (href: string, isProtected: boolean) => {
    if (isProtected && !user) {
      router.push("/login");
      return;
    }
    router.push(href);
  };

  return (
    <nav className="bg-slate-950 text-white h-20 flex items-center px-10">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-black text-sm text-white">
            LC
          </div>
          <span className="text-xl font-bold">
            Logo<span className="text-blue-400">Craft</span>
          </span>
        </Link>

        {/* MENU */}
        <ul className="hidden gap-10 md:flex text-sm font-medium">
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

        {/* RIGHT SIDE */}
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-slate-300 text-xl cursor-pointer">🔔</span>

            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-bold text-sm">
                {user.displayName?.charAt(0).toUpperCase() || "U"}
              </div>

              <span className="text-sm font-medium">
                {user.displayName || user.email}
              </span>
            </div>

            <button
              onClick={() => {
                signOut(auth);
                router.push("/");
              }}
              className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold hover:bg-blue-700 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}