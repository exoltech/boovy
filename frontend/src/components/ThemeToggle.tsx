'use client';

interface ThemeToggleProps {
  theme: string;
  onThemeChange: (theme: string) => void;
}

export default function ThemeToggle({ theme, onThemeChange }: ThemeToggleProps) {
  const themes = [
    { id: 'neon', name: 'Neon', icon: '⚡', colors: 'from-blue-500 to-pink-500' },
    { id: 'retro', name: 'Retro', icon: '🖥️', colors: 'from-green-500 to-green-300' },
    { id: 'lofi', name: 'Lo-Fi', icon: '🌿', colors: 'from-amber-500 to-green-500' },
  ];

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground">Theme:</span>
      <div className="flex space-x-1 bg-background/50 rounded-lg p-1 border border-primary/20">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => onThemeChange(t.id)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
              theme === t.id
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
            }`}
          >
            <span>{t.icon}</span>
            <span>{t.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

