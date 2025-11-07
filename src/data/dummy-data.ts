import {
  Product,
  Category,
  Service,
  User,
  // Order,
  Notification,
  Review,
  ServiceReview,
  ServicePackage,
} from "@/types";

export const dummyUser: User = {
  id: "user-1",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+2349012345678",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  isSeller: false,
  createdAt: "2024-01-01T00:00:00Z",
};

// Current user ID for demo purposes
export const currentUserId = "user-1";

export const dummyCategories: Category[] = [
  {
    id: "cat-1",
    name: "Shoes",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop",
    productCount: 156,
  },
  {
    id: "cat-2",
    name: "Fashion",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop",
    productCount: 234,
  },
  {
    id: "cat-3",
    name: "Home & Garden",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
    productCount: 89,
  },
  {
    id: "cat-4",
    name: "Sports",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
    productCount: 67,
  },
  {
    id: "cat-5",
    name: "Books",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
    productCount: 123,
  },
  {
    id: "cat-6",
    name: "Beauty",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop",
    productCount: 98,
  },
];

export const dummyProducts: Product[] = [
  {
    id: "prod-1",
    name: "iPhone 15 Pro Max",
    description: "Latest iPhone with advanced camera system and A17 Pro chip",
    price: 1200000,
    originalPrice: 1400000,
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
    ],
    category: "Electronics",
    seller: {
      id: "seller-1",
      name: "TechStore NG",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      rating: 4.8,
    },
    rating: 4.9,
    reviewCount: 15,
    isOnSale: true,
    salePercentage: 14,
    inStock: true,
    tags: ["smartphone", "apple", "5g", "camera"],
    createdAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "prod-2",
    name: "Nike Air Max 270",
    description: "Comfortable running shoes with Air Max technology",
    price: 45000,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    ],
    category: "Sports",
    seller: {
      id: "seller-2",
      name: "SportsWorld",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      rating: 4.6,
    },
    rating: 4.7,
    reviewCount: 89,
    isOnSale: false,
    inStock: true,
    tags: ["shoes", "running", "nike", "comfortable"],
    createdAt: "2024-01-10T00:00:00Z",
  },
  {
    id: "prod-3",
    name: "Samsung 4K Smart TV",
    description: "55-inch 4K Ultra HD Smart TV with HDR",
    price: 350000,
    originalPrice: 420000,
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
    ],
    category: "Electronics",
    seller: {
      id: "seller-3",
      name: "Electronics Hub",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      rating: 4.5,
    },
    rating: 4.6,
    reviewCount: 156,
    isOnSale: true,
    salePercentage: 17,
    inStock: true,
    tags: ["tv", "4k", "smart", "samsung"],
    createdAt: "2024-01-12T00:00:00Z",
  },
  {
    id: "prod-4",
    name: "Wireless Bluetooth Headphones",
    description:
      "Premium noise-cancelling headphones with 30-hour battery life",
    price: 25000,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    ],
    category: "Electronics",
    seller: {
      id: "seller-1",
      name: "TechStore NG",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      rating: 4.8,
    },
    rating: 4.8,
    reviewCount: 203,
    isOnSale: false,
    inStock: true,
    tags: ["headphones", "bluetooth", "wireless", "noise-cancelling"],
    createdAt: "2024-01-08T00:00:00Z",
  },
  {
    id: "prod-5",
    name: "Designer Handbag",
    description: "Luxury leather handbag with gold hardware",
    price: 85000,
    originalPrice: 120000,
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
    ],
    category: "Fashion",
    seller: {
      id: "seller-4",
      name: "Luxury Fashion",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      rating: 4.9,
    },
    rating: 4.9,
    reviewCount: 67,
    isOnSale: true,
    salePercentage: 29,
    inStock: true,
    tags: ["handbag", "leather", "luxury", "designer"],
    createdAt: "2024-01-14T00:00:00Z",
  },
  {
    id: "prod-6",
    name: "Coffee Maker",
    description: "Programmable coffee maker with thermal carafe",
    price: 35000,
    images: [
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop",
    ],
    category: "Home & Garden",
    seller: {
      id: "seller-5",
      name: "Home Essentials",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      rating: 4.4,
    },
    rating: 4.5,
    reviewCount: 134,
    isOnSale: false,
    inStock: true,
    tags: ["coffee", "kitchen", "appliance", "programmable"],
    createdAt: "2024-01-11T00:00:00Z",
  },
];

