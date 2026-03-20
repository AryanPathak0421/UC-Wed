import { useRef, useState, useEffect, useCallback } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Icon from '../../../components/ui/Icon';
import { useVendorState } from '../useVendorState';
import { vendorApi } from '../vendorApi';

const steps = [
  { id: 'business', label: 'Business Details' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'documents', label: 'Documents' },
  { id: 'bank', label: 'Bank Details' }
];

const VendorOnboarding = () => {
  const { stepId } = useParams();
  const navigate = useNavigate();
  const { vendorState, updateVendorState } = useVendorState();
  const currentStepIndex = Math.max(0, steps.findIndex((step) => step.id === stepId));

  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    setToast({ show: true, message, type });
    if (duration > 0) {
      setTimeout(() => setToast((prev) => (prev.message === message ? { ...prev, show: false } : prev)), duration);
    }
  }, []);

  const [newItem, setNewItem] = useState({ title: '', tag: '' });
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    category: '',
    basePrice: '',
    inclusions: ['', '']
  });
  const fileInputRef = useRef(null);
  const docInputRefs = {
    idProof: useRef(null),
    gst: useRef(null),
    contract: useRef(null)
  };

  const handleSaveService = () => {
    if (!newService.name || !newService.category || !newService.basePrice) {
      alert('Please fill in all basic fields.');
      return;
    }
    const serviceToAdd = {
      id: `s-${Date.now()}`,
      name: newService.name,
      category: newService.category,
      basePrice: Number(newService.basePrice),
      packages: [
        { name: 'Standard', price: Number(newService.basePrice) },
        { name: 'Premium', price: Number(newService.basePrice) * 1.5 }
      ],
      inclusions: newService.inclusions.filter(Boolean)
    };
    updateVendorState({ services: [...vendorState.services, serviceToAdd] });
    setShowServiceModal(false);
    setNewService({ name: '', category: '', basePrice: '', inclusions: ['', ''] });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDocClick = (key) => {
    docInputRefs[key].current?.click();
  };

  const handleDocChange = async (key, event) => {
    const file = event.target.files?.[0];
    const token = localStorage.getItem('vendorToken');
    if (file && token) {
      showToast(`Uploading ${key === 'idProof' ? 'ID Proof' : key === 'gst' ? 'GST' : 'Agreement'}...`, 'loading', 0);
      try {
        const res = await vendorApi.uploadMedia(file, token);
        if (res.success && res.url) {
          updateVendorState({ documents: { ...vendorState.documents, [key]: res.url } });
          showToast('Document uploaded successfully! ✨', 'success');
          event.target.value = '';
        } else {
          showToast(res.message || 'Upload failed', 'error');
        }
      } catch (err) {
        showToast('Server error during document upload', 'error');
      }
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    const token = localStorage.getItem('vendorToken');
    if (file && newItem.title && token) {
      showToast('Uploading to portfolio...', 'loading', 0);
      try {
        const res = await vendorApi.uploadMedia(file, token);
        if (res.success && res.url) {
          updateVendorState({
            portfolio: [
              ...vendorState.portfolio,
              { id: Date.now().toString(), type: 'Photo', title: newItem.title, tag: newItem.tag || 'General', url: res.url }
            ]
          });
          setNewItem({ title: '', tag: '' });
          showToast('Portfolio item added! ✨', 'success');
          event.target.value = '';
        } else {
          showToast(res.message || 'Upload failed', 'error');
        }
      } catch (err) {
        showToast('Server error during upload', 'error');
      }
    } else if (!newItem.title) {
      showToast('Please enter a project title first', 'info');
    }
  };

  const isStepComplete = (id) => {
    switch (id) {
      case 'business':
        const { description, years, teamSize, languages, serviceCities } = vendorState.businessDetails;
        return description && years && teamSize && languages.some(l => l.trim()) && serviceCities.some(l => l.trim());
      case 'services':
        return vendorState.services.length > 0;
      case 'pricing':
        return !!vendorState.pricing.range;
      case 'portfolio':
        return vendorState.portfolio.length > 0;
      case 'documents':
        return vendorState.documents.idProof && vendorState.documents.gst;
      case 'bank':
        return vendorState.bank.accountName && vendorState.bank.accountNumber && vendorState.bank.ifsc;
      default:
        return true;
    }
  };

  const canNavigateTo = (targetIndex) => {
    if (targetIndex <= currentStepIndex) return true;
    for (let i = 0; i < targetIndex; i++) {
      if (!isStepComplete(steps[i].id)) {
        return { complete: false, stepLabel: steps[i].label };
      }
    }
    return { complete: true };
  };

  const handleStepClick = (e, index, id) => {
    if (index === currentStepIndex) {
      e.preventDefault();
      return;
    }
    const check = canNavigateTo(index);
    if (!check.complete) {
      e.preventDefault();
      alert(`⚠️ Please complete "${check.stepLabel}" before moving forward.`);
    }
  };

  const handleNext = async () => {
    const check = canNavigateTo(currentStepIndex + 1);
    if (!check.complete) {
      alert(`⚠️ Requirement Missing: Please finish "${check.stepLabel}" to continue.`);
      return;
    }

    const stepData = vendorState[stepId] || vendorState.businessDetails; // Map step to correct state object
    const token = localStorage.getItem('vendorToken');

    if (token) {
      try {
        const res = await vendorApi.updateOnboarding(stepId, stepData, token);
        if (res.success) {
          updateVendorState({ vendor: res.data });
        }
      } catch (err) {
        console.error('Failed to sync onboarding step with backend:', err);
      }
    }

    if (currentStepIndex === steps.length - 1) {
      navigate('/vendor/dashboard');
    } else {
      navigate('/vendor/onboarding/' + steps[currentStepIndex + 1].id);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-4 px-1 sm:px-2 relative z-10">
      <div className="rounded-3xl p-2.5 sm:p-6 shadow-2xl relative overflow-hidden transition-all duration-700" style={{
        ...(stepId === 'business' ? {
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0.45)), url(/assets/vendor/engeg.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } : stepId === 'services' ? {
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0.45)), url(/assets/vendor/cheerleader-exactly-captured-right-moment.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } : stepId === 'pricing' ? {
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0.45)), url(/assets/vendor/download.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } : stepId === 'portfolio' ? {
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0.45)), url("/assets/vendor/PERFECT WEDDING DAY OUTFIT IDEA.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } : stepId === 'documents' ? {
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0.45)), url("/assets/vendor/download (1).jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } : stepId === 'bank' ? {
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0.45)), url("/assets/vendor/Red Wedding Arch.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } : {
          background: 'rgba(255, 255, 255, 0.85)'
        }),
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(210, 138, 140, 0.1)'
      }}>
        {/* Top gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-2 rounded-t-[2.5rem]" style={{
          background: 'linear-gradient(90deg, #D28A8C, #C27A7C, #a855f7, #D28A8C)',
          backgroundSize: '200% 100%',
          animation: 'gradient-shift 4s ease infinite'
        }}></div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] drop-shadow-sm" style={{ color: '#9f1239' }}>Vendor Onboarding</p>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5 drop-shadow-md">Complete your profile</h2>
            <p className="text-xs sm:text-sm font-semibold mt-0.5" style={{ color: '#1e293b' }}>Finish setup to boost visibility and unlock leads.</p>
          </div>
          <div className="relative">
            <img src="/assets/vendor/success.png" alt="Celebration" className="h-20 sm:h-32 w-auto absolute -top-12 sm:-top-20 -right-2 sm:-right-8 animate-[pulse-glow_4s_ease-in-out_infinite] img-transparent-fix" />
          </div>
        </div>

        {/* Responsive Space-Optimized Step Navigation */}
        {/* Responsive Space-Optimized Step Navigation */}
        <div className="mt-4 flex justify-between items-center w-full px-2 sm:px-4 max-w-full mx-auto">
          {steps.map((step, index) => (
            <div key={step.id} className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : 'flex-none'}`}>
              <NavLink
                to={'/vendor/onboarding/' + step.id}
                onClick={(e) => handleStepClick(e, index, step.id)}
                className="h-8 w-8 sm:h-10 sm:w-10 shrink-0 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold transition-all shadow-md z-10"
                style={index === currentStepIndex
                  ? { background: 'linear-gradient(135deg, #be123c, #9f1239)', color: 'white', border: '2px solid white', boxShadow: '0 4px 15px rgba(159, 18, 57, 0.4)', transform: 'scale(1.15)' }
                  : index < currentStepIndex
                    ? { background: 'white', color: '#9f1239', border: '2px solid #9f1239' }
                    : { background: 'rgba(255, 255, 255, 0.9)', color: '#64748b', border: '2px dashed #cbd5e1' }
                }
              >
                {index < currentStepIndex ? '✓' : index + 1}
              </NavLink>
              {index < steps.length - 1 && (
                <div className="h-0.5 rounded w-full flex-1 shrink mx-1.5 sm:mx-3 transition-all shadow-inner" style={{
                   background: index < currentStepIndex ? 'linear-gradient(90deg, #be123c, #9f1239)' : 'rgba(255, 255, 255, 0.5)'
                }}></div>
              )}
            </div>
          ))}
        </div>

        {/* Dynamic Centered Step Heading */}
        <div className="mt-2 mb-3 flex flex-col items-center justify-center text-center px-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight drop-shadow-lg bg-white/90 px-5 py-2.5 rounded-[1.5rem] border-2 border-white backdrop-blur-md shadow-xl inline-block">
            {steps[currentStepIndex]?.label}
          </h2>
          <div className="h-1 w-16 rounded-full mt-1.5 shadow-sm" style={{ background: 'linear-gradient(90deg, #be123c, #fb7185)' }}></div>
        </div>

        <div className="mt-6">
          {stepId === 'business' && (
            <div className="space-y-6 max-w-2xl mx-auto">
              {/* 1. Description */}
              <div className="space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#1e293b' }}>
                  Business description <span style={{ color: '#be123c' }}>*</span>
                </label>
                <textarea
                  autoFocus
                  className="w-full rounded-2xl px-5 py-4 text-sm font-semibold transition-all focus:ring-2 focus:ring-rose-500/20 resize-none"
                  style={{
                    border: '1px solid rgba(210, 138, 140, 0.15)',
                    background: 'rgba(255, 255, 255, 0.95)',
                    minHeight: '120px'
                  }}
                  value={vendorState.businessDetails.description}
                  onChange={(event) => updateVendorState({
                    businessDetails: { ...vendorState.businessDetails, description: event.target.value }
                  })}
                  placeholder="Describe your journey, specialized skills, and what makes your service exceptional..."
                />
              </div>

              {/* 2. Experience & Team - Reveal when description has content */}
              {vendorState.businessDetails.description?.length > 10 && (
                <div className="grid gap-4 sm:grid-cols-2 animate-in fade-in slide-in-from-bottom-3 duration-500">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#1e293b' }}>
                      Years of experience <span style={{ color: '#be123c' }}>*</span>
                    </label>
                    <input
                      className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all focus:ring-2 focus:ring-rose-500/20"
                      style={{
                        border: '1px solid rgba(210, 138, 140, 0.15)',
                        background: 'rgba(255, 255, 255, 0.95)'
                      }}
                      value={vendorState.businessDetails.years}
                      placeholder="e.g. 5"
                      onKeyDown={(e) => {
                        if (e.key.length === 1 && !/[0-9]/.test(e.key)) e.preventDefault();
                      }}
                      onChange={(event) => updateVendorState({
                        businessDetails: { ...vendorState.businessDetails, years: event.target.value.replace(/[^0-9]/g, '') }
                      })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#1e293b' }}>
                      Team size <span style={{ color: '#be123c' }}>*</span>
                    </label>
                    <input
                      className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all focus:ring-2 focus:ring-rose-500/20"
                      style={{
                        border: '1px solid rgba(210, 138, 140, 0.15)',
                        background: 'rgba(255, 255, 255, 0.95)'
                      }}
                      value={vendorState.businessDetails.teamSize}
                      placeholder="e.g. 8"
                      onKeyDown={(e) => {
                        if (e.key.length === 1 && !/[0-9]/.test(e.key)) e.preventDefault();
                      }}
                      onChange={(event) => updateVendorState({
                        businessDetails: { ...vendorState.businessDetails, teamSize: event.target.value.replace(/[^0-9]/g, '') }
                      })}
                    />
                  </div>
                </div>
              )}

              {/* 3. Professional Details - Reveal when stats are filled */}
              {vendorState.businessDetails.years && vendorState.businessDetails.teamSize && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#1e293b' }}>
                      Languages spoken <span style={{ color: '#be123c' }}>*</span>
                    </label>
                    <input
                      className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all focus:ring-2 focus:ring-rose-500/20"
                      style={{
                        border: '1px solid rgba(210, 138, 140, 0.15)',
                        background: 'rgba(255, 255, 255, 0.95)'
                      }}
                      value={vendorState.businessDetails.languages.join(', ')}
                      onKeyDown={(e) => {
                        if (e.key >= '0' && e.key <= '9') e.preventDefault();
                      }}
                      onChange={(event) => {
                        const val = event.target.value.replace(/[0-9]/g, '');
                        updateVendorState({
                          businessDetails: { ...vendorState.businessDetails, languages: val.split(',').map(s => s.trimStart()) }
                        });
                      }}
                      placeholder="e.g. Hindi, English"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#1e293b' }}>
                      Service cities <span style={{ color: '#be123c' }}>*</span>
                    </label>
                    <input
                      className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all focus:ring-2 focus:ring-rose-500/20"
                      style={{
                        border: '1px solid rgba(210, 138, 140, 0.15)',
                        background: 'rgba(255, 255, 255, 0.95)'
                      }}
                      value={vendorState.businessDetails.serviceCities.join(', ')}
                      onKeyDown={(e) => {
                        if (e.key >= '0' && e.key <= '9') e.preventDefault();
                      }}
                      onChange={(event) => {
                        const val = event.target.value.replace(/[0-9]/g, '');
                        updateVendorState({
                          businessDetails: { ...vendorState.businessDetails, serviceCities: val.split(',').map(s => s.trimStart()) }
                        });
                      }}
                      placeholder="e.g. Indore, Bhopal"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {stepId === 'services' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white/85 backdrop-blur-md shadow-sm p-4 sm:p-6 rounded-3xl border border-[#F4DFDF]">
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide drop-shadow-sm">Manage Services</p>
                  <p className="text-[10px] sm:text-sm font-bold mt-1" style={{ color: '#475569' }}>Add your business offerings.</p>
                </div>
                <button
                  type="button"
                  className="vendor-cta rounded-2xl px-4 py-2.5 text-[10px] sm:text-xs font-bold tracking-wide shrink-0 ml-2"
                  onClick={() => setShowServiceModal(true)}
                >
                  ➕ Add service
                </button>
              </div>

              {showServiceModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto" style={{
                  background: 'rgba(15, 23, 42, 0.5)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)'
                }}>
                  <div className="w-full max-w-xl rounded-[2.5rem] p-8 sm:p-10 shadow-3xl relative my-8 overflow-hidden" style={{
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0.55)), url("/assets/vendor/download (2).jpeg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: '1px solid rgba(210, 138, 140, 0.2)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                  }}>
                    {/* Glassmorphic inner container for content */}
                    <div className="absolute inset-0 backdrop-blur-md -z-10"></div>

                    <div className="flex items-center justify-between mb-8">
                      <div className="relative">
                        <h3 className="text-2xl font-bold text-slate-900 leading-none drop-shadow-sm">Add New Service</h3>
                        <p className="text-sm font-bold mt-2" style={{ color: '#1e293b' }}>Create a new service listing for your profile.</p>
                      </div>
                      <button
                        onClick={() => setShowServiceModal(false)}
                        className="h-10 w-10 flex items-center justify-center rounded-full text-slate-400 hover:text-rose-600 transition-all active:scale-95 bg-white/80 border border-white"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#1e293b' }}>Service Name</label>
                          <input
                            className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all focus:ring-2 focus:ring-rose-500/20"
                            style={{
                              border: '1px solid rgba(210, 138, 140, 0.2)',
                              background: 'rgba(255, 255, 255, 0.95)'
                            }}
                            placeholder="e.g. Royal Stage Decor"
                            value={newService.name}
                            onKeyDown={(e) => {
                              if (e.key >= '0' && e.key <= '9') e.preventDefault();
                            }}
                            onChange={(e) => setNewService({ ...newService, name: e.target.value.replace(/[0-9]/g, '') })}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#1e293b' }}>Category</label>
                          <select
                            className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all appearance-none focus:ring-2 focus:ring-rose-500/20"
                            style={{
                              border: '1px solid rgba(210, 138, 140, 0.2)',
                              background: 'rgba(255, 255, 255, 0.95)'
                            }}
                            value={newService.category}
                            onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                          >
                            <option value="">Select Category</option>
                            <option>Decoration</option>
                            <option>Photography</option>
                            <option>Catering</option>
                            <option>Venue</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#1e293b' }}>Starting Price (₹)</label>
                        <input
                          type="number"
                          className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all focus:ring-2 focus:ring-rose-500/20"
                          style={{
                            border: '1px solid rgba(210, 138, 140, 0.2)',
                            background: 'rgba(255, 255, 255, 0.95)'
                          }}
                          placeholder="e.g. 50000"
                          value={newService.basePrice}
                          onChange={(e) => setNewService({ ...newService, basePrice: e.target.value })}
                        />
                      </div>

                      <div className="space-y-3 pt-2">
                        <p className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#1e293b' }}>Key Inclusions</p>
                        <div className="space-y-3">
                          {newService.inclusions.map((inc, idx) => (
                            <input
                              key={idx}
                              placeholder={`Service Feature ${idx + 1}`}
                              className="w-full rounded-2xl px-5 py-3 text-sm font-semibold transition-all outline-none focus:ring-2 focus:ring-rose-500/20"
                              style={{
                                border: '1px solid rgba(210, 138, 140, 0.15)',
                                background: 'rgba(255, 255, 255, 0.95)'
                              }}
                              value={inc}
                              onChange={(e) => {
                                const incs = [...newService.inclusions];
                                incs[idx] = e.target.value;
                                setNewService({ ...newService, inclusions: incs });
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      <button
                        className="vendor-cta w-full rounded-2xl py-5 font-bold text-lg mt-6 active:scale-95 transition-all shadow-xl"
                        style={{ background: 'linear-gradient(135deg, #be123c, #9f1239)' }}
                        onClick={handleSaveService}
                      >
                        ✨ Save Service
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {vendorState.services.length === 0 ? (
                <div className="rounded-3xl border border-dashed p-8 sm:p-16 text-center shadow-inner" style={{
                  borderColor: 'rgba(159, 18, 57, 0.4)',
                  background: 'rgba(255, 255, 255, 0.95)'
                }}>
                  <div className="text-3xl mb-3">✨</div>
                  <p className="text-xs sm:text-sm font-bold" style={{ color: '#9f1239' }}>No services added yet. Click &quot;Add service&quot; to get started.</p>
                </div>
              ) : (
                <div className="grid gap-5 md:grid-cols-2">
                  {vendorState.services.map((service) => (
                    <div key={service.id} className="rounded-3xl p-6 relative group transition-all hover:scale-[1.02]" style={{
                      background: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid rgba(210, 138, 140, 0.1)',
                      boxShadow: '0 4px 20px rgba(210, 138, 140, 0.05)'
                    }}>
                      <button
                        onClick={() => updateVendorState({ services: vendorState.services.filter(s => s.id !== service.id) })}
                        className="absolute -top-3 -right-3 h-8 w-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                        style={{
                          background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)',
                          border: '1px solid rgba(210, 138, 140, 0.2)',
                          color: '#A35E60'
                        }}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900 text-lg">{service.name}</h4>
                        <span className="rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider" style={{
                          background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)', color: '#A35E60'
                        }}>{service.category}</span>
                      </div>
                      <p className="mt-3 text-sm font-bold" style={{ color: '#D28A8C' }}>Base price: ₹{service.basePrice.toLocaleString()}</p>
                      <div className="mt-4 text-[10px] font-bold uppercase tracking-wider" style={{ color: '#334155' }}>Packages: <span style={{ color: '#64748b' }}>{service.packages.map((pkg) => pkg.name).join(', ')}</span></div>
                      {service.inclusions && service.inclusions.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {service.inclusions.map((inc, i) => (
                            <span key={i} className="px-3 py-1 rounded-full text-[10px] font-bold" style={{
                              background: 'rgba(253, 242, 248, 0.5)',
                              border: '1px solid rgba(210, 138, 140, 0.08)',
                              color: '#64748b'
                            }}>{inc}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {stepId === 'pricing' && (
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#334155' }}>
                  Price range <span style={{ color: '#D28A8C' }}>*</span>
                </label>
                <input
                  className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
                  style={{
                    border: '1px solid rgba(210, 138, 140, 0.15)',
                    background: 'rgba(255, 255, 255, 0.9)'
                  }}
                  value={vendorState.pricing.range}
                  placeholder="e.g. ₹50k - ₹2L"
                  onChange={(event) => updateVendorState({ pricing: { ...vendorState.pricing, range: event.target.value } })}
                />
              </div>
              <div className="space-y-2 lg:col-span-2">
                <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#334155' }}>Pricing notes</label>
                <textarea
                  className="h-32 w-full rounded-2xl px-5 py-4 text-sm font-semibold transition-all resize-none"
                  style={{
                    border: '1px solid rgba(210, 138, 140, 0.15)',
                    background: 'rgba(255, 255, 255, 0.9)'
                  }}
                  value={vendorState.pricing.notes}
                  placeholder="Any additional details about your pricing approach or travel charges..."
                  onChange={(event) => updateVendorState({ pricing: { ...vendorState.pricing, notes: event.target.value } })}
                />
              </div>
            </div>
          )}

          {stepId === 'portfolio' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white/85 backdrop-blur-md shadow-sm p-4 sm:p-6 rounded-3xl border border-[#F4DFDF]">
                <div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide drop-shadow-sm">Manage Portfolio</p>
                  <p className="text-[10px] sm:text-xs font-bold mt-1" style={{ color: '#475569' }}>Upload your work samples.</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="rounded-[2.5rem] border border-white/40 p-5 sm:p-8 shadow-xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(244,223,223,0.5))' }}>
                    <div className="absolute inset-0 backdrop-blur-sm -z-10"></div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: '#be123c' }}>Add new showcase</p>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#1e293b' }}>Project Title</label>
                        <input
                          className="w-full rounded-2xl px-5 py-2 text-sm font-semibold transition-all focus:ring-2 focus:ring-rose-500/10"
                          style={{ border: '1px solid rgba(210, 138, 140, 0.2)', background: 'rgba(255, 255, 255, 0.95)' }}
                          placeholder="e.g. Royal Palace Wedding"
                          value={newItem.title}
                          onKeyDown={(e) => {
                            if (e.key >= '0' && e.key <= '9') e.preventDefault();
                          }}
                          onChange={(e) => setNewItem({ ...newItem, title: e.target.value.replace(/[0-9]/g, '') })}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#1e293b' }}>Category Tag</label>
                        <input
                          className="w-full rounded-2xl px-5 py-2 text-sm font-semibold transition-all focus:ring-2 focus:ring-rose-500/10"
                          style={{ border: '1px solid rgba(210, 138, 140, 0.2)', background: 'rgba(255, 255, 255, 0.95)' }}
                          placeholder="e.g. Reception, Ceremony"
                          value={newItem.tag}
                          onKeyDown={(e) => {
                            if (e.key >= '0' && e.key <= '9') e.preventDefault();
                          }}
                          onChange={(e) => setNewItem({ ...newItem, tag: e.target.value.replace(/[0-9]/g, '') })}
                        />
                      </div>

                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <button
                        type="button"
                        className="vendor-cta w-full rounded-2xl py-2.5 font-bold text-sm mt-2 active:scale-95 transition-all"
                        onClick={handleUploadClick}
                      >
                        Select & Upload Media
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 grid-cols-2 h-fit">
                  {vendorState.portfolio.length === 0 ? (
                    <div className="col-span-2 rounded-[2rem] border-2 border-dashed p-12 text-center flex flex-col items-center justify-center shadow-inner" style={{
                      borderColor: 'rgba(159, 18, 57, 0.3)',
                      background: 'rgba(255, 255, 255, 0.95)'
                    }}>
                      <div className="text-4xl mb-3">📷</div>
                      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#9f1239' }}>Your portfolio is empty</p>
                    </div>
                  ) : (
                    vendorState.portfolio.map((item) => (
                      <div key={item.id} className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-[#FAF2F2]">
                        <img src={item.url} alt={item.title} className="h-40 w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                          <p className="text-sm font-bold text-white truncate">{item.title}</p>
                          <p className="text-[10px] text-[#E6B3B4] font-bold mt-0.5 tracking-wider uppercase">{item.tag}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {stepId === 'documents' && (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="lg:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/85 backdrop-blur-md shadow-sm p-4 sm:p-6 rounded-3xl border border-[#F4DFDF]">
                <div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide drop-shadow-sm">Required Uploads</p>
                  <p className="text-[10px] sm:text-xs font-bold mt-1" style={{ color: '#475569' }}>Identity and business verification.</p>
                </div>
              </div>
              {['idProof', 'gst', 'contract'].map((docKey) => (
                <div key={docKey} className="flex items-center justify-between rounded-3xl p-6 transition-all hover:scale-[1.02]" style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  border: '1px solid rgba(210, 138, 140, 0.1)',
                  boxShadow: '0 4px 20px rgba(210, 138, 140, 0.05)'
                }}>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: 'linear-gradient(135deg, #D28A8C, #C27A7C)' }}>
                        {docKey === 'idProof' ? '1' : docKey === 'gst' ? '2' : '3'}
                      </div>
                      <p className="text-sm font-bold text-slate-900">
                        {docKey === 'idProof' ? 'ID Proof (Aadhar/PAN)' : docKey === 'gst' ? 'GST Certificate' : 'Service Agreement'}
                      </p>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-wider ml-9" style={{ color: '#334155' }}>PDF, JPG (Max 5MB)</p>
                  </div>
                  <input
                    type="file"
                    ref={(el) => (docInputRefs[docKey].current = el)}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleDocChange(docKey, e)}
                  />
                  <button
                    type="button"
                    className="rounded-2xl px-5 py-3 text-xs font-bold transition-all active:scale-95 whitespace-nowrap"
                    style={vendorState.documents[docKey]
                      ? { background: 'linear-gradient(135deg, #D28A8C, #C27A7C)', color: 'white', boxShadow: '0 4px 15px rgba(210, 138, 140, 0.3)' }
                      : { background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)', color: '#A35E60', border: '1px solid rgba(210, 138, 140, 0.15)' }}
                    onClick={() => handleDocClick(docKey)}
                  >
                    {vendorState.documents[docKey] ? '✓ Uploaded' : 'Upload File'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {stepId === 'bank' && (
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="lg:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/85 backdrop-blur-md shadow-sm p-6 rounded-3xl border border-[#F4DFDF]">
                <div>
                  <p className="text-sm font-bold text-slate-900 uppercase tracking-wide drop-shadow-sm">Payment Information</p>
                  <p className="text-xs sm:text-sm font-bold mt-1" style={{ color: '#334155' }}>Provide your banking information for secure payments.</p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#334155' }}>Account name <span style={{ color: '#D28A8C' }}>*</span></label>
                <input
                  className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
                  style={{ border: '1px solid rgba(210, 138, 140, 0.15)', background: 'rgba(255, 255, 255, 0.9)' }}
                  value={vendorState.bank.accountName}
                  placeholder="Name as per bank records"
                  onChange={(event) => updateVendorState({
                    bank: { ...vendorState.bank, accountName: event.target.value.replace(/[^a-zA-Z ]/g, '') }
                  })}
                  onKeyDown={(e) => {
                    if (e.key >= '0' && e.key <= '9') e.preventDefault();
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#334155' }}>Account number <span style={{ color: '#D28A8C' }}>*</span></label>
                <input
                  className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
                  style={{ border: '1px solid rgba(210, 138, 140, 0.15)', background: 'rgba(255, 255, 255, 0.9)' }}
                  value={vendorState.bank.accountNumber}
                  placeholder="Enter 12-16 digit account number"
                  onChange={(event) => updateVendorState({ bank: { ...vendorState.bank, accountNumber: event.target.value.replace(/[^0-9]/g, '') } })}
                  onKeyDown={(e) => {
                    if (e.key.length === 1 && !/[0-9]/.test(e.key)) e.preventDefault();
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#334155' }}>IFSC Code <span style={{ color: '#D28A8C' }}>*</span></label>
                <input
                  className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
                  style={{ border: '1px solid rgba(210, 138, 140, 0.15)', background: 'rgba(255, 255, 255, 0.9)' }}
                  value={vendorState.bank.ifsc}
                  placeholder="e.g. SBIN0001234"
                  onChange={(event) => updateVendorState({ bank: { ...vendorState.bank, ifsc: event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '') } })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#334155' }}>UPI ID</label>
                <input
                  className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
                  style={{ border: '1px solid rgba(210, 138, 140, 0.15)', background: 'rgba(255, 255, 255, 0.9)' }}
                  value={vendorState.bank.upiId}
                  placeholder="e.g. name@upi"
                  onChange={(event) => updateVendorState({ bank: { ...vendorState.bank, upiId: event.target.value.toLowerCase().replace(/[^a-z0-9.@-]/g, '') } })}
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 pt-8 border-t flex justify-end" style={{ borderColor: 'rgba(210, 138, 140, 0.15)' }}>
          <button
            type="button"
            className="vendor-cta rounded-2xl px-12 py-4 text-base font-bold tracking-wide shadow-xl transition-all active:scale-95"
            style={{ boxShadow: '0 8px 30px rgba(210, 138, 140, 0.25)' }}
            onClick={handleNext}
          >
            {(currentStepIndex === steps.length - 1 ? 'Finish Profile Setup' : 'Save & Continue')}
          </button>
        </div>

        {/* Global Toast Notification */}
        {toast.show && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[10000] animate-in fade-in slide-in-from-bottom-5 duration-300">
            <div className="flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border border-white/20 min-w-max"
              style={{
                background: toast.type === 'error'
                  ? 'linear-gradient(135deg, #ef4444, #b91c1c)'
                  : 'linear-gradient(135deg, #D28A8C, #C27A7C, #a855f7)',
                color: 'white',
                boxShadow: '0 20px 40px -10px rgba(210, 138, 140, 0.4)'
              }}>
              {toast.type === 'loading' ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : toast.type === 'success' ? (
                <div className="h-6 w-6 flex items-center justify-center rounded-full bg-white/20 text-xs text-white">✓</div>
              ) : (
                <div className="text-xl">✨</div>
              )}
              <p className="font-bold text-xs sm:text-sm uppercase tracking-wider">{toast.message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorOnboarding;
