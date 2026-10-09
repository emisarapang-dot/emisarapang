import React, { useState } from 'react';
import { GuruProfile, SekolahProfile, Siswa, Mapel, PresensiRecord, NilaiSiswa } from '../../types';
import { Printer, BookOpen, FileCheck, Layers, Award, FileSpreadsheet, Download, Check } from 'lucide-react';
import { OfficialLetterhead, OfficialSignatureFooter } from '../common/OfficialLetterhead';

interface LaporanViewProps {
  guru: GuruProfile;
  sekolah: SekolahProfile;
  siswaList: Siswa[];
  mapelList: Mapel[];
  presensiList: PresensiRecord[];
  nilaiList: NilaiSiswa[];
}

export const LaporanView: React.FC<LaporanViewProps> = ({
  guru,
  sekolah,
  siswaList,
  mapelList,
  presensiList,
  nilaiList,
}) => {
  const [activeCover, setActiveCover] = useState<string>('Buku Kerja 1');

  const bukuKerjaList = [
    {
      title: 'Buku Kerja Guru 1',
      subtitle: 'Standar Kelulusan & Perencanaan Pembelajaran',
      items: [
        'SKL, Capaian Pembelajaran (CP) SK BSKAP 046/H/KR/2025',
        'Tujuan Pembelajaran (TP) & Alur Tujuan Pembelajaran (ATP)',
        'Modul Ajar Deep Learning (Mindful, Meaningful, Joyful)',
        'Kriteria Ketercapaian Tujuan Pembelajaran (KKTP)',
      ],
      color: 'bg-blue-600',
    },
    {
      title: 'Buku Kerja Guru 2',
      subtitle: 'Pedoman Mutu & Agenda Pelaksanaan',
      items: [
        'Kode Etik Guru Indonesia & Ikrar Guru',
        'Tata Tertib Guru & Pembiasaan Karakter',
        'Alokasi Waktu Jam Efektif KBM',
        'Program Tahunan (Prota) & Program Semester (Prosem)',
        'Jurnal Agenda Harian Mengajar Guru',
      ],
      color: 'bg-emerald-600',
    },
    {
      title: 'Buku Kerja Guru 3',
      subtitle: 'Asesmen, Evaluasi, & Rekam Nilai',
      items: [
        'Daftar Hadir Presensi Siswa',
        'Daftar Nilai / Leger Asesmen Formatif & Sumatif',
        'Analisis Hasil Asesmen & Program Remedial / Pengayaan',
        'Kisi-Kisi & Kartu Soal Ujian',
      ],
      color: 'bg-amber-600',
    },
    {
      title: 'Buku Kerja Guru 4',
      subtitle: 'Pengembangan Keprofesian & Pembinaan',
      items: [
        'Buku Bimbingan Kasus & Konseling Wali Kelas',
        'Catatan Prestasi & Portofolio Karya Siswa',
        'Evaluasi Diri Guru & Rencana PKB',
        'Dokumentasi Pembelajaran Mendalam di Kelas',
      ],
      color: 'bg-purple-600',
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Printable Official Cover Preview */}
      <div className="print-only">
        <div className="min-h-[920px] p-8 flex flex-col justify-between text-center border-4 border-double border-black">
          {/* Header Kop Cover */}
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-700">
              PEMERINTAH PROVINSI {sekolah.provinsi.toUpperCase()}
            </p>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-700">
              DINAS PENDIDIKAN DAN KEBUDAYAAN
            </p>
            <h1 className="text-xl font-black uppercase text-slate-950">
              {sekolah.namaSekolah}
            </h1>
            <p className="text-[10px] text-slate-600">
              {sekolah.alamat}, {sekolah.kotaKabupaten} • NPSN: {sekolah.npsn}
            </p>
          </div>

          {/* Logo Tengah */}
          <div className="my-8 flex justify-center">
            <img
              src={sekolah.logo}
              alt="Logo Sekolah"
              className="w-36 h-36 object-contain"
            />
          </div>

          {/* Judul Buku Kerja */}
          <div className="my-6 space-y-3">
            <h2 className="text-2xl font-black tracking-wider uppercase underline">
              DOKUMEN ADMINISTRASI GURU
            </h2>
            <h3 className="text-xl font-extrabold uppercase text-slate-900">
              {activeCover.toUpperCase()}
            </h3>
            <p className="text-xs font-semibold italic text-slate-700">
              Kurikulum Merdeka dengan Pendekatan Pembelajaran Mendalam (Deep Learning)
            </p>
            <p className="text-[11px] font-bold text-slate-800">
              Berlandaskan Salinan Keputusan Kepala BSKAP Kemendikdasmen Nomor 046/H/KR/2025
            </p>
          </div>

          {/* Identitas Guru Pengampu */}
          <div className="my-6 p-4 border border-black max-w-md mx-auto text-left text-xs space-y-1.5 font-bold">
            <div className="grid grid-cols-3">
              <span>Mata Pelajaran</span>
              <span className="col-span-2">: {guru.mapelUtama}</span>
            </div>
            <div className="grid grid-cols-3">
              <span>Nama Guru</span>
              <span className="col-span-2">: {guru.nama}{guru.gelar ? `, ${guru.gelar}` : ''}</span>
            </div>
            <div className="grid grid-cols-3">
              <span>NIP</span>
              <span className="col-span-2 font-mono">: {guru.nip}</span>
            </div>
            <div className="grid grid-cols-3">
              <span>NUPTK</span>
              <span className="col-span-2 font-mono">: {guru.nuptk}</span>
            </div>
            <div className="grid grid-cols-3">
              <span>Pangkat/Golongan</span>
              <span className="col-span-2">: {guru.pangkatGolongan}</span>
            </div>
            <div className="grid grid-cols-3">
              <span>Tahun Pelajaran</span>
              <span className="col-span-2">: {sekolah.tahunAjaranAktif} ({sekolah.semesterAktif})</span>
            </div>
          </div>

          {/* Titimangsa & Pengesahan */}
          <div className="mt-6 flex justify-between px-10 text-xs">
            <div className="text-center">
              <p>Mengetahui,</p>
              <p className="font-bold">Kepala Sekolah</p>
              <div className="h-16" />
              <p className="font-bold underline uppercase">{sekolah.namaKepalaSekolah}</p>
              <p className="text-[10px]">NIP. {sekolah.nipKepalaSekolah}</p>
            </div>
            <div className="text-center">
              <p>{sekolah.kotaKabupaten}, {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p className="font-bold">Guru Mata Pelajaran</p>
              <div className="h-16" />
              <p className="font-bold underline uppercase">{guru.nama}{guru.gelar ? `, ${guru.gelar}` : ''}</p>
              <p className="text-[10px]">NIP. {guru.nip}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Header Halaman (Screen Only) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-md border-2 border-amber-300 dark:border-amber-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500 text-slate-950 rounded-xl shadow-md font-bold">
            <Printer className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Pusat Laporan & Cetak Administrasi Guru 1-Klik
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Cetak Cover Resmi Buku Kerja Guru 1, 2, 3, 4 & Seluruh Bundel Dokumen Kurikulum Merdeka
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black shadow-md flex items-center gap-2 transition-all cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          Cetak Cover {activeCover} Sekarang
        </button>
      </div>

      {/* Grid 4 Kartu Buku Kerja Guru (Screen Only) */}
      <div className="no-print grid grid-cols-1 md:grid-cols-2 gap-5">
        {bukuKerjaList.map((bk) => {
          const isSelected = activeCover === bk.title;

          return (
            <div
              key={bk.title}
              onClick={() => setActiveCover(bk.title)}
              className={`p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 transition-all cursor-pointer shadow-md flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'border-amber-500 ring-4 ring-amber-400/30'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-xl text-white font-black text-xs ${bk.color}`}>
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-black text-base text-slate-900 dark:text-white">
                        {bk.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{bk.subtitle}</p>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="p-1 rounded-full bg-amber-500 text-slate-950">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  <p className="font-bold text-[11px] text-slate-500 uppercase tracking-wider">
                    Memuat Dokumen:
                  </p>
                  <ul className="space-y-1">
                    {bk.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5 leading-snug">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-slate-500">Kop & Pengesahan KS Siap Cetak</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCover(bk.title);
                    handlePrint();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-amber-100 hover:text-slate-950 font-bold flex items-center gap-1 transition-colors"
                >
                  <Printer className="w-3 h-3" /> Cetak Cover
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
