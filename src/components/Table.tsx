import React, { ReactNode } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface TableProps {
  children: ReactNode;
  striped?: boolean;
  hover?: boolean;
}

export const Table: React.FC<TableProps> = ({ children, striped = true, hover = true }) => {
  const stripeClass = striped ? 'tbody tr:nth-child(odd) { background-color: #f9fafb; }' : '';
  const hoverClass = hover ? 'tbody tr:hover { background-color: #f3f4f6; }' : '';

  return (
    <div className="overflow-x-auto rounded-lg border border-gris-200 shadow-sm">
      <table className="w-full text-sm">
        <style>
          {`
            table tbody tr:nth-child(odd) { background-color: ${striped ? '#f9fafb' : 'white'}; }
            table tbody tr:hover { background-color: ${hover ? '#f3f4f6' : 'inherit'}; transition: background-color 0.2s; }
          `}
        </style>
        {children}
      </table>
    </div>
  );
};

interface TableHeadProps {
  children: ReactNode;
}

export const TableHead: React.FC<TableHeadProps> = ({ children }) => (
  <thead className="bg-gris-100 border-b border-gris-200">
    {children}
  </thead>
);

interface TableBodyProps {
  children: ReactNode;
}

export const TableBody: React.FC<TableBodyProps> = ({ children }) => (
  <tbody>{children}</tbody>
);

interface TableRowProps {
  children: ReactNode;
  onClick?: () => void;
  clickable?: boolean;
}

export const TableRow: React.FC<TableRowProps> = ({ children, onClick, clickable = false }) => (
  <tr
    onClick={onClick}
    className={clickable ? 'cursor-pointer' : ''}
  >
    {children}
  </tr>
);

interface TableHeaderCellProps {
  children: ReactNode;
  sortable?: boolean;
  sorted?: 'asc' | 'desc' | null;
  onSort?: () => void;
  align?: 'left' | 'center' | 'right';
}

export const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
  children,
  sortable = false,
  sorted = null,
  onSort,
  align = 'left'
}) => {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align];

  return (
    <th
      className={`px-4 py-3 font-semibold text-gris-700 ${alignClass} ${sortable ? 'cursor-pointer hover:bg-gris-200' : ''}`}
      onClick={sortable ? onSort : undefined}
    >
      <div className={`flex items-center gap-2 ${align === 'right' ? 'justify-end' : align === 'center' ? 'justify-center' : ''}`}>
        {children}
        {sortable && (
          <div className="text-gris-400">
            {sorted === 'asc' && <ChevronUp size={16} className="text-cacao-600" />}
            {sorted === 'desc' && <ChevronDown size={16} className="text-cacao-600" />}
            {!sorted && <ChevronUp size={16} className="opacity-30" />}
          </div>
        )}
      </div>
    </th>
  );
};

interface TableCellProps {
  children: ReactNode;
  align?: 'left' | 'center' | 'right';
}

export const TableCell: React.FC<TableCellProps> = ({ children, align = 'left' }) => {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align];

  return (
    <td className={`px-4 py-3 border-b border-gris-100 ${alignClass}`}>
      {children}
    </td>
  );
};
