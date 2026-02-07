import React, { useState } from 'react';
import { Search, Mail, Phone, Calendar, CheckCircle, Clock, Globe } from 'lucide-react';

const Communication = () => {
    // Simulated messages
    const [messages, setMessages] = useState([
        { id: 1, name: 'Budi Santoso', email: 'budi@example.com', phone: '08123456789', date: '2024-02-07', subject: 'Tanya Program Magang', message: 'Halo, saya ingin bertanya apakah program magang ke Jepang masih dibuka untuk tahun ini?', status: 'unread' },
        { id: 2, name: 'Siti Aminah', email: 'siti@example.com', phone: '08198765432', date: '2024-02-06', subject: 'Biaya Pendaftaran', message: 'Berapa total biaya yang dibutuhkan sampai berangkat?', status: 'read' },
        { id: 3, name: 'Reza Rahadian', email: 'reza@example.com', phone: '08567890123', date: '2024-02-05', subject: 'Kerja Sama Institusi', message: 'Kami dari SMK 1 Jakarta ingin mengajukan kerjasama penyaluran alumni.', status: 'replied' },
    ]);

    const [selectedMessage, setSelectedMessage] = useState(null);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'unread': return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">Baru</span>;
            case 'replied': return <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">Dibalas</span>;
            default: return <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-bold">Dibaca</span>;
        }
    };

    return (
        <div className="communication-container h-[calc(100vh-140px)] flex gap-6">
            {/* List */}
            <div className="w-1/3 glass-card flex flex-col overflow-hidden">
                <div className="p-4 border-b">
                    <h2 className="font-bold text-lg mb-4">Kotak Masuk</h2>
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-3 text-secondary" />
                        <input
                            type="text"
                            placeholder="Cari pesan..."
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 border rounded-lg text-sm"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            onClick={() => setSelectedMessage(msg)}
                            className={`p-4 border-b cursor-pointer hover:bg-slate-50 transition-colors ${selectedMessage?.id === msg.id ? 'bg-red-50 border-l-4 border-l-brand-red' : ''}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <h4 className={`font-semibold text-sm ${msg.status === 'unread' ? 'text-black' : 'text-slate-600'}`}>{msg.name}</h4>
                                <span className="text-xs text-secondary">{msg.date}</span>
                            </div>
                            <p className="text-sm font-medium mb-1 truncate">{msg.subject}</p>
                            <div className="flex justify-between items-center">
                                <p className="text-xs text-secondary truncate w-32">{msg.message}</p>
                                {getStatusBadge(msg.status)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Detail */}
            <div className="flex-1 glass-card p-8 flex flex-col">
                {selectedMessage ? (
                    <>
                        <div className="flex justify-between items-start border-b pb-6 mb-6">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">{selectedMessage.subject}</h2>
                                <div className="flex items-center gap-4 text-sm text-secondary">
                                    <span className="flex items-center gap-1"><Mail size={14} /> {selectedMessage.email}</span>
                                    <span className="flex items-center gap-1"><Phone size={14} /> {selectedMessage.phone}</span>
                                    <span className="flex items-center gap-1"><Clock size={14} /> {selectedMessage.date}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="btn-action bg-blue-50 text-blue-600 hover:bg-blue-100">
                                    <CheckCircle size={18} /> Tandai Selesai
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            <p className="whitespace-pre-wrap text-slate-800 leading-relaxed">
                                {selectedMessage.message}
                            </p>
                        </div>

                        <div className="mt-6 pt-6 border-t">
                            <h4 className="font-bold mb-2">Balas Pesan</h4>
                            <textarea
                                rows={4}
                                className="w-full p-3 border rounded-lg mb-2"
                                placeholder="Tulis balasan di sini..."
                            />
                            <div className="flex justify-end">
                                <button className="bg-brand-red text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700">
                                    Kirim Balasan
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-secondary">
                        <Mail size={48} className="mb-4 text-slate-300" />
                        <p>Pilih pesan untuk melihat detail</p>
                    </div>
                )}
            </div>

            <style>{`
                .h-\\[calc\\(100vh-140px\\)\\] { height: calc(100vh - 140px); }
                .border-l-brand-red { border-left-color: var(--brand-red); }
                .bg-red-50 { background-color: #fef2f2; }
                .bg-brand-red { background-color: var(--brand-red); }
                .btn-action { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; rounded-lg: 0.5rem; font-weight: 500; transition: all 0.2s; }
            `}</style>
        </div>
    );
};

export default Communication;
