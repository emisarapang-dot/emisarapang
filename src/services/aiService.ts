import { ChatMessage } from '../types';

export interface AiGenerateResponse {
  result: string;
  error?: string;
}

export async function requestAiGeneration(
  prompt: string,
  systemInstruction?: string,
  type?: string
): Promise<string> {
  try {
    const res = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, systemInstruction, type }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Server responded with status ${res.status}`);
    }

    const data: AiGenerateResponse = await res.json();
    return data.result;
  } catch (error: any) {
    console.error('requestAiGeneration error:', error);
    throw error;
  }
}

export async function sendChatMessage(
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  contextInfo?: Record<string, any>
): Promise<string> {
  try {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages, contextInfo }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Server responded with status ${res.status}`);
    }

    const data = await res.json();
    return data.reply;
  } catch (error: any) {
    console.error('sendChatMessage error:', error);
    throw error;
  }
}

// Prompt builders with strict adherence to SK BSKAP 046/H/KR/2025 and Deep Learning
export const promptBuilders = {
  modulAjar: (params: {
    mapel: string;
    fase: string;
    kelas: string;
    alokasiWaktu: string;
    topik: string;
    elemenCp: string;
    modelPembelajaran: string;
    profilPelajar: string[];
    catatanTambahan?: string;
  }) => {
    return `Susunlah sebuah Rencana Pembelajaran Mendalam / Modul Ajar Kurikulum Merdeka yang sangat komprehensif, inspiratif, dan siap terapkan di kelas.

LANDASAN HUKUM UTAMA & RUJUKAN WAJIB:
"SALINAN KEPUTUSAN KEPALA BADAN STANDAR, KURIKULUM, DAN ASESMEN PENDIDIKAN KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH (BSKAP KEMENDIKDASMEN) NOMOR 046/H/KR/2025 TENTANG CAPAIAN PEMBELAJARAN PADA PAUD, PENDIDIKAN DASAR, DAN PENDIDIKAN MENENGAH".

PARAMETER PERANGKAT:
- Mata Pelajaran: ${params.mapel}
- Fase: ${params.fase}
- Tingkat Kelas: ${params.kelas}
- Alokasi Waktu: ${params.alokasiWaktu}
- Elemen Capaian Pembelajaran (CP): ${params.elemenCp}
- Topik / Materi Pembelajaran: ${params.topik}
- Model Pembelajaran: ${params.modelPembelajaran}
- Dimensi Profil Pelajar: ${params.profilPelajar.join(', ')}
${params.catatanTambahan ? `- Catatan Khusus Guru: ${params.catatanTambahan}` : ''}

FRAMEWORK WAJIB: PEMBELAJARAN MENDALAM (DEEP LEARNING)
1. Mindful Learning (Siswa sadar, hadir seutuhnya, fokus, dan terlibat secara emosional dan kognitif).
2. Meaningful Learning (Pembelajaran bermakna, kontekstual dengan dunia nyata peserta didik, tidak sekadar hafalan teoritis).
3. Joyful Learning (Suasana belajar yang menyenangkan, menantang secara positif, bebas dari rasa takut/tekanan berlebih).

STRUKTUR MODUL RESMI YANG HARUS DIHASILKAN (Gunakan format Markdown yang sangat rapi):
BAGIAN 1: IDENTITAS MODUL & PROFIL PEMBELAJAR
BAGIAN 2: DESAIN PEMBELAJARAN MENDALAM (Tujuan Pembelajaran berbasis SK BSKAP 046/H/KR/2025, Pertanyaan Pemantik, Pemahaman Bermakna)
BAGIAN 3: LANGKAH KEGIATAN PEMBELAJARAN (Pendahuluan Mindful, Inti Meaningful & Joyful sesuai sintaks ${params.modelPembelajaran}, Penutup Reflektif)
BAGIAN 4: ASESMEN & KRITERIA KETERCAPAIAN (Asesmen Diagnostik, Formatif, Sumatif, serta Rubrik Interval KKTP deskriptif)`;
  },

  mediaPembelajaran: (params: {
    mapel: string;
    topik: string;
    fase: string;
    jenisMedia: string;
    targetSiswa: string;
  }) => {
    return `Rancanglah sebuah konsep & panduan Media Pembelajaran Interaktif Kreatif untuk Kurikulum Merdeka (Rujukan SK BSKAP 046/H/KR/2025).

- Mata Pelajaran: ${params.mapel}
- Topik / Materi: ${params.topik}
- Fase / Kelas: ${params.fase}
- Jenis Media yang Diinginkan: ${params.jenisMedia}
- Karakteristik / Target Siswa: ${params.targetSiswa}

Berikan:
1. Deskripsi & Filosofi Media (Keterkaitan dengan Pembelajaran Mendalam / Joyful Learning).
2. Alat, Bahan, atau Platform Digital yang Dibutuhkan (akses mudah dan ramah guru).
3. Rancangan Desain / Alur Interaksi Langkah-demi-Langkah (Storyline / Wireframe / Skenario Game).
4. Lembar Panduan Guru dalam Mengoperasikan Media di Kelas.
5. Pertanyaan Pemantik Interaktif & Lembar Umpan Balik Siswa.`;
  },

  perangkatLengkap: (params: {
    mapel: string;
    fase: string;
    kelas: string;
    elemen: string;
    dokumenTarget: 'CP_TP_ATP' | 'PROTA_PROSEM' | 'KKTP';
  }) => {
    return `Susunlah dokumen administrasi guru resmi Kurikulum Merdeka: ${params.dokumenTarget}.
LANDASAN RUJUKAN RESMI: SALINAN KEPUTUSAN KEPALA BSKAP KEMENDIKDASMEN NOMOR 046/H/KR/2025.

Mata Pelajaran: ${params.mapel}
Fase: ${params.fase}
Kelas: ${params.kelas}
Lingkup Elemen: ${params.elemen}

Format keluaran harus menyertakan:
1. Kop judul resmi dokumen berlandaskan SK BSKAP 046/H/KR/2025.
2. Matriks tabel terstruktur rapi (Gunakan Markdown Table).
3. Rumusan Tujuan Pembelajaran (TP) yang operasional (memuat Kompetensi dan Lingkup Materi).
4. Alur Tujuan Pembelajaran (ATP) dengan alokasi JP per semester.
5. Kriteria Ketuntasan (KKTP) deskriptif dengan interval predikat (Perlu Bimbingan, Cukup, Baik, Sangat Baik).
6. Format Titimangsa tempat tanggal dan kolom tanda tangan Kepala Sekolah & Guru Mata Pelajaran.`;
  },

  kbc: (params: {
    mapel: string;
    fase: string;
    topik: string;
    aspekKasihSayang: string;
  }) => {
    return `Susunlah Rancangan Pembelajaran Berbasis Kasih Sayang / Kurikulum Berbasis Cinta (KBC) untuk memupuk empati, koneksi emosional, dan kesehatan mental positif peserta didik di kelas.
Landasan Capaian Pembelajaran: SK BSKAP Kemendikdasmen No. 046/H/KR/2025.

Mata Pelajaran: ${params.mapel}
Fase / Kelas: ${params.fase}
Topik Pembelajaran: ${params.topik}
Fokus Aspek KBC: ${params.aspekKasihSayang}

Struktur Dokumen:
1. Filosofi & Nilai Kasih Sayang dalam Topik Ini.
2. Ikatan Guru-Siswa (Emotional Connection & Active Listening).
3. Skenario Aktivitas Kasih Sayang di Awal, Inti, dan Akhir KBM (Mindful Heart-to-Heart).
4. Kata-Kata Afirmasi Positif Guru kepada Siswa (Bahasa Penuh Penghargaan).
5. Lembar Refleksi Emosional Siswa (Jurnal Suasana Hati & Rasa Syukur).`;
  },

  kokurikuler7Kebiasaan: (params: {
    kebiasaanFokus: string[];
    durasiMingguan: string;
    sasaranFase: string;
    bentukKegiatan: string;
  }) => {
    return `Rancanglah Panduan Modul Kokurikuler Penguatan Karakter "7 KEBIASAAN ANAK INDONESIA HEBAT":
Fokus Kebiasaan: ${params.kebiasaanFokus.join(', ')}
(1. Bangun Pagi, 2. Beribadah, 3. Berolahraga, 4. Gemar Membaca, 5. Makan Sehat & Bergizi, 6. Bermasyarakat/Gotong Royong, 7. Tidur Cepat/Tepat Waktu).

Sasaran Fase: ${params.sasaranFase}
Durasi: ${params.durasiMingguan}
Bentuk Kegiatan: ${params.bentukKegiatan}

Hasilkan:
1. Latar Belakang & Tujuan Penguatan Karakter.
2. Jadwal dan Skenario Pelaksanaan Harian/Mingguan (Pembiasaan di Sekolah & Rumah).
3. Kolaborasi dengan Orang Tua (Jurnal Pembiasaan Terintegrasi).
4. Instrumen / Lembar Observasi Harian Siswa (Tabel Checklist & Catatan Kualitatif).
5. Sistem Apresiasi Positif / Bintang Karakter Hebat.`;
  },

  soalHots: (params: {
    mapel: string;
    fase: string;
    materi: string;
    jumlahSoal: number;
    bentukSoal: string;
    tingkatKesulitan: string;
  }) => {
    return `Buatkan Paket Naskah Soal Ujian Asesmen Sumatif Standar HOTS (Higher Order Thinking Skills) Kurikulum Merdeka.
Rujukan Elemen CP: SALINAN KEPUTUSAN KEPALA BSKAP KEMENDIKDASMEN NOMOR 046/H/KR/2025.

Spesifikasi:
- Mata Pelajaran: ${params.mapel}
- Fase: ${params.fase}
- Lingkup Materi: ${params.materi}
- Jumlah Butir Soal: ${params.jumlahSoal} butir
- Bentuk Soal: ${params.bentukSoal} (PG, PG Kompleks, Isian, Uraian Analitis)
- Tingkat Kognitif: ${params.tingkatKesulitan} (Level Kognitif C4-Menganalisis, C5-Mengevaluasi, C6-Mencipta)

Output Wajib:
1. Petunjuk Umum Pengerjaan Ujian.
2. Naskah Butir Soal bernomor lengkap dengan Stimulus Nyata (infografis teks, studi kasus, narasi fenomena).
3. Kunci Jawaban Lengkap & Pembahasan Analitis Mendalam.
4. Format Lembar Jawaban Siswa (LJS) siap cetak.`;
  },

  kartuSoal: (params: {
    mapel: string;
    fase: string;
    materi: string;
    jumlahKartu: number;
  }) => {
    return `Susunlah Format Tabel KISI-KISI SOAL UJIAN dan KARTU SOAL RESMI Kurikulum Merdeka berlandaskan SK BSKAP KEMENDIKDASMEN NOMOR 046/H/KR/2025.

Mata Pelajaran: ${params.mapel}
Fase: ${params.fase}
Materi Pokok: ${params.materi}
Jumlah: ${params.jumlahKartu} butir kartu soal

Sajikan:
1. Tabel Kisi-Kisi Soal (No, Capaian Pembelajaran SK 046/2025, Lingkup Materi, Indikator Soal, Level Kognitif L1/L2/L3, Bentuk Soal, No Soal).
2. Format Kartu Soal Lengkap per nomor butir:
   - Identitas Satuan Pendidikan & Guru
   - Kompetensi yang diuji (CP)
   - Stimulus Wacana
   - Butir Pertanyaan & Pilihan Jawaban
   - Kunci Jawaban & Pedoman Penskoran (Rubrik Skor).`;
  },

  lkpd: (params: {
    mapel: string;
    fase: string;
    judulLkpd: string;
    tujuanPembelajaran: string;
    tipeAktivitas: string;
  }) => {
    return `Buatkan Lembar Kerja Peserta Didik (LKPD) Kurikulum Merdeka berbasis Deep Learning (Mindful, Meaningful, Joyful).
Rujukan: SALINAN KEPUTUSAN KEPALA BSKAP KEMENDIKDASMEN NOMOR 046/H/KR/2025.

Mata Pelajaran: ${params.mapel}
Fase: ${params.fase}
Judul LKPD: ${params.judulLkpd}
Tujuan Pembelajaran: ${params.tujuanPembelajaran}
Tipe Aktivitas: ${params.tipeAktivitas} (Individu / Kolaborasi Kelompok)

Format LKPD Siap Pakai:
1. Lembar Identitas Siswa / Kelompok (Nama, Kelas, Tanggal).
2. Petunjuk Pengerjaan & Waktu.
3. Stimulus Bermakna (Wacana / Studi Kasus Kontekstual Nyata).
4. Lembar Eksplorasi & Tahapan Kerja Saintifik / Komputasional.
5. Pertanyaan Analisis & Pemecahan Masalah Kritis.
6. Lembar Kesimpulan Kelompok.
7. Refleksi Diri Joyful Learning.`;
  },

  ppt: (params: {
    mapel: string;
    fase: string;
    topik: string;
    jumlahSlide: number;
    gayaPenyampaian: string;
  }) => {
    return `Rancanglah Blueprint dan Konten Slide Presentasi Pembelajaran Interaktif (Slide-by-Slide Deck).
Rujukan CP: SK BSKAP KEMENDIKDASMEN NOMOR 046/H/KR/2025.

Mata Pelajaran: ${params.mapel}
Fase / Kelas: ${params.fase}
Topik Materi: ${params.topik}
Jumlah Slide: ${params.jumlahSlide} slide
Gaya Penyampaian: ${params.gayaPenyampaian} (Interaktif, Visual-Rich, Deep Learning)

Berikan untuk setiap slide (Slide 1 sampai ${params.jumlahSlide}):
- Judul Slide
- Konten Utama / Poin Ringkas (Bullet Points bertenaga, bukan dinding teks)
- Rekomendasi Visual / Ilustrasi / Gambar pendukung
- Catatan Pembicara (Speaker Notes) untuk Guru saat menjelaskan di depan kelas
- Pertanyaan Interaktif / Ice Breaker untuk murid pada slide terkait.`;
  },
};
