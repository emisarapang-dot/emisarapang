import React, { useState } from 'react';
import { GuruProfile, SekolahProfile, Mapel } from '../../../types';
import { dbService } from '../../../services/db';
import { requestAiGeneration, promptBuilders } from '../../../services/aiService';
import { Heart, Sparkles, Copy, Check, Save, Printer, Loader2, Smile } from 'lucide-react';
import { OfficialLetterhead, OfficialSignatureFooter } from '../../common/OfficialLetterhead';

interface AiKbcViewProps {
  guru: GuruProfile;
  sekolah: SekolahProfile;
  mapelList: Mapel[];
}

export const AiKbcView: React.FC<AiKbcViewProps> = ({ guru, sekolah, mapelList }) => {
  const [mapel, setMapel] = useState(mapelList[0]?.nama || 'Informatika');
  const [fase, setFase] = useState('Fase E (Kelas X)');
  const [topik, setTopik] = useState('Dampak Sosial Informatika & Etika Digital Penuh Empati');
  const [aspekKasihSayang, setAspekKasihSayang] = useState('Komunikasi Positif & Penghargaan Tanpa Syarat');

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
      const prompt = promptBuilders.kbc({
        mapel,
        fase,
        topik,
        aspekKasihSayang,
      });

      const result = await requestAiGeneration(prompt);
      setGeneratedDoc(result);
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal memproses perangkat KBC.');
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
      type: 'kbc',
      title: `Perangkat KBC Kasih Sayang: ${topik} (${mapel})`,
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
          documentTitle={`RANCANGAN PEMBELAJARAN BERBASIS KASIH SAYANG (KBC)`}
          documentSubtitle={`Topik: ${topik} • Penguatan Karakter & Empati • Salinan SK BSKAP 046/H/KR/2025`}
        />
      </div>

      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-md border-2 border-orange-300 dark:border-orange-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-500 text-white rounded-xl shadow-md">
            <Heart className="w-6 h-6 fill-white" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Perangkat Berbasis Kasih Sayang (Kurikulum Berbasis Cinta - KBC)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Integrasi Empati Pendidik, Mindful Heart-to-Heart, Afirmasi Positif, & Kesehatan Mental Siswa
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="no-print lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-800 space-y-4">
          <form onSubmit={handleGenerate} className="space-y-3.5 text-xs">
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

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Fase / Tingkat Kelas
              </label>
              <input
                type="text"
                value={fase}
                onChange={(e) => setFase(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Topik Materi Pembelajaran
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
                Fokus Aspek Kasih Sayang (KBC)
              </label>
              <select
                value={aspekKasihSayang}
                onChange={(e) => setAspekKasihSayang(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
              >
                <option value="Komunikasi Positif & Penghargaan Tanpa Syarat">
                  Komunikasi Positif & Penghargaan Tanpa Syarat
                </option>
                <option value="Mendengarkan Penuh Empati (Active Empathic Listening)">
                  Mendengarkan Penuh Empati (Active Empathic Listening)
                </option>
                <option value="Membangun Ruang Aman Emosional & Bebas Rasa Takut">
                  Membangun Ruang Aman Emosional & Bebas Rasa Takut
                </option>
                <option value="Penguatan Resiliensi & Kesehatan Mental Peserta Didik">
                  Penguatan Resiliensi & Kesehatan Mental Peserta Didik
                </option>
                <option value="Kolaborasi Gotong Royong Tanpa Diskriminasi">
                  Kolaborasi Gotong Royong Tanpa Diskriminasi
                </option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl font-black text-sm bg-rose-600 hover:bg-rose-700 text-white shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Meramu Pembelajaran Penuh Cinta...
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4 fill-white" /> Susun Perangkat Kasih Sayang (KBC)
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
              <Smile className="w-4 h-4 text-rose-500" /> Naskah Pembelajaran Berbasis Cinta
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
              <Check className="w-4 h-4" /> Tersimpan di arsip dokumen KBC Anda!
            </div>
          )}

          <div className="flex-1 min-h-[480px]">
            {isLoading ? (
              <div className="h-full flex flex-col items-center justify-center p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full border-4 border-rose-500 border-t-transparent animate-spin" />
                <p className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
                  Menyusun skenario pembelajaran penuh kehangatan & empati...
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
                <Heart className="w-12 h-12 text-rose-400 mb-3 opacity-60" />
                <p className="font-extrabold text-sm text-slate-700 dark:text-slate-300">
                  Belum ada modul Kasih Sayang yang disusun
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
