'use client';

import { useState, useRef, useEffect } from 'react';

interface TerminalPromptProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
  theme: string;
}

export default function TerminalPrompt({ onGenerate, isGenerating, theme }: TerminalPromptProps) {
  const [prompt, setPrompt] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    // Add to history
    setHistory(prev => [...prev, prompt]);
    setHistoryIndex(-1);

    // Generate app
    onGenerate(prompt);
    setPrompt('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setPrompt(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setPrompt('');
        } else {
          setHistoryIndex(newIndex);
          setPrompt(history[newIndex]);
        }
      }
    }
  };

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg overflow-hidden">
      {/* Terminal Header */}
      <div className="border-b border-primary/20 px-4 py-2 bg-background/50 flex items-center space-x-2">
        <div className="flex space-x-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-sm font-medium text-primary ml-4">
          boovy@terminal:~$
        </span>
      </div>

      {/* Terminal Content */}
      <div className="p-4 min-h-[300px] font-mono text-sm">
        {/* Welcome Message */}
        <div className="text-primary/80 mb-4">
          <div className="glow-text">Welcome to BOOVY v1.0.0</div>
          <div className="text-muted-foreground mt-1">
            Describe your dream app and watch it come to life...
          </div>
        </div>

        {/* Command History */}
        {history.map((cmd, index) => (
          <div key={index} className="mb-2">
            <div className="text-primary/60">
              <span className="text-accent">$</span> {cmd}
            </div>
            <div className="text-green-400 text-xs mt-1">
              ✓ App configuration generated
            </div>
          </div>
        ))}

        {/* Current Input */}
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <span className="text-accent">$</span>
          <input
            ref={inputRef}
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isGenerating ? "Generating..." : "Describe your app idea..."}
            disabled={isGenerating}
            className="flex-1 bg-transparent border-none outline-none text-primary placeholder-muted-foreground"
          />
          {isGenerating && (
            <div className="loading-dots">
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
        </form>

        {/* Help Text */}
        <div className="mt-4 text-xs text-muted-foreground">
          <div>Examples:</div>
          <div className="ml-2 mt-1 space-y-1">
            <div>• "Create a SaaS app with Stripe payments and user auth"</div>
            <div>• "Build a personal blog with dark mode"</div>
            <div>• "Make a todo app with Firebase backend"</div>
          </div>
          <div className="mt-2">
            Press ↑/↓ to navigate history • Enter to generate
          </div>
        </div>
      </div>
    </div>
  );
}

