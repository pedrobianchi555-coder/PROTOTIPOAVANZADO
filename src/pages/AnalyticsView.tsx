import React from 'react';
import { Card, CardHeader, CardContent, DashboardCard } from '../components';
import {
  CustomLineChart,
  CustomBarChart,
  CustomPieChart,
  CustomAreaChart,
} from '../components/Charts';
import { TrendingUp, Calendar, BarChart3 } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  // Datos de ejemplo para gráficos
  const productionData = [
    { mes: 'Enero', produccion: 1200, meta: 1500 },
    { mes: 'Febrero', produccion: 1800, meta: 1500 },
    { mes: 'Marzo', produccion: 1400, meta: 1500 },
    { mes: 'Abril', produccion: 2100, meta: 1500 },
    { mes: 'Mayo', produccion: 2200, meta: 1500 },
    { mes: 'Junio', produccion: 1950, meta: 1500 },
  ];

  const qualityData = [
    { mes: 'Enero', calidad: 7.8 },
    { mes: 'Febrero', calidad: 8.1 },
    { mes: 'Marzo', calidad: 8.3 },
    { mes: 'Abril', calidad: 8.5 },
    { mes: 'Mayo', calidad: 8.7 },
    { mes: 'Junio', calidad: 8.6 },
  ];

  const revenueData = [
    { mes: 'Enero', ingresos: 25000, gastos: 15000 },
    { mes: 'Febrero', ingresos: 32000, gastos: 16000 },
    { mes: 'Marzo', ingresos: 28000, gastos: 15000 },
    { mes: 'Abril', ingresos: 40000, gastos: 18000 },
    { mes: 'Mayo', ingresos: 45000, gastos: 19000 },
    { mes: 'Junio', ingresos: 42000, gastos: 19000 },
  ];

  const gradeDistribution = [
    { name: 'Superior', value: 45 },
    { name: 'Premium', value: 35 },
    { name: 'Estándar', value: 15 },
    { name: 'Especial', value: 5 },
  ];

  const shippingData = [
    { mes: 'Enero', envios: 12, completados: 10 },
    { mes: 'Febrero', envios: 18, completados: 16 },
    { mes: 'Marzo', envios: 14, completados: 12 },
    { mes: 'Abril', envios: 21, completados: 20 },
    { mes: 'Mayo', envios: 22, completados: 21 },
    { mes: 'Junio', envios: 19, completados: 18 },
  ];

  const stats = [
    { label: 'Producción Total YTD', value: '11,650 sacos', color: 'primary' as const, trend: 15 },
    { label: 'Calidad Promedio', value: '8.35/10', color: 'success' as const, trend: 8 },
    { label: 'Ingresos YTD', value: '$212,000', color: 'primary' as const, trend: 22 },
    { label: 'Tasa Entrega', value: '95.2%', color: 'success' as const, trend: 5 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gris-900 dark:text-white">Reportes y Análisis</h2>
        <p className="text-gris-600 dark:text-gris-400 mt-1">Dashboards de producción, calidad y finanzas</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <DashboardCard
            key={idx}
            title={stat.label}
            value={stat.value}
            color={stat.color}
            trend={stat.trend}
            icon={<BarChart3 size={24} />}
          />
        ))}
      </div>

      {/* Producción */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CustomBarChart
          title="Producción vs Meta"
          data={productionData}
          dataKey="produccion"
          fillColor="#8fa087"
        />
        <CustomLineChart
          title="Tendencia de Calidad"
          data={qualityData}
          dataKey="calidad"
          strokeColor="#6d7d66"
        />
      </div>

      {/* Ingresos y Distribución */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CustomAreaChart
          title="Ingresos vs Gastos"
          data={revenueData}
          dataKey="ingresos"
          fillColor="#8fa087"
        />
        <CustomPieChart
          title="Distribución por Grado"
          data={gradeDistribution}
          dataKey="value"
          nameKey="name"
        />
      </div>

      {/* Envíos */}
      <div>
        <CustomBarChart
          title="Envíos Completados"
          data={shippingData}
          dataKey="completados"
          fillColor="#d4a574"
        />
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card hover>
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-cacao-100 dark:bg-cacao-900 rounded-lg">
                <TrendingUp className="text-cacao-600 dark:text-cacao-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-gris-600 dark:text-gris-400">Crecimiento YTD</p>
                <p className="text-2xl font-bold text-gris-900 dark:text-white">+18.5%</p>
                <p className="text-xs text-green-600 mt-1">↑ +2.3% respecto a mes anterior</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Calendar className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-gris-600 dark:text-gris-400">Próximos 30 días</p>
                <p className="text-2xl font-bold text-gris-900 dark:text-white">8 eventos</p>
                <p className="text-xs text-gris-600 dark:text-gris-400 mt-1">3 inspecciones, 5 entregas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <BarChart3 className="text-green-600 dark:text-green-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-gris-600 dark:text-gris-400">Eficiencia</p>
                <p className="text-2xl font-bold text-gris-900 dark:text-white">94.8%</p>
                <p className="text-xs text-green-600 mt-1">↑ +1.2% respecto al mes anterior</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
