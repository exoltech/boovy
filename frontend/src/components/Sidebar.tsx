'use client';

import { useState } from 'react';
import { 
  Home, 
  History, 
  FolderOpen, 
  Palette, 
  User, 
  Settings,
  Zap,
  Monitor,
  Coffee
} from 'lucide-react';

interface SidebarProps {
  theme: string;
  onThemeChange: (theme: string) => void;
}

export default function Sidebar({ theme, onThemeChange }: SidebarProps) {
  const [activeNav, setActiveNav] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'history', label: 'History', icon: History },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'themes', label: 'Themes', icon: Palette },
    { id: 'account', label: 'Account', icon: User },
  ];

  const themes = [
    { id: 'neon', name: 'Neon', icon: Zap, color: 'from-blue-500 to-pink-500' },
    { id: 'retro', name: 'Retro', icon: Monitor, color: 'from-green-500 to-green-300' },
    { id: 'lofi', name: 'Lo-Fi', icon: Coffee, color: 'from-amber-500 to-green-500' },
  ];

  return (
    <div className="w-64 h-full glass border-r border-border/20 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border/20">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Boovy</h1>
            <p className="text-xs text-muted-foreground">Vibe-based coding</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  activeNav === item.id
                    ? 'bg-primary/10 text-primary border border-primary/20 glow'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Theme Selector */}
      <div className="p-4 border-t border-border/20">
        <div className="glass-subtle rounded-lg p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Theme</h3>
          <div className="space-y-2">
            {themes.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => onThemeChange(t.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-all duration-200 ${
                    theme === t.id
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{t.name}</span>
                  {theme === t.id && (
                    <div className="ml-auto w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="p-4 border-t border-border/20">
        <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
}