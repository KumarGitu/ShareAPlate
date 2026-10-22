import React from 'react';
import { useApp, AppPage } from '../../context/AppContext';
import { Home, Compass, PlusCircle, BookmarkCheck, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { currentPage, navigate } = useApp();

  const tabs: { id: AppPage; label: string; icon: React.ReactNode; special?: boolean }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'find-food', label: 'Discover', icon: <Compass className="w-5 h-5" /> },
    { id: 'share-food', label: 'Share', icon: <PlusCircle className="w-6 h-6 text-white" />, special: true },
    { id: 'recipient-dashboard', label: 'Claims', icon: <BookmarkCheck className="w-5 h-5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 lg:hidden shadow-lg pb-safe">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-2">
        {tabs.map((tab) => {
          const isActive = currentPage === tab.id;

          if (tab.special) {
            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.id)}
                className="flex flex-col items-center -mt-6 group focus:outline-none"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-lg shadow-emerald-600/30 group-active:scale-95 transition-transform ring-4 ring-white">
                  {tab.icon}
                </div>
                <span className="text-[10px] font-semibold text-emerald-800 mt-1">{tab.label}</span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.id)}
              className={`flex flex-col items-center justify-center w-14 h-full py-1 transition-colors ${
                isActive ? 'text-emerald-700 font-bold' : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              <div className="relative">
                {tab.icon}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-emerald-600 rounded-full"></span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
