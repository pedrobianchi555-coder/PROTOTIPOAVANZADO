import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { MainLayout } from './layouts/MainLayout';
import { Header } from './components/Header';
import { Sidebar, SidebarMenuItem } from './components/Sidebar';
import {
  LayoutDashboard,
  Package,
  Truck,
  Factory,
  TestTube,
  Settings,
  LogOut,
} from 'lucide-react';
import { Card, CardContent } from './components/Card';
import { Button } from './components/Button';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [userName, setUserName] = useState('Usuario');

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // Redirect to login
        window.location.href = '/login';
      } else {
        // Get user profile
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
      children: [
        {
          id: 'recipes',
          label: 'Recetas',
          icon: <Package size={20} />,
        },
        {
          id: 'orders',
          label: 'Órdenes de Producción',
          icon: <Package size={20} />,
        },
      ],
    },
    {
      id: 'logistics',
      label: 'Logística',
      icon: <Truck size={20} />,
      children: [
        {
          id: 'shipments',
          label: 'Envíos',
          icon: <Truck size={20} />,
        },
        {
          id: 'routes',
          label: 'Rutas',
          icon: <Truck size={20} />,
        },
      ],
    },
    {
      id: 'quality',
      label: 'Control de Calidad',
      icon: <TestTube size={20} />,
    },
    {
      id: 'settings',
      label: 'Configuración',
      icon: <Settings size={20} />,
    },
  ];

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
      {/* Content Area */}
      <div className="p-lg">
        {activeView === 'dashboard' && (
          <div>
            <h2 className="text-2xl font-bold text-gris-900 mb-lg">
              Bienvenido a CACAO SAN JOSE
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
              {/* Stats Cards */}
              {[
                { label: 'Producción Total', value: '1,234 sacos', color: 'bg-cacao-100' },
                { label: 'Calidad Promedio', value: '8.5/10', color: 'bg-green-100' },
                { label: 'Envíos Pendientes', value: '23', color: 'bg-yellow-100' },
                { label: 'Ingresos Mensuales', value: '$45,230', color: 'bg-blue-100' },
              ].map((stat, idx) => (
                <Card key={idx} hover>
                  <CardContent>
                    <p className="text-sm text-gris-600 mb-2">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color} inline-block px-3 py-1 rounded-lg`}>
                      {stat.value}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeView !== 'dashboard' && (
          <Card>
            <CardContent>
              <h3 className="text-xl font-bold text-gris-900 mb-md">
                {menuItems.find(item => item.id === activeView)?.label || 'Vista'}
              </h3>
              <p className="text-gris-600">
                Esta sección está siendo desarrollada. Aquí irán los componentes específicos para {activeView}.
              </p>
              <div className="mt-lg">
                <Button variant="primary">Cargar datos</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default App;
