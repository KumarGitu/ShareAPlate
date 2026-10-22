import React from 'react';
import { useApp } from '../../context/AppContext';
import { Settings as SettingsIcon, Bell, Lock, MapPin, Shield, Check } from 'lucide-react';

export const Settings: React.FC = () => {
  const { currentUser, showToast } = useApp();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('success', 'Settings Updated', 'Your notification and account preferences have been saved.');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-700">
          <SettingsIcon className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-gray-900">Account Preferences</h1>
          <p className="text-xs text-gray-500">Configure real-time alerts, safety thresholds and location settings</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider pb-2 border-b border-gray-100 flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-600" />
            <span>Alert Configurations</span>
          </h3>

          <label className="flex items-center justify-between p-3 rounded-xl bg-gray-50 cursor-pointer">
            <div>
              <strong className="text-xs font-bold text-gray-900 block">Surplus Rescue Alerts</strong>
              <span className="text-[11px] text-gray-500">Instant notification when surplus food is posted in my radius</span>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded" />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-gray-50 cursor-pointer">
            <div>
              <strong className="text-xs font-bold text-gray-900 block">Shelter Fallback Dispatches</strong>
              <span className="text-[11px] text-gray-500">Alert me when unclaimed food triggers animal shelter matching</span>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded" />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-gray-50 cursor-pointer">
            <div>
              <strong className="text-xs font-bold text-gray-900 block">SMS OTP Delivery Release</strong>
              <span className="text-[11px] text-gray-500">Receive 4-digit pickup and handover OTPs on registered phone</span>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded" />
          </label>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
};