export const dummyServices: Service[] = [
  {
    id: "service-1",
    title: "Professional Photography",
    description:
      "High-quality photography services for events, portraits, and commercial use",
    price: 50000,
    duration: "2-3 hours",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
    ],
    provider: {
      id: "provider-1",
      name: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
      rating: 4.9,
      location: "Lagos, Nigeria",
    },
    rating: 4.9,
    reviewCount: 45,
    category: "Photography",
    tags: ["photography", "events", "portraits", "professional"],
    isAvailable: true,
    createdAt: "2024-01-05T00:00:00Z",
  },
  {
    id: "service-2",
    title: "House Cleaning",
    description: "Professional house cleaning services for homes and offices",
    price: 15000,
    duration: "3-4 hours",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    ],
    provider: {
      id: "provider-2",
      name: "CleanPro Services",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      rating: 4.7,
      location: "Abuja, Nigeria",
    },
    rating: 4.7,
    reviewCount: 89,
    category: "Cleaning",
    tags: ["cleaning", "house", "office", "professional"],
    isAvailable: true,
    createdAt: "2024-01-03T00:00:00Z",
  },
  {
    id: "service-3",
    title: "Web Development",
    description: "Custom website development and web application services",
    price: 200000,
    duration: "2-4 weeks",
    images: [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop",
    ],
    provider: {
      id: "provider-3",
      name: "Tech Solutions NG",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      rating: 4.8,
      location: "Port Harcourt, Nigeria",
    },
    rating: 4.8,
    reviewCount: 23,
    category: "Technology",
    tags: ["web development", "programming", "custom", "professional"],
    isAvailable: true,
    createdAt: "2024-01-07T00:00:00Z",
  },
];

export const dummyNotifications: Notification[] = [
  {
    id: "notif-1",
    title: "Order Confirmed",
    message: "Your order #ORD-12345 has been confirmed and is being processed",
    type: "order",
    isRead: false,
    createdAt: "2024-01-20T10:30:00Z",
  },
  {
    id: "notif-2",
    title: "New Message",
    message: "You have a new message from TechStore NG",
    type: "message",
    isRead: false,
    createdAt: "2024-01-20T09:15:00Z",
  },
  {
    id: "notif-3",
    title: "Flash Sale",
    message: "Get 50% off on all electronics! Sale ends in 2 hours",
    type: "promotion",
    isRead: true,
    createdAt: "2024-01-20T08:00:00Z",
  },
  {
    id: "notif-4",
    title: "Order Shipped",
    message: "Your order #ORD-12340 has been shipped and is on its way",
    type: "order",
    isRead: true,
    createdAt: "2024-01-19T16:45:00Z",
  },
];

