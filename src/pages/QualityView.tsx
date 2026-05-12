import React from 'react';
import { Card, CardHeader, CardContent, Button, Badge, DashboardCard } from '../components';
import { Plus, CheckCircle, AlertTriangle } from 'lucide-react';

export const QualityView: React.FC = () => {
  const stats = [
    { label: 'Muestras Analizadas', value: 156, color: 'success' as const, trend: 12 },
    { label: 'Promedio Calidad', value: '8.7/10', color: 'primary' as const, trend: 3 },
    { label: 'Muestras Rechazadas', value: 2, color: 'error' as const, trend: -50 },
    { label: 'Pendiente Análisis', value: 8, color: 'warning' as const, trend: 5 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gris-900">Control de Calidad</h2>
          <p className="text-gris-600 mt-1">Análisis sensorial y control de calidad de cacao</p>
        </div>
        <Button variant="primary" size="lg">
          <Plus size={20} />
          Nueva Muestra
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <DashboardCard
            key={idx}
            title={stat.label}
            value={stat.value}
            color={stat.color}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Quality Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Parámetros de Calidad */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gris-900">Parámetros de Calidad</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { param: 'Humedad', value: '6.5%', target: '6-7%', status: 'good' },
                { param: 'Fermentación', value: '8.2/10', target: '8+', status: 'good' },
                { param: 'Acidez', value: '1.2%', target: '< 1.3%', status: 'warning' },
                { param: 'Intensidad de Aroma', value: '9/10', target: '8+', status: 'good' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gris-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gris-900">{item.param}</p>
                    <p className="text-sm text-gris-600">Meta: {item.target}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-gris-900">{item.value}</span>
                    {item.status === 'good' && <CheckCircle className="text-green-600" size={20} />}
                    {item.status === 'warning' && <AlertTriangle className="text-yellow-600" size={20} />}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Grado de Calidad */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gris-900">Distribución por Grado</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { grade: 'Superior', percentage: 45, color: 'bg-cacao-600' },
                { grade: 'Premium', percentage: 35, color: 'bg-cacao-500' },
                { grade: 'Estándar', percentage: 15, color: 'bg-gris-400' },
                { grade: 'Especial', percentage: 5, color: 'bg-accent-gold' },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gris-700">{item.grade}</span>
                    <span className="text-sm font-semibold text-gris-900">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gris-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Analyses */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gris-900">Análisis Recientes</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { id: 'ANA-001', batch: 'LOTE-2026-001', date: '2026-05-12', result: 'Aprobado', grade: 'Superior' },
              { id: 'ANA-002', batch: 'LOTE-2026-002', date: '2026-05-12', result: 'Aprobado', grade: 'Premium' },
              { id: 'ANA-003', batch: 'LOTE-2026-003', date: '2026-05-11', result: 'Rechazado', grade: 'Especial' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border border-gris-200 rounded-lg hover:bg-gris-50 transition-colors">
                <div>
                  <p className="font-medium text-gris-900">{item.id}</p>
                  <p className="text-sm text-gris-600">{item.batch} • {item.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={item.result === 'Aprobado' ? 'success' : 'error'}>
                    {item.result}
                  </Badge>
                  <span className="text-sm font-medium text-gris-700">{item.grade}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
