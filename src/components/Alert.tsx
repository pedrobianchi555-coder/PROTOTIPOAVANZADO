import React, { ReactNode } from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

type AlertType = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  type?: AlertType;
  children: ReactNode;
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const alertStyles = {
  info: 'bg-blue-50 border-blue-200 text-blue-800',
  success: 'bg-green-50 border-green-200 text-green-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  error: 'bg-red-50 border-red-200 text-red-800',
};

const iconMap = {
  info: <Info size={20} className="text-blue-600" />,
  success: <CheckCircle size={20} className="text-green-600" />,
  warning: <AlertTriangle size={20} className="text-yellow-600" />,
  error: <AlertCircle size={20} className="text-red-600" />,
};

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  children,
  title,
  dismissible = false,
  onDismiss,
  className = ''
}) => {
  return (
    <div className={`border rounded-lg p-4 flex gap-3 ${alertStyles[type]} ${className}`}>
      {iconMap[type]}
      <div className="flex-1">
        {title && <p className="font-semibold mb-1">{title}</p>}
        <p className="text-sm">{children}</p>
      </div>
      {dismissible && (
        <button
          onClick={onDismiss}
          className="opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Cerrar alerta"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

interface ToastProps {
  type?: AlertType;
  message: string;
  onClose?: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  type = 'info',
  message,
  onClose,
  duration = 3000
}) => {
  React.useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const bgStyles = {
    info: 'bg-blue-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    error: 'bg-red-600',
  };

  return (
    <div className={`${bgStyles[type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slideInRight`}>
      {iconMap[type]}
      <p className="text-sm font-medium">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-auto opacity-80 hover:opacity-100 transition-opacity"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  children,
  onClose,
  footer,
  size = 'md'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-lg shadow-xl ${sizeStyles[size]} w-full`}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gris-200 p-4">
          <h2 className="text-lg font-bold text-gris-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gris-100 rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="border-t border-gris-200 p-4 flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
