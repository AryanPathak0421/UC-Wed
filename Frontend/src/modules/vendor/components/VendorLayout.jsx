import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import VendorSidebar from './VendorSidebar';
import VendorTopbar from './VendorTopbar';
import { useVendorState } from '../useVendorState';

const VendorLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { vendorState } = useVendorState();

  return (
    <div className="vendor-shell min-h-screen relative overflow-hidden">
      {/* Decorative Background Blobs */}
      <div className="decor-blob decor-blob-1"></div>
      <div className="decor-blob decor-blob-2"></div>

      <div className="flex min-h-screen relative z-10">
        <div
          className={`fixed inset-0 z-30 transition-all duration-300 lg:hidden ${sidebarOpen ? 'opacity-100 backdrop-blur-sm' : 'pointer-events-none opacity-0'
            }`}
          style={{ background: 'rgba(15, 23, 42, 0.3)' }}
          onClick={() => setSidebarOpen(false)}
        ></div>
        <div
          className={`fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-300 ease-out lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          <VendorSidebar onClose={() => setSidebarOpen(false)} />
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="px-2 pt-2 lg:px-4 lg:pt-3">
            <VendorTopbar onMenuClick={() => setSidebarOpen(true)} notifications={vendorState.notifications} />
          </div>

          <main className="flex-1 px-2 py-2 lg:px-4 lg:py-3">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default VendorLayout;
