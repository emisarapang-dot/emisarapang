import React, { useState } from 'react';
import { SekolahProfile } from '../../types';
import { dbService, DEFAULT_LOGO } from '../../services/db';
import { Upload, X, Check, Image as ImageIcon, RotateCcw } from 'lucide-react';

interface LogoModalProps {
  isOpen: boolean;
  onClose: () => void;
  sekolah: SekolahProfile;
}

export const LogoModal: React.FC<LogoModalProps> = ({ isOpen, onClose, sekolah }) => {
  const [preview, setPreview] = useState<string>(sekolah.logo || DEFAULT_LOGO);
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Format file harus berupa gambar (PNG, JPG, SVG, WebP).');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErrorMsg('Ukuran file maksimal 2 MB.');
      return;
    }

    setErrorMsg('');
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setPreview(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    dbService.saveSekolah({
      ...sekolah,
      logo: preview,
    });
    onClose();
  };

  const handleReset = () => {
    setPreview(DEFAULT_LOGO);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full overflow-hidden">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-400 text-slate-950 rounded-xl font-bold">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-amber-300">Unggah Logo Sekolah</h3>
              <p className="text-xs text-blue-200">Otomatis tampil pada Kop Surat & Kartu Pelajar</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-800/60 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700">
            <div className="relative group">
              <img
                src={preview}
                alt="Logo Preview"
                className="w-28 h-28 object-contain rounded-2xl bg-white p-2 shadow-md border-2 border-amber-400"
              />
            </div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-3 text-center">
              Ukuran ideal: Persegi (1:1), PNG transparan atau SVG
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 text-xs rounded-lg border border-rose-200">
              {errorMsg}
            </div>
          )}

          <div className="space-y-3">
            <label className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-2 border-blue-300 dark:border-blue-700 rounded-xl font-bold text-sm cursor-pointer hover:bg-blue-100 transition-all">
              <Upload className="w-4 h-4" />
              Pilih Berkas Logo dari Komputer
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>

            <button
              type="button"
              onClick={handleReset}
              className="flex items-center justify-center gap-2 w-full py-2 px-4 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Kembalikan ke Logo Lambang Standar
            </button>
          </div>
        </div>

        <div className="p-4 bg-slate-100 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl text-sm font-extrabold bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center gap-2 transition-all"
          >
            <Check className="w-4 h-4" />
            Simpan Logo Permanen
          </button>
        </div>
      </div>
    </div>
  );
};
