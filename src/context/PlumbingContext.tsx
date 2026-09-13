import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { 
  Booking, 
  ServiceItem, 
  Technician, 
  CustomerTestimonial, 
  BlogPost, 
  UserProfile, 
  UserRole, 
  AuditLog, 
  AutomatedEmailLog, 
  NotificationSettings, 
  DatabaseBackup,
  ChatMessage 
} from '../types';
import { 
  INITIAL_SERVICES, 
  INITIAL_TECHNICIANS, 
  INITIAL_BOOKINGS, 
  INITIAL_TESTIMONIALS, 
  INITIAL_BLOG_POSTS, 
  INITIAL_USERS, 
  INITIAL_AUDIT_LOGS, 
  INITIAL_EMAIL_LOGS, 
  INITIAL_NOTIFICATION_SETTINGS 
} from '../data/mockData';

interface PlumbingContextType {
  // Theme
  isDark: boolean;
  toggleTheme: () => void;
  
  // Offline & Sync
  isOnline: boolean;
  isOfflineSimulated: boolean;
  toggleSimulateOffline: () => void;
  pendingSyncCount: number;
  lastSyncedAt: string;
  forceSyncOfflineQueue: () => void;
  
  // Auth & RBAC
  currentUser: UserProfile;
  currentRole: UserRole;
  switchRole: (role: UserRole) => void;
  allUsers: UserProfile[];
  updateUserPermissions: (userId: string, permissions: UserProfile['permissions']) => void;

  // Services & Blog
  services: ServiceItem[];
  testimonials: CustomerTestimonial[];
  blogPosts: BlogPost[];
  technicians: Technician[];

