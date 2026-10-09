import React, { useState } from 'react';
import { Siswa, Mapel, NilaiSiswa, GuruProfile, SekolahProfile } from '../../types';
import { dbService } from '../../services/db';
import {
  GraduationCap,
  Save,
  Printer,
  FileSpreadsheet,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { OfficialLetterhead, OfficialSignatureFooter } from '../common/OfficialLetterhead';

interface NilaiViewProps {
  siswaList: Siswa[];
  mapelList: Mapel[];
  nilaiList: NilaiSiswa[];
  guru: GuruProfile;
  sekolah: SekolahProfile;
}

export const NilaiView: React.FC<NilaiViewProps> = ({
  siswaList,
  mapelList,
  nilaiList,
  guru,
  sekolah,
}) => {
  const kelasOptions = dbService.getKelasList();
  const [selectedKelas, setSelectedKelas] = useState<string>(kelasOptions[0] || 'X RPL 1');
  const [selectedMapel, setSelectedMapel] = useState<string>(mapelList[0]?.id || '');
  const [selectedSemester, setSelectedSemester] = useState<'Ganjil' | 'Genap'>(sekolah.semesterAktif);
  const [saveAlert, setSaveAlert] = useState(false);

  const studentsInClass = siswaList.filter((s) => s.kelas === selectedKelas);
  const currentMapel = mapelList.find((m) => m.id === selectedMapel) || mapelList[0];
  const kktpMin = currentMapel?.kktpMinimal || 75;

  // Local table state
  const [nilaiMap, setNilaiMap] = useState<Record<string, Partial<NilaiSiswa>>>({});

  // Sync state on change
  React.useEffect(() => {
    const map: Record<string, Partial<NilaiSiswa>> = {};
    studentsInClass.forEach((s) => {
      const existing = nilaiList.find(
        (n) => n.siswaId === s.id && n.mapelId === selectedMapel && n.semester === selectedSemester
      );
      if (existing) {
        map[s.id] = { ...existing };
      } else {
        map[s.id] = {
          formatif1: 85,
          formatif2: 85,
          formatif3: 80,
          formatif4: 85,
          tugasLkpd: 85,
          stsMid: 82,
          sasAkhir: 86,
          kktp: kktpMin,
          catatanKompetensi: 'Mampu mencapai tujuan pembelajaran dengan baik sesuai kriteria.',
        };
      }
    });
    setNilaiMap(map);
  }, [selectedKelas, selectedMapel, selectedSemester, nilaiList]);

  const handleScoreChange = (
    siswaId: string,
    field: keyof NilaiSiswa,
    val: number | string
  ) => {
    setNilaiMap((prev) => ({
      ...prev,
      [siswaId]: {
        ...prev[siswaId],
        [field]: val,
      },
    }));
  };

  const calculateNA = (n: Partial<NilaiSiswa>) => {
    const f1 = Number(n.formatif1 || 0);
    const f2 = Number(n.formatif2 || 0);
    const f3 = Number(n.formatif3 || 0);
    const f4 = Number(n.formatif4 || 0);
    const lkpd = Number(n.tugasLkpd || 0);
    const sts = Number(n.stsMid || 0);
    const sas = Number(n.sasAkhir || 0);

    const avgFormatif = (f1 + f2 + f3 + f4 + lkpd) / 5;
    // Kurikulum Merdeka weight standard: 50% Rerata Formatif, 25% STS, 25% SAS
    const na = avgFormatif * 0.5 + sts * 0.25 + sas * 0.25;
    return Math.round(na);
  };

  const getPredikat = (score: number) => {
    if (score >= 90) return { predikat: 'A', ket: 'Sangat Baik' };
    if (score >= 80) return { predikat: 'B', ket: 'Baik' };
    if (score >= kktpMin) return { predikat: 'C', ket: 'Cukup (Tuntas)' };
    return { predikat: 'D', ket: 'Perlu Bimbingan' };
  };

  const handleGenerateNarasiOtomatis = () => {
    const newMap: Record<string, Partial<NilaiSiswa>> = { ...nilaiMap };
    studentsInClass.forEach((s) => {
      const data = newMap[s.id] || {};
      const na = calculateNA(data);
      const { predikat } = getPredikat(na);

      let narasi = '';
      if (predikat === 'A') {
        narasi = `Menunjukkan penguasaan sangat istimewa dalam menganalisis capaian ${currentMapel?.nama} dan terampil memecahkan masalah kompleks berlandaskan SK BSKAP 046/H/KR/2025.`;
      } else if (predikat === 'B') {
        narasi = `Menunjukkan pemahaman yang baik dalam tujuan pembelajaran ${currentMapel?.nama}, konsisten dalam menyelesaikan tugas kelompok maupun mandiri.`;
      } else if (predikat === 'C') {
        narasi = `Telah mencapai kriteria ketuntasan minimal tujuan pembelajaran ${currentMapel?.nama}, perlu ditingkatkan ketelitian pada evaluasi akhir.`;
      } else {
        narasi = `Perlu pendampingan khusus dan bimbingan remedial mendalam pada elemen kompetensi dasar ${currentMapel?.nama}.`;
      }

      newMap[s.id] = { ...data, catatanKompetensi: narasi };
    });
    setNilaiMap(newMap);
  };

  const handleSave = () => {
    // Keep other records not in current class + mapel + semester
    const otherRecords = nilaiList.filter(
      (n) => !(n.kelas === selectedKelas && n.mapelId === selectedMapel && n.semester === selectedSemester)
    );

    const newRecords: NilaiSiswa[] = studentsInClass.map((s) => {
      const data = nilaiMap[s.id] || {};
      return {
        id: `n-${s.id}-${selectedMapel}-${selectedSemester}`,
        siswaId: s.id,
        kelas: selectedKelas,
        mapelId: selectedMapel,
        semester: selectedSemester,
        formatif1: Number(data.formatif1 || 0),
        formatif2: Number(data.formatif2 || 0),
        formatif3: Number(data.formatif3 || 0),
        formatif4: Number(data.formatif4 || 0),
        tugasLkpd: Number(data.tugasLkpd || 0),
        stsMid: Number(data.stsMid || 0),
        sasAkhir: Number(data.sasAkhir || 0),
        kktp: kktpMin,
        catatanKompetensi: data.catatanKompetensi || '',
      };
    });

    dbService.saveNilai([...otherRecords, ...newRecords]);
    setSaveAlert(true);
    setTimeout(() => setSaveAlert(false), 3000);
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
          documentTitle={`LEGER NILAI & ASESMEN RAPOR KURIKULUM MERDEKA`}
          documentSubtitle={`Mata Pelajaran: ${currentMapel?.nama} • Kelas: ${selectedKelas} • Semester ${selectedSemester} • SK BSKAP 046/H/KR/2025`}
        />
      </div>

      {/* Header Halaman (Screen Only) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-md border-2 border-emerald-300 dark:border-emerald-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-600 text-white rounded-xl shadow-md">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Buku Nilai & Leger Asesmen Rapor
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Perhitungan Otomatis Nilai Akhir (NA), Interval Predikat KKTP, & Narasi Rapor Kurikulum Merdeka
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleGenerateNarasiOtomatis}
            className="px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 dark:bg-amber-950 text-amber-900 dark:text-amber-200 text-xs font-black border border-amber-400 flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Generate Narasi Rapor Otomatis
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-300 dark:border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-4 h-4" />
            Cetak Leger Nilai
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            Simpan Buku Nilai
          </button>
        </div>
      </div>

      {saveAlert && (
        <div className="no-print p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 rounded-xl flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-200 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Nilai peserta didik kelas {selectedKelas} untuk mata pelajaran {currentMapel?.nama} berhasil disimpan ke database!
        </div>
      )}

      {/* Bar Filter Kelas, Mapel & Semester */}
      <div className="no-print bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
              Rombel / Kelas
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
              Mata Pelajaran
            </label>
            <select
              value={selectedMapel}
              onChange={(e) => setSelectedMapel(e.target.value)}
              className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
            >
              {mapelList.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nama} ({m.kode})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
              Semester
            </label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value as 'Ganjil' | 'Genap')}
              className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
            >
              <option value="Ganjil">Semester Ganjil</option>
              <option value="Genap">Semester Genap</option>
            </select>
          </div>
        </div>

        <div className="px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-xs text-emerald-900 dark:text-emerald-200 font-bold">
          KKTP Minimal: <span className="text-sm font-black">{kktpMin}</span>
        </div>
      </div>

      {/* Tabel Leger Nilai Terpadu */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-white uppercase font-extrabold text-[10px] border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-3 py-3 text-center w-10">No</th>
                <th className="px-3 py-3 min-w-[150px]">Nama Peserta Didik</th>
                <th className="px-2 py-3 text-center w-14">F-1</th>
                <th className="px-2 py-3 text-center w-14">F-2</th>
                <th className="px-2 py-3 text-center w-14">F-3</th>
                <th className="px-2 py-3 text-center w-14">F-4</th>
                <th className="px-2 py-3 text-center w-16">LKPD</th>
                <th className="px-2 py-3 text-center w-16">STS Mid</th>
                <th className="px-2 py-3 text-center w-16">SAS Akhir</th>
                <th className="px-2 py-3 text-center w-16 bg-blue-50 dark:bg-blue-950/40">NA</th>
                <th className="px-2 py-3 text-center w-16">Predikat</th>
                <th className="px-3 py-3 min-w-[220px]">Narasi Capaian Rapor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {studentsInClass.length > 0 ? (
                studentsInClass.map((siswa, idx) => {
                  const data = nilaiMap[siswa.id] || {};
                  const na = calculateNA(data);
                  const { predikat, ket } = getPredikat(na);

                  return (
                    <tr
                      key={siswa.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="px-3 py-2.5 text-center font-bold text-slate-500">{idx + 1}</td>
                      <td className="px-3 py-2.5 font-bold text-slate-900 dark:text-white">
                        <div>{siswa.nama}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{siswa.nisn}</div>
                      </td>

                      {/* Inputs Nilai */}
                      <td className="px-1 py-2 text-center">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={data.formatif1 ?? ''}
                          onChange={(e) => handleScoreChange(siswa.id, 'formatif1', e.target.value)}
                          className="w-12 text-center py-1 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                        />
                      </td>
                      <td className="px-1 py-2 text-center">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={data.formatif2 ?? ''}
                          onChange={(e) => handleScoreChange(siswa.id, 'formatif2', e.target.value)}
                          className="w-12 text-center py-1 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                        />
                      </td>
                      <td className="px-1 py-2 text-center">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={data.formatif3 ?? ''}
                          onChange={(e) => handleScoreChange(siswa.id, 'formatif3', e.target.value)}
                          className="w-12 text-center py-1 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                        />
                      </td>
                      <td className="px-1 py-2 text-center">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={data.formatif4 ?? ''}
                          onChange={(e) => handleScoreChange(siswa.id, 'formatif4', e.target.value)}
                          className="w-12 text-center py-1 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                        />
                      </td>
                      <td className="px-1 py-2 text-center">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={data.tugasLkpd ?? ''}
                          onChange={(e) => handleScoreChange(siswa.id, 'tugasLkpd', e.target.value)}
                          className="w-12 text-center py-1 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                        />
                      </td>
                      <td className="px-1 py-2 text-center">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={data.stsMid ?? ''}
                          onChange={(e) => handleScoreChange(siswa.id, 'stsMid', e.target.value)}
                          className="w-12 text-center py-1 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                        />
                      </td>
                      <td className="px-1 py-2 text-center">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={data.sasAkhir ?? ''}
                          onChange={(e) => handleScoreChange(siswa.id, 'sasAkhir', e.target.value)}
                          className="w-12 text-center py-1 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                        />
                      </td>

                      {/* NA Otomatis */}
                      <td className="px-2 py-2.5 text-center font-black text-sm bg-blue-50/80 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300">
                        {na}
                      </td>

                      {/* Predikat */}
                      <td className="px-2 py-2.5 text-center">
                        <span
                          className={`px-2 py-0.5 rounded-md font-black text-xs ${
                            predikat === 'A'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200'
                              : predikat === 'B'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200'
                              : predikat === 'C'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200'
                              : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200'
                          }`}
                        >
                          {predikat}
                        </span>
                      </td>

                      {/* Narasi Rapor */}
                      <td className="px-3 py-2">
                        <textarea
                          rows={2}
                          value={data.catatanKompetensi || ''}
                          onChange={(e) => handleScoreChange(siswa.id, 'catatanKompetensi', e.target.value)}
                          className="w-full p-1.5 text-[11px] rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 leading-tight"
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={12} className="py-12 text-center text-slate-400">
                    Tidak ada siswa di kelas {selectedKelas}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Signature Footer */}
      <div className="print-only">
        <OfficialSignatureFooter sekolah={sekolah} guru={guru} />
      </div>
    </div>
  );
};
