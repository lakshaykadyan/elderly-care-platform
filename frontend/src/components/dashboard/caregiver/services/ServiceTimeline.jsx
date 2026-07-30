import { Check } from "lucide-react";

export default function ServiceTimeline({ status, getStep }) {
  const current = getStep(status);
  const steps = ["Requested", "Accepted", "Working", "Completed"];

  return (
    <>
      <style>{`
        .tl-wrap .tl-step { flex:1; display:flex; flex-direction:column; align-items:center; position:relative; z-index:1; }
        .tl-wrap .tl-line { position:absolute; left:10%; right:10%; top:16px; height:3px; background:#e2e8f0; border-radius:4px; z-index:0; }
        .tl-wrap .tl-circle { width:34px; height:34px; border-radius:50%; background:#f8fafc; border:2px solid #e2e8f0; color:#94a3b8; display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:700; transition:all .3s; }
        .tl-wrap .tl-circle.active { background:#4f46e5; border-color:#4f46e5; color:#fff; box-shadow:0 4px 14px rgba(79,70,229,0.4); }
        .tl-wrap .tl-label { font-size:11px; font-weight:500; color:#64748b; margin-top:6px; text-align:center; transition:all .3s; }
        .tl-wrap .tl-label.active { color:#0f172a; font-weight:700; }
        [data-theme="dark"] .tl-wrap .tl-circle { background:#0f172a; border-color:#334155; color:#94a3b8; }
        [data-theme="dark"] .tl-wrap .tl-circle.active { background:#4f46e5; border-color:#4f46e5; color:#fff; }
        [data-theme="dark"] .tl-wrap .tl-label { color:#94a3b8; }
        [data-theme="dark"] .tl-wrap .tl-label.active { color:#f8fafc; }
        [data-theme="dark"] .tl-wrap .tl-line { background:#334155; }
      `}</style>
      <div className="tl-wrap" style={{ display: "flex", justifyContent: "space-between", position: "relative", margin: "16px 0 20px 0", padding: "0 8px" }}>
        <div className="tl-line" />
        {steps.map((label, i) => (
          <div key={i} className="tl-step">
            <div className={`tl-circle ${current >= i ? "active" : ""}`}>
              {current >= i ? <Check size={16} /> : ""}
            </div>
            <span className={`tl-label ${current >= i ? "active" : ""}`}>{label}</span>
          </div>
        ))}
      </div>
    </>
  );
}