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
            <Settings2 className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-800">Current Parameters</h3>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {['kp', 'ki', 'kd'].map(p => (
                <div key={p}>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{p}</label>
                  <input
                    type="text"
                    value={params[p as keyof typeof params]}
                    onChange={(e) => setParams({...params, [p]: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Measured Error (Avg)</label>
              <input
                type="text"
                value={params.error}
                onChange={(e) => setParams({...params, error: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Max Overshoot (%)</label>
              <input
                type="text"
                value={params.overshoot}
                onChange={(e) => setParams({...params, overshoot: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button 
              onClick={getAdvice}
              disabled={isProcessing}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-95 disabled:opacity-50"
            >
              {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Target className="w-4 h-4" />}
              Get Optimization Advice
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-lg flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-blue-200" />
              <h3 className="font-bold">AI Tuning Recommendation</h3>
            </div>
            {advice ? (
              <p className="text-blue-50 leading-relaxed italic">"{advice}"</p>
            ) : (
              <p className="text-blue-200 text-sm italic">Input your current control parameters and measured error to receive tuning guidance.</p>
            )}
          </div>
          
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Actions</h4>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all text-sm font-medium flex items-center justify-between group">
                Export to YAML <Save className="w-4 h-4 text-slate-300 group-hover:text-blue-500" />
              </button>
              <button className="w-full text-left px-4 py-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all text-sm font-medium flex items-center justify-between group">
                Reset to Default <RefreshCw className="w-4 h-4 text-slate-300 group-hover:text-blue-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalibrationHelper;
