import React, { useState } from 'react';
import { GuruProfile, SekolahProfile } from '../../types';
import { dbService, DEFAULT_LOGO } from '../../services/db';
import {
  Settings,
  Save,
  User,
  School,
  Database,
  Download,
  Upload,
  RotateCcw,
  Check,
  FileCode,
  Copy,
  Camera,
  CheckCircle2,
} from 'lucide-react';
import { LogoModal } from '../common/LogoModal';
import { ConfirmModal } from '../common/ConfirmModal';

interface PengaturanViewProps {
  guru: GuruProfile;
  sekolah: SekolahProfile;
}

export const PengaturanView: React.FC<PengaturanViewProps> = ({ guru, sekolah }) => {
  const [guruForm, setGuruForm] = useState<GuruProfile>({ ...guru });
  const [sekolahForm, setSekolahForm] = useState<SekolahProfile>({ ...sekolah });

  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedScript, setCopiedScript] = useState<'code' | 'index' | null>(null);

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    dbService.saveGuru(guruForm);
    dbService.saveSekolah(sekolahForm);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleExportBackup = () => {
    const jsonStr = dbService.exportBackupJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Backup_Administrasi_Tungguru_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        const success = dbService.importBackupJson(text);
        if (success) {
          alert('Data administrasi berhasil dipulihkan!');
          window.location.reload();
        } else {
          alert('Format berkas cadangan JSON tidak valid.');
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleResetToDefaults = () => {
    dbService.resetToDefaults();
    setIsResetModalOpen(false);
    window.location.reload();
  };

  // Google Apps Script template ready for sheets integration
  const appsScriptCode = `// Google Apps Script (Code.gs) untuk Integrasi Spreadsheet & Drive
function doGet(e) {
  var action = e.parameter.action;
  if (action == "getSiswa") {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Siswa");
    var data = sheet.getDataRange().getValues();
    return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
  }
  return HtmlService.createHtmlOutput("Web App Administrasi Guru Emi Sarapang Aktif");
}

function doPost(e) {
  var postData = JSON.parse(e.postData.contents);
  var sheetName = postData.sheet || "Log";
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  sheet.appendRow(postData.row);
  return ContentService.createTextOutput(JSON.stringify({ status: "success" })).setMimeType(ContentService.MimeType.JSON);
}`;

  const appsScriptHtml = `<!-- Google Apps Script (Index.html) -->
<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <title>Konektor Spreadsheet Belajar.id</title>
  </head>
  <body>
    <h3>Portal Sinkronisasi Cloud Guru Terhubung</h3>
    <p>Status: Aktif & Terverifikasi.</p>
  </body>
</html>`;

  const copyToClipboard = (text: string, type: 'code' | 'index') => {
    navigator.clipboard.writeText(text);
    setCopiedScript(type);
    setTimeout(() => setCopiedScript(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-md border-2 border-amber-300 dark:border-amber-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500 text-slate-950 rounded-xl shadow-md font-bold">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Pengaturan Profil Guru, Sekolah, & Database
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Konfigurasi Identitas Satuan Pendidikan, Logo Kop Surat, Backup & Restore JSON
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSaveAll}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black shadow-md flex items-center gap-1.5 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          Simpan Semua Pengaturan
        </button>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 text-emerald-800 dark:text-emerald-200 text-xs font-bold rounded-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Seluruh profil guru dan sekolah berhasil diperbarui dan tersimpan permanen!
        </div>
      )}

      {/* Grid 2 Form: Profil Guru & Profil Sekolah */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Profil Guru */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <User className="w-5 h-5 text-blue-600" />
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Data Identitas Pendidik (Guru)
            </h3>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="block font-bold text-slate-600 dark:text-slate-300 uppercase text-[10px] mb-1">
                  Nama Lengkap Guru
                </label>
                <input
                  type="text"
                  value={guruForm.nama}
                  onChange={(e) => setGuruForm({ ...guruForm, nama: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-600 dark:text-slate-300 uppercase text-[10px] mb-1">
                  Gelar
                </label>
                <input
                  type="text"
                  value={guruForm.gelar}
                  onChange={(e) => setGuruForm({ ...guruForm, gelar: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-600 dark:text-slate-300 uppercase text-[10px] mb-1">
                  NIP / NUPTK
                </label>
                <input
                  type="text"
                  value={guruForm.nip}
                  onChange={(e) => setGuruForm({ ...guruForm, nip: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-600 dark:text-slate-300 uppercase text-[10px] mb-1">
                  NUPTK
                </label>
                <input
                  type="text"
                  value={guruForm.nuptk}
                  onChange={(e) => setGuruForm({ ...guruForm, nuptk: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-600 dark:text-slate-300 uppercase text-[10px] mb-1">
                  Email Akun Belajar.id
                </label>
                <input
                  type="email"
                  value={guruForm.email}
                  onChange={(e) => setGuruForm({ ...guruForm, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-600 dark:text-slate-300 uppercase text-[10px] mb-1">
                  No. WhatsApp / HP
                </label>
                <input
                  type="text"
                  value={guruForm.noHp}
                  onChange={(e) => setGuruForm({ ...guruForm, noHp: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-600 dark:text-slate-300 uppercase text-[10px] mb-1">
                  Pangkat / Golongan
                </label>
                <input
                  type="text"
                  value={guruForm.pangkatGolongan}
                  onChange={(e) => setGuruForm({ ...guruForm, pangkatGolongan: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-600 dark:text-slate-300 uppercase text-[10px] mb-1">
                  Mata Pelajaran Utama
                </label>
                <input
                  type="text"
                  value={guruForm.mapelUtama}
                  onChange={(e) => setGuruForm({ ...guruForm, mapelUtama: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form Profil Sekolah & Logo */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <School className="w-5 h-5 text-emerald-600" />
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Data Satuan Pendidikan (Sekolah)
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsLogoModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 text-xs font-bold border border-amber-300 flex items-center gap-1.5 cursor-pointer hover:bg-amber-200 transition-colors"
            >
              <Camera className="w-3.5 h-3.5" /> Ganti Logo Sekolah
            </button>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-slate-600 dark:text-slate-300 uppercase text-[10px] mb-1">
                Nama Resmi Satuan Pendidikan
              </label>
              <input
                type="text"
                value={sekolahForm.namaSekolah}
                onChange={(e) => setSekolahForm({ ...sekolahForm, namaSekolah: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-600 dark:text-slate-300 uppercase text-[10px] mb-1">
                  NPSN
                </label>
                <input
                  type="text"
                  value={sekolahForm.npsn}
                  onChange={(e) => setSekolahForm({ ...sekolahForm, npsn: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-600 dark:text-slate-300 uppercase text-[10px] mb-1">
                  NSS
                </label>
                <input
                  type="text"
                  value={sekolahForm.nss}
                  onChange={(e) => setSekolahForm({ ...sekolahForm, nss: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-600 dark:text-slate-300 uppercase text-[10px] mb-1">
                Alamat Lengkap Sekolah
              </label>
              <input
                type="text"
                value={sekolahForm.alamat}
                onChange={(e) => setSekolahForm({ ...sekolahForm, alamat: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-slate-600 dark:text-slate-300 uppercase text-[10px] mb-1">
                  Kota / Kabupaten
                </label>
                <input
                  type="text"
                  value={sekolahForm.kotaKabupaten}
                  onChange={(e) => setSekolahForm({ ...sekolahForm, kotaKabupaten: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-600 dark:text-slate-300 uppercase text-[10px] mb-1">
                  Provinsi
                </label>
                <input
                  type="text"
                  value={sekolahForm.provinsi}
                  onChange={(e) => setSekolahForm({ ...sekolahForm, provinsi: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-600 dark:text-slate-300 uppercase text-[10px] mb-1">
                  Kode Pos
                </label>
                <input
                  type="text"
                  value={sekolahForm.kodePos}
                  onChange={(e) => setSekolahForm({ ...sekolahForm, kodePos: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-600 dark:text-slate-300 uppercase text-[10px] mb-1">
                  Nama Kepala Sekolah
                </label>
                <input
                  type="text"
                  value={sekolahForm.namaKepalaSekolah}
                  onChange={(e) => setSekolahForm({ ...sekolahForm, namaKepalaSekolah: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-600 dark:text-slate-300 uppercase text-[10px] mb-1">
                  NIP Kepala Sekolah
                </label>
                <input
                  type="text"
                  value={sekolahForm.nipKepalaSekolah}
                  onChange={(e) => setSekolahForm({ ...sekolahForm, nipKepalaSekolah: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-600 dark:text-slate-300 uppercase text-[10px] mb-1">
                  Tahun Ajaran Aktif
                </label>
                <input
                  type="text"
                  value={sekolahForm.tahunAjaranAktif}
                  onChange={(e) => setSekolahForm({ ...sekolahForm, tahunAjaranAktif: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-600 dark:text-slate-300 uppercase text-[10px] mb-1">
                  Semester Aktif
                </label>
                <select
                  value={sekolahForm.semesterAktif}
                  onChange={(e) => setSekolahForm({ ...sekolahForm, semesterAktif: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                >
                  <option value="Ganjil">Semester Ganjil</option>
                  <option value="Genap">Semester Genap</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Manajemen Database (Backup, Restore, Reset) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Database className="w-5 h-5 text-indigo-600" />
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
            Manajemen Database Lokal & Cadangan Data
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h4 className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
              <Download className="w-4 h-4 text-emerald-600" /> Cadangkan Basis Data (JSON)
            </h4>
            <p className="text-[11px] text-slate-500 leading-snug">
              Unduh salinan lengkap seluruh data siswa, jadwal, presensi, nilai, dan dokumen AI ke file JSON.
            </p>
            <button
              type="button"
              onClick={handleExportBackup}
              className="mt-2 w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Ekspor File Backup
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h4 className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
              <Upload className="w-4 h-4 text-blue-600" /> Pulihkan Data dari Cadangan
            </h4>
            <p className="text-[11px] text-slate-500 leading-snug">
              Kembalikan data administrasi dari file JSON hasil ekspor sebelumnya secara aman.
            </p>
            <label className="mt-2 w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1 transition-colors cursor-pointer">
              <Upload className="w-3.5 h-3.5" /> Impor File JSON
              <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
            </label>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h4 className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
              <RotateCcw className="w-4 h-4 text-rose-600" /> Reset ke Data Contoh / Demo
            </h4>
            <p className="text-[11px] text-slate-500 leading-snug">
              Kembalikan semua tabel ke setelan awal default (Siswa contoh, mapel lengkap, modul ajar seed).
            </p>
            <button
              type="button"
              onClick={() => setIsResetModalOpen(true)}
              className="mt-2 w-full py-2 px-3 rounded-lg bg-rose-100 hover:bg-rose-200 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 text-xs font-bold border border-rose-300 flex items-center justify-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Data Demo
            </button>
          </div>
        </div>
      </div>

      {/* Integrasi Google Apps Script (code.txt & index.txt) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-emerald-600" />
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Skrip Konektivitas Google Apps Script (Sheets / Drive belajar.id)
              </h3>
              <p className="text-xs text-slate-500">
                Siap diekspor ke script.google.com untuk integrasi database awan dua arah
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-800">
              <span>Code.gs (Backend Endpoint)</span>
              <button
                type="button"
                onClick={() => copyToClipboard(appsScriptCode, 'code')}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1 text-[10px]"
              >
                {copiedScript === 'code' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copiedScript === 'code' ? 'Tersalin' : 'Salin Script'}
              </button>
            </div>
            <pre className="text-[10px] leading-relaxed max-h-48 overflow-y-auto text-emerald-300">
              {appsScriptCode}
            </pre>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-800">
              <span>Index.html (Web App View)</span>
              <button
                type="button"
                onClick={() => copyToClipboard(appsScriptHtml, 'index')}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1 text-[10px]"
              >
                {copiedScript === 'index' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copiedScript === 'index' ? 'Tersalin' : 'Salin HTML'}
              </button>
            </div>
            <pre className="text-[10px] leading-relaxed max-h-48 overflow-y-auto text-cyan-300">
              {appsScriptHtml}
            </pre>
          </div>
        </div>
      </div>

      {/* Modal Logo */}
      <LogoModal
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
        sekolah={sekolah}
      />

      {/* Modal Reset Confirmation */}
      <ConfirmModal
        isOpen={isResetModalOpen}
        title="Reset Data ke Setelan Awal?"
        message="Tindakan ini akan mengembalikan seluruh data siswa, jadwal, presensi, dan nilai ke contoh data demo awal. Pastikan Anda sudah mengekspor file cadangan JSON jika ingin menyimpan data saat ini."
        confirmText="Ya, Reset Sekarang"
        cancelText="Batal"
        type="danger"
        onConfirm={handleResetToDefaults}
        onCancel={() => setIsResetModalOpen(false)}
      />
    </div>
  );
};
