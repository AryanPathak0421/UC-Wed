import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useVendorState } from '../useVendorState';
import Icon from '../../../components/ui/Icon';

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

  useEffect(() => {
    if (showModal) { document.body.style.overflow = 'hidden'; }
    else { document.body.style.overflow = 'unset'; }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showModal]);

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
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-7 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full opacity-15" style={{
          background: 'radial-gradient(circle, #D28A8C, transparent 70%)'
        }}></div>
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 relative z-10">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#D28A8C' }}>Quotes</p>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5 sm:mt-1">Quotation management</h2>
            <p className="text-xs sm:text-sm font-medium" style={{ color: '#94a3b8' }}>Build and share detailed quotes with clients.</p>
          </div>
          <button 
            type="button" 
            className="vendor-cta rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 text-[11px] sm:text-xs font-semibold tracking-wide" 
            onClick={() => setShowModal(true)}
          >
            Send quote
          </button>
        </div>
      </div>

      {/* Quote Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 overflow-hidden" style={{
          background: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }}>
          <div className="w-full max-w-xl rounded-[1.5rem] p-4 sm:p-6 shadow-2xl relative my-auto" style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #FAF2F2 100%)',
            border: '1px solid rgba(210, 138, 140, 0.1)'
          }}>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 leading-none">Create New Quote</h3>
                <p className="text-[11px] sm:text-sm font-medium mt-1" style={{ color: '#94a3b8' }}>Draft a detailed quotation for your client.</p>
              </div>
              <button 
                onClick={() => setShowModal(false)} 
                className="h-8 w-8 flex items-center justify-center rounded-full text-slate-400 hover:text-rose-500 transition-all active:scale-90"
                style={{ background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)' }}
              >
                <Icon name="close" size="xs" color="current" />
              </button>
            </div>

            <div className="space-y-4 sm:space-y-5 max-h-[75vh] overflow-y-auto pr-1 no-scrollbar">
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Customer Name</label>
                <input 
                  className="w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition-all"
                  style={{
                    border: '1px solid rgba(210, 138, 140, 0.12)',
                    background: 'rgba(253, 242, 248, 0.25)'
                  }}
                  placeholder="e.g. Rahul Sharma"
                  value={newQuote.customerName}
                  onChange={(e) => setNewQuote({...newQuote, customerName: e.target.value})}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between ml-1">
                  <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#94a3b8' }}>Line Items</p>
                  <button 
                    type="button" 
                    className="text-[10px] font-semibold uppercase tracking-wider transition-all hover:scale-105"
                    style={{ color: '#D28A8C' }}
                    onClick={handleAddItem}
                  >
                    + Add More
                  </button>
                </div>
                <div className="space-y-2">
                  {newQuote.items.map((item, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input 
                        placeholder="Service description"
                        className="flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all outline-none"
                        style={{
                          border: '1px solid rgba(210, 138, 140, 0.12)',
                          background: 'rgba(253, 242, 248, 0.25)'
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
                        placeholder="Amt"
                        className="w-24 sm:w-32 rounded-xl px-3 sm:px-4 py-2.5 text-sm font-semibold transition-all outline-none"
                        style={{
                          border: '1px solid rgba(210, 138, 140, 0.12)',
                          background: 'rgba(253, 242, 248, 0.25)',
                          color: '#A35E60'
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

              <div className="pt-4 border-t flex justify-between items-center px-1" style={{ borderColor: 'rgba(210, 138, 140, 0.1)' }}>
                <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#94a3b8' }}>Estimate Total</span>
                <span className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent" style={{
                  backgroundImage: 'linear-gradient(135deg, #D28A8C, #C27A7C, #a855f7)'
                }}>
                  ₹{newQuote.items.reduce((sum, i) => sum + (Number(i.amount) || 0), 0).toLocaleString()}
                </span>
              </div>

              <button 
                className="vendor-cta w-full rounded-xl py-3.5 font-semibold text-sm sm:text-base mt-2 active:scale-[0.98] transition-all"
                onClick={handleSave}
              >
                Send Quotation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fast Packages & Recent Quotes */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-7">
          <div className="flex items-center gap-2 mb-3 sm:mb-5">
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg sm:rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)'
            }}>
              <Icon name="plan" size="xs" color="#A35E60" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900">Quick packages</h3>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {vendorState.services.flatMap((service) => service.packages).slice(0, 3).map((pkg, index) => (
              <div key={`${pkg.name}-${index}`} className="flex items-center justify-between rounded-xl sm:rounded-2xl p-3 sm:p-4 transition-all hover:scale-[1.01]" style={{
                background: 'rgba(253, 242, 248, 0.3)',
                border: '1px solid rgba(210, 138, 140, 0.06)'
              }}>
                <span className="text-xs sm:text-sm font-semibold text-slate-700">{pkg.name}</span>
                <span className="text-xs sm:text-sm font-semibold" style={{ color: '#D28A8C' }}>₹{pkg.price.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-7">
          <div className="flex items-center gap-2 mb-3 sm:mb-5">
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg sm:rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)'
            }}>
              <Icon name="edit" size="xs" color="#A35E60" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900">Recent quotes</h3>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {vendorState.quotes.map((quote) => {
              const total = quote.items.reduce((sum, item) => sum + item.amount, 0);
              return (
                <div key={quote.id} className="rounded-xl sm:rounded-2xl p-3.5 sm:p-5 transition-all hover:scale-[1.01]" style={{
                  border: '1px solid rgba(210, 138, 140, 0.08)',
                  background: 'rgba(253, 242, 248, 0.2)'
                }}>
                  <div className="flex items-center justify-between mb-2 sm:mb-3 border-b pb-2 sm:pb-3" style={{ borderColor: 'rgba(210, 138, 140, 0.08)' }}>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900">{quote.customerName}</p>
                    <span className="rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider" style={{
                      background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)', color: '#A35E60'
                    }}>{quote.status}</span>
                  </div>
                  <div className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs font-semibold" style={{ color: '#64748b' }}>
                    {quote.items.map((item) => (
                      <div key={item.label} className="flex items-center justify-between">
                        <span>{item.label}</span>
                        <span>₹{item.amount.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between font-semibold pt-1.5 sm:pt-2 mt-1.5 sm:mt-2 border-t" style={{ borderColor: 'rgba(210, 138, 140, 0.08)', color: '#D28A8C' }}>
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
