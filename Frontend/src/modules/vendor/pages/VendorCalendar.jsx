import { useVendorState } from '../useVendorState';
import Icon from '../../../components/ui/Icon';

const VendorCalendar = () => {
  const { vendorState } = useVendorState();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-7 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full opacity-15" style={{
          background: 'radial-gradient(circle, #D28A8C, transparent 70%)'
        }}></div>
        <div className="relative z-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#D28A8C' }}>Calendar</p>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5 sm:mt-1">Event schedule</h2>
          <p className="text-xs sm:text-sm font-medium" style={{ color: '#94a3b8' }}>View your upcoming bookings on a timeline.</p>
        </div>
      </div>

      <div className="grid gap-3 sm:gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-7">
          <div className="flex items-center gap-2 mb-3 sm:mb-5">
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg sm:rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)'
            }}>
              <Icon name="calendar" size="xs" color="#A35E60" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900">Upcoming events</h3>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {vendorState.bookings.map((booking) => (
              <div key={booking.id} className="rounded-xl sm:rounded-2xl p-3 sm:p-4 transition-all hover:scale-[1.01]" style={{
                border: '1px solid rgba(210, 138, 140, 0.08)',
                background: 'rgba(253, 242, 248, 0.2)'
              }}>
                <p className="text-xs sm:text-sm font-semibold text-slate-900">{booking.customerName}</p>
                <p className="text-[11px] sm:text-xs font-medium mt-0.5 sm:mt-1" style={{ color: '#94a3b8' }}>{booking.eventDate} - {booking.location}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-7">
          <div className="flex items-center gap-2 mb-3 sm:mb-5">
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg sm:rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)'
            }}>
              <Icon name="chart" size="xs" color="#A35E60" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900">Monthly overview</h3>
          </div>
          <div className="text-center py-8 sm:py-10">
            <div className="flex justify-center mb-3 sm:mb-4">
              <Icon name="calendar" size="3xl" color="#cbd5e1" />
            </div>
            <p className="text-xs sm:text-sm font-semibold" style={{ color: '#94a3b8' }}>Calendar visualization coming soon</p>
            <p className="text-[11px] sm:text-xs mt-1" style={{ color: '#cbd5e1' }}>Your events will appear in a monthly view</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorCalendar;
