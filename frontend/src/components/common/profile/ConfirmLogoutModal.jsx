export default function ConfirmLogoutModal({ onCancel, onConfirm }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ color: "#f44336" }}>🚪 Logout</h2>
        </div>
        <div className="modal-body" style={{ textAlign: "center", padding: "40px 20px" }}>
          <p style={{ fontSize: "18px", marginBottom: "30px" }}>
            Are you sure you want to logout?
          </p>
          <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
            <button
              className="danger-btn"
              onClick={onConfirm}
              style={{ minWidth: "120px", padding: "12px 24px" }}
            >
              Yes, Logout
            </button>
            <button
              className="primary-btn"
              onClick={onCancel}
              style={{ minWidth: "120px", padding: "12px 24px", background: "#6c757d" }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}