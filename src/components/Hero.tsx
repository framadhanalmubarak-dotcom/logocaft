import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F5F7FF]">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-8 py-20 lg:flex-row">

        {/* Kiri */}
        <div className="z-10 flex-1">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600">
            Platform Belajar Desain Logo
          </span>

          <h1 className="mt-8 max-w-xl text-5xl font-bold leading-tight text-slate-900">
            Belajar Membuat
            <br />
            Logo Huruf dari
            <br />
            Dasar
          </h1>

          <p className="mt-6 max-w-md text-lg text-slate-600">
            Pelajari warna, typography, komposisi, dan teknik membuat logo huruf
            dalam satu platform.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white transition hover:bg-blue-700">
              Mulai Belajar
            </button>

            <button className="rounded-xl border-2 border-blue-600 px-7 py-4 font-semibold text-blue-600 transition hover:bg-blue-50">
              Lihat Materi
            </button>
          </div>
        </div>

        {/* Kanan */}
        <div className="relative mt-16 flex-1 lg:mt-0">

          {/* Lingkaran Background */}
          <div className="absolute right-0 top-1/2 h-[550px] w-[550px] -translate-y-1/2 rounded-full bg-blue-100 opacity-60" />

          {/* Gambar */}
          <div className="relative z-10">
            <Image
              src="/laptop-logo.png"
              alt="Logo Design"
              width={700}
              height={500}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}