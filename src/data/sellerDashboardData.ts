import { SellerDashboardOrder } from "@/types";

// Seller Dashboard Dummy Data
export const sellerDashboardData: {
  products: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    category: string;
    subcategory: string;
    images: string[];
    stock: number;
    sku: string;
    brand: string;
    warranty: string;
    deliveryOptions: string[];
    features: string[];
    tags: string[];
    isFeatured: boolean;
    isOnSale: boolean;
    salePercentage: number;
    discountType: string;
    saleStartDate: string | null;
    saleEndDate: string | null;
    createdAt: string;
    updatedAt: string;
  }>;
  services: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    duration: string;
    category: string;
    subcategory?: string;
    images: string[];
    tags: string[];
    sku?: string;
    features?: string[];
    isFeatured?: boolean;
    isOnSale?: boolean;
    salePercentage?: number;
    discountType?: string;
    saleStartDate?: string | null;
    saleEndDate?: string | null;
    createdAt: string;
    updatedAt?: string;
  }>;
  orders: SellerDashboardOrder[];
  analytics: {
    overview: {
      totalRevenue: number;
      totalOrders: number;
      totalProducts: number;
      totalServices: number;
      averageOrderValue: number;
      conversionRate: number;
      customerSatisfaction: number;
    };
    revenue: {
      daily: Array<{
        date: string;
        revenue: number;
      }>;
      weekly: Array<{
        week: string;
        revenue: number;
      }>;
      monthly: Array<{
        month: string;
        revenue: number;
      }>;
    };
    topProducts: Array<{
      name: string;
      sales: number;
      revenue: number;
    }>;
    topServices: Array<{
      name: string;
      sales: number;
      revenue: number;
    }>;
    orderStatus: {
      pending: number;
      processing: number;
      shipped: number;
      delivered: number;
      cancelled: number;
      in_progress: number;
      completed: number;
    };
  };
} = {
  // Products dummy data
  products: [
    {
      id: "1",
      name: "iPhone 15 Pro Max",
      description:
        "Latest iPhone with titanium design, A17 Pro chip, and 48MP camera system",
      price: 1250000,
      originalPrice: 1350000,
      category: "Electronics",
      subcategory: "Smartphones",
      images: [
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
      ],
      stock: 15,
      sku: "IP15PM-256GB",
      brand: "Apple",
      warranty: "1 Year",
      deliveryOptions: ["Express", "Standard"],
      features: ["5G", "Face ID", "MagSafe", "USB-C"],
      tags: ["premium", "new", "5g"],
      isFeatured: true,
      isOnSale: true,
      salePercentage: 7,
      discountType: "percentage",
      saleStartDate: "2024-01-01",
      saleEndDate: "2024-12-31",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
    },
    {
      id: "2",
      name: "Samsung Galaxy S24 Ultra",
      description:
        "Premium Android flagship with S Pen, 200MP camera, and AI features",
      price: 980000,
      originalPrice: 1100000,
      category: "Electronics",
      subcategory: "Smartphones",
      images: [
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
      ],
      stock: 8,
      sku: "SGS24U-512GB",
      brand: "Samsung",
      warranty: "2 Years",
      deliveryOptions: ["Express", "Standard"],
      features: ["S Pen", "200MP Camera", "5G", "Wireless Charging"],
      tags: ["premium", "android", "spen"],
      isFeatured: true,
      isOnSale: false,
      salePercentage: 0,
      discountType: "percentage",
      saleStartDate: null,
      saleEndDate: null,
      createdAt: "2024-01-10",
      updatedAt: "2024-01-10",
    },
    {
      id: "3",
      name: "MacBook Air M3",
      description:
        "Ultra-thin laptop with M3 chip, 18-hour battery life, and Liquid Retina display",
      price: 1850000,
      originalPrice: 2000000,
      category: "Electronics",
      subcategory: "Laptops",
      images: [
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
      ],
      stock: 5,
      sku: "MBA-M3-256GB",
      brand: "Apple",
      warranty: "1 Year",
      deliveryOptions: ["Express", "Standard"],
      features: ["M3 Chip", "18hr Battery", "Retina Display", "Touch ID"],
      tags: ["premium", "laptop", "apple"],
      isFeatured: true,
      isOnSale: true,
      salePercentage: 8,
      discountType: "percentage",
      saleStartDate: "2024-01-01",
      saleEndDate: "2024-06-30",
      createdAt: "2024-01-05",
      updatedAt: "2024-01-15",
    },
    {
      id: "4",
      name: "Nike Air Max 270",
      description:
        "Comfortable running shoes with Air Max technology and breathable mesh",
      price: 45000,
      originalPrice: 55000,
      category: "Fashion",
      subcategory: "Shoes",
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      ],
      stock: 25,
      sku: "NIKE-AM270-BLK",
      brand: "Nike",
      warranty: "6 Months",
      deliveryOptions: ["Standard"],
      features: ["Air Max Technology", "Breathable Mesh", "Rubber Sole"],
      tags: ["running", "comfortable", "nike"],
      isFeatured: false,
      isOnSale: true,
      salePercentage: 18,
      discountType: "percentage",
      saleStartDate: "2024-01-01",
      saleEndDate: "2024-03-31",
      createdAt: "2024-01-12",
      updatedAt: "2024-01-12",
    },
    {
      id: "5",
      name: "Sony WH-1000XM5",
      description:
        "Premium noise-cancelling headphones with 30-hour battery life",
      price: 180000,
      originalPrice: 220000,
      category: "Electronics",
      subcategory: "Audio",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      ],
      stock: 12,
      sku: "SONY-WH1000XM5",
      brand: "Sony",
      warranty: "1 Year",
      deliveryOptions: ["Express", "Standard"],
      features: ["Noise Cancelling", "30hr Battery", "Touch Controls", "LDAC"],
      tags: ["premium", "audio", "wireless"],
      isFeatured: true,
      isOnSale: true,
      salePercentage: 18,
      discountType: "percentage",
      saleStartDate: "2024-01-01",
      saleEndDate: "2024-04-30",
      createdAt: "2024-01-08",
      updatedAt: "2024-01-18",
    },
  ],

  // Services dummy data
  services: [
    {
      id: "1",
      name: "Web Development",
      description:
        "Professional web development services including frontend, backend, and full-stack solutions",
      price: 250000,
      originalPrice: 300000,
      category: "Technology",
      subcategory: "Web Development",
      images: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
      ],
      duration: "2-4 weeks",
      sku: "WEB-DEV-FULL",
      features: [
        "Responsive Design",
        "SEO Optimization",
        "Database Design",
        "API Integration",
      ],
      tags: ["web", "development", "fullstack"],
      isFeatured: true,
      isOnSale: true,
      salePercentage: 17,
      discountType: "percentage",
      saleStartDate: "2024-01-01",
      saleEndDate: "2024-03-31",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
    },
    {
      id: "2",
      name: "Mobile App Development",
      description:
        "Native and cross-platform mobile app development for iOS and Android",
      price: 400000,
      originalPrice: 450000,
      category: "Technology",
      subcategory: "Mobile Development",
      images: [
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400",
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400",
      ],
      duration: "4-6 weeks",
      sku: "MOBILE-APP-NATIVE",
      features: [
        "Native Development",
        "Cross-platform",
        "App Store Publishing",
        "Push Notifications",
      ],
      tags: ["mobile", "app", "ios", "android"],
      isFeatured: true,
      isOnSale: false,
      salePercentage: 0,
      discountType: "percentage",
      saleStartDate: null,
      saleEndDate: null,
      createdAt: "2024-01-10",
      updatedAt: "2024-01-10",
    },
    {
      id: "3",
      name: "Graphic Design",
      description:
        "Professional graphic design services including logos, branding, and marketing materials",
      price: 75000,
      originalPrice: 90000,
      category: "Creative",
      subcategory: "Graphic Design",
      images: [
        "https://images.unsplash.com/photo-1626785774573-4b799315486d?w=400",
        "https://images.unsplash.com/photo-1626785774573-4b799315486d?w=400",
      ],
      duration: "1-2 weeks",
      sku: "GRAPHIC-DESIGN-BRAND",
      features: [
        "Logo Design",
        "Brand Identity",
        "Marketing Materials",
        "Social Media Graphics",
      ],
      tags: ["design", "creative", "branding"],
      isFeatured: false,
      isOnSale: true,
      salePercentage: 17,
      discountType: "percentage",
      saleStartDate: "2024-01-01",
      saleEndDate: "2024-02-29",
      createdAt: "2024-01-12",
      updatedAt: "2024-01-12",
    },
    {
      id: "4",
      name: "Digital Marketing",
      description:
        "Comprehensive digital marketing services including SEO, social media, and PPC campaigns",
      price: 120000,
      originalPrice: 150000,
      category: "Marketing",
      subcategory: "Digital Marketing",
      images: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
      ],
      duration: "Ongoing",
      sku: "DIGITAL-MARKETING-FULL",
      features: [
        "SEO Optimization",
        "Social Media Management",
        "PPC Campaigns",
        "Analytics",
      ],
      tags: ["marketing", "seo", "social"],
      isFeatured: true,
      isOnSale: true,
      salePercentage: 20,
      discountType: "percentage",
      saleStartDate: "2024-01-01",
      saleEndDate: "2024-04-30",
      createdAt: "2024-01-08",
      updatedAt: "2024-01-18",
    },
    {
      id: "5",
      name: "Content Writing",
      description:
        "Professional content writing services for blogs, websites, and marketing materials",
      price: 45000,
      originalPrice: 55000,
      category: "Creative",
      subcategory: "Content Writing",
      images: [
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400",
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400",
      ],
      duration: "3-5 days",
      sku: "CONTENT-WRITING-BLOG",
      features: [
        "Blog Writing",
        "Website Content",
        "SEO Content",
        "Copywriting",
      ],
      tags: ["content", "writing", "seo"],
      isFeatured: false,
      isOnSale: true,
      salePercentage: 18,
      discountType: "percentage",
      saleStartDate: "2024-01-01",
      saleEndDate: "2024-03-31",
      createdAt: "2024-01-05",
      updatedAt: "2024-01-15",
    },
  ],

  // Orders dummy data
  orders: [
    {
      id: "ORD-001",
      customerName: "Adebayo Johnson",
      customerEmail: "adebayo.johnson@email.com",
      customerPhone: "+2348012345678",
      items: [
        {
          id: "1",
          name: "iPhone 15 Pro Max",
          price: 1250000,
          quantity: 1,
          type: "product",
        },
      ],
      total: 1250000,
      status: "pending",
      paymentStatus: "pending",
      orderDate: "2024-01-20T10:30:00Z",
      estimatedDelivery: "2024-01-25",
      shippingAddress: {
        address: "123 Victoria Island",
        city: "Lagos",
        state: "Lagos",
        country: "Nigeria",
        phone: "+2348012345678",
      },
      trackingNumber: "TRK-2024-001",
      timeline: [
        {
          status: "Order Placed",
          date: "2024-01-20T10:30:00Z",
          description: "Order has been placed successfully",
        },
        {
          status: "Payment Confirmed",
          date: "2024-01-20T11:15:00Z",
          description: "Payment has been confirmed",
        },
        {
          status: "Processing",
          date: "2024-01-20T14:20:00Z",
          description: "Order is being processed",
        },
      ],
    },
    {
      id: "ORD-002",
      customerName: "Chioma Okechukwu",
      customerEmail: "chioma.okechukwu@email.com",
      customerPhone: "+2348098765432",
      items: [
        {
          id: "2",
          name: "Samsung Galaxy S24 Ultra",
          price: 980000,
          quantity: 1,
          type: "product",
        },
        {
          id: "4",
          name: "Nike Air Max 270",
          price: 45000,
          quantity: 2,
          type: "product",
        },
      ],
      total: 1070000,
      status: "shipped",
      paymentStatus: "paid",
      orderDate: "2024-01-18T09:15:00Z",
      estimatedDelivery: "2024-01-23",
      shippingAddress: {
        address: "456 Lekki Phase 1",
        city: "Lagos",
        state: "Lagos",
        country: "Nigeria",
        phone: "+2348098765432",
      },
      trackingNumber: "TRK-2024-002",
      timeline: [
        {
          status: "Order Placed",
          date: "2024-01-18T09:15:00Z",
          description: "Order has been placed successfully",
        },
        {
          status: "Payment Confirmed",
          date: "2024-01-18T09:45:00Z",
          description: "Payment has been confirmed",
        },
        {
          status: "Processing",
          date: "2024-01-18T12:30:00Z",
          description: "Order is being processed",
        },
        {
          status: "Shipped",
          date: "2024-01-19T08:20:00Z",
          description: "Order has been shipped",
        },
      ],
    },
    {
      id: "ORD-003",
      customerName: "Kemi Adebayo",
      customerEmail: "kemi.adebayo@email.com",
      customerPhone: "+2348076543210",
      items: [
        {
          id: "1",
          name: "Web Development",
          price: 250000,
          quantity: 1,
          type: "service",
        },
      ],
      total: 250000,
      status: "delivered",
      paymentStatus: "paid",
      orderDate: "2024-01-15T14:20:00Z",
      estimatedDelivery: "2024-01-29",
      shippingAddress: {
        address: "789 Ikeja GRA",
        city: "Lagos",
        state: "Lagos",
        country: "Nigeria",
        phone: "+2348076543210",
      },
      trackingNumber: "TRK-2024-003",
      timeline: [
        {
          status: "Order Placed",
          date: "2024-01-15T14:20:00Z",
          description: "Order has been placed successfully",
        },
        {
          status: "Payment Confirmed",
          date: "2024-01-15T15:00:00Z",
          description: "Payment has been confirmed",
        },
        {
          status: "Processing",
          date: "2024-01-16T09:00:00Z",
          description: "Service work has begun",
        },
        {
          status: "Delivered",
          date: "2024-01-25T16:30:00Z",
          description: "Service has been completed",
        },
      ],
    },
    {
      id: "ORD-004",
      customerName: "Tunde Mohammed",
      customerEmail: "tunde.mohammed@email.com",
      customerPhone: "+2348065432109",
      items: [
        {
          id: "5",
          name: "Sony WH-1000XM5",
          price: 180000,
          quantity: 1,
          type: "product",
        },
      ],
      total: 180000,
      status: "delivered",
      paymentStatus: "paid",
      orderDate: "2024-01-12T11:45:00Z",
      estimatedDelivery: "2024-01-17",
      shippingAddress: {
        address: "321 Surulere",
        city: "Lagos",
        state: "Lagos",
        country: "Nigeria",
        phone: "+2348065432109",
      },
      trackingNumber: "TRK-2024-004",
      timeline: [
        {
          status: "Order Placed",
          date: "2024-01-12T11:45:00Z",
          description: "Order has been placed successfully",
        },
        {
          status: "Payment Confirmed",
          date: "2024-01-12T12:15:00Z",
          description: "Payment has been confirmed",
        },
        {
          status: "Processing",
          date: "2024-01-12T15:30:00Z",
          description: "Order is being processed",
        },
        {
          status: "Shipped",
          date: "2024-01-13T09:20:00Z",
          description: "Order has been shipped",
        },
        {
          status: "Delivered",
          date: "2024-01-16T14:45:00Z",
          description: "Order has been delivered",
        },
      ],
    },
    {
      id: "ORD-005",
      customerName: "Folake Williams",
      customerEmail: "folake.williams@email.com",
      customerPhone: "+2348054321098",
      items: [
        {
          id: "2",
          name: "Mobile App Development",
          price: 400000,
          quantity: 1,
          type: "service",
        },
        {
          id: "4",
          name: "Digital Marketing",
          price: 120000,
          quantity: 1,
          type: "service",
        },
      ],
      total: 520000,
      status: "processing",
      paymentStatus: "paid",
      orderDate: "2024-01-10T16:30:00Z",
      estimatedDelivery: "2024-02-10",
      shippingAddress: {
        address: "654 Victoria Island",
        city: "Lagos",
        state: "Lagos",
        country: "Nigeria",
        phone: "+2348054321098",
      },
      trackingNumber: "TRK-2024-005",
      timeline: [
        {
          status: "Order Placed",
          date: "2024-01-10T16:30:00Z",
          description: "Order has been placed successfully",
        },
        {
          status: "Payment Confirmed",
          date: "2024-01-10T17:00:00Z",
          description: "Payment has been confirmed",
        },
        {
          status: "Processing",
          date: "2024-01-11T10:00:00Z",
          description: "Service work has begun",
        },
      ],
    },
    {
      id: "ORD-006",
      customerName: "Emeka Okonkwo",
      customerEmail: "emeka.okonkwo@email.com",
      customerPhone: "+2348043210987",
      items: [
        {
          id: "3",
          name: "MacBook Air M3",
          price: 1850000,
          quantity: 1,
          type: "product",
        },
      ],
      total: 1850000,
      status: "cancelled",
      paymentStatus: "failed",
      orderDate: "2024-01-08T13:15:00Z",
      estimatedDelivery: "2024-01-13",
      shippingAddress: {
        address: "987 Lekki Phase 2",
        city: "Lagos",
        state: "Lagos",
        country: "Nigeria",
        phone: "+2348043210987",
      },
      trackingNumber: "TRK-2024-006",
      timeline: [
        {
          status: "Order Placed",
          date: "2024-01-08T13:15:00Z",
          description: "Order has been placed successfully",
        },
        {
          status: "Payment Confirmed",
          date: "2024-01-08T13:45:00Z",
          description: "Payment has been confirmed",
        },
        {
          status: "Cancelled",
          date: "2024-01-09T10:30:00Z",
          description: "Order has been cancelled by customer",
        },
        {
          status: "Refunded",
          date: "2024-01-09T11:00:00Z",
          description: "Payment has been refunded",
        },
      ],
    },
  ],

  // Analytics dummy data
  analytics: {
    overview: {
      totalRevenue: 4850000,
      totalOrders: 6,
      totalProducts: 5,
      totalServices: 5,
      averageOrderValue: 808333,
      conversionRate: 12.5,
      customerSatisfaction: 4.8,
    },
    revenue: {
      daily: [
        { date: "2024-01-15", revenue: 250000 },
        { date: "2024-01-16", revenue: 180000 },
        { date: "2024-01-17", revenue: 0 },
        { date: "2024-01-18", revenue: 1070000 },
        { date: "2024-01-19", revenue: 0 },
        { date: "2024-01-20", revenue: 1250000 },
        { date: "2024-01-21", revenue: 0 },
      ],
      weekly: [
        { week: "Week 1", revenue: 1850000 },
        { week: "Week 2", revenue: 3000000 },
      ],
      monthly: [{ month: "January", revenue: 4850000 }],
    },
    topProducts: [
      { name: "iPhone 15 Pro Max", sales: 2, revenue: 2500000 },
      { name: "Samsung Galaxy S24 Ultra", sales: 1, revenue: 980000 },
      { name: "MacBook Air M3", sales: 1, revenue: 1850000 },
      { name: "Sony WH-1000XM5", sales: 1, revenue: 180000 },
      { name: "Nike Air Max 270", sales: 2, revenue: 90000 },
    ],
    topServices: [
      { name: "Web Development", sales: 1, revenue: 250000 },
      { name: "Mobile App Development", sales: 1, revenue: 400000 },
      { name: "Digital Marketing", sales: 1, revenue: 120000 },
      { name: "Graphic Design", sales: 0, revenue: 0 },
      { name: "Content Writing", sales: 0, revenue: 0 },
    ],
    orderStatus: {
      pending: 1,
      processing: 0,
      shipped: 1,
      delivered: 1,
      cancelled: 1,
      in_progress: 1,
      completed: 1,
    },
  },
};

