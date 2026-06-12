"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

const materiList = [
  {
    id: 1,
    title: "Pengantar Desain",
    icon: "📖",
    desc: "Memahami dasar-dasar desain sebelum membuat logo yang menarik.",
    content: {
      sections: [
        {
          heading: "Apa itu Desain?",
          text: "Desain adalah proses perencanaan dan pembuatan solusi visual untuk menyampaikan pesan atau ide. Dalam konteks logo, desain bertujuan untuk menciptakan identitas visual yang unik, mudah diingat, dan mampu mewakili karakter suatu brand.",
        },
        {
          heading: "Elemen Dasar Desain",
          text: "Beberapa elemen dasar yang perlu dipahami dalam desain logo:",
          list: [
            { label: "Garis", desc: "Elemen dasar yang membentuk struktur dan arah." },
            { label: "Bentuk", desc: "Area tertutup yang dibentuk oleh garis, seperti persegi, lingkaran, atau bentuk bebas." },
            { label: "Warna", desc: "Memberi kesan, emosi, dan karakter pada desain." },
            { label: "Tipografi", desc: "Seni memilih dan mengatur huruf agar pesan mudah dibaca dan menarik." },
          ],
        },
        {
          heading: "Mengapa Desain Logo Itu Penting?",
          text: "Logo adalah wajah dari sebuah brand. Logo yang baik dapat membangun kesan profesional, meningkatkan kepercayaan, dan membedakan brand dari kompetitor.",
        },
      ],
    },
  },
  {
    id: 2,
    title: "Color Theory",
    icon: "🎨",
    desc: "Memahami teori warna dan penerapannya dalam logo.",
    content: {
      sections: [
        {
          heading: "Apa itu Color Theory?",
          text: "Teori warna adalah panduan tentang bagaimana warna berinteraksi satu sama lain dan bagaimana warna mempengaruhi emosi serta persepsi manusia.",
        },
        {
          heading: "Roda Warna",
          text: "Roda warna terdiri dari warna primer, sekunder, dan tersier yang saling berkaitan.",
          list: [
            { label: "Warna Primer", desc: "Merah, Kuning, Biru — warna dasar yang tidak bisa dicampur dari warna lain." },
            { label: "Warna Sekunder", desc: "Hijau, Oranye, Ungu — hasil campuran dua warna primer." },
            { label: "Warna Tersier", desc: "Campuran warna primer dan sekunder yang berdekatan." },
          ],
        },
      ],
    },
  },
  {
    id: 3,
    title: "Typography",
    icon: "Aa",
    desc: "Mempelajari jenis huruf dan cara memilih yang tepat.",
    content: {
      sections: [
        {
          heading: "Apa itu Typography?",
          text: "Typography adalah seni dan teknik mengatur huruf untuk membuat tulisan yang mudah dibaca, jelas, dan menarik secara visual.",
        },
        {
          heading: "Jenis-jenis Font",
          text: "Beberapa kategori font yang umum digunakan dalam desain logo:",
          list: [
            { label: "Serif", desc: "Font dengan kait di ujung huruf, terkesan klasik dan formal." },
            { label: "Sans-serif", desc: "Font tanpa kait, terkesan modern dan bersih." },
            { label: "Script", desc: "Font yang menyerupai tulisan tangan, terkesan elegan." },
            { label: "Display", desc: "Font dekoratif untuk judul dan branding yang kuat." },
          ],
        },
      ],
    },
  },
  {
    id: 4,
    title: "Komposisi",
    icon: "🟣",
    desc: "Membuat komposisi logo yang harmonis dan menarik.",
    content: {
      sections: [
        {
          heading: "Apa itu Komposisi?",
          text: "Komposisi adalah cara menyusun elemen-elemen visual dalam sebuah desain agar terlihat seimbang, harmonis, dan enak dipandang.",
        },
        {
          heading: "Prinsip Komposisi",
          text: "Prinsip dasar komposisi yang perlu dikuasai:",
          list: [
            { label: "Balance", desc: "Keseimbangan elemen visual secara simetris maupun asimetris." },
            { label: "Proximity", desc: "Elemen yang berhubungan diletakkan berdekatan." },
            { label: "Alignment", desc: "Penataan elemen secara teratur dan konsisten." },
            { label: "Contrast", desc: "Perbedaan visual yang menciptakan fokus dan hierarki." },
          ],
        },
      ],
    },
  },
  {
    id: 5,
    title: "Layout",
    icon: "▦",
    desc: "Mengatur tata letak elemen agar logo terlihat seimbang.",
    content: {
      sections: [
        {
          heading: "Apa itu Layout?",
          text: "Layout adalah pengaturan tata letak elemen-elemen desain dalam sebuah ruang. Layout yang baik membantu mata pengguna mengikuti alur informasi dengan natural.",
        },
        {
          heading: "Jenis Layout Logo",
          text: "Beberapa jenis layout yang umum digunakan dalam desain logo:",
          list: [
            { label: "Stacked", desc: "Ikon di atas, teks di bawah — cocok untuk logo persegi." },
            { label: "Horizontal", desc: "Ikon di samping teks — cocok untuk header website." },
            { label: "Emblem", desc: "Teks dan ikon menyatu dalam satu bentuk." },
          ],
        },
      ],
    },
  },
  {
    id: 6,
    title: "Logo Huruf",
    icon: "M",
    desc: "Membuat logo huruf/monogram yang simple dan elegan.",
    content: {
      sections: [
        {
          heading: "Apa itu Logo Huruf?",
          text: "Logo huruf atau lettermark adalah logo yang dibuat dari inisial atau huruf tertentu. Jenis logo ini sederhana namun sangat kuat dalam membangun identitas brand.",
        },
        {
          heading: "Teknik Membuat Logo Huruf",
          text: "Beberapa teknik yang bisa digunakan:",
          list: [
            { label: "Monogram", desc: "Menggabungkan dua atau lebih huruf menjadi satu bentuk unik." },
            { label: "Ligature", desc: "Menghubungkan huruf-huruf secara artistik." },
            { label: "Negative Space", desc: "Memanfaatkan ruang kosong untuk menciptakan bentuk tersembunyi." },
          ],
        },
      ],
    },
  },
];

