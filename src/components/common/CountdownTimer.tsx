import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface CountdownTimerProps {
  deadline: string;
  initialMinutes?: number;
  onExpire?: () => void;
  compact?: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  deadline,
  initialMinutes = 35,
  onExpire,
  compact = false,
}) => {
  const [timeLeft, setTimeLeft] = useState<{ minutes: number; seconds: number; isExpired: boolean }>({
    minutes: initialMinutes,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const targetTime = new Date(deadline).getTime();
      const now = Date.now();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ minutes: 0, seconds: 0, isExpired: true });
        if (onExpire) onExpire();
        return;
      }

      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      setTimeLeft({ minutes, seconds, isExpired: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [deadline, onExpire]);

  if (timeLeft.isExpired) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">
        <AlertTriangle className="w-3.5 h-3.5" />
        Safe Window Closed
      </span>
    );
  }

  const isUrgent = timeLeft.minutes < 15;
  const isWarning = timeLeft.minutes < 30;

  const colorClass = isUrgent
    ? 'bg-red-50 text-red-600 border border-red-200'
    : isWarning
    ? 'bg-amber-50 text-amber-700 border border-amber-200'
    : 'bg-emerald-50 text-emerald-700 border border-emerald-200';

  if (compact) {
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${colorClass}`}>
        <Clock className="w-3 h-3" />
        <span>
          {timeLeft.minutes}m {timeLeft.seconds.toString().padStart(2, '0')}s
        </span>
      </span>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}>
      <Clock className={`w-3.5 h-3.5 ${isUrgent ? 'animate-pulse' : ''}`} />
      <span>
        Claim within <strong>{timeLeft.minutes}m {timeLeft.seconds.toString().padStart(2, '0')}s</strong>
      </span>
    </div>
  );
};
