import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/ui/Icon';

const VendorTopbar = ({ onMenuClick }) => {
  const navigate = useNavigate();

  return (
    <div className="group rounded-2xl lg:rounded-3xl px-4 py-3 lg:px-6 lg:py-4 transition-all duration-500 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(253,242,248,1) 100%)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(210, 138, 140, 0.1)',
      boxShadow: '0 4px 20px rgba(210, 138, 140, 0.04)'
    }}>
      {/* Decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{
        background: 'linear-gradient(90deg, #D28A8C, #C27A7C, #a855f7, #D28A8C)',
        backgroundSize: '200% 100%',
        animation: 'gradient-shift 4s ease infinite'
      }}></div>

      <div className="flex items-center justify-between gap-4">
        {/* Left Side: Hamburger + Logo + Brand */}
        <div className="flex items-center gap-3 lg:gap-4">
          <button
            type="button"
            className="lg:hidden flex items-center justify-center h-10 w-10 rounded-xl text-slate-600 transition-all active:scale-90"
            style={{
              background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)',
              border: '1px solid rgba(210, 138, 140, 0.1)'
            }}
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <Icon name="menu" size="sm" color="current" />
          </button>

          <div className="flex items-center gap-2.5 cursor-pointer group/logo" onClick={() => navigate('/vendor/dashboard')}>
            <div className="h-9 w-9 lg:h-11 lg:w-11 rounded-xl overflow-hidden transition-transform group-hover/logo:scale-110 active:scale-95 shadow-sm">
              <img src="/assets/vendor/logo_theme.png" alt="Logo" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm lg:text-base font-bold text-slate-900 tracking-tight leading-none">UtsavChakra</span>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] mt-0.5" style={{ color: '#D28A8C' }}>Vendor</span>
            </div>
          </div>
        </div>

        {/* Right Side: Navigation Icons */}
        <div className="flex items-center gap-2 lg:gap-3">
          <button 
            className="h-10 w-10 lg:h-11 lg:w-11 rounded-xl lg:rounded-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 relative" 
            style={{
              background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)',
              border: '1px solid rgba(210, 138, 140, 0.1)',
              color: '#A35E60'
            }}
            onClick={() => navigate('/vendor/dashboard')}
            title="Notifications"
          >
            <Icon name="bell" size="xs" color="current" />
            {/* Notification dot */}
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full" style={{
              background: 'linear-gradient(135deg, #D28A8C, #C27A7C)',
              boxShadow: '0 0 6px rgba(210, 138, 140, 0.5)'
            }}></span>
          </button>
          
          <button 
            className="h-10 w-10 lg:h-11 lg:w-11 rounded-xl lg:rounded-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95" 
            style={{
              background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)',
              border: '1px solid rgba(210, 138, 140, 0.1)',
              color: '#A35E60'
            }}
            onClick={() => navigate('/vendor/profile')}
            title="Profile"
          >
            <Icon name="user" size="xs" color="current" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorTopbar;
