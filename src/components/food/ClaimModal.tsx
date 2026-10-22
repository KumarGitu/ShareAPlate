import React, { useState } from 'react';
import { FoodListing, Claim } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  X,
  ShieldCheck,
  Truck,
  PackageCheck,
  AlertTriangle,
  Info,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ClaimModalProps {
  listing: FoodListing;
  isOpen: boolean;
  onClose: () => void;
}

export const ClaimModal: React.FC<ClaimModalProps> = ({ listing, isOpen, onClose }) => {
  const { currentUser, createClaim, navigate } = useApp();
  const isNGO = currentUser.role === 'ngo';

  // State: For NGO, delivery is compulsory! For others, default to self-pickup or delivery
  const [deliveryMethod, setDeliveryMethod] = useState<'Self Pickup' | 'Platform Delivery'>(
    isNGO ? 'Platform Delivery' : 'Self Pickup'
  );
  const [agreedToSafetyTerms, setAgreedToSafetyTerms] = useState(false);
  const [confirmedClaim, setConfirmedClaim] = useState<Claim | null>(null);

  if (!isOpen) return null;

  const handleConfirmClaim = () => {
    try {
      const claim = createClaim(listing.listingId, isNGO ? 'Platform Delivery' : deliveryMethod);
      setConfirmedClaim(claim);
      // Trigger festive celebration confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      alert(err.message || 'Error creating claim');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-emerald-600 to-green-600 p-5 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-emerald-100 text-xs font-semibold uppercase tracking-wider">
            <PackageCheck className="w-4 h-4" />
            <span>Time-Priority Rescue Queue</span>
          </div>
          <h2 className="text-xl font-extrabold mt-1">
            {confirmedClaim ? '🎉 Food Reserved!' : 'Reserve Surplus Food'}
          </h2>
          <p className="text-xs text-emerald-100 mt-0.5">
            Claiming: <strong className="text-white">{listing.foodName}</strong> ({listing.servings} servings)
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {confirmedClaim ? (
            /* SECTION 43: CLAIM CONFIRMATION SCREEN */
            <div className="space-y-5 text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Confirmed Priority Claim
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-2">
                  Reservation Code: <span className="font-mono text-emerald-700">{confirmedClaim.claimId}</span>
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Claimed at {new Date(confirmedClaim.claimTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              {/* Special message based on role / delivery */}
              {isNGO ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 text-left flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Mandatory NGO Delivery Dispatched</strong>
                    Delivery has been automatically arranged as required for verified NGO claims. Our verified partner driver is dispatched.
                  </div>
                </div>
              ) : confirmedClaim.deliveryRequired ? (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-800 text-left flex items-start gap-2.5">
                  <Truck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Platform Delivery Requested (₹49)</strong>
                    Driver will pick up within 15 minutes and deliver to your registered address.
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 text-left flex items-start gap-2.5">
                  <Clock className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Self-Pickup Scheduled (₹0 Free)</strong>
                    Please collect before the safe-consumption window closes. Show your pickup OTP to donor staff.
                  </div>
                </div>
              )}

              {/* OTP Badges */}
              <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                <div className="bg-white p-2.5 rounded-xl border border-gray-200">
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">Pickup Verification OTP</span>
                  <span className="text-lg font-black tracking-widest text-emerald-700 font-mono">
                    {confirmedClaim.pickupOtp}
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-gray-200">
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">Delivery Release OTP</span>
                  <span className="text-lg font-black tracking-widest text-blue-700 font-mono">
                    {confirmedClaim.deliveryOtp}
                  </span>
                </div>
              </div>

              {/* Cost Summary Breakdown (Section 10) */}
              <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-left text-xs space-y-1.5">
                <div className="flex justify-between text-gray-600">
                  <span>Food Cost:</span>
                  <strong className="text-emerald-600">₹0 FREE (Surplus Rescue)</strong>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Transport & Logistics:</span>
                  <span>{confirmedClaim.deliveryCharge > 0 ? `₹${confirmedClaim.deliveryCharge}` : '₹0 (Self-Pickup)'}</span>
                </div>
                <div className="border-t border-gray-200 pt-1.5 flex justify-between font-bold text-gray-900 text-sm">
                  <span>Total Payable:</span>
                  <span>₹{confirmedClaim.totalAmount}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                {confirmedClaim.deliveryId ? (
                  <button
                    onClick={() => {
                      onClose();
                      navigate('delivery-tracking', { deliveryId: confirmedClaim.deliveryId });
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Track Live Delivery</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      onClose();
                      navigate('recipient-dashboard');
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>View in My Claims</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="py-3 px-4 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            /* CLAIM CONFIGURATION STEP */
            <div className="space-y-5">
              
              {/* Recipient Persona Notice */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-100 text-xs">
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">Claiming As</span>
                  <span className="font-bold text-gray-900">{currentUser.name}</span>
                  <span className="text-gray-500 block text-[11px]">Role: <strong className="capitalize">{currentUser.role}</strong></span>
                </div>
                {isNGO ? (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified NGO
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-blue-100 text-blue-800">
                    Individual Recipient
                  </span>
                )}
              </div>

              {/* Delivery Choice (SECTION 9: NGO vs Individual) */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Collection & Delivery Preference
                </label>

                {isNGO ? (
                  /* Section 9: "NGO delivery is compulsory. Do not show Self Pickup as an option for NGOs." */
                  <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-500 text-emerald-950 space-y-1">
                    <div className="flex items-center gap-2">
                      <Truck className="w-5 h-5 text-emerald-700" />
                      <strong className="text-sm font-bold">Compulsory Platform Delivery</strong>
                    </div>
                    <p className="text-xs text-emerald-800 leading-relaxed">
                      As mandated by ShareAPlate food safety policy for registered NGOs, all bulk food rescue consignments are delivered via temperature-controlled platform logistics. <strong>Self-pickup is disabled for NGOs.</strong>
                    </p>
                    <div className="pt-2 text-xs font-semibold text-emerald-900">
                      Standard NGO Transport Fee: ₹49 (Direct to driver partner)
                    </div>
                  </div>
                ) : (
                  /* Individual/Group: Can choose between Self-Pickup or Optional Delivery */
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('Self Pickup')}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                        deliveryMethod === 'Self Pickup'
                          ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-gray-900">Self Pickup</span>
                        <span className="text-xs font-extrabold text-emerald-600">₹0</span>
                      </div>
                      <p className="text-[11px] text-gray-500">Collect directly from donor location</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('Platform Delivery')}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                        deliveryMethod === 'Platform Delivery'
                          ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-gray-900">Platform Delivery</span>
                        <span className="text-xs font-extrabold text-blue-600">₹49</span>
                      </div>
                      <p className="text-[11px] text-gray-500">Delivered to your door with live tracking</p>
                    </button>
                  </div>
                )}
              </div>

              {/* Pricing breakdown (Section 10: Clear separation) */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2">
                <div className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                  Transparent Cost Breakdown
                </div>
                <div className="flex justify-between text-xs text-gray-700">
                  <span>Food Surplus Value ({listing.servings} servings):</span>
                  <span className="font-bold text-emerald-600">₹0.00 (100% FREE)</span>
                </div>
                <div className="flex justify-between text-xs text-gray-700">
                  <span>Delivery & Handling:</span>
                  <span>{isNGO || deliveryMethod === 'Platform Delivery' ? '₹49.00' : '₹0.00'}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between text-sm font-black text-gray-900">
                  <span>Total Amount Due:</span>
                  <span>₹{isNGO || deliveryMethod === 'Platform Delivery' ? 49 : 0}</span>
                </div>
                <p className="text-[10px] text-gray-400 italic pt-1">
                  * ShareAPlate never sells food. The ₹49 charge is paid exclusively to the electric cargo courier partner.
                </p>
              </div>

              {/* Food Safety & Zero-Waste Agreement */}
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreedToSafetyTerms}
                  onChange={(e) => setAgreedToSafetyTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                />
                <span className="text-xs text-gray-600 leading-relaxed">
                  I confirm that this food will be distributed/consumed immediately within its safe consumption deadline ({new Date(listing.safeConsumptionDeadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}) and will not be commercially resold.
                </span>
              </label>

              {/* Submit CTA */}
              <button
                disabled={!agreedToSafetyTerms}
                onClick={handleConfirmClaim}
                className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                  agreedToSafetyTerms
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                }`}
              >
                <span>Confirm Food Reservation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
