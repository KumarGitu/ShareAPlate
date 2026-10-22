import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, VerificationStatus } from '../../types';
import {
  ShieldCheck,
  Building2,
  UtensilsCrossed,
  Truck,
  Dog,
  Users,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  BarChart3,
  Search,
  ExternalLink
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    users,
    updateUserVerification,
    listings,
    claims,
    deliveries,
    shelters,
    stats,
    navigate,
    setSelectedListingId,
    setSelectedDeliveryId
  } = useApp();

  const [activeTab, setActiveTab] = useState<'ngos' | 'listings' | 'claims' | 'deliveries' | 'shelters' | 'analytics'>('ngos');
  const [searchFilter, setSearchFilter] = useState('');

  const ngos = users.filter((u) => u.role === 'ngo');
  const pendingNGOs = ngos.filter((n) => n.verificationStatus === 'Under Review' || n.verificationStatus === 'Pending');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Top Header */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-600/30 border border-purple-400 text-purple-300">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300">ShareAPlate Platform HQ</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">Master Administration Console</h1>
          <p className="text-xs text-gray-300 mt-1">
            Supervise NGO verifications, priority claim queues, food safety limits & animal shelter redirects.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/20 text-xs">
            <span className="text-gray-400 block font-bold text-[10px] uppercase">Pending Audits</span>
            <span className="text-amber-400 font-bold text-lg font-mono">{pendingNGOs.length} NGOs</span>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200 text-xs font-bold">
        {[
          { id: 'ngos' as const, label: `NGO Verification (${pendingNGOs.length} pending)`, icon: <Building2 className="w-4 h-4" /> },
          { id: 'listings' as const, label: `Food Listings (${listings.length})`, icon: <UtensilsCrossed className="w-4 h-4" /> },
          { id: 'claims' as const, label: `Claim Queue (${claims.length})`, icon: <Users className="w-4 h-4" /> },
          { id: 'deliveries' as const, label: `Active Logistics (${deliveries.length})`, icon: <Truck className="w-4 h-4" /> },
          { id: 'shelters' as const, label: `Animal Shelters (${shelters.length})`, icon: <Dog className="w-4 h-4" /> },
          { id: 'analytics' as const, label: 'Analytics & Impact', icon: <BarChart3 className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-purple-900 text-white shadow-xs'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: NGO VERIFICATION WORKFLOW (Section 21 & 22) */}
      {activeTab === 'ngos' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900">NGO Verification Applications</h3>
                <p className="text-xs text-gray-500">
                  Review 80G certificates, FCRA compliance, and authorized hunger relief service areas.
                </p>
              </div>
              <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                Protected KYC Documents
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {ngos.map((ngo) => (
                <div key={ngo.userId} className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={ngo.avatar || 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=150'}
                        alt={ngo.name}
                        className="w-12 h-12 rounded-xl object-cover ring-2 ring-gray-200"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-extrabold text-gray-900">{ngo.organizationName || ngo.name}</h4>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              ngo.verificationStatus === 'Verified'
                                ? 'bg-emerald-100 text-emerald-800'
                                : ngo.verificationStatus === 'Under Review'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {ngo.verificationStatus}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          Reg No: <span className="font-mono">{ngo.registrationNumber || 'NGO-PENDING'}</span> • Service Area: {ngo.serviceArea || 'Delhi NCR'}
                        </p>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateUserVerification(ngo.userId, 'Verified')}
                        className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve NGO</span>
                      </button>
                      <button
                        onClick={() => updateUserVerification(ngo.userId, 'Rejected')}
                        className="px-3.5 py-2 bg-white border border-rose-300 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-bold flex items-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                      <button
                        onClick={() => updateUserVerification(ngo.userId, 'Suspended')}
                        className="px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-xl text-xs font-semibold"
                      >
                        Suspend
                      </button>
                    </div>
                  </div>

                  {/* Documents inspection list */}
                  <div className="pt-2 border-t border-gray-200 flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-[10px] font-bold uppercase text-gray-400">KYC Documents:</span>
                    {(ngo.documents || [{ title: 'Registration Certificate.pdf', url: '#' }]).map((doc) => (
                      <span
                        key={doc.title}
                        className="px-2.5 py-1 bg-white rounded-lg border border-gray-300 text-gray-700 font-medium flex items-center gap-1 text-[11px]"
                      >
                        <FileText className="w-3 h-3 text-purple-600" />
                        {doc.title}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FOOD LISTINGS AUDIT */}
      {activeTab === 'listings' && (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-sm font-bold text-gray-900">All Platform Surplus Food Listings</h3>
            <span className="text-xs text-gray-400">Safety window & shelter fallback monitor</span>
          </div>

          <div className="divide-y divide-gray-100">
            {listings.map((l) => (
              <div key={l.listingId} className="p-4 flex items-center justify-between text-xs hover:bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <img src={l.foodImage} alt={l.foodName} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{l.foodName}</h4>
                    <p className="text-gray-500">{l.donorName} • {l.servings} Servings • {l.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-full font-bold bg-gray-100 text-gray-700">
                    {l.status}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedListingId(l.listingId);
                      navigate('food-details', { listingId: l.listingId });
                    }}
                    className="p-1.5 text-gray-500 hover:text-purple-700"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CLAIMS & PRIORITY QUEUE (Section 7 & 33) */}
      {activeTab === 'claims' && (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xs p-6 space-y-4">
          <div>
            <h3 className="text-base font-bold text-gray-900">Claim Priority Order (First-Come, First-Served)</h3>
            <p className="text-xs text-gray-500">Sorted strictly by claimTimestamp ASC</p>
          </div>

          <div className="divide-y divide-gray-100">
            {claims.map((claim, idx) => (
              <div key={claim.claimId} className="py-4 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-[10px]">
                      #{idx + 1}
                    </span>
                    <strong className="text-gray-900 text-sm">{claim.foodName}</strong>
                    <span className="text-gray-400 font-mono">({claim.claimId})</span>
                  </div>
                  <p className="text-gray-500 mt-0.5">
                    Claimed by: <strong>{claim.recipientName}</strong> ({claim.recipientRole}) • Donor: {claim.donorName}
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-bold text-emerald-700 block">{claim.status}</span>
                  <span className="text-[10px] text-gray-400">
                    {new Date(claim.claimTimestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: DELIVERIES */}
      {activeTab === 'deliveries' && (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xs p-6 space-y-4">
          <h3 className="text-base font-bold text-gray-900">Active Delivery Dispatches</h3>
          <div className="space-y-3">
            {deliveries.map((del) => (
              <div key={del.deliveryId} className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between text-xs">
                <div>
                  <strong className="text-gray-900 text-sm block">{del.foodName}</strong>
                  <span className="text-gray-500">
                    Driver: <strong>{del.driverName}</strong> ({del.driverVehicle}) • Stage: <strong className="text-purple-700">{del.status}</strong>
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSelectedDeliveryId(del.deliveryId);
                    navigate('delivery-tracking', { deliveryId: del.deliveryId });
                  }}
                  className="px-3.5 py-1.5 bg-purple-900 text-white rounded-xl text-xs font-bold"
                >
                  Inspect Tracking
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: ANIMAL SHELTERS DATABASE (Section 15) */}
      {activeTab === 'shelters' && (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xs p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-gray-900">Animal Shelter Fallback Registry</h3>
              <p className="text-xs text-gray-500">Sanctuaries receiving unclaimed surplus food before safe deadline</p>
            </div>
            <button
              onClick={() => navigate('animal-shelters')}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
            >
              Public Shelter Directory
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {shelters.map((s) => (
              <div key={s.shelterId} className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <h4 className="font-extrabold text-gray-900 text-sm">{s.name}</h4>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    {s.verificationStatus}
                  </span>
                </div>
                <p className="text-gray-600">{s.about}</p>
                <div className="flex justify-between text-gray-500 pt-2 border-t border-amber-200 font-medium">
                  <span>Capacity: {s.capacity}</span>
                  <span className="text-amber-800 font-bold">{s.mealsReceived} Meals Redirected</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: ANALYTICS & REPORTS (Section 16 & 22) */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-gray-200 shadow-xs space-y-2">
            <span className="text-xs text-gray-400 font-bold uppercase">Meals Rescued</span>
            <div className="text-3xl font-black text-emerald-600 font-mono">{stats.mealsRescued.toLocaleString()}</div>
            <p className="text-xs text-gray-500">Directly feeding slum schools, shelter homes & families</p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-gray-200 shadow-xs space-y-2">
            <span className="text-xs text-gray-400 font-bold uppercase">Landfill Waste Prevented</span>
            <div className="text-3xl font-black text-blue-600 font-mono">{stats.foodWastePreventedKg.toLocaleString()} kg</div>
            <p className="text-xs text-gray-500">Methane emissions averted across Delhi NCR landfills</p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-gray-200 shadow-xs space-y-2">
            <span className="text-xs text-gray-400 font-bold uppercase">Shelter Redirections</span>
            <div className="text-3xl font-black text-amber-600 font-mono">114 batches</div>
            <p className="text-xs text-gray-500">Unclaimed food routed to dogs, cattle & birds</p>
          </div>
        </div>
      )}

    </div>
  );
};
