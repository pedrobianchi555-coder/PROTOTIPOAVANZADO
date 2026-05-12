import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { ThemeProvider } from './contexts/ThemeContext';
import { MainLayout } from './layouts/MainLayout';
import { Header } from './components/Header';
import { Sidebar, SidebarMenuItem } from './components/Sidebar';
import { Card, CardContent } from './components/Card';
import { DashboardCard } from './components/DashboardCard';
import {
  LayoutDashboard,
  Package,
  Truck,
  Factory,
  TestTube,
  Settings,
  ShoppingCart,
  BarChart3,
} from 'lucide-react';
import { ProductionView } from './pages/ProductionView';
import { LogisticsView } from './pages/LogisticsView';
import { QualityView } from './pages/QualityView';
import { AnalyticsView } from './pages/AnalyticsView';

const AppContent: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [userName, setUserName] = useState('Usuario');

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // window.location.href = '/login';
      } else {
        const user = session.user;
        setUserName(user.email?.split('@')[0] || 'Usuario');
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  const menuItems: SidebarMenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    {
      id: 'production',
      label: 'Producción',
      icon: <Factory size={20} />,
    },
    {
      id: 'logistics',
      label: 'Logística',
      icon: <Truck size={20} />,
    },
    {
      id: 'quality',
      label: 'Control de Calidad',
      icon: <TestTube size={20} />,
    },
    {
      id: 'commercial',
      label: 'Comercial',
      icon: <ShoppingCart size={20} />,
    },
    {
      id: 'analytics',
      label: 'Reportes',
      icon: <BarChart3 size={20} />,
    },
    {
      id: 'settings',
      label: 'Configuración',
      icon: <Settings size={20} />,
    },
  ];

  // Renderizar vista según activeView
  const renderView = () => {
    switch (activeView) {
      case 'production':
        return <ProductionView />;
      case 'logistics':
        return <LogisticsView />;
      case 'quality':
        return <QualityView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'dashboard':
      default:
        return <DashboardContent />;
    }
  };

  return (
    <MainLayout
      sidebar={
        <Sidebar
          items={menuItems}
          activeItem={activeView}
          onItemClick={setActiveView}
        />
      }
      header={<Header userName={userName} onLogout={handleLogout} />}
    >
      <div className="p-4 md:p-6">
        {renderView()}
      </div>
    </MainLayout>
  );
};

// Dashboard Component
const DashboardContent: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold text-gris-900 dark:text-white">Bienvenido a CACAO SAN JOSE</h2>
        <p className="text-gris-600 dark:text-gris-400 mt-1">Sistema de Gestión Empresarial para Exportadores de Cacao Fino de Aroma</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Producción Total"
          value="1,234"
          subtitle="sacos completados"
          color="primary"
          trend={12}
          icon={<Package size={24} />}
        />
        <DashboardCard
          title="Calidad Promedio"
          value="8.5/10"
          subtitle="de las muestras"
          color="success"
          trend={5}
        />
        <DashboardCard
          title="Envíos Pendientes"
          value="23"
          subtitle="en tránsito"
          color="warning"
          trend={-8}
        />
        <DashboardCard
          title="Ingresos Mensuales"
          value="$45,230"
          subtitle="en ventas"
          color="primary"
          trend={18}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Production by Module */}
        <Card hover>
          <CardContent>
            <h3 className="text-lg font-semibold text-gris-900 dark:text-white mb-4">Producción por Módulo</h3>
            <div className="space-y-3">
              {[
                { module: 'Mezcla Premium', percentage: 40 },
                { module: 'Blend Especial', percentage: 30 },
                { module: 'Cacao Puro', percentage: 20 },
                { module: 'Otros', percentage: 10 },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gris-700 dark:text-gris-300">{item.module}</span>
                    <span className="text-sm font-semibold text-gris-900 dark:text-white">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gris-200 dark:bg-gris-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-cacao-600"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quality Indicators */}
        <Card hover>
          <CardContent>
            <h3 className="text-lg font-semibold text-gris-900 dark:text-white mb-4">Indicadores de Calidad</h3>
            <div className="space-y-3">
              {[
                { metric: 'Humedad', value: '6.5%', status: '✓' },
                { metric: 'Fermentación', value: '8.2/10', status: '✓' },
                { metric: 'Acidez', value: '1.2%', status: '⚠' },
                { metric: 'Aroma', value: '9/10', status: '✓' },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-gris-50 dark:bg-gris-800 rounded-lg">
                  <span className="text-sm font-medium text-gris-700 dark:text-gris-300">{item.metric}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gris-900 dark:text-white">{item.value}</span>
                    <span className={item.status === '✓' ? 'text-green-600 text-lg' : 'text-yellow-600 text-lg'}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card hover>
        <CardContent>
          <h3 className="text-lg font-semibold text-gris-900 dark:text-white mb-4">Actividad Reciente</h3>
          <div className="space-y-2">
            {[
              { action: 'Orden de producción PO001 completada', time: 'Hace 2 horas', icon: '✓' },
              { action: 'Envío SHP002 entregado en Valencia', time: 'Hace 4 horas', icon: '🚚' },
              { action: '3 nuevas muestras analizadas', time: 'Hace 1 día', icon: '🔬' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 pb-2 border-b border-gris-100 dark:border-gris-700 last:border-0">
                <span className="text-xl mt-1">{item.icon}</span>
                <div>
                  <p className="text-sm font-medium text-gris-900 dark:text-white">{item.action}</p>
                  <p className="text-xs text-gris-500 dark:text-gris-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
