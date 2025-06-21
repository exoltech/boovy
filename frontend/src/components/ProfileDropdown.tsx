'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  User, 
  Settings, 
  LogOut, 
  CreditCard, 
  HelpCircle,
  ChevronDown
} from 'lucide-react';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { icon: User, label: 'Profile', action: () => console.log('Profile') },
    { icon: Settings, label: 'Settings', action: () => console.log('Settings') },
    { icon: CreditCard, label: 'Billing', action: () => console.log('Billing') },
    { icon: HelpCircle, label: 'Help', action: () => console.log('Help') },
    { icon: LogOut, label: 'Sign Out', action: () => console.log('Sign Out'), danger: true },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-muted/50 transition-all duration-200"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-primary-foreground" />
        </div>
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-foreground">John Doe</div>
          <div className="text-xs text-muted-foreground">john@example.com</div>
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 glass rounded-lg border border-border/20 shadow-lg z-50">
          <div className="p-3 border-b border-border/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <div className="font-medium text-foreground">John Doe</div>
                <div className="text-sm text-muted-foreground">john@example.com</div>
              </div>
            </div>
          </div>
          <div className="p-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={() => {
                    item.action();
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                    item.danger
                      ? 'text-destructive hover:bg-destructive/10'
                      : 'text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}