
import React, { useState } from 'react';
import { Search, History, ArrowRight, User, Calendar, Clock, BarChart3, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { HistoricalMeetingRecord } from '../types';

interface HistoryBrowserProps {
  meetings: HistoricalMeetingRecord[];
  onLoad: (id: string) => void;
}

const HistoryBrowser: React.FC<HistoryBrowserProps> = ({ meetings, onLoad }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = meetings.filter(m => 
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.hostName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSentimentIcon = (score: number) => {
    if (score > 0.3) return <TrendingUp className="w-4 h-4 text-green-400" />;
    if (score < -0.3) return <TrendingDown className="w-4 h-4 text-red-400" />;
    return <Minus className="w-4 h-4 text-slate-400" />;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-1000">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <History className="w-8 h-8 text-cyan-400" />
            Meeting Intelligence Archive
          </h2>
          <p className="text-slate-400 mt-1">Review and restore previous holographic knowledge captures.</p>
        </div>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search archive nodes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-6 py-3 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:bg-white/10 transition-all min-w-[300px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((m) => (
          <div 
            key={m.id} 
            className="glass group rounded-3xl p-6 border border-white/10 hover:border-cyan-500/30 hover:bg-white/10 transition-all duration-500 relative overflow-hidden"
          >
            {/* Background Decor */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full group-hover:bg-cyan-500/10 transition-colors" />
            
            <div className="flex items-center justify-between mb-4">
              <span className="px-2 py-0.5 bg-slate-800 rounded text-[10px] font-mono text-slate-500 uppercase tracking-tighter">
                Session {m.id.substring(0, 8)}
              </span>
              <div className="flex items-center gap-1">
                 {getSentimentIcon(m.overallSentimentScore)}
                 <span className="text-[10px] font-bold text-slate-400 uppercase">Score: {(m.overallSentimentScore * 100).toFixed(0)}</span>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{m.title}</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Calendar className="w-3 h-3" />
                <span>{new Date(m.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <User className="w-3 h-3" />
                <span>Host: {m.hostName}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Clock className="w-3 h-3" />
                <span>{(m.duration / 60).toFixed(0)} mins duration</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {m.keyTopics.map((topic, i) => (
                <span key={i} className="px-2 py-0.5 bg-white/5 border border-white/5 rounded-md text-[9px] text-slate-300 font-mono uppercase">
                  {topic}
                </span>
              ))}
            </div>

            <button 
              onClick={() => onLoad(m.id)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 group-hover:bg-cyan-600 rounded-xl font-bold transition-all border border-white/5 group-hover:border-cyan-500"
            >
              Restore Intelligence
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-20 text-center glass rounded-3xl border-dashed border-2 border-white/5">
            <Search className="w-12 h-12 text-slate-700 mx-auto mb-4" />
            <p className="text-slate-400">No archival nodes match your search query.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryBrowser;