  // Bookings & Emergency
  bookings: Booking[];
  createBooking: (bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => Promise<Booking>;
  createEmergencyCallout: (emergencyData: {
    customerName: string;
    phone: string;
    address: string;
    city: string;
    issueType: string;
    description: string;
    clientType: 'residential' | 'commercial';
  }) => Promise<Booking>;
  updateBookingStatus: (id: string, status: Booking['status'], notes?: string, parts?: string[]) => void;
  assignTechnicianToBooking: (bookingId: string, technicianId: string) => void;

  // Logs & Notifications
  auditLogs: AuditLog[];
  emailLogs: AutomatedEmailLog[];
  notificationSettings: NotificationSettings;
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => void;
  addAuditLog: (action: string, details: string, targetId?: string, status?: 'success' | 'warning' | 'error') => void;

  // Backups
  backups: DatabaseBackup[];
  createDatabaseBackup: () => DatabaseBackup;
  restoreFromBackup: (backupData: DatabaseBackup) => boolean;
  downloadBackupJson: () => void;
  resetToFactoryDefaults: () => void;

  // Active UI states
  isBookingModalOpen: boolean;
  openBookingModal: (prefillService?: string, isEmergency?: boolean) => void;
  closeBookingModal: () => void;
  selectedServiceForBooking: string | null;
  
  isEmergencyModalOpen: boolean;
  openEmergencyModal: () => void;
  closeEmergencyModal: () => void;

  // Live Chat
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => void;
  isChatOpen: boolean;
  toggleChat: () => void;
  setIsChatOpen: (open: boolean) => void;
  unreadChatCount: number;
}

const STORAGE_KEYS = {
  THEME: 'aquapro_theme_v1',
  BOOKINGS: 'aquapro_bookings_v1',
  SERVICES: 'aquapro_services_v1',
  TECHNICIANS: 'aquapro_technicians_v1',
  USERS: 'aquapro_users_v1',
  AUDIT_LOGS: 'aquapro_audit_logs_v1',
  EMAIL_LOGS: 'aquapro_email_logs_v1',
  NOTIFICATION_SETTINGS: 'aquapro_settings_v1',
  BACKUPS: 'aquapro_backups_v1',
  OFFLINE_QUEUE: 'aquapro_offline_queue_v1',
  CHAT_MESSAGES: 'aquapro_chat_v1',
  ROLE: 'aquapro_current_role_v1'
};

const PlumbingContext = createContext<PlumbingContextType | undefined>(undefined);

export const PlumbingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      if (saved !== null) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Offline detection & simulated toggle
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isOfflineSimulated, setIsOfflineSimulated] = useState<boolean>(false);
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(0);
  const [lastSyncedAt, setLastSyncedAt] = useState<string>(() => new Date().toLocaleTimeString());

  // App data states with offline caching
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return cached ? JSON.parse(cached) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [technicians, setTechnicians] = useState<Technician[]>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEYS.TECHNICIANS);
      return cached ? JSON.parse(cached) : INITIAL_TECHNICIANS;
    } catch {
      return INITIAL_TECHNICIANS;
    }
  });

  const [allUsers, setAllUsers] = useState<UserProfile[]>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEYS.USERS);
      return cached ? JSON.parse(cached) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEYS.ROLE);
      return (cached as UserRole) || 'customer';
    } catch {
      return 'customer';
    }
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
      return cached ? JSON.parse(cached) : INITIAL_AUDIT_LOGS;
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  });

  const [emailLogs, setEmailLogs] = useState<AutomatedEmailLog[]>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEYS.EMAIL_LOGS);
      return cached ? JSON.parse(cached) : INITIAL_EMAIL_LOGS;
    } catch {
      return INITIAL_EMAIL_LOGS;
    }
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEYS.NOTIFICATION_SETTINGS);
      return cached ? JSON.parse(cached) : INITIAL_NOTIFICATION_SETTINGS;
    } catch {
      return INITIAL_NOTIFICATION_SETTINGS;
    }
  });

  const [backups, setBackups] = useState<DatabaseBackup[]>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEYS.BACKUPS);
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });

  // Modals & Chat
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string | null>(null);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [unreadChatCount, setUnreadChatCount] = useState(1);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEYS.CHAT_MESSAGES);
      if (cached) return JSON.parse(cached);
    } catch {
      // fallback
    }
    return [
      {
        id: 'msg-1',
        sender: 'agent',
        text: '👋 Welcome to AquaPro Plumbing 24/7! How can we assist you today? If you have an urgent burst pipe or water leak, please let us know immediately.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickAction: {
          label: '🚨 Report Burst Pipe / Leak',
          actionType: 'emergency_call'
        }
      }
    ];
  });

  // Current user derived from currentRole
  const currentUser: UserProfile = allUsers.find(u => u.role === currentRole) || allUsers[0];

  // Dark mode effect
  useEffect(() => {
    try {
      if (isDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem(STORAGE_KEYS.THEME, 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem(STORAGE_KEYS.THEME, 'light');
      }
    } catch (e) {
      console.error(e);
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  // Online / Offline listener
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleSimulateOffline = () => {
    setIsOfflineSimulated(prev => !prev);
  };

  const effectiveOnline = isOnline && !isOfflineSimulated;

  // Persist storage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    } catch (e) {
      console.error('Offline caching error (bookings)', e);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(auditLogs));
    } catch (e) {
      console.error(e);
    }
  }, [auditLogs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EMAIL_LOGS, JSON.stringify(emailLogs));
    } catch (e) {
      console.error(e);
    }
  }, [emailLogs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BACKUPS, JSON.stringify(backups));
    } catch (e) {
      console.error(e);
    }
  }, [backups]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATION_SETTINGS, JSON.stringify(notificationSettings));
    } catch (e) {
      console.error(e);
    }
  }, [notificationSettings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CHAT_MESSAGES, JSON.stringify(chatMessages));
    } catch (e) {
      console.error(e);
    }
  }, [chatMessages]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ROLE, currentRole);
    } catch (e) {
      console.error(e);
    }
  }, [currentRole]);

  // Audit Logging helper
  const addAuditLog = useCallback((
    action: string, 
    details: string, 
    targetId?: string, 
    status: 'success' | 'warning' | 'error' = 'success'
  ) => {
    const newLog: AuditLog = {
      id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      actor: currentUser.name,
      role: currentRole,
      action,
      details,
      targetId,
      status,
      ip: '127.0.0.1 (AI Sandbox)'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  }, [currentUser.name, currentRole]);

  // Send Automated Email notification helper
  const triggerAutomatedEmail = useCallback((
    recipientEmail: string,
    recipientName: string,
    templateType: AutomatedEmailLog['templateType'],
    subject: string,
    previewText: string,
    bodyHtml: string
  ) => {
    const newEmail: AutomatedEmailLog = {
      id: `em-${Date.now()}`,
      recipientEmail,
      recipientName,
      subject,
      templateType,
      previewText,
      bodyHtml,
      timestamp: new Date().toISOString(),
      status: 'delivered'
    };
    setEmailLogs(prev => [newEmail, ...prev]);
    addAuditLog('AUTOMATED_EMAIL_SENT', `Automated notification sent to ${recipientName} (${recipientEmail}) for ${subject}`, newEmail.id, 'success');
  }, [addAuditLog]);

  // Switch Role
  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    addAuditLog('USER_ROLE_SWITCHED', `Active session transitioned to role: ${role.toUpperCase()}`, undefined, 'success');
  };

  // Update permissions
  const updateUserPermissions = (userId: string, permissions: UserProfile['permissions']) => {
    setAllUsers(prev => prev.map(user => {
      if (user.id === userId) {
        return { ...user, permissions };
      }
      return user;
    }));
    addAuditLog('PERMISSIONS_UPDATED', `Administrative privileges modified for user ${userId}`, userId, 'warning');
  };

  // Create standard appointment booking
  const createBooking = async (
    bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt' | 'status'>
  ): Promise<Booking> => {
    const newId = `PL-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();
    
    const newBooking: Booking = {
      ...bookingData,
      id: newId,
      createdAt: now,
      updatedAt: now,
      status: 'confirmed'
    };

    setBookings(prev => [newBooking, ...prev]);

    // Offline queue check
    if (!effectiveOnline) {
      setPendingSyncCount(c => c + 1);
    }

    addAuditLog('BOOKING_CREATED', `New appointment ${newId} created for ${newBooking.customerName} (${newBooking.serviceCategory})`, newId, 'success');

    // Trigger automated email confirmation
    if (notificationSettings.emailCustomerConfirmation) {
      triggerAutomatedEmail(
        newBooking.email,
        newBooking.customerName,
        'booking_confirmation',
        `Appointment Confirmed: AquaPro Plumbing Ticket #${newId}`,
        `Your booking for ${newBooking.serviceCategory} is scheduled for ${newBooking.preferredDate} (${newBooking.timeSlot}).`,
        `<div style="font-family: sans-serif; padding: 20px; line-height: 1.6;">
          <h2 style="color: #0284c7;">AquaPro Plumbing & Emergency Services</h2>
          <p>Dear <strong>${newBooking.customerName}</strong>,</p>
          <p>Your appointment has been successfully confirmed. A licensed plumbing specialist has been assigned to your request.</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
          <p><strong>Booking ID:</strong> ${newId}</p>
          <p><strong>Service:</strong> ${newBooking.serviceCategory}</p>
          <p><strong>Schedule:</strong> ${newBooking.preferredDate} (${newBooking.timeSlot})</p>
          <p><strong>Service Location:</strong> ${newBooking.address}, ${newBooking.city}</p>
          <p><strong>Estimated Initial Fee:</strong> $${newBooking.estimatedPrice}</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
          <p style="font-size: 13px; color: #64748b;">Need to reschedule or speak with dispatch? Call our 24/7 hotline at (800) 555-AQUA.</p>
        </div>`
      );
    }

    return newBooking;
  };

  // Create urgent emergency callout
  const createEmergencyCallout = async (emergencyData: {
    customerName: string;
    phone: string;
    address: string;
    city: string;
    issueType: string;
    description: string;
    clientType: 'residential' | 'commercial';
  }): Promise<Booking> => {
    const newId = `EMG-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();

    // Auto-assign available emergency tech
    const availableTech = technicians.find(t => t.status === 'available') || technicians[0];

    const newBooking: Booking = {
      id: newId,
      customerName: emergencyData.customerName,
      email: 'emergency-dispatch@aquaproplumbing.com',
      phone: emergencyData.phone,
      address: emergencyData.address,
      city: emergencyData.city,
      clientType: emergencyData.clientType,
      serviceCategory: `Emergency: ${emergencyData.issueType}`,
      priority: 'emergency',
      preferredDate: new Date().toISOString().split('T')[0],
      timeSlot: 'Immediate Dispatch (<30m)',
      description: emergencyData.description,
      estimatedPrice: emergencyData.clientType === 'commercial' ? 350 : 220,
      status: 'dispatched',
      assignedTechnicianId: availableTech.id,
      assignedTechnicianName: availableTech.name,
      createdAt: now,
      updatedAt: now,
      isEmergency: true,
      technicianNotes: `Priority emergency dispatched. Van ${availableTech.vehicleNumber} en route.`
    };

    setBookings(prev => [newBooking, ...prev]);

    if (!effectiveOnline) {
      setPendingSyncCount(c => c + 1);
    }

    addAuditLog('EMERGENCY_DISPATCHED', `EMERGENCY ALERT: ${emergencyData.issueType} at ${emergencyData.address}. Assigned to ${availableTech.name}`, newId, 'warning');

    // Trigger alert email
    if (notificationSettings.emailEmergencyAlerts) {
      triggerAutomatedEmail(
        'emergency-team@aquaproplumbing.com',
        'Emergency Dispatch Central',
        'emergency_alert',
        `🚨 EMERGENCY DISPATCH TICKET: #${newId} - ${emergencyData.issueType}`,
        `Customer: ${emergencyData.customerName}, Phone: ${emergencyData.phone}. Assigned: ${availableTech.name}`,
        `<div style="font-family: sans-serif; padding: 20px; background: #fff1f2; border: 1px solid #fecdd3; border-radius: 8px;">
          <h2 style="color: #e11d48;">🚨 Emergency Plumbing Dispatch Alert</h2>
          <p><strong>Customer Name:</strong> ${emergencyData.customerName}</p>
          <p><strong>Phone:</strong> ${emergencyData.phone}</p>
          <p><strong>Location:</strong> ${emergencyData.address}, ${emergencyData.city}</p>
          <p><strong>Issue Reported:</strong> ${emergencyData.issueType}</p>
          <p><strong>Details:</strong> ${emergencyData.description}</p>
          <p><strong>Dispatched Specialist:</strong> ${availableTech.name} (${availableTech.vehicleNumber})</p>
        </div>`
      );
    }

    return newBooking;
  };

  // Update booking status
  const updateBookingStatus = (
    id: string, 
    status: Booking['status'], 
    notes?: string, 
    parts?: string[]
  ) => {
    let targetBooking: Booking | undefined;

    setBookings(prev => prev.map(b => {
      if (b.id === id) {
        targetBooking = {
          ...b,
          status,
          updatedAt: new Date().toISOString(),
          ...(notes !== undefined ? { technicianNotes: notes } : {}),
          ...(parts !== undefined ? { partsUsed: parts } : {}),
          ...(status === 'completed' && !b.finalPrice ? { finalPrice: b.estimatedPrice } : {})
        };
        return targetBooking;
      }
      return b;
    }));

    addAuditLog('BOOKING_STATUS_CHANGED', `Booking #${id} status changed to ${status.toUpperCase()}`, id, 'success');

    if (targetBooking && status === 'completed' && targetBooking.email) {
      triggerAutomatedEmail(
        targetBooking.email,
        targetBooking.customerName,
        'job_completed',
        `Job Completed & Warranty Activated: AquaPro #${id}`,
        `Your plumbing service has been completed by ${targetBooking.assignedTechnicianName || 'our team'}.`,
        `<div style="font-family: sans-serif; padding: 20px;">
          <h2 style="color: #059669;">Service Completed Successfully</h2>
          <p>Dear ${targetBooking.customerName},</p>
          <p>Your service ticket <strong>#${id}</strong> has been marked completed by technician ${targetBooking.assignedTechnicianName || 'Master Plumber'}.</p>
          <p>Your work includes our 100% Satisfaction Guarantee and official 1-Year Workmanship Warranty.</p>
        </div>`
      );
    }
  };

  // Assign technician
  const assignTechnicianToBooking = (bookingId: string, technicianId: string) => {
    const tech = technicians.find(t => t.id === technicianId);
    if (!tech) return;

    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          assignedTechnicianId: tech.id,
          assignedTechnicianName: tech.name,
          status: b.status === 'pending' ? 'confirmed' : b.status,
          updatedAt: new Date().toISOString()
        };
      }
      return b;
    }));

    addAuditLog('TECHNICIAN_ASSIGNED', `Assigned ${tech.name} to ticket #${bookingId}`, bookingId, 'success');

    if (notificationSettings.emailTechnicianDispatch) {
      triggerAutomatedEmail(
        tech.email,
        tech.name,
        'technician_dispatched',
        `New Job Assignment: #${bookingId}`,
        `You have been assigned to service ticket #${bookingId}.`,
        `<p>Hello ${tech.name},</p><p>You have been dispatched to service ticket #${bookingId}. Check your technician portal for location and diagnostic notes.</p>`
      );
    }
  };

  // Force sync offline queue
  const forceSyncOfflineQueue = () => {
    setPendingSyncCount(0);
    setLastSyncedAt(new Date().toLocaleTimeString());
    addAuditLog('OFFLINE_QUEUE_SYNCED', 'Offline cached state synchronized with cloud records', undefined, 'success');
  };

  // Update notification settings
  const updateNotificationSettings = (settings: Partial<NotificationSettings>) => {
    setNotificationSettings(prev => ({ ...prev, ...settings }));
    addAuditLog('NOTIFICATION_SETTINGS_UPDATED', 'Updated automated alert thresholds and dispatch notification rules', undefined, 'success');
  };

  // Database Backup and Restore
  const createDatabaseBackup = (): DatabaseBackup => {
    const dataSnapshot = {
      bookings,
      technicians,
      auditLogs,
      emailLogs,
      notificationSettings
    };

    const jsonString = JSON.stringify(dataSnapshot);
    const sizeKb = Math.round((jsonString.length / 1024) * 10) / 10;
    const checksum = `SHA256-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    const newBackup: DatabaseBackup = {
      id: `BCK-${Date.now()}`,
      timestamp: new Date().toISOString(),
      version: '2.4.0',
      recordCount: bookings.length + technicians.length + auditLogs.length,
      sizeKb,
      checksum,
      data: dataSnapshot
    };

    setBackups(prev => [newBackup, ...prev]);
    addAuditLog('DATABASE_BACKUP_CREATED', `Database snapshot ${newBackup.id} created (${sizeKb} KB, ${newBackup.recordCount} records)`, newBackup.id, 'success');
    return newBackup;
  };

  const downloadBackupJson = () => {
    const backup = createDatabaseBackup();
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aquapro_database_backup_${new Date().toISOString().split('T')[0]}_${backup.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const restoreFromBackup = (backup: DatabaseBackup): boolean => {
    if (!backup?.data?.bookings || !backup?.data?.technicians) {
      addAuditLog('BACKUP_RESTORE_FAILED', 'Invalid backup payload structure', backup?.id, 'error');
      return false;
    }

    setBookings(backup.data.bookings);
    setTechnicians(backup.data.technicians);
    if (backup.data.auditLogs) setAuditLogs(backup.data.auditLogs);
    if (backup.data.emailLogs) setEmailLogs(backup.data.emailLogs);
    if (backup.data.notificationSettings) setNotificationSettings(backup.data.notificationSettings);

    addAuditLog('BACKUP_RESTORED', `Database restored from snapshot ${backup.id} dated ${backup.timestamp}`, backup.id, 'warning');
    return true;
  };

  const resetToFactoryDefaults = () => {
    setBookings(INITIAL_BOOKINGS);
    setTechnicians(INITIAL_TECHNICIANS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setEmailLogs(INITIAL_EMAIL_LOGS);
    setNotificationSettings(INITIAL_NOTIFICATION_SETTINGS);
    setBackups([]);
    addAuditLog('DATABASE_RESET', 'System database reset to initial demonstration seed data', undefined, 'warning');
  };

  // Modal handlers
  const openBookingModal = (prefillService?: string) => {
    setSelectedServiceForBooking(prefillService || null);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedServiceForBooking(null);
  };

  const openEmergencyModal = () => {
    setIsEmergencyModalOpen(true);
  };

  const closeEmergencyModal = () => {
    setIsEmergencyModalOpen(false);
  };

  // Live Chat bot interaction
  const toggleChat = () => {
    setIsChatOpen(prev => {
      if (!prev) setUnreadChatCount(0);
      return !prev;
    });
  };

  const sendChatMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);

    // Intelligent triage bot response
    setTimeout(() => {
      const lower = text.toLowerCase();
      let botReply = "Thank you for reaching out to AquaPro Plumbing! Our master plumbers are on standby. How else can we help you today?";
      let quickAction: ChatMessage['quickAction'] = undefined;

      if (lower.includes('leak') || lower.includes('burst') || lower.includes('flood') || lower.includes('overflow') || lower.includes('urgent')) {
        botReply = "⚠️ CRITICAL WATER ALERT: If you have active flooding or a ruptured line, please immediately turn off your main shutoff valve (usually located in your basement or beside the water meter). We can dispatch an emergency technician right now!";
        quickAction = {
          label: '🚨 Instant Emergency Dispatch',
          actionType: 'emergency_call'
        };
      } else if (lower.includes('heater') || lower.includes('hot water') || lower.includes('cold water')) {
        botReply = "For water heater issues (cold water, leaks, or pilot lights going out), our diagnostic visit starts at $95 (waived with repair). Would you like to schedule an appointment?";
        quickAction = {
          label: '📅 Schedule Water Heater Check',
          actionType: 'open_booking',
          prefillData: { serviceCategory: 'Water Heater Installation & Repair' }
        };
      } else if (lower.includes('clog') || lower.includes('drain') || lower.includes('sink') || lower.includes('toilet')) {
        botReply = "We provide both conventional auger cabling and 4,000 PSI hydro-jetting with free sewer camera inspection included on all whole-house drain clearings!";
        quickAction = {
          label: '📅 Book Drain Cleaning',
          actionType: 'open_booking',
          prefillData: { serviceCategory: 'Hydro-Jetting & Severe Drain Cleaning' }
        };
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('quote') || lower.includes('rate')) {
        botReply = "We believe in 100% upfront flat-rate pricing with zero hidden fees. Drain cleaning starts at $195, pipe repairs from $180, and water heater diagnostic is $95. All repairs include our 1-year warranty.";
        quickAction = {
          label: '📅 Book Service Online',
          actionType: 'open_booking'
        };
      } else if (lower.includes('commercial') || lower.includes('restaurant') || lower.includes('grease') || lower.includes('backflow')) {
        botReply = "We provide certified commercial services including mandatory annual backflow testing, high-capacity grease interceptor pumping, and code-compliance reports for facilities.";
        quickAction = {
          label: '🏢 Schedule Commercial Service',
          actionType: 'open_booking',
          prefillData: { clientType: 'commercial' }
        };
      }

      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'agent',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickAction
      };

      setChatMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <PlumbingContext.Provider value={{
      isDark,
      toggleTheme,
      isOnline,
      isOfflineSimulated,
      toggleSimulateOffline,
      pendingSyncCount,
      lastSyncedAt,
      forceSyncOfflineQueue,
      currentUser,
      currentRole,
      switchRole,
      allUsers,
      updateUserPermissions,
      services: INITIAL_SERVICES,
      testimonials: INITIAL_TESTIMONIALS,
      blogPosts: INITIAL_BLOG_POSTS,
      technicians,
      bookings,
      createBooking,
      createEmergencyCallout,
      updateBookingStatus,
      assignTechnicianToBooking,
      auditLogs,
      emailLogs,
      notificationSettings,
      updateNotificationSettings,
      addAuditLog,
      backups,
      createDatabaseBackup,
      restoreFromBackup,
      downloadBackupJson,
      resetToFactoryDefaults,
      isBookingModalOpen,
      openBookingModal,
      closeBookingModal,
      selectedServiceForBooking,
      isEmergencyModalOpen,
      openEmergencyModal,
      closeEmergencyModal,
      chatMessages,
      sendChatMessage,
      isChatOpen,
      toggleChat,
      setIsChatOpen,
      unreadChatCount
    }}>
      {children}
    </PlumbingContext.Provider>
  );
};

export const usePlumbing = () => {
  const context = useContext(PlumbingContext);
  if (!context) {
    throw new Error('usePlumbing must be used within a PlumbingProvider');
  }
  return context;
};
