export type UserRole = 'admin' | 'dispatcher' | 'technician' | 'customer';

export type ClientType = 'residential' | 'commercial';

export type JobPriority = 'standard' | 'urgent' | 'emergency';

export type BookingStatus = 
  | 'pending'
  | 'confirmed'
  | 'dispatched'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface Booking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  clientType: ClientType;
  serviceCategory: string;
  priority: JobPriority;
  preferredDate: string;
  timeSlot: string;
  description: string;
  estimatedPrice: number;
  finalPrice?: number;
  status: BookingStatus;
  assignedTechnicianId?: string;
  assignedTechnicianName?: string;
  createdAt: string;
  updatedAt: string;
  technicianNotes?: string;
  partsUsed?: string[];
  isEmergency?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'both';
  basePrice: number;
  pricingType: 'fixed' | 'hourly' | 'from';
  estimatedDuration: string;
  description: string;
  features: string[];
  popular?: boolean;
  emergencyAvailable: boolean;
  iconName: string;
}

export interface Technician {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  rating: number;
  completedJobs: number;
  status: 'available' | 'on_job' | 'off_duty';
  vehicleNumber: string;
  currentLocation?: string;
}

export interface CustomerTestimonial {
  id: string;
  name: string;
  role: string;
  clientType: ClientType;
  rating: number;
  comment: string;
  date: string;
  serviceUsed: string;
  verified: boolean;
  location: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  category: 'maintenance' | 'emergency' | 'energy_saving' | 'commercial';
  readTime: string;
  author: string;
  date: string;
  tags: string[];
  featured?: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  role: UserRole;
  action: string;
  details: string;
  targetId?: string;
  status: 'success' | 'warning' | 'error';
  ip: string;
}

export interface AutomatedEmailLog {
  id: string;
  recipientEmail: string;
  recipientName: string;
  subject: string;
  templateType: 'booking_confirmation' | 'technician_dispatched' | 'job_completed' | 'emergency_alert';
  previewText: string;
  bodyHtml: string;
  timestamp: string;
  status: 'delivered' | 'queued' | 'simulated';
}

export interface NotificationSettings {
  emailCustomerConfirmation: boolean;
  emailTechnicianDispatch: boolean;
  emailEmergencyAlerts: boolean;
  smsAlertsEnabled: boolean;
  emergencySlaMinutes: number;
  dailyRevenueTarget: number;
  soundAlerts: boolean;
}

export interface DatabaseBackup {
  id: string;
  timestamp: string;
  version: string;
  recordCount: number;
  sizeKb: number;
  checksum: string;
  data: {
    bookings: Booking[];
    technicians: Technician[];
    auditLogs: AuditLog[];
    emailLogs: AutomatedEmailLog[];
    notificationSettings: NotificationSettings;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
  permissions: {
    canDispatch: boolean;
    canExportReports: boolean;
    canManageBackups: boolean;
    canManageUsers: boolean;
    canEditPricing: boolean;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  text: string;
  timestamp: string;
  quickAction?: {
    label: string;
    actionType: 'open_booking' | 'emergency_call';
    prefillData?: Partial<Booking>;
  };
}
