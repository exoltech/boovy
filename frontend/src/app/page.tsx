'use client';

import { useState } from 'react';
import TerminalPrompt from '@/components/TerminalPrompt';
import CodeEditor from '@/components/CodeEditor';
import ThemeToggle from '@/components/ThemeToggle';
import GenerationOutput from '@/components/GenerationOutput';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Dashboard() {
  const [theme, setTheme] = useState('neon');
  const [generatedCode, setGeneratedCode] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState<any>(null);

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);
    try {
      // Call backend API to generate app configuration
      const response = await fetch('http://localhost:3001/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const result = await response.json();
      
      if (result.success) {
        setGenerationResult(result.data);
        
        // Call scaffold API to generate code
        const scaffoldResponse = await fetch('http://localhost:3001/api/scaffold', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ config: result.data }),
        });

        const scaffoldResult = await scaffoldResponse.json();
        
        if (scaffoldResult.success) {
          setGeneratedCode(scaffoldResult.data.files);
        }
      }
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 theme-${theme}`}>
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <AnimatedBackground theme={theme} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="border-b border-primary/20 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary glow-text">
                BOOVY
              </h1>
              <span className="text-sm text-muted-foreground">
                Vibe-Based Coding Platform
              </span>
            </div>
            <ThemeToggle theme={theme} onThemeChange={setTheme} />
          </div>
        </header>

        {/* Main Dashboard */}
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
            {/* Left Panel - Terminal & Output */}
            <div className="space-y-6">
              <TerminalPrompt 
                onGenerate={handleGenerate} 
                isGenerating={isGenerating}
                theme={theme}
              />
              
              {generationResult && (
                <GenerationOutput 
                  result={generationResult}
                  theme={theme}
                />
              )}
            </div>

            {/* Right Panel - Code Editor */}
            <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg overflow-hidden">
              <div className="border-b border-primary/20 px-4 py-2 bg-background/50">
                <h3 className="text-sm font-medium text-primary">Generated Code</h3>
              </div>
              <CodeEditor 
                files={generatedCode}
                theme={theme}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

