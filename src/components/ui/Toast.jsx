import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

const ToastContext = createContext(null);

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const colorMap = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  error: 'border-red-200 bg-red-50 text-red-800',
  warning: 'border-amber-200 bg-amber-50 text-amber-800',
  info: 'border-blue-200 bg-blue-50 text-blue-800',
};

let toastId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, variant = 'info', duration = 4000) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, variant }]);
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message, variant = 'info', duration) => addToast(message, variant, duration),
    [addToast]
  );

  // Convenience methods
  toast.success = useCallback((msg, dur) => addToast(msg, 'success', dur), [addToast]);
  toast.error = useCallback((msg, dur) => addToast(msg, 'error', dur), [addToast]);
  toast.warning = useCallback((msg, dur) => addToast(msg, 'warning', dur), [addToast]);
  toast.info = useCallback((msg, dur) => addToast(msg, 'info', dur), [addToast]);

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      <div
        className="fixed bottom-4 right-4 z-[200] flex flex-col-reverse gap-2"
        aria-live="polite"
      >
        <AnimatePresence>
          {toasts.map((t) => {
            const Icon = icons[t.variant];
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`flex items-start gap-3 rounded-xl border px-4 py-3 shadow-soft-lg min-w-[300px] max-w-sm ${colorMap[t.variant]}`}
              >
                <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <p className="flex-1 text-sm font-medium">{t.message}</p>
                <button
                  onClick={() => removeToast(t.id)}
                  className="flex-shrink-0 rounded p-0.5 opacity-60 transition-opacity hover:opacity-100"
                  aria-label="Dismiss"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
