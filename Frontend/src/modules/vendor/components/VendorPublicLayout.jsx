import { Outlet } from 'react-router-dom';

const VendorPublicLayout = () => {
  return (
    <div className="vendor-shell min-h-screen bg-slate-50">
      <div className="min-h-screen px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default VendorPublicLayout;
