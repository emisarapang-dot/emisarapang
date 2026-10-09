import {
  GuruProfile,
  SekolahProfile,
  Siswa,
  Mapel,
  JadwalPelajaran,
  PresensiRecord,
  NilaiSiswa,
  AgendaMengajar,
  BimbinganKasus,
  SavedAiDocument,
} from '../types';

const STORAGE_KEY_PREFIX = 'tungguru_emi_';

// Default School Logo SVG Base64 (Kemenristekdikti/Kemendikdasmen-style Garuda/Pendidikan emblem)
export const DEFAULT_LOGO = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><circle cx="100" cy="100" r="95" fill="%230d2240" stroke="%23f59e0b" stroke-width="8"/><circle cx="100" cy="100" r="80" fill="%231e3a8a"/><polygon points="100,25 120,75 175,75 130,110 150,165 100,130 50,165 70,110 25,75 80,75" fill="%23fbbf24"/><circle cx="100" cy="100" r="42" fill="%23ffffff"/><path d="M70,105 Q100,80 130,105 Q100,135 70,105 Z" fill="%230284c7"/><circle cx="100" cy="98" r="10" fill="%23dc2626"/><text x="100" y="155" font-size="12" font-weight="bold" fill="%23fef08a" text-anchor="middle" font-family="sans-serif">TUT WURI HANDAYANI</text></svg>`;

export const initialGuru: GuruProfile = {
  nama: 'Emi Sarapang',
  gelar: 'S.Pd., Gr., M.Pd.',
  nip: '19880512 201101 2 008',
  nuptk: '4563766667200012',
  nik: '7306051205880001',
  noHp: '0812-3456-7890',
  email: 'emisarapang@gmail.com',
  pangkatGolongan: 'Pembina / IV-a',
  mapelUtama: 'Informatika & Pemrograman Web',
};

export const initialSekolah: SekolahProfile = {
  namaSekolah: 'SMA NEGERI 1 MERDEKA BELAJAR',
  npsn: '40302918',
  nss: '301190204001',
  alamat: 'Jl. Pendidikan Karakter No. 45, Kompleks Ki Hajar Dewantara',
  kelurahan: 'Cerdas Bersama',
  kecamatan: 'Kreatif Mandiri',
  kotaKabupaten: 'Kota Pendidikan Nusantara',
  provinsi: 'Provinsi Merdeka Belajar',
  kodePos: '90123',
  website: 'https://sman1merdekabelajar.sch.id',
  email: 'info@sman1merdekabelajar.sch.id',
  namaKepalaSekolah: 'Dr. Hj. Rahmawati, M.Pd.',
  nipKepalaSekolah: '19750815 199903 2 004',
  logo: DEFAULT_LOGO,
  tahunAjaranAktif: '2026/2027',
  semesterAktif: 'Ganjil',
};

export const initialSiswa: Siswa[] = [
  {
    id: 's-101',
    nis: '2026101',
    nisn: '0087654321',
    nama: 'Aditya Pratama Putra',
    jenisKelamin: 'L',
    kelas: 'X RPL 1',
    tempatLahir: 'Jakarta',
    tanggalLahir: '2009-04-12',
    alamat: 'Jl. Merpati Indah No. 12',
    namaOrtu: 'Bambang Pratama',
    kontakOrtu: '081298765431',
    status: 'Aktif',
  },
  {
    id: 's-102',
    nis: '2026102',
    nisn: '0087654322',
    nama: 'Alya Salsabila Putri',
    jenisKelamin: 'P',
    kelas: 'X RPL 1',
    tempatLahir: 'Bandung',
    tanggalLahir: '2009-07-23',
    alamat: 'Jl. Cempaka Putih Blok B4',
    namaOrtu: 'Hendro Gunawan',
    kontakOrtu: '081344556677',
    status: 'Aktif',
  },
  {
    id: 's-103',
    nis: '2026103',
    nisn: '0087654323',
    nama: 'Bagas Dimas Wicaksono',
    jenisKelamin: 'L',
    kelas: 'X RPL 1',
    tempatLahir: 'Surabaya',
    tanggalLahir: '2009-02-18',
    alamat: 'Perumahan Griya Lestari 3',
    namaOrtu: 'Wicaksono Seno',
    kontakOrtu: '082155667788',
    status: 'Aktif',
  },
  {
    id: 's-104',
    nis: '2026104',
    nisn: '0087654324',
    nama: 'Cantika Dewi Maharani',
    jenisKelamin: 'P',
    kelas: 'X RPL 1',
    tempatLahir: 'Makassar',
    tanggalLahir: '2009-09-05',
    alamat: 'Jl. Anggrek Ungu No. 8',
    namaOrtu: 'H. Sudirman',
    kontakOrtu: '085211223344',
    status: 'Aktif',
  },
  {
    id: 's-105',
    nis: '2026105',
    nisn: '0087654325',
    nama: 'Davin Rafif Arkananta',
    jenisKelamin: 'L',
    kelas: 'X RPL 1',
    tempatLahir: 'Semarang',
    tanggalLahir: '2009-11-30',
    alamat: 'Jl. Flamboyan Timur No. 19',
    namaOrtu: 'Ir. Arkananta',
    kontakOrtu: '081199887766',
    status: 'Aktif',
  },
  {
    id: 's-106',
    nis: '2026106',
    nisn: '0087654326',
    nama: 'Fatimah Zahra An-Nisa',
    jenisKelamin: 'P',
    kelas: 'X RPL 2',
    tempatLahir: 'Yogyakarta',
    tanggalLahir: '2009-03-14',
    alamat: 'Jl. Melati Barat No. 22',
    namaOrtu: 'Ahmad Faisal',
    kontakOrtu: '081233445566',
    status: 'Aktif',
  },
  {
    id: 's-107',
    nis: '2026107',
    nisn: '0087654327',
    nama: 'Gilang Ramadhan Kusuma',
    jenisKelamin: 'L',
    kelas: 'X RPL 2',
    tempatLahir: 'Malang',
    tanggalLahir: '2009-10-02',
    alamat: 'Jl. Kenanga Asri No. 5',
    namaOrtu: 'Kusuma Wardhana',
    kontakOrtu: '087811223344',
    status: 'Aktif',
  },
  {
    id: 's-108',
    nis: '2026108',
    nisn: '0087654328',
    nama: 'Hafizha Nayla Azzahra',
    jenisKelamin: 'P',
    kelas: 'XI TKJ 1',
    tempatLahir: 'Medan',
    tanggalLahir: '2008-08-19',
    alamat: 'Jl. Pinus Hijau No. 7',
    namaOrtu: 'M. Syafei',
    kontakOrtu: '081399001122',
    status: 'Aktif',
  },
  {
    id: 's-109',
    nis: '2026109',
    nisn: '0087654329',
    nama: 'Irfan Syahputra',
    jenisKelamin: 'L',
    kelas: 'XI TKJ 1',
    tempatLahir: 'Palembang',
    tanggalLahir: '2008-05-25',
    alamat: 'Jl. Teratai Indah No. 11',
    namaOrtu: 'Syahputra Jaya',
    kontakOrtu: '082233441100',
    status: 'Aktif',
  },
  {
    id: 's-110',
    nis: '2026110',
    nisn: '0087654330',
    nama: 'Jessica Olivia Santoso',
    jenisKelamin: 'P',
    kelas: 'XII DKV',
    tempatLahir: 'Denpasar',
    tanggalLahir: '2007-12-01',
    alamat: 'Jl. Bougenville No. 15',
    namaOrtu: 'Santoso Wijaya',
    kontakOrtu: '081977665544',
    status: 'Aktif',
  },
];

export const initialMapel: Mapel[] = [
  {
    id: 'm-inf-x',
    kode: 'INF-FaseE',
    nama: 'Informatika',
    fase: 'Fase E',
    tingkatKelas: 'Kelas X',
    jpPerMinggu: 3,
    kktpMinimal: 75,
    deskripsiCp:
      'Berdasarkan Salinan SK BSKAP Kemendikdasmen No. 046/H/KR/2025: Peserta didik mampu memahami peran sistem komputasi, jaringan komputer, analisis data, algoritma pemrograman, dampak sosial informatika, dan praktik lintas bidang.',
    elemen: [
      'Berpikir Komputasional (BK)',
      'Teknologi Informasi & Komunikasi (TIK)',
      'Sistem Komputer (SK)',
      'Jaringan Komputer & Internet (JKI)',
      'Analisis Data (AD)',
      'Algoritma & Pemrograman (AP)',
      'Dampak Sosial Informatika (DSI)',
      'Praktik Lintas Bidang (PLB)',
    ],
  },
  {
    id: 'm-inf-xi',
    kode: 'INF-FaseF',
    nama: 'Informatika Tingkat Lanjut',
    fase: 'Fase F',
    tingkatKelas: 'Kelas XI',
    jpPerMinggu: 5,
    kktpMinimal: 78,
    deskripsiCp:
      'Berdasarkan Salinan SK BSKAP Kemendikdasmen No. 046/H/KR/2025: Peserta didik mampu menganalisis abstraksi komputasional, struktur data rumit, pemrograman modular berorientasi objek, kecerdasan buatan, dan arsitektur basis data relasional.',
    elemen: [
      'Berpikir Komputasional Lanjut',
      'Pemrograman Web & Mobile',
      'Basis Data & Analisis Big Data',
      'Kecerdasan Artifisial Dasar',
    ],
  },
  {
    id: 'm-pkwu-x',
    kode: 'PKWU-FaseE',
    nama: 'Prakarya dan Kewirausahaan (Rekayasa)',
    fase: 'Fase E',
    tingkatKelas: 'Kelas X',
    jpPerMinggu: 2,
    kktpMinimal: 75,
    deskripsiCp:
      'Berdasarkan SK BSKAP No. 046/H/KR/2025: Peserta didik mampu merancang, memodifikasi, dan menguji produk rekayasa teknologi terapan berbasis potensi lokal dan digitalisasi modern.',
    elemen: ['Observasi & Eksplorasi', 'Desain/Perencanaan', 'Produksi', 'Refleksi & Evaluasi'],
  },
];

export const initialJadwal: JadwalPelajaran[] = [
  {
    id: 'j-1',
    hari: 'Senin',
    jamKe: '1-3',
    jamMulai: '07:30',
    jamSelesai: '09:45',
    kelas: 'X RPL 1',
    mapelId: 'm-inf-x',
    ruang: 'Lab Komputer 1',
    keterangan: 'Algoritma & Flowchart',
  },
  {
    id: 'j-2',
    hari: 'Senin',
    jamKe: '5-7',
    jamMulai: '10:30',
    jamSelesai: '12:45',
    kelas: 'X RPL 2',
    mapelId: 'm-inf-x',
    ruang: 'Lab Komputer 2',
    keterangan: 'Struktur Data Dasar',
  },
  {
    id: 'j-3',
    hari: 'Selasa',
    jamKe: '1-4',
    jamMulai: '07:30',
    jamSelesai: '10:30',
    kelas: 'XI TKJ 1',
    mapelId: 'm-inf-xi',
    ruang: 'Lab Jaringan',
    keterangan: 'Fullstack Web App React & Express',
  },
  {
    id: 'j-4',
    hari: 'Rabu',
    jamKe: '2-4',
    jamMulai: '08:15',
    jamSelesai: '10:30',
    kelas: 'XII DKV',
    mapelId: 'm-pkwu-x',
    ruang: 'Studio DKV',
    keterangan: 'UI/UX Design Thinking',
  },
  {
    id: 'j-5',
    hari: 'Kamis',
    jamKe: '1-3',
    jamMulai: '07:30',
    jamSelesai: '09:45',
    kelas: 'X RPL 1',
    mapelId: 'm-pkwu-x',
    ruang: 'Lab Multimedia',
    keterangan: 'Prototyping Produk Digital',
  },
];

export const initialPresensi: PresensiRecord[] = [
  { id: 'p-1', tanggal: '2026-10-05', kelas: 'X RPL 1', siswaId: 's-101', status: 'H', catatan: 'Aktif diskusi' },
  { id: 'p-2', tanggal: '2026-10-05', kelas: 'X RPL 1', siswaId: 's-102', status: 'H', catatan: '' },
  { id: 'p-3', tanggal: '2026-10-05', kelas: 'X RPL 1', siswaId: 's-103', status: 'I', catatan: 'Surat dinas lomba' },
  { id: 'p-4', tanggal: '2026-10-05', kelas: 'X RPL 1', siswaId: 's-104', status: 'H', catatan: '' },
  { id: 'p-5', tanggal: '2026-10-05', kelas: 'X RPL 1', siswaId: 's-105', status: 'H', catatan: '' },
  { id: 'p-6', tanggal: '2026-10-06', kelas: 'X RPL 1', siswaId: 's-101', status: 'H', catatan: '' },
  { id: 'p-7', tanggal: '2026-10-06', kelas: 'X RPL 1', siswaId: 's-102', status: 'H', catatan: '' },
  { id: 'p-8', tanggal: '2026-10-06', kelas: 'X RPL 1', siswaId: 's-103', status: 'H', catatan: '' },
  { id: 'p-9', tanggal: '2026-10-06', kelas: 'X RPL 1', siswaId: 's-104', status: 'S', catatan: 'Demam, surat dokter' },
  { id: 'p-10', tanggal: '2026-10-06', kelas: 'X RPL 1', siswaId: 's-105', status: 'H', catatan: '' },
];

export const initialNilai: NilaiSiswa[] = [
  {
    id: 'n-1',
    siswaId: 's-101',
    kelas: 'X RPL 1',
    mapelId: 'm-inf-x',
    semester: 'Ganjil',
    formatif1: 88,
    formatif2: 90,
    formatif3: 85,
    formatif4: 92,
    tugasLkpd: 90,
    stsMid: 88,
    sasAkhir: 91,
    kktp: 75,
    catatanKompetensi: 'Sangat mahir dalam menganalisis algoritma dan logika pemrograman terstruktur.',
  },
  {
    id: 'n-2',
    siswaId: 's-102',
    kelas: 'X RPL 1',
    mapelId: 'm-inf-x',
    semester: 'Ganjil',
    formatif1: 85,
    formatif2: 84,
    formatif3: 88,
    formatif4: 86,
    tugasLkpd: 87,
    stsMid: 84,
    sasAkhir: 88,
    kktp: 75,
    catatanKompetensi: 'Mampu menyusun dokumentasi pemrograman dan bekerja sama secara solutif dalam kelompok.',
  },
  {
    id: 'n-3',
    siswaId: 's-103',
    kelas: 'X RPL 1',
    mapelId: 'm-inf-x',
    semester: 'Ganjil',
    formatif1: 80,
    formatif2: 78,
    formatif3: 82,
    formatif4: 85,
    tugasLkpd: 83,
    stsMid: 80,
    sasAkhir: 82,
    kktp: 75,
    catatanKompetensi: 'Menguasai konsep dasar berpikir komputasional, perlu penguatan pada modul perulangan (looping).',
  },
  {
    id: 'n-4',
    siswaId: 's-104',
    kelas: 'X RPL 1',
    mapelId: 'm-inf-x',
    semester: 'Ganjil',
    formatif1: 92,
    formatif2: 94,
    formatif3: 90,
    formatif4: 95,
    tugasLkpd: 93,
    stsMid: 92,
    sasAkhir: 96,
    kktp: 75,
    catatanKompetensi: 'Istimewa dalam pemecahan kasus analitis dan penyusunan produk perangkat lunak.',
  },
  {
    id: 'n-5',
    siswaId: 's-105',
    kelas: 'X RPL 1',
    mapelId: 'm-inf-x',
    semester: 'Ganjil',
    formatif1: 78,
    formatif2: 80,
    formatif3: 82,
    formatif4: 79,
    tugasLkpd: 81,
    stsMid: 79,
    sasAkhir: 83,
    kktp: 75,
    catatanKompetensi: 'Mencapai kriteria ketuntasan dengan baik pada elemen sistem komputer dan internet.',
  },
];

export const initialAgenda: AgendaMengajar[] = [
  {
    id: 'ag-1',
    tanggal: '2026-10-05',
    kelas: 'X RPL 1',
    jamKe: '1-3',
    mapelId: 'm-inf-x',
    tujuanPembelajaran: 'Peserta didik mampu merancang flowchart algoritma percabangan kondisi dengan benar.',
    materiPokok: 'Algoritma Pemrograman - Kondisional If-Else',
    kegiatanKbm: 'Pendahuluan apersepsi studi kasus ATM, Eksplorasi kelompok merancang diagram alir di kertas plano, Presentasi mini.',
    hambatan: 'Sebagian siswa masih bingung membedakan simbol belah ketupat (keputusan) dan jajargenjang (input/output).',
    solusi: 'Memberikan analogi kartu permainan warna dan demonstrasi langsung di proyektor.',
    status: 'Terlaksana',
  },
  {
    id: 'ag-2',
    tanggal: '2026-10-06',
    kelas: 'XI TKJ 1',
    jamKe: '1-4',
    mapelId: 'm-inf-xi',
    tujuanPembelajaran: 'Peserta didik mampu mengkonfigurasi REST API Express dan mengkoneksikan ke antarmuka React.',
    materiPokok: 'Pengembangan Aplikasi Web Modern Full-Stack',
    kegiatanKbm: 'Live coding pembuatan endpoint GET/POST, pengujian via Postman, integrasi state frontend.',
    hambatan: 'CORS error sempat terjadi di 3 komputer lab.',
    solusi: 'Pengaturan middleware cors() di backend secara bersamaan.',
    status: 'Terlaksana',
  },
];

export const initialBimbingan: BimbinganKasus[] = [
  {
    id: 'bk-1',
    tanggal: '2026-10-02',
    siswaId: 's-103',
    kategori: 'Akademik',
    uraianMasalah: 'Siswa mengalami penurunan konsentrasi belajar karena begadang berlatih game kompetitif.',
    tindakLanjut: 'Konseling empatik mindful learning, pembuatan jadwal manajemen waktu, koordinasi suportif dengan orang tua.',
    pihakTerlibat: 'Wali Kelas, Guru BK, Orang Tua Siswa',
    status: 'Selesai',
  },
  {
    id: 'bk-2',
    tanggal: '2026-10-04',
    siswaId: 's-104',
    kategori: 'Prestasi',
    uraianMasalah: 'Persiapan pembinaan intensif Lomba Debat Ilmiah & Olimpiade Sains Komputer tingkat Provinsi.',
    tindakLanjut: 'Pemberian materi pengayaan mandiri, mentoring mingguan, dispensasi tugas terjadwal.',
    pihakTerlibat: 'Guru Pembina Olimpiade, Kepala Sekolah',
    status: 'Dalam Proses',
  },
];

export const initialAiDocs: SavedAiDocument[] = [
  {
    id: 'doc-seed-1',
    type: 'modul',
    title: 'Modul Ajar Deep Learning: Berpikir Komputasional & Algoritma Percabangan (Fase E)',
    content: `# MODUL AJAR KURIKULUM MERDEKA DEEP LEARNING (MIND-FULL, MEANINGFUL, JOYFUL)
