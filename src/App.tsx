import React, { useState, useEffect } from 'react';
import { ActiveTab, GuruProfile, SekolahProfile, Siswa, Mapel, JadwalPelajaran, PresensiRecord, NilaiSiswa, AgendaMengajar, BimbinganKasus, SavedAiDocument } from './types';
import { dbService } from './services/db';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { DashboardView } from './components/views/DashboardView';
import { SiswaView } from './components/views/SiswaView';
import { MapelView } from './components/views/MapelView';
import { JadwalView } from './components/views/JadwalView';
import { PresensiView } from './components/views/PresensiView';
import { KartuSiswaView } from './components/views/KartuSiswaView';
import { NilaiView } from './components/views/NilaiView';
import { AgendaView } from './components/views/AgendaView';
import { BimbinganView } from './components/views/BimbinganView';
import { PerangkatUnduhView } from './components/views/PerangkatUnduhView';
import { AiModulAjarView } from './components/views/ai/AiModulAjarView';
import { AiMediaView } from './components/views/ai/AiMediaView';
import { AiPerangkatView } from './components/views/ai/AiPerangkatView';
import { AiKbcView } from './components/views/ai/AiKbcView';
import { AiKokurikulerView } from './components/views/ai/AiKokurikulerView';
import { AiSoalView } from './components/views/ai/AiSoalView';
import { AiKartuSoalView } from './components/views/ai/AiKartuSoalView';
import { AiLkpdView } from './components/views/ai/AiLkpdView';
import { AiPptView } from './components/views/ai/AiPptView';
import { AiChatView } from './components/views/ai/AiChatView';
import { LaporanView } from './components/views/LaporanView';
import { PengaturanView } from './components/views/PengaturanView';
import { Menu, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('tongguru_dark_mode') === 'true';
  });

  // Reactive DB States
  const [guru, setGuru] = useState<GuruProfile>(() => dbService.getGuru());
  const [sekolah, setSekolah] = useState<SekolahProfile>(() => dbService.getSekolah());
  const [siswaList, setSiswaList] = useState<Siswa[]>(() => dbService.getSiswa());
  const [mapelList, setMapelList] = useState<Mapel[]>(() => dbService.getMapel());
  const [jadwalList, setJadwalList] = useState<JadwalPelajaran[]>(() => dbService.getJadwal());
  const [presensiList, setPresensiList] = useState<PresensiRecord[]>(() => dbService.getPresensi());
  const [nilaiList, setNilaiList] = useState<NilaiSiswa[]>(() => dbService.getNilai());
  const [agendaList, setAgendaList] = useState<AgendaMengajar[]>(() => dbService.getAgenda());
  const [bimbinganList, setBimbinganList] = useState<BimbinganKasus[]>(() => dbService.getBimbingan());
  const [aiDocs, setAiDocs] = useState<SavedAiDocument[]>(() => dbService.getAiDocs());

  // Subscribe to DB updates
  useEffect(() => {
    const unsubscribe = dbService.subscribe(() => {
      setGuru(dbService.getGuru());
      setSekolah(dbService.getSekolah());
      setSiswaList(dbService.getSiswa());
      setMapelList(dbService.getMapel());
      setJadwalList(dbService.getJadwal());
      setPresensiList(dbService.getPresensi());
      setNilaiList(dbService.getNilai());
      setAgendaList(dbService.getAgenda());
      setBimbinganList(dbService.getBimbingan());
      setAiDocs(dbService.getAiDocs());
    });
    return () => unsubscribe();
  }, []);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('tongguru_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('tongguru_dark_mode', 'false');
    }
  }, [darkMode]);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogoutConfirm = () => {
    // Reset to dashboard and notify
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* 1. Header Atas Sesuai Desain Spesifik */}
      <Header
        sekolah={sekolah}
        guru={guru}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onLogoutConfirm={handleLogoutConfirm}
      />

      {/* 2. Mobile Floating Menu Trigger */}
      <div className="no-print lg:hidden sticky top-[72px] z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsMobileSidebarOpen(true)}
          className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
        >
          <Menu className="w-4 h-4" /> Buka Menu Administrasi
        </button>
        <span className="text-xs font-black uppercase text-amber-600 dark:text-amber-400">
          {activeTab}
        </span>
      </div>

      {/* 3. Main Body: Sidebar + Dynamic Main Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Sidebar Navigasi Sharp Multi-Color Blocks */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Viewport Konten Utama */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          {activeTab === 'dashboard' && (
            <DashboardView
              guru={guru}
              sekolah={sekolah}
              siswa={siswaList}
              mapel={mapelList}
              jadwal={jadwalList}
              presensi={presensiList}
              onNavigate={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'siswa' && <SiswaView siswaList={siswaList} />}

          {activeTab === 'mapel' && <MapelView mapelList={mapelList} />}

          {activeTab === 'jadwal' && (
            <JadwalView
              jadwalList={jadwalList}
              mapelList={mapelList}
              siswaList={siswaList}
              guru={guru}
              sekolah={sekolah}
            />
          )}

          {activeTab === 'presensi' && (
            <PresensiView
              siswaList={siswaList}
              presensiList={presensiList}
              guru={guru}
              sekolah={sekolah}
            />
          )}

          {activeTab === 'kartu-siswa' && (
            <KartuSiswaView
              siswaList={siswaList}
              sekolah={sekolah}
              guru={guru}
            />
          )}

          {activeTab === 'nilai' && (
            <NilaiView
              siswaList={siswaList}
              mapelList={mapelList}
              nilaiList={nilaiList}
              guru={guru}
              sekolah={sekolah}
            />
          )}

          {activeTab === 'agenda' && (
            <AgendaView
              agendaList={agendaList}
              mapelList={mapelList}
              guru={guru}
              sekolah={sekolah}
            />
          )}

          {activeTab === 'bimbingan' && (
            <BimbinganView
              bimbinganList={bimbinganList}
              siswaList={siswaList}
              guru={guru}
              sekolah={sekolah}
            />
          )}

          {activeTab === 'perangkat-unduh' && <PerangkatUnduhView />}

          {activeTab === 'ai-modul' && (
            <AiModulAjarView
              guru={guru}
              sekolah={sekolah}
              mapelList={mapelList}
            />
          )}

          {activeTab === 'ai-media' && (
            <AiMediaView
              guru={guru}
              sekolah={sekolah}
              mapelList={mapelList}
            />
          )}

          {activeTab === 'ai-perangkat' && (
            <AiPerangkatView
              guru={guru}
              sekolah={sekolah}
              mapelList={mapelList}
            />
          )}

          {activeTab === 'ai-kbc' && (
            <AiKbcView
              guru={guru}
              sekolah={sekolah}
              mapelList={mapelList}
            />
          )}

          {activeTab === 'ai-kokurikuler' && (
            <AiKokurikulerView
              guru={guru}
              sekolah={sekolah}
            />
          )}

          {activeTab === 'ai-soal' && (
            <AiSoalView
              guru={guru}
              sekolah={sekolah}
              mapelList={mapelList}
            />
          )}

          {activeTab === 'ai-kartu-soal' && (
            <AiKartuSoalView
              guru={guru}
              sekolah={sekolah}
              mapelList={mapelList}
            />
          )}

          {activeTab === 'ai-lkpd' && (
            <AiLkpdView
              guru={guru}
              sekolah={sekolah}
              mapelList={mapelList}
            />
          )}

          {activeTab === 'ai-ppt' && (
            <AiPptView
              guru={guru}
              sekolah={sekolah}
              mapelList={mapelList}
            />
          )}

          {activeTab === 'ai-chat' && (
            <AiChatView
              guru={guru}
              sekolah={sekolah}
            />
          )}

          {activeTab === 'laporan' && (
            <LaporanView
              guru={guru}
              sekolah={sekolah}
              siswaList={siswaList}
              mapelList={mapelList}
              presensiList={presensiList}
              nilaiList={nilaiList}
            />
          )}

          {activeTab === 'pengaturan' && (
            <PengaturanView
              guru={guru}
              sekolah={sekolah}
            />
          )}
        </main>
      </div>
    </div>
  );
}
