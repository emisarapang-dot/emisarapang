import React, { useState } from 'react';
import { SekolahProfile, GuruProfile } from '../../types';
import { Camera, Sun, Moon, LogOut, Sparkles, ShieldCheck } from 'lucide-react';
import { LogoModal } from './LogoModal';
import { ConfirmModal } from './ConfirmModal';

interface HeaderProps {
  sekolah: SekolahProfile;
  guru: GuruProfile;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onLogoutConfirm: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  sekolah,
  guru,
  darkMode,
  onToggleDarkMode,
  onLogoutConfirm,
}) => {
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full no-print shadow-xl">
        {/* Pita Aksen Pelangi (Top Ribbon) */}
        <div className="h-2 w-full bg-gradient-to-r from-blue-600 via-emerald-500 via-orange-500 to-amber-400" />

        {/* Header Utama Navbar */}
        <div className="bg-gradient-to-r from-[#071328] via-[#0d2240] to-[#0a182e] border-b-2 border-blue-800 px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            {/* Bagian Kiri: Logo Interaktif & Brand Title */}
            <div className="flex items-center gap-3.5 sm:gap-4">
              {/* Bingkai Logo Sekolah Interaktif */}
              <div className="relative group">
                <button
                  type="button"
                  onClick={() => setIsLogoModalOpen(true)}
                  title="Klik untuk ganti logo sekolah"
                  className="relative w-12 h-12 rounded-2xl bg-white border-2 border-amber-400 p-1 flex items-center justify-center shadow-lg hover:scale-105 hover:ring-4 hover:ring-amber-400/40 transition-all cursor-pointer overflow-hidden"
                >
                  <img
                    src={sekolah.logo}
                    alt="Logo Sekolah"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-2xl">
                    <Camera className="w-4 h-4 text-white" />
                  </div>
                </button>
                {/* Badge Kamera Kecil */}
                <span className="absolute -bottom-1 -right-1 p-0.5 bg-amber-400 text-slate-950 rounded-full border border-slate-900 shadow-xs pointer-events-none">
                  <Camera className="w-2.5 h-2.5" />
                </span>
              </div>

              {/* Teks Identitas Brand */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-extrabold tracking-wider uppercase text-blue-200">
                    DASHBOARD ADMINISTRASI
                  </span>
                  <span className="hidden md:inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-blue-900/80 text-amber-300 border border-blue-700">
                    <ShieldCheck className="w-2.5 h-2.5" /> SK BSKAP 046/H/KR/2025
                  </span>
                </div>
                <h1 className="text-base sm:text-xl md:text-2xl font-black text-amber-300 tracking-tight leading-tight">
                  TUNGGURU EMI SARAPANG
                </h1>
                <div className="hidden sm:flex items-center gap-2 text-xs text-blue-100/80">
                  <span className="font-semibold text-white">{sekolah.namaSekolah}</span>
                  <span className="text-slate-400">•</span>
                  <span>{guru.nama}{guru.gelar ? `, ${guru.gelar}` : ''}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-amber-200 font-medium">TA {sekolah.tahunAjaranAktif} ({sekolah.semesterAktif})</span>
                </div>
              </div>
            </div>

            {/* Bagian Kanan: Quick Tags, Mode Gelap, Guru Profile Ring, Logout */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Quick Color Indicators (Tags) */}
              <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900/70 border border-blue-900/60 text-[10px] font-extrabold">
                <span className="flex items-center gap-1 text-blue-300">
                  <span className="w-2 h-2 rounded-full bg-blue-500 shadow-xs shadow-blue-500"></span> UTAMA
                </span>
                <span className="text-slate-600">|</span>
                <span className="flex items-center gap-1 text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-xs shadow-emerald-500"></span> AKADEMIK
                </span>
                <span className="text-slate-600">|</span>
                <span className="flex items-center gap-1 text-orange-300">
                  <span className="w-2 h-2 rounded-full bg-orange-500 shadow-xs shadow-orange-500"></span> AI SUITE
                </span>
                <span className="text-slate-600">|</span>
                <span className="flex items-center gap-1 text-amber-300">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shadow-xs shadow-amber-400"></span> LAPORAN
                </span>
              </div>

              {/* Switch Mode Gelap / Terang */}
              <button
                type="button"
                onClick={onToggleDarkMode}
                title={darkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
                className="p-2 sm:p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-amber-300 hover:text-white border border-blue-800 transition-all cursor-pointer shadow-md"
              >
                {darkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-200" />}
              </button>

              {/* Avatar Profil Guru Berbingkai Cincin Emas Bersinar */}
              <div className="hidden sm:flex items-center gap-2.5 pl-1 pr-2.5 py-1 rounded-2xl bg-blue-950/60 border border-blue-800/80">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-amber-400 p-[2px] shadow-lg shadow-amber-400/30 ring-2 ring-amber-400/80">
                    <div className="w-full h-full rounded-full bg-blue-900 flex items-center justify-center font-black text-amber-300 text-xs uppercase">
                      {guru.nama ? guru.nama.split(' ').map((n) => n[0]).join('').slice(0, 2) : 'ES'}
                    </div>
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900"></span>
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-xs font-bold text-white leading-tight truncate max-w-[130px]">
                    {guru.nama}
                  </p>
                  <p className="text-[10px] text-blue-200/80 truncate max-w-[130px]">
                    NIP. {guru.nip}
                  </p>
                </div>
              </div>

              {/* Tombol Logout */}
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(true)}
                title="Keluar dari sesi"
                className="p-2 sm:p-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 hover:text-white border border-rose-800 transition-all cursor-pointer shadow-md"
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Modal Upload Logo */}
      <LogoModal
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
        sekolah={sekolah}
      />

      {/* Modal Konfirmasi Logout */}
      <ConfirmModal
        isOpen={isLogoutModalOpen}
        title="Konfirmasi Sesi Selesai"
        message="Apakah Anda yakin ingin menutup sesi kerja saat ini? Seluruh data administrasi tersimpan aman di database lokal browser Anda."
        confirmText="Ya, Selesai"
        cancelText="Batal"
        type="warning"
        onConfirm={() => {
          setIsLogoutModalOpen(false);
          onLogoutConfirm();
        }}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </>
  );
};