**Mata Pelajaran:** Informatika  
**Fase / Kelas:** Fase E / Kelas X  
**Alokasi Waktu:** 3 JP (3 x 45 Menit)  
**Landasan Regulasi:** Salinan Keputusan Kepala BSKAP Kemendikdasmen No. 046/H/KR/2025

---

### BAGIAN 1: IDENTITAS MODUL & PROFIL PEMBELAJAR
1. **Penyusun:** Emi Sarapang, S.Pd., Gr.
2. **Satuan Pendidikan:** SMA NEGERI 1 MERDEKA BELAJAR
3. **Dimensi Profil Pelajar:**
   - Beriman, Bertakwa kepada Tuhan YME, dan Berakhlak Mulia
   - Bernalar Kritis (mampu menganalisis efisiensi solusi logika)
   - Kreatif & Gotong Royong (merancang algoritma kolaboratif)
4. **Sarana & Prasarana:** Lab Komputer, Smart Board, LKPD Eksploratif, Sticky Notes Warna

---

### BAGIAN 2: DESAIN PEMBELAJARAN MENDALAM (DEEP LEARNING)
1. **Tujuan Pembelajaran (Berbasis SK BSKAP 046/H/KR/2025):**
   - Peserta didik mampu menganalisis permasalahan kontekstual kehidupan sehari-hari ke dalam abstraksi logika komputasional.
   - Peserta didik mampu merancang struktur algoritma percabangan (Branching Logic) yang efisien, runut, dan dapat diimplementasikan ke dalam program komputer.
