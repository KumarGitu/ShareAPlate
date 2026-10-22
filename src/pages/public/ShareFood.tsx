import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FoodCategory, DonorType } from '../../types';
import {
  UtensilsCrossed,
  ShieldCheck,
  Clock,
  MapPin,
  Package,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  Sparkles,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ShareFood: React.FC = () => {
  const { currentUser, addListing, navigate } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [foodName, setFoodName] = useState('');
  const [category, setCategory] = useState<FoodCategory>('Complete meals');
  const [foodDescription, setFoodDescription] = useState('');
  const [quantity, setQuantity] = useState('25 portions (approx 10 kg)');
  const [servings, setServings] = useState<number>(25);
  const [isVeg, setIsVeg] = useState(true);
  const [foodImage, setFoodImage] = useState(
    'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80'
  );

  // Safety & Timing
  const [preparationTime, setPreparationTime] = useState('Today, 7:00 PM');
  const [minutesRemaining, setMinutesRemaining] = useState<number>(60);
  const [storageCondition, setStorageCondition] = useState<'Hot / Insulated' | 'Room Temperature' | 'Refrigerated' | 'Chilled'>(
    'Hot / Insulated'
  );
  const [packagingInfo, setPackagingInfo] = useState('Hygienic sealed foil food containers');
  const [packagingSize, setPackagingSize] = useState<'Small' | 'Medium' | 'Large'>('Medium');
  const [allergens, setAllergens] = useState<string>('Dairy (Butter/Paneer), Gluten');
  const [specialInstructions, setSpecialInstructions] = useState('Keep warm. Direct collection from banquet service entry.');

  // Location
  const [pickupAddress, setPickupAddress] = useState(currentUser.location.address || 'Connaught Place, New Delhi');
  const [landmark, setLandmark] = useState('Dispatch Gate 2');
  const [deliveryAvailable, setDeliveryAvailable] = useState(true);

  // Confirmation & Safety declaration
  const [safetyConfirmed, setSafetyConfirmed] = useState(false);

  const categories: FoodCategory[] = [
    'Rice',
    'Roti',
    'Dal',
    'Sabzi',
    'Biryani',
    'Snacks',
    'Sweets',
    'Bakery',
    'Packaged food',
    'Fruits',
    'Vegetables',
    'Complete meals',
    'Wedding/event food',
    'Other',
  ];

  const handlePublishListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!safetyConfirmed) {
      alert('Please confirm the food safety declaration before publishing.');
      return;
    }

    const safeDeadline = new Date(Date.now() + minutesRemaining * 60 * 1000).toISOString();

    const created = addListing({
      donorId: currentUser.userId,
      donorName: currentUser.organizationName || currentUser.name,
      donorType: currentUser.donorType || 'Restaurant',
      donorAvatar: currentUser.avatar,
      isVerifiedDonor: currentUser.verificationStatus === 'Verified',
      foodName,
      category,
      foodDescription,
      quantity,
      servings: Number(servings),
      isVeg,
      preparationDate: 'Today',
      preparationTime,
      safeConsumptionDeadline: safeDeadline,
      minutesRemaining,
      storageCondition,
      pickupLocation: {
        address: pickupAddress,
        city: 'New Delhi',
        lat: currentUser.location.lat,
        lng: currentUser.location.lng,
        landmark,
      },
      distanceKm: 1.2,
      price: 0,
      isFree: true,
      deliveryAvailable,
      packagingInfo,
      packagingSize,
      allergenInfo: allergens.split(',').map((s) => s.trim()),
      specialInstructions,
      foodImage,
    });

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    navigate('food-details', { listingId: created.listingId });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title */}
      <div className="text-center mb-8">
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200">
          Surplus Food Donation Wizard
        </span>
        <h1 className="text-3xl font-extrabold text-gray-900 mt-2">Share Surplus Food</h1>
        <p className="text-sm text-gray-500 max-w-lg mx-auto mt-1">
          Connect your excess edible food with verified shelters and NGOs within minutes.
        </p>
      </div>

      {/* Multi-step Breadcrumb */}
      <div className="flex items-center justify-between mb-8 max-w-xl mx-auto">
        {[
          { step: 1, label: 'Food Details' },
          { step: 2, label: 'Safety & Time' },
          { step: 3, label: 'Pickup & Packaging' },
          { step: 4, label: 'Review & Publish' },
        ].map((item) => (
          <div key={item.step} className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                currentStep === item.step
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : currentStep > item.step
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {currentStep > item.step ? <CheckCircle2 className="w-5 h-5" /> : item.step}
            </div>
            <span
              className={`text-[11px] font-semibold mt-1 hidden sm:block ${
                currentStep === item.step ? 'text-gray-900 font-bold' : 'text-gray-400'
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Main Form Box */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8">
        
        {/* STEP 1: FOOD DETAILS */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-lg font-bold text-gray-900 pb-2 border-b border-gray-100 flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5 text-emerald-600" />
              <span>Step 1: Food Specifics & Servings</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Food Name / Dish Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Shahi Paneer & Butter Naan, Veg Pulao"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Food Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as FoodCategory)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Dietary Classification *
                </label>
                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsVeg(true)}
                    className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      isVeg ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    <span>Vegetarian</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsVeg(false)}
                    className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      !isVeg ? 'border-rose-600 bg-rose-50 text-rose-800' : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                    <span>Non-Vegetarian</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Estimated Servings *</label>
                <input
                  type="number"
                  min="1"
                  value={servings}
                  onChange={(e) => setServings(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <span className="text-[11px] text-gray-400 mt-0.5 block">How many people can this meal serve?</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Quantity / Volume Description</label>
                <input
                  type="text"
                  placeholder="e.g. 10 kg, 30 lunch trays, 2 large cauldrons"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Description & Ingredients</label>
                <textarea
                  rows={3}
                  placeholder="Briefly describe the food, preparation freshness, and taste profile..."
                  value={foodDescription}
                  onChange={(e) => setFoodDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Food Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={foodImage}
                    onChange={(e) => setFoodImage(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <div className="w-12 h-10 rounded-lg overflow-hidden border">
                    <img src={foodImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                disabled={!foodName.trim()}
                onClick={() => setCurrentStep(2)}
                className={`px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                  foodName.trim()
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span>Continue to Safety & Time</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SAFETY & TIME */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-lg font-bold text-gray-900 pb-2 border-b border-gray-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Step 2: Food Safety & Safe Consumption Window</span>
            </h2>

            {/* Section 14 Notice */}
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Mandatory Food Safety Commitment:</strong>
                “Only donate food that is safe for human consumption.” ShareAPlate automatically disables listings after the safe-consumption deadline, triggering animal sanctuary fallback for eligible foods.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Preparation Time *</label>
                <input
                  type="text"
                  value={preparationTime}
                  onChange={(e) => setPreparationTime(e.target.value)}
                  placeholder="e.g. Today, 7:30 PM"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Safe Window Duration ({minutesRemaining} Minutes) *
                </label>
                <input
                  type="range"
                  min="20"
                  max="180"
                  step="10"
                  value={minutesRemaining}
                  onChange={(e) => setMinutesRemaining(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer mt-3"
                />
                <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                  <span>20 min (Urgent)</span>
                  <span>60 min (Normal)</span>
                  <span>180 min (Extended)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Storage Condition *</label>
                <select
                  value={storageCondition}
                  onChange={(e) => setStorageCondition(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                >
                  <option value="Hot / Insulated">Hot / Insulated Containers</option>
                  <option value="Room Temperature">Room Temperature (Dry / Bakery)</option>
                  <option value="Refrigerated">Refrigerated (Below 4°C)</option>
                  <option value="Chilled">Chilled / Cold Dessert</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Allergens Declared</label>
                <input
                  type="text"
                  value={allergens}
                  onChange={(e) => setAllergens(e.target.value)}
                  placeholder="e.g. Dairy, Gluten, Peanuts, None"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Special Handling Instructions</label>
                <input
                  type="text"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. Keep foil tightly closed; heat before serving"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-5 py-3 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-6 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold flex items-center gap-2"
              >
                <span>Continue to Pickup & Packaging</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PICKUP & PACKAGING */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-lg font-bold text-gray-900 pb-2 border-b border-gray-100 flex items-center gap-2">
              <Package className="w-5 h-5 text-emerald-600" />
              <span>Step 3: Pickup Location & Packaging</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Pickup Address (Commercial / Event Venue) *
                </label>
                <input
                  type="text"
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Landmark / Gate Instructions</label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. Service Gate 3, tell security you are from ShareAPlate"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Packaging Description *</label>
                <input
                  type="text"
                  value={packagingInfo}
                  onChange={(e) => setPackagingInfo(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Packaging Size Options */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Parcel Packaging Category</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['Small', 'Medium', 'Large'] as const).map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setPackagingSize(size)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        packagingSize === size
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <span className="block text-xs font-bold">{size}</span>
                      <span className="text-[10px] text-gray-400">
                        {size === 'Small' ? '1–2 portions' : size === 'Medium' ? '3–5 portions' : '6–10 portions'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery Permission */}
              <div className="pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deliveryAvailable}
                    onChange={(e) => setDeliveryAvailable(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded border-gray-300"
                  />
                  <span className="text-xs text-gray-700 font-medium">
                    Allow platform electric courier pickup (Compulsory for NGOs, optional for individuals)
                  </span>
                </label>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-5 py-3 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="px-6 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold flex items-center gap-2"
              >
                <span>Review & Publish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW & CONFIRM */}
        {currentStep === 4 && (
          <form onSubmit={handlePublishListing} className="space-y-6 animate-fade-in">
            <h2 className="text-lg font-bold text-gray-900 pb-2 border-b border-gray-100 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Step 4: Review Listing & Safety Declaration</span>
            </h2>

            {/* Listing Summary Preview */}
            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-3 text-xs">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400">{category}</span>
                  <h3 className="text-base font-extrabold text-gray-900">{foodName}</h3>
                  <p className="text-gray-500 mt-0.5">{foodDescription || 'No detailed description.'}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-600 text-white">
                  ₹0 FREE
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-gray-200 text-gray-700">
                <div>
                  <span className="text-gray-400 block text-[10px]">Dietary</span>
                  <strong>{isVeg ? '🌱 Pure Veg' : '🍗 Non-Veg'}</strong>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">Servings</span>
                  <strong>{servings} People</strong>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">Safe Window</span>
                  <strong className="text-emerald-700">{minutesRemaining} Minutes</strong>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">Storage</span>
                  <strong>{storageCondition}</strong>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200 text-gray-600">
                <span className="text-[10px] text-gray-400 block">Pickup Location</span>
                <span>{pickupAddress} ({landmark})</span>
              </div>
            </div>

            {/* Mandatory Safety Agreement */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={safetyConfirmed}
                  onChange={(e) => setSafetyConfirmed(e.target.checked)}
                  className="mt-1 w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                />
                <div className="text-xs text-amber-950 leading-relaxed">
                  <strong className="block font-bold">Food Safety Warranty</strong>
                  I solemnly verify that this surplus food was prepared in a hygienic environment, stored strictly under safe temperature controls, and is 100% wholesome for consumption. In case it remains unclaimed near expiry, I permit ShareAPlate to redirect it to an approved animal sanctuary.
                </div>
              </label>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-5 py-3 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                disabled={!safetyConfirmed}
                className={`px-8 py-3.5 rounded-xl font-bold text-xs shadow-md flex items-center gap-2 ${
                  safetyConfirmed
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/30'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                }`}
              >
                <span>Publish Surplus Food Listing</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
