import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import SigninPage from './pages/SigninPage';
import ClientLanding from './pages/ClientLanding';
import FreelancerLanding from './pages/FreelancerLanding';
import MarketplacePage from './pages/MarketplacePage';
import ClientTask from './pages/ClientTask';
import ClientDashboard from './pages/ClientDashboard';
import FreelancerDashboard from './pages/FreelancerDashboard';
import EscrowPage from './pages/EscrowPage';
import DisputePage from './pages/DisputePage';
import ApplicationsPage from './pages/ApplicationsPage'; // ✅ NEW Import

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/client-landing" element={<ClientLanding />} />
      <Route path="/freelancer-landing" element={<FreelancerLanding />} />
      <Route path="/marketplace" element={<MarketplacePage />} />
      <Route path="/client-task" element={<ClientTask />} />
      <Route path="/client-dashboard" element={<ClientDashboard />} />
      <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
      <Route path="/escrow/:taskId" element={<EscrowPage />} />
      <Route path="/dispute/:taskId" element={<DisputePage />} />
      <Route path="/applications" element={<ApplicationsPage />} /> {/* ✅ New Route */}
    </Routes>
  );
}

export default App;
