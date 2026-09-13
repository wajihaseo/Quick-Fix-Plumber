import { 
  ServiceItem, 
  Technician, 
  Booking, 
  CustomerTestimonial, 
  BlogPost, 
  UserProfile, 
  AuditLog, 
  AutomatedEmailLog,
  NotificationSettings
} from '../types';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Emergency Pipe Leak & Burst Repair',
    category: 'both',
    basePrice: 180,
    pricingType: 'from',
    estimatedDuration: '1 - 2 hours',
    description: 'Rapid emergency shutoff, leak detection, and durable copper/PEX pipe repair to prevent structural water damage.',
    features: ['Instant 24/7 priority response', 'Digital acoustic leak detection', 'Full pipe pressure test', '1-year repair warranty'],
    popular: true,
    emergencyAvailable: true,
    iconName: 'AlertTriangle'
  },
  {
    id: 'srv-2',
    title: 'Hydro-Jetting & Severe Drain Cleaning',
    category: 'both',
    basePrice: 195,
    pricingType: 'from',
    estimatedDuration: '1 - 3 hours',
    description: 'High-pressure 4,000 PSI hydro-jetting to remove tough tree roots, heavy grease, and stubborn blockages.',
    features: ['High-definition sewer camera video', 'Complete grease & root scouring', 'Safe for all pipe materials', '90-day no-clog guarantee'],
    popular: true,
    emergencyAvailable: true,
    iconName: 'Droplets'
  },
  {
    id: 'srv-3',
    title: 'Water Heater Installation & Repair',
    category: 'residential',
    basePrice: 280,
    pricingType: 'from',
    estimatedDuration: '2 - 4 hours',
    description: 'Expert servicing and installation for tankless and traditional gas/electric water heaters for peak energy efficiency.',
    features: ['Tankless & standard tank repair', 'Thermostat & element replacement', 'Thermal expansion tank checks', 'Old unit haul-away included'],
    popular: true,
    emergencyAvailable: true,
    iconName: 'Flame'
  },
  {
    id: 'srv-4',
    title: 'Sewer Line Camera Inspection & Trenchless Relining',
    category: 'both',
    basePrice: 250,
    pricingType: 'fixed',
    estimatedDuration: '1.5 hours',
    description: 'Pinpoint underground pipeline fractures and root intrusions without digging up your pristine lawn or driveway.',
    features: ['4K color fiber-optic inspection', 'USB recording of entire line', 'Accurate depth & location tracking', 'Written municipal report'],
    popular: false,
    emergencyAvailable: false,
    iconName: 'Search'
  },
  {
    id: 'srv-5',
    title: 'Commercial Backflow Prevention & Certification',
    category: 'commercial',
    basePrice: 320,
    pricingType: 'from',
    estimatedDuration: '2 hours',
    description: 'Annual mandatory municipal backflow testing, certified paperwork filing, repair, and double-check valve installations.',
    features: ['Certified backflow testers', 'Official city compliance filing', 'Emergency valve rebuilding', 'Annual inspection scheduling'],
    popular: false,
    emergencyAvailable: true,
    iconName: 'ShieldCheck'
  },
  {
    id: 'srv-6',
    title: 'Commercial Grease Trap & Industrial Pumping',
    category: 'commercial',
    basePrice: 450,
    pricingType: 'from',
    estimatedDuration: '3 hours',
    description: 'Heavy-duty grease trap maintenance, interceptor pumping, and compliance hydro-scrubbing for restaurants and hospitality.',
    features: ['Full manifest disposal certification', 'Off-peak overnight servicing', 'Odor neutralization treatment', 'BOD compliance maintenance'],
    popular: false,
    emergencyAvailable: true,
    iconName: 'Building2'
  },
  {
    id: 'srv-7',
    title: 'Bathroom & Kitchen Fixture Upgrades',
    category: 'residential',
    basePrice: 140,
    pricingType: 'hourly',
    estimatedDuration: '1 - 2 hours',
    description: 'Modern low-flow toilets, luxury faucets, garbage disposals, and shower valve installations with precision alignment.',
    features: ['Certified Moen & Kohler installers', 'Water conservation optimization', 'Leak-proof pressure testing', 'Clean, mess-free service'],
    popular: false,
    emergencyAvailable: false,
    iconName: 'Wrench'
  },
  {
    id: 'srv-8',
    title: 'Whole-Home Water Filtration & Softeners',
    category: 'residential',
    basePrice: 550,
    pricingType: 'from',
    estimatedDuration: '3 - 5 hours',
    description: 'Multi-stage filtration and salt-free water softeners to protect copper pipes and deliver crystal-clean drinking water.',
    features: ['Removes 99% chlorine & heavy metals', 'Prevents scale buildup in appliances', 'Reverse osmosis under-sink units', 'Free home water hardness test'],
    popular: false,
    emergencyAvailable: false,
    iconName: 'Sparkles'
  }
];

