import { useEffect, useState } from "react";
import {
  createComplaint,
  getComplaints,
} from "../../../hooks/useComplaint";
import { showSuccess, showError } from "../../../utils/toast";
import ComplaintForm from "./complaints/ComplaintForm";
import ComplaintList from "./complaints/ComplaintList";
import LoadingComplaints from "./complaints/LoadingComplaints";
import EmptyComplaints from "./complaints/EmptyComplaints";

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    subject: "",
    message: "",
  });

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      setLoading(true);
      const data = await getComplaints();
      setComplaints(data.complaints || []);
    } catch (error) {
      console.log(error);
      showError("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (submitting) return;
    if (!form.subject.trim() || !form.message.trim()) {
      showError("Please fill all fields");
      return;
    }
    try {
      setSubmitting(true);
      const data = await createComplaint(form);
      showSuccess(data.message);
      setForm({ subject: "", message: "" });
      loadComplaints();
    } catch (error) {
      console.log(error);
      showError("Failed to submit complaint");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      padding: "32px 28px",
      background: "var(--bg-card)",
      borderRadius: "24px",
      border: "1px solid var(--border-color)",
      boxShadow: "0 8px 32px -8px rgba(0,0,0,0.06)",
    }}>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{
          fontSize: "26px",
          fontWeight: "700",
          color: "var(--text-primary)",
          margin: 0,
          letterSpacing: "-0.5px",
        }}>
          ⚠️ Complaints
        </h2>
        <p style={{
          color: "var(--text-secondary)",
          fontSize: "15px",
          margin: "6px 0 0 0",
        }}>
          Submit a complaint or view your complaint history
        </p>
      </div>

      {/* Form */}
      <ComplaintForm
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        submitting={submitting}
      />

      {/* Divider */}
      <div style={{
        height: "1px",
        background: "var(--border-color)",
        margin: "32px 0 28px 0",
      }} />

      {/* List Title */}
      <h3 style={{
        fontSize: "18px",
        fontWeight: "600",
        color: "var(--text-primary)",
        marginBottom: "20px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}>
        📜 Complaint History
      </h3>

      {loading ? (
        <LoadingComplaints />
      ) : complaints.length === 0 ? (
        <EmptyComplaints />
      ) : (
        <ComplaintList complaints={complaints} />
      )}
    </div>
  );
}