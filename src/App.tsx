/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import WorkProcessManager from './components/WorkProcess';
import PromptLibrary from './components/PromptLibrary';
import DocGenerator from './components/DocGenerator';
import SnippetManager from './components/SnippetManager';
import LogAnalyzer from './components/LogAnalyzer';
import CalibrationHelper from './components/CalibrationHelper';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveTab} />;
      case 'process':
        return <WorkProcessManager />;
      case 'prompts':
        return <PromptLibrary />;
      case 'docs':
        return <DocGenerator />;
      case 'snippets':
        return <SnippetManager />;
      case 'analyzer':
        return <LogAnalyzer />;
      case 'calibration':
        return <CalibrationHelper />;
      default:
        return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 antialiased overflow-hidden">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

