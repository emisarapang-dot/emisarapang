import React, { useState } from 'react';
import { JadwalPelajaran, Mapel, Siswa, GuruProfile, SekolahProfile } from '../../types';
import { dbService } from '../../services/db';
import {
  CalendarDays,
  Plus,
  Clock,
  Printer,
  Edit2,
  Trash2,
  X,
  Check,
  Building,
  BookOpen,
} from 'lucide-react';
import { ConfirmModal } from '../common/ConfirmModal';
import { OfficialLetterhead, OfficialSignatureFooter } from '../common/OfficialLetterhead';

interface JadwalViewProps {
  jadwalList: JadwalPelajaran[];
  mapelList: Mapel[];
  siswaList: Siswa[];
  guru: GuruProfile;
  sekolah: SekolahProfile;
}

const HARI_LIST = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'] as const;

export const JadwalView: React.FC<JadwalViewProps> = ({
  jadwalList,
  mapelList,
  siswaList,
  guru,
  sekolah,
}) => {
  const [selectedHari, setSelectedHari] = useState<string>('Semua');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJadwal, setEditingJadwal] = useState<JadwalPelajaran | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isPrintMode, setIsPrintMode] = useState(false);

  // DYNAMIC DROPDOWN FOR KELAS/ROMBEL
  // Automatically extract unique classes from student database & registered classes
  const dynamicKelasOptions = dbService.getKelasList();

  const [formData, setFormData] = useState<Partial<JadwalPelajaran>>({
    hari: 'Senin',
    jamKe: '1-3',
    jamMulai: '07:30',
    jamSelesai: '09:45',
    kelas: dynamicKelasOptions[0] || 'X RPL 1',
    mapelId: mapelList[0]?.id || '',
    ruang: 'Lab Komputer 1',
    keterangan: '',
  });

  const handleOpenAdd = (defaultHari?: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu') => {
    setEditingJadwal(null);
    setFormData({
      hari: defaultHari || 'Senin',
      jamKe: '1-3',
      jamMulai: '07:30',
      jamSelesai: '09:45',
      kelas: dynamicKelasOptions[0] || 'X RPL 1',
      mapelId: mapelList[0]?.id || '',
      ruang: 'Lab Komputer 1',
      keterangan: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (j: JadwalPelajaran) => {
    setEditingJadwal(j);
    setFormData(j);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.kelas || !formData.mapelId) return;

    if (editingJadwal) {
      const updated = jadwalList.map((j) =>
        j.id === editingJadwal.id ? ({ ...j, ...formData } as JadwalPelajaran) : j
      );
      dbService.saveJadwal(updated);
    } else {
      const newJadwal: JadwalPelajaran = {
        ...formData,
        id: 'j-' + Date.now(),
      } as JadwalPelajaran;
      dbService.saveJadwal([...jadwalList, newJadwal]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!deletingId) return;
    const updated = jadwalList.filter((j) => j.id !== deletingId);
    dbService.saveJadwal(updated);
    setDeletingId(null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Printable Letterhead (Only visible during print) */}
      <div className="print-only">
        <OfficialLetterhead
          sekolah={sekolah}
          guru={guru}
          documentTitle="JADWAL MENGAJAR GURU TAHUN AJARAN 2026/2027"
          documentSubtitle="Administrasi Beban Kerja Guru Mata Pelajaran Kurikulum Merdeka"
        />
      </div>

      {/* Header Halaman (Hidden in print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-md border-2 border-rose-300 dark:border-rose-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-600 text-white rounded-xl shadow-md">
            <CalendarDays className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Jadwal Pelajaran KBM Mingguan
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Form Sesi Terintegrasi Dropdown Rombel Dinamis Tanpa Ketik Manual
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handlePrint}
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-300 dark:border-slate-700 flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Printer className="w-4 h-4" />
            Cetak Format Jadwal
          </button>
          <button
            type="button"
            onClick={() => handleOpenAdd()}
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold shadow-md flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            Tambah Sesi Jadwal
          </button>
        </div>
      </div>

      {/* Filter Hari Tab (Hidden in print) */}
      <div className="no-print bg-white dark:bg-slate-900 p-2.5 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setSelectedHari('Semua')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            selectedHari === 'Semua'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Semua Hari ({jadwalList.length})
        </button>
        {HARI_LIST.map((h) => {
          const count = jadwalList.filter((j) => j.hari === h).length;
          return (
            <button
              key={h}
              type="button"
              onClick={() => setSelectedHari(h)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedHari === h
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {h} ({count})
            </button>
          );
        })}
      </div>

      {/* Tampilan Jadwal Per Hari Grid */}
      <div className="space-y-6">
        {HARI_LIST.filter((h) => selectedHari === 'Semua' || selectedHari === h).map((hari) => {
          const sessions = jadwalList.filter((j) => j.hari === hari);

          return (
            <div
              key={hari}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 overflow-hidden break-inside-avoid"
            >
              <div className="bg-slate-100 dark:bg-slate-800/80 px-5 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-xs"></span>
                  <h3 className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                    {hari}
                  </h3>
                  <span className="text-[11px] font-bold text-slate-500">
                    ({sessions.length} Sesi Terjadwal)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenAdd(hari)}
                  className="no-print text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah di {hari}
                </button>
              </div>

              {sessions.length > 0 ? (
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {sessions.map((item) => {
                    const mapelObj = mapelList.find((m) => m.id === item.mapelId);
                    return (
                      <div
                        key={item.id}
                        className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-rose-50/30 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <div className="px-3 py-2 rounded-xl bg-rose-600 text-white text-center shrink-0 min-w-[70px]">
                            <span className="block text-[10px] font-black uppercase opacity-80">
                              Jam Ke-
                            </span>
                            <span className="text-base font-black">{item.jamKe}</span>
                          </div>

                          <div>
                            <div className="flex items-center gap-2.5">
                              <h4 className="font-black text-sm text-slate-900 dark:text-white">
                                {mapelObj?.nama || 'Mata Pelajaran'}
                              </h4>
                              {/* Rombel Dropdown Badge */}
                              <span className="px-2.5 py-0.5 rounded-lg text-xs font-black bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200 border border-rose-300 dark:border-rose-700">
                                {item.kelas}
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                              <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                                <Clock className="w-3.5 h-3.5 text-rose-500" />
                                {item.jamMulai} - {item.jamSelesai} WIB
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Building className="w-3.5 h-3.5" />
                                {item.ruang}
                              </span>
                              {item.keterangan && (
                                <>
                                  <span>•</span>
                                  <span className="text-amber-600 dark:text-amber-400 font-medium">
                                    Topik: {item.keterangan}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="no-print flex items-center gap-1.5 self-end sm:self-center">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(item)}
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 hover:text-blue-600 transition-colors"
                            title="Edit Sesi"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingId(item.id)}
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 hover:text-rose-600 transition-colors"
                            title="Hapus Sesi"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-slate-400">
                  Belum ada sesi pelajaran pada hari {hari}.
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Printable Signature Footer (Only in print) */}
      <div className="print-only">
        <OfficialSignatureFooter sekolah={sekolah} guru={guru} />
      </div>

      {/* Modal Form Tambah/Edit Jadwal - DROPDOWN DINAMIS WAJIB */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-in fade-in duration-150 no-print">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full overflow-hidden">
            <div className="bg-rose-600 text-white p-4 flex items-center justify-between">
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <CalendarDays className="w-5 h-5" />
                {editingJadwal ? 'Edit Sesi Jadwal' : 'Tambah Sesi Mengajar KBM'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Hari
                  </label>
                  <select
                    value={formData.hari || 'Senin'}
                    onChange={(e) => setFormData({ ...formData, hari: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                  >
                    {HARI_LIST.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Jam Ke-
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 1-3 atau 4-5"
                    value={formData.jamKe || ''}
                    onChange={(e) => setFormData({ ...formData, jamKe: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                  />
                </div>
              </div>

              {/* CRITICAL: DROPDOWN DINAMIS UNTUK KELAS / ROMBEL */}
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-800">
                <label className="block text-[11px] font-extrabold text-rose-950 dark:text-rose-200 uppercase mb-1 flex items-center justify-between">
                  <span>Kelas / Rombel Siswa (Dropdown Dinamis)</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-600 text-white font-bold">
                    Terkoneksi Database
                  </span>
                </label>
                <select
                  required
                  value={formData.kelas || ''}
                  onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border-2 border-rose-300 dark:border-rose-700 font-extrabold text-slate-900 dark:text-white"
                >
                  <option value="" disabled>
                    -- Pilih Rombel Kelas --
                  </option>
                  {dynamicKelasOptions.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-rose-700 dark:text-rose-300 mt-1">
                  Otomatis terisi dari data rombel siswa untuk mencegah salah ketik.
                </p>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                  Mata Pelajaran
                </label>
                <select
                  value={formData.mapelId || ''}
                  onChange={(e) => setFormData({ ...formData, mapelId: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                >
                  {mapelList.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.nama} ({m.kode})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Jam Mulai
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.jamMulai || '07:30'}
                    onChange={(e) => setFormData({ ...formData, jamMulai: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Jam Selesai
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.jamSelesai || '09:45'}
                    onChange={(e) => setFormData({ ...formData, jamSelesai: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                  Ruang / Laboratorium
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Lab Komputer 1 / Ruang Teori 12"
                  value={formData.ruang || ''}
                  onChange={(e) => setFormData({ ...formData, ruang: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                  Catatan Topik / Materi Pembelajaran (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Algoritma Pemrograman Kondisional"
                  value={formData.keterangan || ''}
                  onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-extrabold bg-rose-600 hover:bg-rose-700 text-white shadow-md flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  Simpan Sesi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete */}
      <ConfirmModal
        isOpen={Boolean(deletingId)}
        title="Hapus Sesi Jadwal"
        message="Apakah Anda yakin ingin menghapus sesi jam pelajaran ini?"
        confirmText="Ya, Hapus"
        cancelText="Batal"
        type="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
