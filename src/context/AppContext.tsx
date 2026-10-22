import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  FoodListing,
  Claim,
  Delivery,
  AnimalShelter,
  Notification,
  PlatformStats,
  UserRole,
  VerificationStatus,
  DeliveryTimelineStatus
} from '../types';
import {
  demoUsers,
  demoListings,
  demoClaims,
  demoDeliveries,
  demoAnimalShelters,
  demoNotifications,
  initialStats
} from '../data/seedData';

export type AppPage =
  | 'home'
  | 'about'
  | 'how-it-works'
  | 'find-food'
  | 'share-food'
  | 'celebrate-and-share'
  | 'ngos'
  | 'animal-shelters'
  | 'impact'
  | 'contact'
  | 'login'
  | 'register'
  | 'donor-dashboard'
  | 'recipient-dashboard'
  | 'ngo-dashboard'
  | 'shelter-dashboard'
  | 'admin-dashboard'
  | 'food-details'
  | 'claim-details'
  | 'delivery-tracking'
  | 'profile'
  | 'notifications'
  | 'settings';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

interface AppContextType {
  currentUser: User;
  switchUserRole: (role: UserRole, specificUserId?: string) => void;
  users: User[];
  updateUserVerification: (userId: string, status: VerificationStatus) => void;
  listings: FoodListing[];
  addListing: (listing: Omit<FoodListing, 'listingId' | 'createdAt' | 'status'>) => FoodListing;
  updateListingStatus: (listingId: string, status: FoodListing['status']) => void;
  claims: Claim[];
  createClaim: (listingId: string, deliveryMethod: 'Self Pickup' | 'Platform Delivery') => Claim;
  deliveries: Delivery[];
  updateDeliveryStatus: (deliveryId: string, status: DeliveryTimelineStatus) => void;
  shelters: AnimalShelter[];
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  addNotification: (notif: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  stats: PlatformStats;
  currentPage: AppPage;
  navigate: (page: AppPage, params?: { listingId?: string; deliveryId?: string; claimId?: string }) => void;
  selectedListingId: string | null;
  setSelectedListingId: (id: string | null) => void;
  selectedDeliveryId: string | null;
  setSelectedDeliveryId: (id: string | null) => void;
  selectedClaimId: string | null;
  setSelectedClaimId: (id: string | null) => void;
  triggerAnimalShelterFallback: (listingId: string) => void;
  toasts: ToastMessage[];
  showToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(demoUsers);
  const [currentUser, setCurrentUser] = useState<User>(demoUsers[0]); // Starts as Green Leaf Restaurant (Donor)
  const [listings, setListings] = useState<FoodListing[]>(demoListings);
  const [claims, setClaims] = useState<Claim[]>(demoClaims);
  const [deliveries, setDeliveries] = useState<Delivery[]>(demoDeliveries);
  const [shelters, setShelters] = useState<AnimalShelter[]>(demoAnimalShelters);
  const [notifications, setNotifications] = useState<Notification[]>(demoNotifications);
  const [stats, setStats] = useState<PlatformStats>(initialStats);
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [selectedListingId, setSelectedListingId] = useState<string | null>('list-101');
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<string | null>('DEL-9941');
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>('CLM-77821');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const navigate = (page: AppPage, params?: { listingId?: string; deliveryId?: string; claimId?: string }) => {
    if (params?.listingId) setSelectedListingId(params.listingId);
    if (params?.deliveryId) setSelectedDeliveryId(params.deliveryId);
    if (params?.claimId) setSelectedClaimId(params.claimId);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchUserRole = (role: UserRole, specificUserId?: string) => {
    if (specificUserId) {
      const found = users.find((u) => u.userId === specificUserId);
      if (found) {
        setCurrentUser(found);
        showToast('info', 'Switched Persona', `Active account: ${found.name} (${found.role.toUpperCase()})`);
        return;
      }
    }
    const found = users.find((u) => u.role === role);
    if (found) {
      setCurrentUser(found);
      showToast('info', 'Switched Persona', `Active account: ${found.name} (${found.role.toUpperCase()})`);
      // Optionally redirect to respective dashboard if on a dashboard page
      if (currentPage.includes('dashboard')) {
        if (role === 'donor') setCurrentPage('donor-dashboard');
        else if (role === 'ngo') setCurrentPage('ngo-dashboard');
        else if (role === 'recipient') setCurrentPage('recipient-dashboard');
        else if (role === 'shelter') setCurrentPage('animal-shelters');
        else if (role === 'admin') setCurrentPage('admin-dashboard');
      }
    }
  };

  const updateUserVerification = (userId: string, status: VerificationStatus) => {
    setUsers((prev) =>
      prev.map((u) => (u.userId === userId ? { ...u, verificationStatus: status } : u))
    );
    showToast('success', 'NGO Verification Updated', `User status updated to ${status}`);
    addNotification({
      userId,
      forRole: 'ngo',
      title: `Verification Status: ${status}`,
      message: `Your organization verification status was updated to ${status} by platform administration.`,
      type: 'verification',
      linkPage: 'ngo-dashboard',
    });
  };

  const addListing = (newListingData: Omit<FoodListing, 'listingId' | 'createdAt' | 'status'>) => {
    const listingId = 'list-' + Math.floor(100 + Math.random() * 900);
    const newListing: FoodListing = {
      ...newListingData,
      listingId,
      status: 'Available',
      createdAt: new Date().toISOString(),
    };
    setListings((prev) => [newListing, ...prev]);
    setStats((prev) => ({
      ...prev,
      foodDonatedKg: prev.foodDonatedKg + 10,
      activeDonors: prev.activeDonors + 1,
    }));
    showToast('success', 'Food Listing Published!', `${newListing.foodName} is now live for rescue.`);
    addNotification({
      forRole: 'all',
      title: 'New Surplus Food Listed!',
      message: `${newListing.donorName} just listed ${newListing.servings} servings of ${newListing.foodName}.`,
      type: 'claim',
      linkPage: 'find-food',
    });
    return newListing;
  };

  const updateListingStatus = (listingId: string, status: FoodListing['status']) => {
    setListings((prev) =>
      prev.map((l) => (l.listingId === listingId ? { ...l, status } : l))
    );
  };

  // Claim logic: Strict Priority Order (Earliest claim timestamp ASC)
  // Section 7 & 9: NGO delivery is compulsory (Self-pickup disabled)
  // Free: Food ₹0, Delivery ₹49 if requested
  const createClaim = (listingId: string, deliveryMethod: 'Self Pickup' | 'Platform Delivery'): Claim => {
    const listing = listings.find((l) => l.listingId === listingId);
    if (!listing) throw new Error('Listing not found');

    const isNGO = currentUser.role === 'ngo';
    const actualDeliveryMethod = isNGO ? 'Platform Delivery' : deliveryMethod;
    const deliveryRequired = isNGO || actualDeliveryMethod === 'Platform Delivery';
    const deliveryCharge = deliveryRequired ? 49 : 0;
    const foodCost = 0; // Section 6: Food is ₹0 free

    const claimId = 'CLM-' + Math.floor(10000 + Math.random() * 90000);
    const deliveryId = deliveryRequired ? 'DEL-' + Math.floor(1000 + Math.random() * 9000) : undefined;
    const pickupOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const deliveryOtp = Math.floor(1000 + Math.random() * 9000).toString();

    const newClaim: Claim = {
      claimId,
      listingId,
      foodName: listing.foodName,
      servings: listing.servings,
      donorName: listing.donorName,
      donorLocation: listing.pickupLocation,
      recipientId: currentUser.userId,
      recipientName: currentUser.organizationName || currentUser.name,
      recipientRole: isNGO ? 'NGO' : currentUser.recipientType || 'Individual',
      claimTimestamp: new Date().toISOString(),
      priorityNumber: 1, // Earliest valid claim gets priority
      status: 'Confirmed',
      deliveryRequired,
      deliveryMethod: actualDeliveryMethod,
      deliveryCharge,
      foodCost,
      totalAmount: foodCost + deliveryCharge,
      pickupOtp,
      deliveryOtp,
      deliveryId,
    };

    setClaims((prev) => [newClaim, ...prev]);

    // Update listing status
    setListings((prev) =>
      prev.map((l) =>
        l.listingId === listingId
          ? {
              ...l,
              status: deliveryRequired ? 'Out for Delivery' : 'Pickup Scheduled',
              claimedBy: {
                recipientId: currentUser.userId,
                recipientName: currentUser.organizationName || currentUser.name,
                recipientType: isNGO ? 'NGO' : currentUser.recipientType || 'Individual',
                claimTime: new Date().toISOString(),
              },
            }
          : l
      )
    );

    // If delivery requested or compulsory for NGO, create delivery assignment
    if (deliveryRequired && deliveryId) {
      const newDelivery: Delivery = {
        deliveryId,
        claimId,
        listingId,
        foodName: listing.foodName,
        servings: listing.servings,
        donorName: listing.donorName,
        donorPhone: '+91 98112 34567',
        donorLocation: listing.pickupLocation,
        recipientName: currentUser.organizationName || currentUser.name,
        recipientRole: isNGO ? 'NGO' : currentUser.recipientType || 'Individual',
        recipientPhone: currentUser.phone,
        recipientLocation: currentUser.location,
        driverName: 'Sanjay Rawat',
        driverPhone: '+91 98104 77123',
        driverVehicle: 'Eco Electric Van (DL 3C EV 7819)',
        driverAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        status: 'Pickup Assigned',
        estimatedArrival: '18 minutes',
        currentLocation: {
          lat: listing.pickupLocation.lat - 0.005,
          lng: listing.pickupLocation.lng - 0.005,
        },
        routeProgressPercent: 25,
        pickupOtp,
        deliveryOtp,
        deliveryFee: 49,
        updatedAt: new Date().toISOString(),
      };
      setDeliveries((prev) => [newDelivery, ...prev]);
    }

    // Update Platform Impact Stats
    setStats((prev) => ({
      ...prev,
      mealsRescued: prev.mealsRescued + listing.servings,
      peopleServed: prev.peopleServed + listing.servings,
      foodWastePreventedKg: prev.foodWastePreventedKg + Math.round(listing.servings * 0.4),
    }));

    showToast(
      'success',
      'Food Reserved Successfully!',
      isNGO
        ? 'NGO claim confirmed! Mandatory delivery has been dispatched.'
        : `Claim confirmed! ${deliveryRequired ? 'Delivery requested (₹49)' : 'Self-pickup scheduled (₹0)'}`
    );

    addNotification({
      forRole: 'donor',
      title: 'Your surplus food was claimed!',
      message: `${currentUser.organizationName || currentUser.name} has reserved ${listing.foodName}.`,
      type: 'claim',
      linkPage: 'donor-dashboard',
    });

    return newClaim;
  };

  const updateDeliveryStatus = (deliveryId: string, status: DeliveryTimelineStatus) => {
    let progress = 20;
    if (status === 'Pickup Assigned') progress = 35;
    if (status === 'Donor Confirmed') progress = 50;
    if (status === 'Food Picked Up') progress = 65;
    if (status === 'On the Way') progress = 85;
    if (status === 'Delivered') progress = 100;

    setDeliveries((prev) =>
      prev.map((d) =>
        d.deliveryId === deliveryId
          ? { ...d, status, routeProgressPercent: progress, updatedAt: new Date().toISOString() }
          : d
      )
    );
    showToast('info', 'Delivery Status Updated', `Status is now: ${status}`);
  };

  // Section 15: Unclaimed Food System -> Fallback to Animal Shelter
  const triggerAnimalShelterFallback = (listingId: string) => {
    const listing = listings.find((l) => l.listingId === listingId);
    if (!listing) return;
    const shelter = shelters[0]; // Happy Tails Shelter

    setListings((prev) =>
      prev.map((l) =>
        l.listingId === listingId
          ? {
              ...l,
              status: 'Redirected to Animal Shelter',
              fallbackShelterId: shelter.shelterId,
            }
          : l
      )
    );

    setShelters((prev) =>
      prev.map((s) =>
        s.shelterId === shelter.shelterId
          ? {
              ...s,
              foodRedirectedCount: s.foodRedirectedCount + 1,
              mealsReceived: s.mealsReceived + listing.servings,
            }
          : s
      )
    );

    showToast(
      'warning',
      'Animal Shelter Fallback Executed',
      `${listing.foodName} safely redirected to ${shelter.name} to avoid waste!`
    );

    addNotification({
      forRole: 'shelter',
      title: 'Incoming Rescue Food Transfer',
      message: `${listing.quantity} of ${listing.foodName} redirected to ${shelter.name}.`,
      type: 'shelter',
      linkPage: 'animal-shelters',
    });
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const addNotification = (notif: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: Notification = {
      ...notif,
      id: 'notif-' + Date.now(),
      timestamp: 'Just now',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Periodic driver movement simulation & safe-consumption countdown tick
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate live driver movement towards destination
      setDeliveries((prev) =>
        prev.map((d) => {
          if (d.status === 'On the Way' && d.routeProgressPercent < 95) {
            return {
              ...d,
              routeProgressPercent: Math.min(95, d.routeProgressPercent + 2),
              currentLocation: {
                lat: d.currentLocation.lat + 0.0002,
                lng: d.currentLocation.lng + 0.0001,
              },
            };
          }
          return d;
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        switchUserRole,
        users,
        updateUserVerification,
        listings,
        addListing,
        updateListingStatus,
        claims,
        createClaim,
        deliveries,
        updateDeliveryStatus,
        shelters,
        notifications,
        markNotificationRead,
        addNotification,
        stats,
        currentPage,
        navigate,
        selectedListingId,
        setSelectedListingId,
        selectedDeliveryId,
        setSelectedDeliveryId,
        selectedClaimId,
        setSelectedClaimId,
        triggerAnimalShelterFallback,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
