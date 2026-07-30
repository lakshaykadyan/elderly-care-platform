import { useEffect, useState, useMemo } from "react";
import {
  getServices,
  getCaregivers,
  updateServiceStatus,
  assignCaregiver,
} from "../../../hooks/useAdmin";
import ServiceFilters from "./services/ServiceFilters";
import ServiceTable from "./services/ServiceTable";
import LoadingServices from "./services/LoadingServices";
import EmptyServices from "./services/EmptyServices";
import ServicePagination from "./services/ServicePagination";
import { showSuccess, showError } from "../../../utils/toast";
import { Calendar } from "lucide-react";

export default function Services() {
  const [services, setServices] = useState([]);
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCaregiver, setSelectedCaregiver] = useState({});
  const servicesPerPage = 10;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const serviceData = await getServices();
      const caregiverData = await getCaregivers();
      setServices(serviceData.services || []);
      const verified = caregiverData.caregivers.filter(
        (c) => c.caregiverProfile?.verified && c.caregiverProfile?.availability === "available"
      );
      setCaregivers(verified);
    } catch (err) {
      console.log(err);
      showError("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (serviceId) => {
    try {
      const caregiverId = selectedCaregiver[serviceId];
      if (!caregiverId) return showError("Please Select Caregiver");
      const data = await assignCaregiver(serviceId, caregiverId);
      showSuccess(data.message);
      loadData();
    } catch (err) {
      console.log(err);
      showError("Assignment Failed");
    }
  };

  const handleStatus = async (serviceId, status) => {
    try {
      const data = await updateServiceStatus(serviceId, status);
      showSuccess(data.message);
      loadData();
    } catch (err) {
      console.log(err);
      showError("Failed to update status");
    }
  };

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const keyword = search.toLowerCase().trim();
      if (!keyword) return true;
      const name = (service.userId?.name || "").toLowerCase();
      const type = (service.serviceType || "").toLowerCase();
      const matchSearch = name.includes(keyword) || type.includes(keyword);
      const matchFilter = filter === "all" || service.status === filter;
      return matchSearch && matchFilter;
    });
  }, [services, search, filter]);

  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  if (loading) return <LoadingServices />;

  return (
    <div style={{
      padding: "24px 28px",
      background: "var(--bg-card)",
      borderRadius: "20px",
      border: "1px solid var(--border-color)",
    }}>
      <h1 style={{
        fontSize: "24px",
        fontWeight: "700",
        color: "var(--text-primary)",
        marginBottom: "20px",
        letterSpacing: "-0.5px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}>
        <Calendar size={24} style={{ color: "var(--primary)" }} />
        Manage Services
      </h1>

      <ServiceFilters
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        totalServices={filteredServices.length}
      />

      {currentServices.length === 0 ? (
        <EmptyServices />
      ) : (
        <>
          <ServiceTable
            services={currentServices}
            caregivers={caregivers}
            selectedCaregiver={selectedCaregiver}
            setSelectedCaregiver={setSelectedCaregiver}
            assignCaregiver={handleAssign}
            updateStatus={handleStatus}
          />
          <ServicePagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}