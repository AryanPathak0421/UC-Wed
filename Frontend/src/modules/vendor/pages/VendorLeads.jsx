import { useNavigate } from 'react-router-dom';
import { useVendorState } from '../useVendorState';
import Icon from '../../../components/ui/Icon';

const statusOptions = ['New', 'Contacted', 'Quoted', 'Confirmed', 'Not converted'];

const VendorLeads = () => {
  const { vendorState, updateVendorState } = useVendorState();
  const navigate = useNavigate();

  const updateStatus = (leadId, status) => {
    const updated = vendorState.leads.map((lead) =>
      lead.id === leadId ? { ...lead, status } : lead
    );
    updateVendorState({ leads: updated });
  };

  const handleCreateQuote = (customerName) => {
    navigate('/vendor/quotes', { state: { prefillName: customerName } });
  };

  const getLeadStatusStyle = (status) => {
    switch (status) {
      case 'New': return { bg: 'linear-gradient(135deg, #fdf2f8, #fce7f3)', color: '#be185d' };
      case 'Quoted': return { bg: 'linear-gradient(135deg, #eff6ff, #dbeafe)', color: '#1d4ed8' };
      case 'Confirmed': return { bg: 'linear-gradient(135deg, #ec4899, #db2777)', color: '#ffffff' };
      default: return { bg: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)', color: '#475569' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="vendor-surface rounded-3xl p-7 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full opacity-15" style={{
          background: 'radial-gradient(circle, #ec4899, transparent 70%)'
        }}></div>
        <div className="flex items-center justify-between relative z-10">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: '#ec4899' }}>Vendor Live Control</p>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">Incoming inquiries</h2>
            <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>Tracking {(vendorState.leads || []).length} active potential clients</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="h-10 px-5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all active:scale-95 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)',
              border: '1px solid rgba(236, 72, 153, 0.1)',
              color: '#be185d'
            }}
          >
            <Icon name="clock" size="xs" /> Refresh
          </button>
        </div>
      </div>

      {/* Leads List */}
      <div className="vendor-surface rounded-3xl p-7">
        <div className="space-y-4">
          {(vendorState.leads || []).length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">💌</div>
              <p className="font-bold text-slate-400">No leads found</p>
              <p className="text-xs mt-1" style={{ color: '#94a3b8' }}>New inquiries will appear here</p>
            </div>
          ) : (
            vendorState.leads.map((lead) => {
              const statusStyle = getLeadStatusStyle(lead.status);
              return (
                <div key={lead.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5 transition-all hover:scale-[1.01] group" style={{
                  border: '1px solid rgba(236, 72, 153, 0.08)',
                  background: 'rgba(253, 242, 248, 0.2)'
                }}>
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-2">
                      <div className="h-9 w-9 rounded-xl flex items-center justify-center text-sm flex-shrink-0" style={{
                        background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)'
                      }}>💍</div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{lead.customerName}</p>
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider" style={{
                          background: statusStyle.bg,
                          color: statusStyle.color
                        }}>{lead.status}</span>
                      </div>
                    </div>
                    <p className="text-xs font-medium mt-2" style={{ color: '#94a3b8' }}>{lead.eventDate} • {lead.eventLocation}</p>
                    <p className="mt-2 text-xs italic font-medium" style={{ color: '#64748b' }}>"{lead.message}"</p>
                    <div className="mt-2 flex gap-4 text-[10px] font-black uppercase tracking-wider" style={{ color: '#cbd5e1' }}>
                      <span>{lead.phone}</span>
                      <span>{lead.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {lead.status !== 'Quoted' && lead.status !== 'Confirmed' && (
                      <button 
                        onClick={() => handleCreateQuote(lead.customerName)}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                        style={{
                          background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)',
                          color: '#be185d',
                          border: '1px solid rgba(236, 72, 153, 0.15)'
                        }}
                      >
                        <Icon name="edit" size="xs" /> Send Quote
                      </button>
                    )}
                    <select
                      className="rounded-xl bg-white px-3 py-2.5 text-xs font-bold appearance-none cursor-pointer"
                      style={{
                        border: '1px solid rgba(236, 72, 153, 0.15)',
                        color: '#475569'
                      }}
                      value={lead.status}
                      onChange={(event) => updateStatus(lead.id, event.target.value)}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorLeads;
