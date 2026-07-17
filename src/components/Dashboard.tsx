import React from 'react';
import { Sparkles, ArrowRight, Zap, Target, BookOpen, Clock, Terminal, Activity } from 'lucide-react';
import { motion } from 'motion/react';

const Dashboard: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const stats = [
    { label: 'Work Flows', value: '12', icon: BookOpen, color: 'text-hanwha-orange', bg: 'bg-hanwha-orange/5' },
    { label: 'Saved Snippets', value: '48', icon: Zap, color: 'text-hanwha-orange', bg: 'bg-hanwha-orange/5' },
    { label: 'Docs Generated', value: '156', icon: Sparkles, color: 'text-hanwha-orange', bg: 'bg-hanwha-orange/5' },
    { label: 'Log Reports', value: '32', icon: Target, color: 'text-hanwha-orange', bg: 'bg-hanwha-orange/5' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-4xl font-black text-hanwha-black tracking-tight flex items-center gap-4">
          Welcome back, Pilot.
          <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-slate-200 text-xs font-bold text-hanwha-gray tracking-tighter">
            <Clock className="w-3.5 h-3.5" /> 18:04:19 UTC
          </div>
        </h2>
        <p className="text-hanwha-gray mt-2 text-lg font-medium">AeroAuto Pilot Hub is ready to accelerate your autonomous SW development.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <motion.div
            whileHover={{ y: -4 }}
            key={stat.label}
            className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all"
          >
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center mb-4 border border-hanwha-orange/10`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-hanwha-gray text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
            <p className="text-3xl font-black text-hanwha-black mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Action Cards */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-hanwha-black rounded-[2rem] p-10 text-white relative overflow-hidden group shadow-2xl border border-white/5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-hanwha-orange rounded-full blur-[120px] opacity-10 -mr-20 -mt-20 group-hover:opacity-20 transition-opacity" />
            <div className="relative z-10 max-w-lg">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-hanwha-orange/20 text-hanwha-orange rounded-full text-[10px] font-bold uppercase tracking-widest border border-hanwha-orange/30 mb-6">
                <Sparkles className="w-3 h-3" /> New Feature
              </span>
              <h3 className="text-3xl font-black mb-4 leading-tight">AI Technical Draft Generation</h3>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed font-medium">
                Transform rough test data and simulation notes into professional-grade technical documents matching Aerospace standards.
              </p>
              <button 
                onClick={() => onNavigate('docs')}
                className="bg-hanwha-orange text-white px-8 py-4 rounded-xl font-black flex items-center gap-2 hover:bg-hanwha-orange/90 transition-colors shadow-lg active:scale-95"
              >
                Try Doc Generator <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button 
              onClick={() => onNavigate('prompts')}
              className="bg-white border border-slate-200 rounded-[1.5rem] p-8 text-left group hover:border-hanwha-orange transition-all shadow-sm hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-hanwha-orange/5 text-hanwha-orange rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-hanwha-orange/10">
                <Terminal className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-black text-hanwha-black mb-2">Prompt Library</h4>
              <p className="text-hanwha-gray text-sm leading-relaxed mb-6 font-medium">Specialized prompts for ROS2, C++, and Python data processing.</p>
              <span className="text-hanwha-orange text-sm font-black flex items-center gap-2">Browse library <ArrowRight className="w-4 h-4" /></span>
            </button>

            <button 
              onClick={() => onNavigate('analyzer')}
              className="bg-white border border-slate-200 rounded-[1.5rem] p-8 text-left group hover:border-hanwha-orange transition-all shadow-sm hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-hanwha-orange/5 text-hanwha-orange rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-hanwha-orange/10">
                <Activity className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-black text-hanwha-black mb-2">Log Analysis</h4>
              <p className="text-hanwha-gray text-sm leading-relaxed mb-6 font-medium">Deep pattern detection for MILS/SILS simulation logs.</p>
              <span className="text-hanwha-orange text-sm font-black flex items-center gap-2">Analyze logs <ArrowRight className="w-4 h-4" /></span>
            </button>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-[1.5rem] p-8 shadow-sm">
            <h4 className="text-lg font-black text-hanwha-black mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-hanwha-orange" /> Recent Snippets
            </h4>
            <div className="space-y-4">
              {['ROS2 Pub Boilerplate', 'Pandas Log Filter', 'Lidar Pre-processor'].map((item) => (
                <div key={item} className="p-4 bg-hanwha-light rounded-xl border border-slate-100 hover:border-hanwha-orange transition-all cursor-pointer group">
                  <p className="text-sm font-bold text-hanwha-black group-hover:text-hanwha-orange">{item}</p>
                  <p className="text-[10px] text-hanwha-gray font-black uppercase mt-1 tracking-wider">C++ / Python</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-hanwha-dark to-hanwha-black rounded-[1.5rem] p-8 text-white border border-white/5">
            <h4 className="text-xl font-black mb-2 text-hanwha-orange">Pro Tip</h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
              Use the "Doc Generator" after every HILS run to automate your technical review memos while the data is fresh.
            </p>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-hanwha-orange rounded-full" />
            </div>
            <p className="text-[10px] font-black text-hanwha-orange mt-2 uppercase tracking-widest">75% Time Saved Today</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
