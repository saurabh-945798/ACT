import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutModal from "../components/LogoutModal";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useAuth } from "../hooks/useAuth";

function DashboardLayout({ children, title = "Team operations overview" }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutConfirm = () => {
    setLogoutModalOpen(false);
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-transparent p-3 sm:p-6">
      <div className="mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-7xl gap-3 sm:min-h-[calc(100vh-2rem)] sm:gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="min-w-0 space-y-3 sm:space-y-4">
          <Topbar
            title={title}
            user={user}
            onMenuClick={() => setSidebarOpen(true)}
            onLogout={() => setLogoutModalOpen(true)}
          />
          <main>{children}</main>
        </div>
      </div>
      <LogoutModal
        open={logoutModalOpen}
        user={user}
        onCancel={() => setLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
}

export default DashboardLayout;
