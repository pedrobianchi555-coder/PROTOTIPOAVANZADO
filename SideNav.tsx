
import React, { useState } from 'react';
import {
  LayoutDashboard,
  Truck,
  ShoppingCart,
  Package,
  FileText,
  Map,
  ClipboardCheck,
  Factory,
  TestTube,
  ArrowDownCircle,
  Search,
  PieChart,
  ChevronDown,
  ChevronRight,
  Layers,
  Box,
  ShieldCheck,
  Settings,
  Building,
  DollarSign,
  TrendingUp,
  Route,
  Wallet,
  Home,
  Ship,
  BarChart2,
  Shield,
  Database,
  UserCheck,
  Briefcase,
  Users,
  FileSignature,
  Activity,
  Sliders,
  BrainCircuit,
  FlaskConical,
  Globe,
  Leaf,
  FilePlus2,
  Hammer
} from 'lucide-react';

interface Props {
  activeView: string;
  onChangeView: (view: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onLogout?: () => void; // Optional logout prop if needed
  userRole?: string;
}

type MenuItem = {
  id: string;
  label: string;
  icon: any;
  requiredRole?: string; // Add role requirement
};

type MenuGroup = {
  title: string;
  icon: any; // Icon for the group parent
  id: string; // Unique ID for toggle state
  items: MenuItem[];
  requiredRole?: string; // Role requirement for the entire group
};

export const SideNav: React.FC<Props> = ({ activeView, onChangeView, isOpen, onClose, userRole }) => {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['principal', 'produccion', 'pdd', 'sustainable', 'materia_prima', 'calidad', 'logistica', 'comex', 'gerencia', 'proyectos', 'configuracion']);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const menuGroups: MenuGroup[] = [
    {
      title: 'PRINCIPAL',
      id: 'principal',
      icon: Home,
      items: [
        { id: 'dashboard', label: 'Dashboard General', icon: LayoutDashboard },
      ]
    },
    {
      title: 'PRODUCCIÓN CDP',
      id: 'produccion',
      icon: Factory,
      items: [
        { id: 'dash-production', label: 'Dash. Operativo', icon: BarChart2 },
        { id: 'waste-registry', label: 'Registro de Mermas', icon: TrendingUp },
        { id: 'inventory', label: 'Inventario de Lotes', icon: Layers },
        { id: 'reception', label: 'Recepción', icon: Truck },
        { id: 'internal-movements', label: 'Movimientos Internos', icon: Map },
        { id: 'sacks', label: 'Gestión de Sacos', icon: Package },
        { id: 'production-order', label: 'Orden de Producción', icon: FileText },
        { id: 'emptying-process', label: 'Vaciado', icon: ArrowDownCircle },
        { id: 'maquila-production', label: 'Producción por Maquila', icon: Settings },
        { id: 'production-report', label: 'Reporte Lote Producción', icon: PieChart },
        { id: 'traceability', label: 'Trazabilidad Integral', icon: Search },
        { id: 'reception-fichas', label: 'Fichas de Recepción', icon: FilePlus2 },
      ]
    },

    {
      title: 'PDD / DERIVADOS',
      id: 'pdd',
      icon: FlaskConical,
      items: [
        { id: 'pdd-management', label: 'Gestión de Planta PDD', icon: Factory },
      ]
    },
    {
      title: 'DESARROLLO SOSTENIBLE',
      id: 'sustainable',
      icon: Leaf,
      items: [
        { id: 'traceability-report', label: 'Informe de Trazabilidad', icon: FileText },
        { id: 'producer-capacity-report', label: 'Reporte de Capacidades', icon: BarChart2 },
      ]
    },
    {
      title: 'MATERIA PRIMA',
      id: 'materia_prima',
      icon: Box,
      items: [
        { id: 'dash-commercial', label: 'Dash. Comercial', icon: BarChart2 },
        { id: 'purchase-orders', label: 'Órdenes de Compra', icon: ShoppingCart },
        { id: 'supplier-management', label: 'Gestión de Prov/Prod', icon: Users }, // New
        { id: 'payment-orders', label: 'Órdenes de Pago', icon: Wallet },
        { id: 'weekly-forecast', label: 'Previsión Semanal', icon: TrendingUp },
        { id: 'logistics-planning', label: 'Logística de Despachos', icon: Route },
      ]
    },
    {
      title: 'LOGISTICA & TRANSPORTE',
      id: 'logistica',
      icon: Truck,
      items: [
        { id: 'dash-logistics', label: 'Dash. Logística', icon: BarChart2 },
        { id: 'logistics-transport', label: 'Despachos y Transporte', icon: Map },
      ]
    },
    {
      title: 'COMEX (EXPORTACIÓN)',
      id: 'comex',
      icon: Globe,
      items: [
        { id: 'comex-management', label: 'Gestión de Embarques', icon: Ship },
      ]
    },
    {
      title: 'GESTIÓN DE LA CALIDAD',
      id: 'calidad',
      icon: ShieldCheck,
      items: [
        { id: 'dash-quality', label: 'Dash. Calidad', icon: BarChart2 },
        { id: 'quality-control', label: 'Control de Calidad', icon: ClipboardCheck },
        { id: 'smart-blending', label: 'Inteligencia de Mezclas (S)', icon: BrainCircuit },
        { id: 'smart-physical-blending', label: 'Inteligencia de Mezclas (F)', icon: FlaskConical },
        { id: 'samples-management', label: 'Gestión de Muestras', icon: TestTube },
        { id: 'production-recipe', label: 'Generador de Recetas', icon: FileText },
        { id: 'sensorial-cod-cod', label: 'Sensorial COD-COD', icon: FlaskConical },
      ]
    },
    {
      title: 'GERENCIA (CONFIDENCIAL)',
      id: 'gerencia',
      icon: Briefcase,
      requiredRole: 'admin', // Restrict entire group to admins
      items: [
        { id: 'risk-management', label: 'Monitor de Riesgo', icon: Activity },
        { id: 'clients-management', label: 'Clientes', icon: Users },
        { id: 'client-contracts', label: 'Contratos Clientes', icon: FileSignature },
        { id: 'coberturas-ny', label: 'Coberturas NY', icon: TrendingUp },
      ]
    },
    {
      title: 'PROYECTOS',
      id: 'proyectos',
      icon: Hammer,
      items: [
        { id: 'carro-h', label: 'Carro H - Guía Lineal', icon: Factory },
      ]
    },
    {
      title: 'CONFIGURACIÓN',
      id: 'configuracion',
      icon: Settings,
      items: [
        { id: 'dash-finance', label: 'Dash. Financiero', icon: BarChart2 },
        { id: 'user-management', label: 'Gestión de Usuarios', icon: UserCheck, requiredRole: 'admin' },
        { id: 'production-variables', label: 'Variables Producción', icon: Sliders },
        { id: 'warehouse-management', label: 'Gestión de Almacenes', icon: Building },
        { id: 'exchange-rates', label: 'Tasas de Cambio (BCV)', icon: DollarSign },
        { id: 'system-logs', label: 'Logs de Auditoría', icon: Database },
      ]
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'qa': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'prod': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar - Pastel Theme (Light Indigo/Slate) */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-indigo-50 text-slate-700 transform transition-transform duration-300 ease-in-out flex flex-col border-r border-indigo-100 shadow-sm
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}>
        {/* Header */}
        <div className="flex flex-col h-20 px-6 bg-white border-b border-indigo-100 shrink-0 justify-center">
          <span className="text-xl font-bold tracking-tight text-indigo-900">
            Cacao<span className="text-indigo-500">Manager</span>
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border flex items-center gap-1 ${getRoleColor(userRole || 'user')}`}>
              {userRole === 'admin' && <Shield className="w-3 h-3" />}
              {userRole || 'Invitado'}
            </span>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-indigo-200">
          {menuGroups.map((group) => {
            // Check group level permission
            if (group.requiredRole && group.requiredRole !== userRole) return null;

            const isExpanded = expandedGroups.includes(group.id);
            const GroupIcon = group.icon;

            return (
              <div key={group.id} className="space-y-1">
                {/* Parent Group Button */}
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-indigo-400 uppercase tracking-wider hover:bg-indigo-100/50 rounded-md transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <GroupIcon className="w-4 h-4" />
                    <span>{group.title}</span>
                  </div>
                  {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                </button>

                {/* Children Items (Accordion) */}
                {isExpanded && (
                  <div className="space-y-1 pl-2 mt-1">
                    {group.items.map((item) => {
                      // Filter by role if required
                      if (item.requiredRole && item.requiredRole !== userRole) return null;

                      const ItemIcon = item.icon;
                      const isActive = activeView === item.id;
                      const isDashboard = item.id.startsWith('dash-') || item.id === 'dashboard';

                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            onChangeView(item.id);
                            if (window.innerWidth < 768) onClose();
                          }}
                          className={`
                            w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                            ${isActive
                              ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-indigo-100 translate-x-1'
                              : isDashboard ? 'text-indigo-600 hover:bg-indigo-50' : 'text-slate-600 hover:bg-indigo-100 hover:text-indigo-800 hover:translate-x-1'}
                          `}
                        >
                          <ItemIcon className={`w-4 h-4 mr-3 ${isActive ? 'text-indigo-500' : isDashboard ? 'text-indigo-400' : 'text-slate-400 group-hover:text-indigo-500'}`} />
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-indigo-100 bg-indigo-50 shrink-0">
          <p className="text-xs text-indigo-300 text-center font-medium">v3.3.1 - Unified Dash</p>
        </div>
      </aside>
    </>
  );
};
