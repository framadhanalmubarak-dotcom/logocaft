"use client";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function UploadPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [namaKarya, setNamaKarya] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [kategori, setKategori] = useState("Logo Monogram");
  const [tampilkan, setTampilkan] = useState<"portfolio" | "galeri">("portfolio");
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return null;

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran file maksimal 2MB!");
      return;
    }
    setFileName(file.name);
    setFileSize((file.size / 1024 / 1024).toFixed(1) + " MB");
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreview(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSimpan = async () => {
    if (!namaKarya || !preview) {
      alert("Nama karya dan file wajib diisi!");
      return;
    }
    setUploading(true);
    try {
      await addDoc(collection(db, "portfolio"), {
        uid: user.uid,
        namaKarya,
        deskripsi,
        kategori,
        tampilkan,
        imageBase64: preview,
        fileName,
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
      setTimeout(() => {
        router.push("/portfolio");
      }, 1500);
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan karya. Coba lagi!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FF]">
      <Navbar />

      <div className="mx-auto max-w-5xl px-8 py-10">
        {/* Tombol Kembali */}
        <button
          onClick={() => router.push("/portfolio")}
          className="flex items-center gap-2 rounded-xl border-2 border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:border-blue-600 hover:text-blue-600 transition mb-6"
        >
          ← Kembali ke Portfolio
        </button>
        <h1 className="text-3xl font-bold text-slate-900 mb-1">Upload Karya</h1>
        <p className="text-slate-500 mb-8">Unggah karya logo terbaikmu dan tampilkan di portfolio kamu.</p>

        {success && (
          <div className="mb-6 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-600 font-medium">
            ✅ Karya berhasil disimpan! Mengalihkan ke portfolio...
          </div>
        )}

        <div className="flex gap-8">
          {/* FORM */}
          <div className="flex-1 rounded-2xl bg-white border border-slate-100 shadow-sm p-8 space-y-6">

            {/* Nama Karya */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Karya</label>
              <input
                type="text"
                value={namaKarya}
                onChange={(e) => setNamaKarya(e.target.value)}
                placeholder="Logo Monogram Huruf A"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Deskripsi</label>
              <textarea
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder="Deskripsikan karya kamu..."
                maxLength={500}
                rows={4}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
              />
              <div className="text-right text-xs text-slate-400 mt-1">{deskripsi.length} / 500</div>
            </div>

            {/* Kategori */}
            <div>
              <label htmlFor="kategori" className="block text-sm font-semibold text-slate-700 mb-2">Kategori</label>
              <select
                id="kategori"
                aria-label="Kategori karya"
                value={kategori}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setKategori(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="Logo Monogram">Logo Monogram</option>
                <option value="Color Theory">Color Theory</option>
                <option value="Typography">Typography</option>
                <option value="Komposisi">Komposisi</option>
                <option value="Layout">Layout</option>
                <option value="Elemen Desain">Elemen Desain</option>
              </select>
            </div>

            {/* Tampilkan di */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Tampilkan di</label>
              <div className="flex gap-4">
                <label className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${tampilkan === "portfolio" ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-slate-300"
                  }`}>
                  <input
                    type="radio"
                    name="tampilkan"
                    value="portfolio"
                    checked={tampilkan === "portfolio"}
                    onChange={() => setTampilkan("portfolio")}
                    className="accent-blue-600"
                  />
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">🔒 Portfolio Saya</p>
                    <p className="text-xs text-slate-500">Hanya kamu yang bisa lihat</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Upload File */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Upload File</label>
              {fileName ? (
                <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🖼️</span>
                    <div>
                      <p className="text-sm font-medium text-slate-700">{fileName}</p>
                      <p className="text-xs text-slate-400">PNG • {fileSize}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setPreview(null); setFileName(""); setFileSize(""); }}
                    className="text-slate-400 hover:text-red-500"
                  >✕</button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed border-slate-200 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition">
                  <span className="text-3xl mb-2">📁</span>
                  <span className="text-sm text-slate-500">Klik untuk upload file</span>
                  <input
                    type="file"
                    accept="image/png,image/jpg,image/jpeg,image/svg+xml"
                    onChange={handleFile}
                    className="hidden"
                  />
                </label>
              )}
              <p className="text-xs text-slate-400 mt-2">Format yang didukung: PNG, JPG, SVG (Max 2MB)</p>
            </div>

            {/* Tombol Simpan */}
            <button
              onClick={handleSimpan}
              disabled={uploading}
              className="w-full rounded-xl bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 transition flex items-center justify-center gap-2"
            >
              {uploading ? "Menyimpan..." : "🖼️ Simpan Karya"}
            </button>
          </div>

          {/* PREVIEW */}
          <div className="w-80 shrink-0">
            <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
              <h3 className="text-base font-bold text-slate-800 mb-4">Preview Karya</h3>

              <div className="w-full h-56 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden mb-4">
                {preview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={preview} alt="preview" className="w-full h-full object-contain" />
                ) : (
                  <span className="text-slate-300 text-5xl">🖼️</span>
                )}
              </div>

              {fileName && (
                <div className="flex items-center justify-between rounded-xl bg-green-50 border border-green-100 px-4 py-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span>🖼️</span>
                    <div>
                      <p className="text-xs font-medium text-slate-700">{fileName}</p>
                      <p className="text-xs text-slate-400">{fileSize}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-lg">
                    Siap diunggah
                  </span>
                </div>
              )}

              {/* Info tampilkan */}
              <div className={`rounded-xl px-4 py-3 text-xs font-medium ${tampilkan === "galeri"
                ? "bg-blue-50 text-blue-600"
                : "bg-slate-50 text-slate-500"
                }`}>
                {tampilkan === "galeri"
                  ? "🌐 Akan ditampilkan di Galeri Karya (publik)"
                  : "🔒 Hanya tampil di Portfolio Saya (privat)"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}