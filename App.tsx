
import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { SideNav } from './components/SideNav';
import { TopBar } from './components/TopBar';
import { ProductionRecipeModule } from './components/ProductionRecipeModule';
import { ReceptionForm } from './components/commercial/ReceptionForm';
import { InventoryTable } from './components/commercial/InventoryTable';
import { PurchaseOrderForm } from './components/commercial/PurchaseOrderForm';
import { PurchaseOrderTable } from './components/commercial/PurchaseOrderTable';
import { CommercialApprovals } from './components/commercial/CommercialApprovals';
import { PaymentOrderView } from './components/commercial/PaymentOrderView';
import { SackManagementView } from './components/commercial/SackManagementView';
import { InternalMovementsView } from './components/commercial/InternalMovementsView';
import { QualityControlView } from './components/commercial/QualityControlView';
import { ProductionOrderForm } from './components/production/ProductionOrderForm';
import { SamplesView } from './components/commercial/SamplesView';
import { EmptyingView } from './components/production/EmptyingView';
import { TraceabilityView } from './components/commercial/TraceabilityView';
import { ProductionBatchReport } from './components/production/ProductionBatchReport';
import { MaquilaView } from './components/production/MaquilaView';
import { MaquilaReportsView } from './components/production/Maquila/MaquilaReportsView';
import { WasteRegistryView } from './components/production/WasteRegistryView';
import { ProductionDispatchForm } from './components/production/ProductionDispatchForm'; // Imported
import { MaquilaProductionRegistry } from './components/production/Maquila/MaquilaProductionRegistry';
import { MaquilaInventoryView } from './components/production/Maquila/MaquilaInventoryView';
import { MaquilaDashboard } from './components/production/Maquila/MaquilaDashboard';
import { MaquilaSacksManagement } from './components/production/Maquila/MaquilaSacksManagement';
import PalletLocatorMap from './rtls/PalletLocatorMap';
import { PDDManagement } from './components/pdd/PDDManagement';
import { WarehouseManagementView } from './components/commercial/WarehouseManagementView';
import { NationalSalesView } from './components/commercial/NationalSalesView';
import { NationalClientsView } from './components/commercial/NationalClientsView';
import { CommercialAgreementForm } from './components/commercial/CommercialAgreementForm';
import { ExchangeRateView } from './components/finance/ExchangeRateView';
import { TreasuryManagement } from './components/finance/TreasuryManagement';
import { WeeklyForecastView } from './components/commercial/WeeklyForecastView';
import { LogisticsPlanningView } from './components/commercial/LogisticsPlanningView';
import { LogisticsTransportView } from './components/logistics/LogisticsTransportView';
import { ComexManagement } from './components/comex/ComexManagement';
import { DashboardView } from './components/dashboard/DashboardView';
import { KioskEmptying } from './components/production/KioskEmptying';
import { SystemLogsView } from './components/admin/SystemLogsView';
import { UserManagementView } from './components/admin/UserManagementView';
import { ProductionVariablesView } from './components/admin/ProductionVariablesView';
import { ClientsView } from './components/management/ClientsView';
import { ClientContractsView } from './components/management/ClientContractsView';
import { NyHedgesView } from './components/management/NyHedgesView';
import { FixationsView } from './components/management/FixationsView';
import { RiskManagementView } from './components/management/RiskManagementView';
import { SmartBlendingAI } from './components/quality/SmartBlendingAI';
import { SensorialCodCod } from './components/quality/SensorialCodCod';
import { SmartPhysicalBlendingAI } from './components/quality/SmartPhysicalBlendingAI';
import { RecipePrototyping } from './components/quality/RecipePrototyping';
import { ResultadosCodCod } from './components/quality/ResultadosCodCod';
import { CentralToPDDTransfer } from './components/production/CentralToPDDTransfer';
import { ReceptionFichasView } from './components/production/ReceptionFichasView';
import { SupplierManagement } from './components/sustainable/SupplierManagement';
import { TraceabilityReportView } from './components/sustainable/TraceabilityReportView';
import { ProducerCapacityReport } from './components/sustainable/ProducerCapacityReport';
import { SecurityCheckinForm } from './components/security/SecurityCheckinForm';
import CarroHProject from './CarroHProject';

