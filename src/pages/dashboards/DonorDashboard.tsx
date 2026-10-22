import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FoodListing } from '../../types';
import { CountdownTimer } from '../../components/common/CountdownTimer';
import {
  UtensilsCrossed,
  PlusCircle,
  Clock,
  CheckCircle2,
  Users,
  Award,
  Sparkles,
  Truck,
  AlertTriangle,
  ExternalLink,
  Dog,
  ShieldCheck,
  RotateCw
} from 'lucide-react';

export const DonorDashboard: React.FC = () => {
  const { currentUser, listings, claims, navigate, setSelectedListingId, triggerAnimalShelterFallback } = useApp();

  const [activeTab, setActiveTab] = useState<'listings' | 'claims' | 'celebrations' | 'impact'>('listings');

  // Filter listings by current user or show all donor's items
  const donorListings = listings.filter((l) => l.donorId === currentUser.userId || l.donorName === currentUser.name || l.donorName === currentUser.organizationName);
  const activeListings = donorListings.filter((l) => l.status === 'Available' || l.status === 'Almost Claimed');
  const claimedListings = donorListings.filter((l) => l.status !== 'Available' && l.status !== 'Almost Claimed');
  const celebrationListings = donorListings.filter((l) => l.isCelebrateAndShare);

  const totalServingsRescued = donorListings.reduce((acc, curr) => acc + curr.servings, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Donor Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150'}
            alt={currentUser.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-400"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold">{currentUser.organizationName || currentUser.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/30 text-emerald-300 border border-emerald-400/50 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Donor
              </span>
            </div>
            <p className="text-xs text-emerald-200 mt-1">
              Donor Type: <strong>{currentUser.donorType || 'Commercial Kitchen'}</strong> • {currentUser.location.address}
            </p>
          </div>
        </div>

        {/* Action Button: Section 19 "+ Share Food" */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('celebrate-and-share')}
            className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Celebrate & Share</span>
          </button>

          <button
            onClick={() => navigate('share-food')}
            className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-extrabold text-xs shadow-lg transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Share Food</span>
          </button>
        </div>
      </div>

      {/* SECTION 19: OVERVIEW METRIC CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[10px] text-gray-400 font-bold uppercase block">Active Listings</span>
          <span className="text-2xl font-black text-gray-900 mt-1 block font-mono">{activeListings.length}</span>
          <span className="text-[10px] text-emerald-600 font-medium">Surplus live now</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[10px] text-gray-400 font-bold uppercase block">Total Meals Shared</span>
          <span className="text-2xl font-black text-emerald-700 mt-1 block font-mono">{totalServingsRescued}</span>
          <span className="text-[10px] text-gray-400 font-medium">Servings rescued</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[10px] text-gray-400 font-bold uppercase block">People Served</span>
          <span className="text-2xl font-black text-amber-600 mt-1 block font-mono">
            {Math.round(totalServingsRescued * 1.2)}
          </span>
          <span className="text-[10px] text-gray-400 font-medium">Estimated beneficiaries</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[10px] text-gray-400 font-bold uppercase block">Impact Score</span>
          <div className="flex items-center gap-1.5 mt-1">
            <Award className="w-5 h-5 text-amber-500" />
            <span className="text-2xl font-black text-gray-900 font-mono">{currentUser.impactScore}</span>
          </div>
          <span className="text-[10px] text-amber-600 font-bold">Gold Tier Donor</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs col-span-2 md:col-span-1">
          <span className="text-[10px] text-gray-400 font-bold uppercase block">Waste Prevented</span>
          <span className="text-2xl font-black text-blue-600 mt-1 block font-mono">
            {Math.round(totalServingsRescued * 0.45)} kg
          </span>
          <span className="text-[10px] text-gray-400 font-medium">Methane saved</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab('listings')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'listings' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          My Listings ({donorListings.length})
        </button>
        <button
          onClick={() => setActiveTab('celebrations')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
            activeTab === 'celebrations' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Special Celebrations ({celebrationListings.length})</span>
        </button>
      </div>

      {/* SECTION 19: MY LISTINGS TABLE / CARDS */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">Surplus Food Listings</h3>
              <span className="text-xs text-gray-400 font-medium">Sorted by timestamp</span>
            </div>

            <div className="divide-y divide-gray-100">
              {donorListings.map((listing) => (
                <div key={listing.listingId} className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                  
                  <div className="flex items-center gap-4">
                    <img
                      src={listing.foodImage}
                      alt={listing.foodName}
                      className="w-16 h-16 rounded-2xl object-cover border border-gray-200 flex-shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-gray-900">{listing.foodName}</h4>
                        <span className="text-[10px] font-semibold px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                          {listing.category}
                        </span>
                        {listing.isCelebrateAndShare && (
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Celebrate & Share
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {listing.quantity} • {listing.servings} Portions • Packaging: {listing.packagingInfo}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-1">
                        <span>Prep: {listing.preparationTime}</span>
                        <span>•</span>
                        <span>Location: {listing.pickupLocation.address}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                    <div>
                      <span className="text-[10px] text-gray-400 block font-bold uppercase">Status</span>
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                          listing.status === 'Available'
                            ? 'bg-emerald-100 text-emerald-800'
                            : listing.status === 'Almost Claimed'
                            ? 'bg-amber-100 text-amber-800'
                            : listing.status === 'Redirected to Animal Shelter'
                            ? 'bg-orange-100 text-orange-900'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {listing.status === 'Redirected to Animal Shelter' && <Dog className="w-3.5 h-3.5" />}
                        {listing.status}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 block font-bold uppercase">Safe Window</span>
                      <CountdownTimer
                        deadline={listing.safeConsumptionDeadline}
                        initialMinutes={listing.minutesRemaining}
                        compact
                      />
                    </div>

                    <button
                      onClick={() => {
                        setSelectedListingId(listing.listingId);
                        navigate('food-details', { listingId: listing.listingId });
                      }}
                      className="p-2 text-gray-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors"
                      title="View details"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SPECIAL OCCASIONS TAB */}
      {activeTab === 'celebrations' && (
        <div className="bg-white rounded-3xl border border-gray-200 p-6 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <div>
              <h3 className="text-base font-bold text-gray-900">Special Occasion Donations</h3>
              <p className="text-xs text-gray-500">Donations tagged under Celebrate & Share with custom packaging</p>
            </div>
            <button
              onClick={() => navigate('celebrate-and-share')}
              className="px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold shadow-sm"
            >
              + Create New Celebration Batch
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {celebrationListings.map((c) => (
              <div key={c.listingId} className="p-4 rounded-2xl bg-orange-50/40 border border-orange-200 space-y-2 text-xs">
                <div className="flex justify-between items-start">
                  <strong className="text-sm font-bold text-gray-900">{c.foodName}</strong>
                  <span className="px-2 py-0.5 rounded bg-orange-200 text-orange-900 text-[10px] font-bold">
                    {c.celebrationDetails?.occasion || 'Special Occasion'}
                  </span>
                </div>
                <p className="italic text-gray-600">"{c.celebrationDetails?.message}"</p>
                <div className="flex justify-between text-gray-500 pt-2 border-t border-orange-200">
                  <span>Portions: {c.servings} Meals</span>
                  <span>Packaging: {c.packagingSize}</span>
                  <span className="font-bold text-emerald-700">Status: {c.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
