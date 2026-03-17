import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useVendorState } from '../useVendorState';

const VendorQuotes = () => {
  const { vendorState, updateVendorState } = useVendorState();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [newQuote, setNewQuote] = useState({
    customerName: '',
    items: [{ label: '', amount: '' }]
  });

  useEffect(() => {
    if (location.state?.prefillName) {
      setNewQuote(prev => ({ ...prev, customerName: location.state.prefillName }));
      setShowModal(true);
    }
  }, [location.state]);

  const handleAddItem = () => {
    setNewQuote({ ...newQuote, items: [...newQuote.items, { label: '', amount: '' }] });
  };

  const handleSave = () => {
    if (!newQuote.customerName || newQuote.items.some(i => !i.label || !i.amount)) {
      alert('Please fill in customer name and all line items.');
      return;
    }
    const quoteToAdd = {
      id: `q-${Date.now()}`,
      customerName: newQuote.customerName,
      status: 'Sent',
      items: newQuote.items.map(i => ({ label: i.label, amount: Number(i.amount) }))
    };

    // Connectivity: Update lead status to 'Quoted'
    const updatedLeads = (vendorState.leads || []).map(lead => 
      lead.customerName === newQuote.customerName ? { ...lead, status: 'Quoted' } : lead
    );

    updateVendorState({ 
      quotes: [quoteToAdd, ...vendorState.quotes],
      leads: updatedLeads
    });
    
    setShowModal(false);
    setNewQuote({ customerName: '', items: [{ label: '', amount: '' }] });
  };

  return (
    <div className="space-y-6">
      <div className="vendor-surface rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Quotes</p>
            <h2 className="text-2xl font-bold text-slate-900">Quotation management</h2>
            <p className="text-sm text-slate-500">Build and share detailed quotes with clients.</p>
          </div>
          <button 
            type="button" 
            className="vendor-cta rounded-xl px-4 py-2 text-xs font-semibold" 
            onClick={() => setShowModal(true)}
          >
            Send quote
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-[2rem] p-8 shadow-2xl relative my-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-black text-slate-900 leading-none">Create New Quote</h3>
                <p className="text-sm text-slate-500 mt-2 font-medium">Draft a detailed quotation for your client.</p>
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
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">Customer Name</label>
                <input 
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-3.5 text-sm font-semibold focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all"
                  placeholder="e.g. Rahul Sharma"
                  value={newQuote.customerName}
                  onChange={(e) => setNewQuote({...newQuote, customerName: e.target.value})}
                />
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between ml-1">
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Line Items</p>
                  <button 
                    type="button" 
                    className="text-[11px] font-black text-emerald-600 hover:text-emerald-700 flex items-center gap-1 uppercase tracking-wider"
                    onClick={handleAddItem}
                  >
                    + Add More
                  </button>
                </div>
                <div className="space-y-3">
                  {newQuote.items.map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <input 
                        placeholder="Service description"
                        className="flex-1 rounded-2xl border border-slate-200 bg-slate-50/30 px-5 py-3 text-sm font-medium focus:border-emerald-500 focus:bg-white transition-all outline-none"
                        value={item.label}
                        onChange={(e) => {
                          const items = [...newQuote.items];
                          items[idx].label = e.target.value;
                          setNewQuote({...newQuote, items});
                        }}
                      />
                      <input 
                        type="number"
                        placeholder="Amount"
                        className="w-32 rounded-2xl border border-slate-200 bg-slate-50/30 px-5 py-3 text-sm font-bold text-emerald-700 focus:border-emerald-500 focus:bg-white transition-all outline-none"
                        value={item.amount}
                        onChange={(e) => {
                          const items = [...newQuote.items];
                          items[idx].amount = e.target.value;
                          setNewQuote({...newQuote, items});
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-between items-center px-2">
                <span className="text-sm font-bold text-slate-500 tracking-wide">ESTIMATE TOTAL</span>
                <span className="text-2xl font-black text-slate-900 tracking-tight">₹{newQuote.items.reduce((sum, i) => sum + (Number(i.amount) || 0), 0).toLocaleString()}</span>
              </div>

              <button 
                className="vendor-cta w-full rounded-2xl py-5 font-bold text-lg mt-4 shadow-xl shadow-emerald-100 active:scale-95 transition-all"
                onClick={handleSave}
              >
                Send Quotation
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="vendor-surface rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-slate-900">Quick packages</h3>
          <div className="mt-4 space-y-3">
            {vendorState.services.flatMap((service) => service.packages).slice(0, 3).map((pkg, index) => (
              <div key={`${pkg.name}-${index}`} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                <span className="text-sm font-semibold text-slate-700">{pkg.name}</span>
                <span className="text-sm font-semibold text-emerald-700">₹{pkg.price.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="vendor-surface rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-slate-900">Recent quotes</h3>
          <div className="mt-4 space-y-4">
            {vendorState.quotes.map((quote) => {
              const total = quote.items.reduce((sum, item) => sum + item.amount, 0);
              return (
                <div key={quote.id} className="rounded-2xl border border-slate-100 px-4 py-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">{quote.customerName}</p>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{quote.status}</span>
                  </div>
                  <div className="mt-3 space-y-2 text-xs text-slate-500">
                    {quote.items.map((item) => (
                      <div key={item.label} className="flex items-center justify-between">
                        <span>{item.label}</span>
                        <span>₹{item.amount.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between font-semibold text-slate-700">
                      <span>Total</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorQuotes;
