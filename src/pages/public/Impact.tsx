import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  UtensilsCrossed,
  Heart,
  Users,
  Building2,
  Dog,
  Leaf,
  Scale,
  Award,
  Globe,
  ArrowRight
} from 'lucide-react';

export const Impact: React.FC = () => {
  const { stats, navigate, currentUser } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200">
          Live Transparency Dashboard
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
          From Surplus to Someone's Plate
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Real-time metrics tracking meals diverted from landfills, greenhouse gas reductions, and community empowerment across Delhi NCR.
        </p>
      </div>

      {/* Main Counter Display */}
      <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <span className="text-3xl sm:text-5xl font-black text-emerald-400 font-mono">
              {stats.mealsRescued.toLocaleString()}+
            </span>
            <span className="text-xs font-bold text-gray-300 block uppercase tracking-wider">Meals Rescued</span>
            <p className="text-[11px] text-gray-400">Nutritious meals diverted</p>
          </div>

          <div className="space-y-1">
            <span className="text-3xl sm:text-5xl font-black text-amber-400 font-mono">
              {stats.peopleServed.toLocaleString()}+
            </span>
            <span className="text-xs font-bold text-gray-300 block uppercase tracking-wider">People Fed</span>
            <p className="text-[11px] text-gray-400">Beneficiaries reached</p>
          </div>

          <div className="space-y-1">
            <span className="text-3xl sm:text-5xl font-black text-emerald-300 font-mono">
              {stats.foodWastePreventedKg.toLocaleString()} kg
            </span>
            <span className="text-xs font-bold text-gray-300 block uppercase tracking-wider">Waste Prevented</span>
            <p className="text-[11px] text-gray-400">Solid organic waste saved</p>
          </div>

          <div className="space-y-1">
            <span className="text-3xl sm:text-5xl font-black text-orange-400 font-mono">
              {stats.ngosConnected} + {stats.animalSheltersConnected}
            </span>
            <span className="text-xs font-bold text-gray-300 block uppercase tracking-wider">Partners Enrolled</span>
            <p className="text-[11px] text-gray-400">NGOs & Animal sanctuaries</p>
          </div>
        </div>
      </div>

      {/* SECTION 37: IMPACT STORY CALCULATOR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Leaf className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Carbon & Methane Aversion</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Every 1 kg of discarded food in decomposing dumps emits approx 2.5 kg CO2e. Our <strong>{stats.foodWastePreventedKg.toLocaleString()} kg</strong> rescued has averted over <strong>61,750 kg CO2e</strong>!
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">NGO Cost Relief</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            By connecting free surplus with verified community shelters, charity food banks save an estimated <strong>₹24,00,000+</strong> annually in raw ration costs.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Your Impact Score</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Active persona score: <strong>{currentUser.impactScore} Impact Points</strong>. Gain points with every listing verified, timely pickup, and zero cancellation rate.
          </p>
        </div>
      </div>

      {/* Real stories */}
      <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-200 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-extrabold text-emerald-950">Ready to boost your impact score?</h3>
          <p className="text-xs text-emerald-800">
            List your restaurant’s evening surplus or sponsor a celebratory food rescue batch today.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('share-food')}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all"
          >
            + Share Surplus Food
          </button>
          <button
            onClick={() => navigate('celebrate-and-share')}
            className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-800 rounded-xl text-xs font-bold border border-gray-200 transition-all"
          >
            Celebrate & Share
          </button>
        </div>
      </div>

    </div>
  );
};
