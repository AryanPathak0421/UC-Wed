import Icon from '../../../components/ui/Icon';

const VendorTopbar = ({ onMenuClick, notifications = [] }) => {
  return (
    <div className="group flex flex-col gap-4 rounded-3xl bg-white border border-slate-100 px-4 py-4 lg:px-7 lg:py-6 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-4 lg:gap-6">
        {/* Menu Toggle - Now on the left */}
        <button
          type="button"
          className="lg:hidden flex items-center justify-center h-12 w-12 rounded-2xl bg-slate-50 border border-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-100 transition-all active:scale-95"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Icon name="menu" size="md" color="current" />
        </button>

        {/* Brand/Welcome Text - Now on the right of the toggle */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <p className="text-[10px] lg:text-xs font-bold uppercase tracking-[0.15em] text-emerald-600/80">Vendor Live Control</p>
          </div>
          <h1 className="text-xl lg:text-3xl font-extrabold text-slate-900 leading-tight mt-1">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Emerald Studio</span>
          </h1>
          <p className="hidden md:block text-sm text-slate-400 font-medium mt-1">Your wedding business performance at a glance.</p>
        </div>

        {/* Global Search or Stats placeholder to fill the right side if needed, 
            but for now keeping it clean as per request */}
      </div>

      {/* Live Activity Feed - More interactive looking */}
      {notifications.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {notifications.slice(0, 3).map((notification) => (
            <div 
              key={notification.id} 
              className="flex items-center gap-2.5 rounded-xl bg-slate-50 border border-slate-100 px-3 py-2 text-[10px] lg:text-xs font-bold text-slate-600 hover:bg-white hover:border-emerald-200 hover:text-emerald-700 transition-all cursor-default group/notif shadow-sm"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 group-hover/notif:bg-emerald-600 group-hover/notif:text-white transition-colors">
                <Icon name="bell" size="xs" color="current" />
              </div>
              <span className="truncate max-w-[140px] lg:max-w-none">{notification.message}</span>
            </div>
          ))}
          {notifications.length > 3 && (
            <button className="text-[10px] font-bold text-emerald-600 hover:underline px-2 tracking-wide">
              +{notifications.length - 3} More
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default VendorTopbar;
