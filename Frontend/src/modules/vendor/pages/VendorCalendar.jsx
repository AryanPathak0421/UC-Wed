import { useVendorState } from '../useVendorState';

const VendorCalendar = () => {
  const { vendorState } = useVendorState();

  return (
    <div className="space-y-6">
      <div className="vendor-surface rounded-3xl p-7 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full opacity-15" style={{
          background: 'radial-gradient(circle, #ec4899, transparent 70%)'
        }}></div>
        <div className="relative z-10">
          <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: '#ec4899' }}>Calendar</p>
          <h2 className="text-2xl font-black text-slate-900 mt-1">Event schedule</h2>
          <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>View your upcoming bookings on a timeline.</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="vendor-surface rounded-3xl p-7">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)'
            }}>
              <span className="text-sm">&#128197;</span>
            </div>
            <h3 className="text-lg font-black text-slate-900">Upcoming events</h3>
          </div>
          <div className="space-y-3">
            {vendorState.bookings.map((booking) => (
              <div key={booking.id} className="rounded-2xl p-4 transition-all hover:scale-[1.01]" style={{
                border: '1px solid rgba(236, 72, 153, 0.08)',
                background: 'rgba(253, 242, 248, 0.2)'
              }}>
                <p className="text-sm font-bold text-slate-900">{booking.customerName}</p>
                <p className="text-xs font-medium mt-1" style={{ color: '#94a3b8' }}>{booking.eventDate} - {booking.location}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="vendor-surface rounded-3xl p-7">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)'
            }}>
              <span className="text-sm">&#128200;</span>
            </div>
            <h3 className="text-lg font-black text-slate-900">Monthly overview</h3>
          </div>
          <div className="text-center py-10">
            <div className="text-4xl mb-4">&#128198;</div>
            <p className="text-sm font-bold" style={{ color: '#94a3b8' }}>Calendar visualization coming soon</p>
            <p className="text-xs mt-1" style={{ color: '#cbd5e1' }}>Your events will appear in a monthly view</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorCalendar;
