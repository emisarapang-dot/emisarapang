import React from 'react';
import { ActiveTab } from '../../types';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  CalendarDays,
  CalendarCheck2,
  CreditCard,
  GraduationCap,
  ClipboardList,
  HeartHandshake,
  DownloadCloud,
  BrainCircuit,
  Tv,
  FileSpreadsheet,
  Heart,
  Star,
  FileQuestion,
  Layers,
  FileText,
  Presentation,
  BotMessageSquare,
  Printer,
  Settings,
  Sparkles,
  Flame,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
}) => {
  const handleNavClick = (tab: ActiveTab) => {
    onSelectTab(tab);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 lg:top-[74px] left-0 z-50 lg:z-30 h-screen lg:h-[calc(100vh-74px)] w-72 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 no-print overflow-y-auto ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-3.5 space-y-6">
          {/* ======================================================== */}
          {/* GRUP 1: MENU UTAMA (Tema Biru Tajam) */}
          {/* ======================================================== */}
          <div className="space-y-2">
            <div className="bg-blue-700 text-white border-2 border-blue-400 shadow-md rounded-xl px-3 py-2 flex items-center justify-between">
              <span className="text-xs font-black tracking-wider uppercase flex items-center gap-1.5">
                <LayoutDashboard className="w-3.5 h-3.5 text-blue-200" /> MENU UTAMA
              </span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-900 text-blue-200 border border-blue-400">
                BIRU TAJAM
              </span>
            </div>

            <div className="space-y-1.5 pt-1">
              <button
                type="button"
                onClick={() => handleNavClick('dashboard')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'bg-blue-600 text-white border-2 border-blue-300 shadow-lg shadow-blue-600/30 ring-2 ring-blue-400 font-extrabold scale-[1.02]'
                    : 'bg-blue-50/90 dark:bg-blue-950/70 text-blue-950 dark:text-blue-100 border-2 border-blue-300 dark:border-blue-700 hover:bg-blue-600 hover:text-white font-bold'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="text-xs">1. Dashboard Utama</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* GRUP 2: MENU AKADEMIK (Tema Emerald & Multi-Warna) */}
          {/* ======================================================== */}
          <div className="space-y-2">
            <div className="bg-emerald-800 text-white border-2 border-emerald-400 shadow-md rounded-xl px-3 py-2 flex items-center justify-between">
              <span className="text-xs font-black tracking-wider uppercase flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-200" /> MENU AKADEMIK
              </span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-200 border border-emerald-400">
                MULTI WARNA
              </span>
            </div>

            <div className="space-y-1.5 pt-1">
              {/* Item Siswa (Cyan) */}
              <button
                type="button"
                onClick={() => handleNavClick('siswa')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'siswa'
                    ? 'bg-cyan-600 text-white border-2 border-cyan-300 shadow-lg shadow-cyan-600/30 ring-2 ring-cyan-400 font-extrabold scale-[1.02]'
                    : 'bg-cyan-50/90 dark:bg-cyan-950/70 text-cyan-950 dark:text-cyan-100 border-2 border-cyan-300 dark:border-cyan-700 hover:bg-cyan-600 hover:text-white font-bold'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4" />
                  <span className="text-xs">2. Kelola Peserta Didik</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              {/* Item Mapel (Ungu) */}
              <button
                type="button"
                onClick={() => handleNavClick('mapel')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'mapel'
                    ? 'bg-purple-600 text-white border-2 border-purple-300 shadow-lg shadow-purple-600/30 ring-2 ring-purple-400 font-extrabold scale-[1.02]'
                    : 'bg-purple-50/90 dark:bg-purple-950/70 text-purple-950 dark:text-purple-100 border-2 border-purple-300 dark:border-purple-700 hover:bg-purple-600 hover:text-white font-bold'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-xs">3. Materi & Mata Pelajaran</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              {/* Item Jadwal (Rose) */}
              <button
                type="button"
                onClick={() => handleNavClick('jadwal')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'jadwal'
                    ? 'bg-rose-600 text-white border-2 border-rose-300 shadow-lg shadow-rose-600/30 ring-2 ring-rose-400 font-extrabold scale-[1.02]'
                    : 'bg-rose-50/90 dark:bg-rose-950/70 text-rose-950 dark:text-rose-100 border-2 border-rose-300 dark:border-rose-700 hover:bg-rose-600 hover:text-white font-bold'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <CalendarDays className="w-4 h-4" />
                  <span className="text-xs">4. Jadwal Pelajaran KBM</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              {/* Item Presensi (Emerald) */}
              <button
                type="button"
                onClick={() => handleNavClick('presensi')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'presensi'
                    ? 'bg-emerald-600 text-white border-2 border-emerald-300 shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400 font-extrabold scale-[1.02]'
                    : 'bg-emerald-50/90 dark:bg-emerald-950/70 text-emerald-950 dark:text-emerald-100 border-2 border-emerald-300 dark:border-emerald-700 hover:bg-emerald-600 hover:text-white font-bold'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <CalendarCheck2 className="w-4 h-4" />
                  <span className="text-xs">5. Kehadiran Siswa (Presensi)</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              {/* Item Kartu Siswa QR */}
              <button
                type="button"
                onClick={() => handleNavClick('kartu-siswa')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'kartu-siswa'
                    ? 'bg-emerald-600 text-white border-2 border-emerald-300 shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400 font-extrabold scale-[1.02]'
                    : 'bg-emerald-50/90 dark:bg-emerald-950/70 text-emerald-950 dark:text-emerald-100 border-2 border-emerald-300 dark:border-emerald-700 hover:bg-emerald-600 hover:text-white font-bold'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-4 h-4" />
                  <span className="text-xs">6. Cetak Kartu Siswa QR</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              {/* Item Nilai */}
              <button
                type="button"
                onClick={() => handleNavClick('nilai')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'nilai'
                    ? 'bg-emerald-600 text-white border-2 border-emerald-300 shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400 font-extrabold scale-[1.02]'
                    : 'bg-emerald-50/90 dark:bg-emerald-950/70 text-emerald-950 dark:text-emerald-100 border-2 border-emerald-300 dark:border-emerald-700 hover:bg-emerald-600 hover:text-white font-bold'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-xs">7. Asesmen & Leger Nilai</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              {/* Item Agenda Mengajar */}
              <button
                type="button"
                onClick={() => handleNavClick('agenda')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'agenda'
                    ? 'bg-emerald-600 text-white border-2 border-emerald-300 shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400 font-extrabold scale-[1.02]'
                    : 'bg-emerald-50/90 dark:bg-emerald-950/70 text-emerald-950 dark:text-emerald-100 border-2 border-emerald-300 dark:border-emerald-700 hover:bg-emerald-600 hover:text-white font-bold'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ClipboardList className="w-4 h-4" />
                  <span className="text-xs">8. Jurnal Agenda Mengajar</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              {/* Item Bimbingan */}
              <button
                type="button"
                onClick={() => handleNavClick('bimbingan')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'bimbingan'
                    ? 'bg-emerald-600 text-white border-2 border-emerald-300 shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400 font-extrabold scale-[1.02]'
                    : 'bg-emerald-50/90 dark:bg-emerald-950/70 text-emerald-950 dark:text-emerald-100 border-2 border-emerald-300 dark:border-emerald-700 hover:bg-emerald-600 hover:text-white font-bold'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <HeartHandshake className="w-4 h-4" />
                  <span className="text-xs">9. Bimbingan Wali / BK</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              {/* Item Unduh Perangkat Ajar */}
              <button
                type="button"
                onClick={() => handleNavClick('perangkat-unduh')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'perangkat-unduh'
                    ? 'bg-emerald-600 text-white border-2 border-emerald-300 shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400 font-extrabold scale-[1.02]'
                    : 'bg-emerald-50/90 dark:bg-emerald-950/70 text-emerald-950 dark:text-emerald-100 border-2 border-emerald-300 dark:border-emerald-700 hover:bg-emerald-600 hover:text-white font-bold'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <DownloadCloud className="w-4 h-4" />
                  <span className="text-xs">10. Unduh Perangkat Ajar</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* GRUP 3: MENU SUITE AI (Tema Oranye Tajam) */}
          {/* ======================================================== */}
          <div className="space-y-2">
            <div className="bg-orange-600 text-white border-2 border-orange-400 shadow-md rounded-xl px-3 py-2 flex items-center justify-between">
              <span className="text-xs font-black tracking-wider uppercase flex items-center gap-1.5">
                <BrainCircuit className="w-3.5 h-3.5 text-orange-200" /> MENU SUITE AI
              </span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-orange-900 text-orange-200 border border-orange-400">
                ORANGE TAJAM
              </span>
            </div>

            <div className="space-y-1.5 pt-1">
              {/* Item 11: Rencana Pembelajaran Mendalam [HOT] */}
              <button
                type="button"
                onClick={() => handleNavClick('ai-modul')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'ai-modul'
                    ? 'bg-orange-500 text-white border-2 border-orange-300 shadow-lg shadow-orange-500/30 ring-2 ring-orange-300 font-extrabold scale-[1.02]'
                    : 'bg-orange-50/90 dark:bg-orange-950/70 text-orange-950 dark:text-orange-100 border-2 border-orange-300 dark:border-orange-700 hover:bg-orange-500 hover:text-white font-bold'
                }`}
              >
                <div className="flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 shrink-0" />
                  <span className="text-xs truncate">11. Modul Ajar Mendalam</span>
                </div>
                <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md bg-rose-600 text-white shrink-0 flex items-center gap-0.5 shadow-xs">
                  <Flame className="w-2.5 h-2.5" /> HOT
                </span>
              </button>

              {/* Item 12: Media Pembelajaran Interaktif [BARU] */}
              <button
                type="button"
                onClick={() => handleNavClick('ai-media')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'ai-media'
                    ? 'bg-orange-500 text-white border-2 border-orange-300 shadow-lg shadow-orange-500/30 ring-2 ring-orange-300 font-extrabold scale-[1.02]'
                    : 'bg-orange-50/90 dark:bg-orange-950/70 text-orange-950 dark:text-orange-100 border-2 border-orange-300 dark:border-orange-700 hover:bg-orange-500 hover:text-white font-bold'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Tv className="w-4 h-4 shrink-0" />
                  <span className="text-xs truncate">12. Media Interaktif</span>
                </div>
                <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md bg-emerald-600 text-white shrink-0">
                  BARU
                </span>
              </button>

              {/* Item 13: CP, TP, ATP, Prota, KKTP */}
              <button
                type="button"
                onClick={() => handleNavClick('ai-perangkat')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'ai-perangkat'
                    ? 'bg-orange-500 text-white border-2 border-orange-300 shadow-lg shadow-orange-500/30 ring-2 ring-orange-300 font-extrabold scale-[1.02]'
                    : 'bg-orange-50/90 dark:bg-orange-950/70 text-orange-950 dark:text-orange-100 border-2 border-orange-300 dark:border-orange-700 hover:bg-orange-500 hover:text-white font-bold'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 shrink-0" />
                  <span className="text-xs truncate">13. CP, TP, ATP, Prota, KKTP</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              {/* Item 14: Perangkat Berbasis Kasih Sayang (KBC) */}
              <button
                type="button"
                onClick={() => handleNavClick('ai-kbc')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'ai-kbc'
                    ? 'bg-orange-500 text-white border-2 border-orange-300 shadow-lg shadow-orange-500/30 ring-2 ring-orange-300 font-extrabold scale-[1.02]'
                    : 'bg-orange-50/90 dark:bg-orange-950/70 text-orange-950 dark:text-orange-100 border-2 border-orange-300 dark:border-orange-700 hover:bg-orange-500 hover:text-white font-bold'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 shrink-0 text-rose-500" />
                  <span className="text-xs truncate">14. Kurikulum Kasih Sayang (KBC)</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              {/* Item 15: Kokurikuler & 7 Kebiasaan Anak */}
              <button
                type="button"
                onClick={() => handleNavClick('ai-kokurikuler')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'ai-kokurikuler'
                    ? 'bg-orange-500 text-white border-2 border-orange-300 shadow-lg shadow-orange-500/30 ring-2 ring-orange-300 font-extrabold scale-[1.02]'
                    : 'bg-orange-50/90 dark:bg-orange-950/70 text-orange-950 dark:text-orange-100 border-2 border-orange-300 dark:border-orange-700 hover:bg-orange-500 hover:text-white font-bold'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 shrink-0 text-amber-500" />
                  <span className="text-xs truncate">15. Kokurikuler 7 Kebiasaan</span>
                </div>
                <span className="text-[8px] font-black px-1.5 py-0.5 rounded-md bg-amber-600 text-slate-950 shrink-0">
                  7 HEBAT
                </span>
              </button>

              {/* Item 16: Paket Soal Ujian & LJS */}
              <button
                type="button"
                onClick={() => handleNavClick('ai-soal')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'ai-soal'
                    ? 'bg-orange-500 text-white border-2 border-orange-300 shadow-lg shadow-orange-500/30 ring-2 ring-orange-300 font-extrabold scale-[1.02]'
                    : 'bg-orange-50/90 dark:bg-orange-950/70 text-orange-950 dark:text-orange-100 border-2 border-orange-300 dark:border-orange-700 hover:bg-orange-500 hover:text-white font-bold'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileQuestion className="w-4 h-4 shrink-0" />
                  <span className="text-xs truncate">16. Paket Soal HOTS & LJS</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              {/* Item 17: Kartu Soal & Kisi-Kisi */}
              <button
                type="button"
                onClick={() => handleNavClick('ai-kartu-soal')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'ai-kartu-soal'
                    ? 'bg-orange-500 text-white border-2 border-orange-300 shadow-lg shadow-orange-500/30 ring-2 ring-orange-300 font-extrabold scale-[1.02]'
                    : 'bg-orange-50/90 dark:bg-orange-950/70 text-orange-950 dark:text-orange-100 border-2 border-orange-300 dark:border-orange-700 hover:bg-orange-500 hover:text-white font-bold'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 shrink-0" />
                  <span className="text-xs truncate">17. Kartu Soal & Kisi-Kisi</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              {/* Item 18: Generator LKPD AI */}
              <button
                type="button"
                onClick={() => handleNavClick('ai-lkpd')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'ai-lkpd'
                    ? 'bg-orange-500 text-white border-2 border-orange-300 shadow-lg shadow-orange-500/30 ring-2 ring-orange-300 font-extrabold scale-[1.02]'
                    : 'bg-orange-50/90 dark:bg-orange-950/70 text-orange-950 dark:text-orange-100 border-2 border-orange-300 dark:border-orange-700 hover:bg-orange-500 hover:text-white font-bold'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 shrink-0" />
                  <span className="text-xs truncate">18. Generator LKPD AI</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              {/* Item 19: Generator Presentasi PPT */}
              <button
                type="button"
                onClick={() => handleNavClick('ai-ppt')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'ai-ppt'
                    ? 'bg-orange-500 text-white border-2 border-orange-300 shadow-lg shadow-orange-500/30 ring-2 ring-orange-300 font-extrabold scale-[1.02]'
                    : 'bg-orange-50/90 dark:bg-orange-950/70 text-orange-950 dark:text-orange-100 border-2 border-orange-300 dark:border-orange-700 hover:bg-orange-500 hover:text-white font-bold'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Presentation className="w-4 h-4 shrink-0" />
                  <span className="text-xs truncate">19. Generator Presentasi PPT</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              {/* Item 20: Asisten Chat Konsultan AI */}
              <button
                type="button"
                onClick={() => handleNavClick('ai-chat')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'ai-chat'
                    ? 'bg-orange-500 text-white border-2 border-orange-300 shadow-lg shadow-orange-500/30 ring-2 ring-orange-300 font-extrabold scale-[1.02]'
                    : 'bg-orange-50/90 dark:bg-orange-950/70 text-orange-950 dark:text-orange-100 border-2 border-orange-300 dark:border-orange-700 hover:bg-orange-500 hover:text-white font-bold'
                }`}
              >
                <div className="flex items-center gap-2">
                  <BotMessageSquare className="w-4 h-4 shrink-0" />
                  <span className="text-xs truncate">20. Chat Konsultan AI 24/7</span>
                </div>
                <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md bg-emerald-500 text-white shrink-0">
                  LIVE
                </span>
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* GRUP 4: MENU LAPORAN & PENGATURAN (Tema Kuning/Amber Tajam) */}
          {/* ======================================================== */}
          <div className="space-y-2">
            <div className="bg-amber-500 text-slate-950 border-2 border-yellow-300 shadow-md rounded-xl px-3 py-2 flex items-center justify-between font-black">
              <span className="text-xs tracking-wider uppercase flex items-center gap-1.5">
                <Printer className="w-3.5 h-3.5 text-slate-900" /> LAPORAN & PENGATURAN
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-600 text-white border border-amber-300">
                KUNING TAJAM
              </span>
            </div>

            <div className="space-y-1.5 pt-1">
              {/* Item 21: Pusat Laporan & Cetak */}
              <button
                type="button"
                onClick={() => handleNavClick('laporan')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'laporan'
                    ? 'bg-amber-400 text-slate-950 border-2 border-amber-600 shadow-lg shadow-amber-500/30 ring-2 ring-amber-300 font-black scale-[1.02]'
                    : 'bg-amber-50/90 dark:bg-amber-950/70 text-amber-950 dark:text-amber-100 border-2 border-amber-300 dark:border-amber-700 hover:bg-amber-400 hover:text-slate-950 font-bold'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Printer className="w-4 h-4" />
                  <span className="text-xs">21. Pusat Laporan & Cetak</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              {/* Item 22: Pengaturan & Database */}
              <button
                type="button"
                onClick={() => handleNavClick('pengaturan')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'pengaturan'
                    ? 'bg-amber-400 text-slate-950 border-2 border-amber-600 shadow-lg shadow-amber-500/30 ring-2 ring-amber-300 font-black scale-[1.02]'
                    : 'bg-amber-50/90 dark:bg-amber-950/70 text-amber-950 dark:text-amber-100 border-2 border-amber-300 dark:border-amber-700 hover:bg-amber-400 hover:text-slate-950 font-bold'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Settings className="w-4 h-4" />
                  <span className="text-xs">22. Pengaturan & Database</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            </div>
          </div>

          <div className="pt-4 pb-6 text-center text-[10px] text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
            <p className="font-bold">TUNGGURU EMI SARAPANG</p>
            <p className="text-[9px] mt-0.5">BSKAP Kemendikdasmen No. 046/H/KR/2025</p>
          </div>
        </div>
      </aside>
    </>
  );
};
