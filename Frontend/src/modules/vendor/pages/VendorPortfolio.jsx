import { useVendorState } from '../useVendorState';

const VendorPortfolio = () => {
  const { vendorState } = useVendorState();

  return (
    <div className="space-y-6">
      <div className="vendor-surface rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Portfolio</p>
            <h2 className="text-2xl font-bold text-slate-900">Your latest work</h2>
            <p className="text-sm text-slate-500">Highlight your best projects to convert more leads.</p>
          </div>
          <button type="button" className="vendor-cta rounded-xl px-4 py-2 text-xs font-semibold">Upload media</button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {vendorState.portfolio.map((item) => (
          <div key={item.id} className="vendor-surface rounded-2xl overflow-hidden">
            <img src={item.url} alt={item.title} className="h-48 w-full object-cover" />
            <div className="p-4">
              <p className="text-sm font-semibold text-slate-900">{item.title}</p>
              <p className="text-xs text-slate-500">{item.tag} • {item.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorPortfolio;
