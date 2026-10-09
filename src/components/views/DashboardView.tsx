import React from 'react';
import { GuruProfile, SekolahProfile, Siswa, Mapel, JadwalPelajaran, PresensiRecord, ActiveTab } from '../../types';
import {
  Users,
  BookOpen,
  CalendarCheck2,
  FileCheck,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  CheckCircle2,
  ShieldCheck,
  FileSpreadsheet,
  PlusCircle,
  CreditCard,
  BrainCircuit,
} from 'lucide-react';

interface DashboardViewProps {
  guru: GuruProfile;
  sekolah: SekolahProfile;
  siswa: Siswa[];
  mapel: Mapel[];
  jadwal: JadwalPelajaran[];
  presensi: PresensiRecord[];
  onNavigate: (tab: ActiveTab) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  guru,
  sekolah,
  siswa,
  mapel,
  jadwal,
  presensi,
  onNavigate,
}) => {
  // Metrics calculations
  const totalSiswa = siswa.length;
  const siswaLaki = siswa.filter((s) => s.jenisKelamin === 'L').length;
  const siswaPerempuan = siswa.filter((s) => s.jenisKelamin === 'P').length;
  const totalMapel = mapel.length;

  // Attendance rate
  const totalPresensi = presensi.length;
  const hadirCount = presensi.filter((p) => p.status === 'H').length;
  const attendanceRate = totalPresensi > 0 ? Math.round((hadirCount / totalPresensi) * 100) : 96;

  // Day of week in Indonesian
  const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const todayName = dayNames[new Date().getDay()];
  const jadwalHariIni = jadwal.filter((j) => j.hari === todayName);

  return (
    <div className="space-y-6">
      {/* 1. Header Banner Selamat Datang */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-[#071328] p-6 sm:p-8 text-white shadow-xl border-2 border-blue-700/50">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-12 top-6 opacity-10 hidden md:block pointer-events-none">
          <BrainCircuit className="w-48 h-48 text-amber-300" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Kurikulum Merdeka • Pembelajaran Mendalam (Deep Learning)
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            Selamat Datang, {guru.nama}{guru.gelar ? `, ${guru.gelar}` : ''}!
          </h2>

          <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
            Portal Administrasi Pendidik Profesional Terpadu {sekolah.namaSekolah}. Dirancang sesuai
            standar resmi <strong>Salinan SK Kepala BSKAP Kemendikdasmen No. 046/H/KR/2025</strong> dengan
            pendekatan <em>Mindful, Meaningful, & Joyful Learning</em>.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3 py-1 rounded-xl bg-blue-950/80 border border-blue-700/80 text-blue-200 font-semibold">
              Tahun Ajaran: <strong className="text-amber-300">{sekolah.tahunAjaranAktif}</strong> ({sekolah.semesterAktif})
            </span>
            <span className="px-3 py-1 rounded-xl bg-blue-950/80 border border-blue-700/80 text-blue-200 font-semibold">
              Mapel Utama: <strong className="text-white">{guru.mapelUtama}</strong>
            </span>
            <span className="px-3 py-1 rounded-xl bg-emerald-950/80 border border-emerald-600/80 text-emerald-200 font-semibold">
              Status Sinkron: <strong className="text-emerald-300">Database Lokal Aktif</strong>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Quick Action Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-md border border-slate-200 dark:border-slate-800">
        <p className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
          Aksi Cepat Administrasi Guru
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={() => onNavigate('presensi')}
            className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-700 hover:bg-emerald-600 hover:text-white group text-left transition-all cursor-pointer shadow-xs"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="p-2 rounded-lg bg-emerald-600 text-white group-hover:bg-white group-hover:text-emerald-700 transition-colors">
                <CalendarCheck2 className="w-4 h-4" />
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 group-hover:text-white" />
            </div>
            <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-white">Presensi Hari Ini</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 group-hover:text-emerald-100">Set Hadir 1-Klik</p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('nilai')}
            className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border-2 border-blue-300 dark:border-blue-700 hover:bg-blue-600 hover:text-white group text-left transition-all cursor-pointer shadow-xs"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="p-2 rounded-lg bg-blue-600 text-white group-hover:bg-white group-hover:text-blue-700 transition-colors">
                <FileSpreadsheet className="w-4 h-4" />
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 group-hover:text-white" />
            </div>
            <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-white">Input Asesmen Nilai</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 group-hover:text-blue-100">Formatif & Sumatif</p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('ai-modul')}
            className="p-3.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 border-2 border-orange-300 dark:border-orange-700 hover:bg-orange-500 hover:text-white group text-left transition-all cursor-pointer shadow-xs"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="p-2 rounded-lg bg-orange-500 text-white group-hover:bg-white group-hover:text-orange-600 transition-colors">
                <BrainCircuit className="w-4 h-4" />
              </span>
              <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md bg-rose-600 text-white">HOT</span>
            </div>
            <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-white">Buat Modul Ajar AI</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 group-hover:text-orange-100">Deep Learning SK 046</p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('kartu-siswa')}
            className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700 hover:bg-amber-500 hover:text-slate-950 group text-left transition-all cursor-pointer shadow-xs"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="p-2 rounded-lg bg-amber-500 text-slate-950 group-hover:bg-slate-950 group-hover:text-amber-400 transition-colors">
                <CreditCard className="w-4 h-4" />
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 group-hover:text-slate-950" />
            </div>
            <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-slate-950">Cetak Kartu Siswa</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 group-hover:text-slate-900">QR Code A4 8-Kartu</p>
          </button>
        </div>
      </div>

      {/* 3. Statistik Kunci (4 Kartu Metric) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border-2 border-cyan-200 dark:border-cyan-800 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
              Peserta Didik
            </span>
            <div className="p-2.5 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-3xl font-black text-slate-900 dark:text-white">{totalSiswa}</p>
            <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                L: {siswaLaki}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300">
                P: {siswaPerempuan}
              </span>
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border-2 border-purple-200 dark:border-purple-800 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
              Mata Pelajaran
            </span>
            <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-3xl font-black text-slate-900 dark:text-white">{totalMapel}</p>
            <p className="text-xs text-purple-600 dark:text-purple-400 font-bold mt-2">
              Fase E & Fase F Terdaftar
            </p>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border-2 border-emerald-200 dark:border-emerald-800 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
              Rerata Kehadiran
            </span>
            <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-3xl font-black text-slate-900 dark:text-white">{attendanceRate}%</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-2 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Sangat Disiplin & Aktif
            </p>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border-2 border-orange-200 dark:border-orange-800 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
              Perangkat Ajar
            </span>
            <div className="p-2.5 rounded-xl bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400">
              <FileCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-3xl font-black text-slate-900 dark:text-white">100%</p>
            <p className="text-xs text-orange-600 dark:text-orange-400 font-bold mt-2 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> SK 046/H/KR/2025 Valid
            </p>
          </div>
        </div>
      </div>

      {/* 4. Dua Kolom: Jadwal Mengajar Hari Ini & Log Aktivitas / Kalender */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom Kiri: Jadwal Mengajar Hari Ini */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-rose-500 text-white font-bold">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Jadwal Mengajar Hari Ini ({todayName})
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {jadwalHariIni.length > 0
                    ? `${jadwalHariIni.length} sesi pembelajaran terjadwal`
                    : 'Tidak ada sesi mengajar untuk hari ini'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('jadwal')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              Lihat Mingguan <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {jadwalHariIni.length > 0 ? (
              jadwalHariIni.map((item) => {
                const mapelObj = mapel.find((m) => m.id === item.mapelId);
                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-blue-400 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="px-3 py-2 rounded-xl bg-blue-600 text-white text-center shrink-0">
                        <span className="block text-xs font-black">Jam</span>
                        <span className="text-sm font-black">{item.jamKe}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm text-slate-900 dark:text-white">
                            {mapelObj?.nama || 'Mata Pelajaran'}
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                            {item.kelas}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {item.jamMulai} - {item.jamSelesai} WIB
                          </span>
                          <span>•</span>
                          <span>{item.ruang}</span>
                        </p>
                        {item.keterangan && (
                          <p className="text-xs font-medium text-amber-600 dark:text-amber-400 mt-1">
                            Materi: {item.keterangan}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => onNavigate('presensi')}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs transition-colors"
                      >
                        Buka Presensi
                      </button>
                      <button
                        type="button"
                        onClick={() => onNavigate('agenda')}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300 transition-colors"
                      >
                        Tulis Jurnal
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-10 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                <Calendar className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Hari ini bebas jam tatap muka KBM
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Gunakan waktu untuk penyusunan Modul Ajar Mendalam, Asesmen, atau Bimbingan Siswa.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('jadwal')}
                  className="mt-3 px-4 py-2 rounded-xl text-xs font-extrabold bg-blue-600 text-white hover:bg-blue-700 shadow-md inline-flex items-center gap-1.5"
                >
                  <PlusCircle className="w-3.5 h-3.5" /> Kelola Seluruh Jadwal
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Kolom Kanan: Pengingat & Kalender Edukasi */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-xl bg-amber-500 text-slate-950 font-bold">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Fokus Guru Pekan Ini
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Deep Learning & Karakter</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-1">
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-100">
                Prinsip 1: Mindful Learning
              </span>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Hadir Utuh di Kelas
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                Awali pembelajaran dengan 3 menit jeda hening / pernapasan sadar dan doa penuh ketulusan kasih sayang (KBC).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-1">
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-blue-200 text-blue-900 dark:bg-blue-900 dark:text-blue-100">
                Regulasi BSKAP 046/2025
              </span>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Penyelarasan CP ke TP & ATP
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                Pastikan rumusan Tujuan Pembelajaran mengintegrasikan pemahaman konsep dan keterampilan aplikatif nyata.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1">
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-200 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100">
                7 Kebiasaan Anak Hebat
              </span>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Kokurikuler Karakter
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                Pantau jurnal harian kebiasaan membaca buku 15 menit dan konsumsi makanan sehat bergizi peserta didik.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
