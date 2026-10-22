import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapVisualizer } from '../../components/map/MapVisualizer';
import { DeliveryTimelineStatus } from '../../types';
import {
  Truck,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  ShieldCheck,
  MapPin,
  ArrowLeft,
  KeyRound,
  RotateCw,
  AlertCircle
} from 'lucide-react';

export const DeliveryTrackingPage: React.FC = () => {
  const { deliveries, selectedDeliveryId, updateDeliveryStatus, navigate } = useApp();

  const delivery = deliveries.find((d) => d.deliveryId === selectedDeliveryId) || deliveries[0];

  const [simulating, setSimulating] = useState(false);

  if (!delivery) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center">
        <h2 className="text-xl font-bold text-gray-900">No active delivery found</h2>
        <button onClick={() => navigate('find-food')} className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold">
          Explore Food
        </button>
      </div>
    );
  }

  const stages: DeliveryTimelineStatus[] = [
    'Claim Confirmed',
    'Pickup Assigned',
    'Donor Confirmed',
    'Food Picked Up',
    'On the Way',
    'Delivered',
  ];

  const currentStageIndex = stages.indexOf(delivery.status);

  const advanceStage = () => {
    if (currentStageIndex < stages.length - 1) {
      updateDeliveryStatus(delivery.deliveryId, stages[currentStageIndex + 1]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('recipient-dashboard')}
          className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Claims</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-gray-500">Consignment: {delivery.deliveryId}</span>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
            Live Dispatched
          </span>
        </div>
      </div>

      {/* Main Grid: Map + Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Interactive Vector Live Tracking Map */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative">
            <MapVisualizer height="h-[420px]" focusedDelivery={delivery} interactive={false} />
            
            {/* Overlay live driver status card */}
            <div className="absolute top-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-gray-200 shadow-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={delivery.driverAvatar}
                  alt={delivery.driverName}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-gray-900 text-sm">{delivery.driverName}</h3>
                    <span title="Verified Delivery Partner">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{delivery.driverVehicle}</p>
                  <p className="text-[11px] text-emerald-700 font-bold mt-0.5">
                    ETA: {delivery.estimatedArrival}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${delivery.driverPhone}`}
                  className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                  title="Call Driver"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <button
                  onClick={() => alert(`Calling ${delivery.driverName} at ${delivery.driverPhone}`)}
                  className="p-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                  title="Message Driver"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Locations Card */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-3 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold flex-shrink-0 text-xs">
                A
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase block">Pickup Commercial Kitchen</span>
                <strong className="text-gray-900 text-sm">{delivery.donorName}</strong>
                <p className="text-gray-500 mt-0.5">{delivery.donorLocation.address}</p>
              </div>
            </div>

            <div className="border-l-2 border-dashed border-gray-200 ml-3 h-5" />

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold flex-shrink-0 text-xs">
                B
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase block">Destination Recipient</span>
                <strong className="text-gray-900 text-sm">{delivery.recipientName}</strong>
                <p className="text-gray-500 mt-0.5">{delivery.recipientLocation.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Timeline & OTP Verification */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">Live Order Pipeline</span>
            <h2 className="text-xl font-extrabold text-gray-900 mt-0.5">{delivery.foodName}</h2>
            <p className="text-xs text-gray-500 mt-0.5">Bulk rescue batch: {delivery.servings} portions</p>
          </div>

          {/* OTP Box (Section 11 requirement) */}
          <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3.5 rounded-2xl border border-gray-200">
            <div className="bg-white p-3 rounded-xl border border-gray-200 text-center">
              <span className="text-[10px] text-gray-400 font-bold uppercase block">Donor Pickup OTP</span>
              <span className="text-xl font-black text-emerald-700 font-mono tracking-widest block mt-0.5">
                {delivery.pickupOtp}
              </span>
              <span className="text-[9px] text-gray-400">Driver gives to donor</span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-gray-200 text-center">
              <span className="text-[10px] text-gray-400 font-bold uppercase block">Recipient Release OTP</span>
              <span className="text-xl font-black text-blue-700 font-mono tracking-widest block mt-0.5">
                {delivery.deliveryOtp}
              </span>
              <span className="text-[9px] text-gray-400">Recipient gives to driver</span>
            </div>
          </div>

          {/* Section 11: Real-Time Timeline Progression */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Delivery Progress</h4>

            <div className="space-y-3 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
              {stages.map((stage, idx) => {
                const isPassed = currentStageIndex >= idx;
                const isCurrent = currentStageIndex === idx;

                return (
                  <div key={stage} className="relative flex items-center justify-between text-xs">
                    <div
                      className={`absolute -left-6 w-4 h-4 rounded-full border-2 transition-colors flex items-center justify-center ${
                        isPassed
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      {isPassed && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>

                    <span
                      className={`font-semibold ${
                        isCurrent
                          ? 'text-emerald-700 font-bold'
                          : isPassed
                          ? 'text-gray-900'
                          : 'text-gray-400'
                      }`}
                    >
                      {stage}
                    </span>

                    {isCurrent && (
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md font-bold text-[10px] animate-pulse">
                        Active Step
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Advance Step Simulation Button (for interactive demoing) */}
          <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
            <div className="text-[11px] text-gray-500 font-medium">
              Demo Control: Simulate driver completing next delivery milestone:
            </div>
            <button
              onClick={advanceStage}
              disabled={delivery.status === 'Delivered'}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                delivery.status === 'Delivered'
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>
                {delivery.status === 'Delivered'
                  ? 'Delivery Completed'
                  : `Advance: ${stages[Math.min(stages.length - 1, currentStageIndex + 1)]}`}
              </span>
            </button>
          </div>

          {/* Cost separation */}
          <div className="flex justify-between items-center text-xs text-gray-500 border-t border-gray-100 pt-3">
            <span>Food: <strong className="text-emerald-600">₹0 FREE</strong></span>
            <span>Courier Charge: <strong>₹{delivery.deliveryFee}</strong></span>
          </div>

        </div>

      </div>
    </div>
  );
};
