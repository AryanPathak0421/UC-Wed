const VendorEarnings = () => {
  return (
    <div className="space-y-6">
      <div className="vendor-surface rounded-2xl p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Payments</p>
        <h2 className="text-2xl font-bold text-slate-900">Earnings summary</h2>
        <p className="text-sm text-slate-500">Track payouts, advances, and platform commissions.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="vendor-surface rounded-2xl p-5">
          <p className="text-xs font-semibold text-slate-500">Total earnings</p>
          <h3 className="text-2xl font-bold text-slate-900">₹4,50,000</h3>
          <p className="text-xs text-emerald-600">+18% this quarter</p>
        </div>
        <div className="vendor-surface rounded-2xl p-5">
          <p className="text-xs font-semibold text-slate-500">Pending payments</p>
          <h3 className="text-2xl font-bold text-slate-900">₹80,000</h3>
          <p className="text-xs text-emerald-600">2 invoices awaiting</p>
        </div>
        <div className="vendor-surface rounded-2xl p-5">
          <p className="text-xs font-semibold text-slate-500">Platform commission</p>
          <h3 className="text-2xl font-bold text-slate-900">₹45,000</h3>
          <p className="text-xs text-slate-500">Calculated on confirmed bookings</p>
        </div>
      </div>

      <div className="vendor-surface rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-slate-900">Payout schedule</h3>
        <div className="mt-4 space-y-3">
          {['Advance payment - Apr 15', 'Final settlement - May 20', 'Bonus payout - Jun 05'].map((item) => (
            <div key={item} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <span className="text-sm font-semibold text-slate-700">{item}</span>
              <span className="text-xs text-emerald-700">Scheduled</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorEarnings;
