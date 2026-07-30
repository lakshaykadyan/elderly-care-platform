import ServiceTimeline from "./ServiceTimeline";
import {
  Clock,
  CheckCircle,
  RefreshCw,
  Trophy,
  XCircle,
  Mail,
  Phone,
  Calendar,
  Hourglass,
  DollarSign,
  Home,
  FileText,
  Eye,
  Save,
} from "lucide-react";

export default function ServiceCard({
  service,
  notes,
  setNotes,
  badgeColor,
  getPriority,
  updateStatus,
  openDetails,
  getStep,
}) {
  const priority = getPriority(service);
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  const statusLabels = {
    pending: "Pending",
    accepted: "Accepted",
    "in-progress": "In Progress",
    completed: "Completed",
    rejected: "Rejected",
  };

  const statusIcons = {
    pending: <Clock size={14} style={{ display: "inline", marginRight: "4px" }} />,
    accepted: <CheckCircle size={14} style={{ display: "inline", marginRight: "4px" }} />,
    "in-progress": <RefreshCw size={14} style={{ display: "inline", marginRight: "4px" }} />,
    completed: <Trophy size={14} style={{ display: "inline", marginRight: "4px" }} />,
    rejected: <XCircle size={14} style={{ display: "inline", marginRight: "4px" }} />,
  };

  return (
    <>
      <style>{`
        .sc-wrapper .sc-card {
          background: var(--bg-card, #1e293b) !important;
          border: 1px solid var(--border-color, #334155) !important;
          border-radius: 20px !important;
          padding: 24px 28px !important;
          margin-bottom: 24px !important;
          transition: all 0.3s ease !important;
          position: relative !important;
          overflow: hidden !important;
        }
        .sc-wrapper .sc-card:hover {
          border-color: rgba(99, 102, 241, 0.2) !important;
          transform: translateY(-4px) !important;
          box-shadow: 0 20px 40px -12px rgba(0,0,0,0.3) !important;
        }
        .sc-wrapper .sc-card .accent {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          height: 3px !important;
          background: linear-gradient(90deg, #4f46e5, #a855f7, #ec4899, #4f46e5) !important;
          background-size: 300% 100% !important;
          animation: grad 4s ease infinite !important;
        }
        @keyframes grad {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .sc-wrapper .sc-card h3,
        .sc-wrapper .sc-card p,
        .sc-wrapper .sc-card span,
        .sc-wrapper .sc-card strong {
          color: var(--text-primary, #f8fafc) !important;
        }
        .sc-wrapper .sc-card .status-select {
          background: #0f172a !important;
          border: 1px solid #334155 !important;
          color: #f8fafc !important;
          border-radius: 12px !important;
          padding: 10px 20px !important;
          font-size: 14px !important;
          outline: none !important;
          cursor: pointer !important;
          min-width: 180px !important;
        }
        .sc-wrapper .sc-card .status-select option {
          background: #0f172a !important;
          color: #f8fafc !important;
        }
        .sc-wrapper .sc-card .notes-box {
          background: #0f172a !important;
          border: 1px solid #334155 !important;
          border-radius: 14px !important;
          padding: 16px 20px !important;
          margin-top: 16px !important;
        }
        .sc-wrapper .sc-card .notes-box textarea {
          background: #0f172a !important;
          border: 1px solid #334155 !important;
          color: #f8fafc !important;
          border-radius: 12px !important;
          padding: 12px 16px !important;
          font-size: 14px !important;
          font-family: inherit !important;
          resize: vertical !important;
          outline: none !important;
          width: 100% !important;
          min-height: 80px !important;
        }
        .sc-wrapper .sc-card .notes-box textarea:focus {
          border-color: #4f46e5 !important;
          box-shadow: 0 0 0 4px rgba(79,70,229,0.1) !important;
        }
        .sc-wrapper .sc-card .action-btn {
          color: #ffffff !important;
          padding: 10px 22px !important;
          border-radius: 30px !important;
          border: none !important;
          font-weight: 600 !important;
          font-size: 14px !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
        }
        .sc-wrapper .sc-card .action-btn:hover {
          transform: scale(1.04) !important;
        }
        .sc-wrapper .sc-card .row {
          display: flex !important;
          flex-wrap: wrap !important;
          align-items: center !important;
          gap: 12px !important;
        }
        .sc-wrapper .sc-card .row-space {
          display: flex !important;
          flex-wrap: wrap !important;
          align-items: center !important;
          justify-content: space-between !important;
          gap: 12px !important;
        }
        .sc-wrapper .sc-card .grid-4 {
          display: grid !important;
          grid-template-columns: repeat(4, 1fr) !important;
          gap: 12px !important;
          background: #0f172a !important;
          border: 1px solid #334155 !important;
          border-radius: 14px !important;
          padding: 16px 20px !important;
          margin: 12px 0 !important;
        }
        .sc-wrapper .sc-card .grid-4 .full {
          grid-column: 1 / -1 !important;
        }
        .sc-wrapper .sc-card .label {
          font-size: 11px !important;
          font-weight: 600 !important;
          color: #94a3b8 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.5px !important;
          display: block !important;
        }
        .sc-wrapper .sc-card .value {
          font-size: 15px !important;
          font-weight: 600 !important;
          color: #f8fafc !important;
        }
        .sc-wrapper .sc-card .price {
          color: #4f46e5 !important;
        }
        .sc-wrapper .sc-card .desc-box {
          background: #0f172a !important;
          border-left: 3px solid #4f46e5 !important;
          border-radius: 12px !important;
          padding: 12px 16px !important;
          margin: 12px 0 !important;
        }
        .sc-wrapper .sc-card .contact-btns {
          display: flex !important;
          gap: 12px !important;
          flex-wrap: wrap !important;
          margin: 8px 0 !important;
        }
        .sc-wrapper .sc-card .contact-btns a {
          padding: 8px 20px !important;
          border-radius: 30px !important;
          text-decoration: none !important;
          font-weight: 600 !important;
          font-size: 13px !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 6px !important;
          color: #fff !important;
          transition: all 0.3s ease !important;
        }
        .sc-wrapper .sc-card .contact-btns a:hover {
          transform: scale(1.04) !important;
        }
        .sc-wrapper .sc-card .call { background: #22c55e !important; }
        .sc-wrapper .sc-card .email { background: #4f46e5 !important; }
        @media (max-width: 600px) {
          .sc-wrapper .sc-card .grid-4 { grid-template-columns: 1fr 1fr !important; }
          .sc-wrapper .sc-card .row-space { flex-direction: column !important; align-items: stretch !important; }
          .sc-wrapper .sc-card .row-space .status-select { width: 100% !important; }
        }
        @media (max-width: 400px) {
          .sc-wrapper .sc-card .grid-4 { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="sc-wrapper">
        <div className="sc-card">
          <div className="accent" />

          {/* Header */}
          <div className="row" style={{ justifyContent: "space-between", marginBottom: "12px" }}>
            <div className="row" style={{ gap: "14px" }}>
              <div style={{
                width: "48px", height: "48px", borderRadius: "50%",
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: "20px", fontWeight: "700", flexShrink: 0
              }}>
                {service.userId?.name?.charAt(0)?.toUpperCase() || "?"}
              </div>
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: "700", margin: 0 }}>
                  {service.userId?.name || "Unknown Patient"}
                </h3>
                <div className="row" style={{ gap: "14px", marginTop: "2px" }}>
                  <span style={{ fontSize: "13px", color: "#94a3b8", display: "flex", alignItems: "center", gap: "4px" }}>
                    <Mail size={14} /> {service.userId?.email || "No email"}
                  </span>
                  <span style={{ fontSize: "13px", color: "#94a3b8", display: "flex", alignItems: "center", gap: "4px" }}>
                    <Phone size={14} /> {service.userId?.phone || "Not Available"}
                  </span>
                </div>
              </div>
            </div>
            <div className="row" style={{ gap: "8px" }}>
              <span style={{
                padding: "4px 14px", borderRadius: "30px", fontSize: "12px", fontWeight: "600",
                background: `${priority.color}15`, color: priority.color,
                border: `1px solid ${priority.color}20`
              }}>{priority.text}</span>
              <span style={{
                padding: "4px 14px", borderRadius: "30px", fontSize: "12px", fontWeight: "600",
                background: `${badgeColor(service.status)}15`, color: badgeColor(service.status),
                border: `1px solid ${badgeColor(service.status)}20`,
                display: "inline-flex",
                alignItems: "center",
              }}>
                {statusIcons[service.status]}
                {statusLabels[service.status] || service.status}
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid-4">
            <div>
              <span className="label" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Calendar size={12} /> Date
              </span>
              <span className="value">{formatDate(service.bookingDate)}</span>
            </div>
            <div>
              <span className="label" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Clock size={12} /> Time
              </span>
              <span className="value">{service.bookingTime || "Not Set"}</span>
            </div>
            <div>
              <span className="label" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Hourglass size={12} /> Duration
              </span>
              <span className="value">{service.duration || "Not Set"}</span>
            </div>
            <div>
              <span className="label" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <DollarSign size={12} /> Price
              </span>
              <span className="value price">₹ {service.price || 0}</span>
            </div>
            <div className="full">
              <span className="label" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Home size={12} /> Service
              </span>
              <span className="value">{service.serviceType}</span>
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="contact-btns">
            <a href={`tel:${service.userId?.phone || ""}`} className="call">
              <Phone size={14} /> Call
            </a>
            <a href={`mailto:${service.userId?.email}`} className="email">
              <Mail size={14} /> Email
            </a>
          </div>

          {/* Description */}
          <div className="desc-box">
            <span className="label" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <FileText size={12} /> Description
            </span>
            <p style={{ color: "#f8fafc", fontSize: "14px", margin: "4px 0 0 0" }}>
              {service.description || "No description"}
            </p>
          </div>

          {/* Timeline */}
          <ServiceTimeline status={service.status} getStep={getStep} />

          {/* Care Notes */}
          <div className="notes-box">
            <div className="row" style={{ justifyContent: "space-between", marginBottom: "8px" }}>
              <h4 style={{ fontSize: "14px", fontWeight: "600", margin: 0, color: "#f8afc", display: "flex", alignItems: "center", gap: "4px" }}>
                <FileText size={14} /> Care Notes
              </h4>
              <span style={{ color: "#94a3b8", fontSize: "12px" }}>{(notes[service._id] || "").length}/300</span>
            </div>
            <textarea rows="3" maxLength={300} value={notes[service._id] || ""}
              placeholder="Write patient observations, medicine details, visit summary..."
              onChange={(e) => setNotes({ ...notes, [service._id]: e.target.value })} />
          </div>

          {/* Actions */}
          <div className="row-space" style={{ marginTop: "16px" }}>
            <select className="status-select" value={service.status}
              onChange={(e) => updateStatus(service._id, e.target.value)}>
              <option value="accepted">Accepted</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
            <div className="row" style={{ gap: "10px" }}>
              <button className="action-btn" style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
                onClick={() => openDetails(service)}
                onMouseEnter={(e) => e.target.style.transform = "scale(1.04)"}
                onMouseLeave={(e) => e.target.style.transform = "scale(1)"}>
                <Eye size={16} style={{ display: "inline", marginRight: "6px" }} /> View Details
              </button>
              <button className="action-btn" style={{ background: "#22c55e" }}
                onClick={() => updateStatus(service._id, service.status)}
                onMouseEnter={(e) => e.target.style.transform = "scale(1.04)"}
                onMouseLeave={(e) => e.target.style.transform = "scale(1)"}>
                <Save size={16} style={{ display: "inline", marginRight: "6px" }} /> Save Notes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}