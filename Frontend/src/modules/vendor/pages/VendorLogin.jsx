import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Icon from '../../../components/ui/Icon';
import { vendorApi } from '../vendorApi';
import { useVendorState } from '../useVendorState';

const VendorLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { updateVendorState } = useVendorState();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const res = await vendorApi.login(email, password);
        if (res.success) {
          localStorage.setItem('vendorToken', res.token);
          updateVendorState({ vendor: res.vendor });
          navigate('/vendor/dashboard');
        } else {
          alert(res.message || 'Login failed');
        }
      } catch (err) {
        alert('Server error connecting to backend');
      }
    } else {
      alert('Please enter your credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-2 py-4 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 30%, #f5f3ff 70%, #eff6ff 100%)'
    }}>
      {/* Decorative blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20" style={{
        background: 'radial-gradient(circle, #ec4899, transparent 70%)',
        filter: 'blur(80px)'
      }}></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-15" style={{
        background: 'radial-gradient(circle, #a855f7, transparent 70%)',
        filter: 'blur(80px)'
      }}></div>

      <div className="w-full max-w-md relative z-10 px-1">
        <div className="rounded-3xl p-4 sm:p-8 shadow-2xl relative overflow-hidden" style={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(236, 72, 153, 0.1)'
        }}>
          {/* Top gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-[2rem]" style={{
            background: 'linear-gradient(90deg, #ec4899, #db2777, #a855f7, #ec4899)',
            backgroundSize: '200% 100%',
            animation: 'gradient-shift 4s ease infinite'
          }}></div>

          <div className="text-center mb-8 mt-5">
            <div className="inline-flex h-40 w-auto items-center justify-center mb-6 transition-all duration-500 hover:scale-110">
              <img src="/assets/vendor/logo_theme.png" alt="Logo" className="h-full w-auto rounded-3xl" />
            </div>
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 animate-bounce">
              <img src="/assets/vendor/key.png" alt="Key" className="h-12 sm:h-20 w-auto opacity-90 img-transparent-fix" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] mb-2" style={{ color: '#ec4899' }}>Vendor Portal</p>
            <h2 className="text-3xl font-black text-slate-900">Welcome Back</h2>
            <p className="text-sm font-medium mt-2" style={{ color: '#94a3b8' }}>Sign in to manage your wedding business.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Email Address</label>
              <div className="relative">
                <span className="absolute left-4 top-3.5" style={{ color: '#cbd5e1' }}>
                  <Icon name="mail" size="sm" color="current" />
                </span>
                <input
                  type="email"
                  className="w-full rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold transition-all"
                  style={{
                    border: '1px solid rgba(236, 72, 153, 0.15)',
                    background: 'rgba(253, 242, 248, 0.3)'
                  }}
                  placeholder="vendor@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Password</label>
                <button type="button" className="text-[11px] font-black uppercase tracking-wider" style={{ color: '#ec4899' }}>Forgot?</button>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-3.5" style={{ color: '#cbd5e1' }}>
                  <Icon name="lock" size="sm" color="current" />
                </span>
                <input
                  type="password"
                  className="w-full rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold transition-all"
                  style={{
                    border: '1px solid rgba(236, 72, 153, 0.15)',
                    background: 'rgba(253, 242, 248, 0.3)'
                  }}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="vendor-cta w-full rounded-2xl py-4 font-black text-lg tracking-wide mt-2"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>
              Don't have a vendor account?
              <Link to="/vendor/register" className="ml-1 font-black" style={{ color: '#ec4899' }}>Register Now</Link>
            </p>
          </div>
        </div>

        {/* Trust badges below */}
        <div className="flex justify-center gap-6 mt-6">
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#94a3b8' }}>&#128274; Secure Login</span>
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#94a3b8' }}>&#9989; Trusted Platform</span>
        </div>
      </div>
    </div>
  );
};

export default VendorLogin;
