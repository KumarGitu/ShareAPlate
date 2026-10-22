import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  ShieldCheck,
  Truck,
  Users,
  CheckCircle2,
  FileText,
  AlertCircle,
  Clock,
  ArrowRight,
  ExternalLink,
  Info
} from 'lucide-react';

export const NGODashboard: React.FC = () => {
  const { currentUser, claims, deliveries, navigate, setSelectedDeliveryId } = useApp();

  const isVerified = currentUser.verificationStatus === 'Verified';
  const ngoClaims = claims.filter((c) => c.recipientRole === 'NGO');
  const ngoDeliveries = deliveries.filter((d) => d.recipientRole === 'NGO');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar || 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=150'}
            alt={currentUser.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-400"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold">{currentUser.organizationName || currentUser.name}</h1>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
                  isVerified
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                    : 'bg-amber-500/20 text-amber-300 border-amber-400'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                {currentUser.verificationStatus} NGO
              </span>
            </div>
            <p className="text-xs text-emerald-200 mt-1">
              Registration: <span className="font-mono">{currentUser.registrationNumber || 'NGO-DL-2019-8834'}</span> • Area: {currentUser.serviceArea}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('find-food')}
          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-xs rounded-2xl shadow-lg transition-all flex items-center gap-2"
        >
          <Building2 className="w-4 h-4" />
          <span>Claim NGO-Priority Surplus Food</span>
        </button>
      </div>

      {/* SECTION 20: MANDATORY DELIVERY WORKFLOW ALERT */}
      <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-5 text-emerald-950 flex items-start gap-4 shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
          <Truck className="w-5 h-5" />
        </div>
        <div className="flex-1 text-xs">
          <strong className="text-sm font-bold block text-emerald-900">
            Mandatory NGO Delivery Protocol (Section 9 Compliance)
          </strong>
          <p className="mt-0.5 text-emerald-800 leading-relaxed">
            All food claimed by verified NGOs is routed exclusively through temperature-controlled platform logistics to ensure food hygiene integrity and audit safety. <strong>Self-pickup is disabled for NGO accounts.</strong>
          </p>
        </div>
        <span className="text-xs font-bold bg-white text-emerald-800 px-3 py-1 rounded-full border border-emerald-200 whitespace-nowrap hidden sm:inline-block">
          Active Protocol
        </span>
      </div>

      {/* NGO Metric Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[10px] text-gray-400 font-bold uppercase block">Beneficiaries Served</span>
          <span className="text-2xl font-black text-gray-900 mt-1 block font-mono">
            {currentUser.beneficiaryCount || 450} People
          </span>
          <span className="text-[10px] text-emerald-600 font-medium">Daily registered capacity</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[10px] text-gray-400 font-bold uppercase block">Active Deliveries</span>
          <span className="text-2xl font-black text-blue-600 mt-1 block font-mono">
            {ngoDeliveries.filter((d) => d.status !== 'Delivered').length}
          </span>
          <span className="text-[10px] text-blue-600 font-medium">Cargo vans en route</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[10px] text-gray-400 font-bold uppercase block">Total Meals Received</span>
          <span className="text-2xl font-black text-emerald-700 mt-1 block font-mono">1,420</span>
          <span className="text-[10px] text-gray-400 font-medium">Nutritious portions distributed</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-[10px] text-gray-400 font-bold uppercase block">Verification Status</span>
          <span className="text-lg font-black text-emerald-700 mt-1 block">
            {currentUser.verificationStatus}
          </span>
          <span className="text-[10px] text-gray-400 font-medium">80G & Society audited</span>
        </div>
      </div>

      {/* Active Food Deliveries for NGO */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900">Active Food Collections & Deliveries</h3>
            <p className="text-xs text-gray-500">Live dispatch tracking directly to your community kitchen</p>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {ngoDeliveries.map((delivery) => (
            <div key={delivery.deliveryId} className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {delivery.deliveryId}
                  </span>
                  <h4 className="text-sm font-bold text-gray-900">{delivery.foodName}</h4>
                  <span className="text-xs font-semibold text-emerald-700">({delivery.servings} Servings)</span>
                </div>
                <p className="text-xs text-gray-500">
                  Donor Kitchen: <strong>{delivery.donorName}</strong> ({delivery.donorLocation.address})
                </p>
                <div className="flex items-center gap-3 text-[11px] text-gray-400">
                  <span>Driver: <strong>{delivery.driverName}</strong> ({delivery.driverVehicle})</span>
                  <span>•</span>
                  <span>ETA: <strong className="text-emerald-700">{delivery.estimatedArrival}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                <div className="text-center bg-gray-50 p-2 rounded-xl border border-gray-200">
                  <span className="text-[9px] text-gray-400 uppercase font-bold block">Delivery OTP</span>
                  <span className="text-xs font-mono font-bold text-blue-700">{delivery.deliveryOtp}</span>
                </div>

                <button
                  onClick={() => {
                    setSelectedDeliveryId(delivery.deliveryId);
                    navigate('delivery-tracking', { deliveryId: delivery.deliveryId });
                  }}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Live GPS Tracking</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Verified Supporting Documents (Section 21) */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-600" />
          <span>Uploaded NGO Legal & Tax Documents (Protected)</span>
        </h3>
        <p className="text-xs text-gray-500">
          * Section 34 Security Rule: NGO legal documents are strictly protected and never publicly accessible.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(currentUser.documents || [
            { title: '80G Certificate.pdf', url: '#', uploadDate: '2025-01-15' },
            { title: 'FCRA & Society Registration.pdf', url: '#', uploadDate: '2025-01-15' },
            { title: 'FSSAI Food Safety Declaration.pdf', url: '#', uploadDate: '2025-01-20' },
          ]).map((doc) => (
            <div key={doc.title} className="p-3.5 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-between text-xs">
              <div>
                <strong className="block text-gray-800 truncate">{doc.title}</strong>
                <span className="text-[10px] text-gray-400">Verified by Admin</span>
              </div>
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
