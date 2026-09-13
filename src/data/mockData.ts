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
    title: 'Tap, Mixer & Muslim Shower Repair / Fitting',
    category: 'residential',
    basePrice: 450,
    pricingType: 'from',
    estimatedDuration: '30 - 45 mins',
    description: 'Instant repair for leaking taps, broken Muslim shower pipes, kitchen sink mixers, spindle replacement and new installations.',
    features: ['Upfront fixed pricing per point', 'Brass spindle & washer replacement', 'Teflon tape sealing guarantee', 'Zero mess, neat clean job'],
    popular: true,
    emergencyAvailable: true,
    iconName: 'Wrench',
    serviceGroup: 'Taps & Showers'
  },
  {
    id: 'srv-2',
    title: 'Instant Gas & Electric Geyser Repair / Fitting',
    category: 'both',
    basePrice: 1200,
    pricingType: 'from',
    estimatedDuration: '1 - 2 hours',
    description: 'Specialist diagnosis for low gas heating, electric geyser element replacement, thermostat failure, pressure relief valve, and new winter geyser installation.',
    features: ['Original thermostat & element fitting', 'Gas burner descaling & nozzle tuning', 'High-pressure safety valve check', '7-day rework warranty'],
    popular: true,
    emergencyAvailable: true,
    iconName: 'Flame',
    serviceGroup: 'Geysers'
  },
  {
    id: 'srv-3',
    title: 'Water Motor, Suction & Booster Pump Repair',
    category: 'both',
    basePrice: 1400,
    pricingType: 'from',
    estimatedDuration: '1 - 2.5 hours',
    description: 'Expert repair for donkey pumps, golden suction motors, booster pressure pumps, burnt capacitor replacement, bearing overhaul and electrical wiring.',
    features: ['Capacitor & seal replacement', 'Suction line priming & vacuum test', 'Overheating & low-voltage check', 'Emergency same-day arrival'],
    popular: true,
    emergencyAvailable: true,
    iconName: 'Activity',
    serviceGroup: 'Water Motors'
  },
  {
    id: 'srv-4',
    title: 'Commode, English Seat & Flush Tank Repair',
    category: 'residential',
    basePrice: 850,
    pricingType: 'from',
    estimatedDuration: '45 - 60 mins',
    description: 'Fix continuous water running into bowl, faulty flush handle, siphon valve, wax ring seal leakage, or brand-new English toilet installation.',
    features: ['Silent dual-flush valve fitting', 'Odor-blocking wax seal installation', 'Floor bolt anchoring without tile crack', 'Tested for leak-free flushing'],
    popular: true,
    emergencyAvailable: true,
    iconName: 'CheckCircle2',
    serviceGroup: 'Bathroom Sanitary'
  },
  {
    id: 'srv-5',
    title: 'Drain Blockage & Kitchen Pipe Machine Unclogging',
    category: 'both',
    basePrice: 999,
    pricingType: 'from',
    estimatedDuration: '45 - 90 mins',
    description: 'Clear chocked kitchen sink drains, bathroom floor traps, and main sewerage line blocks using heavy-duty electric spring snake machines.',
    features: ['Mechanized rotating cable snake', 'Safe for PVC, GI & cast-iron pipes', 'No destructive wall or tile breaking', '90-day free flow warranty'],
    popular: true,
    emergencyAvailable: true,
    iconName: 'Droplets',
    serviceGroup: 'Drainage'
  },
  {
    id: 'srv-6',
    title: 'Underground & Overhead Water Tank Mechanized Cleaning',
    category: 'both',
    basePrice: 2999,
    pricingType: 'from',
    estimatedDuration: '2 - 3 hours',
    description: 'Deep high-pressure rotary scrubbing, sludge pumping, and anti-bacterial chlorine treatment to guarantee crystal-clear potable water for your family.',
    features: ['Submersible sludge evacuation', '150 Bar high-pressure surface wash', 'Food-grade potassium permanganate treatment', 'Free water quality inspection'],
    popular: false,
    emergencyAvailable: false,
    iconName: 'Sparkles',
    serviceGroup: 'Tank Cleaning'
  },
  {
    id: 'srv-7',
    title: 'Hidden Pipe Leakage & Wall Seepage Acoustic Detection',
    category: 'both',
    basePrice: 2500,
    pricingType: 'fixed',
    estimatedDuration: '1 - 2 hours',
    description: 'State-of-the-art non-invasive acoustic microphone & thermal detection to locate concealed pipe bursts and seepage inside walls without breaking tiles.',
    features: ['Non-destructive pinpoint location', 'Acoustic digital listening stick', 'Concrete moisture percentage mapping', 'Detailed written repair estimate'],
    popular: true,
    emergencyAvailable: true,
    iconName: 'Search',
    serviceGroup: 'Leak Detection'
  },
  {
    id: 'srv-8',
    title: 'Commercial Restaurant Grease Trap & Backflow Certification',
    category: 'commercial',
    basePrice: 4500,
    pricingType: 'from',
    estimatedDuration: '3 hours',
    description: 'Heavy-duty plumbing maintenance, grease interceptor cleaning, high-flow commercial pipeline descaling, and food authority hygiene compliance.',
    features: ['Off-peak nighttime service', 'Full environmental waste disposal', 'Heavy-duty stainless steel interceptors', 'Preventative monthly maintenance contracts'],
    popular: false,
    emergencyAvailable: true,
    iconName: 'Building2',
    serviceGroup: 'Commercial'
  }
];

