
import React, { useMemo } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Target, 
  BrainCircuit, 
  MapPin, 
  Calendar, 
  Clock, 
  User,
  Users,
  BarChart3,
  Box,
  ShieldCheck,
  CreditCard,
  AlertCircle
} from 'lucide-react';
import { MeetingSummaryExtended } from '../types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

interface SummaryViewProps {
  summary: MeetingSummaryExtended;
}

const SummaryView: React.FC<SummaryViewProps> = ({ summary }) => {
  const chartData = useMemo(() => [
    { name: 'Joy', value: summary.overallSentiment.dominantEmotions[0]?.percentage * 100 || 40 },
    { name: 'Neutral', value: summary.overallSentiment.neutralSegmentsCount * 10 },
    { name: 'Neg', value: summary.overallSentiment.negativeSegmentsCount * 10 },
  ], [summary]);

  const COLORS = ['#22d3ee', '#94a3b8', '#f43f5e'];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-1000">
      {/* Executive Header */}
      <div className="glass rounded-[2rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[80px] rounded-full -mr-20 -mt-20" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-cyan-500/20">
                Finalized Intelligence
              </span>
              <span className="text-slate-500 font-mono text-[10px]">ID: {summary.metadata.id.substring(0, 8)}</span>
            </div>
            <h2 className="text-4xl font-extrabold mb-4">{summary.metadata.title}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="flex items-center gap-3 text-slate-400">
                <Calendar className="w-5 h-5 text-cyan-500/60" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-mono tracking-tighter">Date</span>
                  <span className="text-sm text-slate-200">{new Date(summary.metadata.actualStartTime).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Clock className="w-5 h-5 text-purple-500/60" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-mono tracking-tighter">Duration</span>
                  <span className="text-sm text-slate-200">{(summary.metadata.durationSeconds! / 60).toFixed(0)} mins</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Users className="w-5 h-5 text-blue-500/60" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-mono tracking-tighter">Participants</span>
                  <span className="text-sm text-slate-200">{summary.participants.length} Active</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <MapPin className="w-5 h-5 text-emerald-500/60" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-mono tracking-tighter">Venue</span>
                  <span className="text-sm text-slate-200 truncate max-w-[120px]">{summary.metadata.location}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass p-6 rounded-2xl border-white/10 flex flex-col items-center gap-2 shadow-inner">
             <span className="text-[10px] text-slate-400 uppercase font-mono">Overall Sentiment</span>
             <div className="text-5xl font-black text-cyan-400">{(summary.overallSentiment.averageScore * 100).toFixed(0)}<span className="text-2xl">%</span></div>
             <span className="text-xs text-slate-500 uppercase tracking-tighter">Positive Consensus</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* AI Summary Card */}
          <section className="glass rounded-[2rem] p-8">
            <div className="flex items-center gap-3 mb-6">
              <BrainCircuit className="w-6 h-6 text-cyan-400" />
              <h3 className="text-xl font-bold">Agentic Narrative Summary</h3>
            </div>
            <p className="text-slate-300 leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-cyan-400 first-letter:mr-3 first-letter:float-left">
              {summary.aiSummary}
            </p>
            <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Key Takeaways</h4>
                <ul className="space-y-3">
                  {summary.keyTakeaways.map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)] group-hover:scale-125 transition-transform" />
                      <span className="text-sm text-slate-300 group-hover:text-slate-100 transition-colors">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Strategic Recommendations</h4>
                <ul className="space-y-3">
                  {summary.recommendations?.map((rec, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)] group-hover:scale-125 transition-transform" />
                      <span className="text-sm text-slate-300 group-hover:text-slate-100 transition-colors">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Outcomes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Action Items */}
            <section className="glass rounded-[2rem] p-8 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Target className="w-6 h-6 text-red-400" />
                  <h3 className="text-xl font-bold">Action Roadmap</h3>
                </div>
                <span className="text-[10px] font-mono bg-red-500/10 text-red-400 px-2 py-1 rounded border border-red-500/20">{summary.actionItems.length} PENDING</span>
              </div>
              <div className="space-y-4 flex-1">
                {summary.actionItems.map((item, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all group">
                    <div className="flex items-center justify-between mb-2">
                       <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${item.priority === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-slate-500/20 text-slate-400'}`}>
                         {item.priority}
                       </span>
                       <span className="text-[10px] text-slate-500 font-mono">DUE: {new Date(item.dueDate).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm font-medium mb-3 group-hover:text-cyan-400 transition-colors">{item.task}</p>
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 rounded-full bg-slate-700 border border-white/10 overflow-hidden">
                         <img src={`https://picsum.photos/seed/${item.assigneeId}/24/24`} alt="Assignee" />
                       </div>
                       <span className="text-xs text-slate-400 italic">assigned to {item.assigneeName}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Decisions */}
            <section className="glass rounded-[2rem] p-8 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-xl font-bold">Signed Decisions</h3>
                </div>
                <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20">{summary.decisions.length} VERIFIED</span>
              </div>
              <div className="space-y-4 flex-1">
                {summary.decisions.map((decision, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-100 transition-opacity">
                      <ShieldCheck className="w-8 h-8 text-emerald-400" />
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed mb-3">
                      "{decision.summary}"
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-500 font-mono">AUTHED BY {decision.decidedBy.toUpperCase()}</span>
                      <div className="flex items-center gap-1 text-[10px] text-emerald-400/70 font-mono tracking-tighter">
                         <ShieldCheck className="w-3 h-3" />
                         IMMUTABLE_RECORD_OK
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Intelligence Sidebar */}
        <div className="space-y-8">
          {/* Sentiment Analytics */}
          <section className="glass rounded-[2rem] p-8">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              Emotional Profile
            </h4>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ fontSize: '12px', color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
               {chartData.map((entry, i) => (
                 <div key={i} className="flex flex-col items-center">
                    <span className="text-[10px] text-slate-500 font-mono uppercase">{entry.name}</span>
                    <span className="text-sm font-bold" style={{ color: COLORS[i] }}>{entry.value}%</span>
                 </div>
               ))}
            </div>
          </section>

          {/* Spatial Assets */}
          <section className="glass rounded-[2rem] p-8">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Box className="w-4 h-4 text-purple-400" />
              Spatial Artifacts
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center gap-3">
                 <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                   <BrainCircuit className="w-5 h-5 text-cyan-400" />
                 </div>
                 <div>
                   <p className="text-xs font-bold">Session Mind Map</p>
                   <p className="text-[10px] text-slate-500 font-mono">MIND_MAP_V1.GLB • 4.2MB</p>
                 </div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center gap-3">
                 <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                   <FileText className="w-5 h-5 text-purple-400" />
                 </div>
                 <div>
                   <p className="text-xs font-bold">Transcript Archive</p>
                   <p className="text-[10px] text-slate-500 font-mono">RAW_TX_LOG.PDF • 1.2MB</p>
                 </div>
              </div>
            </div>
          </section>

          {/* Token Rails Activity */}
          <section className="glass rounded-[2rem] p-8">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-400" />
              Outcome Settlement
            </h4>
            <div className="space-y-3">
               <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-tighter">Settled Via Fast Rail</span>
                    <span className="text-sm font-bold">150.00 USDC</span>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
               </div>
               <p className="text-[9px] text-slate-500 font-mono text-center px-4 leading-tight italic">
                 * Simulated financial flow representing value exchange triggered by meeting decisions.
               </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SummaryView;
