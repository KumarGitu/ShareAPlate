import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Truck,
  Users,
  Search,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

export const NGOs: React.FC = () => {
  const { users, navigate, switchUserRole } = useApp();

  const [search, setSearch] = useState('');
  const ngos = users.filter((u) => u.role === 'ngo');

  const filtered = ngos.filter((n) =>
    (n.organizationName || n.name).toLowerCase().includes(search.toLowerCase()) ||
    (n.serviceArea || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200">
          Verified Hunger Relief Network
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
          Registered & Verified NGO Partners
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          ShareAPlate partners with government-registered charitable trusts and food banks. NGOs receive priority claims with temperature-controlled delivery.
        </p>
      </div>

      {/* Mandatory Delivery Rule Highlight for NGOs */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-emerald-950">Compulsory NGO Logistics Protocol</h3>
            <p className="text-xs text-emerald-800 mt-0.5">
              To guarantee temperature hygiene and audit chains, all NGO surplus rescues are transported directly by platform cargo drivers. Self-pickup is not permitted for NGOs.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            switchUserRole('ngo');
            navigate('ngo-dashboard');
          }}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold whitespace-nowrap shadow-xs transition-colors"
        >
          View as Verified NGO
        </button>
      </div>

      {/* Directory Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Partner NGOs Directory</h2>
          <div className="relative w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by NGO or locality..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((ngo) => (
            <div key={ngo.userId} className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs hover:shadow-card transition-all space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <img
                    src={ngo.avatar || 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=150'}
                    alt={ngo.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-500/20"
                  />
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                      ngo.verificationStatus === 'Verified'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {ngo.verificationStatus}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-gray-900 mt-3">{ngo.organizationName || ngo.name}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Registration: <span className="font-mono text-gray-700">{ngo.registrationNumber || 'NGO-DL-2020-001'}</span>
                </p>

                <div className="mt-3 p-3 bg-gray-50 rounded-xl space-y-1.5 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Beneficiary Capacity:</span>
                    <strong className="text-gray-900">{ngo.beneficiaryCount || 300} People</strong>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Service Area:</span>
                    <span className="text-gray-900 truncate max-w-[150px]">{ngo.serviceArea || 'Delhi NCR'}</span>
                  </div>
                </div>

                {ngo.foodRequirements && (
                  <p className="text-[11px] text-gray-500 mt-2 italic">
                    Focus: "{ngo.foodRequirements}"
                  </p>
                )}
              </div>

              <button
                onClick={() => {
                  switchUserRole('ngo', ngo.userId);
                  navigate('ngo-dashboard');
                }}
                className="w-full py-2.5 px-3 bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 rounded-xl text-xs font-bold border border-gray-200 transition-colors flex items-center justify-center gap-1"
              >
                <span>View NGO Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
