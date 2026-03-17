import { useState } from 'react';
import { useVendorState } from '../useVendorState';
import { computeProfileCompletion } from '../vendorStore';
import Icon from '../../../components/ui/Icon';

const VendorProfile = () => {
  const { vendorState, updateVendorState } = useVendorState();
  const [showModal, setShowModal] = useState(false);
  const [tempProfile, setTempProfile] = useState({
    businessName: '',
    category: '',
    city: '',
    years: '',
    teamSize: '',
    accountName: '',
    accountNumber: '',
    ifsc: '',
    upiId: ''
  });

  const completion = computeProfileCompletion(vendorState);

  const handleOpenModal = () => {
    console.log('Opening profile edit modal');
    setTempProfile({
      businessName: vendorState?.registration?.businessName || '',
      category: vendorState?.registration?.category || '',
      city: vendorState?.registration?.city || '',
      years: vendorState?.businessDetails?.years || '',
      teamSize: vendorState?.businessDetails?.teamSize || '',
      accountName: vendorState?.bank?.accountName || '',
      accountNumber: vendorState?.bank?.accountNumber || '',
      ifsc: vendorState?.bank?.ifsc || '',
      upiId: vendorState?.bank?.upiId || ''
    });
    setShowModal(true);
  };

  const handleSave = () => {
    console.log('Saving profile changes:', tempProfile);
    updateVendorState({
      registration: {
        ...(vendorState?.registration || {}),
        businessName: tempProfile.businessName,
        category: tempProfile.category,
        city: tempProfile.city
      },
      businessDetails: {
        ...(vendorState?.businessDetails || {}),
        years: tempProfile.years,
        teamSize: tempProfile.teamSize
      },
      bank: {
        ...(vendorState?.bank || {}),
        accountName: tempProfile.accountName,
        accountNumber: tempProfile.accountNumber,
        ifsc: tempProfile.ifsc,
        upiId: tempProfile.upiId
      }
    });
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="vendor-surface rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Profile</p>
            <h2 className="text-2xl font-bold text-slate-900">Vendor profile details</h2>
            <p className="text-sm text-slate-500">Update business information and verification assets.</p>
          </div>
          <button 
            type="button" 
            className="vendor-cta rounded-xl px-5 py-2.5 text-xs font-bold shadow-lg shadow-emerald-100 active:scale-95 transition-all"
            onClick={handleOpenModal}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-[2rem] p-8 shadow-2xl relative my-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-black text-slate-900 leading-none">Edit Profile</h3>
                <p className="text-sm text-slate-500 mt-2 font-medium">Keep your business information up to date.</p>
              </div>
              <button 
                onClick={() => setShowModal(false)} 
                className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all active:scale-90"
              >
                <Icon name="close" size="sm" color="current" />
              </button>
            </div>

            <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-2 no-scrollbar">
              {/* Business Section */}
              <div className="space-y-5">
                <h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest border-l-4 border-emerald-500 pl-3">Business Information</h4>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Business Name</label>
                    <input 
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-3.5 text-sm font-semibold focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all"
                      value={tempProfile.businessName}
                      onChange={(e) => setTempProfile({...tempProfile, businessName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Category</label>
                    <input 
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-3.5 text-sm font-semibold focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all"
                      value={tempProfile.category}
                      onChange={(e) => setTempProfile({...tempProfile, category: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">City</label>
                    <input 
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-3.5 text-sm font-semibold focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all"
                      value={tempProfile.city}
                      onChange={(e) => setTempProfile({...tempProfile, city: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Exp. (Yrs)</label>
                      <input 
                        type="number"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-3.5 text-sm font-semibold focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all"
                        value={tempProfile.years}
                        onChange={(e) => setTempProfile({...tempProfile, years: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Team Size</label>
                      <input 
                        type="number"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-3.5 text-sm font-semibold focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all"
                        value={tempProfile.teamSize}
                        onChange={(e) => setTempProfile({...tempProfile, teamSize: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bank Section */}
              <div className="space-y-5">
                <h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest border-l-4 border-emerald-500 pl-3">Bank Details</h4>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Account Name</label>
                    <input 
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-3.5 text-sm font-semibold focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all"
                      value={tempProfile.accountName}
                      onChange={(e) => setTempProfile({...tempProfile, accountName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Account Number</label>
                    <input 
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-3.5 text-sm font-semibold focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all"
                      value={tempProfile.accountNumber}
                      onChange={(e) => setTempProfile({...tempProfile, accountNumber: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">IFSC Code</label>
                    <input 
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-3.5 text-sm font-semibold focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all"
                      value={tempProfile.ifsc}
                      onChange={(e) => setTempProfile({...tempProfile, ifsc: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">UPI ID</label>
                    <input 
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-3.5 text-sm font-semibold focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all"
                      value={tempProfile.upiId}
                      onChange={(e) => setTempProfile({...tempProfile, upiId: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <button 
                type="button"
                className="vendor-cta w-full rounded-2xl py-5 font-black text-lg mt-6 shadow-xl shadow-emerald-100 flex items-center justify-center gap-2 active:scale-95 transition-all uppercase tracking-widest"
                onClick={handleSave}
              >
                Save Profile Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <div className="vendor-surface rounded-3xl p-8">
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            Business overview
          </h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 text-sm">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Business Name</p>
              <p className="font-bold text-slate-900 text-base">{vendorState?.registration?.businessName || 'Emerald Studio'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</p>
              <p className="font-bold text-slate-900 text-base">{vendorState?.registration?.category || 'Decorator'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</p>
              <p className="font-bold text-slate-900 text-base">{vendorState?.registration?.city || 'Indore'}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Experience</p>
                <p className="font-bold text-slate-900 text-base">{vendorState?.businessDetails?.years || '0'} Years</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Team</p>
                <p className="font-bold text-slate-900 text-base">{vendorState?.businessDetails?.teamSize || '0'} Pax</p>
              </div>
            </div>
          </div>
        </div>

        <div className="vendor-surface rounded-3xl p-8 flex flex-col justify-center border-emerald-100/50">
          <p className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em] mb-4">Profile strength</p>
          <div className="flex items-end gap-3 mb-4">
            <h3 className="text-5xl font-black text-slate-900 leading-none">{completion}%</h3>
            <p className="text-sm font-bold text-slate-400 mb-1">COMPLETED</p>
          </div>
          <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]" style={{ width: `${completion}%` }}></div>
          </div>
          <p className="mt-6 text-xs font-bold text-slate-500 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100/50">
            Complete your documents and bank details to achieve a 100% verified badge and improve your visibility to customers.
          </p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2 pb-10">
        <div className="vendor-surface rounded-3xl p-8">
          <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-slate-50 flex items-center justify-center">
              <Icon name="check" size="sm" color="emerald" />
            </div>
            Documents Status
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-white border border-slate-50 p-4 hover:border-emerald-100 transition-colors group">
              <span className="text-sm font-bold text-slate-700">ID Proof</span>
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${vendorState?.documents?.idProof ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                {vendorState?.documents?.idProof ? 'Verified' : 'Pending'}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-white border border-slate-50 p-4 hover:border-emerald-100 transition-colors group">
              <span className="text-sm font-bold text-slate-700">GST Certificate</span>
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${vendorState?.documents?.gst ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                {vendorState?.documents?.gst ? 'Verified' : 'Pending'}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-white border border-slate-50 p-4 hover:border-emerald-100 transition-colors group">
              <span className="text-sm font-bold text-slate-700">Service Contract</span>
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${vendorState?.documents?.contract ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                {vendorState?.documents?.contract ? 'Verified' : 'Pending'}
              </span>
            </div>
          </div>
        </div>

        <div className="vendor-surface rounded-3xl p-8 bg-gradient-to-br from-white to-slate-50/50">
          <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Icon name="money" size="sm" color="emerald" />
            </div>
            Bank Accounts
          </h3>
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <div className="space-y-0.5">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Account Name</p>
                <p className="font-bold text-slate-800">{vendorState?.bank?.accountName || 'Not added'}</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Account Number</p>
                <p className="font-bold text-slate-800 uppercase">{vendorState?.bank?.accountNumber || 'Not added'}</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">IFSC Code</p>
                <p className="font-bold text-slate-800 uppercase">{vendorState?.bank?.ifsc || 'Not added'}</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">UPI ID</p>
                <p className="font-bold text-emerald-600">{vendorState?.bank?.upiId || 'Not added'}</p>
              </div>
            </div>
            <div className="mt-2 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 flex items-center gap-3">
              <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] text-emerald-600 font-black">i</div>
              <p className="text-[11px] font-bold text-emerald-700 leading-snug">Payments are processed within 48 hours of booking completion.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;