2. **Pemahaman Bermakna (Meaningful Learning):**
   Setiap pilihan dalam hidup memiliki konsekuensi bersyarat; komputasi membantu manusia memodelkan keputusan kritis secara adil, akurat, dan tanpa bias.
3. **Pertanyaan Pemantik (Mindful Questioning):**
   "Bagaimana sebuah lampu lalu lintas pintar atau aplikasi navigasi di ponselmu tahu kapan harus menyuruhmu berhenti atau mengambil rute alternatif?"

---

### BAGIAN 3: LANGKAH KEGIATAN PEMBELAJARAN
#### A. Kegiatan Pendahuluan (15 Menit) - *Mindful & Welcoming Atmosphere*
- Pembukaan dengan doa bersama penuh kehangatan (Pendekatan KBC - Kasih Sayang).
- Ice-breaking interaktif "Lampu Hijau Merah Logika": Murid bergerak sesuai instruksi bersyarat lucu untuk menstimulasi fokus emosional dan fisik.
- Guru menyampaikan tujuan dan manfaat nyata materi bagi masa depan anak.

#### B. Kegiatan Inti (105 Menit) - *Deep Exploration (Mindful, Meaningful, Joyful)*
1. **Tahap 1: Memahami Masalah Nyata (Meaningful)**
   Siswa disajikan studi kasus nyata mesin seleksi tiket konser atau penentuan kelulusan beasiswa bersyarat.
