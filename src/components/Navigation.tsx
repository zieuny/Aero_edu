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
    <nav className="w-64 bg-slate-900 text-slate-300 h-screen flex flex-col border-r border-slate-800">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Search className="w-5 h-5" />
          </div>
          AeroAuto
        </h1>
        <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-semibold">Pilot Hub</p>
      </div>

      <div className="flex-1 mt-4 px-3 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeTab === item.id
                ? 'bg-blue-600/10 text-blue-400 font-medium border border-blue-600/20'
                : 'hover:bg-slate-800/50 hover:text-white'
            }`}
          >
            <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
            {item.label}
          </button>
        ))}
      </div>

      <div className="p-6 mt-auto border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 font-bold">
            JD
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-white truncate">Junior Developer</p>
            <p className="text-xs text-slate-500 truncate">Autonomous SW Team</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
