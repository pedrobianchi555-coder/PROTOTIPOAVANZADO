import React from 'react';
import { LogOut, Settings, User, Bell } from 'lucide-react';

interface HeaderProps {
  userName?: string;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ userName = 'Usuario', onLogout }) => {
  return (
    <div className="flex items-center justify-between w-full">
      {/* Logo / Brand */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-cacao-600">
          CACAO SAN JOSE
        </h1>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="p-2 hover:bg-gris-100 rounded-lg transition-colors relative">
          <Bell size={20} className="text-gris-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Menu */}
        <div className="flex items-center gap-3 pl-3 border-l border-gris-200">
          <div className="text-right">
            <p className="text-sm font-medium text-gris-900">{userName}</p>
            <p className="text-xs text-gris-500">Administrador</p>
          </div>
          <div className="w-10 h-10 bg-cacao-500 rounded-full flex items-center justify-center text-white font-bold">
            {userName.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Settings */}
        <button className="p-2 hover:bg-gris-100 rounded-lg transition-colors">
          <Settings size={20} className="text-gris-600" />
        </button>

        {/* Logout */}
        {onLogout && (
          <button
            onClick={onLogout}
            className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
          >
            <LogOut size={20} />
          </button>
        )}
      </div>
    </div>
  );
};
