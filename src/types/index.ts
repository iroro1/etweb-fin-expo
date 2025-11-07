export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  isSeller: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  seller: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
  };
  rating: number;
  reviewCount: number;
  isOnSale: boolean;
  salePercentage?: number;
  inStock: boolean;
  tags: string[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  images: string[];
  provider: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
    location: string;
  };
  rating: number;
  reviewCount: number;
  category: string;
  tags: string[];
  isAvailable: boolean;
  createdAt: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed";
  shippingAddress: Address;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: "text" | "image" | "file";
  isRead: boolean;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "order" | "message" | "promotion" | "system";
  isRead: boolean;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment?: string;
  createdAt: string;
  isVerified: boolean;
}

export interface ReviewForm {
  rating: number;
  comment: string;
}

export interface ServiceReview {
  id: string;
  serviceId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment?: string;
  createdAt: string;
  isVerified: boolean;
}

export interface ServicePackage {
  id: string;
  serviceId: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  isPopular: boolean;
}

export interface SellerDashboardOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    type: "product" | "service";
  }>;
  total: number;
  status: string;
  paymentStatus: string;
  orderDate: string;
  estimatedDelivery: string;
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    country: string;
    phone: string;
  };
  trackingNumber: string;
  timeline: Array<{
    status: string;
    date: string;
    description: string;
  }>;
}