export const INITIAL_TECHNICIANS: Technician[] = [
  {
    id: 'tech-1',
    name: 'Marcus Vance',
    email: 'marcus.v@aquaproplumbing.com',
    phone: '(555) 234-8901',
    specialty: 'Master Plumber & Gas Systems Specialist',
    rating: 4.96,
    completedJobs: 412,
    status: 'available',
    vehicleNumber: 'VAN-104',
    currentLocation: 'North Metro District'
  },
  {
    id: 'tech-2',
    name: 'Elena Rostova',
    email: 'elena.r@aquaproplumbing.com',
    phone: '(555) 345-6712',
    specialty: 'Commercial Backflow & Hydro-Jetting Lead',
    rating: 4.92,
    completedJobs: 338,
    status: 'on_job',
    vehicleNumber: 'VAN-208',
    currentLocation: 'Downtown Commercial Hub'
  },
  {
    id: 'tech-3',
    name: 'Darius Cole',
    email: 'darius.c@aquaproplumbing.com',
    phone: '(555) 456-7890',
    specialty: 'Emergency Water Leaks & Tankless Systems',
    rating: 4.98,
    completedJobs: 520,
    status: 'available',
    vehicleNumber: 'VAN-112',
    currentLocation: 'Westside Suburbs'
  },
  {
    id: 'tech-4',
    name: 'Leo Chen',
    email: 'leo.c@aquaproplumbing.com',
    phone: '(555) 567-8910',
    specialty: 'Sewer Video Diagnostics & Trenchless Pipe Lining',
    rating: 4.88,
    completedJobs: 284,
    status: 'off_duty',
    vehicleNumber: 'VAN-301',
    currentLocation: 'East Industrial Park'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'PL-9421',
    customerName: 'Robert Henderson',
    email: 'robert.h@gmail.com',
    phone: '(555) 612-9011',
    address: '742 Evergreen Terrace',
    city: 'Springfield Metro',
    clientType: 'residential',
    serviceCategory: 'Emergency Pipe Leak & Burst Repair',
    priority: 'emergency',
    preferredDate: '2026-09-13',
    timeSlot: 'Immediate Dispatch (<30m)',
    description: 'Basement main shutoff valve cracked and spraying water at high pressure. Main line isolated partially.',
    estimatedPrice: 320,
    status: 'in_progress',
    assignedTechnicianId: 'tech-3',
    assignedTechnicianName: 'Darius Cole',
    createdAt: '2026-09-13T03:30:00Z',
    updatedAt: '2026-09-13T03:45:00Z',
    isEmergency: true,
    technicianNotes: 'Arrived on scene, shut water supply at curb meter. Replacing failed brass gate valve with quarter-turn ball valve.',
    partsUsed: ['1-inch Brass Ball Valve', 'PEX crimp rings', 'Water containment pads']
  },
  {
    id: 'PL-9420',
    customerName: 'Bistro Bella Vista (Mgr. Tony)',
    email: 'operations@bellavistabistro.com',
    phone: '(555) 883-2004',
    address: '120 Ocean View Boulevard',
    city: 'Harbor District',
    clientType: 'commercial',
    serviceCategory: 'Commercial Grease Trap & Industrial Pumping',
    priority: 'urgent',
    preferredDate: '2026-09-13',
    timeSlot: 'Morning (08:00 AM - 11:00 AM)',
    description: 'Quarterly grease interceptor pumping required before health audit scheduled tomorrow morning.',
    estimatedPrice: 650,
    status: 'dispatched',
    assignedTechnicianId: 'tech-2',
    assignedTechnicianName: 'Elena Rostova',
    createdAt: '2026-09-12T18:15:00Z',
    updatedAt: '2026-09-13T02:10:00Z',
    isEmergency: false,
    technicianNotes: 'Dispatched with hydro-jet pumping unit. ETA 15 minutes.'
  },
  {
    id: 'PL-9419',
    customerName: 'Amanda Phillips',
    email: 'amanda.p@outlook.com',
    phone: '(555) 902-3341',
    address: '418 Pine Ridge Circle',
    city: 'Oakwood Hills',
    clientType: 'residential',
    serviceCategory: 'Water Heater Installation & Repair',
    priority: 'standard',
    preferredDate: '2026-09-14',
    timeSlot: 'Afternoon (12:00 PM - 03:00 PM)',
    description: '50-gallon Rheem tank producing lukewarm water. Suspected lower heating element failure.',
    estimatedPrice: 280,
    status: 'confirmed',
    assignedTechnicianId: 'tech-1',
    assignedTechnicianName: 'Marcus Vance',
    createdAt: '2026-09-12T14:20:00Z',
    updatedAt: '2026-09-12T15:00:00Z',
    isEmergency: false
  },
  {
    id: 'PL-9418',
    customerName: 'Crestview Medical Offices',
    email: 'facilities@crestviewhealth.org',
    phone: '(555) 741-5500',
    address: '890 Corporate Parkway, Suite 300',
    city: 'Downtown Commercial Hub',
    clientType: 'commercial',
    serviceCategory: 'Commercial Backflow Prevention & Certification',
    priority: 'standard',
    preferredDate: '2026-09-15',
    timeSlot: 'Morning (08:00 AM - 11:00 AM)',
    description: 'Annual mandatory test for three double-check detector assemblies on fire sprinkler and potable water mains.',
    estimatedPrice: 480,
    status: 'pending',
    createdAt: '2026-09-12T11:45:00Z',
    updatedAt: '2026-09-12T11:45:00Z',
    isEmergency: false
  },
  {
    id: 'PL-9417',
    customerName: 'Jonathan Davis',
    email: 'jdavis.contracting@gmail.com',
    phone: '(555) 334-1188',
    address: '55 Willow Creek Lane',
    city: 'Riverside',
    clientType: 'residential',
    serviceCategory: 'Hydro-Jetting & Severe Drain Cleaning',
    priority: 'urgent',
    preferredDate: '2026-09-11',
    timeSlot: 'Afternoon (12:00 PM - 03:00 PM)',
    description: 'Tree root blockage in 4-inch main sewer line backing up into downstairs laundry sink.',
    estimatedPrice: 380,
    finalPrice: 380,
    status: 'completed',
    assignedTechnicianId: 'tech-1',
    assignedTechnicianName: 'Marcus Vance',
    createdAt: '2026-09-11T09:00:00Z',
    updatedAt: '2026-09-11T16:30:00Z',
    isEmergency: false,
    technicianNotes: 'Used 1/2 inch hydro-jet head to blast root mass at 42-foot mark. Inspected with color camera. Flow fully restored.',
    partsUsed: ['Biodegradable root barrier additive', '4-inch Cleanout plug']
  }
];

