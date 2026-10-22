export type UserRole = 'donor' | 'recipient' | 'ngo' | 'shelter' | 'admin';

export type DonorType = 'Hotel' | 'Restaurant' | 'Caterer' | 'Individual' | 'Event Organizer';
export type RecipientType = 'Individual' | 'Group' | 'NGO';

export type VerificationStatus = 'Pending' | 'Under Review' | 'Verified' | 'Rejected' | 'Suspended';

export interface Location {
  address: string;
  lat: number;
  lng: number;
  city?: string;
  landmark?: string;
}

export interface User {
  userId: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  location: Location;
  verificationStatus: VerificationStatus;
  avatar?: string;
  donorType?: DonorType;
  recipientType?: RecipientType;
  organizationName?: string;
  registrationNumber?: string;
  serviceArea?: string;
  beneficiaryCount?: number;
  foodRequirements?: string;
  documents?: { title: string; url: string; uploadDate: string }[];
  impactScore: number;
  createdAt: string;
}

export type FoodCategory =
  | 'Rice'
  | 'Roti'
  | 'Dal'
  | 'Sabzi'
  | 'Biryani'
  | 'Snacks'
  | 'Sweets'
  | 'Bakery'
  | 'Packaged food'
  | 'Fruits'
  | 'Vegetables'
  | 'Complete meals'
  | 'Wedding/event food'
  | 'Other';

export type ListingStatus =
  | 'Available'
  | 'Almost Claimed'
  | 'Fully Claimed'
  | 'Pickup Scheduled'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Redirected to Animal Shelter'
  | 'Expired';

export interface FoodListing {
  listingId: string;
  donorId: string;
  donorName: string;
  donorType: DonorType;
  donorAvatar?: string;
  isVerifiedDonor: boolean;
  foodName: string;
  category: FoodCategory;
  foodDescription: string;
  quantity: string;
  servings: number;
  isVeg: boolean;
  preparationDate: string;
  preparationTime: string;
  safeConsumptionDeadline: string; // ISO date-time string
  minutesRemaining?: number;
  storageCondition: 'Hot / Insulated' | 'Room Temperature' | 'Refrigerated' | 'Chilled';
  pickupLocation: Location;
  distanceKm: number;
  price: number; // 0 for free
  isFree: boolean;
  deliveryAvailable: boolean;
  packagingInfo: string;
  packagingSize?: 'Small' | 'Medium' | 'Large';
  allergenInfo: string[];
  specialInstructions?: string;
  foodImage: string;
  status: ListingStatus;
  isCelebrateAndShare?: boolean;
  celebrationDetails?: {
    occasion: string;
    message: string;
    donorHidden?: boolean;
    recipientPref?: string;
  };
  fallbackShelterId?: string;
  claimedBy?: {
    recipientId: string;
    recipientName: string;
    recipientType: RecipientType;
    claimTime: string;
  };
  createdAt: string;
}

export type ClaimStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Pickup Scheduled'
  | 'In Transit'
  | 'Completed'
  | 'Cancelled';

export interface Claim {
  claimId: string;
  listingId: string;
  foodName: string;
  servings: number;
  donorName: string;
  donorLocation: Location;
  recipientId: string;
  recipientName: string;
  recipientRole: RecipientType;
  claimTimestamp: string;
  priorityNumber: number;
  status: ClaimStatus;
  deliveryRequired: boolean;
  deliveryMethod: 'Self Pickup' | 'Platform Delivery';
  deliveryCharge: number;
  foodCost: number;
  totalAmount: number;
  pickupOtp: string;
  deliveryOtp: string;
  deliveryId?: string;
}

export type DeliveryTimelineStatus =
  | 'Claim Confirmed'
  | 'Pickup Assigned'
  | 'Donor Confirmed'
  | 'Food Picked Up'
  | 'On the Way'
  | 'Delivered';

export interface Delivery {
  deliveryId: string;
  claimId: string;
  listingId: string;
  foodName: string;
  servings: number;
  donorName: string;
  donorPhone: string;
  donorLocation: Location;
  recipientName: string;
  recipientRole: RecipientType;
  recipientPhone: string;
  recipientLocation: Location;
  driverName: string;
  driverPhone: string;
  driverVehicle: string;
  driverAvatar: string;
  status: DeliveryTimelineStatus;
  estimatedArrival: string;
  currentLocation: { lat: number; lng: number };
  routeProgressPercent: number;
  pickupOtp: string;
  deliveryOtp: string;
  deliveryFee: number;
  updatedAt: string;
}

export interface AnimalShelter {
  shelterId: string;
  name: string;
  location: Location;
  contactPerson: string;
  phone: string;
  email: string;
  capacity: string;
  animalTypes: string[];
  verificationStatus: 'Verified' | 'Pending';
  foodRedirectedCount: number;
  mealsReceived: number;
  about: string;
  image: string;
}

export interface Notification {
  id: string;
  userId?: string;
  forRole?: UserRole | 'all';
  title: string;
  message: string;
  type: 'claim' | 'delivery' | 'expiry' | 'shelter' | 'verification' | 'system';
  timestamp: string;
  read: boolean;
  linkPage?: string;
}

export interface PlatformStats {
  mealsRescued: number;
  foodDonatedKg: number;
  peopleServed: number;
  ngosConnected: number;
  animalSheltersConnected: number;
  foodWastePreventedKg: number;
  activeDonors: number;
}
