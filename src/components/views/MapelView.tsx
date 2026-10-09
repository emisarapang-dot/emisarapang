import React, { useState } from 'react';
import { Mapel } from '../../types';
import { dbService } from '../../services/db';
import { BookOpen, Plus, Edit2, Trash2, X, Check, ShieldCheck, Tag } from 'lucide-react';
import { ConfirmModal } from '../common/ConfirmModal';

interface MapelViewProps {
  mapelList: Mapel[];
}

export const MapelView: React.FC<MapelViewProps> = ({ mapelList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMapel, setEditingMapel] = useState<Mapel | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<Mapel>>({
    kode: '',
    nama: '',
    fase: 'Fase E',
    tingkatKelas: 'Kelas X',
    jpPerMinggu: 3,
    kktpMinimal: 75,
    deskripsiCp: '',
    elemen: [],
  });

  const [elemenInput, setElemenInput] = useState('');

  const handleOpenAdd = () => {
    setEditingMapel(null);
    setFormData({
      kode: 'MAPEL-' + (mapelList.length + 1),
      nama: '',
      fase: 'Fase E',
      tingkatKelas: 'Kelas X',
      jpPerMinggu: 3,
      kktpMinimal: 75,
      deskripsiCp:
        'Sesuai Salinan SK BSKAP Kemendikdasmen No. 046/H/KR/2025: Peserta didik mampu menganalisis konsep dan menerapkan keterampilan terstruktur.',
      elemen: ['Elemen 1: Pemahaman Konseptual', 'Elemen 2: Keterampilan Proses'],
    });
    setElemenInput('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (m: Mapel) => {
    setEditingMapel(m);
    setFormData(m);
    setElemenInput('');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama?.trim()) return;

    if (editingMapel) {
      const updated = mapelList.map((m) =>
        m.id === editingMapel.id ? ({ ...m, ...formData } as Mapel) : m
      );
      dbService.saveMapel(updated);
    } else {
      const newMapel: Mapel = {
        ...formData,
        id: 'm-' + Date.now(),
      } as Mapel;
      dbService.saveMapel([...mapelList, newMapel]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!deletingId) return;
    const updated = mapelList.filter((m) => m.id !== deletingId);
    dbService.saveMapel(updated);
    setDeletingId(null);
  };

  const handleAddElemen = () => {
    if (!elemenInput.trim()) return;
    const current = formData.elemen || [];
    setFormData({ ...formData, elemen: [...current, elemenInput.trim()] });
    setElemenInput('');
  };

  const handleRemoveElemen = (idx: number) => {
    const current = formData.elemen || [];
    setFormData({ ...formData, elemen: current.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-md border-2 border-purple-300 dark:border-purple-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-600 text-white rounded-xl shadow-md">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Materi & Mata Pelajaran (Fase & CP)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Konfigurasi Capaian Pembelajaran & Elemen Kurikulum berlandaskan SK BSKAP 046/H/KR/2025
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-extrabold shadow-md flex items-center gap-1.5 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Tambah Mata Pelajaran
        </button>
      </div>

      {/* Grid Kartu Mata Pelajaran */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {mapelList.map((m) => (
          <div
            key={m.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 p-5 shadow-md hover:border-purple-400 dark:hover:border-purple-600 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border border-purple-300 dark:border-purple-700">
                    {m.kode}
                  </span>
                  <h3 className="font-black text-base text-slate-900 dark:text-white mt-1.5 leading-snug">
                    {m.nama}
                  </h3>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(m)}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-purple-100 text-slate-600 hover:text-purple-700 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeletingId(m.id)}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 text-slate-600 hover:text-rose-700 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-extrabold border border-blue-200 dark:border-blue-800">
                  {m.fase}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800">
                  {m.tingkatKelas}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-bold border border-amber-200 dark:border-amber-800">
                  {m.jpPerMinggu} JP/Minggu
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-bold border border-rose-200 dark:border-rose-800">
                  KKTP: {m.kktpMinimal}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <div className="flex items-center gap-1 font-bold text-slate-900 dark:text-white mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Capaian Pembelajaran (SK 046/2025):
                </div>
                <p className="line-clamp-3 italic text-[11px]">{m.deskripsiCp}</p>
              </div>

              <div>
                <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                  <Tag className="w-3 h-3 text-purple-500" /> Elemen / Lingkup Materi:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {m.elemen?.map((elem, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-800 text-[10px] font-semibold"
                    >
                      {elem}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form Mapel */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-lg w-full overflow-hidden">
            <div className="bg-purple-700 text-white p-4 flex items-center justify-between">
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                {editingMapel ? 'Edit Mata Pelajaran' : 'Tambah Mata Pelajaran Baru'}
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
                    Kode Mapel
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.kode || ''}
                    onChange={(e) => setFormData({ ...formData, kode: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Nama Mata Pelajaran
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nama || ''}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Fase
                  </label>
                  <select
                    value={formData.fase || 'Fase E'}
                    onChange={(e) => setFormData({ ...formData, fase: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                  >
                    <option value="Fase E">Fase E (Kelas X)</option>
                    <option value="Fase F">Fase F (Kelas XI/XII)</option>
                    <option value="Fase D">Fase D (SMP)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    JP / Minggu
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={formData.jpPerMinggu || 3}
                    onChange={(e) => setFormData({ ...formData, jpPerMinggu: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    KKTP Minimal
                  </label>
                  <input
                    type="number"
                    min={50}
                    max={100}
                    value={formData.kktpMinimal || 75}
                    onChange={(e) => setFormData({ ...formData, kktpMinimal: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                  Deskripsi Capaian Pembelajaran (Rujukan SK BSKAP 046/H/KR/2025)
                </label>
                <textarea
                  rows={3}
                  value={formData.deskripsiCp || ''}
                  onChange={(e) => setFormData({ ...formData, deskripsiCp: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                  Elemen / Lingkup Materi
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Contoh: Berpikir Komputasional"
                    value={elemenInput}
                    onChange={(e) => setElemenInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddElemen();
                      }
                    }}
                    className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                  />
                  <button
                    type="button"
                    onClick={handleAddElemen}
                    className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold"
                  >
                    Tambah
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  {formData.elemen?.map((elem, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded-md bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 text-xs flex items-center gap-1 font-semibold"
                    >
                      {elem}
                      <button
                        type="button"
                        onClick={() => handleRemoveElemen(idx)}
                        className="hover:text-rose-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
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
                  className="px-5 py-2 rounded-xl text-xs font-extrabold bg-purple-600 hover:bg-purple-700 text-white shadow-md flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  Simpan Mapel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete */}
      <ConfirmModal
        isOpen={Boolean(deletingId)}
        title="Hapus Mata Pelajaran"
        message="Apakah Anda yakin ingin menghapus mata pelajaran ini? Jadwal dan asesmen terkait mungkin terpengaruh."
        confirmText="Ya, Hapus"
        cancelText="Batal"
        type="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