export const INITIAL_TECHNICIANS: Technician[] = [
  {
    id: 'tech-1',
    name: 'Ustad Mohammad Tariq',
    email: 'm.tariq@kwikfix.pk',
    phone: '0300-4829101',
    specialty: 'Master Plumber & Water Motor Specialist',
    rating: 4.96,
    completedJobs: 1420,
    status: 'available',
    vehicleNumber: 'KHI-8821 (Bike/Toolkit)',
    currentLocation: 'DHA Phase 5 & Clifton, Karachi',
    city: 'Karachi',
    cnicVerified: true,
    experienceYears: 12
  },
  {
    id: 'tech-2',
    name: 'Ustad Rashid Ali',
    email: 'rashid.ali@kwikfix.pk',
    phone: '0321-9921443',
    specialty: 'Instant Geyser, Electric Heating & Sanitary Expert',
    rating: 4.94,
    completedJobs: 980,
    status: 'on_job',
    vehicleNumber: 'LHR-7729 (Tool Van)',
    currentLocation: 'Gulberg & Model Town, Lahore',
    city: 'Lahore',
    cnicVerified: true,
    experienceYears: 9
  },
  {
    id: 'tech-3',
    name: 'Ustad Naveed Ahmed',
    email: 'naveed.ahmed@kwikfix.pk',
    phone: '0345-5512908',
    specialty: 'Emergency Pipe Bursts & Electric Drain Snake Lead',
    rating: 4.98,
    completedJobs: 1650,
    status: 'available',
    vehicleNumber: 'ISB-4410 (Emergency Quick Unit)',
    currentLocation: 'F-7 / F-10 & Blue Area, Islamabad',
    city: 'Islamabad',
    cnicVerified: true,
    experienceYears: 14
  },
  {
    id: 'tech-4',
    name: 'Ustad Bilal Hussain',
    email: 'bilal.h@kwikfix.pk',
    phone: '0333-7766512',
    specialty: 'Underground Tank Mechanized Wash & Hidden Seepage',
    rating: 4.89,
    completedJobs: 730,
    status: 'available',
    vehicleNumber: 'KHI-2199 (Mobile Sludge Pump Unit)',
    currentLocation: 'Gulshan-e-Iqbal & Johar, Karachi',
    city: 'Karachi',
    cnicVerified: true,
    experienceYears: 8
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'KF-8821',
    customerName: 'Khurram Shahzad',
    email: 'khurram.s@gmail.com',
    phone: '0300-8271920',
    address: 'House 42-B, Street 14, Phase 6',
    city: 'Karachi',
    clientType: 'residential',
    serviceCategory: 'Water Motor, Suction & Booster Pump Repair',
    priority: 'emergency',
    preferredDate: 'Today',
    timeSlot: 'Within 45 Mins (Urgent)',
    description: 'Suction water motor making loud humming noise and smell of burning wire. Water not reaching roof tank.',
    estimatedPrice: 1400,
    finalPrice: 1650,
    status: 'in_progress',
    assignedTechnicianId: 'tech-1',
    assignedTechnicianName: 'Ustad Mohammad Tariq',
    createdAt: '2026-09-13T03:15:00Z',
    updatedAt: '2026-09-13T03:40:00Z',
    technicianNotes: 'Arrived on site in 28 mins. 16uF motor capacitor replaced with original Fuji capacitor. Motor suction running smooth.',
    partsUsed: ['16uF Fuji Heavy Motor Capacitor', 'Teflon Brass Union Nipple'],
    isEmergency: true
  },
  {
    id: 'KF-8822',
    customerName: 'Fatima Zafar',
    email: 'fatima.zafar@outlook.com',
    phone: '0321-4455678',
    address: 'Apartment 304, Block 5, Clifton',
    city: 'Karachi',
    clientType: 'residential',
    serviceCategory: 'Tap, Mixer & Muslim Shower Repair / Fitting',
    priority: 'standard',
    preferredDate: 'Tomorrow',
    timeSlot: 'Morning (10:00 AM - 1:00 PM)',
    description: 'Master bathroom mixer leaking from joint and kitchen Muslim shower pipe cracked.',
    estimatedPrice: 650,
    status: 'confirmed',
    assignedTechnicianId: 'tech-1',
    assignedTechnicianName: 'Ustad Mohammad Tariq',
    createdAt: '2026-09-13T01:30:00Z',
    updatedAt: '2026-09-13T01:35:00Z',
    isEmergency: false
  },
  {
    id: 'KF-8823',
    customerName: 'Cafe Aylanto Management (Omer)',
    email: 'omer.manager@aylanto.com',
    phone: '0301-8492011',
    address: 'M.M. Alam Road, Gulberg III',
    city: 'Lahore',
    clientType: 'commercial',
    serviceCategory: 'Commercial Restaurant Grease Trap & Backflow Certification',
    priority: 'urgent',
    preferredDate: 'Tonight',
    timeSlot: 'Evening (7:00 PM - 10:00 PM)',
    description: 'Kitchen sink drainage slow during dinner rush, grease trap cleanout and high-flow sewer line machine flush required.',
    estimatedPrice: 4500,
    status: 'dispatched',
    assignedTechnicianId: 'tech-2',
    assignedTechnicianName: 'Ustad Rashid Ali',
    createdAt: '2026-09-13T02:45:00Z',
    updatedAt: '2026-09-13T03:10:00Z',
    isEmergency: false
  },
  {
    id: 'KF-8824',
    customerName: 'Dr. Asim Farooq',
    email: 'dr.asim@yahoo.com',
    phone: '0345-5192834',
    address: 'House 12, Street 28, Sector F-8/2',
    city: 'Islamabad',
    clientType: 'residential',
    serviceCategory: 'Instant Gas & Electric Geyser Repair / Fitting',
    priority: 'standard',
    preferredDate: 'Today',
    timeSlot: 'Afternoon (2:00 PM - 5:00 PM)',
    description: 'Instant gas geyser igniting then turning off after 30 seconds. Water remains cold.',
    estimatedPrice: 1200,
    finalPrice: 1200,
    status: 'completed',
    assignedTechnicianId: 'tech-3',
    assignedTechnicianName: 'Ustad Naveed Ahmed',
    createdAt: '2026-09-12T14:10:00Z',
    updatedAt: '2026-09-12T16:00:00Z',
    technicianNotes: 'Descaled gas burner assembly and replaced faulty thermocouple sensor. Gas flow calibrated. Customer verified hot water.',
    partsUsed: ['Copper Thermocouple Sensor', 'Gas Pilot Cleaning Needle'],
    isEmergency: false
  }
];

