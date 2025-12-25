
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { getAIResponse } from '../services/gemini.ts';
import { ChatMessage } from '../types.ts';
import { supabase } from '../services/supabase.ts';

interface AIChatbotProps {
  tenantName: string;
  t: (key: string) => string;
}

const AGENT_NAMES = [
  { name: 'Selin', gender: 'female' },
  { name: 'Kaan', gender: 'male' },
  { name: 'Derin', gender: 'female' },
  { name: 'Bora', gender: 'male' }
];

const AIChatbot: React.FC<AIChatbotProps> = ({ tenantName, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({ firstName: '', lastName: '', email: '' });
  const [internalUserId, setInternalUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const agent = useMemo(() => AGENT_NAMES[Math.floor(Math.random() * AGENT_NAMES.length)], []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const guessGenderSuffix = (name: string): string => {
    const maleNames = ['mert', 'kaan', 'bora', 'ahmet', 'mehmet', 'ali', 'inan', 'can', 'emir', 'yiğit'];
    return maleNames.includes(name.toLowerCase()) ? 'Bey' : 'Hanım';
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      let ipData = { ip: 'Unknown', city: 'Unknown', country: 'Unknown', lat: null, lon: null };
      try {
        const ipResponse = await fetch('https://ipapi.co/json/');
        if (ipResponse.ok) {
          const json = await ipResponse.json();
          ipData = { ip: json.ip, city: json.city, country: json.country_name, lat: json.latitude, lon: json.longitude };
        }
      } catch (err) { console.warn("IP tracking failed."); }

      const preciseLoc = await new Promise<{lat: number | null, lon: number | null}>((resolve) => {
        if (!navigator.geolocation) return resolve({ lat: null, lon: null });
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
          () => resolve({ lat: null, lon: null }),
          { enableHighAccuracy: true, timeout: 5000 }
        );
      });

      const { data: user, error: userError } = await supabase
        .from('site_users')
        .upsert({ email: userData.email.toLowerCase().trim(), first_name: userData.firstName.trim(), last_name: userData.lastName.trim() }, { onConflict: 'email' })
        .select().single();

      if (userError || !user) throw new Error("Connection failed");
      setInternalUserId(user.id);

      await supabase.from('access_logs').insert({
        user_id: user.id, user_agent: navigator.userAgent, ip_address: ipData.ip, city: ipData.city, country: ipData.country,
        latitude: preciseLoc.lat || ipData.lat, longitude: preciseLoc.lon || ipData.lon
      });

      setIsRegistered(true);
      const suffix = guessGenderSuffix(userData.firstName);
      
      setMessages([{ 
        role: 'model', 
        text: `Hoş geldiniz ${userData.firstName} ${suffix}. Ben ${agent.name}. Size nasıl yardımcı olabilirim?` 
      }]);
    } catch (err: any) {
      setError("Bağlantı kurulamadı.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading || !internalUserId) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      await supabase.from('chat_history').insert({ user_id: internalUserId, sender_role: 'user', message_content: currentInput });
      
      const response = await getAIResponse(currentInput, `Ziyaretçi: ${userData.firstName}. Bot: ${agent.name}.`);
      
      const modelMsg: ChatMessage = { role: 'model', text: response || "Üzgünüm, anlayamadım." };
      setMessages(prev => [...prev, modelMsg]);

      await supabase.from('chat_history').insert({ user_id: internalUserId, sender_role: 'model', message_content: modelMsg.text });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 font-sans">
      {isOpen ? (
        <div className="bg-[#020617] w-80 md:w-96 h-[550px] shadow-2xl flex flex-col border border-white/10 animate-slide-up overflow-hidden">
          <div className="p-4 bg-white text-[#020617] flex justify-between items-center shadow-md">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-[#020617] flex items-center justify-center font-black text-white text-[8px]">{agent.name[0]}</div>
              <h4 className="font-black text-[9px] uppercase tracking-widest">{agent.name} | ASİSTAN</h4>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-red-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {!isRegistered ? (
            <div className="flex-1 p-8 space-y-6 bg-slate-900/50">
              <h5 className="text-white font-black text-[10px] uppercase tracking-widest border-l-2 border-sky-500 pl-3 italic">DİJİTAL DANIŞMANLIK</h5>
              <form onSubmit={handleRegister} className="space-y-4">
                <input required type="text" placeholder="ADINIZ" className="w-full bg-transparent border-b border-white/10 p-3 text-[10px] font-black text-white uppercase outline-none focus:border-sky-500 transition-all" value={userData.firstName} onChange={(e) => setUserData({ ...userData, firstName: e.target.value })} />
                <input required type="text" placeholder="SOYADINIZ" className="w-full bg-transparent border-b border-white/10 p-3 text-[10px] font-black text-white uppercase outline-none focus:border-sky-500 transition-all" value={userData.lastName} onChange={(e) => setUserData({ ...userData, lastName: e.target.value })} />
                <input required type="email" placeholder="E-POSTA" className="w-full bg-transparent border-b border-white/10 p-3 text-[10px] font-black text-white uppercase outline-none focus:border-sky-500 transition-all" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                <button type="submit" disabled={isLoading} className="w-full bg-white text-[#020617] py-4 text-[9px] font-black uppercase tracking-[0.2em] hover:bg-sky-500 hover:text-white transition-all shadow-xl">
                  {isLoading ? 'BAĞLANILIYOR...' : 'GÖRÜŞMEYE BAŞLA'}
                </button>
              </form>
              {error && <p className="text-red-500 text-[9px] font-black uppercase italic">{error}</p>}
            </div>
          ) : (
            <>
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-900/10">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 text-[11px] font-bold uppercase italic tracking-tight leading-relaxed ${msg.role === 'user' ? 'bg-sky-500 text-white shadow-lg' : 'bg-white/5 text-slate-300 border border-white/10'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && <div className="text-[9px] font-black text-sky-500 animate-pulse">YAZIYOR...</div>}
              </div>
              <div className="p-3 border-t border-white/5 flex bg-[#020617] items-center">
                <input 
                  type="text" 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()} 
                  placeholder="SORUNUZU YAZIN..." 
                  className="flex-1 bg-transparent text-white text-[10px] font-black p-2 outline-none uppercase tracking-widest placeholder:text-slate-800" 
                />
                <button onClick={handleSend} className="text-sky-500 font-black text-[10px] px-2 hover:text-white transition-colors">GÖNDER</button>
              </div>
            </>
          )}
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="bg-white text-[#020617] px-8 py-4 font-black text-[10px] uppercase tracking-[0.3em] border border-white hover:bg-sky-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl">
          DANIŞMANA SOR
        </button>
      )}
    </div>
  );
};

export default AIChatbot;
