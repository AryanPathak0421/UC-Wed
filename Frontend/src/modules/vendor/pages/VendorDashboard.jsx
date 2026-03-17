import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/ui/Icon';
import { useVendorState } from '../useVendorState';
import { computeProfileCompletion, getListingStatusClass } from '../vendorStore';

const VendorDashboard = () => {
  const navigate = useNavigate();
  const { vendorState, updateVendorState } = useVendorState();
  const completion = computeProfileCompletion(vendorState);

  const handleSubmitListing = () => {
    updateVendorState({ listingStatus: 'Pending' });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="vendor-surface rounded-2xl p-5">
          <p className="text-xs font-semibold text-slate-500">Profile views</p>
          <h3 className="text-2xl font-bold text-slate-900">{vendorState.analytics.profileViews}</h3>
          <p className="text-xs text-emerald-600">+12% this month</p>
        </div>
        <div className="vendor-surface rounded-2xl p-5">
          <p className="text-xs font-semibold text-slate-500">Inquiries</p>
          <h3 className="text-2xl font-bold text-slate-900">{vendorState.analytics.inquiries}</h3>
          <p className="text-xs text-emerald-600">New leads today</p>
        </div>
        <div className="vendor-surface rounded-2xl p-5">
          <p className="text-xs font-semibold text-slate-500">Bookings</p>
          <h3 className="text-2xl font-bold text-slate-900">{vendorState.analytics.bookings}</h3>
          <p className="text-xs text-emerald-600">Confirmed events</p>
        </div>
        <div className="vendor-surface rounded-2xl p-5">
          <p className="text-xs font-semibold text-slate-500">Conversion rate</p>
          <h3 className="text-2xl font-bold text-slate-900">{vendorState.analytics.conversionRate}%</h3>
          <p className="text-xs text-emerald-600">Lead to booking</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="vendor-surface rounded-2xl p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Profile completion</p>
              <h3 className="text-xl font-bold text-slate-900">{completion}% complete</h3>
              <p className="text-sm text-slate-500">Complete your profile to improve ranking.</p>
            </div>
            <div className="text-sm font-semibold text-slate-600">Listing status</div>
            <span className={'vendor-status-pill ' + getListingStatusClass(vendorState.listingStatus)}>{vendorState.listingStatus}</span>
          </div>
          <div className="mt-4 h-2 w-full rounded-full bg-slate-100">
            <div className="h-2 rounded-full bg-emerald-500" style={{ width: completion + '%' }}></div>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button type="button" className="vendor-cta rounded-xl px-4 py-2 text-xs font-semibold" onClick={handleSubmitListing}>
              Submit for review
            </button>
            <button 
              type="button" 
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95"
              onClick={() => navigate('/vendor/profile')}
            >
              Update profile
            </button>
          </div>
        </div>

        <div className="vendor-surface rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-slate-900">Recent activity</h3>
          <div className="mt-4 space-y-3">
            {vendorState.notifications.map((note) => (
              <div key={note.id} className="flex items-start gap-3 rounded-xl bg-slate-50 px-3 py-3">
                <div className="mt-1 rounded-full bg-emerald-100 p-2 text-emerald-600">
                  <Icon name="bell" size="sm" color="current" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{note.message}</p>
                  <p className="text-xs text-slate-500">{note.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="vendor-surface rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-slate-900">Latest leads</h3>
          <div className="mt-4 space-y-3">
            {vendorState.leads.map((lead) => (
              <div key={lead.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{lead.customerName}</p>
                  <p className="text-xs text-slate-500">{lead.eventDate} • {lead.eventLocation}</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{lead.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="vendor-surface rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-slate-900">Upcoming bookings</h3>
          <div className="mt-4 space-y-3">
            {vendorState.bookings.map((booking) => (
              <div key={booking.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{booking.customerName}</p>
                  <p className="text-xs text-slate-500">{booking.eventDate} • {booking.location}</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{booking.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;