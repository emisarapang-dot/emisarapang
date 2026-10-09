export interface GuruProfile {
  nama: string;
  gelar: string;
  nip: string;
  nuptk: string;
  nik: string;
  noHp: string;
  email: string;
  pangkatGolongan: string;
  mapelUtama: string;
  foto?: string;
}

export interface SekolahProfile {
  namaSekolah: string;
  npsn: string;
  nss: string;
  alamat: string;
  kelurahan: string;
  kecamatan: string;
  kotaKabupaten: string;
  provinsi: string;
  kodePos: string;
  website: string;
  email: string;
  namaKepalaSekolah: string;
  nipKepalaSekolah: string;
  logo: string; // Base64 or URL
  tahunAjaranAktif: string;
  semesterAktif: 'Ganjil' | 'Genap';
}

export interface Siswa {
  id: string;
  nis: string;
  nisn: string;
  nama: string;
  jenisKelamin: 'L' | 'P';
  kelas: string;
  tempatLahir: string;
  tanggalLahir: string;
  alamat: string;
  namaOrtu: string;
  kontakOrtu: string;
  status: 'Aktif' | 'Mutasi' | 'Lulus';
  foto?: string;
}

export interface Mapel {
  id: string;
  kode: string;
  nama: string;
  fase: 'Fase E' | 'Fase F' | 'Fase D' | 'Fase A/B/C';
  tingkatKelas: string;
  jpPerMinggu: number;
  kktpMinimal: number;
  deskripsiCp: string;
  elemen: string[];
}

export interface JadwalPelajaran {
  id: string;
  hari: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu';
  jamKe: string;
  jamMulai: string;
  jamSelesai: string;
  kelas: string;
  mapelId: string;
  ruang: string;
  keterangan?: string;
}

export type StatusPresensi = 'H' | 'S' | 'I' | 'A';

export interface PresensiRecord {
  id: string;
  tanggal: string; // YYYY-MM-DD
  kelas: string;
  siswaId: string;
  status: StatusPresensi;
  catatan?: string;
}

export interface NilaiSiswa {
  id: string;
  siswaId: string;
  kelas: string;
  mapelId: string;
  semester: 'Ganjil' | 'Genap';
  formatif1: number;
  formatif2: number;
  formatif3: number;
  formatif4: number;
  tugasLkpd: number;
  stsMid: number; // Sumatif Tengah Semester
  sasAkhir: number; // Sumatif Akhir Semester
  kktp: number;
  catatanKompetensi?: string;
}

export interface AgendaMengajar {
  id: string;
  tanggal: string;
  kelas: string;
  jamKe: string;
  mapelId: string;
  tujuanPembelajaran: string;
  materiPokok: string;
  kegiatanKbm: string;
  hambatan?: string;
  solusi?: string;
  status: 'Terlaksana' | 'Tertunda' | 'Daring';
}

export interface BimbinganKasus {
  id: string;
  tanggal: string;
  siswaId: string;
  kategori: 'Disiplin' | 'Akademik' | 'Sosial/Pribadi' | 'Prestasi' | 'Karir';
  uraianMasalah: string;
  tindakLanjut: string;
  pihakTerlibat: string;
  status: 'Selesai' | 'Dalam Proses' | 'Rujukan BK';
}

export interface SavedAiDocument {
  id: string;
  type: 'modul' | 'perangkat' | 'kbc' | 'kokurikuler' | 'soal' | 'kartu-soal' | 'lkpd' | 'ppt' | 'media';
  title: string;
  content: string;
  createdAt: string;
  metadata?: Record<string, any>;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export type ActiveTab =
  | 'dashboard'
  | 'siswa'
  | 'mapel'
  | 'jadwal'
  | 'presensi'
  | 'kartu-siswa'
  | 'nilai'
  | 'agenda'
  | 'bimbingan'
  | 'perangkat-unduh'
  | 'ai-modul'
  | 'ai-media'
  | 'ai-perangkat'
  | 'ai-kbc'
  | 'ai-kokurikuler'
  | 'ai-soal'
  | 'ai-kartu-soal'
  | 'ai-lkpd'
  | 'ai-ppt'
  | 'ai-chat'
  | 'laporan'
  | 'pengaturan';
