import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Icon from '../../../components/ui/Icon';

const VendorLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login logic
    if (email && password) {
      navigate('/vendor/dashboard');
    } else {
      alert('Please enter your credentials');
    }
  };

  return (
    <div className="max-w-md mx-auto my-20">
      <div className="vendor-surface rounded-3xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-2">Vendor Portal</p>
          <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-sm text-slate-500 mt-2">Sign in to manage your wedding business.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Email Address</label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-slate-400">
                <Icon name="mail" size="sm" color="current" />
              </span>
              <input
                type="email"
                className="w-full rounded-xl border border-slate-200 pl-11 pr-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all font-medium"
                placeholder="vendor@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <button type="button" className="text-xs font-bold text-emerald-600 hover:text-emerald-700">Forgot?</button>
            </div>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-slate-400">
                <Icon name="lock" size="sm" color="current" />
              </span>
              <input
                type="password"
                className="w-full rounded-xl border border-slate-200 pl-11 pr-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all font-medium"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="vendor-cta w-full rounded-2xl py-4 font-bold text-lg shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transition-all"
          >
            Sign In
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-sm text-slate-500">
            Don't have a vendor account? 
            <Link to="/vendor/register" className="ml-1 font-bold text-emerald-600 hover:text-emerald-700">Register Now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorLogin;
