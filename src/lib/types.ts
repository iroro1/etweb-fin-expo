export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          first_name: string | null;
          last_name: string | null;
          phone: string | null;
          avatar_url: string | null;
          user_type: "customer" | "seller" | "service_provider" | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          first_name?: string | null;
          last_name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          user_type?: "customer" | "seller" | "service_provider" | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          first_name?: string | null;
          last_name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          user_type?: "customer" | "seller" | "service_provider" | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          seller_id: string;
          name: string;
          description: string;
          price: number;
          original_price: number | null;
          category: string;
          subcategory: string | null;
          images: string[];
          stock: number;
          sku: string;
          brand: string | null;
          warranty: string | null;
          delivery_options: string[];
          features: string[];
          tags: string[];
          is_on_sale: boolean;
          sale_percentage: number | null;
          discount_type: string | null;
          sale_start_date: string | null;
          sale_end_date: string | null;
          is_featured: boolean;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          seller_id: string;
          name: string;
          description: string;
          price: number;
          original_price?: number | null;
          category: string;
          subcategory?: string | null;
          images: string[];
          stock: number;
          sku: string;
          brand?: string | null;
          warranty?: string | null;
          delivery_options: string[];
          features: string[];
          tags: string[];
          is_on_sale?: boolean;
          sale_percentage?: number | null;
          discount_type?: string | null;
          sale_start_date?: string | null;
          sale_end_date?: string | null;
          is_featured?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          seller_id?: string;
          name?: string;
          description?: string;
          price?: number;
          original_price?: number | null;
          category?: string;
          subcategory?: string | null;
          images?: string[];
          stock?: number;
          sku?: string;
          brand?: string | null;
          warranty?: string | null;
          delivery_options?: string[];
          features?: string[];
          tags?: string[];
          is_on_sale?: boolean;
          sale_percentage?: number | null;
          discount_type?: string | null;
          sale_start_date?: string | null;
          sale_end_date?: string | null;
          is_featured?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          provider_id: string;
          title: string;
          description: string;
          price: number;
          duration: string;
          category: string;
          location: string;
          max_bookings: number;
          images: string[];
          tags: string[];
          requirements: string[];
          is_available: boolean;
          packages: unknown[];
          features: string[];
          provider_info: unknown;
          booking_slots: unknown;
          policies: unknown;
          additional_services: unknown[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          provider_id: string;
          title: string;
          description: string;
          price: number;
          duration: string;
          category: string;
          location: string;
          max_bookings: number;
          images: string[];
          tags: string[];
          requirements: string[];
          is_available?: boolean;
          packages?: unknown[];
          features?: string[];
          provider_info?: unknown;
          booking_slots?: unknown;
          policies?: unknown;
          additional_services?: unknown[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          provider_id?: string;
          title?: string;
          description?: string;
          price?: number;
          duration?: string;
          category?: string;
          location?: string;
          max_bookings?: number;
          images?: string[];
          tags?: string[];
          requirements?: string[];
          is_available?: boolean;
          packages?: unknown[];
          features?: string[];
          provider_info?: unknown;
          booking_slots?: unknown;
          policies?: unknown;
          additional_services?: unknown[];
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          customer_id: string;
          seller_id: string;
          status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
          total_amount: number;
          shipping_fee: number;
          payment_status: "pending" | "paid" | "failed" | "refunded";
          payment_method: string;
          shipping_address: unknown;
          items: unknown[];
          timeline: unknown[];
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_id: string;
          seller_id: string;
          status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
          total_amount: number;
          shipping_fee: number;
          payment_status?: "pending" | "paid" | "failed" | "refunded";
          payment_method: string;
          shipping_address: unknown;
          items: unknown[];
          timeline?: unknown[];
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          customer_id?: string;
          seller_id?: string;
          status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
          total_amount?: number;
          shipping_fee?: number;
          payment_status?: "pending" | "paid" | "failed" | "refunded";
          payment_method?: string;
          shipping_address?: unknown;
          items?: unknown[];
          timeline?: unknown[];
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      addresses: {
        Row: {
          id: string;
          user_id: string;
          type: "home" | "work" | "other";
          name: string;
          address: string;
          city: string;
          state: string;
          phone: string | null;
          is_default: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: "home" | "work" | "other";
          name: string;
          address: string;
          city: string;
          state: string;
          phone?: string | null;
          is_default?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: "home" | "work" | "other";
          name?: string;
          address?: string;
          city?: string;
          state?: string;
          phone?: string | null;
          is_default?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      wishlist: {
        Row: {
          id: string;
          user_id: string;
          product_id: string | null;
          service_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id?: string | null;
          service_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_id?: string | null;
          service_id?: string | null;
          created_at?: string;
        };
      };
      cart: {
        Row: {
          id: string;
          user_id: string;
          product_id: string | null;
          service_id: string | null;
          quantity: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id?: string | null;
          service_id?: string | null;
          quantity: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_id?: string | null;
          service_id?: string | null;
          quantity?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}


