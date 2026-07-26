import { useState, useCallback, useRef, useEffect } from "react";
import AvailabilityStatus from "./AvailabilityStatus";
import WeeklyAvailability from "./WeeklyAvailability";
import WorkingHours from "./WorkingHours";

export default function AvailabilityCard({ availability, updateAvailability }) {
  const [isTodayOff, setIsTodayOff] = useState(false);
  
  // ✅ Track previous status to prevent duplicate calls
  const prevStatusRef = useRef(availability);

  // ✅ Handle weekly toggle change (only call if status actually changes)
  const handleWeeklyToggle = useCallback((todayOff) => {
    setIsTodayOff(todayOff);
    const newStatus = todayOff ? "offline" : "available";
    
    // ✅ Only call if status actually changed
    if (prevStatusRef.current !== newStatus) {
      prevStatusRef.current = newStatus;
      updateAvailability(newStatus);
    }
  }, [updateAvailability]);

  return (
    <div className="availability-wrapper">
      <style>{`
        .availability-wrapper .status-btn {
          padding: 12px 32px !important;
          border-radius: 40px !important;
          border: none !important;
          font-weight: 600 !important;
          font-size: 15px !important;
          cursor: pointer !important;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        }
        .availability-wrapper .status-btn:hover {
          transform: scale(1.04) !important;
        }
        .availability-wrapper .status-btn.active-available {
          background: #22c55e !important;
          color: #fff !important;
          box-shadow: 0 4px 14px rgba(34,197,94,0.3) !important;
        }
        .availability-wrapper .status-btn.inactive-available {
          background: rgba(34,197,94,0.08) !important;
          color: #4ade80 !important;
          border: 1px solid rgba(34,197,94,0.15) !important;
        }
        .availability-wrapper .status-btn.active-busy {
          background: #f59e0b !important;
          color: #fff !important;
          box-shadow: 0 4px 14px rgba(245,158,11,0.3) !important;
        }
        .availability-wrapper .status-btn.inactive-busy {
          background: rgba(245,158,11,0.08) !important;
          color: #fbbf24 !important;
          border: 1px solid rgba(245,158,11,0.15) !important;
        }
        .availability-wrapper .status-btn.active-offline {
          background: #ef4444 !important;
          color: #fff !important;
          box-shadow: 0 4px 14px rgba(239,68,68,0.3) !important;
        }
        .availability-wrapper .status-btn.inactive-offline {
          background: rgba(239,68,68,0.08) !important;
          color: #f87171 !important;
          border: 1px solid rgba(239,68,68,0.15) !important;
        }
        .availability-wrapper .status-buttons {
          display: flex !important;
          gap: 16px !important;
          flex-wrap: wrap !important;
          margin: 16px 0 24px 0 !important;
        }
        @media (max-width: 480px) {
          .availability-wrapper .status-buttons {
            flex-direction: column !important;
          }
          .availability-wrapper .status-btn {
            width: 100% !important;
            text-align: center !important;
          }
        }
      `}</style>

      <AvailabilityStatus availability={availability} updateAvailability={updateAvailability} />
      
      <WeeklyAvailability onToggle={handleWeeklyToggle} />
      
      <WorkingHours />
    </div>
  );
}