import { useEffect, useMemo, useState } from "react";
import { Users as UsersIcon, Stethoscope } from "lucide-react";
import { getUsers, toggleUserStatus, deleteUser } from "../../../hooks/useAdmin";
import LoadingUsers from "./users/LoadingUsers";
import UserFilters from "./users/UserFilters";
import UserTable from "./users/UserTable";
import UserPagination from "./users/UserPagination";
import { showSuccess, showError } from "../../../utils/toast";

export default function Users({ initialFilter = "all", page = "users" }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  
  // ✅ Default filter based on page
  const getDefaultFilter = () => {
    if (page === "caregivers") return "verified";
    return initialFilter || "all";
  };
  
  const [filter, setFilter] = useState(getDefaultFilter());
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => { loadUsers(); }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data.users || []);
    } catch (err) {
      console.log(err);
      showError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      const data = await toggleUserStatus(id);
      showSuccess(data.message);
      loadUsers();
    } catch (err) {
      console.log(err);
      showError("Failed to update user status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      const data = await deleteUser(id);
      showSuccess(data.message);
      loadUsers();
    } catch (err) {
      console.log(err);
      showError("Failed to delete user");
    }
  };

  const handleSelect = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((item) => item !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  // ✅ Filtered users logic with page-specific behavior
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const keyword = search.toLowerCase();
      const matchSearch = user.name.toLowerCase().includes(keyword) ||
                         user.email.toLowerCase().includes(keyword);

      // ✅ Base filter: Sirf caregivers for caregivers page, otherwise all
      if (page === "caregivers" && user.role !== "caregiver") {
        return false;
      }

      // ✅ Caregiver-specific filters
      if (page === "caregivers") {
        if (filter === "verified") {
          return matchSearch && user.caregiverProfile?.verified === true;
        }
        if (filter === "unverified") {
          return matchSearch && user.caregiverProfile?.verified !== true;
        }
        // "all" filter – sabhi caregivers (verified + unverified)
        return matchSearch;
      }

      // ✅ User page filters (original logic)
      const matchFilter = filter === "all" ||
                         (filter === "active" && user.isActive) ||
                         (filter === "disabled" && !user.isActive) ||
                         (filter === "user" && user.role === "user") ||
                         (filter === "caregiver" && user.role === "caregiver");
      return matchSearch && matchFilter;
    });
  }, [users, search, filter, page]);

  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      let valueA = a[sortField];
      let valueB = b[sortField];
      if (typeof valueA === "string") valueA = valueA.toLowerCase();
      if (typeof valueB === "string") valueB = valueB.toLowerCase();
      if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
      if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredUsers, sortField, sortOrder]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleSelectAll = () => {
    if (currentUsers.length > 0 && selectedUsers.length === currentUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(currentUsers.map((user) => user._id));
    }
  };

  if (loading) return <LoadingUsers />;

  // ✅ Page-specific title and icon
  const pageTitle = page === "caregivers" ? "Manage Caregivers" : "Manage Users";
  const PageIcon = page === "caregivers" ? Stethoscope : UsersIcon;

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
        <PageIcon size={24} style={{ color: "var(--primary)" }} />
        {pageTitle}
      </h1>

      {/* ✅ Pass page prop to UserFilters for custom filter options */}
      <UserFilters
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        setCurrentPage={setCurrentPage}
        totalUsers={filteredUsers.length}
        page={page}
      />

      <UserTable
        users={currentUsers}
        selectedUsers={selectedUsers}
        handleSelect={handleSelect}
        handleSelectAll={handleSelectAll}
        handleSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder}
        handleToggle={handleToggle}
        handleDelete={handleDelete}
        page={page}
      />

      <UserPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}