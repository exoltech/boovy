'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Code, Palette, Database, CreditCard } from 'lucide-react';

interface MainWorkspaceProps {
  theme: string;
  onGenerate: (prompt: string) => void;
}

export default function MainWorkspace({ theme, onGenerate }: MainWorkspaceProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const suggestions = [
    { text: 'E-commerce store with Stripe payments', icon: CreditCard, color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
    { text: 'Portfolio website with blog', icon: Code, color: 'bg-purple-500/10 text-purple-600 border-purple-500/20' },
    { text: 'Task management app with real-time sync', icon: Database, color: 'bg-green-500/10 text-green-600 border-green-500/20' },
    { text: 'AI-powered chat assistant', icon: Sparkles, color: 'bg-pink-500/10 text-pink-600 border-pink-500/20' },
    { text: 'Social media dashboard', icon: Palette, color: 'bg-orange-500/10 text-orange-600 border-orange-500/20' },
  ];

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [prompt]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    onGenerate(prompt);
    
    // Simulate generation time
    setTimeout(() => {
      setIsGenerating(false);
      setPrompt('');
    }, 3000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="glass border-b border-border/20 px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Describe your dream app and watch it come to life
          </h1>
          <p className="text-muted-foreground">
            Use natural language to generate full-stack applications with modern frameworks and integrations.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Input Section */}
          <div className="glass rounded-2xl p-8 hover-lift">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your app idea... (e.g., 'Create a SaaS app with user authentication, Stripe payments, and a dashboard for managing subscriptions')"
                  className="w-full min-h-[120px] max-h-[300px] px-6 py-4 bg-background/50 border border-border/30 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 font-mono text-sm leading-relaxed"
                  disabled={isGenerating}
                />
                <div className="absolute bottom-4 right-4">
                  <button
                    type="submit"
                    disabled={!prompt.trim() || isGenerating}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      !prompt.trim() || isGenerating
                        ? 'bg-muted text-muted-foreground cursor-not-allowed'
                        : 'bg-primary text-primary-foreground hover:bg-primary/90 glow hover-lift'
                    }`}
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Generate App</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Suggestions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Start Ideas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestions.map((suggestion, index) => {
                const Icon = suggestion.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion.text)}
                    className={`glass-subtle p-4 rounded-xl text-left hover-lift transition-all duration-200 border ${suggestion.color}`}
                    disabled={isGenerating}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-medium leading-relaxed">
                        {suggestion.text}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-subtle rounded-xl p-6 text-center hover-lift">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">AI-Powered</h4>
              <p className="text-sm text-muted-foreground">
                Advanced language models understand your requirements and generate optimized code.
              </p>
            </div>

            <div className="glass-subtle rounded-xl p-6 text-center hover-lift">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code className="w-6 h-6 text-accent" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Full-Stack</h4>
              <p className="text-sm text-muted-foreground">
                Complete applications with frontend, backend, database, and deployment configurations.
              </p>
            </div>

            <div className="glass-subtle rounded-xl p-6 text-center hover-lift">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Database className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Modern Stack</h4>
              <p className="text-sm text-muted-foreground">
                Built with the latest frameworks, tools, and best practices for production-ready apps.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}