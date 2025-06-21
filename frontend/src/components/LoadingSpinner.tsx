'use client';

interface LoadingSpinnerProps {
  theme: string;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export default function LoadingSpinner({ theme, size = 'md', text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const getSpinnerStyle = () => {
    switch (theme) {
      case 'neon':
        return 'border-blue-500 border-t-pink-500';
      case 'retro':
        return 'border-green-500 border-t-green-300';
      case 'lofi':
        return 'border-amber-500 border-t-green-500';
      default:
        return 'border-gray-300 border-t-blue-500';
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div 
        className={`${sizeClasses[size]} border-2 border-t-transparent rounded-full animate-spin ${getSpinnerStyle()}`}
      />
      {text && (
        <span className="text-sm text-muted-foreground">{text}</span>
      )}
    </div>
  );
}

