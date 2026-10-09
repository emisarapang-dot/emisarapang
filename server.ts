import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini API client
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API endpoint for AI Suite Generation
app.post('/api/ai/generate', async (req, res) => {
  try {
    const { prompt, systemInstruction, type } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!aiClient) {
      // If API key is not present or configured yet, return a structured fallback response
      return res.status(503).json({
        error: 'GEMINI_API_KEY belum dikonfigurasi di environment server.',
      });
    }

    const effectiveInstruction = systemInstruction || 
      `Anda adalah Pakar Kurikulum Merdeka Nasional Kemendikdasmen dan Konsultan Pendidikan Indonesia Berpengalaman.
Selalu rujuk dan patuhi regulasi resmi: SALINAN KEPUTUSAN KEPALA BSKAP KEMENDIKDASMEN NOMOR 046/H/KR/2025 TENTANG CAPAIAN PEMBELAJARAN PADA PAUD, PENDIDIKAN DASAR, DAN PENDIDIKAN MENENGAH.
Terapkan prinsip Pembelajaran Mendalam (Deep Learning: Mindful, Meaningful, Joyful Learning).
Gunakan Bahasa Indonesia baku, akademik, inspiratif, dan sistematis sesuai format administrasi guru profesional.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: effectiveInstruction,
        temperature: 0.7,
      },
    });

    const text = response.text || '';
    return res.json({ result: text });
  } catch (err: any) {
    console.error('Gemini API Error:', err);
    return res.status(500).json({
      error: err?.message || 'Terjadi kesalahan saat memproses permintaan AI.',
    });
  }
});

// API endpoint for Chat Consultant
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { messages, contextInfo } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    if (!aiClient) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY belum dikonfigurasi di environment server.',
      });
    }

    const systemPrompt = `Anda adalah Asisten Chat Konsultan Pendidikan 24/7 "TUNGGURU KONSULTAN".
Anda adalah konsultan ahli Kurikulum Nasional, sahabat guru terpercaya, ramah, solutif, dan menguasai secara detail:
1. SALINAN KEPUTUSAN KEPALA BSKAP KEMENDIKDASMEN NOMOR 046/H/KR/2025 (Capaian Pembelajaran PAUD, Dikdas, Dikmen).
2. Framework Pembelajaran Mendalam (Deep Learning: Mindful Learning, Meaningful Learning, Joyful Learning).
3. Panduan Pembelajaran dan Asesmen (Format KKTP, Rubrik, Rapor, STS, SAS).
4. Kurikulum Berbasis Kasih Sayang (KBC) & Penguatan Karakter 7 Kebiasaan Anak Indonesia Hebat.
5. Strategi manajemen kelas, diferensiasi konten/proses/produk, dan penanganan siswa bermasalah.
${contextInfo ? `Konteks Pengguna: ${JSON.stringify(contextInfo)}` : ''}

Format respons dengan gaya yang terstruktur rapi (bullet points, bold highlights, kutipan regulasi jika relevan), santun, dan sangat aplikatif bagi guru di kelas.`;

    // Format contents for Gemini
    const contents = messages.map((m: { role: 'user' | 'assistant'; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    return res.json({ reply: response.text || '' });
  } catch (err: any) {
    console.error('Chat API Error:', err);
    return res.status(500).json({
      error: err?.message || 'Gagal memproses konsultasi chat AI.',
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(apiKey),
    timestamp: new Date().toISOString(),
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer();
