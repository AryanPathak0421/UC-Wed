import { useVendorState } from '../useVendorState';

const VendorCalendar = () => {
  const { vendorState } = useVendorState();

  return (
    <div className="space-y-6">
      <div className="vendor-surface rounded-2xl p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Calendar</p>
        <h2 className="text-2xl font-bold text-slate-900">Availability overview</h2>
        <p className="text-sm text-slate-500">Block dates to prevent double bookings.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="vendor-surface rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-slate-900">Blocked dates</h3>
          <div className="mt-4 space-y-2">
            {vendorState.availability.blockedDates.map((date) => (
              <div key={date} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                <span className="text-sm font-semibold text-slate-700">{date}</span>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Unavailable</span>
              </div>
            ))}
          </div>
        </div>
        <div className="vendor-surface rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-slate-900">Upcoming events</h3>
          <div className="mt-4 space-y-2">
            {vendorState.bookings.map((booking) => (
              <div key={booking.id} className="rounded-xl border border-slate-100 px-4 py-3">
                <p className="text-sm font-semibold text-slate-900">{booking.eventDate}</p>
                <p className="text-xs text-slate-500">{booking.customerName} • {booking.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorCalendar;
