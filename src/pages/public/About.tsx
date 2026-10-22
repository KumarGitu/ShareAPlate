import React from 'react';
import { useApp } from '../../context/AppContext';
import { UtensilsCrossed, ShieldCheck, Heart, Leaf, Award, ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200">
          Our Mission & Philosophy
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
          Good Food Deserves a Second Plate
        </h1>
        <p className="text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
          ShareAPlate was founded on a simple truth: millions of edible meals are discarded every evening while millions face food insecurity. We exist to close this gap cleanly, ethically, and without commercial exploitation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-200 space-y-3">
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
          <h3 className="text-base font-bold text-gray-900">Not A Commercial Marketplace</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            ShareAPlate does not sell meals. Food surplus is always ₹0. We strictly separate food donations from minor electric delivery charges (₹49) paid directly to courier partners.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 space-y-3">
          <Leaf className="w-6 h-6 text-emerald-600" />
          <h3 className="text-base font-bold text-gray-900">Zero Landfill Commitment</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            If human beneficiaries cannot claim food before the safe-consumption window closes, our autonomous fallback engine matches with registered animal shelters and sanctuaries.
          </p>
        </div>
      </div>

      <div className="p-8 bg-emerald-50 rounded-3xl border border-emerald-200 text-center space-y-3">
        <h3 className="text-xl font-bold text-emerald-950">Join the Food Rescue Movement</h3>
        <p className="text-xs text-emerald-800 max-w-md mx-auto">
          Whether you run a restaurant, represent an NGO, or simply want to donate on special occasions, ShareAPlate is your platform.
        </p>
        <button
          onClick={() => navigate('find-food')}
          className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-emerald-700"
        >
          Explore Food Rescue
        </button>
      </div>
    </div>
  );
};
