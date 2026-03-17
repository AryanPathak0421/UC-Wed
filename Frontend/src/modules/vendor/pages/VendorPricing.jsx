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
      <div className="vendor-surface rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Pricing</p>
            <h2 className="text-2xl font-bold text-slate-900">Pricing overview</h2>
            <p className="text-sm text-slate-500">Share starting prices and package structures with customers.</p>
          </div>
          <button 
            type="button" 
            className="vendor-cta rounded-xl px-4 py-2 text-xs font-semibold" 
            onClick={handleOpenModal}
          >
            Update pricing
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
          <div className="bg-white w-full max-w-lg rounded-[2rem] p-8 shadow-2xl relative">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-black text-slate-900 leading-none">Update Pricing</h3>
                <p className="text-sm text-slate-500 mt-2 font-medium">Set your business's price range and notes.</p>
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
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">Price Range (e.g. ₹50k - ₹2L)</label>
                <input 
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-3.5 text-sm font-semibold focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all"
                  value={tempPricing.range}
                  onChange={(e) => setTempPricing({...tempPricing, range: e.target.value})}
                />
              </div>

              <div className="space-y-2.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">Pricing Notes</label>
                <textarea 
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-3.5 text-sm font-semibold focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all h-32 resize-none"
                  placeholder="Mention what's included in your base price..."
                  value={tempPricing.notes}
                  onChange={(e) => setTempPricing({...tempPricing, notes: e.target.value})}
                />
              </div>

              <button 
                className="vendor-cta w-full rounded-2xl py-5 font-bold text-lg mt-4 shadow-xl shadow-emerald-100 active:scale-95 transition-all" 
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="vendor-surface rounded-2xl p-5">
          <p className="text-xs font-semibold text-slate-500">Current price range</p>
          <h3 className="text-2xl font-bold text-slate-900">₹{vendorState?.pricing?.range || '0'}</h3>
          <p className="mt-2 text-sm text-slate-500">{vendorState?.pricing?.notes}</p>
        </div>
        <div className="vendor-surface rounded-2xl p-5">
          <p className="text-xs font-semibold text-slate-500">Package highlights</p>
          <div className="mt-3 space-y-2">
            {vendorState.services.flatMap((service) => service.packages).map((pkg, index) => (
              <div key={`${pkg.name}-${index}`} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                <span className="text-sm font-semibold text-slate-700">{pkg.name}</span>
                <span className="text-sm font-semibold text-emerald-700">₹{pkg.price.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorPricing;
