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
    <div className="max-w-4xl mx-auto">
      <div className="vendor-surface rounded-3xl p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Verification</p>
            <h2 className="text-2xl font-bold text-slate-900">Verify your contact details</h2>
            <p className="text-sm text-slate-500">Complete phone OTP and email verification to activate your account.</p>
          </div>
          <div className="rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">Security check</div>
        </div>

        <div className="mt-8 grid gap-6">
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 px-5 py-4">
            <div>
              <p className="text-sm font-semibold text-slate-800">Phone OTP verification</p>
              <p className="text-xs text-slate-500">OTP sent to your registered phone number.</p>
            </div>
            <button
              type="button"
              className={`rounded-xl px-4 py-2 text-xs font-semibold ${verification.phoneVerified ? 'bg-emerald-600 text-white' : 'border border-emerald-200 text-emerald-700'}`}
              onClick={() => updateVerification('phoneVerified')}
            >
              {verification.phoneVerified ? 'Verified' : 'Mark as verified'}
            </button>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 px-5 py-4">
            <div>
              <p className="text-sm font-semibold text-slate-800">Email verification</p>
              <p className="text-xs text-slate-500">Verification link sent to your email.</p>
            </div>
            <button
              type="button"
              className={`rounded-xl px-4 py-2 text-xs font-semibold ${verification.emailVerified ? 'bg-emerald-600 text-white' : 'border border-emerald-200 text-emerald-700'}`}
              onClick={() => updateVerification('emailVerified')}
            >
              {verification.emailVerified ? 'Verified' : 'Mark as verified'}
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Icon name="verified" size="sm" color="current" />
            Verified vendors get higher visibility in search results.
          </div>
          <button
            type="button"
            className="vendor-cta rounded-xl px-5 py-3 text-sm font-semibold"
            onClick={() => navigate('/vendor/onboarding/business')}
          >
            Continue to onboarding
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorVerify;
