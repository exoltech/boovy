'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import MainWorkspace from '@/components/MainWorkspace';
import RightPanel from '@/components/RightPanel';
import ProfileDropdown from '@/components/ProfileDropdown';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Dashboard() {
  const [theme, setTheme] = useState('neon');
  const [generatedApps, setGeneratedApps] = useState([
    {
      id: '1',
      name: 'E-commerce Store',
      description: 'Full-featured online store with payments and inventory management',
      tags: ['Next.js', 'Stripe', 'Supabase', 'TypeScript'],
      createdAt: '2024-01-15',
      status: 'completed' as const
    },
    {
      id: '2',
      name: 'Portfolio Blog',
      description: 'Personal blog with dark mode and markdown support',
      tags: ['Next.js', 'Markdown', 'Tailwind'],
      createdAt: '2024-01-14',
      status: 'completed' as const
    },
    {
      id: '3',
      name: 'Task Manager',
      description: 'Collaborative task management app with real-time updates',
      tags: ['React', 'Firebase', 'Real-time'],
      createdAt: '2024-01-13',
      status: 'generating' as const
    },
    {
      id: '4',
      name: 'AI Chat Assistant',
      description: 'Intelligent chatbot with OpenAI integration',
      tags: ['Next.js', 'OpenAI', 'Vercel'],
      createdAt: '2024-01-12',
      status: 'completed' as const
    }
  ]);

  const handleGenerate = async (prompt: string) => {
    // Add new app to the list with generating status
    const newApp = {
      id: Date.now().toString(),
      name: prompt.slice(0, 30) + (prompt.length > 30 ? '...' : ''),
      description: prompt,
      tags: ['Generating...'],
      createdAt: new Date().toISOString().split('T')[0],
      status: 'generating' as const
    };

    setGeneratedApps(prev => [newApp, ...prev]);

    // Simulate API call
    setTimeout(() => {
      setGeneratedApps(prev => 
        prev.map(app => 
          app.id === newApp.id 
            ? { 
                ...app, 
                status: 'completed' as const, 
                tags: ['Next.js', 'TypeScript', 'Tailwind', 'Supabase'],
                name: prompt.slice(0, 25) + (prompt.length > 25 ? '...' : '')
              }
            : app
        )
      );
    }, 3000);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 theme-${theme}`}>
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <AnimatedBackground theme={theme} />
      </div>

      {/* Main Layout */}
      <div className="relative z-10 flex h-screen">
        {/* Left Sidebar */}
        <Sidebar theme={theme} onThemeChange={setTheme} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <div className="glass border-b border-border/20 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold text-foreground">Dashboard</h2>
              <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                <span>•</span>
                <span>Welcome back!</span>
              </div>
            </div>
            <ProfileDropdown />
          </div>

          {/* Content */}
          <div className="flex-1 flex">
            {/* Center Panel */}
            <div className="flex-1">
              <MainWorkspace theme={theme} onGenerate={handleGenerate} />
            </div>

            {/* Right Panel */}
            <div className="w-80">
              <RightPanel theme={theme} apps={generatedApps} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}