export const INITIAL_TESTIMONIALS: CustomerTestimonial[] = [
  {
    id: 't-1',
    name: 'Sarah Jenkins',
    role: 'Homeowner',
    clientType: 'residential',
    rating: 5,
    comment: 'Our water line ruptured under the foundation at 11 PM on a Sunday. Darius arrived in 22 minutes, isolated the line with zero mess, and repiped it flawlessly. True lifesavers!',
    date: '3 days ago',
    serviceUsed: 'Emergency Pipe Leak & Burst Repair',
    verified: true,
    location: 'Westside Suburbs'
  },
  {
    id: 't-2',
    name: 'Michael Vance',
    role: 'General Manager, Grand Plaza Hotel',
    clientType: 'commercial',
    rating: 5,
    comment: 'Managing 120 guest rooms means plumbing failure is not an option. AquaPro handles our commercial boiler plant and annual backflow tests. Fast, compliant, and extraordinarily clean.',
    date: '1 week ago',
    serviceUsed: 'Commercial Backflow & Boiler Maintenance',
    verified: true,
    location: 'Downtown Commercial Hub'
  },
  {
    id: 't-3',
    name: 'Patricia Gomez',
    role: 'Residential Client',
    clientType: 'residential',
    rating: 5,
    comment: 'Transparent flat-rate pricing with no surprise upcharges. They diagnosed why our tankless heater was throwing error codes in 10 minutes. Will never use anyone else.',
    date: '2 weeks ago',
    serviceUsed: 'Water Heater Installation & Repair',
    verified: true,
    location: 'Oakwood Hills'
  },
  {
    id: 't-4',
    name: 'Greg Martinez',
    role: 'Facility Director, Logistics Park',
    clientType: 'commercial',
    rating: 5,
    comment: 'Their digital sewer video inspections and monthly reports make facility budget approvals a breeze. Always professional, punctual, and equipped with industrial-grade machinery.',
    date: '3 weeks ago',
    serviceUsed: 'Sewer Line Camera Inspection & Relining',
    verified: true,
    location: 'East Industrial Park'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: '5 Warning Signs Your Underground Main Water Line Is Failing',
    slug: '5-warning-signs-underground-main-water-line-failing',
    excerpt: 'Learn how to detect silent underground water line leaks before catastrophic foundation settling and astronomical municipal water bills strike.',
    category: 'maintenance',
    readTime: '4 min read',
    author: 'Marcus Vance, Master Plumber',
    date: 'September 10, 2026',
    tags: ['Water Leaks', 'Foundation Care', 'Prevention'],
    featured: true,
    content: [
      'An underground main water line leak can stay hidden for weeks while quietly causing subterranean erosion, sinkholes, and structural distress to your home foundation.',
      '1. Unexplained Spikes on Your Water Utility Statement: If your household water consumption jumps significantly without changes in occupancy or lawn irrigation, a pressurized underground supply pipe may have developed a fracture.',
      '2. Mysterious Lush or Spongy Patches in Your Lawn: When a subterranean pipe fractures, water saturates the soil above, causing sudden patches of hyper-green grass or damp mud spots during dry weather.',
      '3. Noticeable Drop in Household Water Pressure: When running two fixtures simultaneously (e.g. shower and kitchen tap), a drop in dynamic pressure often indicates volume is escaping before reaching the fixtures.',
      '4. Hissing or Rumbling Sound Near Main Shutoff: Even when all internal taps are tightly closed, placing an ear or acoustic detector against the brass main shutoff can reveal high-velocity escaping water sounds.',
      '5. Sediment or Rust Discoloration: If your water develops a brown or reddish hue after running cold, exterior soil may be infiltrating through a corroded galvanised iron line.',
      'Recommendation: If you spot any of these warning signs, shut off the street curb key and schedule a certified acoustic leak test immediately.'
    ]
  },
  {
    id: 'blog-2',
    title: 'Frozen Pipe Prevention & Emergency Thawing Protocol',
    slug: 'frozen-pipe-prevention-emergency-thawing-protocol',
    excerpt: 'Critical cold-weather checklist to protect uninsulated crawlspaces, exterior hose bibs, and prevent expensive winter burst pipes.',
    category: 'emergency',
    readTime: '6 min read',
    author: 'Darius Cole, Emergency Lead',
    date: 'September 04, 2026',
    tags: ['Winter Prep', 'Freeze Protection', 'Emergency Tips'],
    content: [
      'Water expands by approximately 9% when freezing. When trapped inside rigid copper or PVC pipes, the immense hydrostatic pressure bursts the pipe wall, leading to thousands in flood damage.',
      'Proactive Prevention Steps:',
      '- Disconnect and drain all exterior garden hoses and shut the indoor isolation valves for outdoor bibs.',
      '- Maintain minimum 55°F (13°C) thermostat settings indoors even when traveling or away for the weekend.',
      '- Open under-sink cabinet doors in exterior-facing walls so warm house air circulates around supply lines.',
      '- Let a pencil-thin trickle of cold water run from the furthest faucet on nights dropping below 20°F (-7°C). Moving water rarely freezes.',
      'What to Do If a Pipe Freezes:',
      'Keep the faucet open. Gently apply radiant heat using a hair dryer or electric heating tape wrapped around the frozen section. NEVER use an open flame blowtorch, which creates steam explosions and fire hazards.'
    ]
  },
  {
    id: 'blog-3',
    title: 'Tankless vs Traditional Tank Water Heaters: True Lifetime ROI',
    slug: 'tankless-vs-traditional-tank-water-heaters-true-roi',
    excerpt: 'Detailed cost breakdown comparing 20-year lifespans, energy rebate credits, and annual descaling requirements for homeowners.',
    category: 'energy_saving',
    readTime: '5 min read',
    author: 'Elena Rostova, Commercial Lead',
    date: 'August 28, 2026',
    tags: ['Energy Efficiency', 'Water Heaters', 'Cost Savings'],
    content: [
      'Choosing between an on-demand tankless water heater and a conventional 50-gallon storage tank requires analyzing upfront capital outlay versus long-term operational efficiency.',
      'Traditional Storage Tanks: Lower upfront equipment and installation cost ($1,200 - $2,200 installed). However, they continuously consume gas or electricity to maintain 120°F water 24/7, resulting in standby thermal losses. Typical lifespan is 8 to 12 years.',
      'Tankless Systems: Higher initial installation investment ($2,800 - $4,500 installed) often requiring upgraded 3/4-inch gas supply lines or electrical sub-panels. However, they only heat water on demand, cutting utility heating bills by up to 34%, with an average service life exceeding 20+ years.',
      'Maintenance Verdict: In areas with mineral-rich hard water, tankless units require an annual vinegar descaling flush to preserve the copper heat exchanger warranty.'
    ]
  },
  {
    id: 'blog-4',
    title: 'Commercial Kitchen Plumbing & Health Code Compliance Guide',
    slug: 'commercial-kitchen-plumbing-health-code-compliance-guide',
    excerpt: 'Essential plumbing guidelines for restaurant operators: grease traps, air gaps, floor sinks, and preventing sewer backups during peak hours.',
    category: 'commercial',
    readTime: '7 min read',
    author: 'Marcus Vance, Master Plumber',
    date: 'August 18, 2026',
    tags: ['Commercial Code', 'Restaurants', 'Grease Interceptors'],
    content: [
      'Municipal commercial plumbing codes require rigorous protection of potable water supplies from hazardous wastewater back-siphonage.',
      'Key Compliance Pillars:',
      '1. Indirect Waste & Air Gaps: All culinary prep sinks, ice machines, and commercial dishwashers must drain into floor sinks via physical air gaps (minimum 1-inch clearance) to prevent dirty water from siphoning backwards into food preparation surfaces.',
      '2. Grease Interceptor Sizing: Grease traps must be sized based on total fixture flow rates (GPM) and cleaned before floating grease and settled solids exceed 25% of the total liquid depth.',
      '3. Mandatory Backflow Certifications: Reduced pressure zone (RPZ) devices on commercial soda fountains, ice makers, and combi-ovens must be tested and certified annually by a licensed tester.'
    ]
  }
];

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'usr-admin',
    name: 'Sarah Jenkins',
    email: 'admin@aquaproplumbing.com',
    role: 'admin',
    phone: '(555) 019-2831',
    permissions: {
      canDispatch: true,
      canExportReports: true,
      canManageBackups: true,
      canManageUsers: true,
      canEditPricing: true
    }
  },
  {
    id: 'usr-disp',
    name: 'Mike Rodriguez',
    email: 'dispatch@aquaproplumbing.com',
    role: 'dispatcher',
    phone: '(555) 019-4422',
    permissions: {
      canDispatch: true,
      canExportReports: true,
      canManageBackups: false,
      canManageUsers: false,
      canEditPricing: false
    }
  },
  {
    id: 'usr-tech',
    name: 'Darius Cole',
    email: 'darius.tech@aquaproplumbing.com',
    role: 'technician',
    phone: '(555) 456-7890',
    permissions: {
      canDispatch: false,
      canExportReports: false,
      canManageBackups: false,
      canManageUsers: false,
      canEditPricing: false
    }
  },
  {
    id: 'usr-cust',
    name: 'Robert Henderson',
    email: 'robert.h@gmail.com',
    role: 'customer',
    phone: '(555) 612-9011',
    permissions: {
      canDispatch: false,
      canExportReports: false,
      canManageBackups: false,
      canManageUsers: false,
      canEditPricing: false
    }
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud-101',
    timestamp: '2026-09-13T03:45:10Z',
    actor: 'Darius Cole',
    role: 'technician',
    action: 'JOB_STATUS_UPDATED',
    details: 'Updated booking PL-9421 to IN_PROGRESS. Added parts: 1-inch Brass Ball Valve.',
    targetId: 'PL-9421',
    status: 'success',
    ip: '192.168.1.44'
  },
  {
    id: 'aud-102',
    timestamp: '2026-09-13T03:32:00Z',
    actor: 'Mike Rodriguez',
    role: 'dispatcher',
    action: 'EMERGENCY_DISPATCH_TRIGGERED',
    details: 'Dispatched Darius Cole to emergency water line rupture at 742 Evergreen Terrace.',
    targetId: 'PL-9421',
    status: 'warning',
    ip: '10.0.0.12'
  },
  {
    id: 'aud-103',
    timestamp: '2026-09-12T15:00:20Z',
    actor: 'Sarah Jenkins',
    role: 'admin',
    action: 'DATABASE_BACKUP_CREATED',
    details: 'Scheduled nightly automated snapshot created successfully. Record count: 184.',
    status: 'success',
    ip: '127.0.0.1'
  },
  {
    id: 'aud-104',
    timestamp: '2026-09-12T14:22:00Z',
    actor: 'System Automation',
    role: 'admin',
    action: 'EMAIL_NOTIFICATION_SENT',
    details: 'Automated booking confirmation email delivered to Amanda Phillips (amanda.p@outlook.com).',
    targetId: 'PL-9419',
    status: 'success',
    ip: '127.0.0.1'
  }
];

