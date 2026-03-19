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
      case 'Accepted': return { bg: 'linear-gradient(135deg, #ecfdf5, #d1fae5)', color: '#15803d' };
      case 'Rejected': return { bg: 'linear-gradient(135deg, #fff1f2, #ffe4e6)', color: '#be123c' };
      case 'Confirmed': return { bg: 'linear-gradient(135deg, #eff6ff, #dbeafe)', color: '#1d4ed8' };
      case 'Pending': return { bg: 'linear-gradient(135deg, #fffbeb, #fef3c7)', color: '#b45309' };
      default: return { bg: 'linear-gradient(135deg, #f8fafc, #f1f5f9)', color: '#475569' };
    }
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
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#D28A8C' }}>Bookings</p>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5 sm:mt-1">Manage confirmed events</h2>
            <p className="text-xs sm:text-sm font-medium" style={{ color: '#94a3b8' }}>Track event details, payment status, and assignments.</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="text-right">
              <p className="text-base sm:text-lg font-semibold text-slate-900">{vendorState.bookings.length}</p>
              <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#94a3b8' }}>Total Bookings</p>
            </div>
            <button 
              type="button" 
              onClick={() => window.location.reload()}
              className="flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl transition-all active:scale-95 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)',
                border: '1px solid rgba(210, 138, 140, 0.1)'
              }}
            >
              <Icon name="plan" size="sm" />
            </button>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-7">
        <div className="grid gap-3 sm:gap-4">
          {vendorState.bookings.length === 0 ? (
            <div className="py-10 sm:py-16 text-center">
              <div className="flex justify-center mb-3 sm:mb-4 text-slate-300">
                <Icon name="checkList" size="3xl" color="current" />
              </div>
              <p className="font-semibold text-slate-400 text-sm">No bookings found</p>
              <p className="text-xs mt-1" style={{ color: '#94a3b8' }}>New bookings will appear here</p>
            </div>
          ) : (
            vendorState.bookings.map((booking) => {
              const statusStyle = getStatusColor(booking.status);
              return (
                <div key={booking.id} className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 transition-all hover:scale-[1.01] group" style={{
                  border: '1px solid rgba(210, 138, 140, 0.08)',
                  background: 'rgba(253, 242, 248, 0.2)'
                }}>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0" style={{
                      background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)'
                    }}>
                      <Icon name="party" size="sm" color="#A35E60" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-slate-900">{booking.customerName}</p>
                      <p className="text-[11px] sm:text-xs font-medium mt-0.5" style={{ color: '#94a3b8' }}>{booking.eventDate} • {booking.location}</p>
                      <p className="text-[11px] sm:text-xs font-medium mt-0.5" style={{ color: '#94a3b8' }}>Services: {booking.services.join(', ')}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-1.5 sm:space-y-2.5">
                    <p className="text-sm sm:text-base font-semibold" style={{ color: '#D28A8C' }}>₹{booking.totalPrice.toLocaleString()}</p>
                    <span className="inline-flex rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider" style={{
                      background: statusStyle.bg,
                      color: statusStyle.color
                    }}>
                      {booking.status}
                    </span>
                    
                    {(booking.status === 'Confirmed' || booking.status === 'Pending') && (
                      <div className="flex gap-1.5 sm:gap-2 justify-end">
                        <button 
                          type="button" 
                          onClick={() => handleStatusUpdate(booking.id, 'Accepted')}
                          className="rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold transition-all active:scale-95 hover:scale-105"
                          style={{
                            background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
                            color: '#15803d',
                            border: '1px solid rgba(22, 163, 74, 0.15)'
                          }}
                        >
                          ✓ Accept
                        </button>
                        <button 
                          type="button" 
                          onClick={() => handleStatusUpdate(booking.id, 'Rejected')}
                          className="rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold transition-all active:scale-95"
                          style={{
                            border: '1px solid rgba(210, 138, 140, 0.15)',
                            color: '#64748b'
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    )}
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

export default VendorBookings;
