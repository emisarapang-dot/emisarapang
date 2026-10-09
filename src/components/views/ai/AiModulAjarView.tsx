import React, { useState } from 'react';
import { GuruProfile, SekolahProfile, Mapel } from '../../../types';
import { dbService } from '../../../services/db';
import { requestAiGeneration, promptBuilders } from '../../../services/aiService';
import {
  BrainCircuit,
  Sparkles,
  Printer,
  Copy,
  Check,
  Save,
  RotateCcw,
  ShieldCheck,
  Flame,
  FileText,
  Loader2,
} from 'lucide-react';
import { OfficialLetterhead, OfficialSignatureFooter } from '../../common/OfficialLetterhead';

interface AiModulAjarViewProps {
  guru: GuruProfile;
  sekolah: SekolahProfile;
  mapelList: Mapel[];
}

export const AiModulAjarView: React.FC<AiModulAjarViewProps> = ({
  guru,
  sekolah,
  mapelList,
}) => {
  const [mapel, setMapel] = useState(mapelList[0]?.nama || 'Informatika');
  const [fase, setFase] = useState('Fase E');
  const [kelas, setKelas] = useState('Kelas X');
  const [alokasiWaktu, setAlokasiWaktu] = useState('3 JP (3 x 45 Menit)');
  const [elemenCp, setElemenCp] = useState('Berpikir Komputasional & Algoritma Pemrograman');
  const [topik, setTopik] = useState('Struktur Percabangan Bersyarat (Conditionals If-Else)');
  const [modelPembelajaran, setModelPembelajaran] = useState('Problem-Based Learning (PBL)');
  const [profilPelajar, setProfilPelajar] = useState<string[]>([
    'Bernalar Kritis',
    'Kreatif',
    'Gotong Royong',
  ]);
  const [catatanTambahan, setCatatanTambahan] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [generatedDoc, setGeneratedDoc] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [savedAlert, setSavedAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const prompt = promptBuilders.modulAjar({
        mapel,
        fase,
        kelas,
        alokasiWaktu,
        topik,
        elemenCp,
        modelPembelajaran,
        profilPelajar,
        catatanTambahan,
      });

      const result = await requestAiGeneration(
        prompt,
        `Anda adalah Pakar Kurikulum Merdeka Nasional Kemendikdasmen dan Ahli Deep Learning Indonesia.
Patuhi regulasi: SALINAN KEPUTUSAN KEPALA BSKAP KEMENDIKDASMEN NOMOR 046/H/KR/2025 TENTANG CAPAIAN PEMBELAJARAN PADA PAUD, PENDIDIKAN DASAR, DAN PENDIDIKAN MENENGAH.
Gunakan prinsip Deep Learning: Mindful Learning, Meaningful Learning, Joyful Learning.`
      );

      setGeneratedDoc(result);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.message || 'Gagal memproses pembuatan modul ajar AI. Pastikan server backend aktif.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedDoc);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToDb = () => {
    if (!generatedDoc) return;
    dbService.addAiDoc({
      type: 'modul',
      title: `Modul Ajar Deep Learning: ${topik} (${mapel} - ${fase})`,
      content: generatedDoc,
      metadata: { mapel, fase, kelas, topik, modelPembelajaran },
    });
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Printable Kop Surat */}
      <div className="print-only">
        <OfficialLetterhead
          sekolah={sekolah}
          guru={guru}
          documentTitle={`MODUL AJAR DEEP LEARNING: ${topik.toUpperCase()}`}
          documentSubtitle={`Mata Pelajaran: ${mapel} • ${fase} / ${kelas} • Salinan SK BSKAP Kemendikdasmen No. 046/H/KR/2025`}
        />
      </div>

      {/* Header Halaman (Screen Only) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-md border-2 border-orange-300 dark:border-orange-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-600 text-white rounded-xl shadow-md">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Rencana Pembelajaran Mendalam (Modul Ajar Deep Learning)
              </h2>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-600 text-white flex items-center gap-1">
                <Flame className="w-3 h-3" /> HOT
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Generator Modul Mindful, Meaningful, & Joyful Learning berlandaskan SK BSKAP 046/H/KR/2025
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-100 dark:bg-orange-950 text-orange-900 dark:text-orange-200 text-xs font-black border border-orange-300">
          <ShieldCheck className="w-4 h-4 text-orange-600" />
          BSKAP No. 046/H/KR/2025
        </div>
      </div>

      {/* Layout 2 Kolom: Form Input Parameter & Preview Output Dokumen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Kolom Kiri: Form Input Generator (no-print) */}
        <div className="no-print lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <Sparkles className="w-4 h-4 text-orange-500" />
            Parameter Pembelajaran Mendalam
          </h3>

          <form onSubmit={handleGenerate} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Mata Pelajaran
              </label>
              <select
                value={mapel}
                onChange={(e) => setMapel(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
              >
                {mapelList.map((m) => (
                  <option key={m.id} value={m.nama}>
                    {m.nama} ({m.fase})
                  </option>
                ))}
                <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                <option value="Matematika">Matematika</option>
                <option value="Pendidikan Pancasila">Pendidikan Pancasila</option>
                <option value="Fisika">Fisika</option>
                <option value="Biologi">Biologi</option>
                <option value="Kimia">Kimia</option>
                <option value="Ekonomi">Ekonomi</option>
                <option value="Geografi">Geografi</option>
                <option value="Sosiologi">Sosiologi</option>
                <option value="Sejarah">Sejarah</option>
                <option value="Bahasa Inggris">Bahasa Inggris</option>
                <option value="Seni Budaya">Seni Budaya</option>
                <option value="PJOK">PJOK</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Fase
                </label>
                <select
                  value={fase}
                  onChange={(e) => setFase(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                >
                  <option value="Fase E">Fase E (Kelas X)</option>
                  <option value="Fase F">Fase F (Kelas XI/XII)</option>
                  <option value="Fase D">Fase D (SMP)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Tingkat Kelas
                </label>
                <input
                  type="text"
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Alokasi Waktu
              </label>
              <input
                type="text"
                value={alokasiWaktu}
                onChange={(e) => setAlokasiWaktu(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Elemen CP (SK BSKAP 046/H/KR/2025)
              </label>
              <input
                type="text"
                required
                value={elemenCp}
                onChange={(e) => setElemenCp(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Topik / Materi Pembelajaran
              </label>
              <input
                type="text"
                required
                value={topik}
                onChange={(e) => setTopik(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Model Pembelajaran
              </label>
              <select
                value={modelPembelajaran}
                onChange={(e) => setModelPembelajaran(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
              >
                <option value="Problem-Based Learning (PBL)">Problem-Based Learning (PBL)</option>
                <option value="Project-Based Learning (PjBL)">Project-Based Learning (PjBL)</option>
                <option value="Discovery Learning">Discovery Learning</option>
                <option value="Inquiry Learning">Inquiry Learning</option>
                <option value="Diferensiasi Berbasis Stasiun (Station Rotation)">
                  Diferensiasi Berbasis Stasiun
                </option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Catatan Khusus Diferensiasi / Siswa
              </label>
              <textarea
                rows={2}
                placeholder="Contoh: Sediakan analogi visual bagi siswa yang memerlukan scaffolding..."
                value={catatanTambahan}
                onChange={(e) => setCatatanTambahan(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl font-black text-sm bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Menyusun Modul Ajar Deep Learning...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Modul Ajar Mendalam (AI)
                </>
              )}
            </button>
          </form>

          {errorMessage && (
            <div className="p-3 bg-rose-50 text-rose-700 rounded-xl border border-rose-200 text-xs">
              {errorMessage}
            </div>
          )}
        </div>

        {/* Kolom Kanan: Tampilan Modul Ajar yang Dihasilkan */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4">
          <div className="no-print flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-orange-500" />
              Naskah Modul Ajar Resmi
            </h3>

            {generatedDoc && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Tersalin' : 'Salin'}
                </button>
                <button
                  type="button"
                  onClick={handleSaveToDb}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 hover:bg-emerald-700 transition-colors"
                >
                  <Save className="w-3.5 h-3.5" /> Simpan
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold flex items-center gap-1 hover:bg-blue-700 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" /> Cetak
                </button>
              </div>
            )}
          </div>

          {savedAlert && (
            <div className="no-print p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 text-emerald-800 dark:text-emerald-200 text-xs font-bold rounded-xl flex items-center gap-2">
              <Check className="w-4 h-4" /> Modul Ajar berhasil disimpan ke arsip dokumen Anda!
            </div>
          )}

          {/* Isi Dokumen (Dapat diedit langsung) */}
          <div className="flex-1 min-h-[480px]">
            {isLoading ? (
              <div className="h-full flex flex-col items-center justify-center p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
                <p className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
                  Menyusun Modul Ajar Mendalam (Deep Learning)...
                </p>
                <p className="text-xs text-slate-500 max-w-sm">
                  Mengintegrasikan 3 pilar: Mindful, Meaningful, & Joyful Learning berlandaskan Salinan SK BSKAP No. 046/H/KR/2025.
                </p>
              </div>
            ) : generatedDoc ? (
              <textarea
                value={generatedDoc}
                onChange={(e) => setGeneratedDoc(e.target.value)}
                className="w-full h-full min-h-[550px] p-4 text-xs font-mono leading-relaxed bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-12 text-center text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                <BrainCircuit className="w-12 h-12 text-orange-400 mb-3 opacity-60" />
                <h4 className="font-extrabold text-sm text-slate-700 dark:text-slate-300">
                  Belum Ada Modul yang Di-generate
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">
                  Isi parameter pembelajaran di samping kiri lalu klik tombol "Generate Modul Ajar Mendalam" untuk membuat rancangan pembelajaran resmi.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Printable Signature Footer */}
      <div className="print-only">
        <OfficialSignatureFooter sekolah={sekolah} guru={guru} />
      </div>
    </div>
  );
};
