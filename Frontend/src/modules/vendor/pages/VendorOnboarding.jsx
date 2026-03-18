import { useRef, useState, useEffect, useCallback } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Icon from '../../../components/ui/Icon';
import { useVendorState } from '../useVendorState';
import { vendorApi } from '../vendorApi';

const steps = [
  { id: 'business', label: 'Business Details' },
  { id: 'services', label: 'Services' },
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
    <div className="max-w-5xl mx-auto pb-6 px-1 sm:px-2 relative z-10">
      <div className="rounded-3xl p-4 sm:p-8 shadow-2xl relative overflow-hidden" style={{
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(236, 72, 153, 0.1)'
      }}>
        {/* Top gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-2 rounded-t-[2.5rem]" style={{
          background: 'linear-gradient(90deg, #ec4899, #db2777, #a855f7, #ec4899)',
          backgroundSize: '200% 100%',
          animation: 'gradient-shift 4s ease infinite'
        }}></div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: '#ec4899' }}>Vendor Onboarding</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">Complete your profile</h2>
            <p className="text-xs sm:text-sm font-medium mt-1" style={{ color: '#94a3b8' }}>Finish setup to boost visibility and unlock leads.</p>
          </div>
          <div className="relative">
            <img src="/assets/vendor/success.png" alt="Celebration" className="h-20 sm:h-32 w-auto absolute -top-12 sm:-top-20 -right-2 sm:-right-8 animate-[pulse-glow_4s_ease-in-out_infinite] img-transparent-fix" />
            <div className="text-[10px] sm:text-xs font-black uppercase tracking-wider px-4 py-2 rounded-full relative z-10" style={{
              background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)',
              color: '#be185d',
              border: '1px solid rgba(236, 72, 153, 0.1)'
            }}>
              Step {currentStepIndex + 1} of {steps.length}
            </div>
          </div>
        </div>

        {/* Responsive Step Navigation */}
        <div className="mt-10 overflow-x-auto no-scrollbar pb-2 -mx-5 px-5 sm:mx-0 sm:px-0">
          <div className="flex flex-nowrap sm:flex-wrap gap-2.5 sm:gap-3 min-w-max">
            {steps.map((step, index) => (
              <NavLink
                key={step.id}
                to={'/vendor/onboarding/' + step.id}
                onClick={(e) => handleStepClick(e, index, step.id)}
                className="rounded-2xl px-5 py-3 text-[11px] sm:text-xs font-black transition-all uppercase tracking-wider"
                style={index === currentStepIndex
                  ? { background: 'linear-gradient(135deg, #ec4899, #db2777)', color: 'white', boxShadow: '0 4px 15px rgba(236, 72, 153, 0.3)' }
                  : index < currentStepIndex
                    ? { background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)', color: '#be185d', border: '1px solid rgba(236, 72, 153, 0.15)' }
                    : { background: 'rgba(253, 242, 248, 0.3)', color: '#94a3b8', border: '1px solid rgba(236, 72, 153, 0.08)' }
                }
              >
                <span className="flex items-center gap-2">
                  {index < currentStepIndex ? '✓' : index + 1 + '.'}
                  {step.label}
                </span>
              </NavLink>
            ))}
          </div>
        </div>

        <div className="mt-10">
          {stepId === 'business' && (
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
              <div className="space-y-2 flex flex-col">
                <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>
                  Business description <span style={{ color: '#ec4899' }}>*</span>
                </label>
                <textarea
                  className="w-full grow min-h-[160px] lg:min-h-[220px] rounded-2xl px-5 py-4 text-sm font-semibold transition-all resize-none"
                  style={{
                    border: '1px solid rgba(236, 72, 153, 0.15)',
                    background: 'rgba(255, 255, 255, 0.6)'
                  }}
                  value={vendorState.businessDetails.description}
                  onChange={(event) => updateVendorState({
                    businessDetails: { ...vendorState.businessDetails, description: event.target.value }
                  })}
                  placeholder="Describe your journey, specialized skills, and what makes your service exceptional..."
                />
              </div>
              <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>
                    Years of experience <span style={{ color: '#ec4899' }}>*</span>
                  </label>
                  <input
                    className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
                    style={{
                      border: '1px solid rgba(236, 72, 153, 0.15)',
                      background: 'rgba(255, 255, 255, 0.6)'
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
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>
                    Team size <span style={{ color: '#ec4899' }}>*</span>
                  </label>
                  <input
                    className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
                    style={{
                      border: '1px solid rgba(236, 72, 153, 0.15)',
                      background: 'rgba(255, 255, 255, 0.6)'
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
                <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>
                    Languages spoken <span style={{ color: '#ec4899' }}>*</span>
                  </label>
                  <input
                    className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
                    style={{
                      border: '1px solid rgba(236, 72, 153, 0.15)',
                      background: 'rgba(255, 255, 255, 0.6)'
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
                <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>
                    Service cities <span style={{ color: '#ec4899' }}>*</span>
                  </label>
                  <input
                    className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
                    style={{
                      border: '1px solid rgba(236, 72, 153, 0.15)',
                      background: 'rgba(255, 255, 255, 0.6)'
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
            </div>
          )}

          {stepId === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white/50 p-6 rounded-3xl border border-pink-100">
                <div>
                  <h3 className="text-xl font-black text-slate-900 leading-tight">Services offered</h3>
                  <p className="text-sm font-medium mt-1" style={{ color: '#94a3b8' }}>Add information about the services you provide.</p>
                </div>
                <button
                  type="button"
                  className="vendor-cta rounded-2xl px-6 py-3 text-xs font-black tracking-wide"
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
                  <div className="w-full max-w-xl rounded-[2rem] p-8 shadow-2xl relative my-8" style={{
                    background: 'linear-gradient(180deg, #ffffff 0%, #fdf2f8 100%)',
                    border: '1px solid rgba(236, 72, 153, 0.1)'
                  }}>
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 leading-none">Add New Service</h3>
                        <p className="text-sm font-medium mt-2" style={{ color: '#94a3b8' }}>Create a new service listing for your profile.</p>
                      </div>
                      <button
                        onClick={() => setShowServiceModal(false)}
                        className="h-10 w-10 flex items-center justify-center rounded-full text-slate-400 hover:text-rose-500 transition-all active:scale-90"
                        style={{ background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)' }}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2.5">
                          <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Service Name</label>
                          <input
                            className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
                            style={{
                              border: '1px solid rgba(236, 72, 153, 0.15)',
                              background: 'rgba(253, 242, 248, 0.3)'
                            }}
                            placeholder="e.g. Royal Stage Decor"
                            value={newService.name}
                            onKeyDown={(e) => {
                              if (e.key >= '0' && e.key <= '9') e.preventDefault();
                            }}
                            onChange={(e) => setNewService({ ...newService, name: e.target.value.replace(/[0-9]/g, '') })}
                          />
                        </div>
                        <div className="space-y-2.5">
                          <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Category</label>
                          <select
                            className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all appearance-none"
                            style={{
                              border: '1px solid rgba(236, 72, 153, 0.15)',
                              background: 'rgba(253, 242, 248, 0.3)'
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

                      <div className="space-y-2.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Starting Price (₹)</label>
                        <input
                          type="number"
                          className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
                          style={{
                            border: '1px solid rgba(236, 72, 153, 0.15)',
                            background: 'rgba(253, 242, 248, 0.3)'
                          }}
                          placeholder="e.g. 50000"
                          value={newService.basePrice}
                          onChange={(e) => setNewService({ ...newService, basePrice: e.target.value })}
                        />
                      </div>

                      <div className="space-y-3 pt-2">
                        <p className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Key Inclusions</p>
                        <div className="space-y-3">
                          {newService.inclusions.map((inc, idx) => (
                            <input
                              key={idx}
                              placeholder={`Service Feature ${idx + 1}`}
                              className="w-full rounded-2xl px-5 py-3 text-sm font-medium transition-all outline-none"
                              style={{
                                border: '1px solid rgba(236, 72, 153, 0.12)',
                                background: 'rgba(253, 242, 248, 0.2)'
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
                        className="vendor-cta w-full rounded-2xl py-5 font-black text-lg mt-6 active:scale-95 transition-all"
                        onClick={handleSaveService}
                      >
                        ✨ Save Service
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {vendorState.services.length === 0 ? (
                <div className="rounded-3xl border border-dashed p-16 text-center" style={{
                  borderColor: 'rgba(236, 72, 153, 0.3)',
                  background: 'rgba(253, 242, 248, 0.3)'
                }}>
                  <div className="text-4xl mb-4">✨</div>
                  <p className="text-sm font-bold" style={{ color: '#94a3b8' }}>No services added yet. Click &quot;Add service&quot; to get started.</p>
                </div>
              ) : (
                <div className="grid gap-5 md:grid-cols-2">
                  {vendorState.services.map((service) => (
                    <div key={service.id} className="rounded-3xl p-6 relative group transition-all hover:scale-[1.02]" style={{
                      background: 'rgba(255, 255, 255, 0.6)',
                      border: '1px solid rgba(236, 72, 153, 0.1)',
                      boxShadow: '0 4px 20px rgba(236, 72, 153, 0.05)'
                    }}>
                      <button
                        onClick={() => updateVendorState({ services: vendorState.services.filter(s => s.id !== service.id) })}
                        className="absolute -top-3 -right-3 h-8 w-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                        style={{
                          background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)',
                          border: '1px solid rgba(236, 72, 153, 0.2)',
                          color: '#be185d'
                        }}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <div className="flex items-center justify-between">
                        <h4 className="font-black text-slate-900 text-lg">{service.name}</h4>
                        <span className="rounded-full px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider" style={{
                          background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)', color: '#be185d'
                        }}>{service.category}</span>
                      </div>
                      <p className="mt-3 text-sm font-bold" style={{ color: '#ec4899' }}>Base price: ₹{service.basePrice.toLocaleString()}</p>
                      <div className="mt-4 text-[10px] font-black uppercase tracking-wider" style={{ color: '#94a3b8' }}>Packages: <span style={{ color: '#64748b' }}>{service.packages.map((pkg) => pkg.name).join(', ')}</span></div>
                      {service.inclusions && service.inclusions.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {service.inclusions.map((inc, i) => (
                            <span key={i} className="px-3 py-1 rounded-full text-[10px] font-bold" style={{
                              background: 'rgba(253, 242, 248, 0.5)',
                              border: '1px solid rgba(236, 72, 153, 0.08)',
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
                <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>
                  Price range <span style={{ color: '#ec4899' }}>*</span>
                </label>
                <input
                  className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
                  style={{
                    border: '1px solid rgba(236, 72, 153, 0.15)',
                    background: 'rgba(255, 255, 255, 0.6)'
                  }}
                  value={vendorState.pricing.range}
                  placeholder="e.g. ₹50k - ₹2L"
                  onChange={(event) => updateVendorState({ pricing: { ...vendorState.pricing, range: event.target.value } })}
                />
              </div>
              <div className="space-y-2 lg:col-span-2">
                <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Pricing notes</label>
                <textarea
                  className="h-32 w-full rounded-2xl px-5 py-4 text-sm font-semibold transition-all resize-none"
                  style={{
                    border: '1px solid rgba(236, 72, 153, 0.15)',
                    background: 'rgba(255, 255, 255, 0.6)'
                  }}
                  value={vendorState.pricing.notes}
                  placeholder="Any additional details about your pricing approach or travel charges..."
                  onChange={(event) => updateVendorState({ pricing: { ...vendorState.pricing, notes: event.target.value } })}
                />
              </div>
            </div>
          )}

          {stepId === 'portfolio' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between bg-white/50 p-6 rounded-3xl border border-pink-100">
                <div>
                  <h3 className="text-xl font-black text-slate-900 leading-tight">Portfolio uploads</h3>
                  <p className="text-sm font-medium mt-1" style={{ color: '#94a3b8' }}>Upload your best work to attract more customers.</p>
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="rounded-[2rem] border border-pink-100 p-8" style={{ background: 'linear-gradient(135deg, rgba(253,242,248,0.5), rgba(245,243,255,0.5))' }}>
                    <p className="text-[11px] font-black uppercase tracking-widest mb-6" style={{ color: '#ec4899' }}>Add new showcase</p>
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Project Title</label>
                        <input
                          className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
                          style={{ border: '1px solid rgba(236, 72, 153, 0.15)', background: 'rgba(255, 255, 255, 0.8)' }}
                          placeholder="e.g. Royal Palace Wedding"
                          value={newItem.title}
                          onKeyDown={(e) => {
                            if (e.key >= '0' && e.key <= '9') e.preventDefault();
                          }}
                          onChange={(e) => setNewItem({ ...newItem, title: e.target.value.replace(/[0-9]/g, '') })}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Category Tag</label>
                        <input
                          className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
                          style={{ border: '1px solid rgba(236, 72, 153, 0.15)', background: 'rgba(255, 255, 255, 0.8)' }}
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
                        className="vendor-cta w-full rounded-2xl py-4 font-black text-base mt-4 active:scale-95 transition-all"
                        onClick={handleUploadClick}
                      >
                        Select & Upload Media
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 grid-cols-2 h-fit">
                  {vendorState.portfolio.length === 0 ? (
                    <div className="col-span-2 rounded-[2rem] border border-dashed p-12 text-center flex flex-col items-center justify-center" style={{
                      borderColor: 'rgba(236, 72, 153, 0.3)',
                      background: 'rgba(253, 242, 248, 0.3)'
                    }}>
                      <div className="text-3xl mb-3">📷</div>
                      <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#94a3b8' }}>Your portfolio is empty</p>
                    </div>
                  ) : (
                    vendorState.portfolio.map((item) => (
                      <div key={item.id} className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-pink-50">
                        <img src={item.url} alt={item.title} className="h-40 w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                          <p className="text-sm font-black text-white truncate">{item.title}</p>
                          <p className="text-[10px] text-pink-300 font-bold mt-0.5 tracking-wider uppercase">{item.tag}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {stepId === 'documents' && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="lg:col-span-2 bg-white/50 p-6 rounded-3xl border border-pink-100">
                <h3 className="text-xl font-black text-slate-900 leading-tight">Verification documents</h3>
                <p className="text-sm font-medium mt-1" style={{ color: '#94a3b8' }}>Upload required documents to verify your business authenticity.</p>
              </div>
              {['idProof', 'gst', 'contract'].map((docKey) => (
                <div key={docKey} className="flex items-center justify-between rounded-3xl p-6 transition-all hover:scale-[1.02]" style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  border: '1px solid rgba(236, 72, 153, 0.1)',
                  boxShadow: '0 4px 20px rgba(236, 72, 153, 0.05)'
                }}>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white" style={{ background: 'linear-gradient(135deg, #ec4899, #db2777)' }}>
                        {docKey === 'idProof' ? '1' : docKey === 'gst' ? '2' : '3'}
                      </div>
                      <p className="text-sm font-black text-slate-900">
                        {docKey === 'idProof' ? 'ID Proof (Aadhar/PAN)' : docKey === 'gst' ? 'GST Certificate' : 'Service Agreement'}
                      </p>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-wider ml-9" style={{ color: '#94a3b8' }}>PDF, JPG (Max 5MB)</p>
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
                    className="rounded-2xl px-5 py-3 text-xs font-black transition-all active:scale-95 whitespace-nowrap"
                    style={vendorState.documents[docKey]
                      ? { background: 'linear-gradient(135deg, #ec4899, #db2777)', color: 'white', boxShadow: '0 4px 15px rgba(236, 72, 153, 0.3)' }
                      : { background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)', color: '#be185d', border: '1px solid rgba(236, 72, 153, 0.15)' }}
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
              <div className="lg:col-span-2 bg-white/50 p-6 rounded-3xl border border-pink-100">
                <h3 className="text-xl font-black text-slate-900 leading-tight">Bank details</h3>
                <p className="text-sm font-medium mt-1" style={{ color: '#94a3b8' }}>Provide your banking information for secure payments.</p>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Account name <span style={{ color: '#ec4899' }}>*</span></label>
                <input
                  className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
                  style={{ border: '1px solid rgba(236, 72, 153, 0.15)', background: 'rgba(255, 255, 255, 0.6)' }}
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
                <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Account number <span style={{ color: '#ec4899' }}>*</span></label>
                <input
                  className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
                  style={{ border: '1px solid rgba(236, 72, 153, 0.15)', background: 'rgba(255, 255, 255, 0.6)' }}
                  value={vendorState.bank.accountNumber}
                  placeholder="Enter 12-16 digit account number"
                  onChange={(event) => updateVendorState({ bank: { ...vendorState.bank, accountNumber: event.target.value.replace(/[^0-9]/g, '') } })}
                  onKeyDown={(e) => {
                    if (e.key.length === 1 && !/[0-9]/.test(e.key)) e.preventDefault();
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>IFSC Code <span style={{ color: '#ec4899' }}>*</span></label>
                <input
                  className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
                  style={{ border: '1px solid rgba(236, 72, 153, 0.15)', background: 'rgba(255, 255, 255, 0.6)' }}
                  value={vendorState.bank.ifsc}
                  placeholder="e.g. SBIN0001234"
                  onChange={(event) => updateVendorState({ bank: { ...vendorState.bank, ifsc: event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '') } })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>UPI ID</label>
                <input
                  className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
                  style={{ border: '1px solid rgba(236, 72, 153, 0.15)', background: 'rgba(255, 255, 255, 0.6)' }}
                  value={vendorState.bank.upiId}
                  placeholder="e.g. name@upi"
                  onChange={(event) => updateVendorState({ bank: { ...vendorState.bank, upiId: event.target.value.toLowerCase().replace(/[^a-z0-9.@-]/g, '') } })}
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 pt-8 border-t flex justify-end" style={{ borderColor: 'rgba(236, 72, 153, 0.15)' }}>
          <button
            type="button"
            className="vendor-cta rounded-2xl px-12 py-4 text-base font-black tracking-wide shadow-xl transition-all active:scale-95"
            style={{ boxShadow: '0 8px 30px rgba(236, 72, 153, 0.25)' }}
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
                  : 'linear-gradient(135deg, #ec4899, #db2777, #a855f7)',
                color: 'white',
                boxShadow: '0 20px 40px -10px rgba(236, 72, 153, 0.4)'
              }}>
              {toast.type === 'loading' ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : toast.type === 'success' ? (
                <div className="h-6 w-6 flex items-center justify-center rounded-full bg-white/20 text-xs text-white">✓</div>
              ) : (
                <div className="text-xl">✨</div>
              )}
              <p className="font-black text-xs sm:text-sm uppercase tracking-wider">{toast.message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorOnboarding;