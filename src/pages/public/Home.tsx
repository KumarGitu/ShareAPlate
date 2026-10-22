import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FoodCard } from '../../components/food/FoodCard';
import { ClaimModal } from '../../components/food/ClaimModal';
import { FoodListing } from '../../types';
import {
  UtensilsCrossed,
  Heart,
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowRight,
  Dog,
  Users,
  CheckCircle,
  Clock,
  Sparkle,
  Scale,
  Building2,
  ChevronRight,
  Award
} from 'lucide-react';

export const Home: React.FC = () => {
  const { listings, stats, navigate, setSelectedListingId } = useApp();
  const [claimingListing, setClaimingListing] = useState<FoodListing | null>(null);

  const availableListings = listings.filter((l) => l.status === 'Available' || l.status === 'Almost Claimed').slice(0, 4);

  return (
    <div className="space-y-20 pb-16">
      
      {/* SECTION 16: HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-emerald-50/70 via-sap-cream-50 to-white">
        {/* Soft background glow circles */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 left-10 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-bold tracking-wide shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Zero-Waste Food Rescue & Redistribution</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.12]">
                Good Food Deserves a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-600 to-sap-orange-600">Second Plate.</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
                Share surplus food with people who need it, eliminate food waste, and turn every celebration into an opportunity to feed hope.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => navigate('share-food')}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>Share Food</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate('find-food')}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-gray-50 text-gray-800 font-bold text-sm border border-gray-200 shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
                >
                  <span>Find Food Near You</span>
                </button>

                <button
                  onClick={() => navigate('celebrate-and-share')}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-orange-50 hover:bg-orange-100 text-sap-orange-700 font-bold text-sm border border-orange-200 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-sap-orange-600" />
                  <span>Celebrate & Share</span>
                </button>
              </div>

              {/* Journey Visual Pill */}
              <div className="pt-4 border-t border-gray-200/80">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  The Rescue Journey:
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-semibold text-gray-700">
                  <span className="px-3 py-1 bg-white rounded-lg border border-gray-200 shadow-xs">1. Food Donor</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200 shadow-xs">2. Surplus Listed</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  <span className="px-3 py-1 bg-white rounded-lg border border-gray-200 shadow-xs">3. ShareAPlate Queue</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  <span className="px-3 py-1 bg-amber-50 text-amber-900 rounded-lg border border-amber-200 shadow-xs">4. Verified Recipient</span>
                </div>
              </div>
            </div>

            {/* Right Hero Interactive Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 relative z-10 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">Live Surplus Alert</span>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    ₹0 FREE
                  </span>
                </div>

                <div className="relative rounded-2xl overflow-hidden h-48">
                  <img
                    src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80"
                    alt="Dum Biryani"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md p-2 rounded-xl text-white text-xs flex justify-between items-center">
                    <span>Green Leaf Restaurant</span>
                    <span className="font-bold text-amber-400">1.8 km away</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-extrabold text-gray-900 text-lg">Dum Hyderabadi Veg Biryani</h3>
                  <p className="text-xs text-gray-500 mt-0.5">25 Portions • Insulated commercial boxes • Ready for pickup</p>
                </div>

                <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-emerald-800">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>Safe Window: <strong>Claim within 38 mins</strong></span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                    Priority Queue Active
                  </span>
                </div>

                <button
                  onClick={() => {
                    setSelectedListingId('list-101');
                    navigate('food-details', { listingId: 'list-101' });
                  }}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>View Details & Claim</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Floating Decorative Badge */}
              <div className="absolute -bottom-6 -left-6 z-20 bg-white p-3.5 rounded-2xl shadow-xl border border-gray-100 hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <Dog className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400">Zero Food Landfill</p>
                  <p className="text-xs font-bold text-gray-900">Shelter Fallback Network</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 17: IMPACT COUNTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-900 via-sap-charcoal-900 to-emerald-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-2xl" />
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
              Real-Time Platform Counter
            </span>
            <h2 className="text-3xl font-extrabold mt-1">Our Collective Rescue Impact</h2>
            <p className="text-sm text-gray-300 mt-2">
              Every surplus meal redirected creates measurable change across communities and ecosystems.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 block font-mono">
                {stats.mealsRescued.toLocaleString()}+
              </span>
              <span className="text-xs text-gray-300 font-semibold mt-1 block">Meals Rescued</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 block font-mono">
                {stats.peopleServed.toLocaleString()}+
              </span>
              <span className="text-xs text-gray-300 font-semibold mt-1 block">People Served</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-300 block font-mono">
                {stats.foodWastePreventedKg.toLocaleString()} kg
              </span>
              <span className="text-xs text-gray-300 font-semibold mt-1 block">Food Waste Prevented</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <span className="text-3xl sm:text-4xl font-extrabold text-orange-400 block font-mono">
                {stats.ngosConnected} + {stats.animalSheltersConnected}
              </span>
              <span className="text-xs text-gray-300 font-semibold mt-1 block">NGOs & Animal Shelters</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 17: HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-3">How ShareAPlate Works</h2>
          <p className="text-sm text-gray-600 mt-2">
            A seamless bridge from commercial surplus kitchens to verified hunger-relief partners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm hover:shadow-card transition-all text-center group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
              <UtensilsCrossed className="w-7 h-7" />
            </div>
            <div className="text-xs font-bold text-emerald-600 mb-1">Step 1</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">1. Share Surplus</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Restaurants, caterers, hotels, or celebrants list extra safe food with portions, safe countdown, and packaging specifications.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm hover:shadow-card transition-all text-center group">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
              <Users className="w-7 h-7" />
            </div>
            <div className="text-xs font-bold text-amber-600 mb-1">Step 2</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">2. Connect & Claim</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Verified NGOs and individuals claim food via a time-priority queue. First eligible claim secures the reservation at ₹0 food cost.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm hover:shadow-card transition-all text-center group">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
              <Truck className="w-7 h-7" />
            </div>
            <div className="text-xs font-bold text-blue-600 mb-1">Step 3</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">3. Deliver & Feed</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Self-pickup or platform cargo courier dispatches with dual OTP verification. NGO deliveries are compulsory to ensure hygiene.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 17: LIVE FOOD NEAR YOU */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Active Rescue Batches</span>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-1">Live Surplus Food Near You</h2>
            <p className="text-sm text-gray-500 mt-1">
              Freshly cooked untouched meals with active safe consumption countdowns.
            </p>
          </div>

          <button
            onClick={() => navigate('find-food')}
            className="flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 transition-colors"
          >
            <span>Explore All Listings ({listings.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {availableListings.map((listing) => (
            <FoodCard
              key={listing.listingId}
              listing={listing}
              onClaimClick={(l) => setClaimingListing(l)}
              onViewDetails={(l) => {
                setSelectedListingId(l.listingId);
                navigate('food-details', { listingId: l.listingId });
              }}
            />
          ))}
        </div>
      </section>

      {/* SECTION 12 & 38: CELEBRATE & SHARE HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-sap-orange-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Special Occasion Donation Flow
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                “Make Your Celebration Feed Someone Too.”
              </h2>
              <p className="text-base text-orange-100 max-w-2xl leading-relaxed">
                Hosting a birthday, wedding, anniversary, or family function? Share the joy by sponsoring hygienic, custom-packaged celebration meals with personalized greeting notes.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('celebrate-and-share')}
                  className="px-6 py-3.5 bg-white text-orange-600 hover:bg-orange-50 font-extrabold rounded-2xl text-xs shadow-md hover:scale-105 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-orange-500" />
                  <span>Start “Celebrate & Share” Flow</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-white space-y-3">
              <div className="text-xs font-bold uppercase text-orange-200">Custom Packaging Included:</div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-white/10 rounded-xl flex justify-between">
                  <span>Small Pack</span>
                  <strong className="font-semibold">1–2 meal portions</strong>
                </div>
                <div className="p-2.5 bg-white/10 rounded-xl flex justify-between">
                  <span>Medium Pack</span>
                  <strong className="font-semibold">3–5 meal portions</strong>
                </div>
                <div className="p-2.5 bg-white/10 rounded-xl flex justify-between">
                  <span>Large Pack</span>
                  <strong className="font-semibold">6–10 meal portions</strong>
                </div>
              </div>
              <p className="text-[11px] text-orange-100 italic">
                * Eco-conscious, hygienic tamper-evident boxes with personal occasion card.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 15 & 17: HOW SHAREAPLATE PREVENTS WASTE & ANIMAL SHELTER FALLBACK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Dog className="w-4 h-4" />
                The Zero-Waste Fallback Guarantee
              </span>
              <h2 className="text-3xl font-extrabold">How ShareAPlate Prevents 100% Waste</h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                Most platforms let food spoil if unclaimed. ShareAPlate executes a continuous multi-tier fallback pipeline:
              </p>

              {/* Pipeline chart */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 text-xs">
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                  <span className="text-[10px] text-gray-400 font-bold block">1. Priority Tier</span>
                  <strong className="text-emerald-400">Verified NGOs</strong>
                  <p className="text-[10px] text-gray-400 mt-1">Shelters & Slum kitchens</p>
                </div>
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                  <span className="text-[10px] text-gray-400 font-bold block">2. Public Tier</span>
                  <strong className="text-blue-400">Individuals & Groups</strong>
                  <p className="text-[10px] text-gray-400 mt-1">Families in need</p>
                </div>
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                  <span className="text-[10px] text-gray-400 font-bold block">3. Safety Warning</span>
                  <strong className="text-amber-400">Countdown Alert</strong>
                  <p className="text-[10px] text-gray-400 mt-1">Deadline approaching</p>
                </div>
                <div className="p-3 bg-emerald-950/80 rounded-xl border border-emerald-600">
                  <span className="text-[10px] text-emerald-300 font-bold block">4. Final Fallback</span>
                  <strong className="text-emerald-400">Animal Shelters</strong>
                  <p className="text-[10px] text-emerald-300 mt-1">Zero food landfill</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Food Safety is Non-Negotiable</span>
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                “Only donate food that is safe for consumption.” All listings require preparation timestamps, storage method declarations, and safe consumption deadlines. Expired food is never allowed to be claimed.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigate('animal-shelters')}
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-bold text-white transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Learn about Animal Shelter Network</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 17: TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Voices from the Network</span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Loved by Donors, NGOs & Communities</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
            <p className="text-xs text-gray-600 italic leading-relaxed">
              “Instead of discarding leftover presidential banquet meals, we redirect 200+ plates each week directly to local child education centers. ShareAPlate makes dispatch effortless.”
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100"
                alt="The Grand Delhi Hotel"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <h4 className="text-xs font-bold text-gray-900">Banquet Operations</h4>
                <p className="text-[10px] text-gray-500">The Grand Delhi Hotel</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
            <p className="text-xs text-gray-600 italic leading-relaxed">
              “The compulsory delivery with electric cargo drivers changed our daily operations. We get fresh, untouched food delivered directly to our Lodhi Road shelter without logistical overhead.”
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=100"
                alt="Helping Hands"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <h4 className="text-xs font-bold text-gray-900">Helping Hands Foundation</h4>
                <p className="text-[10px] text-gray-500">Verified NGO Partner</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
            <p className="text-xs text-gray-600 italic leading-relaxed">
              “On my birthday, we fed 50 children and the unclaimed dry bread boxes automatically went to Happy Tails dog sanctuary. It was the most meaningful celebration of my life.”
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                alt="Rahul Verma"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <h4 className="text-xs font-bold text-gray-900">Rahul Verma</h4>
                <p className="text-[10px] text-gray-500">Celebrate & Share Donor</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 17: FINAL CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-10 sm:p-14 space-y-5">
          <span className="text-xs font-bold text-emerald-800 bg-white px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-300">
            Every Plate Counts
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            “Your Extra Meal Could Be Someone’s First.”
          </h2>
          <p className="text-sm text-gray-600 max-w-xl mx-auto">
            Join thousands of restaurants, NGOs, and conscious citizens fighting hunger and food waste together.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate('share-food')}
              className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-all"
            >
              Donate Food
            </button>
            <button
              onClick={() => navigate('find-food')}
              className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-gray-50 text-gray-800 font-bold text-sm rounded-xl border border-gray-200 transition-all"
            >
              Find Food
            </button>
          </div>
        </div>
      </section>

      {/* Claim Modal instance */}
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
