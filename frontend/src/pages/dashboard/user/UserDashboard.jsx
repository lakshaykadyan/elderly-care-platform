import { useState } from "react";
import { SidebarProvider } from "../../../context/SidebarContext";
import Sidebar from "../../../components/dashboard/Sidebar"; 
import Topbar from "../../../components/dashboard/Topbar";
import UserHome from "../../../components/dashboard/user/UserDashboard";
import Profile from "../../../components/dashboard/user/Profile";
import RequestService from "../../../components/dashboard/user/RequestService";
import MyServices from "../../../components/dashboard/user/MyServices";
import MedicalRecords from "../../../components/dashboard/user/MedicalRecords";
import EmergencyContacts from "../../../components/dashboard/user/EmergencyContacts";
import Notifications from "../../../components/dashboard/user/Notifications";
import Complaints from "../../../components/dashboard/user/Complaints";

export default function UserDashboard() {
  const [activePage, setActivePage] = useState("profile");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <UserHome />;
      case "profile": return <Profile />;
      case "request": return <RequestService />;
      case "bookings": return <MyServices />;
      case "medical": return <MedicalRecords />;
      case "contacts": return <EmergencyContacts />;
      case "notifications": return <Notifications />;
      case "complaints": return <Complaints />;
      default: return <Profile />;
    }
  };

  return (
    <SidebarProvider>
      <div className="dashboard-container">
        <Sidebar activePage={activePage} setActivePage={setActivePage} role="user" />
        <div className="dashboard-content">
          <Topbar />
          <div className="dashboard-main">{renderPage()}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}