import { NavLink, useNavigate } from 'react-router-dom';
import Icon from '../../../components/ui/Icon';

const navItems = [
  { label: 'Dashboard', to: '/vendor/dashboard', icon: 'home' },
  { label: 'Profile', to: '/vendor/profile', icon: 'account' },
  { label: 'Services', to: '/vendor/services', icon: 'store' },
  { label: 'Pricing', to: '/vendor/pricing', icon: 'money' },
  { label: 'Portfolio', to: '/vendor/portfolio', icon: 'image' },
  { label: 'Leads', to: '/vendor/leads', icon: 'mail' },
  { label: 'Quotes', to: '/vendor/quotes', icon: 'book' },
  { label: 'Bookings', to: '/vendor/bookings', icon: 'calendar' },
  { label: 'Calendar', to: '/vendor/calendar', icon: 'clock' },
  { label: 'Chat', to: '/vendor/chat', icon: 'chat' },
  { label: 'Earnings', to: '/vendor/earnings', icon: 'trophy' },
  { label: 'Reviews', to: '/vendor/reviews', icon: 'star' },
  { label: 'Support', to: '/vendor/support', icon: 'help' }
];

const VendorSidebar = ({ onClose }) => {
  const navigate = useNavigate();
  return (
    <aside className="h-full w-72" style={{
      background: 'linear-gradient(180deg, #ffffff 0%, #FAF2F2 100%)',
      borderRight: '1px solid rgba(210, 138, 140, 0.08)'
    }}>
      <div className="h-full flex flex-col">
        {/* Brand Header */}
        <div className="px-6 py-6" style={{ borderBottom: '1px solid rgba(210, 138, 140, 0.08)' }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="h-24 w-auto flex items-center justify-center transition-transform hover:scale-110">
                  <img src="/assets/vendor/logo_theme.png" alt="UtsavChakra Logo" className="h-full w-auto rounded-2xl" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: '#D28A8C' }}>Vendor Panel</p>
              </div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Emerald Studio</h2>
            </div>
            <button
              type="button"
              className="lg:hidden text-slate-400 hover:text-[#D28A8C] transition-colors"
              onClick={onClose}
              aria-label="Close menu"
            >
              <Icon name="close" size="lg" color="current" />
            </button>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs font-semibold" style={{ color: '#94a3b8' }}>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#D28A8C' }}></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: '#D28A8C' }}></span>
            </span>
            Online & accepting
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 no-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-2xl px-4 py-3 text-[13px] font-semibold transition-all duration-300 relative overflow-hidden ${isActive
                  ? 'text-white shadow-lg'
                  : 'text-slate-500 hover:text-[#C27A7C] hover:bg-[#FAF2F2]/50'
                }`
              }
              style={({ isActive }) => isActive ? {
                background: 'linear-gradient(135deg, #D28A8C, #C27A7C)',
                boxShadow: '0 8px 25px rgba(210, 138, 140, 0.3)'
              } : {}}
              onClick={onClose}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute left-0 top-0 w-1 h-full rounded-r-full bg-white/40"></div>
                  )}
                  <div className={`flex items-center justify-center h-8 w-8 rounded-xl transition-all duration-300 ${isActive
                    ? 'bg-white/20'
                    : 'bg-slate-50 group-hover:bg-[#F4DFDF]'
                    }`}>
                    <Icon name={item.icon} size="sm" color="current" />
                  </div>
                  <span>{item.label}</span>
                  {isActive && (
                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-white animate-pulse"></div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Sign Out */}
        <div className="px-4 py-4" style={{ borderTop: '1px solid rgba(210, 138, 140, 0.08)' }}>
          <button
            type="button"
            className="w-full rounded-2xl px-4 py-3.5 text-sm font-semibold text-slate-500 hover:text-rose-600 active:scale-95 transition-all flex items-center justify-center gap-3"
            style={{
              background: 'linear-gradient(135deg, #FAF2F2, #fff1f2)',
              border: '1px solid rgba(210, 138, 140, 0.1)'
            }}
            onClick={() => navigate('/vendor/login')}
          >
            <Icon name="logout" size="sm" color="current" />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
};

export default VendorSidebar;
