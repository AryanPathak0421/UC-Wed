import { useState } from 'react';
import { useVendorState } from '../useVendorState';

const VendorServices = () => {
  const { vendorState, updateVendorState } = useVendorState();
  const [showModal, setShowModal] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    category: '',
    basePrice: '',
    inclusions: ['', '']
  });

  const handleSave = () => {
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
    setShowModal(false);
    setNewService({ name: '', category: '', basePrice: '', inclusions: ['', ''] });
  };

  return (
    <div className="space-y-6">
      <div className="vendor-surface rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Services</p>
            <h2 className="text-2xl font-bold text-slate-900">Service listings</h2>
            <p className="text-sm text-slate-500">Showcase the services and packages you provide.</p>
          </div>
          <button 
            type="button" 
            className="vendor-cta rounded-xl px-4 py-2 text-xs font-semibold"
            onClick={() => setShowModal(true)}
          >
            Add new service
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-[2rem] p-8 shadow-2xl relative my-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-black text-slate-900 leading-none">Add New Service</h3>
                <p className="text-sm text-slate-500 mt-2 font-medium">Create a new service listing for your profile.</p>
              </div>
              <button 
                onClick={() => setShowModal(false)} 
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
                onClick={handleSave}
              >
                Save Listing
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        {vendorState.services.map((service) => (
          <div key={service.id} className="vendor-surface rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">{service.name}</h3>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{service.category}</span>
            </div>
            <p className="mt-2 text-sm text-slate-500">Starting at ₹{service.basePrice.toLocaleString()}</p>
            <div className="mt-4">
              <p className="text-xs font-semibold text-slate-500">Packages</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {service.packages.map((pkg) => (
                  <span key={pkg.name} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {pkg.name} • ₹{pkg.price.toLocaleString()}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs font-semibold text-slate-500">Inclusions</p>
              <ul className="mt-2 text-sm text-slate-600 list-disc list-inside">
                {service.inclusions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorServices;
