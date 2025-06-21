'use client';

import { useState } from 'react';
import { 
  Clock, 
  Download, 
  ExternalLink, 
  MoreVertical,
  CheckCircle,
  Loader,
  Tag,
  ChevronDown,
  Star,
  GitBranch
} from 'lucide-react';

interface App {
  id: string;
  name: string;
  description: string;
  tags: string[];
  createdAt: string;
  status: 'generating' | 'completed' | 'error';
}

interface RightPanelProps {
  theme: string;
  apps: App[];
}

export default function RightPanel({ theme, apps }: RightPanelProps) {
  const [activeTab, setActiveTab] = useState('recent');

  const integrations = [
    { name: 'Supabase', logo: '🗄️', color: 'bg-green-500/10 text-green-600 border-green-500/20' },
    { name: 'Stripe', logo: '💳', color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
    { name: 'Firebase', logo: '🔥', color: 'bg-orange-500/10 text-orange-600 border-orange-500/20' },
    { name: 'Vercel', logo: '▲', color: 'bg-gray-500/10 text-gray-600 border-gray-500/20' },
    { name: 'Tailwind', logo: '🎨', color: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20' },
    { name: 'Next.js', logo: '⚡', color: 'bg-purple-500/10 text-purple-600 border-purple-500/20' },
  ];

  const getStatusIcon = (status: App['status']) => {
    switch (status) {
      case 'generating':
        return <Loader className="w-4 h-4 animate-spin text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <div className="w-4 h-4 rounded-full bg-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: App['status']) => {
    switch (status) {
      case 'generating':
        return 'Generating...';
      case 'completed':
        return 'Ready';
      case 'error':
        return 'Error';
      default:
        return '';
    }
  };

  return (
    <div className="h-full glass flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Apps</h2>
          <button className="p-1.5 rounded-md hover:bg-muted/50 transition-colors">
            <MoreVertical className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-1 bg-muted/30 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('recent')}
            className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === 'recent'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Recent
          </button>
          <button
            onClick={() => setActiveTab('starred')}
            className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === 'starred'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Starred
          </button>
        </div>
      </div>

      {/* Apps List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-4 space-y-3">
          {apps.map((app) => (
            <div
              key={app.id}
              className="glass-subtle rounded-lg p-4 hover-lift transition-all duration-200 border border-border/20"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground truncate mb-1">
                    {app.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {app.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2 ml-2">
                  {getStatusIcon(app.status)}
                  <button className="p-1 rounded hover:bg-muted/50 transition-colors">
                    <Star className="w-3 h-3 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {app.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
                {app.tags.length > 3 && (
                  <span className="text-xs text-muted-foreground">
                    +{app.tags.length - 3} more
                  </span>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{app.createdAt}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {app.status === 'completed' && (
                    <>
                      <button className="p-1.5 rounded hover:bg-muted/50 transition-colors">
                        <Download className="w-3 h-3 text-muted-foreground" />
                      </button>
                      <button className="p-1.5 rounded hover:bg-muted/50 transition-colors">
                        <ExternalLink className="w-3 h-3 text-muted-foreground" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Integrations Section */}
      <div className="border-t border-border/20 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Integrations</h3>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {integrations.map((integration) => (
            <button
              key={integration.name}
              className={`glass-subtle p-2 rounded-lg text-center hover-lift transition-all duration-200 border ${integration.color}`}
            >
              <div className="text-lg mb-1">{integration.logo}</div>
              <div className="text-xs font-medium truncate">
                {integration.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border-t border-border/20 p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-lg transition-all duration-200">
            <GitBranch className="w-4 h-4" />
            <span>Deploy to Vercel</span>
          </button>
          <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-lg transition-all duration-200">
            <Download className="w-4 h-4" />
            <span>Export as ZIP</span>
          </button>
        </div>
      </div>
    </div>
  );
}