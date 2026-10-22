import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { Shield, HeartHandshake, UserCheck, Dog, User } from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const { currentUser, switchUserRole } = useApp();

  const roles: { role: UserRole; label: string; icon: React.ReactNode; desc: string }[] = [
    { role: 'donor', label: 'Donor (Green Leaf)', icon: <HeartHandshake className="w-3.5 h-3.5 text-sap-orange-600" />, desc: 'Restaurant/Hotel surplus donor' },
    { role: 'recipient', label: 'Individual (Pooja)', icon: <User className="w-3.5 h-3.5 text-blue-600" />, desc: 'Claim food / Self pickup or delivery' },
    { role: 'ngo', label: 'NGO (Helping Hands)', icon: <UserCheck className="w-3.5 h-3.5 text-sap-green-600" />, desc: 'Verified NGO (Compulsory delivery)' },
    { role: 'shelter', label: 'Shelter (Happy Tails)', icon: <Dog className="w-3.5 h-3.5 text-amber-600" />, desc: 'Animal shelter fallback receiver' },
    { role: 'admin', label: 'Admin (Platform HQ)', icon: <Shield className="w-3.5 h-3.5 text-purple-600" />, desc: 'Approve NGOs & manage listings' },
  ];

  return (
    <div className="bg-sap-charcoal-900 text-white text-xs py-1.5 px-3 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-gray-300">Test Multi-Role Persona:</span>
          <span className="text-gray-400 hidden sm:inline">Active: <span className="text-emerald-400 font-medium">{currentUser.name}</span> ({currentUser.role.toUpperCase()})</span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {roles.map((r) => {
            const isActive = currentUser.role === r.role;
            return (
              <button
                key={r.role}
                onClick={() => switchUserRole(r.role)}
                title={r.desc}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-400'
                    : 'bg-gray-800/90 hover:bg-gray-700 text-gray-300'
                }`}
              >
                {r.icon}
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
