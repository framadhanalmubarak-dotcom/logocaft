import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const materi = [
    {
      title: "Color Theory",
      desc: "Memahami teori warna dan cara penerapannya dalam logo.",
      icon: "🎨",
      iconBg: "bg-red-50",
      iconColor: "text-4xl",
    },
    {
      title: "Typography",
      desc: "Mempelajari jenis huruf dan cara memilih yang tepat.",
      icon: "Aa",
      iconBg: "bg-blue-50",
      iconColor: "text-slate-900 font-black text-3xl leading-none",
    },
    {
      title: "Layout",
      desc: "Mengatur tata letak elemen agar logo terlihat seimbang.",
      icon: "▦",
      iconBg: "bg-orange-50",
      iconColor: "text-slate-900 font-black text-3xl leading-none",
    },
    {
      title: "Komposisi",
      desc: "Membuat komposisi logo yang harmonis dan menarik.",
      icon: "🟣",
      iconBg: "bg-purple-50",
      iconColor: "text-4xl",
    },
    {
      title: "Elemen Desain",
      desc: "Mengenal elemen desain seperti shape, line, dan texture.",
      icon: "✒️",
      iconBg: "bg-indigo-50",
      iconColor: "text-4xl",
    },
    {
      title: "Logo Monogram",
      desc: "Membuat logo huruf/monogram yang simple dan elegan.",
      icon: "M",
      iconBg: "bg-slate-100",
      iconColor: "text-slate-900 font-black text-3xl leading-none",
    },
  ];

  const langkah = [
    { no: "1", title: "Daftar", desc: "Buat akun secara gratis dan mulai perjalananmu.", icon: "👤" },
    { no: "2", title: "Belajar", desc: "Pilih materi dan pelajari konsep desain logo.", icon: "📖" },
    { no: "3", title: "Tonton Tutorial", desc: "Ikuti tutorial video untuk memahami lebih dalam.", icon: "▶️" },
    { no: "4", title: "Buat Logo", desc: "Praktik langsung membuat logo huruf kreatifmu.", icon: "✏️" },
    { no: "5", title: "Simpan Portfolio", desc: "Simpan karya terbaikmu di portfolio pribadi.", icon: "📁" },
  ];

  const stats = [
    { value: "500+", label: "Pelajar Aktif" },
    { value: "6", label: "Materi Lengkap" },
    { value: "5", label: "Video Tutorial" },
    { value: "100%", label: "Gratis" },
  ];

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-8 py-24 lg:flex-row lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm text-blue-300 mb-8">
              <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
              Platform Belajar Desain Logo #1
            </div>

            <h1 className="text-5xl font-black leading-tight lg:text-7xl">
              Belajar Membuat
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Logo Huruf
              </span>
              dari Dasar
            </h1>

            <p className="mt-6 max-w-lg text-lg text-slate-300 leading-relaxed">
              Pelajari warna, typography, komposisi, dan teknik membuat logo huruf dalam satu platform. Gratis dan mudah dipahami.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row lg:justify-start justify-center">
              <Link href="/register" className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-base font-bold hover:bg-blue-500 transition shadow-lg shadow-blue-600/30">
                Mulai Belajar Gratis →
              </Link>
              <Link href="/materi" className="flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-600 px-8 py-4 text-base font-bold hover:border-blue-400 hover:text-blue-400 transition">
                Lihat Materi
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-4 gap-6 max-w-lg">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 flex-1 flex justify-center lg:mt-0">
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-blue-600/20 blur-2xl scale-110" />
              <Image
                src="/laptop-logo.png"
                alt="Logo Design"
                width={600}
                height={450}
                priority
                className="relative rounded-2xl drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MATERI */}
      <section className="bg-white py-28">
        <div className="mx-auto max-w-7xl px-8">
          <div className="flex flex-col items-center mb-16">
            <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 mb-4">
              Kurikulum Lengkap
            </span>
            <h2 className="text-center text-5xl font-black text-slate-900">
              Apa yang Akan Dipelajari?
            </h2>
            <p className="mt-4 text-center text-slate-500 max-w-xl">
              Dari dasar hingga mahir, semua materi tersedia lengkap dan terstruktur untuk kamu.
            </p>
            <div className="mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {materi.map((item, index) => (
              <div
                key={index}
                className="group rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer"
              >
                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${item.iconBg} group-hover:scale-110 transition-transform`}>
                  <span className={item.iconColor}>{item.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                <div className="mt-6 flex items-center gap-1 text-blue-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Pelajari sekarang <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CARA KERJA */}
      <section className="bg-gradient-to-br from-slate-950 to-blue-950 py-28 text-white">
        <div className="mx-auto max-w-7xl px-8">
          <div className="flex flex-col items-center mb-20">
            <span className="rounded-full bg-blue-400/10 border border-blue-400/20 px-4 py-2 text-sm font-semibold text-blue-400 mb-4">
              Mudah & Cepat
            </span>
            <h2 className="text-center text-5xl font-black">Cara Kerja</h2>
            <p className="mt-4 text-center text-slate-400 max-w-xl">
              Hanya 5 langkah sederhana untuk mulai belajar dan menghasilkan karya logo terbaik.
            </p>
            <div className="mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400" />
          </div>

          <div className="relative grid gap-8 lg:grid-cols-5">
            {/* Garis penghubung */}
            <div className="absolute top-12 left-[10%] right-[10%] hidden h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 lg:block opacity-30" />

            {langkah.map((item) => (
              <div key={item.no} className="relative flex flex-col items-center text-center group">
                {/* Nomor */}
                <div className="mb-3 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white shadow-lg shadow-blue-600/40 z-10">
                  {item.no}
                </div>

                {/* Icon */}
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-5xl shadow-xl group-hover:bg-blue-600/20 group-hover:border-blue-400/30 transition-all">
                  {item.icon}
                </div>

                <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-28">
        <div className="mx-auto max-w-4xl px-8 text-center">
          <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 p-16 shadow-2xl shadow-blue-600/30">
            <h2 className="text-4xl font-black text-white mb-4">
              Siap Mulai Belajar? 🚀
            </h2>
            <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto">
              Bergabung dengan ratusan pelajar dan mulai perjalanan desain logo kamu sekarang. Gratis!
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/register" className="rounded-2xl bg-white px-8 py-4 text-base font-bold text-blue-600 hover:bg-blue-50 transition shadow-lg">
                Daftar Sekarang — Gratis
              </Link>
              <Link href="/login" className="rounded-2xl border-2 border-white/30 px-8 py-4 text-base font-bold text-white hover:bg-white/10 transition">
                Sudah Punya Akun
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-8 py-16">
          <div className="grid gap-12 md:grid-cols-3 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-black text-sm">LC</div>
                <span className="text-xl font-bold">Logo<span className="text-blue-400">Craft</span></span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Platform belajar desain logo huruf untuk pemula hingga mahir. Gratis dan lengkap.
              </p>
            </div>
            <div>
              <h3 className="mb-5 text-base font-bold">Kontak</h3>
              <div className="space-y-2 text-sm text-slate-400">
                <p>support@logocraft.com</p>
                <p>+62 812-3456-7890</p>
                <p>Jakarta, Indonesia</p>
              </div>
            </div>
            <div>
              <h3 className="mb-5 text-base font-bold">Ikuti Kami</h3>
              <div className="flex gap-3">
                <a href="#" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 hover:bg-pink-600 transition">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" aria-label="YouTube" className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 hover:bg-red-600 transition">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a href="#" aria-label="Facebook" className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 hover:bg-blue-600 transition">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" aria-label="TikTok" className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 hover:bg-slate-600 transition">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">© 2026 LogoCraft. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-slate-500">
              <span className="hover:text-white cursor-pointer transition">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition">Terms of Service</span>
              <span className="hover:text-white cursor-pointer transition">Help Center</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}