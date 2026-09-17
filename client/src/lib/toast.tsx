import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { TickCircle } from 'iconsax-react';

type ToastItem = { id: number; message: string };
type ToastContextValue = { showToast: (message: string) => void };

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setToasts((previous) => [...previous, { id, message }]);
    window.setTimeout(() => {
      setToasts((previous) => previous.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {createPortal(
        <div className="fixed top-[calc(var(--nav-h)+16px)] right-4 z-[200] flex flex-col items-end gap-2 px-4 sm:px-0">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className="flex items-center gap-2 rounded-lg bg-ink px-4 py-3 text-sm font-medium text-white shadow-2xl"
              style={{ animation: 'toast-in 200ms ease-out' }}
            >
              <TickCircle size={18} variant="Bold" color="#22c55e" />
              {toast.message}
            </div>
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
