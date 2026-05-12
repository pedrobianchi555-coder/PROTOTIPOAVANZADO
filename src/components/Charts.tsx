import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Card, CardContent } from './Card';

interface ChartProps {
  title: string;
  data: any[];
  height?: number;
}

// Colores corporativos
const COLORS = ['#8fa087', '#6d7d66', '#d4a574', '#71717a', '#52525b'];

/**
 * Gráfico de Línea
 */
interface LineChartProps extends ChartProps {
  dataKey: string;
  strokeColor?: string;
}

export const CustomLineChart: React.FC<LineChartProps> = ({
  title,
  data,
  dataKey,
  height = 300,
  strokeColor = '#8fa087'
}) => {
  return (
    <Card hover>
      <CardContent>
        <h3 className="text-lg font-semibold text-gris-900 dark:text-white mb-4">{title}</h3>
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
            <XAxis stroke="#71717a" />
            <YAxis stroke="#71717a" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e4e4e7',
                borderRadius: '8px',
              }}
              cursor={{ stroke: strokeColor }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={strokeColor}
              dot={{ fill: strokeColor }}
              activeDot={{ r: 6 }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

/**
 * Gráfico de Barras
 */
interface BarChartProps extends ChartProps {
  dataKey: string;
  fillColor?: string;
}

export const CustomBarChart: React.FC<BarChartProps> = ({
  title,
  data,
  dataKey,
  height = 300,
  fillColor = '#8fa087'
}) => {
  return (
    <Card hover>
      <CardContent>
        <h3 className="text-lg font-semibold text-gris-900 dark:text-white mb-4">{title}</h3>
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
            <XAxis stroke="#71717a" />
            <YAxis stroke="#71717a" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e4e4e7',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar dataKey={dataKey} fill={fillColor} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

/**
 * Gráfico de Pie
 */
interface PieChartProps extends ChartProps {
  dataKey: string;
  nameKey: string;
}

export const CustomPieChart: React.FC<PieChartProps> = ({
  title,
  data,
  dataKey,
  nameKey,
  height = 300,
}) => {
  return (
    <Card hover>
      <CardContent>
        <h3 className="text-lg font-semibold text-gris-900 dark:text-white mb-4">{title}</h3>
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey={dataKey}
              nameKey={nameKey}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

/**
 * Gráfico de Área
 */
interface AreaChartProps extends ChartProps {
  dataKey: string;
  fillColor?: string;
}

export const CustomAreaChart: React.FC<AreaChartProps> = ({
  title,
  data,
  dataKey,
  height = 300,
  fillColor = '#8fa087'
}) => {
  return (
    <Card hover>
      <CardContent>
        <h3 className="text-lg font-semibold text-gris-900 dark:text-white mb-4">{title}</h3>
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={fillColor} stopOpacity={0.8} />
                <stop offset="95%" stopColor={fillColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
            <XAxis stroke="#71717a" />
            <YAxis stroke="#71717a" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e4e4e7',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={fillColor}
              fillOpacity={1}
              fill="url(#colorArea)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
