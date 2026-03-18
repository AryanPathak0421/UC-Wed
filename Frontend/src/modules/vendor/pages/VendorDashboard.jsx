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

  const statCards = [
    { label: 'Profile views', value: vendorState.analytics.profileViews, sub: '+12% this month', emoji: '👁️', gradient: 'linear-gradient(135deg, #fdf2f8, #fce7f3)' },
    { label: 'Inquiries', value: vendorState.analytics.inquiries, sub: 'New leads today', emoji: '💌', gradient: 'linear-gradient(135deg, #f5f3ff, #ede9fe)' },
    { label: 'Bookings', value: vendorState.analytics.bookings, sub: 'Confirmed events', emoji: '🎉', gradient: 'linear-gradient(135deg, #ecfdf5, #d1fae5)' },
    { label: 'Conversion rate', value: vendorState.analytics.conversionRate + '%', sub: 'Lead to booking', emoji: '📈', gradient: 'linear-gradient(135deg, #fff7ed, #ffedd5)' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat, i) => (
          <div key={stat.label} className="vendor-surface rounded-[24px] lg:rounded-3xl p-4 lg:p-6 group cursor-default" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="flex items-start justify-between gap-1">
              <div className="min-w-0 flex-1">
                <p className="text-[9px] sm:text-[10px] lg:text-xs font-bold uppercase tracking-widest truncate" style={{ color: '#94a3b8' }}>{stat.label}</p>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 mt-1 lg:mt-2 tracking-tight">{stat.value}</h3>
                <p className="text-[9px] lg:text-xs font-bold mt-1 lg:mt-1.5 truncate" style={{ color: '#ec4899' }}>{stat.sub}</p>
              </div>
              <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-xl lg:rounded-2xl flex items-center justify-center flex-shrink-0 text-sm lg:text-xl transition-transform group-hover:scale-110 group-hover:rotate-6" style={{ background: stat.gradient }}>
                {stat.emoji}
              </div>
            </div>
            {/* Mini sparkline bar */}
            <div className="mt-3 lg:mt-4 flex gap-1 items-end h-4 lg:h-6">
              {[40, 65, 45, 80, 55, 90, 70].map((h, j) => (
                <div key={j} className="flex-1 rounded-full transition-all duration-500 group-hover:opacity-100 opacity-60" style={{
                  height: `${h}%`,
                  background: `linear-gradient(to top, #ec4899, #f9a8d4)`,
                  animationDelay: `${j * 0.05}s`
                }}></div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Profile Completion + Recent Activity */}
      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="vendor-surface rounded-3xl p-7 relative overflow-hidden">
          {/* Decorative corner */}
          <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-20" style={{
            background: 'radial-gradient(circle, #ec4899, transparent 70%)'
          }}></div>
          
          <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: '#ec4899' }}>Profile completion</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{completion}% complete</h3>
              <p className="text-sm font-medium mt-1" style={{ color: '#94a3b8' }}>Complete your profile to improve ranking.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm font-bold" style={{ color: '#64748b' }}>Listing status</div>
              <span className={'vendor-status-pill ' + getListingStatusClass(vendorState.listingStatus)}>{vendorState.listingStatus}</span>
            </div>
          </div>
          
          {/* Progress bar with gradient */}
          <div className="mt-5 h-3 w-full rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(236, 72, 153, 0.08)' }}>
            <div className="h-full rounded-full transition-all duration-1000 ease-out relative" style={{ 
              width: completion + '%',
              background: 'linear-gradient(90deg, #ec4899, #db2777, #a855f7)',
              boxShadow: '0 0 20px rgba(236, 72, 153, 0.4)'
            }}>
              <div className="absolute inset-0 rounded-full" style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite'
              }}></div>
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap items-center gap-3 relative z-10">
            <button type="button" className="vendor-cta rounded-2xl px-6 py-3 text-xs font-black tracking-wide" onClick={handleSubmitListing}>
              ✨ Submit for review
            </button>
            <button 
              type="button" 
              className="rounded-2xl px-6 py-3 text-xs font-bold transition-all active:scale-95"
              style={{
                border: '2px solid rgba(236, 72, 153, 0.2)',
                color: '#be185d',
                background: 'rgba(253, 242, 248, 0.5)'
              }}
              onClick={() => navigate('/vendor/profile')}
            >
              Update profile
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="vendor-surface rounded-3xl p-7">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)'
            }}>
              <span className="text-sm">🔔</span>
            </div>
            <h3 className="text-lg font-black text-slate-900">Recent activity</h3>
          </div>
          <div className="space-y-3">
            {vendorState.notifications.map((note) => (
              <div key={note.id} className="flex items-start gap-3 rounded-2xl p-4 transition-all hover:scale-[1.02] cursor-default" style={{
                background: 'linear-gradient(135deg, rgba(253,242,248,0.5), rgba(245,243,255,0.5))',
                border: '1px solid rgba(236, 72, 153, 0.06)'
              }}>
                <div className="mt-0.5 rounded-xl p-2.5 flex-shrink-0" style={{
                  background: 'linear-gradient(135deg, #ec4899, #db2777)',
                  color: 'white'
                }}>
                  <Icon name="bell" size="sm" color="current" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{note.message}</p>
                  <p className="text-xs font-medium mt-0.5" style={{ color: '#94a3b8' }}>{note.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Leads + Upcoming Bookings */}
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="vendor-surface rounded-3xl p-7">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)'
            }}>
              <span className="text-sm">💎</span>
            </div>
            <h3 className="text-lg font-black text-slate-900">Latest leads</h3>
          </div>
          <div className="space-y-3">
            {vendorState.leads.map((lead) => (
              <div key={lead.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4 transition-all hover:scale-[1.01]" style={{
                border: '1px solid rgba(236, 72, 153, 0.08)',
                background: 'rgba(253, 242, 248, 0.3)'
              }}>
                <div>
                  <p className="text-sm font-bold text-slate-800">{lead.customerName}</p>
                  <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>{lead.eventDate} • {lead.eventLocation}</p>
                </div>
                <span className="rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wider" style={{
                  background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)',
                  color: '#be185d'
                }}>{lead.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="vendor-surface rounded-3xl p-7">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)'
            }}>
              <span className="text-sm">📅</span>
            </div>
            <h3 className="text-lg font-black text-slate-900">Upcoming bookings</h3>
          </div>
          <div className="space-y-3">
            {vendorState.bookings.map((booking) => (
              <div key={booking.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4 transition-all hover:scale-[1.01]" style={{
                border: '1px solid rgba(236, 72, 153, 0.08)',
                background: 'rgba(253, 242, 248, 0.3)'
              }}>
                <div>
                  <p className="text-sm font-bold text-slate-800">{booking.customerName}</p>
                  <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>{booking.eventDate} • {booking.location}</p>
                </div>
                <span className="rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wider" style={{
                  background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
                  color: '#15803d'
                }}>{booking.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;