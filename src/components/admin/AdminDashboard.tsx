import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Shield, 
  Download, 
  FileText, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Database, 
  Mail, 
  Sliders, 
  Activity, 
  Search, 
  Filter, 
  ChevronRight, 
  Printer, 
  RotateCcw, 
  Save, 
  UserCheck, 
  Check, 
  X,
  ExternalLink,
  Eye,
  Plus
} from 'lucide-react';
import { usePlumbing } from '../../context/PlumbingContext';
import { Booking, BookingStatus, UserRole, UserProfile } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    currentRole,
    switchRole,
    allUsers,
    updateUserPermissions,
    bookings,
    technicians,
    updateBookingStatus,
    assignTechnicianToBooking,
    auditLogs,
    emailLogs,
    notificationSettings,
    updateNotificationSettings,
    backups,
    createDatabaseBackup,
    downloadBackupJson,
    restoreFromBackup,
    resetToFactoryDefaults,
    openBookingModal
  } = usePlumbing();

  // Active sub-tab inside Admin portal
  const [adminTab, setAdminTab] = useState<
    'analytics' | 'dispatch' | 'technician' | 'emails' | 'backups' | 'audit' | 'settings'
  >('analytics');

  // Filters for dispatch board
  const [dispatchStatusFilter, setDispatchStatusFilter] = useState<string>('all');
  const [dispatchSearch, setDispatchSearch] = useState('');
  const [selectedTicketForDetail, setSelectedTicketForDetail] = useState<Booking | null>(null);

  // Email preview modal state
  const [previewEmail, setPreviewEmail] = useState<any | null>(null);

  // Print / PDF Report preview modal
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportDateRange, setReportDateRange] = useState('September 2026');

  // Selected technician for technician view
  const activeTechId = currentRole === 'technician' ? 'tech-3' : 'tech-1';
  const [techWorkNotes, setTechWorkNotes] = useState('');
  const [techPartInput, setTechPartInput] = useState('');

  // ----------------------------------------------------
  // ANALYTICS CALCULATIONS
  // ----------------------------------------------------
  const analyticsSummary = useMemo(() => {
    const totalBookings = bookings.length;
    const completedBookings = bookings.filter(b => b.status === 'completed');
    const emergencyBookings = bookings.filter(b => b.isEmergency || b.priority === 'emergency');
    
    // Revenue estimation
    const totalRevenue = bookings.reduce((sum, b) => {
      return sum + (b.finalPrice || b.estimatedPrice || 0);
    }, 0);

    const completedRevenue = completedBookings.reduce((sum, b) => {
      return sum + (b.finalPrice || b.estimatedPrice || 0);
    }, 0);

    const activeDispatches = bookings.filter(b => b.status === 'dispatched' || b.status === 'in_progress').length;

    // Service category breakdown
    const categoryCounts: Record<string, number> = {};
    bookings.forEach(b => {
      const cat = b.serviceCategory || 'Other';
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    return {
      totalBookings,
      completedBookings: completedBookings.length,
      emergencyBookings: emergencyBookings.length,
      totalRevenue,
      completedRevenue,
      activeDispatches,
      categoryCounts,
      avgSlaResponseTime: '18.4 min',
      csatRating: '98.6%'
    };
  }, [bookings]);

  // Filtered bookings for dispatch board
  const filteredBookings = bookings.filter(b => {
    const matchesStatus = dispatchStatusFilter === 'all' || b.status === dispatchStatusFilter;
    const matchesSearch = b.customerName.toLowerCase().includes(dispatchSearch.toLowerCase()) ||
                          b.id.toLowerCase().includes(dispatchSearch.toLowerCase()) ||
                          b.address.toLowerCase().includes(dispatchSearch.toLowerCase()) ||
                          b.serviceCategory.toLowerCase().includes(dispatchSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Technician's assigned jobs
  const technicianJobs = bookings.filter(b => 
    b.assignedTechnicianId === activeTechId || currentRole === 'admin'
  );

  // ----------------------------------------------------
  // EXPORT TO CSV
  // ----------------------------------------------------
  const handleExportCsv = () => {
    const headers = [
      'Ticket ID',
      'Customer Name',
      'Client Type',
      'Service Category',
      'Priority',
      'Preferred Date',
      'Time Slot',
      'Status',
      'Assigned Technician',
      'Estimated Price ($)',
      'Final Price ($)',
      'Phone',
      'Address',
      'City',
      'Created At'
    ];

    const rows = bookings.map(b => [
      `"${b.id}"`,
      `"${b.customerName}"`,
      `"${b.clientType}"`,
      `"${b.serviceCategory}"`,
      `"${b.priority}"`,
      `"${b.preferredDate}"`,
      `"${b.timeSlot}"`,
      `"${b.status.toUpperCase()}"`,
      `"${b.assignedTechnicianName || 'Unassigned'}"`,
      b.estimatedPrice || 0,
      b.finalPrice || b.estimatedPrice || 0,
      `"${b.phone}"`,
      `"${b.address}"`,
      `"${b.city}"`,
      `"${b.createdAt}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `AquaPro_Bookings_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // ----------------------------------------------------
  // PRINT / EXPORT PDF REPORT
  // ----------------------------------------------------
  const handlePrintPdfReport = () => {
    window.print();
  };

  return (
    <div className="py-8 bg-slate-100 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Control Bar with Role Check */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="p-3 rounded-xl bg-sky-600 text-white shadow-sm">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Operations &amp; Admin Hub
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                  Role: {currentRole}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Logged in as <strong className="text-slate-800 dark:text-slate-200">{currentUser.name}</strong> ({currentUser.email})
              </p>
            </div>
          </div>

          {/* Quick RBAC Role switcher tabs */}
          <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold">
            {(['admin', 'dispatcher', 'technician', 'customer'] as UserRole[]).map(r => (
              <button
                key={r}
                onClick={() => switchRole(r)}
                className={`px-2.5 py-1.5 rounded-lg capitalize transition-colors ${
                  currentRole === r
                    ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 font-bold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Tabs for Operations Portal */}
        <div className="flex items-center space-x-1 overflow-x-auto pb-1 border-b border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setAdminTab('analytics')}
            className={`px-4 py-2.5 rounded-t-xl flex items-center space-x-2 border-b-2 transition-all whitespace-nowrap ${
              adminTab === 'analytics'
                ? 'border-sky-600 text-sky-600 dark:text-sky-400 bg-white dark:bg-slate-900 font-bold shadow-xs'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analytics &amp; Data Visualization</span>
          </button>

          <button
            onClick={() => setAdminTab('dispatch')}
            className={`px-4 py-2.5 rounded-t-xl flex items-center space-x-2 border-b-2 transition-all whitespace-nowrap ${
              adminTab === 'dispatch'
                ? 'border-sky-600 text-sky-600 dark:text-sky-400 bg-white dark:bg-slate-900 font-bold shadow-xs'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Dispatch &amp; Bookings ({bookings.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('technician')}
            className={`px-4 py-2.5 rounded-t-xl flex items-center space-x-2 border-b-2 transition-all whitespace-nowrap ${
              adminTab === 'technician'
                ? 'border-sky-600 text-sky-600 dark:text-sky-400 bg-white dark:bg-slate-900 font-bold shadow-xs'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Technician Portal</span>
          </button>

          <button
            onClick={() => setAdminTab('emails')}
            className={`px-4 py-2.5 rounded-t-xl flex items-center space-x-2 border-b-2 transition-all whitespace-nowrap ${
              adminTab === 'emails'
                ? 'border-sky-600 text-sky-600 dark:text-sky-400 bg-white dark:bg-slate-900 font-bold shadow-xs'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Automated Notifications ({emailLogs.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('backups')}
            className={`px-4 py-2.5 rounded-t-xl flex items-center space-x-2 border-b-2 transition-all whitespace-nowrap ${
              adminTab === 'backups'
                ? 'border-sky-600 text-sky-600 dark:text-sky-400 bg-white dark:bg-slate-900 font-bold shadow-xs'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Database Backups</span>
          </button>

          <button
            onClick={() => setAdminTab('audit')}
            className={`px-4 py-2.5 rounded-t-xl flex items-center space-x-2 border-b-2 transition-all whitespace-nowrap ${
              adminTab === 'audit'
                ? 'border-sky-600 text-sky-600 dark:text-sky-400 bg-white dark:bg-slate-900 font-bold shadow-xs'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Security Audit Logs</span>
          </button>

          <button
            onClick={() => setAdminTab('settings')}
            className={`px-4 py-2.5 rounded-t-xl flex items-center space-x-2 border-b-2 transition-all whitespace-nowrap ${
              adminTab === 'settings'
                ? 'border-sky-600 text-sky-600 dark:text-sky-400 bg-white dark:bg-slate-900 font-bold shadow-xs'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>RBAC &amp; Config</span>
          </button>
        </div>

        {/* ---------------------------------------------------- */}
        {/* TAB 1: ANALYTICS & DATA VISUALIZATION DASHBOARD      */}
        {/* ---------------------------------------------------- */}
        {adminTab === 'analytics' && (
          <div className="space-y-6">
            {/* Export Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Monthly Performance &amp; Revenue Analytics
                </h3>
                <p className="text-xs text-slate-500">
                  Data updated in real-time from active field jobs and customer bookings.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  id="export-csv-btn"
                  onClick={handleExportCsv}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-300 dark:border-slate-700 flex items-center space-x-1.5 transition-colors"
                >
                  <Download className="w-4 h-4 text-sky-500" />
                  <span>Export CSV</span>
                </button>

                <button
                  id="export-pdf-report-btn"
                  onClick={() => setIsReportModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Generate PDF Report</span>
                </button>
              </div>
            </div>

            {/* KPI Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>Gross Projected Revenue</span>
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  ${analyticsSummary.totalRevenue.toLocaleString()}
                </div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                  +18.4% vs last month
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>Total Service Bookings</span>
                  <Calendar className="w-4 h-4 text-sky-500" />
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {analyticsSummary.totalBookings}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {analyticsSummary.completedBookings} completed • {analyticsSummary.activeDispatches} active en route
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>Emergency Response SLA</span>
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {analyticsSummary.avgSlaResponseTime}
                </div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                  Target &lt; 25m met (100% compliance)
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>Customer Satisfaction</span>
                  <Users className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {analyticsSummary.csatRating}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Based on 480 post-job verified surveys
                </div>
              </div>
            </div>

            {/* Interactive Data Visualizations */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Revenue Trend SVG Visualizer */}
              <div className="lg:col-span-8 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      Revenue Trend &amp; Growth Trajectory
                    </h4>
                    <p className="text-xs text-slate-500">
                      Weekly gross pipeline tracking across residential and commercial service tiers
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    Trailing 6 Weeks
                  </span>
                </div>

                {/* SVG Visual Chart */}
                <div className="h-64 w-full relative pt-4">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 600 200">
                    <defs>
                      <linearGradient id="revenueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Grid lines */}
                    <line x1="0" y1="40" x2="600" y2="40" stroke="currentColor" strokeOpacity="0.1" />
                    <line x1="0" y1="90" x2="600" y2="90" stroke="currentColor" strokeOpacity="0.1" />
                    <line x1="0" y1="140" x2="600" y2="140" stroke="currentColor" strokeOpacity="0.1" />
                    <line x1="0" y1="190" x2="600" y2="190" stroke="currentColor" strokeOpacity="0.1" />

                    {/* Area fill */}
                    <polygon
                      points="50,160 150,130 250,110 350,140 450,70 550,45 550,190 50,190"
                      fill="url(#revenueGrad)"
                    />

                    {/* Path line */}
                    <polyline
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points="50,160 150,130 250,110 350,140 450,70 550,45"
                    />

                    {/* Data Points */}
                    {[
                      { x: 50, y: 160, val: '$2,800', wk: 'Wk 1' },
                      { x: 150, y: 130, val: '$3,450', wk: 'Wk 2' },
                      { x: 250, y: 110, val: '$4,100', wk: 'Wk 3' },
                      { x: 350, y: 140, val: '$3,200', wk: 'Wk 4' },
                      { x: 450, y: 70, val: '$5,400', wk: 'Wk 5' },
                      { x: 550, y: 45, val: '$6,850', wk: 'Wk 6' }
                    ].map((pt, i) => (
                      <g key={i} className="group cursor-pointer">
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="5.5"
                          fill="#ffffff"
                          stroke="#0284c7"
                          strokeWidth="3"
                          className="transition-transform group-hover:scale-125"
                        />
                        <text
                          x={pt.x}
                          y={pt.y - 12}
                          textAnchor="middle"
                          fontSize="10"
                          fontWeight="bold"
                          className="fill-slate-800 dark:fill-slate-100"
                        >
                          {pt.val}
                        </text>
                        <text
                          x={pt.x}
                          y={195}
                          textAnchor="middle"
                          fontSize="10"
                          className="fill-slate-400"
                        >
                          {pt.wk}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

              {/* Service Distribution Donut & Progress */}
              <div className="lg:col-span-4 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                    Job Category Distribution
                  </h4>
                  <p className="text-xs text-slate-500 mb-4">
                    Proportion of booked services
                  </p>

                  <div className="space-y-3.5 text-xs">
                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span>Emergency Pipe &amp; Leaks</span>
                        <span>42%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div className="h-full bg-rose-500 rounded-full w-[42%]"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span>Drain Hydro-Jetting</span>
                        <span>26%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div className="h-full bg-sky-500 rounded-full w-[26%]"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span>Water Heater Systems</span>
                        <span>18%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full w-[18%]"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span>Commercial Backflow &amp; Traps</span>
                        <span>14%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div className="h-full bg-teal-500 rounded-full w-[14%]"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 flex justify-between">
                  <span>Active Service Trucks: <strong>4 Online</strong></span>
                  <span>Avg Ticket: <strong>$345</strong></span>
                </div>
              </div>
            </div>

            {/* Technicians Utilization & Fleet Overview */}
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                Field Technician Fleet Status &amp; Dispatch Capacity
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {technicians.map(tech => (
                  <div
                    key={tech.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">
                        {tech.name}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                          tech.status === 'available'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : tech.status === 'on_job'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        {tech.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="text-slate-500">
                      {tech.specialty}
                    </div>

                    <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-700 text-[11px]">
                      <span>Vehicle: <strong>{tech.vehicleNumber}</strong></span>
                      <span>Rating: <strong>{tech.rating} ★</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 2: DISPATCH & BOOKINGS MANAGEMENT                */}
        {/* ---------------------------------------------------- */}
        {adminTab === 'dispatch' && (
          <div className="space-y-4">
            {/* Search and Status Filters */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search by ID, client, or address..."
                  value={dispatchSearch}
                  onChange={(e) => setDispatchSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto">
                {['all', 'pending', 'confirmed', 'dispatched', 'in_progress', 'completed'].map(st => (
                  <button
                    key={st}
                    onClick={() => setDispatchStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors whitespace-nowrap ${
                      dispatchStatusFilter === st
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings Table */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                  <thead className="bg-slate-50 dark:bg-slate-800/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="px-4 py-3">Ticket ID</th>
                      <th className="px-4 py-3">Client &amp; Location</th>
                      <th className="px-4 py-3">Service &amp; Priority</th>
                      <th className="px-4 py-3">Schedule</th>
                      <th className="px-4 py-3">Assigned Crew</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredBookings.map(b => (
                      <tr key={b.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-4 py-3 font-mono font-bold text-sky-600 dark:text-sky-400">
                          {b.id}
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-bold text-slate-900 dark:text-white">{b.customerName}</div>
                          <div className="text-[11px] text-slate-500">{b.address}, {b.city}</div>
                          <div className="text-[10px] text-slate-400">{b.phone}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-semibold text-slate-800 dark:text-slate-200">{b.serviceCategory}</div>
                          <span
                            className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                              b.priority === 'emergency'
                                ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                                : b.priority === 'urgent'
                                ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                            }`}
                          >
                            {b.priority}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium">{b.preferredDate}</div>
                          <div className="text-[10px] text-slate-400">{b.timeSlot}</div>
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={b.assignedTechnicianId || ''}
                            onChange={(e) => assignTechnicianToBooking(b.id, e.target.value)}
                            className="px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200"
                          >
                            <option value="">Select Technician</option>
                            {technicians.map(t => (
                              <option key={t.id} value={t.id}>{t.name}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={b.status}
                            onChange={(e) => updateBookingStatus(b.id, e.target.value as BookingStatus)}
                            className={`px-2 py-1 rounded-lg text-xs font-bold capitalize border ${
                              b.status === 'completed'
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : b.status === 'dispatched' || b.status === 'in_progress'
                                ? 'bg-amber-50 border-amber-300 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                : 'bg-slate-50 border-slate-300 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => setSelectedTicketForDetail(b)}
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-sky-100 dark:hover:bg-sky-950 text-slate-600 dark:text-slate-300 hover:text-sky-600 transition-colors"
                            title="View Full Ticket Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 3: TECHNICIAN FIELD PORTAL                       */}
        {/* ---------------------------------------------------- */}
        {adminTab === 'technician' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-sky-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-sky-300">
                  Technician Mobile Terminal
                </span>
                <h3 className="text-xl font-bold">
                  Assigned Field Work Orders
                </h3>
                <p className="text-xs text-sky-200 mt-0.5">
                  Update job progress, log parts installed, and finalize completed invoices on site.
                </p>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-sky-800 border border-sky-700 text-xs">
                Active Tech ID: <strong>{activeTechId}</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {technicianJobs.map(job => (
                <div
                  key={job.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div>
                      <span className="font-mono text-xs font-extrabold text-sky-600 dark:text-sky-400">
                        {job.id}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {job.serviceCategory}
                      </h4>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase ${
                        job.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {job.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="text-xs space-y-1.5 text-slate-600 dark:text-slate-300">
                    <div><strong>Customer:</strong> {job.customerName} ({job.phone})</div>
                    <div><strong>Address:</strong> {job.address}, {job.city}</div>
                    <div><strong>Client Notes:</strong> {job.description}</div>
                    {job.technicianNotes && (
                      <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                        <strong>Technician Log:</strong> {job.technicianNotes}
                      </div>
                    )}
                    {job.partsUsed && job.partsUsed.length > 0 && (
                      <div>
                        <strong>Parts Installed:</strong> {job.partsUsed.join(', ')}
                      </div>
                    )}
                  </div>

                  {/* Technician quick action controls */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => updateBookingStatus(job.id, 'dispatched', 'Technician en route to client location')}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold text-slate-800 dark:text-slate-200"
                    >
                      En Route
                    </button>
                    <button
                      onClick={() => updateBookingStatus(job.id, 'in_progress', 'On site. Water supply isolated & diagnosing')}
                      className="px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 dark:bg-amber-950 text-xs font-semibold text-amber-800 dark:text-amber-200"
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => updateBookingStatus(job.id, 'completed', 'Repair verified leak-free. Workmanship guaranteed.')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-xs"
                    >
                      Mark Completed
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 4: AUTOMATED EMAIL NOTIFICATION LOGS             */}
        {/* ---------------------------------------------------- */}
        {adminTab === 'emails' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Automated Email Notification Activity Log
                </h3>
                <p className="text-xs text-slate-500">
                  Real-time transactional emails triggered for appointments, technician dispatches, and emergency alerts.
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                Email Dispatch Gateway Active
              </span>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-800 text-[11px] font-bold uppercase text-slate-500 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Timestamp</th>
                    <th className="px-4 py-3">Recipient</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Subject</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Preview</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {emailLogs.map(em => (
                    <tr key={em.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850">
                      <td className="px-4 py-3 whitespace-nowrap text-slate-400 font-mono text-[11px]">
                        {new Date(em.timestamp).toLocaleTimeString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-900 dark:text-white">{em.recipientName}</div>
                        <div className="text-[11px] text-slate-500">{em.recipientEmail}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {em.templateType.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                        {em.subject}
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center space-x-1 text-emerald-600 font-semibold">
                          <Check className="w-3.5 h-3.5" />
                          <span>Delivered</span>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => setPreviewEmail(em)}
                          className="px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 text-xs font-semibold"
                        >
                          View HTML
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 5: DATABASE BACKUPS & DISASTER RECOVERY          */}
        {/* ---------------------------------------------------- */}
        {adminTab === 'backups' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  Data Persistence &amp; Integrity
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Database Snapshot Backups &amp; Disaster Recovery
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Create encrypted snapshots of all active bookings, technicians, audit logs, and settings.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={downloadBackupJson}
                  className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow"
                >
                  <Save className="w-4 h-4" />
                  <span>Create &amp; Download Backup</span>
                </button>
                <button
                  onClick={resetToFactoryDefaults}
                  className="px-3.5 py-2.5 rounded-xl border border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 text-xs font-semibold flex items-center space-x-1"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset Seed</span>
                </button>
              </div>
            </div>

            {/* Existing Backups List */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                Available Snapshot Versions
              </h4>

              {backups.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">
                  <Database className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-50" />
                  No local snapshots created yet. Click "Create &amp; Download Backup" above to generate your first backup.
                </div>
              ) : (
                <div className="space-y-3">
                  {backups.map(bck => (
                    <div
                      key={bck.id}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">{bck.id}</div>
                        <div className="text-slate-500 text-[11px]">
                          Created: {new Date(bck.timestamp).toLocaleString()} • Size: {bck.sizeKb} KB • Records: {bck.recordCount}
                        </div>
                        <div className="font-mono text-[10px] text-slate-400">
                          Checksum: {bck.checksum}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (confirm(`Restore database from snapshot ${bck.id}? Current unsaved data will be replaced.`)) {
                            restoreFromBackup(bck);
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg bg-sky-600 text-white font-semibold text-xs shadow-xs"
                      >
                        Restore Snapshot
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 6: SECURITY AUDIT LOGS                           */}
        {/* ---------------------------------------------------- */}
        {adminTab === 'audit' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Immutable Security Audit Trail
                </h3>
                <p className="text-xs text-slate-500">
                  All administrative privilege transitions, dispatch changes, and backups are recorded here.
                </p>
              </div>
              <span className="text-xs text-slate-400">Total Entries: {auditLogs.length}</span>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-800 text-[11px] font-bold uppercase text-slate-500 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Timestamp</th>
                    <th className="px-4 py-3">Actor &amp; Role</th>
                    <th className="px-4 py-3">Action</th>
                    <th className="px-4 py-3">Details</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {auditLogs.map(log => (
                    <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850">
                      <td className="px-4 py-3 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-900 dark:text-white">{log.actor}</div>
                        <div className="text-[10px] text-sky-600 dark:text-sky-400 uppercase font-semibold">{log.role}</div>
                      </td>
                      <td className="px-4 py-3 font-mono font-bold text-slate-800 dark:text-slate-200 text-[11px]">
                        {log.action}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                        {log.details}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            log.status === 'success'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : log.status === 'warning'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                              : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 7: RBAC & SYSTEM NOTIFICATION CONFIG             */}
        {/* ---------------------------------------------------- */}
        {adminTab === 'settings' && (
          <div className="space-y-6">
            {/* User Roles & Permissions Matrix */}
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                User Role-Based Access Control (RBAC) Matrix
              </h4>
              <p className="text-xs text-slate-500 mb-6">
                Enforce granular privilege levels for administrators, dispatchers, field technicians, and customers.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                  <thead className="bg-slate-50 dark:bg-slate-800 text-[11px] font-bold uppercase text-slate-500 border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="px-4 py-3">User</th>
                      <th className="px-4 py-3">Assigned Role</th>
                      <th className="px-4 py-3 text-center">Dispatch Access</th>
                      <th className="px-4 py-3 text-center">Export Reports</th>
                      <th className="px-4 py-3 text-center">Database Backups</th>
                      <th className="px-4 py-3 text-center">User Management</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {allUsers.map(u => (
                      <tr key={u.id}>
                        <td className="px-4 py-3">
                          <div className="font-bold text-slate-900 dark:text-white">{u.name}</div>
                          <div className="text-[11px] text-slate-500">{u.email}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                            {u.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="checkbox"
                            checked={u.permissions.canDispatch}
                            onChange={(e) => updateUserPermissions(u.id, { ...u.permissions, canDispatch: e.target.checked })}
                            className="rounded text-sky-600"
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="checkbox"
                            checked={u.permissions.canExportReports}
                            onChange={(e) => updateUserPermissions(u.id, { ...u.permissions, canExportReports: e.target.checked })}
                            className="rounded text-sky-600"
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="checkbox"
                            checked={u.permissions.canManageBackups}
                            onChange={(e) => updateUserPermissions(u.id, { ...u.permissions, canManageBackups: e.target.checked })}
                            className="rounded text-sky-600"
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="checkbox"
                            checked={u.permissions.canManageUsers}
                            onChange={(e) => updateUserPermissions(u.id, { ...u.permissions, canManageUsers: e.target.checked })}
                            className="rounded text-sky-600"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Notification Alert Rules */}
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Real-Time Performance Alert &amp; Dispatch Thresholds
              </h4>
              <p className="text-xs text-slate-500 mb-6">
                Configure automated threshold triggers for SLA response breaches and revenue alerts.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <label className="flex items-center space-x-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings.emailCustomerConfirmation}
                    onChange={(e) => updateNotificationSettings({ emailCustomerConfirmation: e.target.checked })}
                    className="rounded text-sky-600"
                  />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Customer Booking Confirmation</div>
                    <div className="text-slate-500">Send automated email with arrival slot &amp; ticket reference</div>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings.emailTechnicianDispatch}
                    onChange={(e) => updateNotificationSettings({ emailTechnicianDispatch: e.target.checked })}
                    className="rounded text-sky-600"
                  />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Technician Dispatch Alerts</div>
                    <div className="text-slate-500">Alert mobile technician immediately when ticket is assigned</div>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings.emailEmergencyAlerts}
                    onChange={(e) => updateNotificationSettings({ emailEmergencyAlerts: e.target.checked })}
                    className="rounded text-sky-600"
                  />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Emergency Dispatch Priority Broadcast</div>
                    <div className="text-slate-500">Instant high-priority dispatch emails for burst pipes &amp; leaks</div>
                  </div>
                </label>

                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-900 dark:text-white mb-1">
                    Emergency SLA Breach Limit (Minutes)
                  </div>
                  <input
                    type="number"
                    value={notificationSettings.emergencySlaMinutes}
                    onChange={(e) => updateNotificationSettings({ emergencySlaMinutes: parseInt(e.target.value) || 25 })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
                  />
                  <div className="text-[11px] text-slate-500 mt-1">
                    Dispatches not accepted within this window will trigger an escalation alarm.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* EMAIL HTML PREVIEW MODAL                             */}
        {/* ---------------------------------------------------- */}
        {previewEmail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase text-sky-600">
                    Automated Transactional Email Preview
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {previewEmail.subject}
                  </h4>
                </div>
                <button
                  onClick={() => setPreviewEmail(null)}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-xs text-slate-500 space-y-1">
                <div><strong>To:</strong> {previewEmail.recipientName} &lt;{previewEmail.recipientEmail}&gt;</div>
                <div><strong>Sent:</strong> {new Date(previewEmail.timestamp).toLocaleString()}</div>
              </div>

              <div 
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs leading-relaxed text-slate-800 dark:text-slate-200"
                dangerouslySetInnerHTML={{ __html: previewEmail.bodyHtml }}
              />

              <div className="text-right pt-2">
                <button
                  onClick={() => setPreviewEmail(null)}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* EXECUTIVE PRINTABLE PDF / REPORT MODAL               */}
        {/* ---------------------------------------------------- */}
        {isReportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="w-full max-w-3xl bg-white text-slate-900 rounded-2xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6 print:m-0 print:p-0">
              {/* Header */}
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-slate-900">
                    AquaPro Plumbing &amp; Emergency Services
                  </h2>
                  <p className="text-xs text-slate-500">
                    Monthly Performance &amp; Operations Executive Report • Period: {reportDateRange}
                  </p>
                </div>

                <div className="flex items-center space-x-2 print:hidden">
                  <button
                    onClick={handlePrintPdfReport}
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print / Save as PDF</span>
                  </button>
                  <button
                    onClick={() => setIsReportModalOpen(false)}
                    className="p-2 rounded-lg text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* KPI Summary Block */}
              <div className="grid grid-cols-4 gap-4 text-xs">
                <div className="p-3 rounded-lg bg-slate-100">
                  <div className="text-slate-500 font-semibold">Total Revenue</div>
                  <div className="text-lg font-black text-slate-900">${analyticsSummary.totalRevenue.toLocaleString()}</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-100">
                  <div className="text-slate-500 font-semibold">Total Bookings</div>
                  <div className="text-lg font-black text-slate-900">{analyticsSummary.totalBookings}</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-100">
                  <div className="text-slate-500 font-semibold">Response SLA</div>
                  <div className="text-lg font-black text-emerald-600">{analyticsSummary.avgSlaResponseTime}</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-100">
                  <div className="text-slate-500 font-semibold">CSAT Rating</div>
                  <div className="text-lg font-black text-slate-900">{analyticsSummary.csatRating}</div>
                </div>
              </div>

              {/* Bookings Ledger in Report */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">
                  Service Ledger Sample ({bookings.length} Records)
                </h4>
                <table className="w-full text-left text-xs border border-slate-200">
                  <thead className="bg-slate-100 text-[10px] uppercase font-bold text-slate-600">
                    <tr>
                      <th className="p-2 border-b">ID</th>
                      <th className="p-2 border-b">Customer</th>
                      <th className="p-2 border-b">Service Category</th>
                      <th className="p-2 border-b">Priority</th>
                      <th className="p-2 border-b">Price</th>
                      <th className="p-2 border-b">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {bookings.map(b => (
                      <tr key={b.id}>
                        <td className="p-2 font-mono font-bold">{b.id}</td>
                        <td className="p-2">{b.customerName}</td>
                        <td className="p-2">{b.serviceCategory}</td>
                        <td className="p-2 uppercase font-semibold">{b.priority}</td>
                        <td className="p-2 font-bold">${b.finalPrice || b.estimatedPrice}</td>
                        <td className="p-2 uppercase text-[10px] font-bold">{b.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pt-4 border-t text-[11px] text-slate-400 flex justify-between">
                <span>Generated by AquaPro Dispatch Engine v2.4</span>
                <span>Audit Signature: Validated Licensed Contractor</span>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TICKET DETAIL MODAL                                  */}
        {/* ---------------------------------------------------- */}
        {selectedTicketForDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                    {selectedTicketForDetail.id}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {selectedTicketForDetail.serviceCategory}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedTicketForDetail(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-xs space-y-2 text-slate-600 dark:text-slate-300">
                <div><strong>Client Name:</strong> {selectedTicketForDetail.customerName}</div>
                <div><strong>Phone:</strong> {selectedTicketForDetail.phone}</div>
                <div><strong>Email:</strong> {selectedTicketForDetail.email}</div>
                <div><strong>Address:</strong> {selectedTicketForDetail.address}, {selectedTicketForDetail.city}</div>
                <div><strong>Client Type:</strong> <span className="capitalize">{selectedTicketForDetail.clientType}</span></div>
                <div><strong>Priority:</strong> <span className="capitalize">{selectedTicketForDetail.priority}</span></div>
                <div><strong>Schedule:</strong> {selectedTicketForDetail.preferredDate} ({selectedTicketForDetail.timeSlot})</div>
                <div><strong>Estimated Cost:</strong> ${selectedTicketForDetail.estimatedPrice}</div>
                <div><strong>Assigned Technician:</strong> {selectedTicketForDetail.assignedTechnicianName || 'Unassigned'}</div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border">
                  <strong>Customer Description:</strong>
                  <p className="mt-1 text-slate-700 dark:text-slate-300">{selectedTicketForDetail.description}</p>
                </div>
              </div>

              <div className="text-right pt-2">
                <button
                  onClick={() => setSelectedTicketForDetail(null)}
                  className="px-4 py-2 rounded-xl bg-sky-600 text-white font-semibold text-xs shadow"
                >
                  Close Detail
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
