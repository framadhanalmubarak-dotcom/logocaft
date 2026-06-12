"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

const tutorialList = [
  {
    id: 1,
    title: "Download Adobe Illustrator",
    icon: "💻",
    desc: "Panduan mengunduh dan menginstall Adobe Illustrator.",
    duration: "3:31",
    level: "Pemula",
    videoUrl: "https://www.youtube.com/watch?v=UC8ddhyCVOM",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1jM-xDMOT5ChKOfVIK0seKrlSpaLhpsvn",
    about: "Tutorial ini membantu kamu mengunduh dan menginstal Adobe Illustrator dengan benar sebelum mulai belajar desain logo.",
    learn: ["Mengenal Adobe Illustrator", "Mengunduh installer resmi", "Proses instalasi", "Aktivasi aplikasi", "Persiapan sebelum belajar desain"],
  },
  {
    id: 2,
    title: "Mengatur Workspace",
    icon: "🖥️",
    desc: "Cara mengatur workspace agar nyaman saat desain.",
    duration: "4:16",
    level: "Pemula",
    videoUrl: "https://www.youtube.com/watch?v=CY_8sHmGHPE",
    downloadUrl: "",
    about: "Sebelum mulai membuat logo, penting untuk mengatur workspace terlebih dahulu agar proses desain menjadi lebih nyaman.",
    learn: ["Mengenal bagian-bagian penting Adobe Illustrator", "Menampilkan panel yang dibutuhkan", "Mengatur workspace desain logo", "Tips mempercepat proses kerja", "Persiapan sebelum membuat logo"],
  },
  {
    id: 3,
    title: "Membuat Logo 2 Huruf",
    icon: "🔤",
    desc: "Teknik membuat logo dari 2 huruf yang menarik.",
    duration: "12:10",
    level: "Menengah",
    videoUrl: "https://www.youtube.com/watch?v=-yQqoJKVDNU&list=PL8YQMOyjCgqYS8AGFcOmZMiIDM96A1y2Q",
    downloadUrl: "",
    about: "Pelajari teknik dasar membuat logo dari 2 huruf yang menarik dan profesional.",
    learn: ["Memilih font yang tepat", "Teknik kombinasi 2 huruf", "Mengatur proporsi dan spacing", "Menambahkan warna yang sesuai", "Export file logo"],
  },
  {
    id: 4,
    title: "Membuat Logo 3 Huruf",
    icon: "🔠",
    desc: "Teknik membuat logo dari 3 huruf yang unik.",
    duration: "18:05",
    level: "Menengah",
    videoUrl: "https://www.youtube.com/watch?v=bVCKtAXovw8&list=PL8YQMOyjCgqbH19QjU-Lu2NureW_o7Mo-",
    downloadUrl: "",
    about: "Pelajari cara membuat logo monogram dari 3 huruf yang terlihat unik dan berkesan.",
    learn: ["Konsep logo 3 huruf", "Teknik penggabungan huruf", "Bermain dengan bentuk dan ruang", "Finishing dan detail logo", "Presentasi hasil logo"],
  },
  {
    id: 5,
    title: "Membuat Logo Unik",
    icon: "✨",
    desc: "Kombinasi elemen untuk menghasilkan logo yang orisinal.",
    duration: "22:30",
    level: "Mahir",
    videoUrl: "https://www.youtube.com/watch?v=wWOGTuds0xs&list=PL8YQMOyjCgqbBXSy5zpBk27LA94U1fElX",
    downloadUrl: "",
    about: "Tingkatkan kemampuan desain logo kamu dengan mempelajari kombinasi elemen kreatif untuk hasil yang orisinal.",
    learn: ["Riset dan konsep logo", "Eksplorasi bentuk unik", "Teknik negative space", "Kombinasi warna advanced", "Membuat brand identity"],
  },
];

