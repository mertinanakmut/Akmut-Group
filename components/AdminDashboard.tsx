
import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

interface AdminDashboardProps {
  t: (key: string) => string;
  locale: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ locale }) => {
  const [activeSubTab, setActiveSubTab] = useState<'users' | 'logs' | 'chats'>('users');
  const [data, setData] = useState<{ users: any[], logs: any[], chats: any[] }>({ users: [], logs: [], chats: [] });
  const [selectedChatUser, setSelectedChatUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [activeSubTab]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      if (activeSubTab === 'users') {
        const { data: users, error: fetchError } = await supabase
          .from('site_users')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (fetchError) throw fetchError;
        setData(prev => ({ ...prev, users: users || [] }));
      } else if (activeSubTab === 'logs') {
        const { data: logs, error: fetchError } = await supabase
          .from('access_logs')
          .select('*, site_users(email, first_name, last_name)')
          .order('accessed_at', { ascending: false });
        
        if (fetchError) throw fetchError;
        setData(prev => ({ ...prev, logs: logs || [] }));
      } else if (activeSubTab === 'chats') {
        const { data: chats, error: fetchError } = await supabase
          .from('chat_history')
          .select('*, site_users(id, email, first_name, last_name)')
          .order('sent_at', { ascending: true });
        
        if (fetchError) throw fetchError;
        setData(prev => ({ ...prev, chats: chats || [] }));
        
        if (chats && chats.length > 0 && !selectedChatUser) {
          setSelectedChatUser(chats[0].user_id);
        }
      }
    } catch (err: any) {
      setError(locale === 'tr' ? 'Hata.' : 'Error.');
    } finally {
      setLoading(false);
    }
  };

  const deleteChatHistory = async (userId: string) => {
    if (!confirm(locale === 'tr' ? 'Bu sohbeti kalıcı olarak silmek istiyor musunuz?' : 'Delete this chat permanently?')) return;
    
    try {
      const { error: delError } = await supabase
        .from('chat_history')
        .delete()
        .eq('user_id', userId);

      if (delError) throw delError;

      // Local state update
      setData(prev => ({
        ...prev,
        chats: prev.chats.filter(c => c.user_id !== userId)
      }));
      setSelectedChatUser(null);
      alert(locale === 'tr' ? 'Sohbet silindi.' : 'Chat deleted.');
    } catch (err) {
      alert('Hata oluştu.');
    }
  };

  const openInMap = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
  };

  const groupedChats = data.chats.reduce((acc: any, chat: any) => {
    const userId = chat.user_id;
    if (!acc[userId]) {
      acc[userId] = {
        user: chat.site_users,
        messages: []
      };
    }
    acc[userId].messages.push(chat);
    return acc;
  }, {});

  const chatUsers = Object.keys(groupedChats).map(id => groupedChats[id]);

  return (
    <div className="animate-fade-in space-y-12">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase">{locale === 'tr' ? 'YÖNETİM' : 'MANAGEMENT'}</h2>
          <p className="text-[10px] text-sky-400 font-bold uppercase tracking-widest mt-2 italic">● CANLI VERİ VE DENETİM</p>
        </div>
        <button 
          onClick={fetchData} 
          className="text-sky-400 font-black text-[10px] uppercase tracking-widest border border-sky-400/20 px-6 py-3 hover:bg-sky-400 hover:text-white transition-all bg-sky-400/5"
        >
          {locale === 'tr' ? 'YENİLE' : 'REFRESH'}
        </button>
      </div>

      <div className="flex border-b border-white/10">
        {['users', 'logs', 'chats'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveSubTab(tab as any)} 
            className={`px-8 py-4 text-[11px] font-black uppercase tracking-widest relative transition-all ${activeSubTab === tab ? 'text-sky-400 bg-white/5' : 'text-slate-500 hover:text-white'}`}
          >
            {tab === 'users' ? 'KULLANICILAR' : tab === 'logs' ? 'LOGLAR' : 'SOHBETLER'}
            {activeSubTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-sky-400"></div>}
          </button>
        ))}
      </div>

      <div className="bg-slate-900/30 border border-white/5 min-h-[500px]">
        {loading ? (
          <div className="p-20 text-center">
            <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="font-black text-sky-500 text-[10px] uppercase tracking-widest">VERİ ANALİZİ YAPILIYOR...</p>
          </div>
        ) : (
          <>
            {activeSubTab === 'users' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <tr><th className="p-6">KİMLİK</th><th className="p-6">İLETİŞİM</th><th className="p-6">KATILIM</th></tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {data.users.map((u, i) => (
                      <tr key={i} className="hover:bg-white/[0.02]">
                        <td className="p-6 text-white font-black italic uppercase">{u.first_name} {u.last_name}</td>
                        <td className="p-6 text-sky-400 font-bold">{u.email}</td>
                        <td className="p-6 text-slate-500 text-[11px] font-bold">{new Date(u.created_at).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeSubTab === 'logs' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <tr>
                      <th className="p-6">HEDEF</th>
                      <th className="p-6">IP / KONUM</th>
                      <th className="p-6">KOORDİNATLAR (SESSİZ GPS)</th>
                      <th className="p-6">ZAMAN</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {data.logs.map((l, i) => (
                      <tr key={i} className="hover:bg-white/[0.02]">
                        <td className="p-6 text-white font-black text-[10px] uppercase">
                          {l.site_users ? `${l.site_users.first_name} ${l.site_users.last_name}` : 'İzinsiz'}
                        </td>
                        <td className="p-6">
                          <div className="text-sky-400 font-black text-[10px]">{l.ip_address}</div>
                          <div className="text-slate-500 text-[9px] uppercase font-bold">{l.city}, {l.country}</div>
                        </td>
                        <td className="p-6">
                          {l.latitude && l.longitude ? (
                            <button 
                              onClick={() => openInMap(l.latitude, l.longitude)}
                              className="text-white hover:bg-sky-500 text-[9px] font-black uppercase border border-white/20 px-3 py-1 transition-all"
                            >
                              GÖRSELLEŞTİR: {l.latitude.toFixed(4)}, {l.longitude.toFixed(4)}
                            </button>
                          ) : 'YOK'}
                        </td>
                        <td className="p-6 text-slate-500 text-[10px] font-bold">{new Date(l.accessed_at).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeSubTab === 'chats' && (
              <div className="flex h-[600px]">
                <div className="w-1/3 border-r border-white/10 overflow-y-auto bg-black/20">
                  {chatUsers.map((uInfo, i) => (
                    <div key={i} className={`relative group ${selectedChatUser === uInfo.user.id ? 'bg-sky-500/10 border-r-4 border-r-sky-500' : 'hover:bg-white/5'}`}>
                      <button 
                        onClick={() => setSelectedChatUser(uInfo.user.id)}
                        className="w-full p-6 text-left"
                      >
                        <span className="text-white font-black italic uppercase text-xs block">{uInfo.user.first_name} {uInfo.user.last_name}</span>
                        <span className="text-sky-400 font-bold text-[9px] block mt-1">{uInfo.user.email}</span>
                      </button>
                      <button 
                        onClick={() => deleteChatHistory(uInfo.user.id)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-500/30"
                        title="SOHBETİ SİL"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="w-2/3 flex flex-col bg-black/40">
                  {selectedChatUser && groupedChats[selectedChatUser] ? (
                    <div className="flex-1 overflow-y-auto p-8 space-y-6">
                      {groupedChats[selectedChatUser].messages.map((c: any, i: number) => (
                        <div key={i} className={`flex flex-col ${c.sender_role === 'model' ? 'items-start' : 'items-end'}`}>
                          <div className={`p-4 max-w-[80%] text-[10px] font-bold italic uppercase border ${c.sender_role === 'model' ? 'bg-slate-800/50 border-white/10 text-slate-300' : 'bg-sky-500/10 border-sky-500/30 text-sky-400'}`}>
                            {c.message_content}
                          </div>
                          <span className="text-[7px] text-slate-600 mt-1 uppercase font-black">{new Date(c.sent_at).toLocaleTimeString()}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-slate-600 font-black italic uppercase text-xs">VERİ SEÇİMİ BEKLENİYOR.</div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
