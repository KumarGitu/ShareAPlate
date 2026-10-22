import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CountdownTimer } from '../../components/common/CountdownTimer';
import { ClaimModal } from '../../components/food/ClaimModal';
import { MapVisualizer } from '../../components/map/MapVisualizer';
import {
  UtensilsCrossed,
  ShieldCheck,
  MapPin,
  Clock,
  Package,
  Truck,
  Users,
  AlertCircle,
  Sparkles,
  Share2,
  ArrowLeft,
  Dog,
  CheckCircle2,
  Map
} from 'lucide-react';

export const FoodDetailsPage: React.FC = () => {
  const { listings, selectedListingId, navigate, triggerAnimalShelterFallback } = useApp();
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const listing = listings.find((l) => l.listingId === selectedListingId) || listings[0];

  if (!listing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-gray-900">Food Listing Not Found</h2>
        <button onClick={() => navigate('find-food')} className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold">
          Back to Discovery
        </button>
      </div>
    );
  }

  const isAvailable = listing.status === 'Available' || listing.status === 'Almost Claimed';
  const isShelterRedirected = listing.status === 'Redirected to Animal Shelter';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('find-food')}
          className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Browse Listings</span>
        </button>

        <span className="text-xs text-gray-400 font-mono">ID: {listing.listingId}</span>
      </div>

      {/* Main Grid: Media & Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Media & Visuals */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-gray-100 h-80 sm:h-96">
            <img
              src={listing.foodImage}
              alt={listing.foodName}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-extrabold shadow-sm ${
                  listing.isVeg ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                }`}
              >
                {listing.isVeg ? '🌱 100% Vegetarian' : '🍗 Non-Vegetarian'}
              </span>

              {listing.isCelebrateAndShare && (
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500 text-white shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Celebrate & Share
                </span>
              )}
            </div>

            <div className="absolute top-4 right-4">
              <span className="px-3 py-1.5 rounded-full text-sm font-black bg-emerald-600 text-white shadow-lg">
                ₹0 FREE
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-2xl text-white text-xs flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-400" />
                {listing.distanceKm} km away ({listing.pickupLocation.city || 'Delhi NCR'})
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-400" />
                Feeds {listing.servings} people
              </span>
            </div>
          </div>

          {/* Interactive Map view if toggled */}
          {showMap && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-gray-700">
                <span>Pickup Location Map:</span>
                <button onClick={() => setShowMap(false)} className="text-rose-600 hover:underline">
                  Hide Map
                </button>
              </div>
              <MapVisualizer height="h-64" interactive={false} />
            </div>
          )}

          {/* Special Occasion message if present */}
          {listing.celebrationDetails && (
            <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-200 text-xs text-orange-950 space-y-1">
              <div className="flex items-center gap-2 font-bold text-orange-900">
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span>Sponsored in Celebration: {listing.celebrationDetails.occasion}</span>
              </div>
              <p className="italic text-gray-700">"{listing.celebrationDetails.message}"</p>
            </div>
          )}
        </div>

        {/* Right Column: Listing Meta & Claim Action */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-gray-200 shadow-sm space-y-5">
          
          {/* Donor Box */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <img
                src={listing.donorAvatar || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150'}
                alt={listing.donorName}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500/20"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-gray-900">{listing.donorName}</h4>
                  {listing.isVerifiedDonor && (
                    <span title="Verified Commercial Donor">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-gray-400 capitalize">{listing.donorType} • Verified Donor</p>
              </div>
            </div>

            <span className="text-[11px] font-semibold bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg">
              {listing.category}
            </span>
          </div>

          {/* Title & Description */}
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 leading-snug">{listing.foodName}</h1>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">{listing.foodDescription}</p>
          </div>

          {/* Section 42: Countdown Timer Banner */}
          <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-emerald-800 uppercase block">Safe Consumption Deadline</span>
              {isAvailable ? (
                <CountdownTimer
                  deadline={listing.safeConsumptionDeadline}
                  initialMinutes={listing.minutesRemaining}
                />
              ) : isShelterRedirected ? (
                <span className="text-xs font-bold text-amber-700 flex items-center gap-1">
                  <Dog className="w-3.5 h-3.5" />
                  Redirected to Happy Tails Shelter
                </span>
              ) : (
                <span className="text-xs font-semibold text-gray-400">Status: {listing.status}</span>
              )}
            </div>
            
            {isAvailable && (
              <button
                onClick={() => triggerAnimalShelterFallback(listing.listingId)}
                className="text-[10px] text-emerald-700 hover:text-amber-700 underline font-semibold"
                title="Test safety fallback workflow"
              >
                Trigger Shelter Fallback
              </button>
            )}
          </div>

          {/* Food Specifications Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-gray-50 rounded-xl">
              <span className="text-[10px] text-gray-400 block uppercase font-bold">Preparation Freshness</span>
              <strong className="text-gray-800">{listing.preparationTime}</strong>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl">
              <span className="text-[10px] text-gray-400 block uppercase font-bold">Storage Method</span>
              <strong className="text-gray-800">{listing.storageCondition}</strong>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl">
              <span className="text-[10px] text-gray-400 block uppercase font-bold">Portion Volume</span>
              <strong className="text-gray-800">{listing.quantity}</strong>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl">
              <span className="text-[10px] text-gray-400 block uppercase font-bold">Packaging Standard</span>
              <strong className="text-gray-800">{listing.packagingInfo}</strong>
            </div>
          </div>

          {/* Allergen declaration */}
          {listing.allergenInfo && listing.allergenInfo.length > 0 && (
            <div className="text-xs bg-amber-50/60 p-3 rounded-xl border border-amber-200">
              <span className="text-[10px] font-bold text-amber-900 uppercase block">Declared Allergens:</span>
              <span className="text-amber-800 font-medium">{listing.allergenInfo.join(', ')}</span>
            </div>
          )}

          {/* Section 10: Clear Price Separation */}
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-1.5 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Food Price:</span>
              <strong className="text-emerald-600 text-sm">₹0 (Zero / Free Food Rescue)</strong>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Charge:</span>
              <span>{listing.deliveryAvailable ? '₹49 (Optional for Individuals; Mandatory for NGOs)' : 'Self-pickup only'}</span>
            </div>
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="space-y-2 pt-2">
            {isAvailable ? (
              <button
                onClick={() => setClaimModalOpen(true)}
                className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/30 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>CLAIM FOOD (PRIORITY QUEUE)</span>
              </button>
            ) : (
              <button
                disabled
                className="w-full py-3.5 px-6 rounded-2xl bg-gray-100 text-gray-400 font-bold text-xs cursor-not-allowed"
              >
                Listing Status: {listing.status}
              </button>
            )}

            <button
              onClick={() => setShowMap(!showMap)}
              className="w-full py-2.5 px-4 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Map className="w-3.5 h-3.5" />
              <span>{showMap ? 'Hide Pickup Map' : 'View on Pickup Map'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Claim Modal */}
      {claimModalOpen && (
        <ClaimModal
          listing={listing}
          isOpen={claimModalOpen}
          onClose={() => setClaimModalOpen(false)}
        />
      )}
    </div>
  );
};