export default function TutorialPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeId, setActiveId] = useState(1);
  const [tontonList, setTontonList] = useState<number[]>([]);

  const active = tutorialList.find((t) => t.id === activeId)!;
  const activeIndex = tutorialList.findIndex((t) => t.id === activeId);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    const fetchTonton = async () => {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) setTontonList(snap.data().videoDitontonList || []);
    };
    fetchTonton();
  }, [user]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return null;

  const getVideoId = (url: string) => {
    if (url.includes("watch?v=")) return url.split("watch?v=")[1]?.split("&")[0];
    if (url.includes("/embed/")) return url.split("/embed/")[1]?.split("?")[0];
    return "";
  };

  const handleTontonVideo = async () => {
    window.open(active.videoUrl, "_blank");
    try {
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);
      const list: number[] = snap.data()?.videoDitontonList || [];
      if (!list.includes(active.id)) {
        await updateDoc(userRef, {
          videoDitontonList: arrayUnion(active.id),
          videoDitonton: list.length + 1,
        });
        setTontonList([...list, active.id]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const sudahTonton = tontonList.includes(activeId);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="mx-auto max-w-7xl px-8 py-8 flex gap-6">
        <Sidebar
          type="tutorial"
          activeMenu={String(activeId)}
          onMenuClick={(id) => setActiveId(Number(id))}
        />

        {/* CONTENT */}
        <main className="flex-1 min-w-0">
          <div className="rounded-3xl bg-white border border-slate-100 shadow-sm p-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <span className="hover:text-red-600 cursor-pointer">Tutorial</span>
              <span>›</span>
              <span className="text-slate-700">{active.title}</span>
            </div>

            <h1 className="text-4xl font-black text-slate-900 mb-2">{active.title}</h1>
            <p className="text-slate-500 mb-6">{active.desc}</p>

            {/* Badge */}
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center gap-1 text-sm text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
                ⏱️ {active.duration}
              </span>
              <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${active.level === "Pemula" ? "bg-green-100 text-green-700"
                : active.level === "Menengah" ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
                }`}>
                {active.level}
              </span>
              {sudahTonton && (
                <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-green-100 text-green-700">
                  ✓ Sudah Ditonton
                </span>
              )}
            </div>

            {/* Video Player */}
            <div
              className="w-full aspect-video rounded-2xl bg-slate-900 mb-8 overflow-hidden relative group cursor-pointer"
              onClick={handleTontonVideo}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://img.youtube.com/vi/${getVideoId(active.videoUrl)}/maxresdefault.jpg`}
                alt={active.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center justify-center gap-4 group-hover:from-black/70 transition">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-600 hover:bg-red-500 transition shadow-2xl shadow-red-600/50 group-hover:scale-110">
                  <svg className="h-8 w-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="flex items-center gap-2 rounded-2xl bg-white/90 backdrop-blur px-5 py-2.5 text-sm font-bold text-slate-800 shadow-lg">
                  <svg className="h-5 w-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  Tonton di YouTube
                </div>
              </div>
            </div>

            {/* Tombol Download */}
            {active.downloadUrl && (
              <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-2xl">📦</div>
                  <div>
                    <p className="font-bold text-slate-800">File Pendukung</p>
                    <p className="text-sm text-slate-500">Download file untuk tutorial ini</p>
                  </div>
                </div>

                <a
                  href={active.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
                >
                  ⬇️ Download File
                </a>
              </div>
            )}

            {/* Tentang Tutorial */}
            <div className="mb-8">
              <h2 className="text-2xl font-black text-slate-900 mb-4">Tentang Tutorial Ini</h2>
              <p className="text-slate-600 leading-relaxed">{active.about}</p>
            </div>

            {/* Yang Dipelajari */}
            <div className="mb-8">
              <h2 className="text-2xl font-black text-slate-900 mb-4">Yang Akan Anda Pelajari</h2>
              <ul className="space-y-3">
                {active.learn?.map((item, index) => (
                  <li key={index} className="flex gap-3 p-3 rounded-xl bg-slate-50">
                    <span className="text-red-600 font-bold">✓</span>
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-12 pt-6 border-t border-slate-100">
              <button
                onClick={() => activeIndex > 0 && setActiveId(tutorialList[activeIndex - 1].id)}
                disabled={activeIndex === 0}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-red-600 text-red-600 font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-red-50 transition"
              >
                ← Tutorial Sebelumnya
              </button>
              <button
                onClick={() => activeIndex < tutorialList.length - 1 && setActiveId(tutorialList[activeIndex + 1].id)}
                disabled={activeIndex === tutorialList.length - 1}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition shadow-lg shadow-red-600/20"
              >
                Tutorial Berikutnya →
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}