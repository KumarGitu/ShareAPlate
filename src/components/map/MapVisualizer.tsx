import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FoodListing, AnimalShelter, Delivery } from '../../types';
import {
  MapPin,
  UtensilsCrossed,
  Building2,
  Dog,
  Navigation,
  Layers,
  Info,
  Maximize2,
  Clock,
  Truck
} from 'lucide-react';

interface MapVisualizerProps {
  height?: string;
  focusedDelivery?: Delivery | null;
  interactive?: boolean;
}

export const MapVisualizer: React.FC<MapVisualizerProps> = ({
  height = 'h-96',
  focusedDelivery = null,
  interactive = true,
}) => {
  const { listings, shelters, users, navigate, setSelectedListingId } = useApp();
  const [filterLayer, setFilterLayer] = useState<'all' | 'food' | 'ngos' | 'shelters'>('all');
  const [activePin, setActivePin] = useState<{
    id: string;
    type: 'food' | 'ngo' | 'shelter' | 'driver';
    title: string;
    subtitle: string;
    status?: string;
    actionId?: string;
  } | null>(null);

  // Normalize map coordinate projection within Delhi NCR bounding box:
  // Lat: 28.45 to 28.70, Lng: 77.05 to 77.30
  const minLat = 28.45;
  const maxLat = 28.70;
  const minLng = 77.05;
  const maxLng = 77.30;

  const projectCoords = (lat: number, lng: number) => {
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = (1 - (lat - minLat) / (maxLat - minLat)) * 100;
    return {
      x: Math.max(10, Math.min(90, x)),
      y: Math.max(10, Math.min(90, y)),
    };
  };

  const ngos = users.filter((u) => u.role === 'ngo');

  return (
    <div className={`relative w-full ${height} rounded-3xl overflow-hidden border border-gray-200 bg-slate-900 shadow-inner select-none`}>
      {/* Map Graphic Layer: Stylized Vector Dark Map */}
      <svg className="w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="#0f172a" />
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Stylized River (Yamuna) */}
        <path
          d="M 650 0 Q 600 200 580 400 T 520 800"
          fill="none"
          stroke="#0284c7"
          strokeWidth="14"
          strokeLinecap="round"
          className="opacity-40"
        />

        {/* Road arterial networks */}
        <path d="M 0 180 Q 400 220 800 150" fill="none" stroke="#475569" strokeWidth="3" opacity="0.6" />
        <path d="M 250 0 L 280 600" fill="none" stroke="#475569" strokeWidth="4" opacity="0.7" />
        <path d="M 500 0 L 460 600" fill="none" stroke="#475569" strokeWidth="4" opacity="0.7" />
        <circle cx="380" cy="240" r="140" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="6 6" opacity="0.4" />
        <circle cx="380" cy="240" r="260" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="6 6" opacity="0.25" />

        {/* Delivery Driver Route Line if focused */}
        {focusedDelivery && (
          <path
            d="M 280 230 Q 320 280 390 320"
            fill="none"
            stroke="#10b981"
            strokeWidth="5"
            strokeDasharray="8 6"
            className="animate-pulse"
          />
        )}
      </svg>

      {/* Floating Controls Bar */}
      {interactive && (
        <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-1.5 bg-slate-800/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700 shadow-lg text-xs">
          <button
            onClick={() => setFilterLayer('all')}
            className={`px-3 py-1 rounded-xl font-medium transition-all ${
              filterLayer === 'all' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-300 hover:text-white'
            }`}
          >
            All Pins
          </button>
          <button
            onClick={() => setFilterLayer('food')}
            className={`px-3 py-1 rounded-xl font-medium transition-all ${
              filterLayer === 'food' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-300 hover:text-white'
            }`}
          >
            Surplus Food ({listings.length})
          </button>
          <button
            onClick={() => setFilterLayer('ngos')}
            className={`px-3 py-1 rounded-xl font-medium transition-all ${
              filterLayer === 'ngos' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-300 hover:text-white'
            }`}
          >
            NGOs ({ngos.length})
          </button>
          <button
            onClick={() => setFilterLayer('shelters')}
            className={`px-3 py-1 rounded-xl font-medium transition-all ${
              filterLayer === 'shelters' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-300 hover:text-white'
            }`}
          >
            Shelters ({shelters.length})
          </button>
        </div>
      )}

      {/* Pins Layer */}
      <div className="absolute inset-0 pointer-events-auto">
        {/* Surplus Food Pins */}
        {(filterLayer === 'all' || filterLayer === 'food') &&
          listings.map((item) => {
            const { x, y } = projectCoords(item.pickupLocation.lat, item.pickupLocation.lng);
            return (
              <div
                key={item.listingId}
                style={{ left: `${x}%`, top: `${y}%` }}
                onClick={() =>
                  setActivePin({
                    id: item.listingId,
                    type: 'food',
                    title: item.foodName,
                    subtitle: `${item.servings} Servings • ${item.donorName} (${item.distanceKm} km)`,
                    status: item.status,
                    actionId: item.listingId,
                  })
                }
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group hover:z-30 transition-transform hover:scale-125"
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-white shadow-lg flex items-center justify-center text-white">
                    <UtensilsCrossed className="w-4 h-4" />
                  </div>
                  <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600"></span>
                  </span>
                </div>
              </div>
            );
          })}

        {/* NGO Pins */}
        {(filterLayer === 'all' || filterLayer === 'ngos') &&
          ngos.map((ngo) => {
            const { x, y } = projectCoords(ngo.location.lat, ngo.location.lng);
            return (
              <div
                key={ngo.userId}
                style={{ left: `${x}%`, top: `${y}%` }}
                onClick={() =>
                  setActivePin({
                    id: ngo.userId,
                    type: 'ngo',
                    title: ngo.organizationName || ngo.name,
                    subtitle: `${ngo.beneficiaryCount || 300} Beneficiaries • ${ngo.serviceArea || 'Delhi NCR'}`,
                    status: ngo.verificationStatus,
                  })
                }
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group hover:z-30 transition-transform hover:scale-125"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white shadow-lg flex items-center justify-center text-white">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>
            );
          })}

        {/* Animal Shelter Pins */}
        {(filterLayer === 'all' || filterLayer === 'shelters') &&
          shelters.map((shelter) => {
            const { x, y } = projectCoords(shelter.location.lat, shelter.location.lng);
            return (
              <div
                key={shelter.shelterId}
                style={{ left: `${x}%`, top: `${y}%` }}
                onClick={() =>
                  setActivePin({
                    id: shelter.shelterId,
                    type: 'shelter',
                    title: shelter.name,
                    subtitle: `${shelter.capacity} • ${shelter.location.address}`,
                    status: 'Fallback Destination',
                  })
                }
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group hover:z-30 transition-transform hover:scale-125"
              >
                <div className="w-8 h-8 rounded-full bg-amber-500 border-2 border-white shadow-lg flex items-center justify-center text-white">
                  <Dog className="w-4 h-4" />
                </div>
              </div>
            );
          })}

        {/* Driver Pin (Delivery simulation) */}
        {focusedDelivery && (
          <div
            style={{
              left: `${projectCoords(focusedDelivery.currentLocation.lat, focusedDelivery.currentLocation.lng).x}%`,
              top: `${projectCoords(focusedDelivery.currentLocation.lat, focusedDelivery.currentLocation.lng).y}%`,
            }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-1000"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-emerald-600 border-2 border-white shadow-xl flex items-center justify-center text-white animate-bounce">
                <Truck className="w-5 h-5" />
              </div>
              <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap font-bold">
                {focusedDelivery.driverName}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Active Pin Card Drawer */}
      {activePin && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-30 bg-slate-900/95 backdrop-blur-md border border-slate-700 p-4 rounded-2xl shadow-2xl text-white">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                {activePin.type.toUpperCase()} PIN
              </span>
              <h4 className="text-sm font-bold mt-0.5">{activePin.title}</h4>
              <p className="text-xs text-slate-300 mt-1">{activePin.subtitle}</p>
              {activePin.status && (
                <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {activePin.status}
                </span>
              )}
            </div>
            <button
              onClick={() => setActivePin(null)}
              className="text-slate-400 hover:text-white text-xs p-1"
            >
              ✕
            </button>
          </div>

          {activePin.actionId && (
            <div className="mt-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => {
                  setSelectedListingId(activePin.actionId!);
                  navigate('food-details', { listingId: activePin.actionId });
                }}
                className="w-full py-1.5 px-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-bold transition-colors"
              >
                View Listing & Claim
              </button>
            </div>
          )}
        </div>
      )}

      {/* Map Legend */}
      <div className="absolute bottom-3 left-3 hidden sm:flex items-center gap-3 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-[10px] text-slate-300">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Surplus Food
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span> Verified NGO
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span> Animal Shelter
        </span>
      </div>
    </div>
  );
};
