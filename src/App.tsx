import React from 'react';
import { useApp } from './context/AppContext';
import { RoleSwitcher } from './components/common/RoleSwitcher';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';
import { ToastContainer } from './components/common/ToastContainer';

// Pages
import { Home } from './pages/public/Home';
import { FindFood } from './pages/public/FindFood';
import { ShareFood } from './pages/public/ShareFood';
import { CelebrateAndShare } from './pages/public/CelebrateAndShare';
import { NGOs } from './pages/public/NGOs';
import { AnimalShelters } from './pages/public/AnimalShelters';
import { Impact } from './pages/public/Impact';
import { HowItWorks } from './pages/public/HowItWorks';
import { About } from './pages/public/About';
import { Contact } from './pages/public/Contact';
import { Login } from './pages/public/Login';

import { DonorDashboard } from './pages/dashboards/DonorDashboard';
import { RecipientDashboard } from './pages/dashboards/RecipientDashboard';
import { NGODashboard } from './pages/dashboards/NGODashboard';
import { AdminDashboard } from './pages/dashboards/AdminDashboard';

import { FoodDetailsPage } from './pages/details/FoodDetailsPage';
import { DeliveryTrackingPage } from './pages/details/DeliveryTrackingPage';

import { Profile } from './pages/profile/Profile';
import { Notifications } from './pages/profile/Notifications';
import { Settings } from './pages/profile/Settings';

export const AppContent: React.FC = () => {
  const { currentPage } = useApp();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'find-food':
        return <FindFood />;
      case 'share-food':
        return <ShareFood />;
      case 'celebrate-and-share':
        return <CelebrateAndShare />;
      case 'food-details':
        return <FoodDetailsPage />;
      case 'delivery-tracking':
        return <DeliveryTrackingPage />;
      case 'donor-dashboard':
        return <DonorDashboard />;
      case 'recipient-dashboard':
        return <RecipientDashboard />;
      case 'ngo-dashboard':
        return <NGODashboard />;
      case 'shelter-dashboard':
        return <AnimalShelters />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'ngos':
        return <NGOs />;
      case 'animal-shelters':
        return <AnimalShelters />;
      case 'impact':
        return <Impact />;
      case 'how-it-works':
        return <HowItWorks />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'login':
      case 'register':
        return <Login />;
      case 'profile':
        return <Profile />;
      case 'notifications':
        return <Notifications />;
      case 'settings':
        return <Settings />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-gray-900 selection:bg-emerald-200">
      {/* Top Test Stakeholder Persona Switcher */}
      <RoleSwitcher />

      {/* Main Brand Navbar */}
      <Navbar />

      {/* Dynamic View Router */}
      <main className="flex-1 pb-16 lg:pb-0">
        {renderCurrentPage()}
      </main>

      {/* Brand Footer */}
      <Footer />

      {/* Mobile-First Bottom Nav (Section 29) */}
      <MobileNav />

      {/* Global Interactive Toasts */}
      <ToastContainer />
    </div>
  );
};
