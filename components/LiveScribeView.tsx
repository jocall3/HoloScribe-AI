
import React, { useEffect, useRef } from 'react';
import { Mic, Square, User, TrendingUp, AlertTriangle, Zap, MessageSquare } from 'lucide-react';
import { TranscriptSegment } from '../types';
import { MeetingDataService } from '../services/mockServices';

interface LiveScribeViewProps {
  isScribing: boolean;
  onStart: () => void;
  onStop: () => void;
  transcript: TranscriptSegment[];
  setTranscript: React.Dispatch<React.SetStateAction<TranscriptSegment[]>>;
}

const LiveScribeView: React.FC<LiveScribeViewProps> = ({ isScribing, onStart, onStop, transcript, setTranscript }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isScribing) {
      const interval = setInterval(async () => {
        const newSegments = await MeetingDataService.getInstance().fetchLiveTranscriptSegments();
        setTranscript(prev => [...prev, ...newSegments]);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isScribing, setTranscript]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript]);

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Dynamic Waveform Header */}
      <div className="glass rounded-3xl p-6 flex items-center justify-between hologram-glow overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0" />
        <div className="flex items-center gap-6 z-10">
          <button 
            onClick={isScribing ? onStop : onStart}
            className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-2xl ${
              isScribing 
              ? 'bg-red-500 hover:bg-red-400 rotate-90 shadow-red-500/20' 
              : 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-500/20'
            }`}
          >
            {isScribing ? <Square className="w-8 h-8 fill-white" /> : <Mic className="w-8 h-8" />}
          </button>
          <div>
            <h2 className="text-2xl font-bold">{isScribing ? 'Holographic Scribe Active' : 'Start Spatial Capture'}</h2>
            <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">
              {isScribing ? 'Mapping acoustic vectors... Identifying participants...' : 'Ready for acoustic input via primary node'}
            </p>
          </div>
        </div>

        {/* Mock Waveform */}
        <div className="hidden md:flex items-center gap-1 h-12 overflow-hidden opacity-30">
          {Array.from({ length: 40 }).map((_, i) => (
            <div 
              key={i} 
              className={`w-1 rounded-full bg-cyan-400 transition-all duration-300 ${isScribing ? 'animate-bounce' : 'h-2'}`}
              style={{ 
                height: isScribing ? `${Math.random() * 100}%` : '8px',
                animationDelay: `${i * 0.05}s`
              }} 
            />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        {/* Main Transcript Pane */}
        <div className="flex-[2] glass rounded-3xl flex flex-col overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/5">
            <h3 className="font-bold flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              Real-time Feed
            </h3>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">
              Buffer: {transcript.length} segments • Latency: 240ms
            </span>
          </div>
          
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
          >
            {transcript.length === 0 && !isScribing && (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 p-12">
                <Mic className="w-12 h-12 mb-4 opacity-20" />
                <p>System idle. Initiate session capture to start transcription.</p>
              </div>
            )}
            {transcript.map((s, i) => (
              <div key={i} className="flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-slate-400" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-cyan-400">{s.participantName}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{new Date(s.timestamp).toLocaleTimeString()}</span>
                    {s.sentimentScore !== undefined && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${s.sentimentScore > 0.3 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                        {Math.abs(s.sentimentScore * 100).toFixed(0)}% {s.sentimentScore > 0 ? 'POS' : 'NEG'}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-200 leading-relaxed text-sm bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/5">
                    {s.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Side Insights Pane */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Sentiment Gauge */}
          <div className="glass rounded-3xl p-6 relative overflow-hidden">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              Emotional Pulse
            </h3>
            <div className="flex items-center justify-center py-4">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full rotate-[-90deg]">
                  <circle cx="64" cy="64" r="58" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  <circle 
                    cx="64" cy="64" r="58" fill="none" stroke="url(#cyan-gradient)" 
                    strokeWidth="8" strokeDasharray="364.4" 
                    strokeDashoffset={364.4 * (1 - 0.72)} 
                    strokeLinecap="round" 
                  />
                  <defs>
                    <linearGradient id="cyan-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">72%</span>
                  <span className="text-[10px] text-slate-400 font-mono uppercase">Positive</span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Insights */}
          <div className="flex-1 glass rounded-3xl p-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              Live Insights
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs font-bold text-yellow-400 uppercase">Action item Detected</span>
                </div>
                <p className="text-sm text-slate-200 italic">"Refine the Q4 marketing strategy document"</p>
              </div>
              <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-cyan-400 uppercase">Primary Speaker Identified</span>
                </div>
                <p className="text-sm text-slate-200">Avatar Alice (Host)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveScribeView;
