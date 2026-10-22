import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  UtensilsCrossed,
  HeartHandshake,
  UserCheck,
  Dog,
  Shield,
  User,
  ArrowRight,
  Sparkles,
  Lock,
  Mail,
  Phone
} from 'lucide-react';

export const Login: React.FC = () => {
  const { switchUserRole, navigate, users } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('donor');
  const [emailOrPhone, setEmailOrPhone] = useState('');

  const handleQuickPersonaSelect = (role: UserRole) => {
    switchUserRole(role);
    if (role === 'donor') navigate('donor-dashboard');
    else if (role === 'ngo') navigate('ngo-dashboard');
    else if (role === 'recipient') navigate('recipient-dashboard');
    else if (role === 'admin') navigate('admin-dashboard');
    else if (role === 'shelter') navigate('animal-shelters');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleQuickPersonaSelect(selectedRole);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      
      {/* Brand Icon & Heading */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-500 text-white flex items-center justify-center mx-auto shadow-md">
          <UtensilsCrossed className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-black text-gray-900">
          {mode === 'login' ? 'Sign In to ShareAPlate' : 'Join ShareAPlate'}
        </h1>
        <p className="text-xs text-gray-500">
          {mode === 'login'
            ? 'Access your food rescue dashboard, claims, or NGO logistics'
            : 'How will you use ShareAPlate? Select your role to get started.'}
        </p>
      </div>

      {/* Main Auth Box */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-7 shadow-sm space-y-5">
        
        {/* Toggle Mode */}
        <div className="flex bg-gray-100 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              mode === 'login' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              mode === 'register' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* SECTION 25: ROLE SELECTION */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            {mode === 'login' ? 'Log in as Stakeholder Persona:' : 'How will you use ShareAPlate? *'}
          </label>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { role: 'donor' as const, label: 'Share Food', desc: 'Hotel / Restaurant / Caterer', icon: <HeartHandshake className="w-4 h-4 text-orange-500" /> },
              { role: 'recipient' as const, label: 'Receive Food', desc: 'Individual / Family in Need', icon: <User className="w-4 h-4 text-blue-500" /> },
              { role: 'ngo' as const, label: 'NGO', desc: 'Verified Relief Trust', icon: <UserCheck className="w-4 h-4 text-emerald-500" /> },
              { role: 'shelter' as const, label: 'Animal Shelter', desc: 'Sanctuary Fallback Partner', icon: <Dog className="w-4 h-4 text-amber-500" /> },
            ].map((r) => (
              <button
                key={r.role}
                type="button"
                onClick={() => setSelectedRole(r.role)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  selectedRole === r.role
                    ? 'border-emerald-600 bg-emerald-50/60 shadow-xs ring-1 ring-emerald-500 font-bold'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  {r.icon}
                  <span className="text-gray-900 font-bold">{r.label}</span>
                </div>
                <span className="text-[10px] text-gray-400 block">{r.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input credentials */}
        <form onSubmit={handleFormSubmit} className="space-y-3 pt-1">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email or Phone Number</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                placeholder="name@organization.com or +91..."
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Password / OTP</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                defaultValue="secret123"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>{mode === 'login' ? `Sign In as ${selectedRole.toUpperCase()}` : 'Register Account'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Fast Switch Direct Buttons */}
        <div className="pt-3 border-t border-gray-100 text-center">
          <p className="text-[11px] text-gray-400 mb-2 font-medium">Or 1-click test with pre-seeded demo accounts:</p>
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px]">
            <button
              onClick={() => handleQuickPersonaSelect('donor')}
              className="px-2.5 py-1 rounded-lg bg-orange-50 text-orange-800 font-semibold hover:bg-orange-100"
            >
              Donor (Green Leaf)
            </button>
            <button
              onClick={() => handleQuickPersonaSelect('ngo')}
              className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-semibold hover:bg-emerald-100"
            >
              Verified NGO (Helping Hands)
            </button>
            <button
              onClick={() => handleQuickPersonaSelect('admin')}
              className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-800 font-semibold hover:bg-purple-100"
            >
              Admin (HQ)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
