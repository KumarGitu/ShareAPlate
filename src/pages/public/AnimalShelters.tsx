import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Dog,
  ShieldCheck,
  Heart,
  MapPin,
  Clock,
  Phone,
  Mail,
  ArrowRight,
  RotateCw,
  AlertCircle
} from 'lucide-react';

export const AnimalShelters: React.FC = () => {
  const { shelters, listings, navigate, triggerAnimalShelterFallback } = useApp();

  // Find listings that were redirected to animal shelters
  const redirectedFood = listings.filter((l) => l.status === 'Redirected to Animal Shelter');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider border border-amber-300 flex items-center gap-1.5 w-max mx-auto">
          <Dog className="w-4 h-4 text-amber-700" />
          The Ultimate Zero-Waste Safety Net
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
          Animal Shelter Fallback Network
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          When surplus meals approach their human safe-consumption deadline without a human claim, our system automatically redirects safe edible foods to registered animal shelters, gaushalas, and canine rehabilitation sanctuaries.
        </p>
      </div>

      {/* SECTION 15: AUTOMATED FALLBACK FLOW PIPELINE */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Automated Fallback Architecture</span>
          <h2 className="text-xl font-extrabold mt-1">From Surplus Kitchen to Animal Sanctuary</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
            <span className="text-gray-400 font-bold text-[10px]">Step 1</span>
            <strong className="text-emerald-400 block text-sm">Food Listed</strong>
            <p className="text-[11px] text-gray-400">Donor posts safe surplus batch with safe countdown.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
            <span className="text-gray-400 font-bold text-[10px]">Step 2</span>
            <strong className="text-blue-400 block text-sm">Priority Window</strong>
            <p className="text-[11px] text-gray-400">NGOs & individuals explore and claim portions.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
            <strong className="text-amber-400 block text-sm">Deadline Alert</strong>
            <p className="text-[11px] text-gray-400">If unreserved &amp; under 15 mins remain, fallback triggers.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
            <span className="text-gray-400 font-bold text-[10px]">Step 4</span>
            <strong className="text-orange-400 block text-sm">Nearby Shelter Match</strong>
            <p className="text-[11px] text-gray-400">System matches closest shelter with compatible animal types.</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950 border border-emerald-500 space-y-1">
            <span className="text-emerald-400 font-bold text-[10px]">Step 5</span>
            <strong className="text-emerald-300 block text-sm">Zero Landfill Food</strong>
            <p className="text-[11px] text-emerald-300">Food feeds rescued dogs, cattle, birds with full hygiene.</p>
          </div>
        </div>
      </div>

      {/* Shelters Directory */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-gray-900">Partner Animal Sanctuaries</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {shelters.map((shelter) => (
            <div key={shelter.shelterId} className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-card transition-all flex flex-col justify-between">
              <div>
                <div className="h-48 relative overflow-hidden bg-gray-100">
                  <img src={shelter.image} alt={shelter.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                      <Dog className="w-3.5 h-3.5" />
                      {shelter.verificationStatus} Animal Shelter
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-extrabold text-gray-900">{shelter.name}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{shelter.about}</p>

                  <div className="p-3 bg-gray-50 rounded-xl space-y-1 text-xs">
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{shelter.location.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span>{shelter.phone} ({shelter.contactPerson})</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {shelter.animalTypes.map((type) => (
                      <span key={type} className="px-2 py-0.5 bg-amber-50 text-amber-800 rounded-md text-[11px] font-medium border border-amber-200">
                        🐾 {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-gray-100 mt-2 flex justify-between items-center text-xs">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Redirected Meals</span>
                  <strong className="text-emerald-700 text-sm font-bold font-mono">{shelter.mealsReceived} Portions</strong>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Capacity</span>
                  <strong className="text-gray-800">{shelter.capacity}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Redirected Surplus Log (Section 15: Track the transfer) */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-gray-900">Live Shelter Transfer Audit Log</h3>
            <p className="text-xs text-gray-500">Unclaimed human surplus successfully saved from dumpster waste</p>
          </div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200">
            {redirectedFood.length} Batches Redirected
          </span>
        </div>

        {redirectedFood.length === 0 ? (
          <p className="text-xs text-gray-400 py-4 text-center">No unclaimed batches yet. All surplus successfully claimed by human beneficiaries!</p>
        ) : (
          <div className="space-y-3">
            {redirectedFood.map((item) => (
              <div key={item.listingId} className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <strong className="text-sm font-bold text-gray-900">{item.foodName}</strong>
                  <p className="text-gray-500 mt-0.5">
                    Original Donor: {item.donorName} • Quantity: {item.quantity} ({item.servings} portions)
                  </p>
                  <p className="text-amber-800 font-medium text-[11px] mt-1">
                    ✓ Transferred to Happy Tails Shelter before expiration.
                  </p>
                </div>
                <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full font-bold text-[11px] border border-amber-300">
                  Transferred & Fed
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