export default function MateriPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeId, setActiveId] = useState(1);
  const [selesaiList, setSelesaiList] = useState<number[]>([]);
  const [tandaiLoading, setTandaiLoading] = useState(false);

  const active = materiList.find((m) => m.id === activeId)!;
  const activeIndex = materiList.findIndex((m) => m.id === activeId);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    const fetchProgress = async () => {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
        setSelesaiList(snap.data().materiSelesaiList || []);
      }
    };
    fetchProgress();
  }, [user]);

  const handleTandaiSelesai = async () => {
    if (!user || selesaiList.includes(activeId)) return;
    setTandaiLoading(true);
    try {
      const userRef = doc(db, "users", user.uid);
      const newList = [...selesaiList, activeId];
      await updateDoc(userRef, {
        materiSelesaiList: arrayUnion(activeId),
        materiSelesai: newList.length,
      });
      setSelesaiList(newList);
    } catch (err) {
      console.error(err);
    } finally {
      setTandaiLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return null;

  const sudahSelesai = selesaiList.includes(activeId);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="mx-auto max-w-7xl px-8 py-8 flex gap-6">
        <Sidebar
          type="materi"
          activeMenu={String(activeId)}
          onMenuClick={(id) => setActiveId(Number(id))}
        />

        {/* CONTENT */}
        <main className="flex-1 min-w-0">
          <div className="rounded-3xl bg-white border border-slate-100 shadow-sm p-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <span className="hover:text-blue-600 cursor-pointer">Materi</span>
              <span>›</span>
              <span className="text-slate-700">{active.title}</span>
            </div>

            <h1 className="text-4xl font-black text-slate-900 mb-2">{active.title}</h1>
            <p className="text-slate-500 mb-8">{active.desc}</p>

            {/* Thumbnail */}
            <div className="w-full h-52 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 mb-10 flex items-center justify-center overflow-hidden">
              <div className="flex gap-8 items-center opacity-30">
                <span className="text-8xl">✒️</span>
                <span className="text-8xl font-serif font-black text-white">Aa</span>
                <span className="text-8xl">🎨</span>
                <span className="text-8xl">🖼️</span>
              </div>
            </div>

            {/* Konten */}
            {active.content.sections.map((section, i) => (
              <div key={i} className="mb-8">
                <h2 className="text-2xl font-black text-slate-900 mb-2">{section.heading}</h2>
                <p className="text-slate-600 leading-relaxed mb-3">{section.text}</p>
                {section.list && (
                  <ul className="space-y-3 mt-3">
                    {section.list.map((item, j) => (
                      <li key={j} className="flex gap-3 p-3 rounded-xl bg-slate-50">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span className="text-slate-600">
                          <span className="font-bold text-slate-800">{item.label}:</span>{" "}
                          {item.desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Tombol Tandai Selesai */}
            <div className="mt-8 mb-4">
              {sudahSelesai ? (
                <div className="flex items-center gap-2 rounded-2xl bg-green-50 border border-green-200 px-6 py-3 text-green-600 font-bold w-fit">
                  ✅ Materi ini sudah selesai dibaca!
                </div>
              ) : (
                <button
                  onClick={handleTandaiSelesai}
                  disabled={tandaiLoading}
                  className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-white font-bold hover:opacity-90 disabled:opacity-50 transition shadow-lg shadow-blue-600/30"
                >
                  {tandaiLoading ? "Menyimpan..." : "✓ Tandai Selesai"}
                </button>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6 pt-6 border-t border-slate-100">
              <button
                onClick={() => activeIndex > 0 && setActiveId(materiList[activeIndex - 1].id)}
                disabled={activeIndex === 0}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-blue-600 text-blue-600 font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-50 transition"
              >
                ← Materi Sebelumnya
              </button>
              <button
                onClick={() => activeIndex < materiList.length - 1 && setActiveId(materiList[activeIndex + 1].id)}
                disabled={activeIndex === materiList.length - 1}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition shadow-lg shadow-blue-600/20"
              >
                Materi Berikutnya →
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}