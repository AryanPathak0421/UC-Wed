const VendorChat = () => {
  return (
    <div className="vendor-surface rounded-3xl p-7 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full opacity-15" style={{
        background: 'radial-gradient(circle, #ec4899, transparent 70%)'
      }}></div>
      <div className="relative z-10 text-center py-16">
        <div className="text-5xl mb-4">&#128172;</div>
        <h3 className="text-xl font-black text-slate-900 mb-2">Chat Hub</h3>
        <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>Chat experience coming soon.</p>
        <p className="text-xs mt-2" style={{ color: '#cbd5e1' }}>You will be able to message clients directly from here.</p>
      </div>
    </div>
  );
};

export default VendorChat;
