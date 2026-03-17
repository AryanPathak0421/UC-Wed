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

  return (
    <div className="space-y-6">
      <div className="group flex flex-col gap-4 rounded-3xl bg-white border border-slate-100 px-6 py-6 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] lg:text-xs font-bold uppercase tracking-[0.15em] text-emerald-600/80">Vendor Live Control</p>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">Incoming inquiries</h2>
            <p className="text-sm text-slate-500 font-medium">Tracking {(vendorState.leads || []).length} active potential clients</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="h-10 px-4 rounded-xl bg-slate-50 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-100 transition-all active:scale-95 flex items-center gap-2 text-xs font-bold"
          >
            <Icon name="clock" size="xs" /> Refresh
          </button>
        </div>
      </div>

      <div className="vendor-surface rounded-2xl p-6">
        <div className="space-y-4">
          {(vendorState.leads || []).length === 0 ? (
            <p className="text-center py-8 text-slate-500">No leads found.</p>
          ) : (
            vendorState.leads.map((lead) => (
              <div key={lead.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-100 px-4 py-4 hover:border-emerald-200 transition-colors">
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900">{lead.customerName}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      lead.status === 'New' ? 'bg-emerald-100 text-emerald-700' : 
                      lead.status === 'Quoted' ? 'bg-blue-100 text-blue-700' :
                      lead.status === 'Confirmed' ? 'bg-emerald-600 text-white' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {lead.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{lead.eventDate} • {lead.eventLocation}</p>
                  <p className="mt-2 text-xs text-slate-600 italic">"{lead.message}"</p>
                  <div className="mt-2 flex gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <span>{lead.phone}</span>
                    <span>{lead.email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {lead.status !== 'Quoted' && lead.status !== 'Confirmed' && (
                    <button 
                      onClick={() => handleCreateQuote(lead.customerName)}
                      className="px-3 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-colors flex items-center gap-2"
                    >
                      <Icon name="edit" size="xs" /> Send Quote
                    </button>
                  )}
                  <select
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={lead.status}
                    onChange={(event) => updateStatus(lead.id, event.target.value)}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorLeads;
