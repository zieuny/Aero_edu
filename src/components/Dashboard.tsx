import React from 'react';
import { Sparkles, ArrowRight, Zap, Target, BookOpen, Clock, Terminal, Activity } from 'lucide-react';
import { motion } from 'motion/react';

const Dashboard: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const stats = [
    { label: 'Work Flows', value: '12', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Saved Snippets', value: '48', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Docs Generated', value: '156', icon: Sparkles, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Log Reports', value: '32', icon: Target, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-4">
          Welcome back, Pilot.
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full border border-slate-200 text-xs font-bold text-slate-500 tracking-tighter">
            <Clock className="w-3.5 h-3.5" /> 18:04:19 UTC
          </div>
        </h2>
        <p className="text-slate-500 mt-2 text-lg">AeroAuto Pilot Hub is ready to accelerate your autonomous SW development.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <motion.div
            whileHover={{ y: -4 }}
            key={stat.label}
            className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all"
          >
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Action Cards */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-20 -mr-20 -mt-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative z-10 max-w-lg">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-[10px] font-bold uppercase tracking-widest border border-blue-500/30 mb-6">
                <Sparkles className="w-3 h-3" /> New Feature
              </span>
              <h3 className="text-3xl font-black mb-4 leading-tight">AI Technical Draft Generation</h3>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Transform rough test data and simulation notes into professional-grade technical documents matching Aerospace standards.
              </p>
              <button 
                onClick={() => onNavigate('docs')}
                className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-slate-100 transition-colors shadow-lg active:scale-95"
              >
                Try Doc Generator <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button 
              onClick={() => onNavigate('prompts')}
              className="bg-white border border-slate-200 rounded-[2rem] p-8 text-left group hover:border-blue-300 transition-all shadow-sm hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Terminal className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Prompt Library</h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Specialized prompts for ROS2, C++, and Python data processing.</p>
              <span className="text-blue-600 text-sm font-bold flex items-center gap-2">Browse library <ArrowRight className="w-4 h-4" /></span>
            </button>

            <button 
              onClick={() => onNavigate('analyzer')}
              className="bg-white border border-slate-200 rounded-[2rem] p-8 text-left group hover:border-rose-300 transition-all shadow-sm hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Log Analysis</h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Deep pattern detection for MILS/SILS simulation logs.</p>
              <span className="text-rose-600 text-sm font-bold flex items-center gap-2">Analyze logs <ArrowRight className="w-4 h-4" /></span>
            </button>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
            <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" /> Recent Snippets
            </h4>
            <div className="space-y-4">
              {['ROS2 Pub Boilerplate', 'Pandas Log Filter', 'Lidar Pre-processor'].map((item) => (
                <div key={item} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-300 transition-all cursor-pointer group">
                  <p className="text-sm font-bold text-slate-700 group-hover:text-blue-600">{item}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">C++ / Python</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2rem] p-8 text-white">
            <h4 className="text-xl font-bold mb-2">Pro Tip</h4>
            <p className="text-blue-100 text-sm leading-relaxed mb-6">
              Use the "Doc Generator" after every HILS run to automate your technical review memos while the data is fresh.
            </p>
            <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-white rounded-full" />
            </div>
            <p className="text-[10px] font-bold text-blue-200 mt-2 uppercase tracking-widest">75% Time Saved Today</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
