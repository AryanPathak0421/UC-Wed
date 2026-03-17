import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/ui/Icon';
import { useVendorState } from '../useVendorState';

const VendorRegister = () => {
  const navigate = useNavigate();
  const { vendorState, updateVendorState } = useVendorState();
  const [formState, setFormState] = useState(vendorState.registration);

  const handleChange = (field, value) => {
    const updated = { ...formState, [field]: value };
    setFormState(updated);
    updateVendorState({ registration: updated });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="vendor-surface rounded-3xl p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Vendor Registration</p>
            <h2 className="text-2xl font-bold text-slate-900">Join the platform in minutes</h2>
            <p className="text-sm text-slate-500">Create your vendor account and start receiving inquiries.</p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            <Icon name="verified" size="sm" color="current" />
            Secure onboarding
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 mb-8">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            <span>Progress</span>
            <span>{Math.round((Object.values(formState).filter(v => v.length > 0).length / 7) * 100)}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 transition-all duration-500 ease-out"
              style={{ width: `${(Object.values(formState).filter(v => v.length > 0).length / 7) * 100}%` }}
            />
          </div>
        </div>

        <div className="mt-8 space-y-0">
          {/* Full Name - Always Visible */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Full name</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <Icon name="user" size="sm" />
              </div>
              <input
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/30 pl-11 pr-4 py-3.5 text-sm font-medium focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all"
                value={formState.fullName}
                onChange={(event) => handleChange('fullName', event.target.value)}
                placeholder="e.g. Aditi Kapoor"
              />
            </div>
          </div>

          {/* Business Name */}
          <div className={`field-transition ${formState.fullName.length >= 3 ? 'field-visible' : 'field-hidden'}`}>
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Business name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                  <Icon name="store" size="sm" />
                </div>
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/30 pl-11 pr-4 py-3.5 text-sm font-medium focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all"
                  value={formState.businessName}
                  onChange={(event) => handleChange('businessName', event.target.value)}
                  placeholder="e.g. Emerald Studio"
                />
              </div>
            </div>
          </div>

          {/* Email Address */}
          <div className={`field-transition ${formState.businessName.length >= 3 ? 'field-visible' : 'field-hidden'}`}>
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Email address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                  <Icon name="envelope" size="sm" />
                </div>
                <input
                  type="email"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/30 pl-11 pr-4 py-3.5 text-sm font-medium focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all"
                  value={formState.email}
                  onChange={(event) => handleChange('email', event.target.value)}
                  placeholder="hello@emeraldstudio.in"
                />
              </div>
            </div>
          </div>

          {/* Phone Number */}
          <div className={`field-transition ${formState.email.includes('@') && formState.email.includes('.') ? 'field-visible' : 'field-hidden'}`}>
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Phone number</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                  <Icon name="phone" size="sm" />
                </div>
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/30 pl-11 pr-4 py-3.5 text-sm font-medium focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all"
                  value={formState.phone}
                  onChange={(event) => handleChange('phone', event.target.value)}
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
          </div>

          {/* City / District */}
          <div className={`field-transition ${formState.phone.length >= 10 ? 'field-visible' : 'field-hidden'}`}>
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">City / district</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                  <Icon name="location" size="sm" />
                </div>
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/30 pl-11 pr-4 py-3.5 text-sm font-medium focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all"
                  value={formState.city}
                  onChange={(event) => handleChange('city', event.target.value)}
                  placeholder="Indore"
                />
              </div>
            </div>
          </div>

          {/* Service Category */}
          <div className={`field-transition ${formState.city.length >= 3 ? 'field-visible' : 'field-hidden'}`}>
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Service category</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                  <Icon name="palette" size="sm" />
                </div>
                <select
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/30 pl-11 pr-4 py-3.5 text-sm font-medium focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all appearance-none"
                  value={formState.category}
                  onChange={(event) => handleChange('category', event.target.value)}
                >
                  <option value="">Select category</option>
                  <option>Decorator</option>
                  <option>Photographer</option>
                  <option>Caterer</option>
                  <option>Makeup Artist</option>
                  <option>Venue</option>
                  <option>Live Streaming</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                  <Icon name="chevronDown" size="xs" />
                </div>
              </div>
            </div>
          </div>

          {/* Password */}
          <div className={`field-transition ${formState.category !== '' ? 'field-visible' : 'field-hidden'}`}>
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Create password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                  <Icon name="shield" size="sm" />
                </div>
                <input
                  type="password"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/30 pl-11 pr-4 py-3.5 text-sm font-medium focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all"
                  value={formState.password}
                  onChange={(event) => handleChange('password', event.target.value)}
                  placeholder="At least 8 characters"
                />
              </div>
            </div>
          </div>
        </div>

        <div className={`mt-10 flex flex-wrap items-center justify-between gap-6 transition-all duration-700 ${formState.password.length >= 8 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          <div className="text-sm text-slate-500">
            By continuing, you agree to the vendor terms. 
            <button onClick={() => navigate('/vendor/login')} className="block mt-1 font-bold text-emerald-600 hover:text-emerald-700">
              Already have an account? Sign In
            </button>
          </div>
          <button
            type="button"
            className="vendor-cta rounded-2xl px-10 py-4 text-base font-bold shadow-lg shadow-emerald-200"
            onClick={() => navigate('/vendor/verify')}
          >
            Create My Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorRegister;
