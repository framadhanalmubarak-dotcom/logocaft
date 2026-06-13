"use client";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface SidebarProps {
   activeMenu?: string;
   onMenuClick?: (id: string) => void;
   type?: "dashboard" | "materi" | "tutorial" | "portfolio";
}

export default function Sidebar({ activeMenu, onMenuClick, type = "dashboard" }: SidebarProps) {
   const { user } = useAuth();
   const router = useRouter();
   const pathname = usePathname();

   const dashboardMenu = [
      { label: "Dashboard", icon: "⊞", href: "/dashboard" },
      { label: "Materi", icon: "📚", href: "/materi" },
      { label: "Tutorial", icon: "🎬", href: "/tutorial" },
      { label: "Portfolio", icon: "🖼️", href: "/portfolio" },
   ];

   const materiMenu = [
      { id: 1, label: "Pengantar Desain", icon: "📖" },
      { id: 2, label: "Color Theory", icon: "🎨" },
      { id: 3, label: "Typography", icon: "Aa" },
      { id: 4, label: "Komposisi", icon: "🟣" },
      { id: 5, label: "Layout", icon: "▦" },
      { id: 6, label: "Logo Huruf", icon: "M" },
   ];

   const tutorialMenu = [
      { id: 1, label: "Download Adobe Illustrator", icon: "💻" },
      { id: 2, label: "Mengatur Workspace", icon: "🖥️" },
      { id: 3, label: "Membuat Logo 2 Huruf", icon: "🔤" },
      { id: 4, label: "Membuat Logo 3 Huruf", icon: "🔠" },
      { id: 5, label: "Membuat Logo Unik", icon: "✨" },
   ];

   const portfolioMenu = [
      { id: "portfolio", label: "Portfolio Saya", icon: "🖼️", href: "/portfolio" },
      { id: "upload", label: "Upload Karya", icon: "⬆️", href: "/upload" },
   ];

   return (
      <aside className="hidden lg:block w-72 shrink-0">
         <div className="sticky top-6 rounded-3xl overflow-hidden shadow-2xl sidebar-gradient">
            <div className="p-6 border-b border-white/5">
               {type === "dashboard" && (
                  <div className="flex items-center gap-3">
                     <div className="relative">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 font-black text-lg text-white shadow-lg shadow-blue-500/40">
                           {user?.displayName?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-400 border-2 border-slate-900" />
                     </div>
                     <div className="min-w-0">
                        <p className="font-bold text-white text-sm truncate">{user?.displayName || "Pengguna"}</p>
                        <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                     </div>
                  </div>
               )}
               {type === "materi" && (
                  <div className="flex items-center gap-3">
                     <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-xl shadow-lg shadow-blue-500/40">
                        📚
                     </div>
                     <div>
                        <p className="font-black text-white text-base">Materi</p>
                        <p className="text-xs text-slate-400">6 topik tersedia</p>
                     </div>
                  </div>
               )}
               {type === "tutorial" && (
                  <div className="flex items-center gap-3">
                     <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-600 text-xl shadow-lg shadow-red-500/40">
                        🎬
                     </div>
                     <div>
                        <p className="font-black text-white text-base">Tutorial</p>
                        <p className="text-xs text-slate-400">5 video tersedia</p>
                     </div>
                  </div>
               )}
               {type === "portfolio" && (
                  <div className="flex items-center gap-3">
                     <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 text-xl shadow-lg shadow-purple-500/40">
                        🎨
                     </div>
                     <div>
                        <p className="font-black text-white text-base">Portfolio</p>
                        <p className="text-xs text-slate-400">Karya & Galeri</p>
                     </div>
                  </div>
               )}
            </div>

            <div className="p-3">
               {type === "dashboard" && (
                  <ul className="space-y-1">
                     {dashboardMenu.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                           <li key={item.label}>
                              <button
                                 onClick={() => router.push(item.href)}
                                 className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${isActive
                                    ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-600/30"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                                    }`}
                              >
                                 <span className="text-base w-6 text-center">{item.icon}</span>
                                 <span>{item.label}</span>
                                 {isActive && <span className="ml-auto text-white/60">›</span>}
                              </button>
                           </li>
                        );
                     })}
                     <li className="my-2"><div className="h-px bg-white/5 mx-2" /></li>
                     <li>
                        <button
                           onClick={() => { signOut(auth); router.push("/"); }}
                           className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                        >
                           <span className="text-base w-6 text-center">🚪</span>
                           <span>Logout</span>
                        </button>
                     </li>
                  </ul>
               )}

               {(type === "materi" || type === "tutorial") && (
                  <ul className="space-y-1">
                     {(type === "materi" ? materiMenu : tutorialMenu).map((item) => {
                        const isActive = activeMenu === String(item.id);
                        return (
                           <li key={item.id}>
                              <button
                                 onClick={() => onMenuClick?.(String(item.id))}
                                 className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all text-left ${isActive
                                    ? type === "materi"
                                       ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-600/30"
                                       : "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                                    }`}
                              >
                                 <span className={`text-base w-6 text-center font-black ${isActive ? "text-white" : "text-slate-500"}`}>
                                    {item.icon}
                                 </span>
                                 <span className="truncate">{item.label}</span>
                                 {isActive && <span className="ml-auto text-white/60 shrink-0">▶</span>}
                              </button>
                           </li>
                        );
                     })}
                  </ul>
               )}

               {type === "portfolio" && (
                  <ul className="space-y-1">
                     {portfolioMenu.map((item) => {
                        const isActive =
                           (item.id === "galeri" && activeMenu === "galeri") ||
                           (item.id === "portfolio" && activeMenu === "portfolio") ||
                           (item.id === "upload" && pathname === "/upload");
                        return (
                           <li key={item.id}>
                              <button
                                 onClick={() => {
                                    if (item.id === "upload") {
                                       router.push("/upload");
                                    } else if (item.id === "galeri") {
                                       router.push("/portfolio?tab=galeri");
                                    } else {
                                       router.push("/portfolio");
                                    }
                                 }}
                                 className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${isActive
                                    ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-600/30"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                                    }`}
                              >
                                 <span className="text-base w-6 text-center">{item.icon}</span>
                                 <span>{item.label}</span>
                                 {isActive && <span className="ml-auto text-white/60">›</span>}
                              </button>
                           </li>
                        );
                     })}
                  </ul>
               )}
            </div>

            <div className="p-4 border-t border-white/5">
               <div className="rounded-2xl p-3 sidebar-footer-card">
                  <div className="flex items-center gap-2 mb-1">
                     <span className="text-sm">✨</span>
                     <span className="text-xs font-bold text-indigo-300">LogoCraft</span>
                  </div>
                  <p className="text-xs text-slate-400">Platform belajar desain logo terbaik</p>
               </div>
            </div>
         </div>
      </aside>
   );
}