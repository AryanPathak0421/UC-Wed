import { useVendorState } from '../useVendorState';

const VendorPortfolio = () => {
  const { vendorState } = useVendorState();

  return (
    <div className="space-y-6">
      <div className="vendor-surface rounded-3xl p-7 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full opacity-15" style={{
          background: 'radial-gradient(circle, #ec4899, transparent 70%)'
        }}></div>
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: '#ec4899' }}>Portfolio</p>
            <h2 className="text-2xl font-black text-slate-900 mt-1">Your latest work</h2>
            <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>Highlight your best projects to convert more leads.</p>
          </div>
          <button type="button" className="vendor-cta rounded-2xl px-6 py-3 text-xs font-black tracking-wide">Upload media</button>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {vendorState.portfolio.map((item, i) => (
          <div key={item.id} className="vendor-surface rounded-3xl overflow-hidden group cursor-pointer" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="relative overflow-hidden">
              <img 
                src={item.url} 
                alt={item.title} 
                className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end" style={{
                background: 'linear-gradient(to top, rgba(190, 24, 93, 0.8), transparent 60%)'
              }}>
                <div className="p-4 text-white">
                  <p className="text-sm font-black">{item.title}</p>
                  <p className="text-xs font-medium opacity-80">{item.tag}</p>
                </div>
              </div>
            </div>
            <div className="p-5">
              <p className="text-sm font-bold text-slate-900">{item.title}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full" style={{
                  background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)',
                  color: '#be185d'
                }}>{item.tag}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#94a3b8' }}>{item.type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorPortfolio;
