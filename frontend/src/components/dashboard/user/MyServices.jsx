import { useEffect, useState } from "react";
import { Calendar, Clock, Package, PlusCircle } from "lucide-react";
import API from "../../../services/api";
import { updateService, deleteService } from "../../../hooks/useService";
import { submitReview } from "../../../hooks/useReview";
import { showSuccess, showError } from "../../../utils/toast";
import BookingFilters from "./bookings/BookingFilters";
import BookingTable from "./bookings/BookingTable";
import LoadingBookings from "./bookings/LoadingBookings";

// ---- Duration Helpers ----
const formatDurationDisplay = (value, unit) => {
  if (!value) return "Not Set";
  const map = { hours: "Hour", days: "Day", weeks: "Week", months: "Month", years: "Year" };
  return `${value} ${map[unit] || ""}${value > 1 ? "s" : ""}`;
};

export default function MyServices() {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [processing, setProcessing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    serviceType: "",
    description: "",
    bookingDate: "",
    bookingTime: "",
    duration: 1,
    durationUnit: "hours",
  });
  const [reviewForm, setReviewForm] = useState({ rating: 5, review: "" });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const res = await API.get("/service");
      setServices(res.data.services || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.serviceType?.toLowerCase().includes(search.toLowerCase()) ||
      service.description?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" ? true : service.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleEdit = (service) => {
    setEditingId(service._id);
    setEditForm({
      serviceType: service.serviceType,
      description: service.description,
      bookingDate: service.bookingDate ? service.bookingDate.split("T")[0] : "",
      bookingTime: service.bookingTime || "",
      duration: service.durationValue || 1,
      durationUnit: service.durationUnit || "hours",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    try {
      setProcessing(true);
      const data = await deleteService(id);
      showSuccess(data.message);
      loadServices();
    } catch (error) {
      console.log(error);
      showError("Failed to delete booking");
    } finally {
      setProcessing(false);
    }
  };

  const handleUpdate = async () => {
    if (!editForm.serviceType.trim() || !editForm.description.trim()) {
      return showError("Please fill all fields");
    }
    try {
      setProcessing(true);
      const payload = {
        serviceType: editForm.serviceType,
        description: editForm.description,
        bookingDate: editForm.bookingDate,
        bookingTime: editForm.bookingTime,
        duration: parseInt(editForm.duration) || 1,
        durationUnit: editForm.durationUnit,
      };
      const data = await updateService(editingId, payload);
      showSuccess(data.message);
      setEditingId(null);
      loadServices();
    } catch (error) {
      console.log(error);
      showError("Failed to update booking");
    } finally {
      setProcessing(false);
    }
  };

  const handleReview = async (id) => {
    if (!reviewForm.review.trim()) {
      return showError("Please write your review");
    }
    try {
      setProcessing(true);
      const data = await submitReview(id, reviewForm.rating, reviewForm.review);
      showSuccess(data.message);
      setReviewForm({ rating: 5, review: "" });
      loadServices();
    } catch (error) {
      console.log(error);
      showError("Failed to submit review");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <LoadingBookings />;

  return (
    <div className="profile-card" style={{
      padding: "32px 28px",
      borderRadius: "24px",
      background: "var(--bg-card)",
      border: "1px solid var(--border-color)",
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "28px",
        flexWrap: "wrap",
        gap: "16px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Calendar size={28} style={{ color: "var(--primary)" }} />
          <div>
            <h1 style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "var(--text-primary)",
              letterSpacing: "-0.5px",
              margin: 0,
            }}>
              My Services
            </h1>
            <p style={{
              color: "var(--text-secondary)",
              fontSize: "15px",
              margin: "4px 0 0 0",
            }}>
              Manage all your booked services
            </p>
          </div>
        </div>
        <div style={{
          background: "rgba(99, 102, 241, 0.1)",
          padding: "8px 20px",
          borderRadius: "40px",
          border: "1px solid rgba(99,102,241,0.15)",
          color: "var(--primary)",
          fontWeight: "600",
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}>
          <Package size={16} />
          Total: {filteredServices.length}
        </div>
      </div>

      <BookingFilters
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        totalBookings={filteredServices.length}
      />

      {filteredServices.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "60px 20px",
          background: "var(--bg-body)",
          borderRadius: "20px",
          border: "2px dashed var(--border-color)",
        }}>
          <Package size={56} style={{ color: "var(--text-muted)", marginBottom: "16px" }} />
          <h3 style={{ color: "var(--text-primary)" }}>No services found</h3>
          <p style={{ color: "var(--text-secondary)" }}>Start by booking a new service.</p>
        </div>
      ) : (
        <BookingTable
          services={filteredServices}
          processing={processing}
          editingId={editingId}
          editForm={editForm}
          setEditForm={setEditForm}
          handleUpdate={handleUpdate}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleReview={handleReview}
          reviewForm={reviewForm}
          setReviewForm={setReviewForm}
        />
      )}
    </div>
  );
}