export const INITIAL_TESTIMONIALS: CustomerTestimonial[] = [
  {
    id: 't-1',
    name: 'Babar Rizvi',
    role: 'Homeowner, Phase 6 DHA',
    clientType: 'residential',
    rating: 5,
    comment: 'Plumber arrived at 9 PM on a Sunday within 35 minutes when our main water motor died. Fixed the capacitor and primed the suction pipe cleanly. No unnecessary charges or haggling!',
    date: 'Yesterday',
    serviceUsed: 'Water Motor & Suction Pump Repair',
    verified: true,
    location: 'Karachi'
  },
  {
    id: 't-2',
    name: 'Mrs. Tahira Qureshi',
    role: 'Resident, Model Town',
    clientType: 'residential',
    rating: 5,
    comment: 'Booking on KwikFix was so simple! The technician Ustad Rashid was punctual, polite, and wore shoe covers before entering. Fixed our instant geyser and installed 2 mixer taps perfectly.',
    date: '3 days ago',
    serviceUsed: 'Instant Geyser Repair & Taps',
    verified: true,
    location: 'Lahore'
  },
  {
    id: 't-3',
    name: 'Shahzaib Malik',
    role: 'Operations Director, TechHub Plaza',
    clientType: 'commercial',
    rating: 5,
    comment: 'We run a 4-story corporate office in Blue Area. KwikFix handles all our commercial backflow testing and quarterly underground water tank cleaning. Complete invoicing with GST and certified reports.',
    date: '1 week ago',
    serviceUsed: 'Commercial Tank Cleaning & Plumbing',
    verified: true,
    location: 'Islamabad'
  },
  {
    id: 't-4',
    name: 'Dr. Ayesha Siddiqui',
    role: 'Homeowner, Gulshan-e-Iqbal',
    clientType: 'residential',
    rating: 5,
    comment: 'We had persistent wall seepage that 3 local plumbers could not trace. KwikFix came with digital acoustic leak detectors and pinpointed the cracked concealed elbow behind the tiles within 20 minutes.',
    date: '2 weeks ago',
    serviceUsed: 'Concealed Pipe Leak Detection',
    verified: true,
    location: 'Karachi'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'How to Prevent Your Water Suction Motor From Burning Out During Low Voltage',
    slug: 'water-motor-low-voltage-burn-prevention',
    excerpt: 'Low voltage during summer load-shedding is the #1 cause of burnt donkey pumps and suction motors in Pakistani homes. Here is how a magnetic voltage protector saves you Rs. 15,000.',
    content: [
      'In cities like Karachi and Lahore, erratic line voltage frequently dips below 180V. When a single-phase water pump attempts to start against a cold hydraulic head under low voltage, the start winding draws 4x rated amperes without achieving running RPM.',
      '1. Install a Heavy-Duty Magnetic Voltage Guard: Place a dedicated 30A digital over/under-voltage cutout box directly at your water motor power switch. Set the minimum threshold to 195V.',
      '2. Inspect Motor Starting Capacitors Every 6 Months: Electrolytic capacitors dry out in heat. If you hear a loud humming sound without rotation, shut off immediately to prevent winding meltdown.',
      '3. Never Run Motor Dry: Without water circulation, mechanical shaft seals overheat in 90 seconds, causing water to flood the motor bearing housing.'
    ],
    category: 'maintenance',
    readTime: '4 min read',
    author: 'Ustad Mohammad Tariq (Master Plumber)',
    date: 'September 2026',
    tags: ['Water Motor', 'Low Voltage', 'Suction Pump', 'Karachi Plumbing'],
    featured: true
  },
  {
    id: 'blog-2',
    title: 'Instant Gas Geyser vs Electric Storage Geyser: Pakistani Winter Guide',
    slug: 'instant-gas-geyser-vs-electric-winter-guide',
    excerpt: 'Facing low gas pressure this winter? Compare the operating cost, water flow rates, and safety guidelines between instant LPG/natural gas geysers and modern hybrid electric units.',
    content: [
      'Winter gas load-shedding forces millions of Pakistani households to evaluate alternative water heating solutions.',
      'Instant Gas Geysers: Provide on-demand hot water without storing 30-50 gallons. However, they require minimum 0.5 Bar water pressure and adequate natural gas pressure to ignite reliably.',
      'Electric Storage Geysers: Reliable when gas drops to zero, but consume 2,000 to 2,500 Watts. Installing a digital timer switch that operates only between 5 AM - 7 AM saves up to 40% on electricity bills.',
      'Safety First: Always ensure instant gas geysers have an external flue exhaust pipe. Never install gas geysers inside unventilated, enclosed bathrooms.'
    ],
    category: 'energy_saving',
    readTime: '6 min read',
    author: 'Ustad Rashid Ali',
    date: 'August 2026',
    tags: ['Geyser Fitting', 'Winter Heating', 'Gas Pressure', 'Electricity Saving']
  },
  {
    id: 'blog-3',
    title: 'How to Sanitize Underground & Overhead Water Tanks Before Monsoon',
    slug: 'underground-overhead-water-tank-cleaning-guide',
    excerpt: 'Stagnant groundwater and municipal line silt contaminate domestic water tanks with E. coli and dengue larvae. Here is the step-by-step master plumber disinfection protocol.',
    content: [
      'Municipal water in urban centers contains sediment and microscopic pathogens that settle at the bottom of underground water tanks.',
      'Step 1: Sludge Drainage: Evacuate the bottom 6 inches of mud using a submersible solids pump.',
      'Step 2: Mechanized High-Pressure Scrubbing: Use a 150-Bar rotary jet washer with non-toxic degreaser to scrub wall algae and calcium crust.',
      'Step 3: Disinfection with Potassium Permanganate or Bleach: Treat walls with food-grade disinfectant, let sit for 30 minutes, and rinse thoroughly before refilling.',
      'We recommend scheduling tank cleaning every 6 months for optimum family skin and gastrointestinal health.'
    ],
    category: 'maintenance',
    readTime: '5 min read',
    author: 'Ustad Bilal Hussain',
    date: 'July 2026',
    tags: ['Tank Cleaning', 'Water Hygiene', 'Monsoon Care', 'DHA & Clifton']
  },
  {
    id: 'blog-4',
    title: 'Emergency Checklist: What to Do When a Concealed Water Pipe Bursts',
    slug: 'emergency-concealed-pipe-burst-steps',
    excerpt: 'Water gushing from bathroom tiles or ceiling? Follow these 4 immediate damage-control steps before our emergency rapid dispatch unit arrives at your doorstep.',
    content: [
      '1. Shut Down the Overhead Tank Valve: Immediately climb to the roof and close the main PVC ball valve coming out of the overhead water tank. If in an apartment, shut the main gate valve located in the duct or balcony.',
      '2. Turn Off Water Motor Circuit Breaker: Cut power to suction or booster pumps to prevent continuous pressure buildup into fractured lines.',
      '3. Open the Lowest Ground Taps: Relieve residual hydraulic pressure by opening external garden taps or ground-floor faucets.',
      '4. Book Emergency Rapid Dispatch on KwikFix: Our emergency vehicle reaches your location equipped with acoustic leak detectors and quick-coupling repair sleeves.'
    ],
    category: 'emergency',
    readTime: '3 min read',
    author: 'Ustad Naveed Ahmed',
    date: 'June 2026',
    tags: ['Emergency Plumbing', 'Pipe Leak', '45 Min Arrival', 'Damage Control']
  }
];

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'user-admin',
    name: 'Hamza Khan (Operations Lead)',
    email: 'admin@kwikfix.pk',
    role: 'admin',
    phone: '0300-5945349',
    permissions: {
      canDispatch: true,
      canExportReports: true,
      canManageBackups: true,
      canManageUsers: true,
      canEditPricing: true
    }
  },
  {
    id: 'user-dispatcher',
    name: 'Zeeshan Baig (Central Dispatch)',
    email: 'dispatch@kwikfix.pk',
    role: 'dispatcher',
    phone: '0321-8899100',
    permissions: {
      canDispatch: true,
      canExportReports: true,
      canManageBackups: false,
      canManageUsers: false,
      canEditPricing: false
    }
  },
  {
    id: 'user-tech',
    name: 'Ustad Mohammad Tariq (Field Lead)',
    email: 'm.tariq@kwikfix.pk',
    role: 'technician',
    phone: '0300-4829101',
    permissions: {
      canDispatch: false,
      canExportReports: false,
      canManageBackups: false,
      canManageUsers: false,
      canEditPricing: false
    }
  },
  {
    id: 'user-customer',
    name: 'Khurram Shahzad (Customer)',
    email: 'khurram.s@gmail.com',
    role: 'customer',
    phone: '0300-8271920',
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
    id: 'log-101',
    timestamp: '2026-09-13T03:40:00Z',
    actor: 'Ustad Mohammad Tariq',
    role: 'technician',
    action: 'JOB_STATUS_UPDATED',
    details: 'Ticket #KF-8821 status updated to In Progress. Motor capacitor installed.',
    targetId: 'KF-8821',
    status: 'success',
    ip: '110.39.42.18'
  },
  {
    id: 'log-102',
    timestamp: '2026-09-13T03:15:00Z',
    actor: 'Zeeshan Baig',
    role: 'dispatcher',
    action: 'EMERGENCY_DISPATCH_TRIGGERED',
    details: 'Dispatched Ustad Tariq to Phase 6 DHA for emergency water motor failure.',
    targetId: 'KF-8821',
    status: 'success',
    ip: '182.180.98.5'
  },
  {
    id: 'log-103',
    timestamp: '2026-09-13T02:00:00Z',
    actor: 'Hamza Khan',
    role: 'admin',
    action: 'DATABASE_BACKUP_GENERATED',
    details: 'Automated encrypted database snapshot created and verified. 184 active records.',
    status: 'success',
    ip: '39.40.112.90'
  }
];

