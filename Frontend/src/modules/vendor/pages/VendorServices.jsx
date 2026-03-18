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
      {/* Header */}
      <div className="vendor-surface rounded-3xl p-7 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full opacity-15" style={{
          background: 'radial-gradient(circle, #ec4899, transparent 70%)'
        }}></div>
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: '#ec4899' }}>Services</p>
            <h2 className="text-2xl font-black text-slate-900 mt-1">Service listings</h2>
            <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>Showcase the services and packages you provide.</p>
          </div>
          <button 
            type="button" 
            className="vendor-cta rounded-2xl px-6 py-3 text-xs font-black tracking-wide"
            onClick={() => setShowModal(true)}
          >
            ➕ Add new service
          </button>
        </div>
      </div>

      {/* Add Service Modal */}
      {showModal && (
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
                onClick={() => setShowModal(false)} 
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
                    className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold appearance-none cursor-pointer transition-all"
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
                className="vendor-cta w-full rounded-2xl py-5 font-black text-lg mt-6 flex items-center justify-center gap-2 active:scale-95 transition-all"
                onClick={handleSave}
              >
                ✨ Save Listing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Service Cards */}
      <div className="grid gap-5 lg:grid-cols-2">
        {vendorState.services.map((service, i) => (
          <div key={service.id} className="vendor-surface rounded-3xl p-6 group relative overflow-hidden" style={{ animationDelay: `${i * 0.08}s` }}>
            {/* Decorative gradient corner */}
            <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full opacity-10 group-hover:opacity-20 transition-opacity" style={{
              background: 'radial-gradient(circle, #ec4899, transparent 70%)'
            }}></div>
            
            <div className="flex items-start justify-between relative z-10">
              <div className="flex items-start gap-3">
                <div className="h-11 w-11 rounded-2xl flex items-center justify-center text-lg flex-shrink-0" style={{
                  background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)'
                }}>
                  {service.category === 'Decoration' ? '🎨' : service.category === 'Photography' ? '📸' : service.category === 'Catering' ? '🍽️' : '🏛️'}
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">{service.name}</h3>
                  <p className="text-sm font-bold mt-0.5" style={{ color: '#ec4899' }}>Starting at ₹{service.basePrice.toLocaleString()}</p>
                </div>
              </div>
              <span className="rounded-full px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider" style={{
                background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)',
                color: '#be185d'
              }}>{service.category}</span>
            </div>
            
            <div className="mt-5 relative z-10">
              <p className="text-[10px] font-black uppercase tracking-wider mb-2" style={{ color: '#94a3b8' }}>Packages</p>
              <div className="flex flex-wrap gap-2">
                {service.packages.map((pkg) => (
                  <span key={pkg.name} className="rounded-2xl px-4 py-2 text-xs font-bold" style={{
                    background: 'rgba(253, 242, 248, 0.5)',
                    border: '1px solid rgba(236, 72, 153, 0.08)',
                    color: '#475569'
                  }}>
                    {pkg.name} • ₹{pkg.price.toLocaleString()}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-4 relative z-10">
              <p className="text-[10px] font-black uppercase tracking-wider mb-2" style={{ color: '#94a3b8' }}>Inclusions</p>
              <ul className="text-sm font-medium space-y-1" style={{ color: '#64748b' }}>
                {service.inclusions.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#ec4899' }}></span>
                    {item}
                  </li>
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
