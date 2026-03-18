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
    <div className="space-y-6">
      {/* Header */}
      <div className="vendor-surface rounded-3xl p-7 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full opacity-15" style={{
          background: 'radial-gradient(circle, #ec4899, transparent 70%)'
        }}></div>
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: '#ec4899' }}>Bookings</p>
            <h2 className="text-2xl font-black text-slate-900 mt-1">Manage confirmed events</h2>
            <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>Track event details, payment status, and assignments.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-lg font-black text-slate-900">{vendorState.bookings.length}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#94a3b8' }}>Total Bookings</p>
            </div>
            <button 
              type="button" 
              onClick={() => window.location.reload()}
              className="flex items-center justify-center w-11 h-11 rounded-2xl transition-all active:scale-95 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)',
                border: '1px solid rgba(236, 72, 153, 0.1)'
              }}
            >
              <Icon name="plan" size="sm" />
            </button>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="vendor-surface rounded-3xl p-7">
        <div className="grid gap-4">
          {vendorState.bookings.length === 0 ? (
            <div className="py-16 text-center">
              <div className="text-4xl mb-4">📋</div>
              <p className="font-bold text-slate-400">No bookings found</p>
              <p className="text-xs mt-1" style={{ color: '#94a3b8' }}>New bookings will appear here</p>
            </div>
          ) : (
            vendorState.bookings.map((booking) => {
              const statusStyle = getStatusColor(booking.status);
              return (
                <div key={booking.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5 transition-all hover:scale-[1.01] group" style={{
                  border: '1px solid rgba(236, 72, 153, 0.08)',
                  background: 'rgba(253, 242, 248, 0.2)'
                }}>
                  <div className="flex items-start gap-4">
                    <div className="h-11 w-11 rounded-2xl flex items-center justify-center text-lg flex-shrink-0" style={{
                      background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)'
                    }}>
                      🎊
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{booking.customerName}</p>
                      <p className="text-xs font-medium mt-0.5" style={{ color: '#94a3b8' }}>{booking.eventDate} • {booking.location}</p>
                      <p className="text-xs font-medium mt-0.5" style={{ color: '#94a3b8' }}>Services: {booking.services.join(', ')}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-2.5">
                    <p className="text-base font-black" style={{ color: '#ec4899' }}>₹{booking.totalPrice.toLocaleString()}</p>
                    <span className="inline-flex rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wider" style={{
                      background: statusStyle.bg,
                      color: statusStyle.color
                    }}>
                      {booking.status}
                    </span>
                    
                    {(booking.status === 'Confirmed' || booking.status === 'Pending') && (
                      <div className="flex gap-2 justify-end">
                        <button 
                          type="button" 
                          onClick={() => handleStatusUpdate(booking.id, 'Accepted')}
                          className="rounded-xl px-4 py-2 text-xs font-bold transition-all active:scale-95 hover:scale-105"
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
                          className="rounded-xl px-4 py-2 text-xs font-bold transition-all active:scale-95"
                          style={{
                            border: '1px solid rgba(236, 72, 153, 0.15)',
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