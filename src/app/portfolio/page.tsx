"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy, deleteDoc, doc } from "firebase/firestore";

interface Karya {
  id: string;
  uid: string;
  namaKarya: string;
  kategori: string;
  imageBase64: string;
  fileName: string;
  tampilkan: string;
  createdAt: { seconds: number } | null;
}

export default function PortfolioPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab");
  const [activeMenu, setActiveMenu] = useState(tab === "galeri" ? "galeri" : "portfolio");
  const [karya, setKarya] = useState<Karya[]>([]);
  const [fetching, setFetching] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    if (!loading && !user && activeMenu === "portfolio") {
      router.push("/login");
    }
  }, [user, loading, router, activeMenu]);

  useEffect(() => {
    const fetchKarya = async () => {
      setFetching(true);
      setPage(1);
      try {
        let q;
        if (activeMenu === "galeri") {
          q = query(
            collection(db, "portfolio"),
            where("tampilkan", "==", "galeri"),
            orderBy("createdAt", "desc")
          );
        } else {
          if (!user) {
            setKarya([]);
            setFetching(false);
            return;
          }
          q = query(
            collection(db, "portfolio"),
            where("uid", "==", user.uid),
            where("tampilkan", "==", "portfolio"),
            orderBy("createdAt", "desc")
          );
        }
        const snap = await getDocs(q);
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Karya[];
        setKarya(data);
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    };

    fetchKarya();
  }, [activeMenu, user]);

  const handleMenuClick = (id: string) => {
    if (id === "upload") {
      router.push("/upload");
      return;
    }
    if (id === "galeri") {
      router.push("/portfolio?tab=galeri");
      return;
    }
    if (id === "portfolio") {
      router.push("/portfolio");
      return;
    }
    setActiveMenu(id as "galeri" | "portfolio");
  };

  const handleHapus = async (id: string) => {
    if (!user) return;
    if (!confirm("Yakin mau hapus karya ini?")) return;
    try {
      await deleteDoc(doc(db, "portfolio", id));
      setKarya((prev) => prev.filter((k) => k.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user && activeMenu === "portfolio") {
    return null;
  }

  const totalPages = Math.ceil(karya.length / perPage);
  const displayed = karya.slice((page - 1) * perPage, page * perPage);

  const formatTanggal = (ts: { seconds: number } | null) => {
    if (!ts) return "-";
    return new Date(ts.seconds * 1000).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 flex flex-col lg:flex-row gap-4 lg:gap-6">
        <Sidebar type="portfolio" activeMenu={activeMenu} onMenuClick={handleMenuClick} />

        <main className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                {activeMenu === "galeri" ? "Galeri Karya" : "Portfolio Saya"}
              </h1>
              <p className="text-sm sm:text-base text-slate-500 mt-1">
                {activeMenu === "galeri"
                  ? "Karya logo dari semua pengguna LogoCraft."
                  : "Kumpulan karya logo yang telah Anda buat dan simpan."}
              </p>
            </div>
            {activeMenu === "portfolio" && user && (
              <button
                onClick={() => router.push("/upload")}
                className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-violet-600 px-4 sm:px-5 py-2.5 sm:py-3 text-sm font-bold text-white hover:opacity-90 transition shadow-lg shadow-purple-600/20"
              >
                + Upload Karya
              </button>
            )}
          </div>

          {fetching ? (
            <div className="text-center text-slate-400 py-20">Memuat karya...</div>
          ) : karya.length === 0 ? (
            <div className="text-center py-20 rounded-3xl bg-white border border-slate-100 shadow-sm">
              <span className="text-6xl">🎨</span>
              <p className="text-slate-500 mt-4 text-base sm:text-lg font-medium">
                {activeMenu === "galeri"
                  ? "Belum ada karya di galeri."
                  : "Belum ada karya yang diupload."}
              </p>
              {activeMenu === "portfolio" && user && (
                <button
                  onClick={() => router.push("/upload")}
                  className="mt-4 rounded-2xl bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-3 text-sm font-bold text-white hover:opacity-90 transition"
                >
                  Upload Karya Pertama
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {displayed.map((item) => (
                  <div key={item.id} className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
                    <div className="h-40 sm:h-48 bg-slate-100 flex items-center justify-center overflow-hidden p-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.imageBase64} alt={item.namaKarya} className="w-full h-full object-contain" />
                    </div>
                    <div className="p-4 sm:p-5 border-t border-slate-100">
                      <h3 className="text-base sm:text-lg font-black text-slate-900 truncate">{item.namaKarya}</h3>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">{item.kategori}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                        <span>📅</span>
                        <span>{formatTanggal(item.createdAt)}</span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button className="flex-1 rounded-xl sm:rounded-2xl border-2 border-purple-600 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-purple-600 hover:bg-purple-50 transition">
                          Detail
                        </button>
                        {/* Tombol Hapus hanya muncul di Portfolio Saya dan karya milik sendiri */}
                        {activeMenu === "portfolio" && user && item.uid === user.uid && (
                          <button
                            onClick={() => handleHapus(item.id)}
                            className="flex-1 rounded-xl sm:rounded-2xl border-2 border-red-400 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-red-400 hover:bg-red-50 transition"
                          >
                            Hapus
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8 sm:mt-10">
                  <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100 transition">‹</button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button key={p} onClick={() => setPage(p)} className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl text-xs sm:text-sm font-bold transition ${page === p ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg" : "border border-slate-200 text-slate-500 hover:bg-slate-100"}`}>{p}</button>
                  ))}
                  <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100 transition">›</button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}