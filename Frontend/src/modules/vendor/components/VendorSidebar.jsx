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
    <aside className="h-full w-72 bg-white border-r border-slate-200">
      <div className="h-full flex flex-col">
        <div className="px-6 py-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Vendor Panel</p>
              <h2 className="text-xl font-bold text-slate-900">Emerald Studio</h2>
            </div>
            <button
              type="button"
              className="lg:hidden text-slate-500"
              onClick={onClose}
              aria-label="Close menu"
            >
              <Icon name="close" size="lg" color="current" />
            </button>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            Online and accepting requests
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`
              }
              onClick={onClose}
            >
              <Icon name={item.icon} size="md" color="current" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-6 py-5 border-t border-slate-200">
          <button 
            type="button" 
            className="w-full rounded-2xl bg-slate-50 px-4 py-4 text-sm font-bold text-slate-600 hover:bg-rose-50 hover:text-rose-600 active:scale-95 transition-all flex items-center justify-center gap-3 border border-transparent hover:border-rose-100 shadow-sm"
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
