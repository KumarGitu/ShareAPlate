import React from 'react';
import { FoodListing } from '../../types';
import { useApp } from '../../context/AppContext';
import { CountdownTimer } from '../common/CountdownTimer';
import {
  MapPin,
  Users,
  CheckCircle,
  Truck,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Dog,
  ExternalLink
} from 'lucide-react';

interface FoodCardProps {
  listing: FoodListing;
  onClaimClick?: (listing: FoodListing) => void;
  onViewDetails?: (listing: FoodListing) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  listing,
  onClaimClick,
  onViewDetails,
}) => {
  const { navigate, setSelectedListingId, triggerAnimalShelterFallback } = useApp();

  const handleCardClick = () => {
    setSelectedListingId(listing.listingId);
    if (onViewDetails) {
      onViewDetails(listing);
    } else {
      navigate('food-details', { listingId: listing.listingId });
    }
  };

  const isAvailable = listing.status === 'Available' || listing.status === 'Almost Claimed';
  const isRedirectedToShelter = listing.status === 'Redirected to Animal Shelter';

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-card transition-all duration-300 flex flex-col group">
      
      {/* Top Media Container */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100 cursor-pointer" onClick={handleCardClick}>
        <img
          src={listing.foodImage}
          alt={listing.foodName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Veg / Non-Veg Indicator */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <div
            className={`w-6 h-6 rounded-md bg-white/90 backdrop-blur-md flex items-center justify-center p-1 border shadow-xs ${
              listing.isVeg ? 'border-emerald-600' : 'border-rose-600'
            }`}
            title={listing.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                listing.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
              }`}
            />
          </div>

          {listing.isCelebrateAndShare && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-white shadow-sm">
              <Sparkles className="w-3 h-3" />
              Celebrate & Share
            </span>
          )}
        </div>

        {/* Free Tag */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-600 text-white shadow-md">
            ₹0 FREE
          </span>
        </div>

        {/* Bottom Banner on Image: Distance & Servings */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
          <span className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-md">
            <MapPin className="w-3 h-3 text-emerald-400" />
            {listing.distanceKm} km away
          </span>
          <span className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-md">
            <Users className="w-3 h-3 text-amber-400" />
            Serves {listing.servings} people
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Donor Info Header */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-xs font-semibold text-gray-500 truncate">{listing.donorName}</span>
              {listing.isVerifiedDonor && (
                <span title="Verified Food Donor">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                </span>
              )}
            </div>
            <span className="text-[11px] font-medium px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md">
              {listing.category}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={handleCardClick}
            className="text-base font-bold text-gray-900 group-hover:text-emerald-700 transition-colors cursor-pointer line-clamp-1"
          >
            {listing.foodName}
          </h3>

          <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
            {listing.foodDescription}
          </p>

          {/* Packaging & Safety metadata */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px]">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md font-medium">
              <Truck className="w-3 h-3" />
              {listing.deliveryAvailable ? 'Delivery Avail (₹49)' : 'Pickup Only'}
            </span>
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md font-medium truncate max-w-[140px]">
              {listing.packagingInfo}
            </span>
          </div>
        </div>

        {/* Card Footer: Countdown & Claim Action */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between mb-3">
            {isAvailable ? (
              <CountdownTimer
                deadline={listing.safeConsumptionDeadline}
                initialMinutes={listing.minutesRemaining}
                compact
              />
            ) : isRedirectedToShelter ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                <Dog className="w-3.5 h-3.5" />
                Animal Shelter Redirected
              </span>
            ) : (
              <span className="text-xs font-semibold text-gray-400">
                Status: {listing.status}
              </span>
            )}

            {/* Quick trigger simulation button for demo testing */}
            {isAvailable && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  triggerAnimalShelterFallback(listing.listingId);
                }}
                title="Simulate shelter fallback before expiry"
                className="text-[10px] text-gray-400 hover:text-amber-600 underline"
              >
                Simulate Fallback
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCardClick}
              className="flex-1 py-2 px-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
            >
              <span>Details</span>
              <ExternalLink className="w-3 h-3" />
            </button>

            {isAvailable ? (
              <button
                onClick={() => {
                  if (onClaimClick) onClaimClick(listing);
                  else {
                    setSelectedListingId(listing.listingId);
                    navigate('food-details', { listingId: listing.listingId });
                  }
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm shadow-emerald-600/20 hover:shadow transition-all"
              >
                Claim Food
              </button>
            ) : (
              <button
                disabled
                className="flex-1 py-2 px-3 rounded-xl bg-gray-100 text-gray-400 text-xs font-medium cursor-not-allowed"
              >
                {listing.status}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
