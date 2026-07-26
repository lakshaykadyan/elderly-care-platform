import { useEffect, useState } from "react";
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from "../../../hooks/useEmergencyContact";
import { showSuccess, showError } from "../../../utils/toast";
import ContactForm from "./contacts/ContactForm";
import ContactList from "./contacts/ContactList";
import LoadingContacts from "./contacts/LoadingContacts";
import EmptyContacts from "./contacts/EmptyContacts";

export default function EmergencyContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    relationship: "",
    phoneNumber: "",
    address: "",
  });

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const data = await getContacts();
      setContacts(data.contacts || []);
    } catch (error) {
      console.log(error);
      showError("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (saving) return;
    if (
      !form.fullName.trim() ||
      !form.relationship.trim() ||
      !form.phoneNumber.trim() ||
      !form.address.trim()
    ) {
      showError("Please fill all fields");
      return;
    }
    try {
      setSaving(true);
      let data;
      if (editingId) {
        data = await updateContact(editingId, form);
      } else {
        data = await createContact(form);
      }
      showSuccess(data.message);
      setEditingId(null);
      setForm({ fullName: "", relationship: "", phoneNumber: "", address: "" });
      loadContacts();
    } catch (error) {
      console.log(error);
      showError("Operation Failed");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (contact) => {
    setEditingId(contact._id);
    setForm({
      fullName: contact.fullName,
      relationship: contact.relationship,
      phoneNumber: contact.phoneNumber,
      address: contact.address,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this contact?")) return;
    try {
      const data = await deleteContact(id);
      showSuccess(data.message);
      loadContacts();
    } catch (error) {
      console.log(error);
      showError("Failed to delete contact");
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
          🚨 Emergency Contacts
        </h2>
        <p style={{
          color: "var(--text-secondary)",
          fontSize: "15px",
          margin: "6px 0 0 0",
        }}>
          Manage your trusted emergency contacts
        </p>
      </div>

      {/* Form */}
      <ContactForm
        form={form}
        setForm={setForm}
        handleSave={handleSave}
        editingId={editingId}
        saving={saving}
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
        📞 Saved Contacts
      </h3>

      {loading ? (
        <LoadingContacts />
      ) : contacts.length === 0 ? (
        <EmptyContacts />
      ) : (
        <ContactList
          contacts={contacts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}