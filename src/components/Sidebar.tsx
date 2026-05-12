import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

export interface SidebarMenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  children?: SidebarMenuItem[];
}

interface SidebarProps {
  items: SidebarMenuItem[];
  activeItem?: string;
  onItemClick?: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ items, activeItem, onItemClick }) => {
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  const toggleGroup = (id: string) => {
    setExpandedGroups(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const renderItems = (menuItems: SidebarMenuItem[], level = 0) => {
    return menuItems.map(item => (
      <div key={item.id}>
        <button
          onClick={() => {
            if (item.children) {
              toggleGroup(item.id);
            } else {
              onItemClick?.(item.id);
              item.onClick?.();
            }
          }}
          className={`w-full flex items-center gap-3 px-4 py-2 text-left font-medium transition-colors ${
            activeItem === item.id
              ? 'bg-cacao-600 text-white'
              : 'text-gris-300 hover:bg-gris-800'
          }`}
          style={{ paddingLeft: `${(level + 1) * 1 + 1}rem` }}
        >
          {item.icon}
          <span className="flex-1">{item.label}</span>
          {item.children && (
            expandedGroups.includes(item.id) ? <ChevronDown size={18} /> : <ChevronRight size={18} />
          )}
        </button>

        {item.children && expandedGroups.includes(item.id) && (
          <div className="bg-gris-800 bg-opacity-50">
            {renderItems(item.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <nav className="flex flex-col h-full bg-gris-900">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-gris-800">
        <h2 className="text-xl font-bold text-cacao-400">CSJ</h2>
        <p className="text-xs text-gris-500 mt-1">Cacao San Jose</p>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto">
        {renderItems(items)}
      </div>

      {/* Footer */}
      <div className="border-t border-gris-800 px-4 py-2">
        <p className="text-xs text-gris-500">v1.0.0</p>
      </div>
    </nav>
  );
};
