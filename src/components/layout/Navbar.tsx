import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AppPage } from '../../context/AppContext';
import {
  UtensilsCrossed,
  Sparkles,
  Search,
  PlusCircle,
  Building2,
  Dog,
  BarChart3,
  Bell,
  Menu,
  X,
  ShieldCheck,
  ChevronDown,
  LayoutDashboard
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, currentPage, navigate, notifications } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const navLinks: { id: AppPage; label: string; icon?: React.ReactNode; highlight?: boolean }[] = [
    { id: 'find-food', label: 'Find Food', icon: <Search className="w-4 h-4" /> },
    { id: 'share-food', label: '+ Share Surplus', icon: <PlusCircle className="w-4 h-4" /> },
    { id: 'celebrate-and-share', label: 'Celebrate & Share', icon: <Sparkles className="w-4 h-4 text-amber-500" />, highlight: true },
    { id: 'ngos', label: 'NGOs', icon: <Building2 className="w-4 h-4" /> },
    { id: 'animal-shelters', label: 'Animal Shelters', icon: <Dog className="w-4 h-4" /> },
    { id: 'impact', label: 'Live Impact', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  const getDashboardPage = (): AppPage => {
    switch (currentUser.role) {
      case 'donor':
        return 'donor-dashboard';
      case 'ngo':
        return 'ngo-dashboard';
      case 'recipient':
        return 'recipient-dashboard';
      case 'admin':
        return 'admin-dashboard';
      case 'shelter':
        return 'animal-shelters';
      default:
        return 'home';
    }
  };

  const getDashboardLabel = (): string => {
    switch (currentUser.role) {
      case 'donor':
        return 'Donor Dashboard';
      case 'ngo':
        return 'NGO Hub';
      case 'recipient':
        return 'Claims & Orders';
      case 'admin':
        return 'Admin Panel';
      case 'shelter':
        return 'Shelter Portal';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo */}
          <div
            onClick={() => navigate('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-gray-900 group-hover:text-emerald-700 transition-colors">
                  Share<span className="text-sap-orange-600">A</span>Plate
                </span>
                <span className="hidden md:inline-flex text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-full border border-emerald-200">
                  Free Rescue
                </span>
              </div>
              <p className="text-[10px] text-gray-400 font-medium -mt-1 hidden sm:block">
                Good Food Deserves a Second Plate
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => navigate(link.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 font-semibold shadow-xs'
                      : link.highlight
                      ? 'text-sap-orange-600 hover:bg-orange-50 font-semibold'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notifications */}
            <button
              onClick={() => navigate('notifications')}
              className="relative p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-xs">
                  {unreadNotifs}
                </span>
              )}
            </button>

            {/* Role Dashboard Button */}
            <button
              onClick={() => navigate(getDashboardPage())}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-900 text-white hover:bg-emerald-700 text-xs font-semibold shadow-sm transition-all"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{getDashboardLabel()}</span>
            </button>

            {/* Profile Avatar / Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
              >
                <img
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/20"
                />
                <ChevronDown className="w-3.5 h-3.5 text-gray-500 hidden sm:block" />
              </button>

              {profileDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 rounded-2xl bg-white shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  <div className="px-4 py-2.5 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Signed in as</p>
                    <p className="text-sm font-bold text-gray-900 truncate">{currentUser.name}</p>
                    <p className="text-xs text-emerald-600 font-medium capitalize flex items-center gap-1 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5" /> {currentUser.role} • {currentUser.verificationStatus}
                    </p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => navigate(getDashboardPage())}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4 text-gray-400" />
                      {getDashboardLabel()}
                    </button>
                    <button
                      onClick={() => navigate('profile')}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      My Profile & Impact Score ({currentUser.impactScore} pts)
                    </button>
                    <button
                      onClick={() => navigate('settings')}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      Account Settings & Preferences
                    </button>
                  </div>

                  <div className="border-t border-gray-100 pt-1">
                    <button
                      onClick={() => navigate('login')}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50"
                    >
                      Switch / Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 shadow-xl">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  navigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                  currentPage === link.id
                    ? 'bg-emerald-50 text-emerald-800 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            ))}

            <div className="border-t border-gray-100 pt-3 mt-2">
              <button
                onClick={() => {
                  navigate(getDashboardPage());
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm shadow-sm"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Go to {getDashboardLabel()}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