export const INITIAL_EMAIL_LOGS: AutomatedEmailLog[] = [
  {
    id: 'em-301',
    recipientEmail: 'robert.h@gmail.com',
    recipientName: 'Robert Henderson',
    subject: 'URGENT: Emergency Plumber Dispatched - Ticket #PL-9421',
    templateType: 'emergency_alert',
    previewText: 'Technician Darius Cole has been dispatched in Van-112. Estimated arrival in 18 minutes.',
    bodyHtml: '<p>Dear Robert,</p><p>We received your emergency request for <strong>Emergency Pipe Leak & Burst Repair</strong>. Technician <strong>Darius Cole</strong> has been dispatched immediately.</p><p>Stay clear of standing electrical water. Emergency direct phone: (555) 456-7890.</p>',
    timestamp: '2026-09-13T03:32:00Z',
    status: 'delivered'
  },
  {
    id: 'em-302',
    recipientEmail: 'amanda.p@outlook.com',
    recipientName: 'Amanda Phillips',
    subject: 'Appointment Confirmed: AquaPro Plumbing #PL-9419',
    templateType: 'booking_confirmation',
    previewText: 'Your appointment is confirmed for Sep 14, 2026 (12:00 PM - 03:00 PM).',
    bodyHtml: '<p>Hello Amanda,</p><p>Thank you for choosing AquaPro Plumbing. Your service visit for <strong>Water Heater Installation & Repair</strong> is confirmed.</p><p>Technician Marcus Vance will notify you 30 minutes before arrival.</p>',
    timestamp: '2026-09-12T15:00:20Z',
    status: 'delivered'
  },
  {
    id: 'em-303',
    recipientEmail: 'jdavis.contracting@gmail.com',
    recipientName: 'Jonathan Davis',
    subject: 'Service Completed & Receipt: AquaPro Plumbing #PL-9417',
    templateType: 'job_completed',
    previewText: 'Your Hydro-Jetting service has been completed with a 90-day warranty.',
    bodyHtml: '<p>Hello Jonathan,</p><p>Your service ticket has been marked complete. Total charged: $380.00. Your warranty is active through December 11, 2026.</p>',
    timestamp: '2026-09-11T16:35:00Z',
    status: 'delivered'
  }
];

export const INITIAL_NOTIFICATION_SETTINGS: NotificationSettings = {
  emailCustomerConfirmation: true,
  emailTechnicianDispatch: true,
  emailEmergencyAlerts: true,
  smsAlertsEnabled: true,
  emergencySlaMinutes: 25,
  dailyRevenueTarget: 3500,
  soundAlerts: true
};
