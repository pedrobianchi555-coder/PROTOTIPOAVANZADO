import React, { useState } from 'react';
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
} from '../components';
import { Plus, Truck, MapPin } from 'lucide-react';

interface Shipment {
  id: string;
  destination: string;
  quantity: number;
  weight: number;
  status: 'pending' | 'in_transit' | 'delivered';
  departureDate: string;
  estimatedArrival: string;
}

export const LogisticsView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [shipments] = useState<Shipment[]>([
    { id: 'SHP001', destination: 'Puerto de La Guaira', quantity: 500, weight: 10000, status: 'in_transit', departureDate: '2026-05-10', estimatedArrival: '2026-05-15' },
    { id: 'SHP002', destination: 'Caracas', quantity: 200, weight: 4000, status: 'delivered', departureDate: '2026-05-08', estimatedArrival: '2026-05-12' },
    { id: 'SHP003', destination: 'Valencia', quantity: 150, weight: 3000, status: 'pending', departureDate: '2026-05-13', estimatedArrival: '2026-05-17' },
  ]);

  const filteredShipments = searchQuery
    ? shipments.filter(s =>
        s.id.includes(searchQuery) || s.destination.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : shipments;

  const statusBadges = {
    pending: <Badge variant="warning">Pendiente</Badge>,
    in_transit: <Badge variant="primary">En Tránsito</Badge>,
    delivered: <Badge variant="success">Entregado</Badge>,
  };

  const stats = [
    { label: 'Envíos Activos', value: 5, color: 'primary' as const, icon: <Truck size={24} /> },
    { label: 'En Tránsito', value: 3, color: 'warning' as const },
    { label: 'Entregados Hoy', value: 2, color: 'success' as const },
    { label: 'Total Kg', value: '17,000', color: 'primary' as const, icon: <MapPin size={24} /> },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gris-900">Logística</h2>
          <p className="text-gris-600 mt-1">Seguimiento de envíos y planificación de transporte</p>
        </div>
        <Button variant="primary" size="lg">
          <Plus size={20} />
          Nuevo Envío
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

      {/* Shipments Table */}
      <Card>
        <CardHeader>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gris-900">Envíos</h3>
            <SearchFilter
              placeholder="Buscar por ID o destino..."
              onSearch={setSearchQuery}
              onReset={() => setSearchQuery('')}
            />
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {filteredShipments.length > 0 ? (
            <Table striped hover>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>ID Envío</TableHeaderCell>
                  <TableHeaderCell>Destino</TableHeaderCell>
                  <TableHeaderCell align="right">Cantidad (sacos)</TableHeaderCell>
                  <TableHeaderCell align="right">Peso (kg)</TableHeaderCell>
                  <TableHeaderCell>Salida</TableHeaderCell>
                  <TableHeaderCell>Llegada Estimada</TableHeaderCell>
                  <TableHeaderCell>Estado</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredShipments.map(shipment => (
                  <TableRow key={shipment.id}>
                    <TableCell className="font-medium text-cacao-600">{shipment.id}</TableCell>
                    <TableCell>{shipment.destination}</TableCell>
                    <TableCell align="right">{shipment.quantity}</TableCell>
                    <TableCell align="right">{shipment.weight.toLocaleString()}</TableCell>
                    <TableCell>{shipment.departureDate}</TableCell>
                    <TableCell>{shipment.estimatedArrival}</TableCell>
                    <TableCell>{statusBadges[shipment.status]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="p-8 text-center text-gris-500">
              <p>No se encontraron envíos.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
