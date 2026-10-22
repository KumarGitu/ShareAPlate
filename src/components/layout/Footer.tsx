import React from 'react';
import { useApp } from '../../context/AppContext';
import { UtensilsCrossed, Heart, ShieldCheck, Dog, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useApp();

  return (
    <footer className="bg-sap-charcoal-900 text-gray-300 pt-16 pb-24 lg:pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-green-600 flex items-center justify-center text-white shadow-md">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold text-white">
                Share<span className="text-sap-orange-500">A</span>Plate
              </span>
            </div>

            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              <strong>“Good Food Deserves a Second Plate.”</strong><br />
              India's leading surplus food-rescue network connecting commercial kitchens, hotels, and celebrators with verified NGOs and animal sanctuaries.
            </p>

            <div className="p-3.5 rounded-xl bg-gray-800/80 border border-gray-700 max-w-sm">
              <p className="text-xs text-amber-300 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Food Safety & Verification Guarantee
              </p>
              <p className="text-[11px] text-gray-400 mt-1">
                ShareAPlate is strictly a food-rescue bridge, not a commercial marketplace. Meals are ₹0 free; only transparent transport costs apply.
              </p>
            </div>
          </div>

          {/* Rescue Network */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Rescue Network</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigate('find-food')} className="hover:text-emerald-400 transition-colors">
                  Find Food Near Me
                </button>
              </li>
              <li>
                <button onClick={() => navigate('share-food')} className="hover:text-emerald-400 transition-colors">
                  + Share Surplus Food
                </button>
              </li>
              <li>
                <button onClick={() => navigate('celebrate-and-share')} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Celebrate & Share
                </button>
              </li>
              <li>
                <button onClick={() => navigate('how-it-works')} className="hover:text-emerald-400 transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => navigate('delivery-tracking')} className="hover:text-emerald-400 transition-colors">
                  Live Delivery Tracking
                </button>
              </li>
            </ul>
          </div>

          {/* Social Impact Partners */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Stakeholders</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigate('ngos')} className="hover:text-emerald-400 transition-colors">
                  Verified NGOs Network
                </button>
              </li>
              <li>
                <button onClick={() => navigate('animal-shelters')} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <Dog className="w-3.5 h-3.5 text-amber-400" />
                  Animal Shelter Fallback
                </button>
              </li>
              <li>
                <button onClick={() => navigate('impact')} className="hover:text-emerald-400 transition-colors">
                  Live Impact Counter
                </button>
              </li>
              <li>
                <button onClick={() => navigate('admin-dashboard')} className="hover:text-emerald-400 transition-colors">
                  Admin Verification Hub
                </button>
              </li>
            </ul>
          </div>

          {/* About & Trust */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Trust & Mission</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigate('about')} className="hover:text-emerald-400 transition-colors">
                  About ShareAPlate
                </button>
              </li>
              <li>
                <button onClick={() => navigate('contact')} className="hover:text-emerald-400 transition-colors">
                  Contact & Support
                </button>
              </li>
              <li>
                <span className="text-xs text-gray-500 block pt-2">
                  Emergency Support:<br />
                  <strong className="text-gray-300">+91 1800-RESCUE-FOOD</strong>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} ShareAPlate Foundation. Share Food. Reduce Waste. Feed Hope.
          </p>
          <div className="flex items-center gap-1 text-gray-400">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Zero Food Waste across India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
