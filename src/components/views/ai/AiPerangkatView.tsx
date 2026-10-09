import React, { useState } from 'react';
import { GuruProfile, SekolahProfile, Mapel } from '../../../types';
import { dbService } from '../../../services/db';
import { requestAiGeneration, promptBuilders } from '../../../services/aiService';
import {
  FileSpreadsheet,
  Sparkles,
  Printer,
  Copy,
  Check,
  Save,
  ShieldCheck,
  Loader2,
} from 'lucide-react';
import { OfficialLetterhead, OfficialSignatureFooter } from '../../common/OfficialLetterhead';

interface AiPerangkatViewProps {
  guru: GuruProfile;
  sekolah: SekolahProfile;
  mapelList: Mapel[];
}

export const AiPerangkatView: React.FC<AiPerangkatViewProps> = ({
  guru,
  sekolah,
  mapelList,
}) => {
  const [dokumenTarget, setDokumenTarget] = useState<'CP_TP_ATP' | 'PROTA_PROSEM' | 'KKTP'>('CP_TP_ATP');
  const [mapel, setMapel] = useState(mapelList[0]?.nama || 'Informatika');
  const [fase, setFase] = useState('Fase E');
  const [kelas, setKelas] = useState('Kelas X');
  const [elemen, setElemen] = useState('Berpikir Komputasional, Algoritma Pemrograman, Analisis Data');

  const [isLoading, setIsLoading] = useState(false);
  const [generatedDoc, setGeneratedDoc] = useState('');
  const [copied, setCopied] = useState(false);
  const [savedAlert, setSavedAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const prompt = promptBuilders.perangkatLengkap({
        mapel,
        fase,
        kelas,
        elemen,
        dokumenTarget,
      });

      const result = await requestAiGeneration(prompt);
      setGeneratedDoc(result);
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal memproses dokumen perangkat pembelajaran.');
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
      type: 'perangkat',
      title: `Perangkat ${dokumenTarget}: ${mapel} (${fase})`,
      content: generatedDoc,
    });
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="print-only">
        <OfficialLetterhead
          sekolah={sekolah}
          guru={guru}
          documentTitle={`DOKUMEN ADMINISTRASI KURIKULUM MERDEKA: ${dokumenTarget}`}
          documentSubtitle={`Mata Pelajaran: ${mapel} • ${fase} • Berdasarkan Salinan SK BSKAP Kemendikdasmen No. 046/H/KR/2025`}
        />
      </div>

      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-md border-2 border-orange-300 dark:border-orange-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-600 text-white rounded-xl shadow-md">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Suite CP, TP, ATP, Prota, Prosem, & KKTP
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Penurunan Capaian Pembelajaran Resmi Salinan SK BSKAP No. 046/H/KR/2025 ke Format Tabel
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-100 dark:bg-orange-950 text-orange-900 dark:text-orange-200 text-xs font-black border border-orange-300">
          <ShieldCheck className="w-4 h-4 text-orange-600" />
          Rujukan Tunggal SK 046/2025
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="no-print lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-800 space-y-4">
          <form onSubmit={handleGenerate} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Pilih Jenis Dokumen Target
              </label>
              <select
                value={dokumenTarget}
                onChange={(e) => setDokumenTarget(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-orange-50 dark:bg-orange-950/40 border-2 border-orange-300 dark:border-orange-700 font-extrabold text-slate-900 dark:text-white"
              >
                <option value="CP_TP_ATP">Analisis CP, Penurunan TP, & Alur Tujuan Pembelajaran (ATP)</option>
                <option value="PROTA_PROSEM">Program Tahunan (Prota) & Program Semester (Prosem)</option>
                <option value="KKTP">Kriteria Ketercapaian Tujuan Pembelajaran (KKTP Deskriptif & Interval)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Mata Pelajaran
              </label>
              <input
                type="text"
                required
                value={mapel}
                onChange={(e) => setMapel(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
              />
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
                  Kelas
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
                Elemen CP (SK 046/H/KR/2025)
              </label>
              <textarea
                rows={3}
                required
                value={elemen}
                onChange={(e) => setElemen(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl font-black text-sm bg-orange-600 hover:bg-orange-700 text-white shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Menyusun Dokumen Resmi...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Susun Dokumen Administrasi (AI)
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

        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4">
          <div className="no-print flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-orange-500" /> Naskah Dokumen Kurikulum
            </h3>

            {generatedDoc && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Tersalin' : 'Salin'}
                </button>
                <button
                  type="button"
                  onClick={handleSaveToDb}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 hover:bg-emerald-700"
                >
                  <Save className="w-3.5 h-3.5" /> Simpan
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold flex items-center gap-1 hover:bg-blue-700"
                >
                  <Printer className="w-3.5 h-3.5" /> Cetak
                </button>
              </div>
            )}
          </div>

          {savedAlert && (
            <div className="no-print p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
              <Check className="w-4 h-4" /> Dokumen berhasil disimpan ke arsip perangkat Anda!
            </div>
          )}

          <div className="flex-1 min-h-[480px]">
            {isLoading ? (
              <div className="h-full flex flex-col items-center justify-center p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
                <p className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
                  Menganalisis SK BSKAP 046/H/KR/2025 dan menyusun tabel matriks...
                </p>
              </div>
            ) : generatedDoc ? (
              <textarea
                value={generatedDoc}
                onChange={(e) => setGeneratedDoc(e.target.value)}
                className="w-full h-full min-h-[500px] p-4 text-xs font-mono leading-relaxed bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-12 text-center text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                <FileSpreadsheet className="w-12 h-12 text-orange-400 mb-3 opacity-60" />
                <p className="font-extrabold text-sm text-slate-700 dark:text-slate-300">
                  Belum ada dokumen yang disusun
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="print-only">
        <OfficialSignatureFooter sekolah={sekolah} guru={guru} />
      </div>
    </div>
  );
};
