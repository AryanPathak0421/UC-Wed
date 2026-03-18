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
    // Can always go back
    if (targetIndex <= currentStepIndex) return true;
    
    // To go forward, all steps from current up to target-1 must be complete
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
    <div className="max-w-6xl mx-auto pb-12 px-4 sm:px-6">
      <div className="vendor-surface rounded-3xl p-5 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Vendor Onboarding</p>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">Complete your profile</h2>
            <p className="text-xs sm:text-sm text-slate-500">Finish setup to boost visibility and unlock leads.</p>
          </div>
          <div className="text-xs sm:text-sm font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
            Step {currentStepIndex + 1} of {steps.length}
          </div>
        </div>

        {/* Responsive Step Navigation */}
        <div className="mt-8 overflow-x-auto no-scrollbar pb-2 -mx-5 px-5 sm:mx-0 sm:px-0">
          <div className="flex flex-nowrap sm:flex-wrap gap-2.5 sm:gap-3 min-w-max">
            {steps.map((step, index) => (
              <NavLink
                key={step.id}
                to={'/vendor/onboarding/' + step.id}
                onClick={(e) => handleStepClick(e, index, step.id)}
                className={'rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold transition-all border ' + 
                  (index === currentStepIndex ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100 ring-4 ring-emerald-50 border-emerald-600' : 
                   index < currentStepIndex ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                   'bg-slate-50 text-slate-400 border-slate-100 opacity-70')}
              >
                <span className="flex items-center gap-1.5">
                  {index < currentStepIndex ? '✓' : index + 1 + '.'}
                  {step.label}
                </span>
              </NavLink>
            ))}
          </div>
        </div>

        <div className="mt-8">
          {stepId === 'business' && (
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
              <div className="space-y-3 flex flex-col">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-1 ml-1">
                  Business description <span className="text-emerald-500">*</span>
                </label>
                <textarea
                  className="w-full grow min-h-[160px] lg:min-h-[220px] rounded-2xl border border-slate-200 bg-slate-50/30 px-4 py-4 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all font-medium leading-relaxed"
                  value={vendorState.businessDetails.description}
                  onChange={(event) => updateVendorState({
                    businessDetails: { ...vendorState.businessDetails, description: event.target.value }
                  })}
                  placeholder="Describe your journey, specialized skills, and what makes your service exceptional..."
                />
              </div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-1 ml-1">
                    Years of experience <span className="text-emerald-500">*</span>
                  </label>
                  <input
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/30 px-5 py-3.5 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all font-medium"
                    value={vendorState.businessDetails.years}
                    placeholder="e.g. 5+ Years"
                    onChange={(event) => updateVendorState({
                      businessDetails: { ...vendorState.businessDetails, years: event.target.value }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-1 ml-1">
                    Team size <span className="text-emerald-500">*</span>
                  </label>
                  <input
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/30 px-5 py-3.5 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all font-medium"
                    value={vendorState.businessDetails.teamSize}
                    placeholder="e.g. 8 Experts"
                    onChange={(event) => updateVendorState({
                      businessDetails: { ...vendorState.businessDetails, teamSize: event.target.value }
                    })}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-1 ml-1">
                    Languages spoken <span className="text-emerald-500">*</span>
                  </label>
                  <input
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/30 px-5 py-3.5 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all font-medium"
                    value={vendorState.businessDetails.languages.join(', ')}
                    onChange={(event) => updateVendorState({
                      businessDetails: { ...vendorState.businessDetails, languages: event.target.value.split(',').map((item) => item.trim()).filter(Boolean) }
                    })}
                    placeholder="e.g. Hindi, English"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-1 ml-1">
                    Service cities <span className="text-emerald-500">*</span>
                  </label>
                  <input
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/30 px-5 py-3.5 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all font-medium"
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
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Services offered</h3>
                  <p className="text-sm text-slate-500">Add information about the services you provide.</p>
                </div>
                <button 
                  type="button" 
                  className="vendor-cta rounded-xl px-4 py-2 text-xs font-semibold"
                  onClick={() => setShowServiceModal(true)}
                >
                  Add service
                </button>
              </div>

              {showServiceModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 overflow-y-auto">
                  <div className="bg-white w-full max-w-xl rounded-[2rem] p-8 shadow-2xl relative my-8">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 leading-none">Add New Service</h3>
                        <p className="text-sm text-slate-500 mt-2 font-medium">Create a new service listing for your profile.</p>
                      </div>
                      <button 
                        onClick={() => setShowServiceModal(false)} 
                        className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all active:scale-90"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2.5">
                          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">Service Name</label>
                          <input 
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-3.5 text-sm font-semibold focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all"
                            placeholder="e.g. Royal Stage Decor"
                            value={newService.name}
                            onChange={(e) => setNewService({...newService, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2.5">
                          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">Category</label>
                          <select 
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-3.5 text-sm font-semibold focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all appearance-none"
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
                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">Starting Price (₹)</label>
                        <input 
                          type="number"
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-3.5 text-sm font-semibold focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all"
                          placeholder="e.g. 50000"
                          value={newService.basePrice}
                          onChange={(e) => setNewService({...newService, basePrice: e.target.value})}
                        />
                      </div>

                      <div className="space-y-3 pt-2">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">Key Inclusions</p>
                        <div className="space-y-3">
                          {newService.inclusions.map((inc, idx) => (
                            <input 
                              key={idx}
                              placeholder={`Service Feature ${idx + 1}`}
                              className="w-full rounded-2xl border border-slate-200 bg-slate-50/30 px-5 py-3 text-sm font-medium focus:border-emerald-500 focus:bg-white transition-all outline-none"
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
                        className="vendor-cta w-full rounded-2xl py-5 font-bold text-lg mt-6 shadow-xl shadow-emerald-100 flex items-center justify-center gap-2 active:scale-95 transition-all"
                        onClick={handleSaveService}
                      >
                        Save Service
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {vendorState.services.length === 0 ? (
                <div className="rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50/30 p-12 text-center">
                  <p className="text-sm font-medium text-slate-500">No services added yet. Click "Add service" to get started.</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {vendorState.services.map((service) => (
                    <div key={service.id} className="rounded-2xl border border-slate-200 p-4 bg-white shadow-sm transition-hover hover:shadow-md relative group">
                      <button 
                        onClick={() => updateVendorState({ services: vendorState.services.filter(s => s.id !== service.id) })}
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-600 hover:text-white"
                      >
                         <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-slate-900">{service.name}</h4>
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{service.category}</span>
                      </div>
                      <p className="mt-2 text-sm text-slate-500 font-medium">Base price: ₹{service.basePrice.toLocaleString()}</p>
                      <div className="mt-3 text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Packages: {service.packages.map((pkg) => pkg.name).join(', ')}</div>
                      {service.inclusions && service.inclusions.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {service.inclusions.map((inc, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-100 text-[10px] text-slate-500">{inc}</span>
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
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-1">
                  Price range <span className="text-emerald-500">*</span>
                </label>
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/30 px-4 py-3.5 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all font-medium"
                  value={vendorState.pricing.range}
                  placeholder="e.g. ₹50,000 - ₹2,00,000"
                  onChange={(event) => updateVendorState({ pricing: { ...vendorState.pricing, range: event.target.value } })}
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700">Pricing notes</label>
                <textarea
                  className="h-28 w-full rounded-2xl border border-slate-200 bg-slate-50/30 px-4 py-3.5 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all font-medium"
                  value={vendorState.pricing.notes}
                  placeholder="Any additional details about your pricing approach or travel charges..."
                  onChange={(event) => updateVendorState({ pricing: { ...vendorState.pricing, notes: event.target.value } })}
                />
              </div>
            </div>
          )}

          {stepId === 'portfolio' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Portfolio uploads</h3>
                  <p className="text-sm text-slate-500">Upload your best work to attract more customers.</p>
                </div>
              </div>
              
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="rounded-3xl border border-dashed border-emerald-200 p-8 bg-emerald-50/30">
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-6">Add new showcase</p>
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 ml-1">Project Title</label>
                        <input 
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all"
                          placeholder="e.g. Royal Palace Wedding"
                          value={newItem.title}
                          onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 ml-1">Category Tag</label>
                        <input 
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all"
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
                        className="vendor-cta w-full rounded-2xl px-4 py-4 text-sm font-bold shadow-md shadow-emerald-100 mt-2" 
                        onClick={handleUploadClick}
                      >
                        Select & Upload Media
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 grid-cols-2 h-fit">
                  {vendorState.portfolio.length === 0 ? (
                    <div className="col-span-2 rounded-2xl border border-slate-100 bg-slate-50/30 p-8 text-center flex items-center justify-center">
                      <p className="text-xs text-slate-400 font-medium">Your portfolio is empty.</p>
                    </div>
                  ) : (
                    vendorState.portfolio.map((item) => (
                      <div key={item.id} className="group relative rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
                        <img src={item.url} alt={item.title} className="h-36 w-full object-cover transition-transform group-hover:scale-105" />
                        <div className="p-3 bg-white">
                          <p className="text-xs font-bold text-slate-900 truncate">{item.title}</p>
                          <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">{item.tag}</p>
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
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold text-slate-900">Verification documents</h3>
                <p className="text-sm text-slate-500 mt-1">Upload required documents to verify your business authenticity.</p>
              </div>
              {['idProof', 'gst', 'contract'].map((docKey) => (
                <div key={docKey} className="flex items-center justify-between rounded-2xl border border-slate-200 px-6 py-5 bg-white shadow-sm hover:border-emerald-200 transition-colors">
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {(docKey === 'idProof' ? '1. ID Proof (Aadhar/PAN)' : docKey === 'gst' ? '2. GST Certificate' : '3. Service Agreement')}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">PDF, JPG, PNG (Max 5MB)</p>
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
                    className={'rounded-xl px-4 py-2 text-xs font-bold transition-all ' + (vendorState.documents[docKey] ? 'bg-emerald-600 text-white shadow-md' : 'border border-emerald-200 text-emerald-700 hover:bg-emerald-50')}
                    onClick={() => handleDocClick(docKey)}
                  >
                    {(vendorState.documents[docKey] ? '✓ Uploaded' : 'Upload File')}
                  </button>
                </div>
              ))}
            </div>
          )}

          {stepId === 'bank' && (
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold text-slate-900">Bank details</h3>
                <p className="text-sm text-slate-500 mt-1">Provide your banking information for secure payments.</p>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700">Account name <span className="text-emerald-500">*</span></label>
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/30 px-4 py-3.5 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all font-medium"
                  value={vendorState.bank.accountName}
                  placeholder="Name as per bank records"
                  onChange={(event) => updateVendorState({ bank: { ...vendorState.bank, accountName: event.target.value } })}
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700">Account number <span className="text-emerald-500">*</span></label>
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/30 px-4 py-3.5 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all font-medium"
                  value={vendorState.bank.accountNumber}
                  placeholder="Enter 12-16 digit account number"
                  onChange={(event) => updateVendorState({ bank: { ...vendorState.bank, accountNumber: event.target.value } })}
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700">IFSC <span className="text-emerald-500">*</span></label>
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/30 px-4 py-3.5 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all font-medium"
                  value={vendorState.bank.ifsc}
                  placeholder="e.g. SBIN0001234"
                  onChange={(event) => updateVendorState({ bank: { ...vendorState.bank, ifsc: event.target.value } })}
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700">UPI ID</label>
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/30 px-4 py-3.5 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all font-medium"
                  value={vendorState.bank.upiId}
                  placeholder="e.g. name@upi"
                  onChange={(event) => updateVendorState({ bank: { ...vendorState.bank, upiId: event.target.value } })}
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 flex justify-end">
          <button type="button" className="vendor-cta rounded-2xl px-12 py-4 text-base font-bold shadow-lg shadow-emerald-100 transition-all hover:px-14 active:scale-95" onClick={handleNext}>
            {(currentStepIndex === steps.length - 1 ? 'Finish Profile Setup' : 'Save & Continue')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorOnboarding;