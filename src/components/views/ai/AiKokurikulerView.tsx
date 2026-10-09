import React, { useState } from 'react';
import { GuruProfile, SekolahProfile } from '../../../types';
import { dbService } from '../../../services/db';
import { requestAiGeneration, promptBuilders } from '../../../services/aiService';
import { Star, Sparkles, Copy, Check, Save, Printer, Loader2, CheckSquare } from 'lucide-react';
import { OfficialLetterhead, OfficialSignatureFooter } from '../../common/OfficialLetterhead';

interface AiKokurikulerViewProps {
  guru: GuruProfile;
  sekolah: SekolahProfile;
}

const TUJUH_KEBIASAAN = [
  '1. Bangun Pagi',
  '2. Beribadah',
  '3. Berolahraga',
  '4. Gemar Membaca (Literasi 15 Menit)',
  '5. Makan Sehat & Bergizi',
  '6. Bermasyarakat / Gotong Royong',
  '7. Tidur Cepat / Tepat Waktu',
];

export const AiKokurikulerView: React.FC<AiKokurikulerViewProps> = ({ guru, sekolah }) => {
  const [kebiasaanFokus, setKebiasaanFokus] = useState<string[]>([
    '4. Gemar Membaca (Literasi 15 Menit)',
    '5. Makan Sehat & Bergizi',
    '6. Bermasyarakat / Gotong Royong',
  ]);
  const [durasiMingguan, setDurasiMingguan] = useState('4 Pekan (1 Bulan Program)');
  const [sasaranFase, setSasaranFase] = useState('Fase E (Kelas X)');
  const [bentukKegiatan, setBentukKegiatan] = useState(
    'Jurnal Harian Kolaborasi Rumah-Sekolah, Proyek Komunitas, & Pameran Karakter'
  );

  const [isLoading, setIsLoading] = useState(false);
  const [generatedDoc, setGeneratedDoc] = useState('');
  const [copied, setCopied] = useState(false);
  const [savedAlert, setSavedAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleKebiasaan = (k: string) => {
    if (kebiasaanFokus.includes(k)) {
      setKebiasaanFokus(kebiasaanFokus.filter((item) => item !== k));
    } else {
      setKebiasaanFokus([...kebiasaanFokus, k]);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (kebiasaanFokus.length === 0) {
      setErrorMessage('Pilih minimal satu kebiasaan karakter.');
      return;
    }
    setIsLoading(true);
    setErrorMessage('');

    try {
      const prompt = promptBuilders.kokurikuler7Kebiasaan({
        kebiasaanFokus,
        durasiMingguan,
        sasaranFase,
        bentukKegiatan,
      });

      const result = await requestAiGeneration(prompt);
      setGeneratedDoc(result);
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal memproses panduan kokurikuler.');
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
      type: 'kokurikuler',
      title: `Panduan Kokurikuler 7 Kebiasaan Anak: (${kebiasaanFokus.length} Kebiasaan)`,
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
          documentTitle="PANDUAN MODUL KOKURIKULER 7 KEBIASAAN ANAK INDONESIA HEBAT"
          documentSubtitle={`Penguatan Karakter Pelajar Pancasila • Salinan SK BSKAP 046/H/KR/2025`}
        />
      </div>

      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-md border-2 border-orange-300 dark:border-orange-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500 text-slate-950 rounded-xl shadow-md font-bold">
            <Star className="w-6 h-6 fill-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Kokurikuler & 7 Kebiasaan Anak Indonesia Hebat
              </h2>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
                7 KEBIASAAN
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Generator Modul Kokurikuler Pembiasaan Karakter Positif & Instrumen Observasi Harian
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="no-print lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md border border-slate-200 dark:border-slate-800 space-y-4">
          <form onSubmit={handleGenerate} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-2">
                Pilih Fokus 7 Kebiasaan Anak Indonesia Hebat:
              </label>
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 max-h-52 overflow-y-auto">
                {TUJUH_KEBIASAAN.map((k) => {
                  const checked = kebiasaanFokus.includes(k);
                  return (
                    <label
                      key={k}
                      className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                        checked ? 'bg-amber-100 dark:bg-amber-950/60 font-bold text-amber-950 dark:text-amber-200' : 'hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleKebiasaan(k)}
                        className="rounded accent-amber-500"
                      />
                      <span>{k}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Sasaran Fase / Kelas
                </label>
                <input
                  type="text"
                  value={sasaranFase}
                  onChange={(e) => setSasaranFase(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Durasi Pelaksanaan
                </label>
                <input
                  type="text"
                  value={durasiMingguan}
                  onChange={(e) => setDurasiMingguan(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Bentuk Aktivitas Kokurikuler
              </label>
              <textarea
                rows={2}
                value={bentukKegiatan}
                onChange={(e) => setBentukKegiatan(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl font-black text-sm bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" /> Menyusun Modul Kokurikuler...
                </>
              ) : (
                <>
                  <Star className="w-4 h-4 fill-slate-950" /> Generate Modul 7 Kebiasaan (AI)
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
              <CheckSquare className="w-4 h-4 text-amber-500" /> Panduan & Rubrik Observasi Karakter
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
              <Check className="w-4 h-4" /> Modul Kokurikuler tersimpan di database Anda!
            </div>
          )}

          <div className="flex-1 min-h-[480px]">
            {isLoading ? (
              <div className="h-full flex flex-col items-center justify-center p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full border-4 border-amber-500 border-t-transparent animate-spin" />
                <p className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
                  Menyusun modul kokurikuler & rubrik observasi 7 kebiasaan...
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
                <Star className="w-12 h-12 text-amber-400 mb-3 opacity-60" />
                <p className="font-extrabold text-sm text-slate-700 dark:text-slate-300">
                  Belum ada modul kokurikuler yang di-generate
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