export const dummyReviews: Review[] = [
  {
    id: "rev-1",
    productId: "prod-1",
    userId: "user-1",
    userName: "John Doe",
    userAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face",
    rating: 5,
    comment:
      "Excellent product! The quality is outstanding and delivery was super fast.",
    createdAt: "2024-01-20T10:30:00Z",
    isVerified: true,
  },
  {
    id: "rev-2",
    productId: "prod-1",
    userId: "user-2",
    userName: "Sarah Wilson",
    userAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    rating: 4,
    comment:
      "Great product, very satisfied with the purchase. Would recommend!",
    createdAt: "2024-01-19T14:20:00Z",
    isVerified: true,
  },
  {
    id: "rev-3",
    productId: "prod-1",
    userId: "user-3",
    userName: "Mike Johnson",
    userAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    rating: 5,
    comment:
      "Amazing quality! This exceeded my expectations. Fast shipping too.",
    createdAt: "2024-01-18T09:15:00Z",
    isVerified: true,
  },
  {
    id: "rev-4",
    productId: "prod-1",
    userId: "user-4",
    userName: "Emma Davis",
    userAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
    rating: 4,
    comment:
      "Very good product, good value for money. Happy with the purchase.",
    createdAt: "2024-01-17T16:45:00Z",
    isVerified: true,
  },
  {
    id: "rev-5",
    productId: "prod-1",
    userId: "user-5",
    userName: "David Brown",
    userAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
    rating: 5,
    comment: "Outstanding product quality! The seller was very professional.",
    createdAt: "2024-01-16T11:30:00Z",
    isVerified: true,
  },
  {
    id: "rev-6",
    productId: "prod-1",
    userId: "user-6",
    userName: "Lisa Anderson",
    userAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face",
    rating: 4,
    comment: "Great product, arrived on time. Very satisfied with the service.",
    createdAt: "2024-01-15T13:20:00Z",
    isVerified: true,
  },
  {
    id: "rev-7",
    productId: "prod-1",
    userId: "user-7",
    userName: "Tom Wilson",
    userAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    rating: 5,
    comment: "Excellent quality and fast delivery. Highly recommended!",
    createdAt: "2024-01-14T10:10:00Z",
    isVerified: true,
  },
  {
    id: "rev-8",
    productId: "prod-1",
    userId: "user-8",
    userName: "Anna Garcia",
    userAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
    rating: 4,
    comment: "Very good product, good packaging. Would buy again.",
    createdAt: "2024-01-13T15:30:00Z",
    isVerified: true,
  },
  {
    id: "rev-9",
    productId: "prod-1",
    userId: "user-9",
    userName: "Chris Lee",
    userAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
    rating: 5,
    comment: "Amazing product quality! The seller is very reliable.",
    createdAt: "2024-01-12T12:45:00Z",
    isVerified: true,
  },
  {
    id: "rev-10",
    productId: "prod-1",
    userId: "user-10",
    userName: "Maria Rodriguez",
    userAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face",
    rating: 4,
    comment: "Great product, good value. Very happy with the purchase.",
    createdAt: "2024-01-11T09:20:00Z",
    isVerified: true,
  },
  {
    id: "rev-11",
    productId: "prod-1",
    userId: "user-11",
    userName: "James Taylor",
    userAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    rating: 5,
    comment: "Outstanding quality! This is exactly what I was looking for.",
    createdAt: "2024-01-10T14:15:00Z",
    isVerified: true,
  },
  {
    id: "rev-12",
    productId: "prod-1",
    userId: "user-12",
    userName: "Jennifer White",
    userAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
    rating: 4,
    comment: "Very good product, fast shipping. Highly satisfied!",
    createdAt: "2024-01-09T11:30:00Z",
    isVerified: true,
  },
  {
    id: "rev-13",
    productId: "prod-1",
    userId: "user-13",
    userName: "Robert Johnson",
    userAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
    rating: 5,
    comment: "Excellent product quality! The seller is very professional.",
    createdAt: "2024-01-08T16:20:00Z",
    isVerified: true,
  },
  {
    id: "rev-14",
    productId: "prod-1",
    userId: "user-14",
    userName: "Patricia Brown",
    userAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face",
    rating: 4,
    comment: "Great product, good value for money. Very happy!",
    createdAt: "2024-01-07T13:45:00Z",
    isVerified: true,
  },
  {
    id: "rev-15",
    productId: "prod-1",
    userId: "user-15",
    userName: "Michael Davis",
    userAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    rating: 5,
    comment: "Amazing quality! This exceeded my expectations completely.",
    createdAt: "2024-01-06T10:10:00Z",
    isVerified: true,
  },
  {
    id: "rev-16",
    productId: "prod-2",
    userId: "user-16",
    userName: "Linda Wilson",
    userAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
    rating: 4,
    comment: "Good product, arrived on time. Satisfied with the purchase.",
    createdAt: "2024-01-05T15:30:00Z",
    isVerified: true,
  },
  {
    id: "rev-17",
    productId: "prod-2",
    userId: "user-17",
    userName: "William Anderson",
    userAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
    rating: 5,
    comment: "Excellent quality! Very happy with this purchase.",
    createdAt: "2024-01-04T12:20:00Z",
    isVerified: true,
  },
];

// Service reviews data
export const dummyServiceReviews: ServiceReview[] = [
  {
    id: "srev-1",
    serviceId: "service-1",
    userId: "user-1",
    userName: "John Doe",
    userAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face",
    rating: 5,
    comment:
      "Amazing photography service! Sarah captured our wedding perfectly.",
    createdAt: "2024-01-20T10:30:00Z",
    isVerified: true,
  },
  {
    id: "srev-2",
    serviceId: "service-1",
    userId: "user-2",
    userName: "Sarah Wilson",
    userAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    rating: 5,
    comment: "Professional and creative photographer. Highly recommended!",
    createdAt: "2024-01-19T14:20:00Z",
    isVerified: true,
  },
  {
    id: "srev-3",
    serviceId: "service-1",
    userId: "user-3",
    userName: "Mike Johnson",
    userAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    rating: 4,
    comment: "Great photography service, very professional and punctual.",
    createdAt: "2024-01-18T09:15:00Z",
    isVerified: true,
  },
  {
    id: "srev-4",
    serviceId: "service-1",
    userId: "user-4",
    userName: "Emma Davis",
    userAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
    rating: 5,
    comment: "Exceptional service! Sarah made our event photos look amazing.",
    createdAt: "2024-01-17T16:45:00Z",
    isVerified: true,
  },
  {
    id: "srev-5",
    serviceId: "service-1",
    userId: "user-5",
    userName: "David Brown",
    userAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
    rating: 4,
    comment: "Very good photography service, professional and reliable.",
    createdAt: "2024-01-16T11:30:00Z",
    isVerified: true,
  },
  {
    id: "srev-6",
    serviceId: "service-2",
    userId: "user-6",
    userName: "Lisa Anderson",
    userAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face",
    rating: 5,
    comment: "Excellent cleaning service! My house looks spotless now.",
    createdAt: "2024-01-20T13:20:00Z",
    isVerified: true,
  },
  {
    id: "srev-7",
    serviceId: "service-2",
    userId: "user-7",
    userName: "Tom Wilson",
    userAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    rating: 4,
    comment: "Great cleaning service, very thorough and professional.",
    createdAt: "2024-01-19T10:10:00Z",
    isVerified: true,
  },
  {
    id: "srev-8",
    serviceId: "service-2",
    userId: "user-8",
    userName: "Anna Garcia",
    userAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
    rating: 5,
    comment: "Amazing cleaning service! They did an incredible job.",
    createdAt: "2024-01-18T15:30:00Z",
    isVerified: true,
  },
  {
    id: "srev-9",
    serviceId: "service-2",
    userId: "user-9",
    userName: "Chris Lee",
    userAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
    rating: 4,
    comment: "Very good cleaning service, reliable and efficient.",
    createdAt: "2024-01-17T12:45:00Z",
    isVerified: true,
  },
  {
    id: "srev-10",
    serviceId: "service-2",
    userId: "user-10",
    userName: "Maria Rodriguez",
    userAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face",
    rating: 5,
    comment: "Outstanding cleaning service! Highly recommended.",
    createdAt: "2024-01-16T09:20:00Z",
    isVerified: true,
  },
];

