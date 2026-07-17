import React, { useState } from 'react';
import { Activity, Upload, AlertCircle, CheckCircle2, ChevronRight, Loader2, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';

const LogAnalyzer: React.FC = () => {
  const [logContent, setLogContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState('');

  const handleAnalyze = async () => {
    if (!logContent.trim()) return;
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/ai/analyze-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logContent }),
      });
      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (error) {
      console.error('Analysis failed:', error);
      setAnalysis('## Error\nAnalysis failed. Please check your log format and try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto h-[calc(100vh-2rem)] flex flex-col">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Log Analyzer</h2>
          <p className="text-slate-500 mt-1">MILS/SILS/HILS log analysis and error pattern detection.</p>
        </div>
        <div className="flex gap-2 mb-1">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 text-[11px] font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" /> ROS2 Compatible
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-hanwha-orange/5 text-hanwha-orange rounded-full border border-hanwha-orange/10 text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5" /> AI Powered
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 overflow-hidden">
        <div className="flex flex-col gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col gap-4 flex-1">
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-slate-700">Log Data Input</label>
                <button className="text-[11px] font-bold text-hanwha-orange flex items-center gap-1 hover:underline">
                  <Upload className="w-3 h-3" /> Upload .log / .csv
                </button>
              </div>
              <textarea
                value={logContent}
                onChange={(e) => setLogContent(e.target.value)}
                placeholder="Paste ROS2 logs or simulation output here..."
                className="flex-1 w-full bg-hanwha-black border border-slate-800 rounded-2xl p-6 font-mono text-sm text-hanwha-orange focus:ring-2 focus:ring-hanwha-orange outline-none resize-none leading-relaxed"
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !logContent.trim()}
              className="w-full bg-hanwha-orange hover:bg-hanwha-orange/90 text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-bold transition-all disabled:opacity-50 group"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Identifying Error Patterns...
                </>
              ) : (
                <>
                  <Activity className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Start AI Deep Analysis
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm flex flex-col overflow-hidden relative">
          {!analysis && !isAnalyzing && (
            <div className="absolute inset-0 bg-hanwha-light/50 backdrop-blur-[2px] flex flex-col items-center justify-center p-12 text-center">
              <div className="w-20 h-20 bg-white border border-slate-200 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                <AlertCircle className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-hanwha-black">No Analysis Results</h3>
              <p className="text-sm text-hanwha-gray mt-2 max-w-xs font-medium">
                Paste your log data and click the analysis button to identify root causes and suggested fixes.
              </p>
            </div>
          )}
          
          <div className="p-4 border-b border-slate-100 bg-white flex justify-between items-center shrink-0">
            <span className="text-xs font-bold text-hanwha-gray uppercase tracking-widest flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-hanwha-orange" /> Analysis Report
            </span>
          </div>
          
          <div className="flex-1 p-8 overflow-y-auto prose prose-slate max-w-none bg-hanwha-light/30">
            {isAnalyzing ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-6 bg-slate-200 rounded w-1/3"></div>
                <div className="h-4 bg-slate-100 rounded w-full"></div>
                <div className="h-4 bg-slate-100 rounded w-full"></div>
                <div className="h-4 bg-slate-100 rounded w-2/3"></div>
              </div>
            ) : (
              <div className="markdown-body">
                <ReactMarkdown>{analysis}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogAnalyzer;
