import React, { useState } from 'react';
import { Target, Settings2, RefreshCw, Save, Activity } from 'lucide-react';
import { motion } from 'motion/react';

const CalibrationHelper: React.FC = () => {
  const [params, setParams] = useState({
    kp: '1.2',
    ki: '0.05',
    kd: '0.1',
    error: '0.24',
    overshoot: '15%'
  });

  const [advice, setAdvice] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const getAdvice = async () => {
    setIsProcessing(true);
    // Simulate AI advice or call a simple endpoint
    setTimeout(() => {
      setAdvice("Based on the 15% overshoot and 0.24 steady-state error, consider decreasing Kp by 10% and slightly increasing Kd to dampen the oscillation. If the error persists, check for mechanical backlash in the steering actuator.");
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Calibration Helper</h2>
        <p className="text-slate-500 mt-1">Control parameter tuning and performance optimization advisor.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Settings2 className="w-5 h-5 text-hanwha-orange" />
            <h3 className="font-black text-hanwha-black uppercase tracking-tight">Current Parameters</h3>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {['kp', 'ki', 'kd'].map(p => (
                <div key={p}>
                  <label className="block text-[10px] font-black text-hanwha-gray uppercase tracking-widest mb-1">{p}</label>
                  <input
                    type="text"
                    value={params[p as keyof typeof params]}
                    onChange={(e) => setParams({...params, [p]: e.target.value})}
                    className="w-full bg-hanwha-light border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-hanwha-orange outline-none font-bold"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-[10px] font-black text-hanwha-gray uppercase tracking-widest mb-1">Measured Error (Avg)</label>
              <input
                type="text"
                value={params.error}
                onChange={(e) => setParams({...params, error: e.target.value})}
                className="w-full bg-hanwha-light border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono focus:ring-2 focus:ring-hanwha-orange outline-none font-bold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-hanwha-gray uppercase tracking-widest mb-1">Max Overshoot (%)</label>
              <input
                type="text"
                value={params.overshoot}
                onChange={(e) => setParams({...params, overshoot: e.target.value})}
                className="w-full bg-hanwha-light border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono focus:ring-2 focus:ring-hanwha-orange outline-none font-bold"
              />
            </div>

            <button 
              onClick={getAdvice}
              disabled={isProcessing}
              className="w-full bg-hanwha-black text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-95 disabled:opacity-50 shadow-lg"
            >
              {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Target className="w-4 h-4 text-hanwha-orange" />}
              Get Optimization Advice
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-hanwha-black rounded-3xl p-8 text-white shadow-xl flex-1 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-hanwha-orange rounded-full blur-[80px] opacity-10 -mr-10 -mt-10" />
            <div className="flex items-center gap-2 mb-4 relative z-10">
              <Activity className="w-5 h-5 text-hanwha-orange" />
              <h3 className="font-black uppercase tracking-widest text-xs">AI Tuning Recommendation</h3>
            </div>
            {advice ? (
              <p className="text-slate-300 leading-relaxed italic relative z-10 font-medium">"{advice}"</p>
            ) : (
              <p className="text-slate-500 text-sm italic relative z-10 font-medium">Input your current control parameters and measured error to receive tuning guidance.</p>
            )}
          </div>
          
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h4 className="text-[10px] font-black text-hanwha-gray uppercase tracking-widest mb-4">Quick Actions</h4>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 rounded-xl border border-slate-100 hover:border-hanwha-orange hover:bg-hanwha-orange/5 transition-all text-sm font-black flex items-center justify-between group">
                Export to YAML <Save className="w-4 h-4 text-slate-300 group-hover:text-hanwha-orange" />
              </button>
              <button className="w-full text-left px-4 py-3 rounded-xl border border-slate-100 hover:border-hanwha-orange hover:bg-hanwha-orange/5 transition-all text-sm font-black flex items-center justify-between group">
                Reset to Default <RefreshCw className="w-4 h-4 text-slate-300 group-hover:text-hanwha-orange" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalibrationHelper;
