import React from 'react';
import { SekolahProfile, GuruProfile } from '../../types';

interface OfficialLetterheadProps {
  sekolah: SekolahProfile;
  guru: GuruProfile;
  documentTitle: string;
  documentSubtitle?: string;
  nomorSurat?: string;
  showSignature?: boolean;
  tanggalDokumen?: string;
}

export const OfficialLetterhead: React.FC<OfficialLetterheadProps> = ({
  sekolah,
  guru,
  documentTitle,
  documentSubtitle,
  nomorSurat,
  showSignature = true,
  tanggalDokumen,
}) => {
  const tglFormatted =
    tanggalDokumen ||
    new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date());

  return (
    <div className="w-full text-slate-900 bg-white print:p-0">
      {/* KOP SURAT RESMI */}
      <div className="flex items-center gap-4 pb-3 border-b-[3px] border-black">
        <div className="w-20 h-20 shrink-0 flex items-center justify-center">
          <img
            src={sekolah.logo}
            alt="Logo Sekolah"
            className="w-18 h-18 object-contain"
          />
        </div>
        <div className="flex-1 text-center">
          <p className="text-xs uppercase tracking-widest font-bold text-slate-700">
            PEMERINTAH PROVINSI {sekolah.provinsi.toUpperCase()}
          </p>
          <p className="text-xs uppercase tracking-wider font-semibold text-slate-700">
            DINAS PENDIDIKAN DAN KEBUDAYAAN
          </p>
          <h1 className="text-lg font-black tracking-wide text-slate-950 uppercase leading-tight">
            {sekolah.namaSekolah}
          </h1>
          <p className="text-[11px] text-slate-700 leading-snug">
            {sekolah.alamat}, Kel. {sekolah.kelurahan}, Kec. {sekolah.kecamatan}, {sekolah.kotaKabupaten} {sekolah.kodePos}
          </p>
          <p className="text-[10px] text-slate-600 font-medium">
            NPSN: {sekolah.npsn} | NSS: {sekolah.nss} | Email: {sekolah.email} | Laman: {sekolah.website}
          </p>
        </div>
        <div className="w-16 shrink-0" />
      </div>
      {/* Garis Ganda Kop */}
      <div className="border-b border-black mt-[1.5px] mb-4"></div>

      {/* JUDUL DOKUMEN */}
      <div className="text-center my-4 space-y-1">
        <h2 className="text-base font-extrabold uppercase underline tracking-wide">
          {documentTitle}
        </h2>
        {nomorSurat && (
          <p className="text-xs font-medium text-slate-700">Nomor: {nomorSurat}</p>
        )}
        <p className="text-[11px] font-semibold text-slate-600 italic">
          {documentSubtitle ||
            'Berlandaskan Salinan Keputusan Kepala BSKAP Kemendikdasmen Nomor 046/H/KR/2025'}
        </p>
      </div>

      {/* Note: the signatures are rendered at the bottom of official prints */}
    </div>
  );
};

export const OfficialSignatureFooter: React.FC<{
  sekolah: SekolahProfile;
  guru: GuruProfile;
  tanggal?: string;
}> = ({ sekolah, guru, tanggal }) => {
  const tglFormatted =
    tanggal ||
    new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date());

  return (
    <div className="mt-10 pt-4 border-t border-slate-300 print:border-black text-xs text-slate-900 break-inside-avoid">
      <div className="flex justify-between items-start px-8">
        {/* Kolom Kiri: Kepala Sekolah */}
        <div className="text-center min-w-[200px]">
          <p className="font-medium">Mengetahui,</p>
          <p className="font-bold">Kepala {sekolah.namaSekolah}</p>
          <div className="h-20 flex items-center justify-center">
            {/* Signature Area */}
          </div>
          <p className="font-bold underline uppercase">{sekolah.namaKepalaSekolah}</p>
          <p className="text-[11px]">NIP. {sekolah.nipKepalaSekolah}</p>
        </div>

        {/* Kolom Kanan: Guru Mata Pelajaran */}
        <div className="text-center min-w-[200px]">
          <p className="font-medium">
            {sekolah.kotaKabupaten}, {tglFormatted}
          </p>
          <p className="font-bold">Guru Mata Pelajaran</p>
          <div className="h-20 flex items-center justify-center">
            {/* Signature Area */}
          </div>
          <p className="font-bold underline uppercase">
            {guru.nama}{guru.gelar ? `, ${guru.gelar}` : ''}
          </p>
          <p className="text-[11px]">NIP. {guru.nip}</p>
        </div>
      </div>
    </div>
  );
};
