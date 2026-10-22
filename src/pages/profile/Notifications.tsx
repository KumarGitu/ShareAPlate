import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  CheckCircle2,
  Truck,
  Dog,
  ShieldAlert,
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';

export const Notifications: React.FC = () => {
  const { notifications, markNotificationRead, navigate } = useApp();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Real-Time Notifications
          </span>
          <h1 className="text-2xl font-black text-gray-900 mt-1">Platform Activity Alerts</h1>
        </div>

        <button
          onClick={() => notifications.forEach((n) => markNotificationRead(n.id))}
          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
        >
          Mark all as read
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs divide-y divide-gray-100 overflow-hidden">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-xs text-gray-400">No notifications yet.</div>
        ) : (
          notifications.map((notif) => {
            let Icon = Bell;
            let iconBg = 'bg-gray-100 text-gray-600';

            if (notif.type === 'claim') {
              Icon = CheckCircle2;
              iconBg = 'bg-emerald-100 text-emerald-700';
            } else if (notif.type === 'delivery') {
              Icon = Truck;
              iconBg = 'bg-blue-100 text-blue-700';
            } else if (notif.type === 'shelter') {
              Icon = Dog;
              iconBg = 'bg-amber-100 text-amber-700';
            } else if (notif.type === 'verification') {
              Icon = ShieldAlert;
              iconBg = 'bg-purple-100 text-purple-700';
            }

            return (
              <div
                key={notif.id}
                onClick={() => {
                  markNotificationRead(notif.id);
                  if (notif.linkPage) navigate(notif.linkPage as any);
                }}
                className={`p-5 flex items-start gap-4 transition-colors cursor-pointer hover:bg-gray-50/80 ${
                  !notif.read ? 'bg-emerald-50/20' : ''
                }`}
              >
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-gray-900">{notif.title}</h4>
                    <span className="text-[10px] text-gray-400">{notif.timestamp}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{notif.message}</p>
                </div>

                {!notif.read && (
                  <span className="w-2 h-2 rounded-full bg-emerald-600 self-center flex-shrink-0" />
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
