import React, { useState } from 'react';
import { DownloadCloud, FileText, ShieldCheck, Eye, Download, Search, CheckCircle2, BookOpen } from 'lucide-react';

interface DokumenRegulasi {
  id: string;
  nomor: string;
  judul: string;
  instansi: string;
  kategori: 'Regulasi Resmi' | 'Panduan Teknis' | 'Template Master';
  tahun: string;
  deskripsi: string;
  ringkasanIsi: string;
}

export const PerangkatUnduhView: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<DokumenRegulasi | null>(null);
  const [search, setSearch] = useState('');
  const [filterKat, setFilterKat] = useState('Semua');

  const daftarDokumen: DokumenRegulasi[] = [
    {
      id: 'reg-046-2025',
      nomor: 'SK BSKAP KEMENDIKDASMEN NO. 046/H/KR/2025',
      judul: 'Salinan Keputusan Kepala BSKAP tentang Capaian Pembelajaran pada PAUD, Dikdas, dan Dikmen',
      instansi: 'Badan Standar, Kurikulum, dan Asesmen Pendidikan Kemendikdasmen',
      kategori: 'Regulasi Resmi',
      tahun: '2025',
      deskripsi:
        'Dokumen rujukan wajib dan tunggal nasional yang menetapkan Capaian Pembelajaran (CP) terbaru seluruh mata pelajaran Fase A sampai Fase F.',
      ringkasanIsi: `SALINAN KEPUTUSAN KEPALA BADAN STANDAR, KURIKULUM, DAN ASESMEN PENDIDIKAN
KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH
NOMOR 046/H/KR/2025
TENTANG CAPAIAN PEMBELAJARAN PADA PENDIDIKAN ANAK USIA DINI, JENJANG PENDIDIKAN DASAR, DAN JENJANG PENDIDIKAN MENENGAH

MENETAPKAN:
1. Capaian Pembelajaran (CP) memuat sekumpulan kompetensi dan lingkup materi yang disusun secara komprehensif dalam bentuk narasi untuk setiap fase.
2. Fase E (Umumnya Kelas X SMA/SMK) & Fase F (Umumnya Kelas XI dan XII SMA/SMK).
3. Penerapan pendekatan Pembelajaran Mendalam (Deep Learning) melalui 3 pilar: Mindful Learning, Meaningful Learning, dan Joyful Learning.
4. Integrasi karakter Profil Pelajar Pancasila dan 7 Kebiasaan Anak Indonesia Hebat.`,
    },
    {
      id: 'ppa-2025',
      nomor: 'PANDUAN PPA EDISI 2025',
      judul: 'Panduan Pembelajaran dan Asesmen (PPA) Kurikulum Merdeka Terkini',
      instansi: 'Direktorat Jenderal PAUD, Dikdas, dan Dikmen',
      kategori: 'Panduan Teknis',
      tahun: '2025',
      deskripsi:
        'Panduan operasional perencanaan asesmen diagnostik, formatif, sumatif, penentuan KKTP, dan pengolahan rapor peserta didik.',
      ringkasanIsi: `PANDUAN PEMBELAJARAN DAN ASESMEN (PPA) KURIKULUM MERDEKA

POKOK-POKOK PANDUAN:
1. Kriteria Ketercapaian Tujuan Pembelajaran (KKTP) tidak boleh disamakan secara kaku dengan KKM lama, melainkan sebagai penanda interval kompetensi kualitatif.
2. Penilaian Formatif berfungsi membimbing proses belajar (assessment for and as learning), bukan semata menjatuhkan sanksi nilai angka.
3. Asesmen Sumatif (STS & SAS) mengukur pemahaman utuh akhir bab/semester.
4. Rapor memuat nilai akhir dan deskripsi capaian kompetensi tertinggi serta aspek yang memerlukan bimbingan lanjutan.`,
    },
    {
      id: 'modul-deep-learning-master',
      nomor: 'TEMPLATE MASTER DL-2026',
      judul: 'Master Template Modul Ajar Deep Learning (Mindful, Meaningful, Joyful)',
      instansi: 'Tim Pengembang Kurikulum Kemendikdasmen',
      kategori: 'Template Master',
      tahun: '2026',
      deskripsi:
        'Format baku rencana pembelajaran guru dengan integrasi 3 pilar Deep Learning, diferensiasi konten/proses, dan lembar asesmen reflektif.',
      ringkasanIsi: `FORMAT MASTER MODUL AJAR PEMBELAJARAN MENDALAM (DEEP LEARNING)

I. INFORMASI UMUM
- Identitas Modul (Nama Guru, Satuan Pendidikan, Fase/Kelas, Alokasi Waktu)
- Kompetensi Awal & Profil Pelajar Pancasila
- Sarana dan Prasarana

II. KOMPONEN INTI
- Tujuan Pembelajaran (Diturunkan langsung dari SK BSKAP 046/H/KR/2025)
- Pemahaman Bermakna (Meaningful)
- Pertanyaan Pemantik (Mindful)
- Kegiatan Pembelajaran:
  * Pendahuluan (Mindful Atmosphere & KBC)
  * Kegiatan Inti (Meaningful Exploration & Joyful Collab)
  * Penutup (Joyful Reflection)

III. ASESMEN & LAMPIRAN
- Rubrik KKTP
- Lembar Kerja Peserta Didik (LKPD)
- Bahan Bacaan Guru & Peserta Didik`,
    },
    {
      id: 'kokurikuler-7-kebiasaan',
      nomor: 'PANDUAN KOKURIKULER 7-HEBAT',
      judul: 'Panduan Penguatan Karakter 7 Kebiasaan Anak Indonesia Hebat',
      instansi: 'Kementerian Pendidikan Dasar dan Menengah',
      kategori: 'Panduan Teknis',
      tahun: '2025',
      deskripsi:
        'Pedoman penerapan 7 kebiasaan mulia: Bangun Pagi, Beribadah, Berolahraga, Gemar Membaca, Makan Sehat, Gotong Royong, & Tidur Tepat Waktu.',
      ringkasanIsi: `PANDUAN KOKURIKULER 7 KEBIASAAN ANAK INDONESIA HEBAT

7 PILAR KEBIASAAN:
1. Bangun Pagi (Melatih disiplin dan kesegaran raga).
2. Beribadah (Menguatkan spiritualitas dan rasa syukur).
3. Berolahraga (Menjaga kebugaran dan stamina fisik).
4. Gemar Membaca (Membuka cakrawala literasi dan bernalar kritis).
5. Makan Sehat & Bergizi (Asupan nutrisi untuk daya pikir optimal).
6. Bermasyarakat / Gotong Royong (Kepedulian sosial & empati sesama).
7. Tidur Cepat / Tepat Waktu (Memulihkan energi dan kesehatan mental).`,
    },
  ];

  const filteredDocs = daftarDokumen.filter((d) => {
    const matchSearch =
      d.judul.toLowerCase().includes(search.toLowerCase()) ||
      d.nomor.toLowerCase().includes(search.toLowerCase());
    const matchKat = filterKat === 'Semua' || d.kategori === filterKat;
    return matchSearch && matchKat;
  });

  const handleDownloadText = (doc: DokumenRegulasi) => {
    const text = `${doc.nomor}\n${doc.judul}\n${doc.instansi} (${doc.tahun})\n\n${doc.ringkasanIsi}`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-md border-2 border-emerald-300 dark:border-emerald-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-600 text-white rounded-xl shadow-md">
            <DownloadCloud className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Repositori Perangkat Ajar & Regulasi Resmi
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Dokumen Landasan Resmi: SK Kepala BSKAP Kemendikdasmen No. 046/H/KR/2025 & Master Template
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 text-xs font-black border border-blue-300">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          Sumber Resmi Terverifikasi
        </div>
      </div>

      {/* Filter & Pencarian Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Cari regulasi atau dokumen..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {['Semua', 'Regulasi Resmi', 'Panduan Teknis', 'Template Master'].map((kat) => (
            <button
              key={kat}
              type="button"
              onClick={() => setFilterKat(kat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                filterKat === kat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {kat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Dokumen Unduhan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 p-5 shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700">
                  {doc.kategori}
                </span>
                <span className="text-xs font-mono font-bold text-slate-500">{doc.tahun}</span>
              </div>

              <h3 className="font-black text-base text-slate-900 dark:text-white leading-snug">
                {doc.judul}
              </h3>

              <p className="text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400">
                {doc.nomor}
              </p>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {doc.deskripsi}
              </p>

              <p className="text-[10px] text-slate-400">Penerbit: {doc.instansi}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setSelectedDoc(doc)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-blue-600" />
                Lihat Ringkasan
              </button>

              <button
                type="button"
                onClick={() => handleDownloadText(doc)}
                className="px-4 py-2 rounded-xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md flex items-center gap-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                Unduh Berkas
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Preview Ringkasan */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-xl w-full overflow-hidden">
            <div className="bg-emerald-700 text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm">{selectedDoc.nomor}</h3>
                <p className="text-xs text-emerald-100 truncate max-w-md">{selectedDoc.judul}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="p-5 max-h-[70vh] overflow-y-auto space-y-4 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-[11px] whitespace-pre-wrap leading-relaxed">
                {selectedDoc.ringkasanIsi}
              </div>
            </div>

            <div className="p-4 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDownloadText(selectedDoc);
                  setSelectedDoc(null);
                }}
                className="px-5 py-2 rounded-xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Unduh Dokumen Ini
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
