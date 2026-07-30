import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";

import {
  getServices,
  deleteService,
  updateService,
} from "../../../hooks/useService";

import { submitReview } from "../../../hooks/useReview";

import {
  showSuccess,
  showError,
} from "../../../utils/toast";

import BookingTable from "./bookings/BookingTable";
import LoadingBookings from "./bookings/LoadingBookings";
import EmptyBookings from "./bookings/EmptyBookings";

export default function MyBookings() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    serviceType: "",
    description: "",
  });
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    review: "",
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await getServices();
      setServices(data.services || []);
    } catch (error) {
      console.log(error);
      showError("Failed to load bookings");
    } finally {
      setLoading(false);
    }
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

  const handleEdit = (service) => {
    setEditingId(service._id);
    setEditForm({
      serviceType: service.serviceType,
      description: service.description,
    });
  };

  const handleUpdate = async () => {
    if (!editForm.serviceType.trim() || !editForm.description.trim()) {
      return showError("Please fill all fields");
    }
    try {
      setProcessing(true);
      const data = await updateService(editingId, editForm);
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
  if (services.length === 0) return <EmptyBookings />;

  return (
    <div className="profile-card">
      <h2 style={{
        marginBottom: "25px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "24px",
        fontWeight: "700",
        color: "var(--text-primary)",
      }}>
        <Calendar size={24} style={{ color: "var(--primary)" }} />
        My Bookings
      </h2>
      
      <BookingTable
        services={services}
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
    </div>
  );
}