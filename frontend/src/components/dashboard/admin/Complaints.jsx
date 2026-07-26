import { useEffect, useState, useMemo } from "react";
import { getAllComplaints, replyComplaint } from "../../../hooks/useAdmin";
import ComplaintFilters from "./complaints/ComplaintFilters";
import ComplaintTable from "./complaints/ComplaintTable";
import LoadingComplaints from "./complaints/LoadingComplaints";
import EmptyComplaints from "./complaints/EmptyComplaints";
import ComplaintPagination from "./complaints/ComplaintPagination";
import { showSuccess, showError } from "../../../utils/toast";

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [reply, setReply] = useState({});
  const complaintsPerPage = 10;

  useEffect(() => { loadComplaints(); }, []);

  const loadComplaints = async () => {
    try {
      setLoading(true);
      const data = await getAllComplaints();
      setComplaints(data.complaints || []);
    } catch (error) {
      console.log(error);
      showError("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (id) => {
    try {
      if (!reply[id]) return showError("Please write a reply first.");
      const data = await replyComplaint(id, { adminReply: reply[id], status: "resolved" });
      showSuccess(data.message);
      loadComplaints();
    } catch (error) {
      console.log(error);
      showError("Something went wrong");
    }
  };

  // ✅ Filter Logic
  const filteredComplaints = useMemo(() => {
    return complaints.filter((item) => {
      const keyword = search.toLowerCase().trim();
      if (!keyword) return true;
      const name = (item.userId?.name || "").toLowerCase();
      const subject = (item.subject || "").toLowerCase();
      const matchSearch = name.includes(keyword) || subject.includes(keyword);
      const matchFilter = filter === "all" || item.status === filter;
      return matchSearch && matchFilter;
    });
  }, [complaints, search, filter]);

  // ✅ Pagination Logic
  const totalPages = Math.ceil(filteredComplaints.length / complaintsPerPage);
  const indexOfLast = currentPage * complaintsPerPage;
  const indexOfFirst = indexOfLast - complaintsPerPage;
  const currentComplaints = filteredComplaints.slice(indexOfFirst, indexOfLast);

  // ✅ Reset page on search/filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  if (loading) return <LoadingComplaints />;

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
      }}>
        ⚠️ Manage Complaints
      </h1>

      <ComplaintFilters
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        totalComplaints={filteredComplaints.length}
      />

      {currentComplaints.length === 0 ? (
        <EmptyComplaints />
      ) : (
        <>
          <ComplaintTable
            complaints={currentComplaints}
            reply={reply}
            setReply={setReply}
            handleReply={handleReply}
          />
          <ComplaintPagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}