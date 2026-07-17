import React from 'react';
import { LayoutDashboard, BookOpen, Terminal, FileText, Code, Activity, Search, Target } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'process', label: 'Work Process', icon: BookOpen },
    { id: 'prompts', label: 'Prompt Library', icon: Terminal },
    { id: 'docs', label: 'Doc Generator', icon: FileText },
    { id: 'snippets', label: 'Snippets', icon: Code },
    { id: 'analyzer', label: 'Log Analyzer', icon: Activity },
    { id: 'calibration', label: 'Calibration', icon: Target },
  ];

  return (
    <nav className="w-64 bg-hanwha-black text-slate-400 h-screen flex flex-col border-r border-white/10">
      <div className="p-6">
        <h1 className="text-xl font-black text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-hanwha-orange rounded-md flex items-center justify-center">
            <Search className="w-5 h-5 text-white" />
          </div>
          AeroAuto
        </h1>
        <p className="text-[10px] text-hanwha-orange mt-1 uppercase tracking-widest font-black">Pilot Hub</p>
      </div>

      <div className="flex-1 mt-4 px-3 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
              activeTab === item.id
                ? 'bg-hanwha-orange/10 text-hanwha-orange font-bold'
                : 'hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-hanwha-orange' : 'text-slate-500 group-hover:text-slate-300'}`} />
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="p-6 mt-auto border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-hanwha-dark border border-white/10 flex items-center justify-center text-hanwha-orange font-black">
            JD
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-white truncate">Junior Developer</p>
            <p className="text-[10px] text-hanwha-gray truncate uppercase font-bold tracking-tighter">Autonomous SW Team</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
