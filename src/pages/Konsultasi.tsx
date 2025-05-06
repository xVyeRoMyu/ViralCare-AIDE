import React, { useState, useRef, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { FaPaperPlane, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AI_MODELS = {
  HEALTH: 'gemini-2.0-flash',
  GENERAL: 'gemini-1.5-pro',
  CRITICAL: 'med-palm-2'
};

const Konsultasi = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Halo! Saya asisten virtual ViralCare AIDE. Bagaimana saya bisa membantu Anda dengan pertanyaan seputar kesehatan dan pencegahan penyakit menular hari ini?' 
    }
  ]);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [summaryToSend, setSummaryToSend] = useState('');
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const apiKey = "AIzaSyB99ZE7EXffykao5fgbCbpLf-ODcnotcWU";

  // Scroll handling
  useEffect(() => {
    // Focus input on initial load
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Scroll chat container to bottom for new messages
    if (chatContainerRef.current && conversation.length > 1) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  const analyzeQuery = (message: string): { 
    isHealthRelated: boolean; 
    isClear: boolean;
    isEmergency: boolean;
  } => {
    const healthKeywords = [
      'sakit', 'penyakit', 'gejala', 'obat', 'dokter', 'rumah sakit', 'konsumsi', 'mengonsumsi',
      'demam', 'batuk', 'pilek', 'diare', 'mual', 'pusing', 'vaksin', 'alergi',
      'pengobatan', 'klinik', 'kesehatan', 'infeksi', 'virus', 'bakteri',
      'diabetes', 'darah tinggi', 'jantung', 'paru-paru', 'imun', 'sehat', 'tolong', 'racun', 'keracunan'
    ];
    
    const emergencyKeywords = ['darurat', 'gawat', 'kritis', 'emergency', 'sesak', 'tidak sadar'];
    const ambiguousWords = ['baik', 'buruk', 'bagus', 'jelek', 'oke', 'ya', 'tidak', 'mungkin'];
    
    const isHealth = healthKeywords.some(keyword => 
      message.toLowerCase().includes(keyword.toLowerCase())
    );
    
    const isEmergency = emergencyKeywords.some(keyword => 
      message.toLowerCase().includes(keyword.toLowerCase())
    );
    
    const words = message.toLowerCase().split(/\s+/);
    const isTooShort = words.length < 3;
    const containsOnlyAmbiguous = words.every(word => 
      ambiguousWords.includes(word) || word.length < 3
    );
    
    const isClear = !isTooShort && !containsOnlyAmbiguous;
    
    return { 
      isHealthRelated: isHealth, 
      isClear: isClear,
      isEmergency: isEmergency
    };
  };

  const selectAIModel = (query: string): string => {
    const { isEmergency } = analyzeQuery(query);
    return isEmergency ? AI_MODELS.CRITICAL : 
           analyzeQuery(query).isHealthRelated ? AI_MODELS.HEALTH : AI_MODELS.GENERAL;
  };

  const formatAIResponse = (response: string): string => {
    // Clean unwanted system messages
    let formatted = response
      .replace(/PENTING:.*?(?=\n\n|$)/g, '')
      .replace(/Catatan:.*?(?=\n\n|$)/g, '')
      .replace(/Perhatian:.*?(?=\n\n|$)/g, '')
      .replace(/\*\*/g, '');
    
    // Normalize formatting
    formatted = formatted
      .replace(/(\S)\n(\S)/g, '$1\n\n$2')
      .replace(/ +/g, ' ')
      .replace(/\n+/g, '\n')
      .trim();

    // Add spacing for section headers
    return formatted.replace(
      /(Rekomendasi|Manfaat|Resiko|Pencegahan|Rangkuman):/g, 
      '\n\n$1:\n'
    );
  };

  const validateHealthResponse = (response: string): boolean => {
    if (!analyzeQuery(response).isHealthRelated) return false;
    const requiredSections = ['Rekomendasi:', 'Pencegahan:'];
    return requiredSections.every(section => response.includes(section));
  };

  const extractSummary = (content: string): string | null => {
    const summaryMatch = content.match(/Rangkuman:([\s\S]*?)(?=\n\n|$)/i);
    if (!summaryMatch) return null;

    return summaryMatch[1]
      .split('\n')
      .map(line => line.replace(/^[•-]\s*/, '').trim())
      .filter(line => line)
      .join('\n');
  };

  const prepareWhatsAppMessage = () => {
    const lastAssistantMessage = conversation
      .filter(msg => msg.role === 'assistant')
      .pop()?.content || '';
    
    const summary = extractSummary(lastAssistantMessage);

    if (!summary) {
      toast({
        title: "Tidak ada rangkuman",
        description: "Tidak ditemukan rangkuman konsultasi untuk dikirim.",
        variant: "destructive"
      });
      return;
    }

    setSummaryToSend(summary);
    setShowWhatsAppModal(true);
  };

  const sendToWhatsApp = () => {
    const phoneNumber = "+6282358041224";
    const message = `Berikut ringkasan konsultasi Anda dengan ViralCare AIDE:\n\n${summaryToSend}`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    setShowWhatsAppModal(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast({
        title: "Pesan kosong",
        description: "Silakan ketik pertanyaan Anda terlebih dahulu",
        variant: "destructive"
      });
      return;
    }

    const userMessage = message;
    setMessage('');
    
    setConversation(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const { isHealthRelated, isClear } = analyzeQuery(userMessage);

      if (!isHealthRelated || !isClear) {
        setConversation(prev => [...prev, { 
          role: 'assistant', 
          content: 'Maaf, saya hanya dapat membantu dengan pertanyaan spesifik seputar kesehatan dan pencegahan penyakit. Mohon ajukan pertanyaan yang lebih jelas mengenai gejala, pengobatan, atau pencegahan penyakit.' 
        }]);
        setIsLoading(false);
        return;
      }

      const model = selectAIModel(userMessage);
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      const prompt = `Anda adalah ViralCare AIDE, asisten kesehatan khusus untuk pencegahan penyakit menular. Berikan respons dalam format berikut:
      
      Rekomendasi: [1-2 paragraf rekomendasi spesifik]
      
      Manfaat: [manfaat dari rekomendasi]
      
      Resiko: [resiko jika tidak ditangani]
      
      Pencegahan: [cara pencegahan]
      
      Rangkuman: [poin penting]
      
      JANGAN tambahkan catatan apapun tentang format atau instruksi.
      Fokus hanya pada konten kesehatan yang diminta.
      
      Pertanyaan: ${userMessage}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          }
        }),
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        let aiResponse = data.candidates[0].content.parts[0].text;
        const formattedResponse = formatAIResponse(aiResponse);

        if (!validateHealthResponse(formattedResponse)) {
          throw new Error('Respons tidak sesuai topik kesehatan');
        }

        setConversation(prev => [...prev, { 
          role: 'assistant', 
          content: formattedResponse
        }]);
      } else {
        throw new Error('Tidak mendapatkan respons yang valid');
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Gagal memproses permintaan. Silakan coba lagi.",
        variant: "destructive"
      });
      
      setConversation(prev => [...prev, { 
        role: 'assistant', 
        content: 'Maaf, terjadi kesalahan. Silakan coba lagi atau ajukan pertanyaan lebih spesifik tentang kesehatan.' 
      }]);
    } finally {
      setIsLoading(false);
      // Return to top after sending
      window.scrollTo(0, 0);
    }
  };

  const FormattedMessage = ({ content }: { content: string }) => {
    const lines = content.split('\n').filter(line => line.trim() !== '');

    return (
      <div className="whitespace-pre-wrap text-gray-800 space-y-3">
        {lines.map((line, index) => {
          const isHeader = line.match(/^(Rekomendasi|Manfaat|Resiko|Pencegahan|Rangkuman):/);
          const isBullet = line.startsWith('•') || line.startsWith('-');
          
          return (
            <div 
              key={index}
              className={
                isHeader ? "font-bold text-healthcare-700 text-lg mt-4" :
                isBullet ? "ml-4" : ""
              }
            >
              {line}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Layout hideAIAssistant={true}>
      <div className="animate-fade-in max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-healthcare-800 mb-6">Konsultasi Kesehatan</h1>
        
        {/* Chatbot Container */}
        <div 
          ref={chatContainerRef}
          className="bg-white rounded-lg shadow-lg p-6 mb-6 h-[60vh] overflow-y-auto"
        >
          {conversation.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-4 ${msg.role === 'user' ? 'text-right' : ''}`}
            >
              <div
                className={`inline-block rounded-lg px-4 py-3 max-w-[90%] ${
                  msg.role === 'user'
                    ? 'bg-healthcare-600 text-white'
                    : 'bg-gray-100 border border-gray-200 text-gray-800'
                }`}
              >
                <FormattedMessage content={msg.content} />
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="mb-4">
              <div className="inline-block rounded-lg px-4 py-2 bg-gray-100 border border-gray-200 text-gray-700">
                <div className="flex space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-gray-400"
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input and Send to WhatsApp */}
        <form onSubmit={handleSendMessage} className="mb-4">
          <div className="flex gap-2 mb-4">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ketik pertanyaan seputar kesehatan Anda..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-healthcare-500"
              disabled={isLoading}
            />
            <motion.button
              type="submit"
              className="bg-healthcare-600 text-white px-4 py-3 rounded-lg"
              whileHover={{ backgroundColor: '#2563eb' }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading || !message.trim()}
            >
              <FaPaperPlane />
            </motion.button>
          </div>
          <motion.button
            type="button"
            onClick={prepareWhatsAppMessage}
            className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="mr-2">Kirim ke WhatsApp</span>
            <FaWhatsapp className="text-lg" />
          </motion.button>
          
          {/* Disclaimer - Outside of chat */}
          <div className="mt-6 p-4 bg-gray-100 rounded-lg border border-gray-300 text-sm text-gray-700">
            <p className="font-bold mb-1">PENTING:</p>
            <p>Informasi ini hanya bersifat informatif dan bukan pengganti nasihat medis profesional. Selalu konsultasikan dengan dokter atau tenaga medis yang berkualifikasi untuk diagnosis dan pengobatan.</p>
          </div>
        </form>

        {/* WhatsApp Confirmation Modal */}
        {showWhatsAppModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Konfirmasi Pengiriman</h3>
              <p className="mb-4">Anda akan mengirim ringkasan konsultasi ke WhatsApp. Lanjutkan?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowWhatsAppModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  Batal
                </button>
                <button
                  onClick={sendToWhatsApp}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  Lanjutkan ke WhatsApp
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Konsultasi;