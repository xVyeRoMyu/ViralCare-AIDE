import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeartbeat, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Halo! Saya asisten virtual ViralCare AIDE. Bagaimana saya bisa membantu Anda hari ini?' 
    }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const apiKey = "AIzaSyB99ZE7EXffykao5fgbCbpLf-ODcnotcWU";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation]);

  const formatAIResponse = (response: string, isFirstMessage: boolean) => {
    if (isFirstMessage) {
      return `Halo! Saya ViralCare AIDE, siap membantu Anda.\n\n**Rekomendasi:**\n${response}\n\n**Manfaat:**\n[manfaat details]\n\n**Resiko:**\n[resiko details]\n\n**Pencegahan:**\n[pencegahan details]\n\n**Rangkuman:**\n[rangkuman]`;
    } else {
      return `Kalau seperti itu Anda harus melakukan:\n\n**Rekomendasi:**\n${response}\n\n**Manfaat:**\n[manfaat details]\n\n**Resiko:**\n[resiko details]\n\n**Pencegahan:**\n[pencegahan details]\n\n**Rangkuman:**\n[rangkuman]`;
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;

    const userMessage = message;
    setMessage('');
    
    setConversation(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const isFirstResponse = conversation.filter(m => m.role === 'assistant').length === 1;
      const prompt = isFirstResponse 
        ? `Anda adalah asisten kesehatan bernama ViralCare AIDE. Berikan respons pertama dengan "Halo! Saya ViralCare AIDE, siap membantu Anda." lalu berikan informasi dalam format berikut:
        **Rekomendasi:** [rekomendasi spesifik]
        **Manfaat:** [manfaat tindakan]
        **Resiko:** [resiko jika tidak ditangani]
        **Pencegahan:** [cara pencegahan]
        **Rangkuman:** [poin penting]
        Pertanyaan: ${userMessage}`
        : `Sebagai ViralCare AIDE, berikan respons lanjutan dengan format:
        Kalau seperti itu Anda harus melakukan:
        **Rekomendasi:** [rekomendasi]
        **Manfaat:** [manfaat]
        **Resiko:** [resiko]
        **Pencegahan:** [pencegahan]
        **Rangkuman:** [rangkuman]
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
        const aiResponse = data.candidates[0].content.parts[0].text;
        setConversation(prev => [...prev, { 
          role: 'assistant', 
          content: aiResponse.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        }]);
      } else {
        throw new Error('Tidak mendapatkan respons yang valid dari Gemini');
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Gagal mengirim pesan. Silakan coba lagi.",
        variant: "destructive"
      });
      
      setConversation(prev => [...prev, { 
        role: 'assistant', 
        content: 'Maaf, saya mengalami kesulitan untuk memproses permintaan Anda saat ini. Silakan coba lagi.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper component to render formatted messages
  const FormattedMessage = ({ content }: { content: string }) => {
    const parts = content.split(/(\*\*.*?\*\*)/g);
    
    return (
      <>
        {parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i}>{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
      </>
    );
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-healthcare-600 text-white flex items-center justify-center shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Buka Asisten Virtual"
      >
        {isOpen ? (
          <FaTimes className="text-xl" />
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          >
            <FaHeartbeat className="text-2xl" />
          </motion.div>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 right-6 w-96 sm:w-[28rem] rounded-lg bg-white shadow-2xl z-40 overflow-hidden" // Changed from bottom-20 to top-24
            style={{ 
              height: '65vh', // Slightly reduced height
              maxHeight: '65vh',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Header - unchanged */}
            <div className="bg-healthcare-700 text-white p-4 flex items-center">
              <div className="bg-white/20 p-2 rounded-full mr-3">
                <FaHeartbeat className="text-xl" />
              </div>
              <div>
                <h3 className="font-bold">ViralCare AIDE</h3>
                <p className="text-xs opacity-80">Asisten Kesehatan Virtual</p>
              </div>
            </div>
            
            {/* Messages - Now has more vertical space */}
            <div 
              className="p-4 overflow-y-auto bg-gray-50"
              style={{ 
                flex: 1,
                minHeight: '60%'
              }}
            >
              {conversation.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-4 ${msg.role === 'user' ? 'text-right' : ''}`}
                >
                  <div
                    className={`inline-block rounded-lg px-4 py-2 max-w-[90%] ${
                      msg.role === 'user'
                        ? 'bg-healthcare-600 text-white'
                        : 'bg-white border border-gray-200 text-gray-700'
                    }`}
                  >
                    <FormattedMessage content={msg.content} />
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="mb-4">
                  <div className="inline-block rounded-lg px-4 py-2 bg-white border border-gray-200 text-gray-700">
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
              <div ref={chatEndRef} />
            </div>
            
            {/* Input Form - unchanged */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
              <div className="flex">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ketik pesan anda..."
                  className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-healthcare-500"
                  disabled={isLoading}
                />
                <motion.button
                  type="submit"
                  className="bg-healthcare-600 text-white px-4 py-2 rounded-r-lg"
                  whileHover={{ backgroundColor: '#2563eb' }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isLoading || !message.trim()}
                >
                  <FaPaperPlane />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;