import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Cake,
  Heart,
  PartyPopper,
  Briefcase,
  Gift,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Package,
  EyeOff,
  Users,
  ShieldCheck,
  Building2,
  Dog
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CelebrateAndShare: React.FC = () => {
  const { currentUser, addListing, navigate } = useApp();

  const [step, setStep] = useState<number>(1);

  // Flow State
  const [occasion, setOccasion] = useState<string>('Birthday');
  const [customOccasionTitle, setCustomOccasionTitle] = useState('Rahul’s 28th Birthday Bash');
  const [foodType, setFoodType] = useState('Gourmet Treats, Paneer Wraps & Chocolate Truffle Cake');
  const [servings, setServings] = useState<number>(20);
  const [packagingSize, setPackagingSize] = useState<'Small' | 'Medium' | 'Large'>('Medium');
  const [cardMessage, setCardMessage] = useState('Sharing happiness on my birthday ❤️ Hope this meal brings a warm smile!');
  const [hideDonorName, setHideDonorName] = useState(false);
  const [recipientPreference, setRecipientPreference] = useState<'Anyone nearby' | 'NGO' | 'Community' | 'Shelter fallback'>('NGO');

  const occasions = [
    { id: 'Birthday', icon: <Cake className="w-5 h-5 text-rose-500" />, label: 'Birthday Celebration' },
    { id: 'Wedding', icon: <Heart className="w-5 h-5 text-pink-500" />, label: 'Wedding / Sangeet' },
    { id: 'Anniversary', icon: <PartyPopper className="w-5 h-5 text-amber-500" />, label: 'Anniversary' },
    { id: 'Corporate', icon: <Briefcase className="w-5 h-5 text-blue-500" />, label: 'Corporate Gala / Event' },
    { id: 'Other', icon: <Gift className="w-5 h-5 text-emerald-500" />, label: 'Religious / Family Gathering' },
  ];

  const handleFinalConfirm = () => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 },
    });

    const listing = addListing({
      donorId: currentUser.userId,
      donorName: hideDonorName ? 'Anonymous Well-Wisher' : `${currentUser.name} (${occasion})`,
      donorType: 'Individual',
      donorAvatar: currentUser.avatar,
      isVerifiedDonor: true,
      foodName: `${occasion} Special: ${foodType}`,
      category: 'Complete meals',
      foodDescription: `Special celebration meal batch sponsored with love. "${cardMessage}"`,
      quantity: `${servings} celebration portions in ${packagingSize} gift packaging`,
      servings,
      isVeg: true,
      preparationDate: 'Today',
      preparationTime: 'Just prepared',
      safeConsumptionDeadline: new Date(Date.now() + 90 * 60 * 1000).toISOString(),
      minutesRemaining: 90,
      storageCondition: 'Room Temperature',
      pickupLocation: currentUser.location,
      distanceKm: 0.8,
      price: 0,
      isFree: true,
      deliveryAvailable: true,
      packagingInfo: `Eco-friendly festive gift boxes (${packagingSize}) with personalized greeting`,
      packagingSize,
      allergenInfo: ['Dairy', 'Gluten'],
      specialInstructions: 'Festive packaging with greeting note attached. Handle with love.',
      foodImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80',
      isCelebrateAndShare: true,
      celebrationDetails: {
        occasion,
        message: cardMessage,
        donorHidden: hideDonorName,
        recipientPref: recipientPreference,
      },
    });

    setStep(6);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* SECTION 38: HERO HEADLINE */}
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider border border-orange-300">
          <Sparkles className="w-3.5 h-3.5 text-orange-600" />
          Celebrate & Share Dedicated Experience
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          “Make Your Celebration Feed Someone Too.”
        </h1>
        <p className="text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
          Turn milestone moments into joy for those who need it most. We provide custom hygienic packaging and personal blessing cards.
        </p>
      </div>

      {/* Progress Dots */}
      {step < 6 && (
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${
                step === s ? 'w-8 bg-sap-orange-600' : step > s ? 'w-4 bg-emerald-500' : 'w-2 bg-gray-200'
              }`}
            />
          ))}
        </div>
      )}

      {/* STEP CONTAINER */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-6 sm:p-10 relative overflow-hidden">
        
        {/* STEP 1: CHOOSE OCCASION */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block">Step 1 of 5</span>
              <h2 className="text-xl font-extrabold text-gray-900 mt-1">What are you celebrating today?</h2>
              <p className="text-xs text-gray-500">Pick the occasion to personalize your donation journey.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {occasions.map((occ) => (
                <button
                  key={occ.id}
                  type="button"
                  onClick={() => setOccasion(occ.id)}
                  className={`p-4 rounded-2xl border-2 text-left flex items-start gap-3 transition-all ${
                    occasion === occ.id
                      ? 'border-orange-500 bg-orange-50/60 shadow-sm ring-1 ring-orange-400'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="p-2 rounded-xl bg-white shadow-xs border border-gray-100">{occ.icon}</div>
                  <div>
                    <strong className="block text-sm font-bold text-gray-900">{occ.label}</strong>
                    <span className="text-[11px] text-gray-400">Share your joy</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-2">
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Occasion Title / Note</label>
              <input
                type="text"
                value={customOccasionTitle}
                onChange={(e) => setCustomOccasionTitle(e.target.value)}
                placeholder="e.g. My 25th Birthday, Rahul & Pooja Wedding reception"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-sap-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all"
              >
                <span>Next: Food Quantity</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: FOOD QUANTITY & SERVINGS */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block">Step 2 of 5</span>
              <h2 className="text-xl font-extrabold text-gray-900 mt-1">What celebration food are you sharing?</h2>
              <p className="text-xs text-gray-500">Provide details so our verified partners can prepare distribution.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Dishes / Items *</label>
                <input
                  type="text"
                  value={foodType}
                  onChange={(e) => setFoodType(e.target.value)}
                  placeholder="e.g. Freshly Baked Chocolate Cake + Paneer Puffs + Fruit juice packs"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  How many people will this feed? ({servings} Servings)
                </label>
                <input
                  type="range"
                  min="5"
                  max="150"
                  step="5"
                  value={servings}
                  onChange={(e) => setServings(Number(e.target.value))}
                  className="w-full accent-orange-600 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 font-semibold mt-1">
                  <span>5 People (Family)</span>
                  <span className="text-orange-600 font-bold">{servings} Portions</span>
                  <span>150 People (Banquet)</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-3 bg-sap-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all"
              >
                <span>Next: Custom Packaging</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CUSTOM PACKAGING (Section 13) */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block">Step 3 of 5</span>
              <h2 className="text-xl font-extrabold text-gray-900 mt-1">Select Custom Celebration Packaging</h2>
              <p className="text-xs text-gray-500">
                ShareAPlate provides hygienic, presentable, occasion-friendly, and eco-conscious meal boxes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { size: 'Small' as const, portions: '1–2 meal portions', desc: 'Ideal for individual gift hampers or street distribution' },
                { size: 'Medium' as const, portions: '3–5 meal portions', desc: 'Standard family meal boxes with partitioned sections' },
                { size: 'Large' as const, portions: '6–10 meal portions', desc: 'Bulk insulated sharing crates for shelters and community halls' },
              ].map((pack) => (
                <button
                  key={pack.size}
                  type="button"
                  onClick={() => setPackagingSize(pack.size)}
                  className={`p-4 rounded-2xl border-2 text-left space-y-2 transition-all ${
                    packagingSize === pack.size
                      ? 'border-orange-500 bg-orange-50/70 shadow-sm ring-1 ring-orange-400'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-gray-900 text-sm">{pack.size} Packaging</h3>
                    <p className="text-xs font-semibold text-orange-600">{pack.portions}</p>
                    <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{pack.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>
                All boxes are 100% biodegradable, heat-retentive, tamper-sealed, and marked with food-grade certifications.
              </span>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(4)}
                className="px-6 py-3 bg-sap-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all"
              >
                <span>Next: Greeting Card & Note</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: OCCASION MESSAGE & PRIVACY */}
        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block">Step 4 of 5</span>
              <h2 className="text-xl font-extrabold text-gray-900 mt-1">Add Personalized Message & Card</h2>
              <p className="text-xs text-gray-500">Every box will feature this printed festive card note.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                Card Greeting Message
              </label>
              <textarea
                rows={3}
                value={cardMessage}
                onChange={(e) => setCardMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  '“Sharing happiness on my birthday ❤️”',
                  '“With Love & Best Wishes”',
                  '“In Celebration of our Wedding Anniversary”',
                  '“May this meal bring you warmth and joy!”',
                ].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setCardMessage(preset)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-900 transition-colors"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Donor Privacy Option */}
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <EyeOff className="w-5 h-5 text-gray-500" />
                <div>
                  <strong className="text-xs font-bold text-gray-900 block">Hide My Name on the Packaging</strong>
                  <span className="text-[11px] text-gray-500">Print as "Anonymous Well-Wisher"</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={hideDonorName}
                onChange={(e) => setHideDonorName(e.target.checked)}
                className="w-5 h-5 text-orange-600 rounded"
              />
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(3)}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(5)}
                className="px-6 py-3 bg-sap-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all"
              >
                <span>Next: Recipient Preference</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: RECIPIENT PREFERENCE */}
        {step === 5 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block">Step 5 of 5</span>
              <h2 className="text-xl font-extrabold text-gray-900 mt-1">Choose Recipient Routing Preference</h2>
              <p className="text-xs text-gray-500">Who would you love to receive your celebration food first?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'NGO' as const, title: 'Verified NGOs & Child Centers', desc: 'Direct allocation to registered hunger-relief centers', icon: <Building2 className="w-5 h-5 text-emerald-600" /> },
                { id: 'Anyone nearby' as const, title: 'Anyone in Need Nearby', desc: 'Individual families and verified individuals in radius', icon: <Users className="w-5 h-5 text-blue-600" /> },
                { id: 'Community' as const, title: 'Community Pantries', desc: 'Public food-distribution points & gurudwara outreach', icon: <Heart className="w-5 h-5 text-rose-600" /> },
                { id: 'Shelter fallback' as const, title: 'Animal Sanctuary Fallback', desc: 'Redirected immediately if unclaimed within safety limits', icon: <Dog className="w-5 h-5 text-amber-600" /> },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setRecipientPreference(opt.id)}
                  className={`p-4 rounded-2xl border-2 text-left flex items-start gap-3 transition-all ${
                    recipientPreference === opt.id
                      ? 'border-orange-500 bg-orange-50/70 shadow-sm ring-1 ring-orange-400'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="p-2 rounded-xl bg-white shadow-xs border">{opt.icon}</div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-900">{opt.title}</h3>
                    <p className="text-[11px] text-gray-500 mt-0.5">{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(4)}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleFinalConfirm}
                className="px-8 py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-orange-600/30 transition-all"
              >
                <span>Confirm & Celebrate with Impact!</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: CONFIRMATION & EMOTIONAL REWARD (Section 38 Step 6) */}
        {step === 6 && (
          <div className="text-center py-6 space-y-6 animate-scale-up">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center mx-auto shadow-xl">
              <Sparkles className="w-10 h-10 animate-spin-slow" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                Celebration Donation Active
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                “Your celebration is now sharing happiness beyond your guest list.”
              </h2>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Thank you for choosing to celebrate by feeding others. Your batch of <strong>{servings} portions</strong> is dispatched with custom <strong>{packagingSize} packaging</strong>.
              </p>
            </div>

            {/* Impact preview card */}
            <div className="max-w-md mx-auto bg-orange-50/60 p-5 rounded-2xl border border-orange-200 text-left text-xs space-y-2">
              <div className="flex justify-between font-bold text-orange-950">
                <span>Occasion:</span>
                <span>{customOccasionTitle}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Greeting Note:</span>
                <span className="italic truncate max-w-[200px]">"{cardMessage}"</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Target Beneficiary:</span>
                <span>{recipientPreference}</span>
              </div>
              <div className="border-t border-orange-200 pt-2 flex justify-between font-bold text-emerald-700">
                <span>Estimated Impact:</span>
                <span>+{servings} Happy Plates Rescued</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
              <button
                onClick={() => navigate('find-food')}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all"
              >
                View in Live Discovery
              </button>
              <button
                onClick={() => navigate('donor-dashboard')}
                className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 rounded-xl text-xs font-bold transition-all"
              >
                Go to Donor Hub
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