export const INITIAL_EMAIL_LOGS: AutomatedEmailLog[] = [
  {
    id: 'em-101',
    recipientEmail: 'khurram.s@gmail.com',
    recipientName: 'Khurram Shahzad',
    subject: '🚨 EMERGENCY DISPATCH: Ustad Tariq is en route (Ticket #KF-8821)',
    templateType: 'emergency_alert',
    previewText: 'Your emergency plumbing request has been assigned to Ustad Mohammad Tariq.',
    bodyHtml: `
      <div style="font-family: sans-serif; padding: 20px; color: #1e293b; max-width: 600px;">
        <h2 style="color: #0284c7; margin-bottom: 5px;">KwikFix Plumbing Services</h2>
        <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px; margin-bottom: 16px;">
          <strong style="color: #991b1b;">Emergency Crew En Route</strong><br/>
          Ticket ID: <strong>KF-8821</strong> • Priority: <strong>Urgent (45 Min SLA)</strong>
        </div>
        <p>Dear Khurram Shahzad,</p>
        <p>Your emergency plumbing dispatch request for <strong>Water Motor, Suction & Booster Pump Repair</strong> has been assigned to our senior verified master technician:</p>
        <p style="background: #f8fafc; padding: 12px; border-radius: 8px;">
          <strong>Technician:</strong> Ustad Mohammad Tariq (4.96 ★)<br/>
          <strong>Direct Contact:</strong> 0300-4829101<br/>
          <strong>Vehicle:</strong> KHI-8821 (Mobile Quick Unit)
        </p>
        <p>Please ensure clear access to the water motor and roof tank valve. Transparent upfront pricing applies upon diagnosis.</p>
        <p style="font-size: 12px; color: #64748b;">24/7 Helpline: 0300-KWIKFIX | KwikFix.pk</p>
      </div>
    `,
    timestamp: '2026-09-13T03:16:00Z',
    status: 'delivered'
  },
  {
    id: 'em-102',
    recipientEmail: 'fatima.zafar@outlook.com',
    recipientName: 'Fatima Zafar',
    subject: 'Booking Confirmed: Plumbing Service for Tomorrow (Ticket #KF-8822)',
    templateType: 'booking_confirmation',
    previewText: 'Your appointment for Tap & Muslim Shower repair has been scheduled.',
    bodyHtml: `
      <div style="font-family: sans-serif; padding: 20px; color: #1e293b; max-width: 600px;">
        <h2 style="color: #0284c7;">KwikFix Plumbing Services</h2>
        <p>Dear Fatima Zafar,</p>
        <p>Thank you for choosing KwikFix! Your service appointment has been confirmed:</p>
        <ul>
          <li><strong>Service:</strong> Tap, Mixer & Muslim Shower Repair</li>
          <li><strong>Schedule:</strong> Tomorrow, Morning (10:00 AM - 1:00 PM)</li>
          <li><strong>Address:</strong> Apartment 304, Block 5, Clifton, Karachi</li>
          <li><strong>Upfront Estimated Price:</strong> Rs. 650</li>
        </ul>
        <p>Our NADRA-verified technician will contact you 20 minutes before arrival. Pay safely via Cash, JazzCash, or Bank Transfer after the job is completed!</p>
      </div>
    `,
    timestamp: '2026-09-13T01:31:00Z',
    status: 'delivered'
  }
];

export const INITIAL_NOTIFICATION_SETTINGS: NotificationSettings = {
  emailCustomerConfirmation: true,
  emailTechnicianDispatch: true,
  emailEmergencyAlerts: true,
  smsAlertsEnabled: true,
  emergencySlaMinutes: 35,
  dailyRevenueTarget: 35000, // PKR
  soundAlerts: true
};
