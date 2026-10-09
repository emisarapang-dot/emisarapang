import React, { useState, useEffect } from 'react';
import { Siswa, SekolahProfile, GuruProfile } from '../../types';
import { dbService } from '../../services/db';
import { CreditCard, Printer, Filter, QrCode, ShieldCheck, Check } from 'lucide-react';
import QRCode from 'qrcode';

interface KartuSiswaViewProps {
  siswaList: Siswa[];
  sekolah: SekolahProfile;
  guru: GuruProfile;
}

export const KartuSiswaView: React.FC<KartuSiswaViewProps> = ({
  siswaList,
  sekolah,
  guru,
}) => {
  const kelasOptions = dbService.getKelasList();
  const [selectedKelas, setSelectedKelas] = useState<string>(kelasOptions[0] || 'Semua');
  const [qrCodeUrls, setQrCodeUrls] = useState<Record<string, string>>({});

  const filteredSiswa = siswaList.filter(
    (s) => selectedKelas === 'Semua' || s.kelas === selectedKelas
  );

  // Generate QR codes for each student
  useEffect(() => {
    const generateQrs = async () => {
      const urls: Record<string, string> = {};
      for (const siswa of filteredSiswa) {
        try {
          const payload = JSON.stringify({
            nisn: siswa.nisn,
            nis: siswa.nis,
            nama: siswa.nama,
            sekolah: sekolah.namaSekolah,
            kelas: siswa.kelas,
            status: 'VERIFIED_STUDENT_ID',
          });
          const dataUrl = await QRCode.toDataURL(payload, {
            width: 140,
            margin: 1,
            color: {
              dark: '#071328',
              light: '#ffffff',
            },
          });
          urls[siswa.id] = dataUrl;
        } catch (e) {
          console.error('QR generate error for', siswa.id, e);
        }
      }
      setQrCodeUrls(urls);
    };

    generateQrs();
  }, [filteredSiswa, sekolah.namaSekolah]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header Halaman (Screen Only) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-md border-2 border-emerald-300 dark:border-emerald-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-600 text-white rounded-xl shadow-md">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Cetak Kartu Tanda Pelajar Siswa (QR Code)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Format Standar ISO Kertas A4 (8 Kartu / Lembar) Siap Cetak & Laminating
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Kelas:</span>
            <select
              value={selectedKelas}
              onChange={(e) => setSelectedKelas(e.target.value)}
              className="px-3 py-2 text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
            >
              <option value="Semua">Semua Kelas ({siswaList.length})</option>
              {kelasOptions.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Cetak Kartu Pelajar (A4)
          </button>
        </div>
      </div>

      {/* Grid Kartu Pelajar (2 Kolom x 4 Baris per A4 Page) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2 print:gap-3">
        {filteredSiswa.map((siswa) => {
          const qrUrl = qrCodeUrls[siswa.id];

          return (
            <div
              key={siswa.id}
              className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-[#071328] to-blue-950 text-white p-4 shadow-xl border-2 border-amber-400/80 overflow-hidden break-inside-avoid print:shadow-none print:border-black"
              style={{ minHeight: '215px' }}
            >
              {/* Background watermark motif */}
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                <img src={sekolah.logo} alt="Watermark" className="w-36 h-36 object-contain" />
              </div>

              {/* Header Kartu */}
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-amber-400/40 print:border-black">
                <img
                  src={sekolah.logo}
                  alt="Logo"
                  className="w-10 h-10 object-contain rounded-lg bg-white p-0.5"
                />
                <div className="flex-1 leading-tight">
                  <p className="text-[9px] uppercase tracking-wider font-bold text-amber-300">
                    KARTU TANDA PELAJAR DIGITAL
                  </p>
                  <h4 className="text-xs font-black uppercase text-white truncate max-w-[240px]">
                    {sekolah.namaSekolah}
                  </h4>
                  <p className="text-[8px] text-blue-200 truncate">
                    NPSN: {sekolah.npsn} • {sekolah.kotaKabupaten}
                  </p>
                </div>
              </div>

              {/* Body Kartu: Foto, Biodata, QR */}
              <div className="flex items-center justify-between gap-3 mt-3">
                {/* Foto Siswa */}
                <div className="w-16 h-20 rounded-xl bg-blue-900/80 border-2 border-amber-400/70 p-1 flex flex-col items-center justify-center text-center shrink-0 shadow-md">
                  <div className="w-full h-full rounded-lg bg-blue-950 flex items-center justify-center text-amber-300 font-black text-xl">
                    {siswa.nama.charAt(0)}
                  </div>
                </div>

                {/* Data Siswa */}
                <div className="flex-1 space-y-1 text-[10px]">
                  <div>
                    <span className="block text-[8px] uppercase tracking-wide text-blue-300 font-bold">
                      Nama Lengkap:
                    </span>
                    <p className="font-extrabold text-xs text-white leading-tight">
                      {siswa.nama}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="block text-[8px] uppercase text-blue-300 font-bold">NISN:</span>
                      <p className="font-mono font-bold text-amber-300">{siswa.nisn}</p>
                    </div>
                    <div>
                      <span className="block text-[8px] uppercase text-blue-300 font-bold">NIS:</span>
                      <p className="font-mono font-bold text-white">{siswa.nis}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="block text-[8px] uppercase text-blue-300 font-bold">Kelas:</span>
                      <p className="font-black text-emerald-300">{siswa.kelas}</p>
                    </div>
                    <div>
                      <span className="block text-[8px] uppercase text-blue-300 font-bold">Jenis Kelamin:</span>
                      <p className="font-bold text-white">{siswa.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
                    </div>
                  </div>
                </div>

                {/* QR Code Unik */}
                <div className="p-1.5 bg-white rounded-xl shrink-0 shadow-md flex flex-col items-center justify-center">
                  {qrUrl ? (
                    <img src={qrUrl} alt="QR Code Siswa" className="w-16 h-16 object-contain" />
                  ) : (
                    <div className="w-16 h-16 bg-slate-200 animate-pulse rounded-lg flex items-center justify-center">
                      <QrCode className="w-6 h-6 text-slate-400" />
                    </div>
                  )}
                  <span className="text-[7px] font-bold text-slate-800 tracking-tighter mt-0.5">
                    SCAN VERIFIED
                  </span>
                </div>
              </div>

              {/* Footer Kartu & TTD KS */}
              <div className="mt-3 pt-2 border-t border-blue-800/80 print:border-black flex items-center justify-between text-[8px] text-blue-200">
                <div>
                  <p className="font-semibold text-slate-300">
                    Berlaku: Selama Menjadi Siswa Aktif
                  </p>
                  <p className="text-[7px] text-slate-400">
                    Alamat: {sekolah.alamat}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white uppercase">Kepala Sekolah</p>
                  <p className="font-bold text-amber-300 underline uppercase mt-3">
                    {sekolah.namaKepalaSekolah}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
