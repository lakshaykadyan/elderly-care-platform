import { useEffect, useState, useMemo } from "react";
import { getCaregivers, verifyCaregiver } from "../../../hooks/useAdmin";
import CaregiverFilters from "./caregivers/CaregiverFilters";
import CaregiverTable from "./caregivers/CaregiverTable";
import LoadingCaregivers from "./caregivers/LoadingCaregivers";
import EmptyCaregivers from "./caregivers/EmptyCaregivers";
import CaregiverPagination from "./caregivers/CaregiverPagination";
import { showSuccess, showError } from "../../../utils/toast";

export default function Caregivers() {
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const caregiversPerPage = 10;

  useEffect(() => { loadCaregivers(); }, []);

  const loadCaregivers = async () => {
    try {
      setLoading(true);
      const data = await getCaregivers();
      setCaregivers(data.caregivers || []);
    } catch (err) {
      console.log(err);
      showError("Failed to load caregivers");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (id) => {
    try {
      const data = await verifyCaregiver(id);
      showSuccess(data.message);
      loadCaregivers();
    } catch (err) {
      console.log(err);
      showError("Failed to verify caregiver");
    }
  };

  // ✅ Filter Logic with useMemo
  const filteredCaregivers = useMemo(() => {
    return caregivers.filter((caregiver) => {
      const keyword = search.toLowerCase().trim();
      if (!keyword) return true;
      const name = (caregiver.name || "").toLowerCase();
      const email = (caregiver.email || "").toLowerCase();
      const matchSearch = name.includes(keyword) || email.includes(keyword);
      const matchFilter =
        filter === "all" ||
        (filter === "verified" && caregiver.caregiverProfile?.verified) ||
        (filter === "pending" && !caregiver.caregiverProfile?.verified);
      return matchSearch && matchFilter;
    });
  }, [caregivers, search, filter]);

  // ✅ Pagination Logic
  const totalPages = Math.ceil(filteredCaregivers.length / caregiversPerPage);
  const indexOfLast = currentPage * caregiversPerPage;
  const indexOfFirst = indexOfLast - caregiversPerPage;
  const currentCaregivers = filteredCaregivers.slice(indexOfFirst, indexOfLast);

  // ✅ Reset page on search/filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  if (loading) return <LoadingCaregivers />;

  return (
    <div style={{
      padding: "24px 28px",
      background: "var(--bg-card)",
      borderRadius: "20px",
      border: "1px solid var(--border-color)",
    }}>
      <h1 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "20px", letterSpacing: "-0.5px" }}>
        👨‍⚕️ Manage Caregivers
      </h1>

      <CaregiverFilters
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        totalCaregivers={filteredCaregivers.length}
      />

      {currentCaregivers.length === 0 ? (
        <EmptyCaregivers />
      ) : (
        <>
          <CaregiverTable
            caregivers={currentCaregivers}
            handleVerify={handleVerify}
          />
          <CaregiverPagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}