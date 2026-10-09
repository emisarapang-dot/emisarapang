import React, { useState } from 'react';
import { BimbinganKasus, Siswa, GuruProfile, SekolahProfile } from '../../types';
import { dbService } from '../../services/db';
import {
  HeartHandshake,
  Plus,
  Printer,
  Edit2,
  Trash2,
  X,
  Check,
  Award,
  AlertTriangle,
  UserCheck,
} from 'lucide-react';
import { ConfirmModal } from '../common/ConfirmModal';
import { OfficialLetterhead, OfficialSignatureFooter } from '../common/OfficialLetterhead';

interface BimbinganViewProps {
  bimbinganList: BimbinganKasus[];
  siswaList: Siswa[];
  guru: GuruProfile;
  sekolah: SekolahProfile;
}

export const BimbinganView: React.FC<BimbinganViewProps> = ({
  bimbinganList,
  siswaList,
  guru,
  sekolah,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BimbinganKasus | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [kategoriFilter, setKategoriFilter] = useState<string>('Semua');

  const [formData, setFormData] = useState<Partial<BimbinganKasus>>({
    tanggal: new Date().toISOString().slice(0, 10),
    siswaId: siswaList[0]?.id || '',
    kategori: 'Akademik',
    uraianMasalah: '',
    tindakLanjut: '',
    pihakTerlibat: 'Wali Kelas, Siswa Bersangkutan',
    status: 'Dalam Proses',
  });

  const filteredList = bimbinganList.filter(
    (b) => kategoriFilter === 'Semua' || b.kategori === kategoriFilter
  );

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      tanggal: new Date().toISOString().slice(0, 10),
      siswaId: siswaList[0]?.id || '',
      kategori: 'Akademik',
      uraianMasalah: '',
      tindakLanjut: '',
      pihakTerlibat: 'Wali Kelas, Guru Mapel, Orang Tua',
      status: 'Dalam Proses',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: BimbinganKasus) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.uraianMasalah?.trim()) return;

    if (editingItem) {
      const updated = bimbinganList.map((b) =>
        b.id === editingItem.id ? ({ ...b, ...formData } as BimbinganKasus) : b
      );
      dbService.saveBimbingan(updated);
    } else {
      const newItem: BimbinganKasus = {
        ...formData,
        id: 'bk-' + Date.now(),
      } as BimbinganKasus;
      dbService.saveBimbingan([newItem, ...bimbinganList]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!deletingId) return;
    const updated = bimbinganList.filter((b) => b.id !== deletingId);
    dbService.saveBimbingan(updated);
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
          documentTitle="BUKU CATATAN BIMBINGAN WALI KELAS & KASUS SISWA"
          documentSubtitle={`Rekam Jejak Konseling, Pembinaan Karakter, & Apresiasi Prestasi Siswa • TA ${sekolah.tahunAjaranAktif}`}
        />
      </div>

      {/* Header Halaman (Screen Only) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-md border-2 border-emerald-300 dark:border-emerald-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-600 text-white rounded-xl shadow-md">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Bimbingan Wali Kelas & Konseling Siswa (BK)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pencatatan Pendampingan Empatik, Catatan Kasus, Pembinaan Disiplin, & Catatan Prestasi
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
            Cetak Rekap Bimbingan
          </button>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Catat Bimbingan Baru
          </button>
        </div>
      </div>

      {/* Filter Kategori */}
      <div className="no-print bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto">
        {['Semua', 'Akademik', 'Disiplin', 'Sosial/Pribadi', 'Prestasi', 'Karir'].map((kat) => (
          <button
            key={kat}
            type="button"
            onClick={() => setKategoriFilter(kat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              kategoriFilter === kat
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {kat}
          </button>
        ))}
      </div>

      {/* Tabel Rekam Bimbingan */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-white uppercase font-extrabold text-[11px] border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-4 py-3.5 text-center w-12">No</th>
                <th className="px-4 py-3.5 w-28">Tanggal</th>
                <th className="px-4 py-3.5 w-44">Nama Siswa & Kelas</th>
                <th className="px-4 py-3.5 w-28 text-center">Kategori</th>
                <th className="px-4 py-3.5 min-w-[200px]">Uraian Kasus / Konseling / Prestasi</th>
                <th className="px-4 py-3.5 min-w-[180px]">Rencana Tindak Lanjut & Pihak Terlibat</th>
                <th className="px-4 py-3.5 text-center w-28">Status</th>
                <th className="px-4 py-3.5 text-center w-20 no-print">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredList.map((item, idx) => {
                const siswaObj = siswaList.find((s) => s.id === item.siswaId);

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-4 py-3 text-center font-bold text-slate-500">{idx + 1}</td>
                    <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">
                      {item.tanggal}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-extrabold text-slate-900 dark:text-white">
                        {siswaObj?.nama || 'Siswa Terdaftar'}
                      </p>
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">
                        {siswaObj?.kelas}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                          item.kategori === 'Prestasi'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            : item.kategori === 'Disiplin'
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                        }`}
                      >
                        {item.kategori}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                      {item.uraianMasalah}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-slate-800 dark:text-slate-200">
                        {item.tindakLanjut}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        Pihak: {item.pihakTerlibat}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${
                          item.status === 'Selesai'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300'
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

      {/* Modal Tambah/Edit Bimbingan */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-in fade-in duration-150 no-print">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-lg w-full overflow-hidden">
            <div className="bg-emerald-700 text-white p-4 flex items-center justify-between">
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <HeartHandshake className="w-5 h-5" />
                {editingItem ? 'Edit Rekam Bimbingan' : 'Catat Bimbingan / Kasus Siswa'}
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
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Tanggal Catatan
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
                    Kategori
                  </label>
                  <select
                    value={formData.kategori || 'Akademik'}
                    onChange={(e) => setFormData({ ...formData, kategori: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                  >
                    <option value="Akademik">Akademik & Nilai</option>
                    <option value="Disiplin">Kedisiplinan & Tata Tertib</option>
                    <option value="Sosial/Pribadi">Sosial, Emosional, & Keluarga</option>
                    <option value="Prestasi">Prestasi & Bakat Minat</option>
                    <option value="Karir">Perencanaan Karir / Kuliah</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                  Pilih Peserta Didik
                </label>
                <select
                  value={formData.siswaId || ''}
                  onChange={(e) => setFormData({ ...formData, siswaId: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                >
                  {siswaList.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nama} ({s.kelas} - {s.nisn})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                  Uraian Masalah / Konseling / Prestasi
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Jelaskan situasi atau capaian siswa secara objektif dan penuh empati..."
                  value={formData.uraianMasalah || ''}
                  onChange={(e) => setFormData({ ...formData, uraianMasalah: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                  Rencana Tindak Lanjut / Solusi
                </label>
                <textarea
                  rows={2}
                  placeholder="Contoh: Konseling empatik 1-on-1, penyesuaian beban belajar, apresiasi..."
                  value={formData.tindakLanjut || ''}
                  onChange={(e) => setFormData({ ...formData, tindakLanjut: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Pihak Terlibat
                  </label>
                  <input
                    type="text"
                    value={formData.pihakTerlibat || ''}
                    onChange={(e) => setFormData({ ...formData, pihakTerlibat: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Status Bimbingan
                  </label>
                  <select
                    value={formData.status || 'Dalam Proses'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                  >
                    <option value="Dalam Proses">Dalam Proses</option>
                    <option value="Selesai">Selesai (Tuntas Positif)</option>
                    <option value="Rujukan BK">Rujukan Guru BK Sekolah</option>
                  </select>
                </div>
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
                  Simpan Bimbingan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete */}
      <ConfirmModal
        isOpen={Boolean(deletingId)}
        title="Hapus Rekam Bimbingan"
        message="Apakah Anda yakin ingin menghapus catatan bimbingan ini?"
        confirmText="Ya, Hapus"
        cancelText="Batal"
        type="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
