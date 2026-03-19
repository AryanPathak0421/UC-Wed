import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/ui/Icon';
import { useVendorState } from '../useVendorState';
import { vendorApi } from '../vendorApi';

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
    password: vendorState?.registration?.password || '',
    emailOtp: '',
    phoneOtp: ''
  });

  const handleChange = (field, value) => {
    const updated = { ...formState, [field]: value };
    setFormState(updated);
    updateVendorState({ registration: updated });
  };

  const requiredFields = ['fullName', 'businessName', 'email', 'phone', 'city', 'category', 'password', 'emailOtp', 'phoneOtp'];
  const progressCount = requiredFields.filter(f => formState[f] && formState[f].length > 0).length;
  const progressPercent = Math.round((progressCount / 9) * 100);

  return (
    <div className="min-h-screen flex items-center justify-center py-2 px-1 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #FAF2F2 0%, #F4DFDF 30%, #f5f3ff 70%, #eff6ff 100%)'
    }}>
      {/* Decorative blobs */}
      <div className="absolute -top-32 -left-32 w-square h-square rounded-full opacity-20" style={{
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, #D28A8C, transparent 70%)',
        filter: 'blur(80px)'
      }}></div>
      <div className="absolute bottom-0 right-0 w-square h-square rounded-full opacity-15" style={{
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, #a855f7, transparent 70%)',
        filter: 'blur(80px)'
      }}></div>

      <div className="max-w-2xl mx-auto py-2 px-1">
        <div className="rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden vendor-surface" style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0.55)), url("/assets/vendor/download (2).jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(210, 138, 140, 0.1)'
        }}>
          {/* Top gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-[2.5rem]" style={{
            background: 'linear-gradient(90deg, #D28A8C, #C27A7C, #a855f7, #D28A8C)',
            backgroundSize: '200% 100%',
            animation: 'gradient-shift 4s ease infinite'
          }}></div>

          {/* New Interactive Header */}
          <div className="text-center mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight drop-shadow-md">Vendor Registration</h2>
            <div className="h-1 w-12 bg-rose-500 mx-auto mt-2 rounded-full opacity-60"></div>
          </div>
 
          <div className="mb-4 p-4 sm:p-5 rounded-2xl" style={{
            background: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid rgba(210, 138, 140, 0.15)',
            boxShadow: '0 4px 15px rgba(210, 138, 140, 0.05)'
          }}>
            <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: '#1e293b' }}>
              <span>Onboarding Progress</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: 'rgba(210, 138, 140, 0.1)' }}>
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${progressPercent}%`,
                  background: 'linear-gradient(90deg, #D28A8C, #C27A7C, #be123c)',
                  boxShadow: '0 0 10px rgba(210, 138, 140, 0.3)'
                }}
              />
            </div>
          </div>
 
          <div className="space-y-4">
            {/* 1. Full Name */}
            <div className="space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#1e293b' }}>Full name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors" style={{ color: '#64748b' }}>
                  <Icon name="user" size="sm" color="current" />
                </div>
                <input
                  autoFocus
                  className="w-full rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold transition-all focus:ring-2 focus:ring-rose-500/20"
                  style={{
                    border: '1px solid rgba(210, 138, 140, 0.15)',
                    background: 'rgba(255, 255, 255, 0.95)'
                  }}
                  value={formState.fullName}
                  onKeyDown={(e) => e.key === 'Enter' && formState.fullName.length > 2}
                  onChange={(event) => handleChange('fullName', event.target.value.replace(/[^a-zA-Z ]/g, ''))}
                  placeholder="e.g. Aditi Kapoor"
                />
              </div>
            </div>

            {/* 2. Business Name - Only if Name is filled */}
            {formState.fullName.length > 2 && (
              <div className="space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-150">
                <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#1e293b' }}>Business name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors" style={{ color: '#64748b' }}>
                    <Icon name="store" size="sm" color="current" />
                  </div>
                  <input
                    className="w-full rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold transition-all focus:ring-2 focus:ring-rose-500/20"
                    style={{
                      border: '1px solid rgba(210, 138, 140, 0.15)',
                      background: 'rgba(255, 255, 255, 0.95)'
                    }}
                    value={formState.businessName}
                    onChange={(event) => handleChange('businessName', event.target.value)}
                    placeholder="e.g. Emerald Studio"
                  />
                </div>
              </div>
            )}

            {/* 3. Email Address - Only if Business Name is filled */}
            {formState.businessName.length > 2 && (
              <div className="space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#1e293b' }}>Email address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors" style={{ color: '#64748b' }}>
                    <Icon name="envelope" size="sm" color="current" />
                  </div>
                  <input
                    type="email"
                    className="w-full rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold transition-all focus:ring-2 focus:ring-rose-500/20"
                    style={{
                      border: '1px solid rgba(210, 138, 140, 0.15)',
                      background: 'rgba(255, 255, 255, 0.95)'
                    }}
                    value={formState.email}
                    onChange={(event) => handleChange('email', event.target.value)}
                    placeholder="hello@emeraldstudio.in"
                  />
                </div>
                {/* Email OTP Verification Field */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${(formState.email || '').includes('@') && (formState.email || '').length > 5 ? 'max-h-24 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}>
                  <div className="flex gap-2 relative">
                    <div className="relative flex-1 group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none" style={{ color: '#D28A8C' }}>
                        <Icon name="shield" size="xs" color="current" />
                      </div>
                      <input
                        type="text"
                        maxLength="4"
                        className="w-full rounded-xl pl-10 pr-4 py-3 text-sm font-semibold tracking-widest transition-all"
                        style={{
                          border: '1.5px dashed rgba(210, 138, 140, 0.4)',
                          background: 'white',
                          color: '#A35E60'
                        }}
                        value={formState.emailOtp || ''}
                        onChange={(event) => handleChange('emailOtp', event.target.value.replace(/\D/g, ''))}
                        placeholder="0000"
                      />
                    </div>
                    <button type="button" className="rounded-xl px-5 text-xs font-semibold uppercase tracking-wider transition-all hover:scale-105 active:scale-95" style={{
                      background: 'linear-gradient(135deg, #be123c, #9f1239)',
                      color: '#fff',
                      boxShadow: '0 4px 15px rgba(210, 138, 140, 0.2)'
                    }}>
                      {formState.emailOtp === '0000' ? '✓' : 'Verify'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Phone Number - Only if Email OTP is entered */}
            {formState.emailOtp === '0000' && (
              <div className="space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#1e293b' }}>Phone number</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors" style={{ color: '#64748b' }}>
                    <Icon name="phone" size="sm" color="current" />
                  </div>
                  <input
                    className="w-full rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold transition-all focus:ring-2 focus:ring-rose-500/20"
                    style={{
                      border: '1px solid rgba(210, 138, 140, 0.15)',
                      background: 'rgba(255, 255, 255, 0.95)'
                    }}
                    value={formState.phone}
                    onChange={(event) => handleChange('phone', event.target.value)}
                    placeholder="+91 98765 43210"
                  />
                </div>
                {/* Phone OTP Verification Field */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${(formState.phone || '').replace(/\D/g, '').length >= 10 ? 'max-h-24 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}>
                  <div className="flex gap-2 relative">
                    <div className="relative flex-1 group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none" style={{ color: '#D28A8C' }}>
                        <Icon name="shield" size="xs" color="current" />
                      </div>
                      <input
                        type="text"
                        maxLength="4"
                        className="w-full rounded-xl pl-10 pr-4 py-3 text-sm font-semibold tracking-widest transition-all"
                        style={{
                          border: '1.5px dashed rgba(210, 138, 140, 0.4)',
                          background: 'white',
                          color: '#A35E60'
                        }}
                        value={formState.phoneOtp || ''}
                        onChange={(event) => handleChange('phoneOtp', event.target.value.replace(/\D/g, ''))}
                        placeholder="1234"
                      />
                    </div>
                    <button type="button" className="rounded-xl px-5 text-xs font-semibold uppercase tracking-wider transition-all hover:scale-105 active:scale-95" style={{
                      background: 'linear-gradient(135deg, #be123c, #9f1239)',
                      color: '#fff',
                      boxShadow: '0 4px 15px rgba(210, 138, 140, 0.2)'
                    }}>
                      {formState.phoneOtp === '1234' ? '✓' : 'Verify'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Location & Category - Only if Phone OTP is entered */}
            {formState.phoneOtp === '1234' && (
              <div className="grid sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#1e293b' }}>Location</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors" style={{ color: '#64748b' }}>
                      <Icon name="location" size="sm" color="current" />
                    </div>
                    <input
                      className="w-full rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold transition-all focus:ring-2 focus:ring-rose-500/20"
                      style={{
                        border: '1px solid rgba(210, 138, 140, 0.15)',
                        background: 'rgba(255, 255, 255, 0.95)'
                      }}
                      value={formState.city}
                      onChange={(event) => handleChange('city', event.target.value)}
                      placeholder="Indore"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#1e293b' }}>Category</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors" style={{ color: '#64748b' }}>
                      <Icon name="palette" size="sm" color="current" />
                    </div>
                    <select
                      className="w-full rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold transition-all appearance-none cursor-pointer"
                      style={{
                        border: '1px solid rgba(210, 138, 140, 0.15)',
                        background: 'rgba(255, 255, 255, 0.95)'
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
            )}

            {/* 6. Password - Final Step */}
            {formState.city.length > 2 && formState.category && (
              <div className="space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#1e293b' }}>Create password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors" style={{ color: '#64748b' }}>
                    <Icon name="shield" size="sm" color="current" />
                  </div>
                  <input
                    type="password"
                    className="w-full rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold transition-all focus:ring-2 focus:ring-rose-500/20"
                    style={{
                      border: '1px solid rgba(210, 138, 140, 0.15)',
                      background: 'rgba(255, 255, 255, 0.95)'
                    }}
                    value={formState.password}
                    onChange={(event) => handleChange('password', event.target.value)}
                    placeholder="At least 8 characters"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-6 transition-all"
            style={{ borderColor: 'rgba(210, 138, 140, 0.1)' }}
          >
            <div className="text-sm font-semibold" style={{ color: '#475569' }}>
              <button onClick={() => navigate('/vendor/login')} className="block font-bold hover:underline" style={{ color: '#be123c' }}>
                Already have an account? Sign In
              </button>
            </div>
            
            <button
              type="button"
              className={`vendor-cta rounded-2xl px-12 py-4 text-base font-bold tracking-wide shadow-xl w-full md:w-auto transition-all ${formState.password.length < 8 ? 'opacity-50 grayscale cursor-not-allowed scale-95' : 'hover:scale-105 active:scale-95'}`}
              style={{ boxShadow: '0 8px 30px rgba(210, 138, 140, 0.25)' }}
              onClick={async () => {
                if (formState.password.length < 8) return;
                try {
                  const res = await vendorApi.register(formState);
                  if (res.success) {
                    localStorage.setItem('vendorToken', res.token);
                    updateVendorState({ vendor: res.vendor });
                    navigate('/vendor/onboarding/business');
                  } else {
                    alert(res.message || 'Registration failed');
                  }
                } catch (err) {
                  alert('Server error connecting to backend');
                }
              }}
            >
              Get Started ✨
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorRegister;
