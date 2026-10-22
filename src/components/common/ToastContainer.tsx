import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let Icon = Info;
        let bg = 'bg-slate-900 text-white border-slate-700';

        if (toast.type === 'success') {
          Icon = CheckCircle2;
          bg = 'bg-emerald-950 text-white border-emerald-700 shadow-emerald-950/20';
        } else if (toast.type === 'error') {
          Icon = AlertCircle;
          bg = 'bg-rose-950 text-white border-rose-700 shadow-rose-950/20';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          bg = 'bg-amber-950 text-white border-amber-700 shadow-amber-950/20';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl transition-all duration-300 animate-slide-in ${bg}`}
          >
            <Icon className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-400" />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold">{toast.title}</h4>
              <p className="text-xs text-gray-300 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
