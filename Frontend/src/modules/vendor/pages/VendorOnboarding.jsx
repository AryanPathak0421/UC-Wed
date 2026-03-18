import { useRef, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useVendorState } from '../useVendorState';

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

  const handleDocChange = (key, event) => {
    const file = event.target.files?.[0];
    if (file) {
      updateVendorState({ documents: { ...vendorState.documents, [key]: true } });
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file && newItem.title) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target.result;
        updateVendorState({
          portfolio: [
            ...vendorState.portfolio,
            { id: Date.now().toString(), type: 'Photo', title: newItem.title, tag: newItem.tag || 'General', url }
          ]
        });
        setNewItem({ title: '', tag: '' });
      };
      reader.readAsDataURL(file);
    } else if (!newItem.title) {
      alert('Please enter a project title first.');
    }
  };

  const isStepComplete = (id) => {
    switch (id) {
      case 'business':
        const { description, years, teamSize, languages, serviceCities } = vendorState.businessDetails;
        return description && years && teamSize && languages.length > 0 && serviceCities.length > 0;
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

  const handleNext = () => {
    const check = canNavigateTo(currentStepIndex + 1);
    if (!check.complete) {
      alert(`⚠️ Requirement Missing: Please finish "${check.stepLabel}" to continue.`);
      return;
    }

    const nextStep = steps[currentStepIndex + 1];
    if (nextStep) {
      navigate('/vendor/onboarding/' + nextStep.id);
    } else {
      navigate('/vendor/dashboard');
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-12 px-4 sm:px-6 relative z-10">
      <div className="rounded-[2.5rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden" style={{
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
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: '#ec4899' }}>Vendor Onboarding</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">Complete your profile</h2>
            <p className="text-xs sm:text-sm font-medium mt-1" style={{ color: '#94a3b8' }}>Finish setup to boost visibility and unlock leads.</p>
          </div>
          <div className="text-[10px] sm:text-xs font-black uppercase tracking-wider px-4 py-2 rounded-full" style={{
            background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)',
            color: '#be185d',
            border: '1px solid rgba(236, 72, 153, 0.1)'
          }}>
            Step {currentStepIndex + 1} of {steps.length}
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
                    placeholder="e.g. 5+ Years"
                    onChange={(event) => updateVendorState({
                      businessDetails: { ...vendorState.businessDetails, years: event.target.value }
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
                    placeholder="e.g. 8 Experts"
                    onChange={(event) => updateVendorState({
                      businessDetails: { ...vendorState.businessDetails, teamSize: event.target.value }
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
                    onChange={(event) => updateVendorState({
                      businessDetails: { ...vendorState.businessDetails, languages: event.target.value.split(',').map((item) => item.trim()).filter(Boolean) }
                    })}
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
                    onChange={(event) => updateVendorState({
                      businessDetails: { ...vendorState.businessDetails, serviceCities: event.target.value.split(',').map((item) => item.trim()).filter(Boolean) }
                    })}
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
                            onChange={(e) => setNewService({...newService, name: e.target.value})}
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
                            onChange={(e) => setNewService({...newService, category: e.target.value})}
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
                          onChange={(e) => setNewService({...newService, basePrice: e.target.value})}
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
                                setNewService({...newService, inclusions: incs});
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
                          onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Category Tag</label>
                        <input 
                          className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
                          style={{ border: '1px solid rgba(236, 72, 153, 0.15)', background: 'rgba(255, 255, 255, 0.8)' }}
                          placeholder="e.g. Reception, Ceremony"
                          value={newItem.tag}
                          onChange={(e) => setNewItem({ ...newItem, tag: e.target.value })}
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
                  onChange={(event) => updateVendorState({ bank: { ...vendorState.bank, accountName: event.target.value } })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Account number <span style={{ color: '#ec4899' }}>*</span></label>
                <input
                  className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
                  style={{ border: '1px solid rgba(236, 72, 153, 0.15)', background: 'rgba(255, 255, 255, 0.6)' }}
                  value={vendorState.bank.accountNumber}
                  placeholder="Enter 12-16 digit account number"
                  onChange={(event) => updateVendorState({ bank: { ...vendorState.bank, accountNumber: event.target.value } })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>IFSC Code <span style={{ color: '#ec4899' }}>*</span></label>
                <input
                  className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
                  style={{ border: '1px solid rgba(236, 72, 153, 0.15)', background: 'rgba(255, 255, 255, 0.6)' }}
                  value={vendorState.bank.ifsc}
                  placeholder="e.g. SBIN0001234"
                  onChange={(event) => updateVendorState({ bank: { ...vendorState.bank, ifsc: event.target.value } })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>UPI ID</label>
                <input
                  className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
                  style={{ border: '1px solid rgba(236, 72, 153, 0.15)', background: 'rgba(255, 255, 255, 0.6)' }}
                  value={vendorState.bank.upiId}
                  placeholder="e.g. name@upi"
                  onChange={(event) => updateVendorState({ bank: { ...vendorState.bank, upiId: event.target.value } })}
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
      </div>
    </div>
  );
};

export default VendorOnboarding;