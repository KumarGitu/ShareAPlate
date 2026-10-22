import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const { showToast } = useApp();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('success', 'Message Received', 'Our emergency food dispatch team will contact you shortly.');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200">
          24/7 Helpline & Dispatch Support
        </span>
        <h1 className="text-3xl font-black text-gray-900">Get in Touch with ShareAPlate</h1>
        <p className="text-sm text-gray-500">Emergency food rescue coordination, NGO onboarding, or bulk surplus inquiries.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5 bg-slate-900 text-white p-7 rounded-3xl space-y-6">
          <h3 className="text-lg font-bold">Contact Coordinates</h3>
          <div className="space-y-4 text-xs text-gray-300">
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-emerald-400 mt-0.5" />
              <div>
                <strong className="block text-white">Emergency Food Rescue Hotline:</strong>
                <span>+91 1800-RESCUE-FOOD (Toll Free)</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-emerald-400 mt-0.5" />
              <div>
                <strong className="block text-white">NGO Partnerships & Audits:</strong>
                <span>partnerships@shareaplate.org</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-emerald-400 mt-0.5" />
              <div>
                <strong className="block text-white">Headquarters:</strong>
                <span>ShareAPlate Foundation, Cyber City, Gurugram / Delhi NCR, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 bg-white p-7 rounded-3xl border border-gray-200 shadow-xs">
          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-gray-900">Thank you for reaching out!</h3>
              <p className="text-xs text-gray-500">Our logistics operations desk will respond within 15 minutes.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-base font-bold text-gray-900">Send an Inquiry / Alert</h3>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Your Name</label>
                <input type="text" required placeholder="Full Name" className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email / Phone</label>
                <input type="text" required placeholder="contact@domain.com or +91..." className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Message / Food Surplus Volume</label>
                <textarea rows={3} required placeholder="Describe your question or emergency surplus rescue batch..." className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5">
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
