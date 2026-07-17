import React, { useState } from 'react';
import { FileText, Wand2, Download, RefreshCw, Send, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';

const DocGenerator: React.FC = () => {
  const [inputData, setInputData] = useState('');
  const [template, setTemplate] = useState('Technical Review Memo');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDoc, setGeneratedDoc] = useState('');

  const handleGenerate = async () => {
    if (!inputData.trim()) return;
    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/generate-doc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateName: template, inputData }),
      });
      const data = await response.json();
      setGeneratedDoc(data.content);
    } catch (error) {
      console.error('Generation failed:', error);
      setGeneratedDoc('## Error\nFailed to generate document. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const templates = [
    'Technical Review Memo',
    'Meeting Minutes (Autonomous Team)',
    'Test Result Summary',
    'Standard Operating Procedure (SOP)',
    'Sensor Calibration Report'
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto h-[calc(100vh-2rem)] flex flex-col">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Doc Generator</h2>
        <p className="text-slate-500 mt-1">AI-powered technical document generation for Aerospace/Autonomous standards.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 overflow-hidden">
        {/* Input Section */}
        <div className="flex flex-col gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Select Template</label>
              <div className="grid grid-cols-1 gap-2">
                {templates.map(t => (
                  <button
                    key={t}
                    onClick={() => setTemplate(t)}
                    className={`text-left px-4 py-3 rounded-xl border text-sm transition-all flex items-center justify-between group ${
                      template === t 
                        ? 'bg-hanwha-orange/5 border-hanwha-orange/30 text-hanwha-orange font-bold' 
                        : 'border-slate-100 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    {t}
                    <FileText className={`w-4 h-4 ${template === t ? 'text-hanwha-orange' : 'text-slate-300 group-hover:text-slate-400'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 min-h-[200px] flex flex-col">
              <label className="block text-sm font-bold text-slate-700 mb-2">Key Highlights / Data</label>
              <textarea
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder="Paste your rough notes, data points, or test results here..."
                className="flex-1 w-full bg-hanwha-light border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-hanwha-orange outline-none resize-none"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !inputData.trim()}
              className="w-full bg-hanwha-black hover:bg-black text-white py-4 rounded-xl flex items-center justify-center gap-3 font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Professional Draft...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 text-hanwha-orange group-hover:scale-110 transition-transform" />
                  Generate Document Draft
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-hanwha-light flex justify-between items-center">
            <span className="text-xs font-bold text-hanwha-gray uppercase tracking-widest">Document Preview</span>
            {generatedDoc && (
              <button 
                onClick={() => {
                  const blob = new Blob([generatedDoc], { type: 'text/markdown' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${template.replace(/\s/g, '_')}.md`;
                  a.click();
                }}
                className="text-xs font-bold text-hanwha-orange hover:bg-hanwha-orange/5 px-3 py-1.5 rounded-lg border border-hanwha-orange/20 flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                Download .md
              </button>
            )}
          </div>
          <div className="flex-1 p-8 overflow-y-auto prose prose-slate max-w-none">
            {generatedDoc ? (
              <div className="markdown-body">
                <ReactMarkdown>{generatedDoc}</ReactMarkdown>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-4">
                <FileText className="w-16 h-16 stroke-[1]" />
                <p className="text-sm font-medium">Your generated document will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocGenerator;
