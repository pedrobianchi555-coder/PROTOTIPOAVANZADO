import React, { useState, useMemo } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Badge,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  DashboardCard,
  SearchFilter,
  Pagination,
  Alert,
} from '../components';
import { Plus, Edit2, Trash2, ChefHat } from 'lucide-react';

interface ProductionOrder {
  id: string;
  recipeName: string;
  quantity: number;
  unit: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  date: string;
  assignedTo: string;
}

export const ProductionView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [orders] = useState<ProductionOrder[]>([
    { id: 'PO001', recipeName: 'Mezcla Premium', quantity: 500, unit: 'kg', status: 'in_progress', date: '2026-05-12', assignedTo: 'Juan' },
    { id: 'PO002', recipeName: 'Blend Especial', quantity: 300, unit: 'kg', status: 'completed', date: '2026-05-11', assignedTo: 'María' },
    { id: 'PO003', recipeName: 'Cacao Puro', quantity: 1200, unit: 'kg', status: 'pending', date: '2026-05-10', assignedTo: 'Carlos' },
    { id: 'PO004', recipeName: 'Mezcla Gourmet', quantity: 650, unit: 'kg', status: 'in_progress', date: '2026-05-09', assignedTo: 'Ana' },
  ]);

  const itemsPerPage = 10;

  // Filtrar datos
  const filteredOrders = useMemo(() => {
    return orders.filter(order =>
      order.recipeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Paginar datos
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [filteredOrders, currentPage]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const statusStyles = {
    pending: <Badge variant="warning">Pendiente</Badge>,
    in_progress: <Badge variant="primary">En Progreso</Badge>,
    completed: <Badge variant="success">Completado</Badge>,
    cancelled: <Badge variant="error">Cancelado</Badge>,
  };

  const stats = [
    { label: 'Órdenes Activas', value: 8, color: 'primary' as const, icon: <ChefHat size={24} /> },
    { label: 'Completadas Hoy', value: 3, color: 'success' as const },
    { label: 'En Progreso', value: 5, color: 'warning' as const },
    { label: 'Pendientes', value: 2, color: 'error' as const },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gris-900">Producción</h2>
          <p className="text-gris-600 mt-1">Gestión de órdenes de producción y recetas</p>
        </div>
        <Button variant="primary" size="lg">
          <Plus size={20} />
          Nueva Orden
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
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Alert */}
      <Alert type="info" title="Información">
        Hay 2 órdenes que requieren atención: PO001 y PO003
      </Alert>

      {/* Órdenes Table */}
      <Card>
        <CardHeader>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gris-900">Órdenes de Producción</h3>
            <SearchFilter
              placeholder="Buscar por nombre de receta o ID..."
              onSearch={setSearchQuery}
              onReset={() => {
                setSearchQuery('');
                setCurrentPage(1);
              }}
            />
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {paginatedOrders.length > 0 ? (
            <>
              <Table striped hover>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell sortable>ID Orden</TableHeaderCell>
                    <TableHeaderCell sortable>Receta</TableHeaderCell>
                    <TableHeaderCell align="right">Cantidad</TableHeaderCell>
                    <TableHeaderCell>Asignado a</TableHeaderCell>
                    <TableHeaderCell>Estado</TableHeaderCell>
                    <TableHeaderCell>Fecha</TableHeaderCell>
                    <TableHeaderCell align="center">Acciones</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedOrders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium text-cacao-600">{order.id}</TableCell>
                      <TableCell>{order.recipeName}</TableCell>
                      <TableCell align="right">{order.quantity} {order.unit}</TableCell>
                      <TableCell>{order.assignedTo}</TableCell>
                      <TableCell>{statusStyles[order.status]}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell align="center">
                        <div className="flex justify-center gap-2">
                          <button className="p-2 hover:bg-gris-100 rounded transition-colors text-cacao-600">
                            <Edit2 size={16} />
                          </button>
                          <button className="p-2 hover:bg-red-50 rounded transition-colors text-red-600">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="p-4 border-t border-gris-200">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="p-8 text-center text-gris-500">
              <p>No se encontraron órdenes de producción.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
