/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface WorkProcess {
  id: string;
  category: 'VLA' | 'Autonomous' | 'ML/DL' | 'Other';
  title: string;
  steps: {
    id: string;
    label: string;
    completed: boolean;
  }[];
}

export interface Prompt {
  id: string;
  title: string;
  category: 'C++/ROS2' | 'Python' | 'Analysis' | 'Other';
  content: string;
  description: string;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  format: string; // Markdown template
}

export interface CodeSnippet {
  id: string;
  title: string;
  language: string;
  code: string;
  description: string;
}

export interface LogAnalysisRequest {
  logContent: string;
}

export interface DocGenerationRequest {
  templateId: string;
  inputData: string;
}
