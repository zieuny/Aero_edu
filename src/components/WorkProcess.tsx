import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle2, Circle, Trash2, ChevronRight } from 'lucide-react';
import { WorkProcess } from '../types';
import { motion, AnimatePresence } from 'motion/react';

const WorkProcessManager: React.FC = () => {
  const [processes, setProcesses] = useState<WorkProcess[]>(() => {
    const saved = localStorage.getItem('work_processes');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        category: 'Autonomous',
        title: 'Sensor Calibration Flow',
        steps: [
          { id: 's1', label: 'Check sensor connectivity', completed: true },
          { id: 's2', label: 'Run intrinsic calibration script', completed: false },
          { id: 's3', label: 'Validate extrinsic parameters', completed: false },
        ]
      },
      {
        id: '2',
        category: 'VLA',
        title: 'Tech Review Submission',
        steps: [
          { id: 'v1', label: 'Collect simulation results', completed: false },
          { id: 'v2', label: 'Fill Technical Memo template', completed: false },
          { id: 'v3', label: 'Request internal review', completed: false },
        ]
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('work_processes', JSON.stringify(processes));
  }, [processes]);

  const toggleStep = (processId: string, stepId: string) => {
    setProcesses(prev => prev.map(p => {
      if (p.id === processId) {
        return {
          ...p,
          steps: p.steps.map(s => s.id === stepId ? { ...s, completed: !s.completed } : s)
        };
      }
      return p;
    }));
  };

  const addProcess = () => {
    const newProcess: WorkProcess = {
      id: Date.now().toString(),
      category: 'Autonomous',
      title: 'New Task Flow',
      steps: [{ id: '1', label: 'First step...', completed: false }]
    };
    setProcesses([newProcess, ...processes]);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Work Processes</h2>
          <p className="text-slate-500 mt-1">Standard workflows and knowledge base for new recruits.</p>
        </div>
        <button
          onClick={addProcess}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all font-medium shadow-sm active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Add Process
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {processes.map((process) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={process.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border ${
                    process.category === 'VLA' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                    process.category === 'Autonomous' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                    'bg-slate-50 text-slate-600 border-slate-200'
                  }`}>
                    {process.category}
                  </span>
                  <h3 className="text-lg font-semibold text-slate-800 mt-1">{process.title}</h3>
                </div>
                <button 
                  onClick={() => setProcesses(prev => prev.filter(p => p.id !== process.id))}
                  className="p-2 hover:bg-red-50 text-slate-300 hover:text-red-500 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5 space-y-3">
                {process.steps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => toggleStep(process.id, step.id)}
                    className="w-full flex items-center gap-3 text-left group"
                  >
                    {step.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 shrink-0 group-hover:text-blue-400" />
                    )}
                    <span className={`text-sm ${step.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                      {step.label}
                    </span>
                  </button>
                ))}
                
                <button className="text-blue-600 text-xs font-medium flex items-center gap-1 mt-4 hover:underline">
                  <Plus className="w-3 h-3" /> Add Step
                </button>
              </div>
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-500" 
                    style={{ width: `${(process.steps.filter(s => s.completed).length / process.steps.length) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-400 ml-4 whitespace-nowrap shrink-0">
                  {process.steps.filter(s => s.completed).length} / {process.steps.length}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WorkProcessManager;
