import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { FoodCard } from '../../components/food/FoodCard';
import { ClaimModal } from '../../components/food/ClaimModal';
import { MapVisualizer } from '../../components/map/MapVisualizer';
import { FoodListing, FoodCategory } from '../../types';
import {
  Search,
  MapPin,
  Filter,
  SlidersHorizontal,
  Map,
  Grid,
  Check,
  Clock,
  Sparkles,
  Truck,
  RotateCcw
} from 'lucide-react';

export const FindFood: React.FC = () => {
  const { listings, setSelectedListingId, navigate } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All Locations');
  const [vegOnly, setVegOnly] = useState(false);
  const [deliveryOnly, setDeliveryOnly] = useState(false);
  const [maxDistance, setMaxDistance] = useState<number>(10);
  const [urgentOnly, setUrgentOnly] = useState(false);
  const [showMapView, setShowMapView] = useState(false);
  const [claimingListing, setClaimingListing] = useState<FoodListing | null>(null);

  const categories: (FoodCategory | 'All')[] = [
    'All',
    'Biryani',
    'Complete meals',
    'Rice',
    'Dal',
    'Roti',
    'Bakery',
    'Snacks',
    'Packaged food',
  ];

  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      // Status check (available or almost claimed)
      const isClaimable = item.status === 'Available' || item.status === 'Almost Claimed';
      if (!isClaimable) return false;

      // Search query (intelligent match on food name, donor name, ingredients)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.foodName.toLowerCase().includes(q);
        const matchesDonor = item.donorName.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        const matchesDesc = item.foodDescription.toLowerCase().includes(q);
        if (!matchesName && !matchesDonor && !matchesCategory && !matchesDesc) return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Veg filter
      if (vegOnly && !item.isVeg) return false;

      // Delivery filter
      if (deliveryOnly && !item.deliveryAvailable) return false;

      // Distance filter
      if (item.distanceKm > maxDistance) return false;

      // Urgent filter (< 30 minutes remaining)
      if (urgentOnly && (item.minutesRemaining || 0) > 30) return false;

      return true;
    });
  }, [listings, searchQuery, selectedCategory, vegOnly, deliveryOnly, maxDistance, urgentOnly]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setVegOnly(false);
    setDeliveryOnly(false);
    setMaxDistance(10);
    setUrgentOnly(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Zomato-Inspired Food Rescue Discovery
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
            Discover Surplus Food Ready for Rescue
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Verified kitchens sharing untouched meals • ₹0 food cost • Real-time priority queue
          </p>
        </div>

        {/* View Switcher Toggle */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setShowMapView(false)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              !showMapView ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>Card Grid</span>
          </button>
          <button
            onClick={() => setShowMapView(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              showMapView ? 'bg-white text-emerald-700 shadow-xs' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>Interactive Map</span>
          </button>
        </div>
      </div>

      {/* Search Bar & Location Selector */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center gap-3">
        {/* Location Dropdown */}
        <div className="flex items-center gap-2 w-full md:w-64 px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-700">
          <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-transparent w-full font-medium focus:outline-none cursor-pointer"
          >
            <option value="All Locations">All Delhi NCR (Connaught Pl, South Ex)</option>
            <option value="South Delhi">South Delhi (1.8 km)</option>
            <option value="Central Delhi">Central Delhi (2.4 km)</option>
            <option value="West Delhi">West Delhi (3.1 km)</option>
          </select>
        </div>

        {/* Search Input */}
        <div className="flex items-center gap-2 flex-1 w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search surplus meals (e.g. 'Biryani near me', 'Dal Makhani', 'Sharma Caterers')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent w-full font-medium text-gray-800 placeholder-gray-400 focus:outline-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600 text-xs">
              Clear
            </button>
          )}
        </div>

        {/* Reset button */}
        {(searchQuery || selectedCategory !== 'All' || vegOnly || deliveryOnly || urgentOnly || maxDistance < 10) && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-semibold px-3 py-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Categories Horizontal Pills (Zomato style) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-500'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Quick Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
        {/* Pure Veg Toggle */}
        <button
          onClick={() => setVegOnly(!vegOnly)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
            vegOnly
              ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold'
              : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className="w-3 h-3 rounded border border-emerald-600 flex items-center justify-center p-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          </div>
          <span>Pure Veg</span>
          {vegOnly && <Check className="w-3 h-3 text-emerald-600" />}
        </button>

        {/* Platform Delivery Filter */}
        <button
          onClick={() => setDeliveryOnly(!deliveryOnly)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
            deliveryOnly
              ? 'border-blue-600 bg-blue-50 text-blue-800 font-bold'
              : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Truck className="w-3.5 h-3.5 text-blue-600" />
          <span>Delivery Available</span>
          {deliveryOnly && <Check className="w-3 h-3 text-blue-600" />}
        </button>

        {/* Urgent (<30 mins) */}
        <button
          onClick={() => setUrgentOnly(!urgentOnly)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
            urgentOnly
              ? 'border-amber-600 bg-amber-50 text-amber-800 font-bold'
              : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          <span>Urgent (Under 30 mins)</span>
          {urgentOnly && <Check className="w-3 h-3 text-amber-600" />}
        </button>

        {/* Distance Range */}
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-gray-200">
          <span className="text-gray-500 font-medium">Radius:</span>
          <span className="font-bold text-gray-800">{maxDistance} km</span>
          <input
            type="range"
            min="1"
            max="15"
            value={maxDistance}
            onChange={(e) => setMaxDistance(Number(e.target.value))}
            className="w-20 accent-emerald-600 cursor-pointer"
          />
        </div>

        <span className="text-gray-400 text-xs ml-auto font-medium">
          Showing <strong>{filteredListings.length}</strong> active meals
        </span>
      </div>

      {/* Main Content: Map or Grid */}
      {showMapView ? (
        <div className="space-y-4">
          <MapVisualizer height="h-[520px]" interactive />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredListings.map((item) => (
              <FoodCard
                key={item.listingId}
                listing={item}
                onClaimClick={(l) => setClaimingListing(l)}
                onViewDetails={(l) => {
                  setSelectedListingId(l.listingId);
                  navigate('food-details', { listingId: l.listingId });
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>
          {filteredListings.length === 0 ? (
            /* SECTION 35: ERROR / EMPTY STATES */
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 p-8 space-y-4">
              <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">No surplus food matching your criteria</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Try expanding your search distance or removing specific filters. Commercial kitchens post fresh surplus throughout lunch and dinner hours.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-sm hover:bg-emerald-700"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredListings.map((item) => (
                <FoodCard
                  key={item.listingId}
                  listing={item}
                  onClaimClick={(l) => setClaimingListing(l)}
                  onViewDetails={(l) => {
                    setSelectedListingId(l.listingId);
                    navigate('food-details', { listingId: l.listingId });
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Claim Modal */}
      {claimingListing && (
        <ClaimModal
          listing={claimingListing}
          isOpen={!!claimingListing}
          onClose={() => setClaimingListing(null)}
        />
      )}
    </div>
  );
};
