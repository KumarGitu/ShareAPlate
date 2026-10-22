import React from 'react';
import { useApp } from '../../context/AppContext';
import { UtensilsCrossed, Users, Truck, Dog, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200">
          Platform Architecture & Process
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900">How ShareAPlate Works</h1>
        <p className="text-sm text-gray-600">
          From commercial surplus to verified recipients in 4 structured stages.
        </p>
      </div>

      <div className="space-y-6">
        {[
          {
            step: '01',
            title: 'Donor Surplus Listing',
            desc: 'Hotels, caterers, and individuals list edible excess meals. Every listing must declare quantity, servings, dietary tags (Veg/Non-Veg), allergens, and safe consumption deadlines.',
            badge: 'Food Safety Verification',
            color: 'emerald',
            icon: <UtensilsCrossed className="w-6 h-6 text-emerald-600" />,
          },
          {
            step: '02',
            title: 'Time-Priority Claim Queue',
            desc: 'Claims operate strictly on a first-come, first-served basis (sorted by claimTimestamp ASC). Priority queue locks the reservation immediately with ₹0 food charge.',
            badge: 'Time-Priority Engine',
            color: 'amber',
            icon: <Users className="w-6 h-6 text-amber-600" />,
          },
          {
            step: '03',
            title: 'Compulsory NGO Logistics & Delivery',
            desc: 'Verified NGOs receive compulsory platform delivery to maintain hygiene cold chains. Individuals can choose between Self-Pickup (₹0) or Platform Cargo Delivery (₹49).',
            badge: 'Section 9 Rule Compliance',
            color: 'blue',
            icon: <Truck className="w-6 h-6 text-blue-600" />,
          },
          {
            step: '04',
            title: 'Automated Animal Shelter Fallback',
            desc: 'If a food listing reaches the configured expiry threshold without a human claim, our system automatically triggers the animal shelter pipeline to feed rescued animals.',
            badge: 'Zero Landfill Waste',
            color: 'orange',
            icon: <Dog className="w-6 h-6 text-orange-600" />,
          },
        ].map((item) => (
          <div key={item.step} className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start gap-6">
            <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center font-black text-xl text-gray-900 flex-shrink-0">
              {item.step}
            </div>
            <div className="space-y-2 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {item.badge}
              </span>
              <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-4">
        <button
          onClick={() => navigate('find-food')}
          className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all inline-flex items-center gap-2"
        >
          <span>Explore Live Surplus Food</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
