import React, { useState, useRef, useEffect } from 'react';
import { GuruProfile, SekolahProfile, ChatMessage } from '../../../types';
import { sendChatMessage } from '../../../services/aiService';
import {
  BotMessageSquare,
  Send,
  Sparkles,
  User,
  ShieldCheck,
  RotateCcw,
  Loader2,
  HelpCircle,
} from 'lucide-react';

interface AiChatViewProps {
  guru: GuruProfile;
  sekolah: SekolahProfile;
}

export const AiChatView: React.FC<AiChatViewProps> = ({ guru, sekolah }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      role: 'assistant',
      content: `Halo Bapak/Ibu ${guru.nama}! 👋 
Saya adalah **Konsultan Ahli Kurikulum Nasional & Sahabat Guru 24/7 "TUNGGURU"**. 

Saya siap mendampingi Anda dalam:
1. Konsultasi regulasi **Salinan SK BSKAP Kemendikdasmen No. 046/H/KR/2025** (CP PAUD, Dikdas, Dikmen).
2. Penerapan Framework **Pembelajaran Mendalam (Deep Learning: Mindful, Meaningful, Joyful)**.
3. Formulasi Tujuan Pembelajaran (TP), Alur (ATP), dan Rubrik KKTP deskriptif rapor.
4. Strategi Kurikulum Kasih Sayang (KBC) dan manajemen kedisiplinan positif di kelas.

Ada hal yang ingin Anda diskusikan atau tanyakan hari ini?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const historyForApi = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const reply = await sendChatMessage(historyForApi, {
        guruNama: guru.nama,
        sekolahNama: sekolah.namaSekolah,
        mapelUtama: guru.mapelUtama,
        regulasiCP: 'SK BSKAP KEMENDIKDASMEN NO. 046/H/KR/2025',
      });

      const assistantMsg: ChatMessage = {
        id: 'ast-' + Date.now(),
        role: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: 'err-' + Date.now(),
        role: 'assistant',
        content: `Mohon maaf Bapak/Ibu guru, terjadi kendala koneksi dengan server AI: ${err.message || 'Layanan tidak dapat dihubungi'}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    'Bagaimana cara menurunkan CP ke TP berdasarkan SK BSKAP No. 046/H/KR/2025?',
    'Berikan contoh aktivitas Mindful Learning 5 menit di awal jam pelajaran!',
    'Bagaimana merumuskan interval predikat KKTP pada rapor Kurikulum Merdeka?',
    'Tips menangani siswa yang pasif dan kurang percaya diri dalam diskusi kelompok?',
  ];

  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-md border-2 border-orange-300 dark:border-orange-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-600 text-white rounded-xl shadow-md">
            <BotMessageSquare className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Chat Konsultan Kurikulum & Sahabat Guru 24/7
              </h2>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500 text-white animate-pulse">
                ONLINE
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Konsultasi Langsung: SK BSKAP 046/H/KR/2025, Deep Learning, Asesmen, & Kasus Siswa
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMessages([messages[0]])}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Bersihkan Percakapan
          </button>
        </div>
      </div>

      {/* Area Chat Interaktif */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col h-[650px] overflow-hidden">
        {/* Messages List Container */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[88%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {/* Avatar Icon */}
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-xs shrink-0 shadow-md ${
                    isUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-orange-500 text-white'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <BotMessageSquare className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`p-4 rounded-2xl text-xs leading-relaxed ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-tr-xs'
                      : 'bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 rounded-tl-xs border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans">{msg.content}</div>
                  <span
                    className={`block text-[9px] mt-2 font-mono ${
                      isUser ? 'text-blue-200 text-right' : 'text-slate-400 text-left'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 mr-auto max-w-[85%]">
              <div className="w-9 h-9 rounded-2xl bg-orange-500 text-white flex items-center justify-center shrink-0">
                <BotMessageSquare className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/90 text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                <span>Konsultan AI sedang memikirkan solusi kurikulum...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Pills */}
        <div className="px-5 py-2.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto">
          <span className="text-[10px] font-bold text-slate-500 shrink-0 flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-orange-500" /> Tanya Cepat:
          </span>
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              type="button"
              disabled={isLoading}
              onClick={() => handleSend(qp)}
              className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-orange-950/40 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[10px] font-semibold shrink-0 transition-colors cursor-pointer"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Input Bar Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3"
        >
          <input
            type="text"
            placeholder="Ketik pertanyaan kurikulum, asesmen, atau kasus siswa di sini..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-4 py-3 text-xs rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-900 dark:text-white"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white shadow-md disabled:opacity-50 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
