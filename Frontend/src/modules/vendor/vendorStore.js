const STORAGE_KEY = 'vendor-panel-state';

const todayISO = () => new Date().toISOString().slice(0, 10);

export const defaultVendorState = {
  registration: {
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    city: '',
    category: '',
    password: ''
  },
  verification: {
    phoneVerified: false,
    emailVerified: false
  },
  businessDetails: {
    description: '',
    years: '',
    teamSize: '',
    languages: [],
    serviceCities: []
  },
  services: [],
  pricing: {
    range: '',
    notes: ''
  },
  portfolio: [],
  documents: {
    idProof: false,
    gst: false,
    contract: false
  },
  bank: {
    accountName: '',
    accountNumber: '',
    ifsc: '',
    upiId: ''
  },
  listingStatus: 'Draft',
  leads: [
    {
      id: 'lead-1',
      customerName: 'Ananya Sharma',
      phone: '+91 98765 43210',
      eventDate: '2026-04-12',
      eventLocation: 'Indore',
      message: 'Looking for full decor package for 300 guests.',
      status: 'New'
    },
    {
      id: 'lead-2',
      customerName: 'Rohit Verma',
      phone: '+91 98220 11444',
      eventDate: '2026-05-05',
      eventLocation: 'Bhopal',
      message: 'Need stage + lighting only.',
      status: 'Contacted'
    }
  ],
  quotes: [
    {
      id: 'qt-1',
      customerName: 'Ananya Sharma',
      items: [
        { label: 'Decoration', amount: 40000 },
        { label: 'Lighting', amount: 10000 },
        { label: 'Stage', amount: 15000 }
      ],
      status: 'Pending'
    }
  ],
  bookings: [
    {
      id: 'bk-1',
      customerName: 'Rohit Verma',
      eventDate: '2026-05-05',
      location: 'Bhopal',
      services: ['Reception Decoration'],
      totalPrice: 30000,
      status: 'Confirmed'
    }
  ],
  availability: {
    blockedDates: [todayISO()]
  },
  analytics: {
    profileViews: 1240,
    inquiries: 38,
    bookings: 12,
    conversionRate: 31
  },
  notifications: [
    { id: 'nt-1', message: 'New inquiry received from Ananya Sharma', time: '2 hours ago' },
    { id: 'nt-2', message: 'Quote accepted by Rohit Verma', time: '1 day ago' }
  ]
};

export const loadVendorState = () => {
  if (typeof window === 'undefined') return defaultVendorState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultVendorState;
    const parsed = JSON.parse(raw);
    
    // Deep merge or at least merge main sections
    return {
      ...defaultVendorState,
      ...parsed,
      registration: { ...defaultVendorState.registration, ...parsed.registration },
      verification: { ...defaultVendorState.verification, ...parsed.verification },
      businessDetails: { ...defaultVendorState.businessDetails, ...parsed.businessDetails },
      pricing: { ...defaultVendorState.pricing, ...parsed.pricing },
      documents: { ...defaultVendorState.documents, ...parsed.documents },
      bank: { ...defaultVendorState.bank, ...parsed.bank },
      analytics: { ...defaultVendorState.analytics, ...parsed.analytics }
    };
  } catch (error) {
    return defaultVendorState;
  }
};

export const saveVendorState = (state) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const computeProfileCompletion = (state) => {
  const sections = [
    state.registration?.fullName,
    state.verification?.phoneVerified && state.verification?.emailVerified,
    state.businessDetails?.description,
    (state.services || []).length > 0,
    state.pricing?.range,
    (state.portfolio || []).length > 0,
    state.documents?.idProof && state.documents?.gst,
    state.bank?.accountNumber
  ];
  const completed = sections.filter(Boolean).length;
  return Math.round((completed / sections.length) * 100);
};

export const getListingStatusClass = (status) => {
  switch (status) {
    case 'Approved':
      return 'vendor-status-approved';
    case 'Pending':
      return 'vendor-status-pending';
    case 'Rejected':
      return 'vendor-status-rejected';
    case 'Suspended':
      return 'vendor-status-suspended';
    default:
      return 'vendor-status-draft';
  }
};
