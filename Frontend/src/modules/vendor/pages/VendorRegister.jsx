import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/ui/Icon';
import { useVendorState } from '../useVendorState';

const VendorRegister = () => {
  const navigate = useNavigate();
  const { vendorState, updateVendorState } = useVendorState();
  const [formState, setFormState] = useState({
    fullName: vendorState?.registration?.fullName || '',
    businessName: vendorState?.registration?.businessName || '',
    email: vendorState?.registration?.email || '',
    phone: vendorState?.registration?.phone || '',
    city: vendorState?.registration?.city || '',
    category: vendorState?.registration?.category || '',
    password: vendorState?.registration?.password || ''
  });

  const handleChange = (field, value) => {
    const updated = { ...formState, [field]: value };
    setFormState(updated);
    updateVendorState({ registration: updated });
  };

  const progressCount = Object.values(formState).filter(v => v && v.length > 0).length;
  const progressPercent = Math.round((progressCount / 7) * 100);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 30%, #f5f3ff 70%, #eff6ff 100%)'
    }}>
      {/* Decorative blobs */}
      <div className="absolute -top-32 -left-32 w-square h-square rounded-full opacity-20" style={{
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, #ec4899, transparent 70%)',
        filter: 'blur(80px)'
      }}></div>
      <div className="absolute bottom-0 right-0 w-square h-square rounded-full opacity-15" style={{
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, #a855f7, transparent 70%)',
        filter: 'blur(80px)'
      }}></div>

      <div className="max-w-2xl w-full mx-auto relative z-10">
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

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: '#ec4899' }}>Vendor Registration</p>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">Join the platform</h2>
              <p className="text-sm font-medium mt-1" style={{ color: '#94a3b8' }}>Create your vendor account and start receiving inquiries.</p>
            </div>
            <div className="flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-wider shadow-sm" style={{
              background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)',
              color: '#be185d',
              border: '1px solid rgba(236, 72, 153, 0.1)'
            }}>
              <Icon name="verified" size="xs" color="current" />
              Secure onboarding
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-10 mb-8 p-6 rounded-3xl" style={{
            background: 'rgba(253, 242, 248, 0.4)',
            border: '1px solid rgba(236, 72, 153, 0.08)'
          }}>
            <div className="flex justify-between text-[10px] font-black uppercase tracking-wider mb-3" style={{ color: '#ec4899' }}>
              <span>Profile Completion</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: 'rgba(236, 72, 153, 0.1)' }}>
              <div 
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{ 
                  width: `${progressPercent}%`,
                  background: 'linear-gradient(90deg, #ec4899, #db2777)',
                  boxShadow: '0 0 10px rgba(236, 72, 153, 0.3)'
                }}
              />
            </div>
          </div>

          <div className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Full name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors" style={{ color: '#cbd5e1' }}>
                  <Icon name="user" size="sm" color="current" />
                </div>
                <input
                  className="w-full rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold transition-all"
                  style={{
                    border: '1px solid rgba(236, 72, 153, 0.15)',
                    background: 'rgba(255, 255, 255, 0.6)'
                  }}
                  value={formState.fullName}
                  onChange={(event) => handleChange('fullName', event.target.value)}
                  placeholder="e.g. Aditi Kapoor"
                />
              </div>
            </div>

            {/* Business Name */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Business name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors" style={{ color: '#cbd5e1' }}>
                  <Icon name="store" size="sm" color="current" />
                </div>
                <input
                  className="w-full rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold transition-all"
                  style={{
                    border: '1px solid rgba(236, 72, 153, 0.15)',
                    background: 'rgba(255, 255, 255, 0.6)'
                  }}
                  value={formState.businessName}
                  onChange={(event) => handleChange('businessName', event.target.value)}
                  placeholder="e.g. Emerald Studio"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Email address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors" style={{ color: '#cbd5e1' }}>
                  <Icon name="envelope" size="sm" color="current" />
                </div>
                <input
                  type="email"
                  className="w-full rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold transition-all"
                  style={{
                    border: '1px solid rgba(236, 72, 153, 0.15)',
                    background: 'rgba(255, 255, 255, 0.6)'
                  }}
                  value={formState.email}
                  onChange={(event) => handleChange('email', event.target.value)}
                  placeholder="hello@emeraldstudio.in"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Phone number</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors" style={{ color: '#cbd5e1' }}>
                  <Icon name="phone" size="sm" color="current" />
                </div>
                <input
                  className="w-full rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold transition-all"
                  style={{
                    border: '1px solid rgba(236, 72, 153, 0.15)',
                    background: 'rgba(255, 255, 255, 0.6)'
                  }}
                  value={formState.phone}
                  onChange={(event) => handleChange('phone', event.target.value)}
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* City / District */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Location</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors" style={{ color: '#cbd5e1' }}>
                    <Icon name="location" size="sm" color="current" />
                  </div>
                  <input
                    className="w-full rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold transition-all"
                    style={{
                      border: '1px solid rgba(236, 72, 153, 0.15)',
                      background: 'rgba(255, 255, 255, 0.6)'
                    }}
                    value={formState.city}
                    onChange={(event) => handleChange('city', event.target.value)}
                    placeholder="Indore"
                  />
                </div>
              </div>

              {/* Service Category */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Category</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors" style={{ color: '#cbd5e1' }}>
                    <Icon name="palette" size="sm" color="current" />
                  </div>
                  <select
                    className="w-full rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold transition-all appearance-none cursor-pointer"
                    style={{
                      border: '1px solid rgba(236, 72, 153, 0.15)',
                      background: 'rgba(255, 255, 255, 0.6)'
                    }}
                    value={formState.category}
                    onChange={(event) => handleChange('category', event.target.value)}
                  >
                    <option value="">Select</option>
                    <option>Decorator</option>
                    <option>Photographer</option>
                    <option>Caterer</option>
                    <option>Makeup Artist</option>
                    <option>Venue</option>
                    <option>Live Streaming</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none" style={{ color: '#cbd5e1' }}>
                    <Icon name="chevronDown" size="xs" />
                  </div>
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Create password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors" style={{ color: '#cbd5e1' }}>
                  <Icon name="shield" size="sm" color="current" />
                </div>
                <input
                  type="password"
                  className="w-full rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold transition-all"
                  style={{
                    border: '1px solid rgba(236, 72, 153, 0.15)',
                    background: 'rgba(255, 255, 255, 0.6)'
                  }}
                  value={formState.password}
                  onChange={(event) => handleChange('password', event.target.value)}
                  placeholder="At least 8 characters"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-6 transition-all"
            style={{ borderColor: 'rgba(236, 72, 153, 0.1)' }}
          >
            <div className="text-sm font-medium" style={{ color: '#64748b' }}>
              By continuing, you agree to the vendor terms. 
              <button onClick={() => navigate('/vendor/login')} className="block mt-1 font-black" style={{ color: '#ec4899' }}>
                Already have an account? Sign In
              </button>
            </div>
            <button
              type="button"
              className="vendor-cta rounded-2xl px-10 py-4 text-base font-black tracking-wide shadow-xl w-full md:w-auto"
              style={{ boxShadow: '0 8px 30px rgba(236, 72, 153, 0.25)' }}
              onClick={() => {
                if(formState.fullName && formState.password.length >= 8) {
                  navigate('/vendor/verify')
                } else {
                  alert('Please fill out the form completely and ensure password is >= 8 characters.');
                }
              }}
            >
              Create My Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorRegister;
