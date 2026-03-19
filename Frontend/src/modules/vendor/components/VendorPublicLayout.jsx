import { Outlet, useLocation } from 'react-router-dom';
import '../vendorTheme.css';

const VendorPublicLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/vendor/login' || location.pathname === '/vendor/register';
  return (
    <div className="vendor-shell min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #FAF2F2 0%, #F4DFDF 30%, #f5f3ff 70%, #eff6ff 100%)'
    }}>
      {/* Global Decorative blobs for public pages */}
      <div className="absolute top-0 left-0 w-square h-square rounded-full opacity-20 pointer-events-none" style={{
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, #D28A8C, transparent 70%)',
        filter: 'blur(80px)',
        transform: 'translate(-30%, -30%)'
      }}></div>
      <div className="absolute top-1/2 right-0 w-square h-square rounded-full opacity-15 pointer-events-none" style={{
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, #a855f7, transparent 70%)',
        filter: 'blur(80px)',
        transform: 'translate(30%, -50%)'
      }}></div>
      <div className="absolute bottom-0 left-1/4 w-square h-square rounded-full opacity-15 pointer-events-none" style={{
        width: '700px', height: '700px',
        background: 'radial-gradient(circle, #38bdf8, transparent 70%)',
        filter: 'blur(100px)',
        transform: 'translate(-50%, 50%)'
      }}></div>

      <div className="absolute pointer-events-none opacity-20 inset-0 overflow-hidden">
        <img src="/assets/vendor/decor.png" alt="Decoration" className="absolute top-1/4 -left-20 h-[500px] w-auto rotate-12 scale-150 blur-[2px] blend-multiply" />
        <img src="/assets/vendor/decor.png" alt="Decoration" className="absolute bottom-1/4 -right-20 h-[500px] w-auto -rotate-12 scale-150 blur-[2px] blend-multiply" />
      </div>

      <div className="absolute top-4 left-0 right-0 flex justify-center w-full z-50 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-5 sm:gap-8 cursor-pointer group" onClick={() => window.location.href = '/'}>
          <div className="relative">
            <img src="/assets/vendor/logo_theme.png" alt="UtsavChakra Logo" className="h-12 sm:h-20 w-auto hover:scale-105 transition-all duration-500 rounded-2xl shadow-lg ring-1 ring-white/20" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-xl sm:text-3xl font-black italic tracking-tighter bg-clip-text text-transparent drop-shadow-sm leading-tight" style={{
              fontFamily: "'Playfair Display', serif",
              backgroundImage: 'linear-gradient(135deg, #be123c, #9f1239, #a855f7)'
            }}>UtsavChakra</h1>
            {isAuthPage && (
              <div className="mt-1 flex items-center gap-2">
                <div className="h-[1px] w-8 bg-gradient-to-r from-rose-700/40 to-transparent"></div>
                <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.25em] text-rose-800/80 drop-shadow-sm">
                  Elite Wedding Network
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="min-h-screen relative z-10 pt-16 sm:pt-28 pb-10 px-2 sm:px-3">
        <div className="mx-auto max-w-6xl w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default VendorPublicLayout;
