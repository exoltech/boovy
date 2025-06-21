'use client';

import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  files: Record<string, string>;
  theme: string;
}

export default function CodeEditor({ files, theme }: CodeEditorProps) {
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [editorTheme, setEditorTheme] = useState('vs-dark');

  useEffect(() => {
    // Set editor theme based on app theme
    switch (theme) {
      case 'neon':
        setEditorTheme('vs-dark');
        break;
      case 'retro':
        setEditorTheme('vs-dark');
        break;
      case 'lofi':
        setEditorTheme('vs');
        break;
      default:
        setEditorTheme('vs-dark');
    }
  }, [theme]);

  useEffect(() => {
    // Auto-select first file when files change
    const fileNames = Object.keys(files);
    if (fileNames.length > 0 && !selectedFile) {
      setSelectedFile(fileNames[0]);
    }
  }, [files, selectedFile]);

  const getLanguage = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'ts':
      case 'tsx':
        return 'typescript';
      case 'js':
      case 'jsx':
        return 'javascript';
      case 'json':
        return 'json';
      case 'css':
        return 'css';
      case 'html':
        return 'html';
      case 'md':
        return 'markdown';
      case 'py':
        return 'python';
      default:
        return 'plaintext';
    }
  };

  const fileNames = Object.keys(files);

  if (fileNames.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <div className="text-4xl mb-4">⚡</div>
          <div>No code generated yet</div>
          <div className="text-sm mt-2">Enter a prompt to generate your app</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* File Tabs */}
      <div className="flex overflow-x-auto border-b border-primary/20 bg-background/30">
        {fileNames.map((filename) => (
          <button
            key={filename}
            onClick={() => setSelectedFile(filename)}
            className={`px-4 py-2 text-sm whitespace-nowrap border-r border-primary/20 transition-colors ${
              selectedFile === filename
                ? 'bg-primary/20 text-primary'
                : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
            }`}
          >
            {filename}
          </button>
        ))}
      </div>

      {/* Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          language={getLanguage(selectedFile)}
          theme={editorTheme}
          value={files[selectedFile] || ''}
          options={{
            readOnly: false,
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            wordWrap: 'on',
            folding: true,
            lineDecorationsWidth: 10,
            lineNumbersMinChars: 3,
            glyphMargin: false,
          }}
          loading={
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span>Loading editor...</span>
              </div>
            </div>
          }
        />
      </div>

      {/* Footer */}
      <div className="border-t border-primary/20 px-4 py-2 bg-background/30 flex items-center justify-between text-xs text-muted-foreground">
        <div>
          {fileNames.length} file{fileNames.length !== 1 ? 's' : ''} generated
        </div>
        <div className="flex items-center space-x-4">
          <span>{getLanguage(selectedFile)}</span>
          <span>UTF-8</span>
          <span>LF</span>
        </div>
      </div>
    </div>
  );
}

