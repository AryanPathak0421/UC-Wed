import Icon from '../../../components/ui/Icon';
import { useVendorState } from '../useVendorState';

const VendorBookings = () => {
  const { vendorState, updateVendorState } = useVendorState();

  const handleStatusUpdate = (bookingId, newStatus) => {
    const updatedBookings = vendorState.bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    );
    updateVendorState({ bookings: updatedBookings });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted': return 'bg-emerald-50 text-emerald-700';
      case 'Rejected': return 'bg-rose-50 text-rose-700';
      case 'Confirmed': return 'bg-blue-50 text-blue-700';
      case 'Pending': return 'bg-amber-50 text-amber-700';
      default: return 'bg-slate-50 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 vendor-surface rounded-2xl p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Bookings</p>
          <h2 className="text-2xl font-bold text-slate-900">Manage confirmed events</h2>
          <p className="text-sm text-slate-500">Track event details, payment status, and assignments.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-bold text-slate-900">{vendorState.bookings.length} Bookings</p>
            <p className="text-[10px] text-slate-500">Latest updates</p>
          </div>
          <button 
            type="button" 
            onClick={() => window.location.reload()}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 hover:text-emerald-500 hover:border-emerald-100 transition-all active:scale-95"
          >
            <Icon name="plan" size="sm" />
          </button>
        </div>
      </div>

      <div className="vendor-surface rounded-2xl p-6">
        <div className="grid gap-4">
          {vendorState.bookings.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-slate-500 italic">No bookings found</p>
            </div>
          ) : (
            vendorState.bookings.map((booking) => (
              <div key={booking.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-100 px-4 py-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{booking.customerName}</p>
                  <p className="text-xs text-slate-500">{booking.eventDate} • {booking.location}</p>
                  <p className="text-xs text-slate-500">Services: {booking.services.join(', ')}</p>
                </div>
                <div className="text-right space-y-2">
                  <p className="text-sm font-semibold text-emerald-700">₹{booking.totalPrice.toLocaleString()}</p>
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                  
                  {(booking.status === 'Confirmed' || booking.status === 'Pending') && (
                    <div className="flex gap-2 justify-end">
                      <button 
                        type="button" 
                        onClick={() => handleStatusUpdate(booking.id, 'Accepted')}
                        className="rounded-xl border border-emerald-200 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors"
                      >
                        Accept
                      </button>
                      <button 
                        type="button" 
                        onClick={() => handleStatusUpdate(booking.id, 'Rejected')}
                        className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorBookings;