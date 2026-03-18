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
      {/* Header */}
      <div className="vendor-surface rounded-3xl p-7 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full opacity-15" style={{
          background: 'radial-gradient(circle, #ec4899, transparent 70%)'
        }}></div>
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: '#ec4899' }}>Quotes</p>
            <h2 className="text-2xl font-black text-slate-900 mt-1">Quotation management</h2>
            <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>Build and share detailed quotes with clients.</p>
          </div>
          <button 
            type="button" 
            className="vendor-cta rounded-2xl px-6 py-3 text-xs font-black tracking-wide" 
            onClick={() => setShowModal(true)}
          >
            Send quote
          </button>
        </div>
      </div>

      {/* Quote Modal */}
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
                <h3 className="text-2xl font-black text-slate-900 leading-none">Create New Quote</h3>
                <p className="text-sm font-medium mt-2" style={{ color: '#94a3b8' }}>Draft a detailed quotation for your client.</p>
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
                <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Customer Name</label>
                <input 
                  className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
                  style={{
                    border: '1px solid rgba(236, 72, 153, 0.15)',
                    background: 'rgba(253, 242, 248, 0.3)'
                  }}
                  placeholder="e.g. Rahul Sharma"
                  value={newQuote.customerName}
                  onChange={(e) => setNewQuote({...newQuote, customerName: e.target.value})}
                />
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between ml-1">
                  <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#94a3b8' }}>Line Items</p>
                  <button 
                    type="button" 
                    className="text-[11px] font-black uppercase tracking-wider transition-all hover:scale-105"
                    style={{ color: '#ec4899' }}
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
                        className="flex-1 rounded-2xl px-5 py-3 text-sm font-semibold transition-all outline-none"
                        style={{
                          border: '1px solid rgba(236, 72, 153, 0.15)',
                          background: 'rgba(253, 242, 248, 0.3)'
                        }}
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
                        className="w-32 rounded-2xl px-5 py-3 text-sm font-black transition-all outline-none"
                        style={{
                          border: '1px solid rgba(236, 72, 153, 0.15)',
                          background: 'rgba(253, 242, 248, 0.3)',
                          color: '#be185d'
                        }}
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

              <div className="pt-6 border-t flex justify-between items-center px-2" style={{ borderColor: 'rgba(236, 72, 153, 0.1)' }}>
                <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#94a3b8' }}>Estimate Total</span>
                <span className="text-3xl font-black bg-clip-text text-transparent" style={{
                  backgroundImage: 'linear-gradient(135deg, #ec4899, #db2777, #a855f7)'
                }}>
                  ₹{newQuote.items.reduce((sum, i) => sum + (Number(i.amount) || 0), 0).toLocaleString()}
                </span>
              </div>

              <button 
                className="vendor-cta w-full rounded-2xl py-5 font-black text-lg mt-4 active:scale-95 transition-all"
                onClick={handleSave}
              >
                Send Quotation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fast Packages & Recent Quotes */}
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="vendor-surface rounded-3xl p-7">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)'
            }}>
              <span className="text-sm">&#128230;</span>
            </div>
            <h3 className="text-lg font-black text-slate-900">Quick packages</h3>
          </div>
          <div className="space-y-3">
            {vendorState.services.flatMap((service) => service.packages).slice(0, 3).map((pkg, index) => (
              <div key={`${pkg.name}-${index}`} className="flex items-center justify-between rounded-2xl p-4 transition-all hover:scale-[1.01]" style={{
                background: 'rgba(253, 242, 248, 0.3)',
                border: '1px solid rgba(236, 72, 153, 0.06)'
              }}>
                <span className="text-sm font-bold text-slate-700">{pkg.name}</span>
                <span className="text-sm font-black" style={{ color: '#ec4899' }}>₹{pkg.price.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="vendor-surface rounded-3xl p-7">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)'
            }}>
              <span className="text-sm">&#128196;</span>
            </div>
            <h3 className="text-lg font-black text-slate-900">Recent quotes</h3>
          </div>
          <div className="space-y-4">
            {vendorState.quotes.map((quote) => {
              const total = quote.items.reduce((sum, item) => sum + item.amount, 0);
              return (
                <div key={quote.id} className="rounded-2xl p-5 transition-all hover:scale-[1.01]" style={{
                  border: '1px solid rgba(236, 72, 153, 0.08)',
                  background: 'rgba(253, 242, 248, 0.2)'
                }}>
                  <div className="flex items-center justify-between mb-3 border-b pb-3" style={{ borderColor: 'rgba(236, 72, 153, 0.08)' }}>
                    <p className="text-sm font-bold text-slate-900">{quote.customerName}</p>
                    <span className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider" style={{
                      background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)', color: '#be185d'
                    }}>{quote.status}</span>
                  </div>
                  <div className="space-y-2 text-xs font-semibold" style={{ color: '#64748b' }}>
                    {quote.items.map((item) => (
                      <div key={item.label} className="flex items-center justify-between">
                        <span>{item.label}</span>
                        <span>₹{item.amount.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between font-black pt-2 mt-2 border-t" style={{ borderColor: 'rgba(236, 72, 153, 0.08)', color: '#ec4899' }}>
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
