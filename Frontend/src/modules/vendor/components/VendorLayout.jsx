import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import VendorSidebar from './VendorSidebar';
import VendorTopbar from './VendorTopbar';
import { useVendorState } from '../useVendorState';

const VendorLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { vendorState } = useVendorState();

  return (
    <div className="vendor-shell min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <div
          className={`fixed inset-0 bg-black/40 z-30 transition-opacity lg:hidden ${
            sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          onClick={() => setSidebarOpen(false)}
        ></div>
        <div
          className={`fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-200 lg:static lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <VendorSidebar onClose={() => setSidebarOpen(false)} />
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="px-3 pt-4 lg:px-8 lg:pt-6">
            <VendorTopbar onMenuClick={() => setSidebarOpen(true)} notifications={vendorState.notifications} />
          </div>

          <main className="flex-1 px-3 py-4 lg:px-8 lg:py-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default VendorLayout;
