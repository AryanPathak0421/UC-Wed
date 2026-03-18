import { useState } from 'react';
import { useVendorState } from '../useVendorState';

const VendorPricing = () => {
  const { vendorState, updateVendorState } = useVendorState();
  const [showModal, setShowModal] = useState(false);
  
  const [tempPricing, setTempPricing] = useState({
    range: '',
    notes: ''
  });

  const handleOpenModal = () => {
    console.log('Opening pricing modal');
    setTempPricing({
      range: vendorState?.pricing?.range || '',
      notes: vendorState?.pricing?.notes || ''
    });
    setShowModal(true);
  };

  const handleSave = () => {
    console.log('Saving new pricing:', tempPricing);
    updateVendorState({ 
      pricing: {
        range: tempPricing.range,
        notes: tempPricing.notes
      }
    });
    setShowModal(false);
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
            <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: '#ec4899' }}>Pricing</p>
            <h2 className="text-2xl font-black text-slate-900 mt-1">Pricing overview</h2>
            <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>Share starting prices and package structures with customers.</p>
          </div>
          <button 
            type="button" 
            className="vendor-cta rounded-2xl px-6 py-3 text-xs font-black tracking-wide" 
            onClick={handleOpenModal}
          >
            Update pricing
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{
          background: 'rgba(15, 23, 42, 0.5)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)'
        }}>
          <div className="w-full max-w-lg rounded-[2rem] p-8 shadow-2xl relative" style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #fdf2f8 100%)',
            border: '1px solid rgba(236, 72, 153, 0.1)'
          }}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-black text-slate-900 leading-none">Update Pricing</h3>
                <p className="text-sm font-medium mt-2" style={{ color: '#94a3b8' }}>Set your business's price range and notes.</p>
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
              <div className="space-y-2.5">
                <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Price Range (e.g. 50k - 2L)</label>
                <input 
                  className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
                  style={{
                    border: '1px solid rgba(236, 72, 153, 0.15)',
                    background: 'rgba(253, 242, 248, 0.3)'
                  }}
                  value={tempPricing.range}
                  onChange={(e) => setTempPricing({...tempPricing, range: e.target.value})}
                />
              </div>

              <div className="space-y-2.5">
                <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Pricing Notes</label>
                <textarea 
                  className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold h-32 resize-none transition-all"
                  style={{
                    border: '1px solid rgba(236, 72, 153, 0.15)',
                    background: 'rgba(253, 242, 248, 0.3)'
                  }}
                  placeholder="Mention what's included in your base price..."
                  value={tempPricing.notes}
                  onChange={(e) => setTempPricing({...tempPricing, notes: e.target.value})}
                />
              </div>

              <button 
                className="vendor-cta w-full rounded-2xl py-5 font-black text-lg mt-4 active:scale-95 transition-all" 
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Cards */}
      <div className="grid gap-5 md:grid-cols-2">
        <div className="vendor-surface rounded-3xl p-6 group cursor-default">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#94a3b8' }}>Current price range</p>
              <h3 className="text-2xl font-black text-slate-900 mt-2">{vendorState?.pricing?.range || 'Not set'}</h3>
              <p className="mt-2 text-sm font-medium" style={{ color: '#64748b' }}>{vendorState?.pricing?.notes}</p>
            </div>
            <div className="h-12 w-12 rounded-2xl flex items-center justify-center text-xl transition-transform group-hover:scale-110" style={{
              background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)'
            }}>&#128176;</div>
          </div>
        </div>
        <div className="vendor-surface rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)'
            }}>
              <span className="text-sm">&#128230;</span>
            </div>
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#94a3b8' }}>Package highlights</p>
          </div>
          <div className="space-y-2">
            {vendorState.services.flatMap((service) => service.packages).map((pkg, index) => (
              <div key={`${pkg.name}-${index}`} className="flex items-center justify-between rounded-2xl p-3.5 transition-all hover:scale-[1.01]" style={{
                background: 'rgba(253, 242, 248, 0.3)',
                border: '1px solid rgba(236, 72, 153, 0.06)'
              }}>
                <span className="text-sm font-bold text-slate-700">{pkg.name}</span>
                <span className="text-sm font-black" style={{ color: '#ec4899' }}>&#8377;{pkg.price.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorPricing;