2. **Tahap 2: Eksplorasi Konsep & Diskusi Kolaboratif (Joyful)**
   Bekerja dalam kelompok heterogen menggunakan media visual kartu warna untuk menyusun diagram alir (Flowchart) percabangan bersarang (*nested if*).
3. **Tahap 3: Implementasi Koding Interaktif (Deep Mastery)**
   Menguji alur logika menggunakan simulator kode interaktif. Guru berkeliling memberikan pendampingan diferensiasi bagi kelompok yang membutuhkan scaffolding.

#### C. Kegiatan Penutup (15 Menit) - *Joyful Reflection & Self-Check*
- Murid menempelkan stiker refleksi "Satu hal paling berharga yang saya pahami hari ini".
- Penguatan materi oleh guru dan apresiasi tepuk tangan kebersamaan.
- Doa penutup dan salam persahabatan.

---

### BAGIAN 4: ASESMEN & KRITERIA KETERCAPAIAN (KKTP)
- **Asesmen Formatif:** Observasi keaktifan diskusi, LKPD Analisis Logika, kuis cepat 3 soal.
- **KKTP:**
  * Interval 0 - 69: Perlu Bimbingan (remedial konsep dasar percabangan tunggal).
  * Interval 70 - 84: Mencapai Ketuntasan (mampu menyusun algoritma if-else standar).
  * Interval 85 - 100: Mahir/Istimewa (mampu merancang percabangan multi-kondisi kompleks).`,
    createdAt: new Date().toISOString(),
  },
];

// Helper to access LocalStorage safely
class DatabaseService {
  private listeners: (() => void)[] = [];

  constructor() {
    this.ensureInitialized();
  }

  private getItem<T>(key: string, defaultValue: T): T {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PREFIX + key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(value));
      this.notifyListeners();
    } catch (e) {
      console.error('Storage write error:', e);
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((l) => l());
  }

  public ensureInitialized(): void {
    if (!localStorage.getItem(STORAGE_KEY_PREFIX + 'initialized')) {
      // Check if there was old data to migrate
      const oldGuruStr = localStorage.getItem('tongguru_yusak_guru');
      if (oldGuruStr) {
        try {
          const oldGuru = JSON.parse(oldGuruStr);
          oldGuru.nama = 'Emi Sarapang';
          oldGuru.email = 'emisarapang@gmail.com';
          this.resetToDefaults();
          this.saveGuru(oldGuru);
          return;
        } catch {
          // fallback to defaults
        }
      }
      this.resetToDefaults();
    }
  }

  public resetToDefaults(): void {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'guru', JSON.stringify(initialGuru));
    localStorage.setItem(STORAGE_KEY_PREFIX + 'sekolah', JSON.stringify(initialSekolah));
    localStorage.setItem(STORAGE_KEY_PREFIX + 'siswa', JSON.stringify(initialSiswa));
    localStorage.setItem(STORAGE_KEY_PREFIX + 'mapel', JSON.stringify(initialMapel));
    localStorage.setItem(STORAGE_KEY_PREFIX + 'jadwal', JSON.stringify(initialJadwal));
    localStorage.setItem(STORAGE_KEY_PREFIX + 'presensi', JSON.stringify(initialPresensi));
    localStorage.setItem(STORAGE_KEY_PREFIX + 'nilai', JSON.stringify(initialNilai));
    localStorage.setItem(STORAGE_KEY_PREFIX + 'agenda', JSON.stringify(initialAgenda));
    localStorage.setItem(STORAGE_KEY_PREFIX + 'bimbingan', JSON.stringify(initialBimbingan));
    localStorage.setItem(STORAGE_KEY_PREFIX + 'aiDocs', JSON.stringify(initialAiDocs));
    localStorage.setItem(STORAGE_KEY_PREFIX + 'initialized', 'true');
    this.notifyListeners();
  }

  // Getters
  public getGuru(): GuruProfile {
    return this.getItem('guru', initialGuru);
  }
  public getSekolah(): SekolahProfile {
    return this.getItem('sekolah', initialSekolah);
  }
  public getSiswa(): Siswa[] {
    return this.getItem('siswa', initialSiswa);
  }
  public getMapel(): Mapel[] {
    return this.getItem('mapel', initialMapel);
  }
  public getJadwal(): JadwalPelajaran[] {
    return this.getItem('jadwal', initialJadwal);
  }
  public getPresensi(): PresensiRecord[] {
    return this.getItem('presensi', initialPresensi);
  }
  public getNilai(): NilaiSiswa[] {
    return this.getItem('nilai', initialNilai);
  }
  public getAgenda(): AgendaMengajar[] {
    return this.getItem('agenda', initialAgenda);
  }
  public getBimbingan(): BimbinganKasus[] {
    return this.getItem('bimbingan', initialBimbingan);
  }
  public getAiDocs(): SavedAiDocument[] {
    return this.getItem('aiDocs', initialAiDocs);
  }

  // Setters
  public saveGuru(data: GuruProfile): void {
    this.setItem('guru', data);
  }
  public saveSekolah(data: SekolahProfile): void {
    this.setItem('sekolah', data);
  }
  public saveSiswa(data: Siswa[]): void {
    this.setItem('siswa', data);
  }
  public saveMapel(data: Mapel[]): void {
    this.setItem('mapel', data);
  }
  public saveJadwal(data: JadwalPelajaran[]): void {
    this.setItem('jadwal', data);
  }
  public savePresensi(data: PresensiRecord[]): void {
    this.setItem('presensi', data);
  }
  public saveNilai(data: NilaiSiswa[]): void {
    this.setItem('nilai', data);
  }
  public saveAgenda(data: AgendaMengajar[]): void {
    this.setItem('agenda', data);
  }
  public saveBimbingan(data: BimbinganKasus[]): void {
    this.setItem('bimbingan', data);
  }
  public saveAiDocs(data: SavedAiDocument[]): void {
    this.setItem('aiDocs', data);
  }

  public addAiDoc(doc: Omit<SavedAiDocument, 'id' | 'createdAt'>): SavedAiDocument {
    const docs = this.getAiDocs();
    const newDoc: SavedAiDocument = {
      ...doc,
      id: 'doc-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    this.saveAiDocs([newDoc, ...docs]);
    return newDoc;
  }

  public deleteAiDoc(id: string): void {
    const docs = this.getAiDocs();
    this.saveAiDocs(docs.filter((d) => d.id !== id));
  }

  // Extract list of all unique class names dynamically
  public getKelasList(): string[] {
    const siswa = this.getSiswa();
    const fromSiswa = siswa.map((s) => s.kelas.trim()).filter(Boolean);
    const defaults = ['X RPL 1', 'X RPL 2', 'XI TKJ 1', 'XII DKV', 'X-A', 'X-B', 'XI-1', 'XII-1'];
    return Array.from(new Set([...fromSiswa, ...defaults])).sort();
  }

  // Backup & Restore
  public exportBackupJson(): string {
    const backup = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      guru: this.getGuru(),
      sekolah: this.getSekolah(),
      siswa: this.getSiswa(),
      mapel: this.getMapel(),
      jadwal: this.getJadwal(),
      presensi: this.getPresensi(),
      nilai: this.getNilai(),
      agenda: this.getAgenda(),
      bimbingan: this.getBimbingan(),
      aiDocs: this.getAiDocs(),
    };
    return JSON.stringify(backup, null, 2);
  }

  public importBackupJson(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (data.guru) this.saveGuru(data.guru);
      if (data.sekolah) this.saveSekolah(data.sekolah);
      if (data.siswa) this.saveSiswa(data.siswa);
      if (data.mapel) this.saveMapel(data.mapel);
      if (data.jadwal) this.saveJadwal(data.jadwal);
      if (data.presensi) this.savePresensi(data.presensi);
      if (data.nilai) this.saveNilai(data.nilai);
      if (data.agenda) this.saveAgenda(data.agenda);
      if (data.bimbingan) this.saveBimbingan(data.bimbingan);
      if (data.aiDocs) this.saveAiDocs(data.aiDocs);
      return true;
    } catch (e) {
      console.error('Failed to import backup:', e);
      return false;
    }
  }
}

export const dbService = new DatabaseService();
