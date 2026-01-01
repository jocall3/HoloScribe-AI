
import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  History, 
  Settings, 
  Mic, 
  Zap, 
  Cpu, 
  CreditCard, 
  Users, 
  ShieldCheck, 
  ArrowRight,
  ChevronRight,
  BarChart3,
  Box
} from 'lucide-react';
import { MeetingDataService, generateId } from './services/mockServices';
import { MeetingSummaryExtended, HistoricalMeetingRecord, TranscriptSegment } from './types';
import SummaryView from './components/SummaryView';
import LiveScribeView from './components/LiveScribeView';
import HistoryBrowser from './components/HistoryBrowser';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'live' | 'summary' | 'history' | 'settings'>('live');
  const [currentSummary, setCurrentSummary] = useState<MeetingSummaryExtended | null>(null);
  const [historicalMeetings, setHistoricalMeetings] = useState<HistoricalMeetingRecord[]>([]);
  const [isScribing, setIsScribing] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptSegment[]>([]);

  const meetingService = MeetingDataService.getInstance();

  useEffect(() => {
    meetingService.getHistoricalMeetings().then(setHistoricalMeetings);
  }, []);

  const handleStartScribing = () => {
    setIsScribing(true);
    setTranscript([]);
    setActiveTab('live');
  };

  const handleStopScribing = async () => {
    setIsScribing(false);
    const summary = await meetingService.finalizeSummary(transcript);
    setCurrentSummary(summary);
    setActiveTab('summary');
  };

  const handleLoadMeeting = async (id: string) => {
    // In a real app, fetch by ID. Here we simulate.
    const summary = await meetingService.finalizeSummary([]); // Empty for mock
    summary.metadata.id = id;
    summary.metadata.title = "Restored Session " + id.substring(0, 4);
    setCurrentSummary(summary);
    setActiveTab('summary');
  };

  return (
    <div className="flex flex-col h-screen bg-[#020617] text-slate-100 overflow-hidden">
      {/* Top Header */}
      <header className="flex items-center justify-between px-6 py-4 glass border-b border-white/10 z-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/20 rounded-xl border border-cyan-500/50">
            <Cpu className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold cyan-gradient-text tracking-tight">HoloScribe AI</h1>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">System Operational</span>
            </div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {[
            { id: 'live', label: 'Live Session', icon: Mic },
            { id: 'summary', label: 'Insights', icon: BarChart3 },
            { id: 'history', label: 'Archive', icon: History },
            { id: 'settings', label: 'Config', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === item.id 
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' 
                : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs text-slate-400 font-mono">NODE_0492_A</span>
            <span className="text-[10px] text-cyan-400/70 font-mono tracking-tighter">LATENCY: 12ms</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 overflow-hidden">
            <img src="https://picsum.photos/32/32" alt="Avatar" />
          </div>
        </div>
      </header>

      {/* Main View Area */}
      <main className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(15,23,42,0)_0%,_rgba(2,6,23,1)_100%)] pointer-events-none" />
        
        <div className="h-full w-full max-w-[1600px] mx-auto p-4 md:p-6 overflow-y-auto">
          {activeTab === 'live' && (
            <LiveScribeView 
              isScribing={isScribing} 
              onStart={handleStartScribing} 
              onStop={handleStopScribing} 
              transcript={transcript}
              setTranscript={setTranscript}
            />
          )}
          {activeTab === 'summary' && currentSummary && (
            <SummaryView summary={currentSummary} />
          )}
          {activeTab === 'summary' && !currentSummary && (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 glass rounded-3xl border-dashed border-2 border-white/5">
              <Zap className="w-16 h-16 text-slate-700 mb-6" />
              <h2 className="text-2xl font-bold mb-2">No active insights available</h2>
              <p className="text-slate-400 max-w-md">Complete a live session or load a meeting from the archive to generate holographic intelligence.</p>
              <button 
                onClick={() => setActiveTab('live')}
                className="mt-8 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-cyan-900/20"
              >
                Start New Session
              </button>
            </div>
          )}
          {activeTab === 'history' && (
            <HistoryBrowser meetings={historicalMeetings} onLoad={handleLoadMeeting} />
          )}
          {activeTab === 'settings' && (
            <div className="p-8 glass rounded-3xl">
              <h2 className="text-2xl font-bold mb-8">System Configuration</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section>
                  <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-4">AI Processing</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-xl flex items-center justify-between border border-white/5">
                      <div>
                        <p className="font-medium">Gemini 2.5 Flash Lite</p>
                        <p className="text-xs text-slate-400">High efficiency, real-time transcription</p>
                      </div>
                      <div className="w-12 h-6 bg-cyan-500 rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                      </div>
                    </div>
                  </div>
                </section>
                <section>
                  <h3 className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-4">Blockchain Interop</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-xl flex items-center justify-between border border-white/5">
                      <div>
                        <p className="font-medium">Token Rail Settlement</p>
                        <p className="text-xs text-slate-400">Automated payments for meeting outcomes</p>
                      </div>
                      <div className="w-12 h-6 bg-slate-700 rounded-full relative">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-slate-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Persistent Status Bar */}
      <footer className="px-6 py-2 glass border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-500">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3 h-3 text-green-500" />
            <span>IDENTITY VERIFIED: CRYPTO_AUTH_OK</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-3 h-3 text-cyan-500" />
            <span>STREAM: 1080p_H264_STABLE</span>
          </div>
        </div>
        <div>
          &copy; 2025 HOLOSCRIBE AI SYSTEMS • VERSION 2.5.4-STABLE
        </div>
      </footer>
    </div>
  );
};

export default App;
