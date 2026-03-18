const VendorEarnings = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="vendor-surface rounded-3xl p-7 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full opacity-15" style={{
          background: 'radial-gradient(circle, #a855f7, transparent 70%)'
        }}></div>
        <div className="relative z-10">
          <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: '#ec4899' }}>Payments</p>
          <h2 className="text-2xl font-black text-slate-900 mt-1">Earnings summary</h2>
          <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>Track payouts, advances, and platform commissions.</p>
        </div>
      </div>

      {/* Earnings Stats */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-3">
        {[
          { label: 'Total earnings', value: '₹4,50,000', sub: '+18% this quarter', emoji: '💰', gradient: 'linear-gradient(135deg, #fdf2f8, #fce7f3)' },
          { label: 'Pending payments', value: '₹80,000', sub: '2 invoices awaiting', emoji: '⏳', gradient: 'linear-gradient(135deg, #fffbeb, #fef3c7)' },
          { label: 'Platform commission', value: '₹45,000', sub: 'Calculated on confirmed bookings', emoji: '📊', gradient: 'linear-gradient(135deg, #f5f3ff, #ede9fe)' }
        ].map((stat) => (
          <div key={stat.label} className="vendor-surface rounded-[24px] lg:rounded-3xl p-4 lg:p-6 group cursor-default">
            <div className="flex items-start justify-between gap-1">
              <div className="min-w-0 flex-1">
                <p className="text-[9px] sm:text-[10px] lg:text-xs font-bold uppercase tracking-widest truncate" style={{ color: '#94a3b8' }}>{stat.label}</p>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-slate-900 mt-1 lg:mt-2 tracking-tight truncate">{stat.value}</h3>
                <p className="text-[9px] lg:text-xs font-bold mt-1 lg:mt-1.5 truncate" style={{ color: '#ec4899' }}>{stat.sub}</p>
              </div>
              <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-xl lg:rounded-2xl flex items-center justify-center flex-shrink-0 text-sm lg:text-xl transition-transform group-hover:scale-110 group-hover:rotate-6" style={{ background: stat.gradient }}>
                {stat.emoji}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Payout Schedule */}
      <div className="vendor-surface rounded-3xl p-7">
        <div className="flex items-center gap-2 mb-5">
          <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{
            background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)'
          }}>
            <span className="text-sm">📅</span>
          </div>
          <h3 className="text-lg font-black text-slate-900">Payout schedule</h3>
        </div>
        <div className="space-y-3">
          {['Advance payment - Apr 15', 'Final settlement - May 20', 'Bonus payout - Jun 05'].map((item, i) => (
            <div key={item} className="flex items-center justify-between rounded-2xl p-4 transition-all hover:scale-[1.01]" style={{
              background: 'linear-gradient(135deg, rgba(253,242,248,0.5), rgba(245,243,255,0.5))',
              border: '1px solid rgba(236, 72, 153, 0.06)'
            }}>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl flex items-center justify-center text-xs font-black" style={{
                  background: 'linear-gradient(135deg, #ec4899, #db2777)',
                  color: 'white'
                }}>{i + 1}</div>
                <span className="text-sm font-bold text-slate-700">{item}</span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full" style={{
                background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
                color: '#15803d'
              }}>Scheduled</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorEarnings;
