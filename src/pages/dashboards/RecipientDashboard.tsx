import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  PackageCheck,
  Truck,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Compass
} from 'lucide-react';

export const RecipientDashboard: React.FC = () => {
  const { currentUser, claims, deliveries, navigate, setSelectedDeliveryId, setSelectedListingId } = useApp();

  const [filterStatus, setFilterStatus] = useState<string>('all');

  const myClaims = claims.filter((c) => c.recipientId === currentUser.userId || currentUser.role === 'recipient');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'}
            alt={currentUser.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-400"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold">{currentUser.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/30 text-blue-200 border border-blue-400/50">
                Individual Recipient
              </span>
            </div>
            <p className="text-xs text-blue-200 mt-1">
              Location: <strong>{currentUser.location.address}</strong>
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('find-food')}
          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-xs rounded-2xl shadow-lg transition-all flex items-center gap-2"
        >
          <Compass className="w-4 h-4" />
          <span>Discover Surplus Food</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[10px] text-gray-400 font-bold uppercase block">Active Claims</span>
          <span className="text-2xl font-black text-gray-900 mt-1 block font-mono">{myClaims.length}</span>
          <span className="text-[10px] text-emerald-600 font-medium">Reserved meals</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[10px] text-gray-400 font-bold uppercase block">In-Transit Deliveries</span>
          <span className="text-2xl font-black text-blue-600 mt-1 block font-mono">
            {deliveries.filter((d) => d.status !== 'Delivered').length}
          </span>
          <span className="text-[10px] text-blue-600 font-medium">Live driver en route</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[10px] text-gray-400 font-bold uppercase block">Total Meals Received</span>
          <span className="text-2xl font-black text-emerald-700 mt-1 block font-mono">
            {myClaims.reduce((acc, c) => acc + c.servings, 0)}
          </span>
          <span className="text-[10px] text-gray-400 font-medium">Free portions claimed</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[10px] text-gray-400 font-bold uppercase block">Zero-Waste Savings</span>
          <span className="text-2xl font-black text-amber-600 mt-1 block font-mono">₹1,850</span>
          <span className="text-[10px] text-amber-600 font-medium">Meal value saved</span>
        </div>
      </div>

      {/* Section 20: My Claims List */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900">My Claimed Surplus Food</h3>
            <p className="text-xs text-gray-500">First-come priority queue reservations</p>
          </div>
          <span className="text-xs text-gray-400 font-medium">Total: {myClaims.length} records</span>
        </div>

        <div className="divide-y divide-gray-100">
          {myClaims.map((claim) => (
            <div key={claim.claimId} className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {claim.claimId}
                  </span>
                  <h4 className="text-sm font-bold text-gray-900">{claim.foodName}</h4>
                  <span className="text-[11px] font-semibold text-gray-500">({claim.servings} servings)</span>
                </div>

                <p className="text-xs text-gray-500">
                  Donor: <strong>{claim.donorName}</strong> • {claim.donorLocation.address}
                </p>

                <div className="flex items-center gap-3 text-[11px] text-gray-400 pt-1">
                  <span>Reserved at {new Date(claim.claimTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  <span>•</span>
                  <span>Method: <strong className="text-gray-700">{claim.deliveryMethod}</strong></span>
                  <span>•</span>
                  <span>Food: <strong className="text-emerald-600">₹0 FREE</strong></span>
                  {claim.deliveryCharge > 0 && <span>(Delivery: ₹{claim.deliveryCharge})</span>}
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 block font-bold uppercase">Status</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    {claim.status}
                  </span>
                </div>

                {claim.deliveryId ? (
                  <button
                    onClick={() => {
                      setSelectedDeliveryId(claim.deliveryId!);
                      navigate('delivery-tracking', { deliveryId: claim.deliveryId });
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Live Tracking</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="text-center p-2 rounded-xl bg-gray-50 border border-gray-200">
                    <span className="text-[10px] text-gray-400 uppercase font-bold block">Pickup OTP</span>
                    <span className="text-xs font-mono font-bold text-gray-900">{claim.pickupOtp}</span>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
