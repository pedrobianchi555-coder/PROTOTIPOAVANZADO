import React, { ReactNode } from 'react';
import { Card, CardContent } from './Card';
import { TrendingUp } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: number; // Porcentaje de cambio
  color?: 'primary' | 'success' | 'warning' | 'error';
}

const colorStyles = {
  primary: 'bg-cacao-100 text-cacao-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  error: 'bg-red-100 text-red-700',
};

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = 'primary',
}) => {
  return (
    <Card hover>
      <CardContent>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-gris-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gris-900">{value}</p>
            {subtitle && <p className="text-xs text-gris-500 mt-1">{subtitle}</p>}
          </div>
          {icon && (
            <div className={`p-3 rounded-lg ${colorStyles[color]}`}>
              {icon}
            </div>
          )}
        </div>
        {trend !== undefined && (
          <div className="mt-3 flex items-center gap-1 text-sm">
            <TrendingUp size={16} className={trend > 0 ? 'text-green-600' : 'text-red-600'} />
            <span className={trend > 0 ? 'text-green-600' : 'text-red-600'}>
              {trend > 0 ? '+' : ''}{trend}%
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
