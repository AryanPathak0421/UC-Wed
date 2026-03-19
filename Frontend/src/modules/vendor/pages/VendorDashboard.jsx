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
    { label: 'Profile views', value: vendorState.analytics.profileViews, sub: '+12% this month', icon: 'eye', color: '#D28A8C', bg: 'rgba(210, 138, 140, 0.1)' },
    { label: 'Inquiries', value: vendorState.analytics.inquiries, sub: 'New leads today', icon: 'leads', color: '#a855f7', bg: 'rgba(168, 85, 247, 0.1)' },
    { label: 'Bookings', value: vendorState.analytics.bookings, sub: 'Confirmed events', icon: 'party', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
    { label: 'Conversion rate', value: vendorState.analytics.conversionRate + '%', icon: 'chart', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-2.5 sm:gap-4 grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat, i) => (
          <div key={stat.label} className="vendor-surface rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-6 group cursor-default transition-all duration-500 hover:translate-y-[-4px]" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="flex items-start justify-between gap-1">
              <div className="min-w-0 flex-1">
                <p className="text-[9px] sm:text-[10px] lg:text-xs font-bold uppercase tracking-[0.2em] truncate" style={{ color: '#64748b' }}>{stat.label}</p>
                <h3 className="text-lg sm:text-2xl lg:text-4xl font-bold text-slate-900 mt-0.5 sm:mt-1 lg:mt-2 tracking-tight drop-shadow-sm">{stat.value}</h3>
                <p className="text-[9px] lg:text-xs font-bold mt-0.5 sm:mt-1 lg:mt-1.5 truncate" style={{ color: stat.color }}>{stat.sub}</p>
              </div>
              <div className="h-8 w-8 sm:h-11 sm:w-11 lg:h-14 lg:w-14 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-sm" style={{ background: stat.bg, color: stat.color }}>
                <Icon name={stat.icon} size="lg" color="current" />
              </div>
            </div>
            {/* Pattidar indicator */}
            <div className="mt-2.5 sm:mt-4 lg:mt-6 flex gap-1 sm:gap-1.5 items-center h-1 sm:h-1.5">
              {[1, 2, 3, 4, 5, 6, 7].map((_, j) => (
                <div key={j} className="h-0.5 sm:h-1 lg:h-1.5 flex-1 rounded-full transition-all duration-700 shadow-sm" style={{
                  background: j < 4 + i ? `linear-gradient(90deg, ${stat.color}, #f9a8d4)` : 'rgba(226, 232, 240, 0.5)',
                  opacity: j < 4 + i ? 1 : 0.3,
                  boxShadow: j < 4 + i ? `0 0 10px ${stat.color}40` : 'none',
                  transform: `scaleX(${j < 4 + i ? 1 : 0.8})`
                }}></div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Profile Completion + Recent Activity */}
      <div className="grid gap-4 sm:gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-7 relative overflow-hidden">
          {/* Decorative corner */}
          <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-20" style={{
            background: 'radial-gradient(circle, #D28A8C, transparent 70%)'
          }}></div>
          
          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 relative z-10">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#D28A8C' }}>Profile completion</p>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5 sm:mt-1">{completion}% complete</h3>
              <p className="text-xs sm:text-sm font-medium mt-0.5 sm:mt-1" style={{ color: '#94a3b8' }}>Complete your profile to improve ranking.</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="text-xs sm:text-sm font-semibold" style={{ color: '#64748b' }}>Listing status</div>
              <span className={'vendor-status-pill ' + getListingStatusClass(vendorState.listingStatus)}>{vendorState.listingStatus}</span>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-3 sm:mt-5 h-2 sm:h-3 w-full rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(210, 138, 140, 0.08)' }}>
            <div className="h-full rounded-full transition-all duration-1000 ease-out relative" style={{ 
              width: completion + '%',
              background: 'linear-gradient(90deg, #D28A8C, #C27A7C, #a855f7)',
              boxShadow: '0 0 20px rgba(210, 138, 140, 0.4)'
            }}>
              <div className="absolute inset-0 rounded-full" style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite'
              }}></div>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-3 relative z-10">
            <button type="button" className="vendor-cta rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 text-[11px] sm:text-xs font-semibold tracking-wide flex items-center gap-2" onClick={handleSubmitListing}>
              <Icon name="sparkles" size="xs" /> Submit for review
            </button>
            <button 
              type="button" 
              className="rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 text-[11px] sm:text-xs font-semibold transition-all active:scale-95"
              style={{
                border: '2px solid rgba(210, 138, 140, 0.2)',
                color: '#A35E60',
                background: 'rgba(253, 242, 248, 0.5)'
              }}
              onClick={() => navigate('/vendor/profile')}
            >
              Update profile
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-7">
          <div className="flex items-center gap-2 mb-3 sm:mb-5">
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg sm:rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)'
            }}>
              <Icon name="bell" size="xs" color="#A35E60" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900">Recent activity</h3>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {vendorState.notifications.map((note) => (
              <div key={note.id} className="flex items-start gap-2.5 sm:gap-3 rounded-xl sm:rounded-2xl p-3 sm:p-4 transition-all hover:scale-[1.02] cursor-default" style={{
                background: 'linear-gradient(135deg, rgba(253,242,248,0.5), rgba(245,243,255,0.5))',
                border: '1px solid rgba(210, 138, 140, 0.06)'
              }}>
                <div className="mt-0.5 rounded-lg sm:rounded-xl p-2 sm:p-2.5 flex-shrink-0" style={{
                  background: 'linear-gradient(135deg, #D28A8C, #C27A7C)',
                  color: 'white'
                }}>
                  <Icon name="bell" size="sm" color="current" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800">{note.message}</p>
                  <p className="text-[10px] sm:text-xs font-medium mt-0.5" style={{ color: '#94a3b8' }}>{note.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Leads + Upcoming Bookings */}
      <div className="grid gap-4 sm:gap-6 xl:grid-cols-2">
        <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-7">
          <div className="flex items-center gap-2 mb-3 sm:mb-5">
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg sm:rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)'
            }}>
              <Icon name="star" size="xs" color="#A35E60" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900">Latest leads</h3>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {vendorState.leads.map((lead) => (
              <div key={lead.id} className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 rounded-xl sm:rounded-2xl p-3 sm:p-4 transition-all hover:scale-[1.01]" style={{
                border: '1px solid rgba(210, 138, 140, 0.08)',
                background: 'rgba(253, 242, 248, 0.3)'
              }}>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800">{lead.customerName}</p>
                  <p className="text-[10px] sm:text-xs font-medium" style={{ color: '#94a3b8' }}>{lead.eventDate} • {lead.eventLocation}</p>
                </div>
                <span className="rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider" style={{
                  background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)',
                  color: '#A35E60'
                }}>{lead.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-7">
          <div className="flex items-center gap-2 mb-3 sm:mb-5">
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg sm:rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)'
            }}>
              <Icon name="calendar" size="xs" color="#A35E60" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900">Upcoming bookings</h3>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {vendorState.bookings.map((booking) => (
              <div key={booking.id} className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 rounded-xl sm:rounded-2xl p-3 sm:p-4 transition-all hover:scale-[1.01]" style={{
                border: '1px solid rgba(210, 138, 140, 0.08)',
                background: 'rgba(253, 242, 248, 0.3)'
              }}>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800">{booking.customerName}</p>
                  <p className="text-[10px] sm:text-xs font-medium" style={{ color: '#94a3b8' }}>{booking.eventDate} • {booking.location}</p>
                </div>
                <span className="rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider" style={{
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
