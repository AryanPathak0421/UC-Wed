import { Outlet, useLocation } from 'react-router-dom';
import '../vendorTheme.css';

const VendorPublicLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/vendor/login' || location.pathname === '/vendor/register';
  return (
    <div className="vendor-shell min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 30%, #f5f3ff 70%, #eff6ff 100%)'
    }}>
      {/* Global Decorative blobs for public pages */}
      <div className="absolute top-0 left-0 w-square h-square rounded-full opacity-20 pointer-events-none" style={{
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, #ec4899, transparent 70%)',
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

      <div className="absolute top-6 flex flex-col items-center w-full z-50 pointer-events-none">
        <div className="pointer-events-auto flex flex-col items-center cursor-pointer" onClick={() => window.location.href = '/'}>
          <img src="/assets/vendor/logo_theme.png" alt="UtsavChakra Logo" className="h-24 sm:h-40 w-auto hover:scale-105 transition-all duration-500 rounded-3xl" />
          <h1 className="text-3xl sm:text-6xl font-black italic mt-4 tracking-tighter bg-clip-text text-transparent drop-shadow-sm" style={{
            fontFamily: "'Playfair Display', serif",
            backgroundImage: 'linear-gradient(135deg, #ec4899, #db2777, #a855f7)'
          }}>UtsavChakra</h1>
          {isAuthPage && (
            <div className="mt-4 flex flex-col items-center px-4">
              <div className="h-0.5 w-16 bg-gradient-to-r from-pink-500 to-transparent mb-3 opacity-30"></div>
              <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-pink-500/80 text-center max-w-[280px] sm:max-w-none leading-relaxed">
                India's Elite Wedding Vendor Network
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="min-h-screen relative z-10 pt-60 sm:pt-80 pb-10 px-2 sm:px-3">
        <div className="mx-auto max-w-6xl w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default VendorPublicLayout;