import { CommercialDashboard } from './components/dashboards/CommercialDashboard';
import { QualityDashboard } from './components/dashboards/QualityDashboard';
import { ProductionDashboard } from './components/dashboards/ProductionDashboard';
import { LogisticsDashboard } from './components/dashboards/LogisticsDashboard';
import { FinanceDashboard } from './components/dashboards/FinanceDashboard';

import { NotificationProvider, useNotification } from './contexts/NotificationContext';
import { ConfirmationProvider } from './contexts/ConfirmationContext'; // NEW
import { NotificationToast } from './components/ui/NotificationToast';
import { AuthPage } from './components/AuthPage';
import { Session } from '@supabase/supabase-js';
import { Loader2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Refresh Triggers for sibling component synchronization
  const [poRefreshTrigger, setPoRefreshTrigger] = useState(0);
  const [inventoryRefreshTrigger, setInventoryRefreshTrigger] = useState(0);

  const handleOrderCreated = () => setPoRefreshTrigger(prev => prev + 1);
  const handleReceptionCreated = () => setInventoryRefreshTrigger(prev => prev + 1);

  // Auth State
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string>('');
  const [authLoading, setAuthLoading] = useState(true);

  const { setSessionUser } = useNotification();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserRole(session.user.id);
      } else {
        setAuthLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        fetchUserRole(session.user.id);
      } else {
        setUserRole('');
        setAuthLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role, active')
        .eq('id', userId)
        .single();

      if (data) {
        setUserRole(data.role);
        // Pass to notification context for filtering
        setSessionUser(userId, data.role);
      }
    } catch (e) {
      console.error("Error fetching role", e);
    } finally {
      setAuthLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!session) {
    return <AuthPage />;
  }

  // KIOSK MODE CHECK
  if (activeView === 'kiosk-emptying') {
    return <KioskEmptying onExit={() => setActiveView('dashboard')} />;
  }

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard': return <DashboardView onChangeView={setActiveView} />;

      // Dashboards
      case 'dash-commercial': return <CommercialDashboard />;
      case 'dash-quality': return <QualityDashboard />;
      case 'dash-production': return <ProductionDashboard />;
      case 'dash-logistics': return <LogisticsDashboard />;
      case 'dash-finance': return <FinanceDashboard />;

      // Production
      case 'production-recipe': return <ProductionRecipeModule userId={session.user.id} onCancel={() => setActiveView('dashboard')} />;
      case 'production-order': return <ProductionOrderForm onCancel={() => setActiveView('dashboard')} />;
      case 'production-report': return <ProductionBatchReport onCancel={() => setActiveView('dashboard')} userRole={userRole} />;
      case 'production-dispatch': return <ProductionDispatchForm onCancel={() => setActiveView('dashboard')} />;
      case 'emptying-process': return <EmptyingView onCancel={() => setActiveView('dashboard')} />;
      case 'pallet-locator': return <PalletLocatorMap />;
      case 'maquila-dashboard': return <MaquilaDashboard />;
      case 'maquila-production': return <MaquilaView userRole={userRole} onCancel={() => setActiveView('dashboard')} />;
      case 'maquila-inventory': return <MaquilaInventoryView />;
      case 'maquila-sacks': return <MaquilaSacksManagement />;
      case 'maquila-reports': return <MaquilaReportsView />;
      case 'maquila-production-registry': return <MaquilaProductionRegistry />;
      case 'waste-registry': return <WasteRegistryView userRole={userRole} />;
      case 'kiosk-emptying': return <KioskEmptying onExit={() => setActiveView('dashboard')} />;
      case 'reception-fichas': return <ReceptionFichasView />;

      // Commercial
      case 'reception': return <ReceptionForm onReceptionCreated={handleReceptionCreated} onCancel={() => setActiveView('dashboard')} />;
      case 'inventory': return <InventoryTable refreshTrigger={inventoryRefreshTrigger} />;
      case 'national-sales': return <NationalSalesView />;
      case 'national-clients': return <NationalClientsView />;
      case 'purchase-orders': return (
        <div className="space-y-6">
          <PurchaseOrderForm onOrderCreated={handleOrderCreated} onCancel={() => setActiveView('dashboard')} />
          <CommercialApprovals />
          <PurchaseOrderTable refreshTrigger={poRefreshTrigger} />
        </div>
      );
      case 'weekly-forecast': return <WeeklyForecastView />;
      case 'logistics-planning': return <LogisticsPlanningView />;
      case 'traceability': return <TraceabilityView onChangeView={setActiveView} />; // Trazabilidad Integral

      // Sustainable Development
      case 'traceability-report': return <TraceabilityReportView />;
      case 'producer-capacity-report': return <ProducerCapacityReport />;
      case 'supplier-management': return <SupplierManagement />;

      case 'sacks': return <SackManagementView />;
      case 'internal-movements': return <InternalMovementsView />;
      case 'samples-management': return <SamplesView onCancel={() => setActiveView('dashboard')} />;
      case 'warehouse-management': return <WarehouseManagementView />;

      // Quality
      case 'quality-control': return <QualityControlView onCancel={() => setActiveView('dashboard')} />;
      case 'smart-blending': return <SmartBlendingAI />;
      case 'smart-physical-blending': return <SmartPhysicalBlendingAI />;
      case 'sensorial-cod-cod': return <SensorialCodCod userId={session.user.id} />;
      case 'resultados-cod-cod': return <ResultadosCodCod userId={session.user.id} />;
      case 'recipe-prototyping': return <RecipePrototyping />;

      // Logistics
      case 'logistics-transport': return <LogisticsTransportView />;

      // Finance
      case 'payment-orders': return <PaymentOrderView />;
      case 'commercial-agreement': return <CommercialAgreementForm />;
      // ... other cases
      case 'exchange-rates': return <ExchangeRateView />;
      case 'treasury-management': return <TreasuryManagement />;

      // Comex
      case 'comex-management': return <ComexManagement />;
      // contract-structure removed and replaced by client-contracts below

      // Management (Admin)
      case 'clients-management': return <ClientsView />;
      case 'client-contracts': return <ClientContractsView />;
      case 'coberturas-ny': return <NyHedgesView />;
      case 'fixations': return <FixationsView />;
      case 'risk-management': return <RiskManagementView />;

      // Admin / Settings
      case 'user-management': return <UserManagementView />;
      case 'system-logs': return <SystemLogsView />;
      case 'production-variables': return <ProductionVariablesView />;

      // PDD
      case 'pdd-management': return (
        <div className="space-y-8">
          <CentralToPDDTransfer />
          <PDDManagement />
        </div>
      );

      // Security
      case 'security-checkin': return <SecurityCheckinForm userId={session.user.id} onCancel={() => setActiveView('dashboard')} />;

      // Projects
      case 'carro-h': return <CarroHProject />;

      default: return <DashboardView onChangeView={setActiveView} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      <SideNav
        activeView={activeView}
        onChangeView={setActiveView}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        userRole={userRole}
      />

      <div className="flex-1 flex flex-col overflow-hidden relative">
        <TopBar
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onNavigate={setActiveView}
          userEmail={session.user.email}
          userRole={userRole}
          userId={session.user.id}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 scrollbar-thin scrollbar-thumb-indigo-200">
          {renderContent()}
        </main>
        <NotificationToast />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <NotificationProvider>
      <ConfirmationProvider>
        <AppContent />
      </ConfirmationProvider>
    </NotificationProvider>
  );
}
