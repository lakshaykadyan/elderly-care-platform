import { useState } from "react";
import { createService } from "../../../hooks/useService";
import { showSuccess, showError } from "../../../utils/toast";
import RequestForm from "./request/RequestForm";
import LoadingRequest from "./request/LoadingRequest";
import EmptyRequest from "./request/EmptyRequest";

export default function RequestService() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    serviceType: "",
    description: "",
    bookingDate: "",
    bookingTime: "",
    duration: "",
  });

  const handleSubmit = async () => {
    if (loading) return;
    if (
      !form.serviceType.trim() ||
      !form.description.trim() ||
      !form.bookingDate ||
      !form.bookingTime ||
      !form.duration.trim()
    ) {
      showError("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      const data = await createService(form);
      showSuccess(data.message);
      setForm({
        serviceType: "",
        description: "",
        bookingDate: "",
        bookingTime: "",
        duration: "",
      });
    } catch (error) {
      console.log(error);
      showError("Failed to Book Service");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingRequest />;

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
          📅 Book Service
        </h2>
        <p style={{
          color: "var(--text-secondary)",
          fontSize: "15px",
          margin: "6px 0 0 0",
        }}>
          Request a verified caregiver for your loved ones
        </p>
      </div>

      {/* Empty / Info Note */}
      <EmptyRequest />

      {/* Form */}
      <RequestForm
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}