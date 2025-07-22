import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import MarketplacePage from '../pages/MarketplacePage';
import TaskDetailsPage from '../pages/TaskDetailsPage';
import EscrowPage from '../pages/EscrowPage';
import DisputePage from '../pages/DisputePage';
import ClientDashboard from '../pages/ClientDashboard';
import FreelancerLanding from '../pages/FreelancerLanding';
import ApplicationsPage from '../pages/ApplicationsPage'; // ✅ NEW import

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/marketplace" element={<MarketplacePage />} />
      <Route path="/task/:id" element={<TaskDetailsPage />} />
      <Route path="/escrow/:id" element={<EscrowPage />} />
      <Route path="/dispute/:id" element={<DisputePage />} />
      <Route path="/client-dashboard" element={<ClientDashboard />} />
      <Route path="/freelancer-home" element={<FreelancerLanding />} />
      <Route path="/applications" element={<ApplicationsPage />} /> {/* ✅ NEW route */}
    </Routes>
  );
};

export default AppRoutes;
