import React, { useState } from 'react';
import { Copy, Check, Search, Filter, BookOpen } from 'lucide-react';
import { Prompt } from '../types';
import { motion } from 'motion/react';

const PromptLibrary: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [prompts] = useState<Prompt[]>([
    {
      id: 'p1',
      title: 'ROS2 Node Generator',
      category: 'C++/ROS2',
      description: 'Generate a template for a ROS2 subscriber/publisher node with custom interfaces.',
      content: 'Please create a ROS2 C++ node named [node_name] in the package [package_name]. It should include a subscriber to [input_topic] and a publisher to [output_topic]. Include standard logging and boilerplate code.'
    },
    {
      id: 'p2',
      title: 'Log Parser Script',
      category: 'Python',
      description: 'Create a Python script to parse CSV logs and extract error statistics.',
      content: 'Write a Python script using pandas to read a CSV log file with columns [timestamp, level, message]. Filter rows where level is ERROR or FATAL, and generate a summary report of error types.'
    },
    {
      id: 'p3',
      title: 'Legacy Code Explainer',
      category: 'Analysis',
      description: 'Ask AI to explain complex legacy C code with Doxygen-style comments.',
      content: 'Analyze the following legacy C function and explain the logic line-by-line. Then, generate Doxygen-style documentation comments for it including parameters and return values.'
    }
  ]);

  const copyToClipboard = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredPrompts = prompts.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-hanwha-black tracking-tight">Vibe Coding Prompts</h2>
          <p className="text-hanwha-gray mt-1 font-medium">Specialized prompt library for autonomous software development.</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search prompts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl w-full md:w-64 focus:ring-2 focus:ring-hanwha-orange outline-none transition-all font-medium"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredPrompts.map((prompt) => (
          <motion.div
            key={prompt.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-hanwha-orange/30 transition-colors group relative shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-hanwha-orange bg-hanwha-orange/5 px-2 py-0.5 rounded border border-hanwha-orange/10">
                    {prompt.category}
                  </span>
                </div>
                <h3 className="text-xl font-black text-hanwha-black tracking-tight">{prompt.title}</h3>
                <p className="text-hanwha-gray text-sm mt-1 font-medium">{prompt.description}</p>
              </div>
              <button
                onClick={() => copyToClipboard(prompt.content, prompt.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-black uppercase tracking-widest text-xs ${
                  copiedId === prompt.id 
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                    : 'bg-hanwha-light text-hanwha-black border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {copiedId === prompt.id ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Prompt
                  </>
                )}
              </button>
            </div>
            
            <div className="bg-hanwha-black rounded-xl p-4 font-mono text-sm text-slate-400 relative group-hover:text-slate-200 transition-colors">
              <div className="absolute top-2 right-2 text-[10px] text-hanwha-gray font-black uppercase tracking-widest">Markdown</div>
              {prompt.content}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PromptLibrary;
