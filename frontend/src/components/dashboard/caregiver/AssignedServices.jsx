import { useEffect, useMemo, useState } from "react";
import API from "../../../services/api";
import LoadingServices from "./services/LoadingServices";
import EmptyServices from "./services/EmptyServices";
import ServiceToolbar from "./services/ServiceToolbar";
import ServiceList from "./services/ServiceList";
import ServiceModal from "./services/ServiceModal";
import { showSuccess, showError } from "../../../utils/toast";

export default function AssignedServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [notes, setNotes] = useState({});
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const res = await API.get("/caregiver/services");
      setServices(res.data.services || []);
    } catch (err) {
      console.log(err);
      showError("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/caregiver/service/${id}/status`, {
        status,
        careNotes: notes[id] || "",
      });
      await loadServices();
      showSuccess("Service Updated Successfully");
    } catch (err) {
      console.log(err);
      showError("Failed to update service");
    }
  };

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const patient = service.userId?.name?.toLowerCase() || "";
      const email = service.userId?.email?.toLowerCase() || "";
      const phone = service.userId?.phone?.toLowerCase() || "";
      const serviceName = service.serviceType?.toLowerCase() || "";
      const keyword = search.toLowerCase();
      const searchMatch =
        patient.includes(keyword) ||
        email.includes(keyword) ||
        phone.includes(keyword) ||
        serviceName.includes(keyword);
      const statusMatch =
        filterStatus === "all" ? true : service.status === filterStatus;
      return searchMatch && statusMatch;
    });
  }, [services, search, filterStatus]);

  const badgeColor = (status) => {
    switch (status) {
      case "pending": return "#f59e0b";
      case "accepted": return "#3b82f6";
      case "in-progress": return "#8b5cf6";
      case "completed": return "#22c55e";
      case "rejected": return "#ef4444";
      default: return "#94a3b8";
    }
  };

  const getStep = (status) => {
    switch (status) {
      case "pending": return 0;
      case "accepted": return 1;
      case "in-progress": return 2;
      case "completed": return 3;
      default: return 0;
    }
  };

  const getPriority = (service) => {
    if (service.status === "completed")
      return { text: "Completed", color: "#22c55e" };
    if (service.status === "accepted")
      return { text: "Normal", color: "#3b82f6" };
    if (service.status === "in-progress")
      return { text: "Working", color: "#8b5cf6" };
    const created = new Date(service.createdAt);
    const today = new Date();
    const diffDays = Math.floor((today - created) / (1000 * 60 * 60 * 24));
    if (diffDays >= 3) return { text: "High", color: "#ef4444" };
    return { text: "Medium", color: "#f59e0b" };
  };

  const openDetails = (service) => setSelectedService(service);
  const closeDetails = () => setSelectedService(null);

  if (loading) return <LoadingServices />;

  return (
    <div style={{
      padding: "32px 28px",
      background: "var(--bg-card)",
      borderRadius: "24px",
      border: "1px solid var(--border-color)",
      boxShadow: "0 8px 32px -8px rgba(0,0,0,0.06)",
    }}>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{
          fontSize: "26px",
          fontWeight: "700",
          color: "var(--text-primary)",
          margin: 0,
          letterSpacing: "-0.5px",
        }}>
          📋 Assigned Services
        </h1>
        <p style={{
          color: "var(--text-secondary)",
          fontSize: "15px",
          margin: "6px 0 0 0",
        }}>
          View and manage all services assigned to you
        </p>
      </div>

      <ServiceToolbar
        search={search}
        setSearch={setSearch}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      {filteredServices.length === 0 ? (
        <EmptyServices />
      ) : (
        <ServiceList
          services={filteredServices}
          notes={notes}
          setNotes={setNotes}
          badgeColor={badgeColor}
          getPriority={getPriority}
          getStep={getStep}
          updateStatus={updateStatus}
          openDetails={openDetails}
        />
      )}

      <ServiceModal
        service={selectedService}
        badgeColor={badgeColor}
        onClose={closeDetails}
      />
    </div>
  );
}