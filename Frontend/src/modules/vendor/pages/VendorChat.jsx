import Icon from '../../../components/ui/Icon';

const VendorChat = () => {
  return (
    <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-7 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full opacity-15" style={{
        background: 'radial-gradient(circle, #D28A8C, transparent 70%)'
      }}></div>
      <div className="relative z-10 text-center py-10 sm:py-16">
        <div className="flex justify-center mb-3 sm:mb-4">
          <Icon name="chat" size="3xl" color="#cbd5e1" />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1 sm:mb-2">Chat Hub</h3>
        <p className="text-xs sm:text-sm font-medium" style={{ color: '#94a3b8' }}>Chat experience coming soon.</p>
        <p className="text-[11px] sm:text-xs mt-1 sm:mt-2" style={{ color: '#cbd5e1' }}>You will be able to message clients directly from here.</p>
      </div>
    </div>
  );
};

export default VendorChat;
