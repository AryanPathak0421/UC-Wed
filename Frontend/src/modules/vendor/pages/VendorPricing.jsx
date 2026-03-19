import { useState, useEffect } from 'react';
import { useVendorState } from '../useVendorState';
import Icon from '../../../components/ui/Icon';

const VendorPricing = () => {
  const { vendorState, updateVendorState } = useVendorState();
  const [showModal, setShowModal] = useState(false);
  
  const [tempPricing, setTempPricing] = useState({
    range: '',
    notes: ''
  });

  useEffect(() => {
    if (showModal) { document.body.style.overflow = 'hidden'; }
    else { document.body.style.overflow = 'unset'; }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showModal]);

  const handleOpenModal = () => {
    setTempPricing({
      range: vendorState?.pricing?.range || '',
      notes: vendorState?.pricing?.notes || ''
    });
    setShowModal(true);
  };

  const handleSave = () => {
    updateVendorState({ 
      pricing: {
        range: tempPricing.range,
        notes: tempPricing.notes
      }
    });
    setShowModal(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-7 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full opacity-15" style={{
          background: 'radial-gradient(circle, #D28A8C, transparent 70%)'
        }}></div>
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 relative z-10">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#D28A8C' }}>Pricing</p>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5 sm:mt-1">Pricing overview</h2>
            <p className="text-xs sm:text-sm font-medium" style={{ color: '#94a3b8' }}>Share starting prices and package structures with customers.</p>
          </div>
          <button 
            type="button" 
            className="vendor-cta rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 text-[11px] sm:text-xs font-semibold tracking-wide" 
            onClick={handleOpenModal}
          >
            Update pricing
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 overflow-hidden" style={{
          background: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }}>
          <div className="w-full max-w-lg rounded-[1.5rem] p-4 sm:p-6 shadow-2xl relative" style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #FAF2F2 100%)',
            border: '1px solid rgba(210, 138, 140, 0.1)'
          }}>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 leading-none">Update Pricing</h3>
                <p className="text-[11px] sm:text-sm font-medium mt-1" style={{ color: '#94a3b8' }}>Set your business's price range and notes.</p>
              </div>
              <button 
                onClick={() => setShowModal(false)} 
                className="h-8 w-8 flex items-center justify-center rounded-full text-slate-400 hover:text-rose-500 transition-all active:scale-90"
                style={{ background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)' }}
              >
                <Icon name="close" size="xs" color="current" />
              </button>
            </div>

            <div className="space-y-4 sm:space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Price Range (e.g. 50k - 2L)</label>
                <input 
                  className="w-full rounded-xl px-4 py-2.5 sm:py-3 text-sm font-semibold transition-all"
                  style={{
                    border: '1px solid rgba(210, 138, 140, 0.12)',
                    background: 'rgba(253, 242, 248, 0.25)'
                  }}
                  value={tempPricing.range}
                  onChange={(e) => setTempPricing({...tempPricing, range: e.target.value})}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Pricing Notes</label>
                <textarea 
                  className="w-full rounded-xl px-4 py-2.5 sm:py-3 text-sm font-semibold h-24 sm:h-32 resize-none transition-all"
                  style={{
                    border: '1px solid rgba(210, 138, 140, 0.12)',
                    background: 'rgba(253, 242, 248, 0.25)'
                  }}
                  placeholder="Mention what's included in your base price..."
                  value={tempPricing.notes}
                  onChange={(e) => setTempPricing({...tempPricing, notes: e.target.value})}
                />
              </div>

              <button 
                className="vendor-cta w-full rounded-xl py-3.5 font-semibold text-sm sm:text-base mt-2 active:scale-[0.98] transition-all" 
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Cards */}
      <div className="grid gap-3 sm:gap-5 md:grid-cols-2">
        <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-6 group cursor-default">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider" style={{ color: '#94a3b8' }}>Current price range</p>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 sm:mt-2">{vendorState?.pricing?.range || 'Not set'}</h3>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-medium" style={{ color: '#64748b' }}>{vendorState?.pricing?.notes}</p>
            </div>
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110" style={{
              background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)'
            }}>
              <Icon name="money" size="sm" color="#A35E60" />
            </div>
          </div>
        </div>
        <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg sm:rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)'
            }}>
              <Icon name="plan" size="xs" color="#A35E60" />
            </div>
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider" style={{ color: '#94a3b8' }}>Package highlights</p>
          </div>
          <div className="space-y-1.5 sm:space-y-2">
            {vendorState.services.flatMap((service) => service.packages).map((pkg, index) => (
              <div key={`${pkg.name}-${index}`} className="flex items-center justify-between rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 transition-all hover:scale-[1.01]" style={{
                background: 'rgba(253, 242, 248, 0.3)',
                border: '1px solid rgba(210, 138, 140, 0.06)'
              }}>
                <span className="text-xs sm:text-sm font-semibold text-slate-700">{pkg.name}</span>
                <span className="text-xs sm:text-sm font-semibold" style={{ color: '#D28A8C' }}>₹{pkg.price.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorPricing;
