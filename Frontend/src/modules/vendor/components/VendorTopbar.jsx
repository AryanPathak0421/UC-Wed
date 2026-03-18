import Icon from '../../../components/ui/Icon';

const VendorTopbar = ({ onMenuClick, notifications = [] }) => {
  return (
    <div className="group flex flex-col gap-4 rounded-3xl px-5 py-5 lg:px-8 lg:py-6 transition-all duration-500 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(253,242,248,0.9) 100%)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(236, 72, 153, 0.1)',
      boxShadow: '0 4px 30px rgba(236, 72, 153, 0.06)'
    }}>
      {/* Decorative gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{
        background: 'linear-gradient(90deg, #ec4899, #db2777, #a855f7, #ec4899)',
        backgroundSize: '200% 100%',
        animation: 'gradient-shift 4s ease infinite'
      }}></div>

      <div className="flex items-center gap-4 lg:gap-6">
        {/* Menu Toggle */}
        <button
          type="button"
          className="lg:hidden flex items-center justify-center h-12 w-12 rounded-2xl text-slate-600 transition-all active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)',
            border: '1px solid rgba(236, 72, 153, 0.1)'
          }}
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Icon name="menu" size="md" color="current" />
        </button>

        {/* Welcome Text */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#ec4899' }}></span>
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: '#ec4899' }}></span>
            </span>
            <p className="text-[10px] lg:text-xs font-black uppercase tracking-[0.2em]" style={{ color: '#ec4899' }}>Vendor Live Control</p>
          </div>
          <h1 className="text-xl lg:text-3xl font-black text-slate-900 leading-tight mt-1.5">
            Welcome back, <span className="bg-clip-text text-transparent" style={{
              backgroundImage: 'linear-gradient(135deg, #ec4899, #db2777, #a855f7)'
            }}>Emerald Studio</span>
          </h1>
          <p className="hidden md:block text-sm font-medium mt-1.5" style={{ color: '#94a3b8' }}>
            Your wedding business performance at a glance.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button className="h-11 w-11 rounded-2xl flex items-center justify-center transition-all hover:scale-105" style={{
            background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)',
            border: '1px solid rgba(236, 72, 153, 0.1)'
          }}>
            <Icon name="bell" size="sm" color="current" />
          </button>
          <button className="h-11 w-11 rounded-2xl flex items-center justify-center transition-all hover:scale-105" style={{
            background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)',
            border: '1px solid rgba(236, 72, 153, 0.1)'
          }}>
            <Icon name="settings" size="sm" color="current" />
          </button>
        </div>
      </div>

      {/* Notification Feed */}
      {notifications.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-1">
          {notifications.slice(0, 3).map((notification) => (
            <div 
              key={notification.id} 
              className="flex items-center gap-2.5 rounded-2xl px-4 py-2.5 text-[10px] lg:text-xs font-bold transition-all cursor-default group/notif"
              style={{
                background: 'rgba(253, 242, 248, 0.6)',
                border: '1px solid rgba(236, 72, 153, 0.08)',
                color: '#64748b'
              }}
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-lg transition-all" style={{
                background: 'linear-gradient(135deg, #fce7f3, #fdf2f8)'
              }}>
                <Icon name="bell" size="xs" color="current" />
              </div>
              <span className="truncate max-w-[140px] lg:max-w-none">{notification.message}</span>
            </div>
          ))}
          {notifications.length > 3 && (
            <button className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full transition-all hover:bg-pink-50" style={{ color: '#ec4899' }}>
              +{notifications.length - 3} More
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default VendorTopbar;
