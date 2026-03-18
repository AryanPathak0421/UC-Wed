import { Outlet } from 'react-router-dom';

const VendorPublicLayout = () => {
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

      <div className="min-h-screen relative z-10 py-12 px-4 md:px-8">
        <div className="mx-auto max-w-6xl w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default VendorPublicLayout;
