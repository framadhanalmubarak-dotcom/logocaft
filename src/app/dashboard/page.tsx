"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [materiSelesai, setMateriSelesai] = useState(0);
  const [videoDitonton, setVideoDitonton] = useState(0);
  const [jumlahKarya, setJumlahKarya] = useState(0);
  const [progressList, setProgressList] = useState<number[]>([]);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
        const data = snap.data();
        setMateriSelesai(data.materiSelesai || 0);
        setVideoDitonton(data.videoDitonton || 0);
        setProgressList(data.materiSelesaiList || []);
      }
      const karyaSnap = await getDocs(
        query(collection(db, "portfolio"), where("uid", "==", user.uid))
      );
      setJumlahKarya(karyaSnap.size);
    };
    fetchData();
  }, [user]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
        <p className="text-slate-500 text-sm">Memuat dashboard...</p>
      </div>
    </div>
  );
  if (!user) return null;

  const totalMateri = 6;
  const overallProgress = Math.round((materiSelesai / totalMateri) * 100);

  const stats = [
    {
      label: "Materi Selesai",
      value: materiSelesai,
      total: totalMateri,
      icon: "📚",
      bg: "from-blue-500 to-blue-600",
      lightBg: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      label: "Video Ditonton",
      value: videoDitonton,
      total: 5,
      icon: "🎬",
      bg: "from-amber-500 to-orange-500",
      lightBg: "bg-amber-50",
      color: "text-amber-600",
    },
    {
      label: "Jumlah Karya",
      value: jumlahKarya,
      total: null,
      icon: "🎨",
      bg: "from-purple-500 to-violet-600",
      lightBg: "bg-purple-50",
      color: "text-purple-600",
    },
  ];

  const materiProgress = [
    { label: "Pengantar Desain", id: 1, icon: "📖" },
    { label: "Color Theory", id: 2, icon: "🎨" },
    { label: "Typography", id: 3, icon: "Aa" },
    { label: "Komposisi", id: 4, icon: "🟣" },
    { label: "Layout", id: 5, icon: "▦" },
    { label: "Logo Huruf", id: 6, icon: "M" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="mx-auto flex max-w-7xl gap-4 lg:gap-8 px-4 md:px-6 lg:px-8 py-6 lg:py-10">
        <Sidebar type="dashboard" />

        {/* CONTENT */}
        <main className="w-full flex-1 min-w-0 space-y-6">
          {/* HEADER */}
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600 p-8 text-white shadow-xl shadow-blue-600/20">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <p className="text-blue-200 text-sm font-medium mb-1">Selamat datang kembali 👋</p>
                <h1 className="text-2xl md:text-3xl font-black">
                  Halo, {user.displayName?.split(" ")[0] || "Pengguna"}!
                </h1>
                <p className="text-blue-100 mt-2 text-sm">
                  {overallProgress === 0
                    ? "Yuk mulai belajar hari ini! 🚀"
                    : overallProgress === 100
                      ? "Luar biasa! Kamu sudah menyelesaikan semua materi! 🎉"
                      : `Kamu sudah ${overallProgress}% dari perjalanan belajarmu! Terus semangat!`}
                </p>
              </div>
              <div className="hidden lg:flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 text-5xl">
                {overallProgress === 100 ? "🏆" : "📘"}
              </div>
            </div>
          </div>

          {/* STATISTIK */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl bg-white border border-slate-100 shadow-sm p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${stat.lightBg}`}>
                    {stat.icon}
                  </div>
                  {stat.total && (
                    <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                      dari {stat.total}
                    </span>
                  )}
                </div>
                <div className={`text-4xl font-black ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-slate-500 mt-1 font-medium">{stat.label}</div>
                {stat.total && (
                  <div className="mt-3 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full bg-gradient-to-r ${stat.bg} transition-transform origin-left`}
                      style={{ transform: `scaleX(${Math.min((stat.value / stat.total) * 100, 100) / 100})` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* PROGRESS BELAJAR */}
          <div className="rounded-3xl bg-white border border-slate-100 shadow-sm p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-black text-slate-900">Progress Belajar</h2>
                <p className="text-sm text-slate-500 mt-1">Pantau perkembangan belajar kamu</p>
              </div>
              <button
                onClick={() => router.push("/materi")}
                className="rounded-2xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-100 transition"
              >
                Lanjut Belajar →
              </button>
            </div>

            <div className="space-y-4">
              {materiProgress.map((item) => {
                const selesai = progressList.includes(item.id);
                return (
                  <div key={item.label} className={`flex items-center gap-4 p-4 rounded-2xl transition ${selesai ? "bg-green-50" : "bg-slate-50"}`}>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg font-black shrink-0 ${selesai ? "bg-green-100 text-green-600" : "bg-white border border-slate-200 text-slate-400"}`}>
                      {selesai ? "✓" : item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm font-semibold ${selesai ? "text-green-700" : "text-slate-700"}`}>
                          {item.label}
                        </span>
                        <span className={`text-xs font-bold ${selesai ? "text-green-600" : "text-slate-400"}`}>
                          {selesai ? "100%" : "0%"}
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-white border border-slate-100 overflow-hidden">
                        <div
                          className={`h-2 rounded-full transition-transform origin-left ${selesai ? "bg-gradient-to-r from-green-400 to-emerald-500" : "bg-slate-200"}`}
                          style={{ transform: `scaleX(${selesai ? 1 : 0})` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Overall */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-base font-black text-slate-800">Overall Progress</span>
                <span className="text-base font-black text-blue-600">{overallProgress}%</span>
              </div>
              <div className="h-4 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-transform origin-left"
                  style={{ transform: `scaleX(${overallProgress / 100})` }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-2">
                {materiSelesai} dari {totalMateri} materi telah diselesaikan
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Lanjut Materi", desc: "Baca materi berikutnya", icon: "📚", href: "/materi", color: "from-blue-500 to-blue-600" },
              { label: "Tonton Tutorial", desc: "Pelajari dari video", icon: "🎬", href: "/tutorial", color: "from-red-500 to-rose-600" },
              { label: "Upload Karya", desc: "Tambah karya baru", icon: "🎨", href: "/upload", color: "from-purple-500 to-violet-600" },
            ].map((action) => (
              <button
                key={action.label}
                onClick={() => router.push(action.href)}
                className={`rounded-3xl bg-gradient-to-br ${action.color} p-6 text-left text-white hover:opacity-90 transition shadow-lg`}
              >
                <div className="text-3xl mb-3">{action.icon}</div>
                <p className="font-bold text-base">{action.label}</p>
                <p className="text-xs text-white/70 mt-1">{action.desc}</p>
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