// Service packages data
export const dummyServicePackages: ServicePackage[] = [
  {
    id: "pkg-1",
    serviceId: "service-1",
    name: "Basic Package",
    description: "Essential photography coverage for small events",
    price: 30000,
    duration: "2 hours",
    features: [
      "Up to 50 edited photos",
      "Basic editing",
      "Digital delivery",
      "1 week delivery",
    ],
    isPopular: false,
  },
  {
    id: "pkg-2",
    serviceId: "service-1",
    name: "Standard Package",
    description: "Comprehensive photography coverage for medium events",
    price: 50000,
    duration: "3 hours",
    features: [
      "Up to 100 edited photos",
      "Advanced editing",
      "Digital delivery",
      "5 days delivery",
      "Print rights included",
    ],
    isPopular: true,
  },
  {
    id: "pkg-3",
    serviceId: "service-1",
    name: "Premium Package",
    description: "Full-service photography for large events",
    price: 80000,
    duration: "4 hours",
    features: [
      "Up to 200 edited photos",
      "Premium editing",
      "Digital delivery",
      "3 days delivery",
      "Print rights included",
      "Photo album included",
    ],
    isPopular: false,
  },
  {
    id: "pkg-4",
    serviceId: "service-2",
    name: "Basic Cleaning",
    description: "Essential cleaning service for small homes",
    price: 10000,
    duration: "2 hours",
    features: [
      "General cleaning",
      "Kitchen & bathroom",
      "Dusting & vacuuming",
      "Basic organization",
    ],
    isPopular: false,
  },
  {
    id: "pkg-5",
    serviceId: "service-2",
    name: "Standard Cleaning",
    description: "Comprehensive cleaning for medium homes",
    price: 15000,
    duration: "3 hours",
    features: [
      "Deep cleaning",
      "All rooms included",
      "Kitchen & bathroom detail",
      "Dusting & vacuuming",
      "Window cleaning",
    ],
    isPopular: true,
  },
  {
    id: "pkg-6",
    serviceId: "service-2",
    name: "Premium Cleaning",
    description: "Full-service cleaning for large homes",
    price: 25000,
    duration: "4 hours",
    features: [
      "Deep cleaning",
      "All rooms included",
      "Kitchen & bathroom detail",
      "Dusting & vacuuming",
      "Window cleaning",
      "Carpet cleaning",
      "Move-in/out cleaning",
    ],
    isPopular: false,
  },
  {
    id: "pkg-7",
    serviceId: "service-3",
    name: "Basic Website",
    description: "Simple website with essential features",
    price: 150000,
    duration: "2 weeks",
    features: [
      "Responsive design",
      "Up to 5 pages",
      "Contact form",
      "Basic SEO",
      "1 month support",
    ],
    isPopular: false,
  },
  {
    id: "pkg-8",
    serviceId: "service-3",
    name: "Standard Website",
    description: "Professional website with advanced features",
    price: 200000,
    duration: "3 weeks",
    features: [
      "Responsive design",
      "Up to 10 pages",
      "Contact forms",
      "Advanced SEO",
      "Content management system",
      "3 months support",
    ],
    isPopular: true,
  },
  {
    id: "pkg-9",
    serviceId: "service-3",
    name: "Premium Website",
    description: "Full-featured website with e-commerce",
    price: 300000,
    duration: "4 weeks",
    features: [
      "Responsive design",
      "Unlimited pages",
      "E-commerce functionality",
      "Advanced SEO",
      "Content management system",
      "Payment integration",
      "6 months support",
    ],
    isPopular: false,
  },
];
