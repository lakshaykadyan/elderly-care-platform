import { useEffect, useState } from "react";
import {
  getMedicalRecords,
  uploadMedicalRecord,
  deleteMedicalRecord,
} from "../../../hooks/useMedicalRecord";
import { showSuccess, showError } from "../../../utils/toast";
import MedicalRecordForm from "./medical/MedicalRecordForm";
import MedicalRecordList from "./medical/MedicalRecordList";
import LoadingMedicalRecords from "./medical/LoadingMedicalRecords";
import EmptyMedicalRecords from "./medical/EmptyMedicalRecords";

export default function MedicalRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    fileUrl: "",
    fileType: "",
  });

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      setLoading(true);
      const data = await getMedicalRecords();
      setRecords(data.records || []);
    } catch (error) {
      console.log(error);
      showError("Failed to load medical records");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (uploading) return;
    if (!form.title.trim() || !form.fileUrl.trim()) {
      showError("Please fill all required fields");
      return;
    }
    try {
      setUploading(true);
      const data = await uploadMedicalRecord(form);
      showSuccess(data.message);
      setForm({ title: "", fileUrl: "", fileType: "" });
      loadRecords();
    } catch (error) {
      console.log(error);
      showError("Failed to upload record");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    try {
      const data = await deleteMedicalRecord(id);
      showSuccess(data.message);
      loadRecords();
    } catch (error) {
      console.log(error);
      showError("Failed to delete record");
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
          📂 Medical Records
        </h2>
        <p style={{
          color: "var(--text-secondary)",
          fontSize: "15px",
          margin: "6px 0 0 0",
        }}>
          Upload and manage all your medical documents securely.
        </p>
      </div>

      {/* Form */}
      <MedicalRecordForm
        form={form}
        setForm={setForm}
        handleUpload={handleUpload}
        uploading={uploading}
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
        📑 Your Medical Records
      </h3>

      {loading ? (
        <LoadingMedicalRecords />
      ) : records.length === 0 ? (
        <EmptyMedicalRecords />
      ) : (
        <MedicalRecordList records={records} handleDelete={handleDelete} />
      )}
    </div>
  );
}