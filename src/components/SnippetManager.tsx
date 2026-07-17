import React, { useState, useEffect } from 'react';
import { Plus, Copy, Check, Terminal, Code, Trash2 } from 'lucide-react';
import { CodeSnippet } from '../types';
import { motion, AnimatePresence } from 'motion/react';

const SnippetManager: React.FC = () => {
  const [snippets, setSnippets] = useState<CodeSnippet[]>(() => {
    const saved = localStorage.getItem('code_snippets');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        title: 'ROS2 Publisher (C++)',
        language: 'cpp',
        code: '#include "rclcpp/rclcpp.hpp"\n#include "std_msgs/msg/string.hpp"\n\nclass MinimalPublisher : public rclcpp::Node {\npublic:\n  MinimalPublisher() : Node("minimal_publisher"), count_(0) {\n    publisher_ = this->create_publisher<std_msgs::msg::String>("topic", 10);\n  }\nprivate:\n  rclcpp::Publisher<std_msgs::msg::String>::SharedPtr publisher_;\n  size_t count_;\n};',
        description: 'Basic ROS2 publisher boilerplate in C++.'
      },
      {
        id: '2',
        title: 'Lidar Filter (Python)',
        language: 'python',
        code: 'def filter_lidar_data(points, min_range=0.5):\n    return points[points[:, 0] > min_range]',
        description: 'Simple range filter for Lidar point cloud processing.'
      }
    ];
  });

  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('code_snippets', JSON.stringify(snippets));
  }, [snippets]);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const addSnippet = () => {
    const newSnippet: CodeSnippet = {
      id: Date.now().toString(),
      title: 'New Snippet',
      language: 'cpp',
      code: '// Paste code here...',
      description: 'Brief description...'
    };
    setSnippets([newSnippet, ...snippets]);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Code Snippets</h2>
          <p className="text-slate-500 mt-1">Validated code blocks for ROS2 interfaces and sensor drivers.</p>
        </div>
        <button
          onClick={addSnippet}
          className="bg-slate-900 hover:bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all font-medium shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Snippet
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {snippets.map((snippet) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={snippet.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col"
            >
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                    <Terminal className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 leading-tight">{snippet.title}</h3>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{snippet.language}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSnippets(prev => prev.filter(s => s.id !== snippet.id))}
                  className="p-2 hover:bg-red-50 text-slate-300 hover:text-red-500 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5 flex-1 flex flex-col gap-3">
                <p className="text-sm text-slate-600 line-clamp-2">{snippet.description}</p>
                <div className="relative group/code flex-1 min-h-[150px]">
                  <pre className="bg-slate-900 rounded-xl p-4 font-mono text-[11px] text-slate-300 h-full overflow-x-auto whitespace-pre">
                    {snippet.code}
                  </pre>
                  <button
                    onClick={() => copyCode(snippet.code, snippet.id)}
                    className="absolute top-2 right-2 p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 opacity-0 group-hover/code:opacity-100 transition-all shadow-lg"
                  >
                    {copiedId === snippet.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SnippetManager;
