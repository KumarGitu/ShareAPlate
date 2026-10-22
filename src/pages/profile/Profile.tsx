import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  ShieldCheck,
  MapPin,
  Mail,
  Phone,
  Award,
  CheckCircle2,
  Calendar,
  Building2,
  FileText
} from 'lucide-react';

export const Profile: React.FC = () => {
  const { currentUser, claims, listings } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Profile Card */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <img
            src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
            alt={currentUser.name}
            className="w-24 h-24 rounded-3xl object-cover ring-4 ring-emerald-500/20 shadow-md"
          />

          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-extrabold text-gray-900">{currentUser.name}</h1>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 border border-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5" />
                {currentUser.verificationStatus}
              </span>
            </div>

            <p className="text-xs text-gray-500 font-medium">
              Role: <strong className="capitalize text-gray-900">{currentUser.role}</strong>
              {currentUser.organizationName && ` • ${currentUser.organizationName}`}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 pt-2">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600" />
                {currentUser.location.address}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-gray-400" />
                {currentUser.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-gray-400" />
                {currentUser.phone}
              </span>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-center min-w-[130px]">
            <Award className="w-6 h-6 text-amber-600 mx-auto" />
            <span className="text-[10px] text-gray-400 font-bold uppercase block mt-1">Impact Score</span>
            <span className="text-2xl font-black text-amber-700 font-mono">{currentUser.impactScore}</span>
          </div>
        </div>
      </div>

      {/* Verification details for organizations */}
      {currentUser.role === 'ngo' && (
        <div className="bg-white rounded-3xl border border-gray-200 p-6 space-y-4 shadow-xs">
          <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-600" />
            <span>NGO Verification & Capacity Audit</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 bg-gray-50 rounded-xl">
              <span className="text-[10px] text-gray-400 uppercase font-bold block">Government Reg No</span>
              <strong className="text-gray-900 font-mono">{currentUser.registrationNumber}</strong>
            </div>
            <div className="p-3.5 bg-gray-50 rounded-xl">
              <span className="text-[10px] text-gray-400 uppercase font-bold block">Daily Beneficiaries</span>
              <strong className="text-gray-900">{currentUser.beneficiaryCount} People</strong>
            </div>
            <div className="p-3.5 bg-gray-50 rounded-xl">
              <span className="text-[10px] text-gray-400 uppercase font-bold block">Approved Service Area</span>
              <strong className="text-gray-900">{currentUser.serviceArea}</strong>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
