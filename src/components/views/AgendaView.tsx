import React, { useState } from 'react';
import { AgendaMengajar, Mapel, GuruProfile, SekolahProfile } from '../../types';
import { dbService } from '../../services/db';
import {
  ClipboardList,
  Plus,
  Printer,
  Edit2,
  Trash2,
  X,
  Check,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { ConfirmModal } from '../common/ConfirmModal';
import { OfficialLetterhead, OfficialSignatureFooter } from '../common/OfficialLetterhead';

interface AgendaViewProps {
  agendaList: AgendaMengajar[];
  mapelList: Mapel[];
  guru: GuruProfile;
  sekolah: SekolahProfile;
}

export const AgendaView: React.FC<AgendaViewProps> = ({
  agendaList,
  mapelList,
  guru,
  sekolah,
}) => {
  const kelasOptions = dbService.getKelasList();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAgenda, setEditingAgenda] = useState<AgendaMengajar | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<AgendaMengajar>>({
    tanggal: new Date().toISOString().slice(0, 10),
    kelas: kelasOptions[0] || 'X RPL 1',
    jamKe: '1-3',
    mapelId: mapelList[0]?.id || '',
    tujuanPembelajaran: '',
    materiPokok: '',
    kegiatanKbm: '',
    hambatan: '',
    solusi: '',
    status: 'Terlaksana',
  });

  const handleOpenAdd = () => {
    setEditingAgenda(null);
    setFormData({
      tanggal: new Date().toISOString().slice(0, 10),
      kelas: kelasOptions[0] || 'X RPL 1',
      jamKe: '1-3',
      mapelId: mapelList[0]?.id || '',
      tujuanPembelajaran:
        'Peserta didik mampu memahami dan menerapkan konsep berpikir komputasional serta algoritma pemrograman.',
      materiPokok: '',
      kegiatanKbm:
        'Pendahuluan apersepsi KBC, Inti eksplorasi studi kasus Deep Learning berkelompok, Penutup refleksi diri.',
      hambatan: 'Tidak ada hambatan signifikan.',
      solusi: 'Pendampingan berkelanjutan.',
      status: 'Terlaksana',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (a: AgendaMengajar) => {
    setEditingAgenda(a);
    setFormData(a);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.materiPokok?.trim()) return;

    if (editingAgenda) {
      const updated = agendaList.map((a) =>
        a.id === editingAgenda.id ? ({ ...a, ...formData } as AgendaMengajar) : a
      );
      dbService.saveAgenda(updated);
    } else {
      const newAgenda: AgendaMengajar = {
        ...formData,
        id: 'ag-' + Date.now(),
      } as AgendaMengajar;
      dbService.saveAgenda([newAgenda, ...agendaList]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!deletingId) return;
    const updated = agendaList.filter((a) => a.id !== deletingId);
    dbService.saveAgenda(updated);
    setDeletingId(null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Printable Kop Surat */}
      <div className="print-only">
        <OfficialLetterhead
          sekolah={sekolah}
          guru={guru}
          documentTitle="JURNAL AGENDA HARIAN MENGAJAR GURU"
          documentSubtitle={`Buku Catatan Administrasi KBM Tatap Muka • Tahun Ajaran ${sekolah.tahunAjaranAktif}`}
        />
      </div>

      {/* Header Halaman (Screen Only) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-md border-2 border-emerald-300 dark:border-emerald-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-600 text-white rounded-xl shadow-md">
            <ClipboardList className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Jurnal Agenda Harian Mengajar Guru
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Dokumentasi KBM di Kelas: TP, Kegiatan, Hambatan, dan Solusi Pembelajaran Mendalam
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-300 dark:border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-4 h-4" />
            Cetak Jurnal Agenda
          </button>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Tulis Agenda KBM Baru
          </button>
        </div>
      </div>

      {/* Tabel Agenda Mengajar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-white uppercase font-extrabold text-[11px] border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-4 py-3.5 text-center w-12">No</th>
                <th className="px-4 py-3.5 w-32">Hari/Tanggal & Jam</th>
                <th className="px-4 py-3.5 w-24">Kelas</th>
                <th className="px-4 py-3.5 w-48">Materi Pokok & TP</th>
                <th className="px-4 py-3.5 min-w-[200px]">Kegiatan Pembelajaran (Deep Learning)</th>
                <th className="px-4 py-3.5 min-w-[180px]">Hambatan & Solusi</th>
                <th className="px-4 py-3.5 text-center w-28">Status</th>
                <th className="px-4 py-3.5 text-center w-20 no-print">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {agendaList.map((item, idx) => {
                const mapelObj = mapelList.find((m) => m.id === item.mapelId);

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-4 py-3 text-center font-bold text-slate-500">{idx + 1}</td>
                    <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">
                      <div>{item.tanggal}</div>
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                        Jam Ke: {item.jamKe}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-bold">
                      <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200">
                        {item.kelas}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-extrabold text-slate-900 dark:text-white">{item.materiPokok}</p>
                      <p className="text-[10px] text-slate-500 italic mt-0.5 line-clamp-2">
                        TP: {item.tujuanPembelajaran}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300 leading-relaxed">
                      {item.kegiatanKbm}
                    </td>
                    <td className="px-4 py-3">
                      {item.hambatan && (
                        <p className="text-[11px] text-rose-600 dark:text-rose-400">
                          <strong>Hambatan:</strong> {item.hambatan}
                        </p>
                      )}
                      {item.solusi && (
                        <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                          <strong>Solusi:</strong> {item.solusi}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${
                          item.status === 'Terlaksana'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300'
                            : item.status === 'Daring'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center no-print">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          className="p-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 text-slate-600 hover:text-blue-600"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingId(item.id)}
                          className="p-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 text-slate-600 hover:text-rose-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Signature Footer */}
      <div className="print-only">
        <OfficialSignatureFooter sekolah={sekolah} guru={guru} />
      </div>

      {/* Modal Tambah/Edit Agenda */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-in fade-in duration-150 no-print">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-lg w-full overflow-hidden">
            <div className="bg-emerald-700 text-white p-4 flex items-center justify-between">
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <ClipboardList className="w-5 h-5" />
                {editingAgenda ? 'Edit Agenda KBM' : 'Tulis Catatan Agenda Harian Guru'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Tanggal KBM
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.tanggal || ''}
                    onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Kelas / Rombel
                  </label>
                  <select
                    value={formData.kelas || 'X RPL 1'}
                    onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                  >
                    {kelasOptions.map((k) => (
                      <option key={k} value={k}>
                        {k}
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
                    placeholder="Contoh: 1-3"
                    value={formData.jamKe || '1-3'}
                    onChange={(e) => setFormData({ ...formData, jamKe: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                  Materi Pokok
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Algoritma Pemrograman Percabangan Kondisional"
                  value={formData.materiPokok || ''}
                  onChange={(e) => setFormData({ ...formData, materiPokok: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                  Tujuan Pembelajaran (TP)
                </label>
                <textarea
                  rows={2}
                  value={formData.tujuanPembelajaran || ''}
                  onChange={(e) => setFormData({ ...formData, tujuanPembelajaran: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                  Kegiatan Pembelajaran (Mindful, Meaningful, Joyful)
                </label>
                <textarea
                  rows={3}
                  value={formData.kegiatanKbm || ''}
                  onChange={(e) => setFormData({ ...formData, kegiatanKbm: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Hambatan / Catatan Siswa
                  </label>
                  <input
                    type="text"
                    value={formData.hambatan || ''}
                    onChange={(e) => setFormData({ ...formData, hambatan: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Solusi / Rencana Tindak Lanjut
                  </label>
                  <input
                    type="text"
                    value={formData.solusi || ''}
                    onChange={(e) => setFormData({ ...formData, solusi: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                  Status Keterlaksanaan
                </label>
                <select
                  value={formData.status || 'Terlaksana'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                >
                  <option value="Terlaksana">Terlaksana (Tatap Muka Normal)</option>
                  <option value="Tertunda">Tertunda (Ada Agenda Sekolah/Izin)</option>
                  <option value="Daring">Daring (Pembelajaran Jarak Jauh)</option>
                </select>
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
                  className="px-5 py-2 rounded-xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  Simpan Agenda
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete */}
      <ConfirmModal
        isOpen={Boolean(deletingId)}
        title="Hapus Agenda Mengajar"
        message="Apakah Anda yakin ingin menghapus catatan jurnal agenda ini?"
        confirmText="Ya, Hapus"
        cancelText="Batal"
        type="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
