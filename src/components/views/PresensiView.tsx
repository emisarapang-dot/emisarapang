import React, { useState } from 'react';
import { Siswa, PresensiRecord, StatusPresensi, GuruProfile, SekolahProfile } from '../../types';
import { dbService } from '../../services/db';
import {
  CalendarCheck2,
  Calendar,
  CheckCheck,
  Printer,
  Search,
  Filter,
  Save,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { OfficialLetterhead, OfficialSignatureFooter } from '../common/OfficialLetterhead';

interface PresensiViewProps {
  siswaList: Siswa[];
  presensiList: PresensiRecord[];
  guru: GuruProfile;
  sekolah: SekolahProfile;
}

export const PresensiView: React.FC<PresensiViewProps> = ({
  siswaList,
  presensiList,
  guru,
  sekolah,
}) => {
  const kelasOptions = dbService.getKelasList();
  const todayStr = new Date().toISOString().slice(0, 10);

  const [selectedKelas, setSelectedKelas] = useState<string>(kelasOptions[0] || 'X RPL 1');
  const [selectedTanggal, setSelectedTanggal] = useState<string>(todayStr);
  const [search, setSearch] = useState('');
  const [saveAlert, setSaveAlert] = useState(false);

  // Local state of today's attendance for fast editing
  const filteredStudents = siswaList.filter((s) => s.kelas === selectedKelas);

  const getStatusForSiswa = (siswaId: string): StatusPresensi => {
    const record = presensiList.find(
      (p) => p.tanggal === selectedTanggal && p.siswaId === siswaId && p.kelas === selectedKelas
    );
    return record ? record.status : 'H'; // Default to Hadir
  };

  const getCatatanForSiswa = (siswaId: string): string => {
    const record = presensiList.find(
      (p) => p.tanggal === selectedTanggal && p.siswaId === siswaId && p.kelas === selectedKelas
    );
    return record?.catatan || '';
  };

  // State maps for current editor
  const [statusMap, setStatusMap] = useState<Record<string, StatusPresensi>>({});
  const [catatanMap, setCatatanMap] = useState<Record<string, string>>({});

  // Sync on change of date/class
  React.useEffect(() => {
    const sMap: Record<string, StatusPresensi> = {};
    const cMap: Record<string, string> = {};
    filteredStudents.forEach((s) => {
      sMap[s.id] = getStatusForSiswa(s.id);
      cMap[s.id] = getCatatanForSiswa(s.id);
    });
    setStatusMap(sMap);
    setCatatanMap(cMap);
  }, [selectedKelas, selectedTanggal, presensiList]);

  const handleSetStatus = (siswaId: string, status: StatusPresensi) => {
    setStatusMap((prev) => ({ ...prev, [siswaId]: status }));
  };

  const handleSetCatatan = (siswaId: string, catatan: string) => {
    setCatatanMap((prev) => ({ ...prev, [siswaId]: catatan }));
  };

  const handleSetSemuaHadir = () => {
    const sMap: Record<string, StatusPresensi> = {};
    filteredStudents.forEach((s) => {
      sMap[s.id] = 'H';
    });
    setStatusMap(sMap);
  };

  const handleSavePresensi = () => {
    // Keep other dates and other classes, replace today's for this class
    const otherRecords = presensiList.filter(
      (p) => !(p.tanggal === selectedTanggal && p.kelas === selectedKelas)
    );

    const newRecords: PresensiRecord[] = filteredStudents.map((s) => ({
      id: `p-${selectedTanggal}-${s.id}`,
      tanggal: selectedTanggal,
      kelas: selectedKelas,
      siswaId: s.id,
      status: statusMap[s.id] || 'H',
      catatan: catatanMap[s.id] || '',
    }));

    dbService.savePresensi([...otherRecords, ...newRecords]);
    setSaveAlert(true);
    setTimeout(() => setSaveAlert(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Calculate summary counts
  const countH = filteredStudents.filter((s) => (statusMap[s.id] || 'H') === 'H').length;
  const countS = filteredStudents.filter((s) => statusMap[s.id] === 'S').length;
  const countI = filteredStudents.filter((s) => statusMap[s.id] === 'I').length;
  const countA = filteredStudents.filter((s) => statusMap[s.id] === 'A').length;

  return (
    <div className="space-y-6">
      {/* Printable Kop Surat */}
      <div className="print-only">
        <OfficialLetterhead
          sekolah={sekolah}
          guru={guru}
          documentTitle={`DAFTAR PRESENSI KELAS ${selectedKelas.toUpperCase()}`}
          documentSubtitle={`Tanggal KBM: ${selectedTanggal} • Tahun Ajaran ${sekolah.tahunAjaranAktif}`}
        />
      </div>

      {/* Header Halaman (Screen Only) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-md border-2 border-emerald-300 dark:border-emerald-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-600 text-white rounded-xl shadow-md">
            <CalendarCheck2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Presensi & Kehadiran Siswa
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pencatatan Harian Kelas • Fitur Cepat "Set Semua Hadir" & Cetak Rekap Resmi
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleSetSemuaHadir}
            className="px-3.5 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950 dark:hover:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs font-black border border-emerald-400 flex items-center gap-1.5 transition-all shadow-xs"
          >
            <CheckCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Set Semua Hadir (1-Klik)
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-300 dark:border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-4 h-4" />
            Cetak Rekap
          </button>
          <button
            type="button"
            onClick={handleSavePresensi}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md flex items-center gap-1.5 transition-all"
          >
            <Save className="w-4 h-4" />
            Simpan Presensi
          </button>
        </div>
      </div>

      {saveAlert && (
        <div className="no-print p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 rounded-xl flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-200 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Presensi tanggal {selectedTanggal} untuk kelas {selectedKelas} berhasil disimpan ke database lokal!
        </div>
      )}

      {/* Bar Kontrol Kelas, Tanggal, & Summary */}
      <div className="no-print bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
              Pilih Rombel / Kelas
            </label>
            <select
              value={selectedKelas}
              onChange={(e) => setSelectedKelas(e.target.value)}
              className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
            >
              {kelasOptions.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
              Tanggal KBM
            </label>
            <input
              type="date"
              value={selectedTanggal}
              onChange={(e) => setSelectedTanggal(e.target.value)}
              className="px-3 py-1.5 text-xs font-mono font-bold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Counter Ringkasan Kehadiran */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 text-xs font-black border border-emerald-300">
            Hadir: {countH}
          </span>
          <span className="px-3 py-1 rounded-xl bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200 text-xs font-black border border-blue-300">
            Sakit: {countS}
          </span>
          <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200 text-xs font-black border border-amber-300">
            Izin: {countI}
          </span>
          <span className="px-3 py-1 rounded-xl bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200 text-xs font-black border border-rose-300">
            Alpa: {countA}
          </span>
        </div>
      </div>

      {/* Tabel Presensi Siswa */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-white uppercase font-extrabold text-[11px] border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-4 py-3.5 text-center w-12">No</th>
                <th className="px-4 py-3.5">NISN / NIS</th>
                <th className="px-4 py-3.5">Nama Peserta Didik</th>
                <th className="px-4 py-3.5 text-center">L/P</th>
                <th className="px-4 py-3.5 text-center w-64">Status Presensi</th>
                <th className="px-4 py-3.5">Catatan Khusus / Keterlambatan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((siswa, idx) => {
                  const currentStatus = statusMap[siswa.id] || 'H';
                  const currentCatatan = catatanMap[siswa.id] || '';

                  return (
                    <tr
                      key={siswa.id}
                      className="hover:bg-emerald-50/40 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="px-4 py-3 text-center font-bold text-slate-500">{idx + 1}</td>
                      <td className="px-4 py-3 font-mono font-bold text-slate-900 dark:text-white">
                        {siswa.nisn}
                      </td>
                      <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                        {siswa.nama}
                      </td>
                      <td className="px-4 py-3 text-center font-bold">{siswa.jenisKelamin}</td>

                      {/* Status Selector Pill Buttons */}
                      <td className="px-4 py-3 text-center">
                        <div className="inline-flex rounded-xl p-1 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 gap-1">
                          <button
                            type="button"
                            onClick={() => handleSetStatus(siswa.id, 'H')}
                            className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                              currentStatus === 'H'
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600'
                            }`}
                          >
                            Hadir (H)
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSetStatus(siswa.id, 'S')}
                            className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                              currentStatus === 'S'
                                ? 'bg-blue-600 text-white shadow-xs'
                                : 'text-slate-600 dark:text-slate-400 hover:text-blue-600'
                            }`}
                          >
                            Sakit (S)
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSetStatus(siswa.id, 'I')}
                            className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                              currentStatus === 'I'
                                ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                                : 'text-slate-600 dark:text-slate-400 hover:text-amber-600'
                            }`}
                          >
                            Izin (I)
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSetStatus(siswa.id, 'A')}
                            className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                              currentStatus === 'A'
                                ? 'bg-rose-600 text-white shadow-xs'
                                : 'text-slate-600 dark:text-slate-400 hover:text-rose-600'
                            }`}
                          >
                            Alpa (A)
                          </button>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <input
                          type="text"
                          placeholder="Catatan perilaku/alasan..."
                          value={currentCatatan}
                          onChange={(e) => handleSetCatatan(siswa.id, e.target.value)}
                          className="w-full px-2.5 py-1 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400">
                    Tidak ada siswa yang terdaftar di kelas {selectedKelas}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Signature */}
      <div className="print-only">
        <OfficialSignatureFooter sekolah={sekolah} guru={guru} />
      </div>
    </div>
  );
};
