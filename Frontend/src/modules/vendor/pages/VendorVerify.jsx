import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/ui/Icon';
import { useVendorState } from '../useVendorState';

const VendorVerify = () => {
  const navigate = useNavigate();
  const { vendorState, updateVendorState } = useVendorState();
  const { verification } = vendorState;

  const updateVerification = (field) => {
    updateVendorState({ verification: { ...verification, [field]: !verification[field] } });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-[2.5rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden" style={{
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(236, 72, 153, 0.1)'
      }}>
        {/* Top gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-2 rounded-t-[2.5rem]" style={{
          background: 'linear-gradient(90deg, #ec4899, #db2777, #a855f7, #ec4899)',
          backgroundSize: '200% 100%',
          animation: 'gradient-shift 4s ease infinite'
        }}></div>

        <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: '#ec4899' }}>Verification</p>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">Verify contact details</h2>
            <p className="text-sm font-medium mt-1" style={{ color: '#94a3b8' }}>Complete OTP and email verification to activate your account.</p>
          </div>
          <div className="flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-wider shadow-sm" style={{
            background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)',
            color: '#be185d',
            border: '1px solid rgba(236, 72, 153, 0.1)'
          }}>
            <Icon name="verified" size="xs" color="current" />
            Security check
          </div>
        </div>

        <div className="space-y-4">
          {/* Phone Verification */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl p-6 transition-all" style={{
            background: 'rgba(253, 242, 248, 0.3)',
            border: '1px solid rgba(236, 72, 153, 0.1)'
          }}>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl flex items-center justify-center text-xl" style={{
                background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)'
              }}>
                <span className="text-xl">&#128241;</span>
              </div>
              <div>
                <p className="text-sm font-black text-slate-800 tracking-wide">Phone verification</p>
                <p className="text-[11px] font-bold mt-0.5" style={{ color: '#94a3b8' }}>OTP sent to registered number.</p>
              </div>
            </div>
            <button
              type="button"
              className="rounded-2xl px-5 py-3 text-xs font-black transition-all active:scale-95"
              style={verification.phoneVerified 
                ? { background: 'linear-gradient(135deg, #ec4899, #db2777)', color: 'white', boxShadow: '0 4px 15px rgba(236, 72, 153, 0.3)' } 
                : { border: '1px solid rgba(236, 72, 153, 0.2)', color: '#be185d', background: 'white' }}
              onClick={() => updateVerification('phoneVerified')}
            >
              {verification.phoneVerified ? '✓ Verified' : 'Mark as verified'}
            </button>
          </div>

          {/* Email Verification */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl p-6 transition-all" style={{
            background: 'rgba(253, 242, 248, 0.3)',
            border: '1px solid rgba(236, 72, 153, 0.1)'
          }}>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl flex items-center justify-center text-xl" style={{
                background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)'
              }}>
                <span className="text-xl">&#128231;</span>
              </div>
              <div>
                <p className="text-sm font-black text-slate-800 tracking-wide">Email verification</p>
                <p className="text-[11px] font-bold mt-0.5" style={{ color: '#94a3b8' }}>Link sent to your email.</p>
              </div>
            </div>
            <button
              type="button"
              className="rounded-2xl px-5 py-3 text-xs font-black transition-all active:scale-95"
              style={verification.emailVerified 
                ? { background: 'linear-gradient(135deg, #ec4899, #db2777)', color: 'white', boxShadow: '0 4px 15px rgba(236, 72, 153, 0.3)' } 
                : { border: '1px solid rgba(236, 72, 153, 0.2)', color: '#be185d', background: 'white' }}
              onClick={() => updateVerification('emailVerified')}
            >
              {verification.emailVerified ? '✓ Verified' : 'Mark as verified'}
            </button>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-6" style={{ borderColor: 'rgba(236, 72, 153, 0.1)' }}>
          <div className="flex items-center gap-2 text-[11px] font-bold tracking-wide" style={{ color: '#64748b' }}>
            <span style={{ color: '#ec4899' }}>
              <Icon name="verified" size="sm" color="current" />
            </span>
            Verified vendors get higher visibility.
          </div>
          <button
            type="button"
            className={`vendor-cta rounded-2xl px-8 py-4 text-sm font-black tracking-wide w-full md:w-auto transition-all ${(!verification.phoneVerified || !verification.emailVerified) ? 'opacity-50 grayscale cursor-not-allowed' : 'shadow-xl active:scale-95'}`}
            style={verification.phoneVerified && verification.emailVerified ? { boxShadow: '0 8px 30px rgba(236, 72, 153, 0.25)' } : {}}
            onClick={() => {
              if (verification.phoneVerified && verification.emailVerified) navigate('/vendor/onboarding/business')
            }}
          >
            Continue to Onboarding
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorVerify;
