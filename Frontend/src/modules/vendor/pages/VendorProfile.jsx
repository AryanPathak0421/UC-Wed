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
      {/* Header */}
      <div className="vendor-surface rounded-3xl p-7 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full opacity-15" style={{
          background: 'radial-gradient(circle, #ec4899, transparent 70%)'
        }}></div>
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: '#ec4899' }}>Profile</p>
            <h2 className="text-2xl font-black text-slate-900 mt-1">Vendor profile details</h2>
            <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>Update business information and verification assets.</p>
          </div>
          <button 
            type="button" 
            className="vendor-cta rounded-2xl px-6 py-3 text-xs font-black tracking-wide active:scale-95 transition-all"
            onClick={handleOpenModal}
          >
            ✏️ Edit Profile
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto" style={{
          background: 'rgba(15, 23, 42, 0.5)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)'
        }}>
          <div className="w-full max-w-2xl rounded-[2rem] p-8 shadow-2xl relative my-8" style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #fdf2f8 100%)',
            border: '1px solid rgba(236, 72, 153, 0.1)'
          }}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-black text-slate-900 leading-none">Edit Profile</h3>
                <p className="text-sm font-medium mt-2" style={{ color: '#94a3b8' }}>Keep your business information up to date.</p>
              </div>
              <button 
                onClick={() => setShowModal(false)} 
                className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:text-rose-500 transition-all active:scale-90"
                style={{ background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)' }}
              >
                <Icon name="close" size="sm" color="current" />
              </button>
            </div>

            <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-2 no-scrollbar">
              {/* Business Section */}
              <div className="space-y-5">
                <h4 className="text-xs font-black uppercase tracking-[0.15em] pl-3" style={{
                  color: '#ec4899',
                  borderLeft: '4px solid #ec4899'
                }}>Business Information</h4>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Business Name</label>
                    <input 
                      className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
                      style={{
                        border: '1px solid rgba(236, 72, 153, 0.15)',
                        background: 'rgba(253, 242, 248, 0.3)'
                      }}
                      value={tempProfile.businessName}
                      onChange={(e) => setTempProfile({...tempProfile, businessName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Category</label>
                    <input 
                      className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
                      style={{
                        border: '1px solid rgba(236, 72, 153, 0.15)',
                        background: 'rgba(253, 242, 248, 0.3)'
                      }}
                      value={tempProfile.category}
                      onChange={(e) => setTempProfile({...tempProfile, category: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>City</label>
                    <input 
                      className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
                      style={{
                        border: '1px solid rgba(236, 72, 153, 0.15)',
                        background: 'rgba(253, 242, 248, 0.3)'
                      }}
                      value={tempProfile.city}
                      onChange={(e) => setTempProfile({...tempProfile, city: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Exp. (Yrs)</label>
                      <input 
                        type="number"
                        className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
                        style={{
                          border: '1px solid rgba(236, 72, 153, 0.15)',
                          background: 'rgba(253, 242, 248, 0.3)'
                        }}
                        value={tempProfile.years}
                        onChange={(e) => setTempProfile({...tempProfile, years: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Team Size</label>
                      <input 
                        type="number"
                        className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
                        style={{
                          border: '1px solid rgba(236, 72, 153, 0.15)',
                          background: 'rgba(253, 242, 248, 0.3)'
                        }}
                        value={tempProfile.teamSize}
                        onChange={(e) => setTempProfile({...tempProfile, teamSize: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bank Section */}
              <div className="space-y-5">
                <h4 className="text-xs font-black uppercase tracking-[0.15em] pl-3" style={{
                  color: '#ec4899',
                  borderLeft: '4px solid #ec4899'
                }}>Bank Details</h4>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Account Name</label>
                    <input 
                      className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
                      style={{
                        border: '1px solid rgba(236, 72, 153, 0.15)',
                        background: 'rgba(253, 242, 248, 0.3)'
                      }}
                      value={tempProfile.accountName}
                      onChange={(e) => setTempProfile({...tempProfile, accountName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Account Number</label>
                    <input 
                      className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
                      style={{
                        border: '1px solid rgba(236, 72, 153, 0.15)',
                        background: 'rgba(253, 242, 248, 0.3)'
                      }}
                      value={tempProfile.accountNumber}
                      onChange={(e) => setTempProfile({...tempProfile, accountNumber: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>IFSC Code</label>
                    <input 
                      className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
                      style={{
                        border: '1px solid rgba(236, 72, 153, 0.15)',
                        background: 'rgba(253, 242, 248, 0.3)'
                      }}
                      value={tempProfile.ifsc}
                      onChange={(e) => setTempProfile({...tempProfile, ifsc: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>UPI ID</label>
                    <input 
                      className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
                      style={{
                        border: '1px solid rgba(236, 72, 153, 0.15)',
                        background: 'rgba(253, 242, 248, 0.3)'
                      }}
                      value={tempProfile.upiId}
                      onChange={(e) => setTempProfile({...tempProfile, upiId: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <button 
                type="button"
                className="vendor-cta w-full rounded-2xl py-5 font-black text-lg mt-6 flex items-center justify-center gap-2 active:scale-95 transition-all uppercase tracking-widest"
                onClick={handleSave}
              >
                💾 Save Profile Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Business Overview + Profile Strength */}
      <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <div className="vendor-surface rounded-3xl p-8">
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl flex items-center justify-center text-sm" style={{
              background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)'
            }}>💼</div>
            Business overview
          </h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 text-sm">
            {[
              { label: 'Business Name', value: vendorState?.registration?.businessName || 'Emerald Studio' },
              { label: 'Category', value: vendorState?.registration?.category || 'Decorator' },
              { label: 'Location', value: vendorState?.registration?.city || 'Indore' }
            ].map(item => (
              <div key={item.label} className="space-y-1.5 p-4 rounded-2xl" style={{
                background: 'rgba(253, 242, 248, 0.3)',
                border: '1px solid rgba(236, 72, 153, 0.05)'
              }}>
                <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#94a3b8' }}>{item.label}</p>
                <p className="font-bold text-slate-900 text-base">{item.value}</p>
              </div>
            ))}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5 p-4 rounded-2xl" style={{
                background: 'rgba(253, 242, 248, 0.3)',
                border: '1px solid rgba(236, 72, 153, 0.05)'
              }}>
                <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#94a3b8' }}>Experience</p>
                <p className="font-bold text-slate-900 text-base">{vendorState?.businessDetails?.years || '0'} Years</p>
              </div>
              <div className="space-y-1.5 p-4 rounded-2xl" style={{
                background: 'rgba(253, 242, 248, 0.3)',
                border: '1px solid rgba(236, 72, 153, 0.05)'
              }}>
                <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#94a3b8' }}>Team</p>
                <p className="font-bold text-slate-900 text-base">{vendorState?.businessDetails?.teamSize || '0'} Pax</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Strength */}
        <div className="vendor-surface rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full opacity-20" style={{
            background: 'radial-gradient(circle, #ec4899, transparent 70%)'
          }}></div>
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: '#ec4899' }}>Profile strength</p>
            <div className="flex items-end gap-3 mb-4">
              <h3 className="text-5xl font-black leading-none bg-clip-text text-transparent" style={{
                backgroundImage: 'linear-gradient(135deg, #ec4899, #db2777, #a855f7)'
              }}>{completion}%</h3>
              <p className="text-sm font-black uppercase tracking-wider mb-1" style={{ color: '#cbd5e1' }}>COMPLETED</p>
            </div>
            <div className="h-3 w-full rounded-full overflow-hidden" style={{ background: 'rgba(236, 72, 153, 0.08)' }}>
              <div className="h-full rounded-full" style={{ 
                width: `${completion}%`,
                background: 'linear-gradient(90deg, #ec4899, #db2777, #a855f7)',
                boxShadow: '0 0 15px rgba(236, 72, 153, 0.4)'
              }}></div>
            </div>
            <div className="mt-6 text-xs font-bold leading-relaxed p-4 rounded-2xl" style={{
              color: '#64748b',
              background: 'linear-gradient(135deg, rgba(253,242,248,0.5), rgba(245,243,255,0.5))',
              border: '1px solid rgba(236, 72, 153, 0.08)'
            }}>
              Complete your documents and bank details to achieve a 100% verified badge and improve your visibility to customers.
            </div>
          </div>
        </div>
      </div>

      {/* Documents + Bank */}
      <div className="grid gap-6 xl:grid-cols-2 pb-10">
        <div className="vendor-surface rounded-3xl p-8">
          <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl flex items-center justify-center text-sm" style={{
              background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)'
            }}>📋</div>
            Documents Status
          </h3>
          <div className="space-y-4">
            {[
              { label: 'ID Proof', key: 'idProof' },
              { label: 'GST Certificate', key: 'gst' },
              { label: 'Service Contract', key: 'contract' }
            ].map(doc => (
              <div key={doc.key} className="flex items-center justify-between rounded-2xl p-4 transition-all hover:scale-[1.01]" style={{
                background: 'rgba(253, 242, 248, 0.3)',
                border: '1px solid rgba(236, 72, 153, 0.06)'
              }}>
                <span className="text-sm font-bold text-slate-700">{doc.label}</span>
                <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider" style={
                  vendorState?.documents?.[doc.key] 
                    ? { background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)', color: '#15803d' }
                    : { background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)', color: '#94a3b8' }
                }>
                  {vendorState?.documents?.[doc.key] ? '✓ Verified' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="vendor-surface rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full opacity-10" style={{
            background: 'radial-gradient(circle, #a855f7, transparent 70%)'
          }}></div>
          <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3 relative z-10">
            <div className="h-9 w-9 rounded-xl flex items-center justify-center text-sm" style={{
              background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)'
            }}>🏦</div>
            Bank Accounts
          </h3>
          <div className="space-y-5 relative z-10">
            <div className="grid grid-cols-2 gap-y-5 text-sm">
              {[
                { label: 'Account Name', value: vendorState?.bank?.accountName || 'Not added' },
                { label: 'Account Number', value: vendorState?.bank?.accountNumber || 'Not added' },
                { label: 'IFSC Code', value: vendorState?.bank?.ifsc || 'Not added' },
                { label: 'UPI ID', value: vendorState?.bank?.upiId || 'Not added', highlight: true }
              ].map(item => (
                <div key={item.label} className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#94a3b8' }}>{item.label}</p>
                  <p className={`font-bold ${item.highlight ? '' : 'text-slate-800 uppercase'}`} style={item.highlight ? { color: '#ec4899' } : {}}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-2xl flex items-center gap-3" style={{
              background: 'linear-gradient(135deg, rgba(253,242,248,0.5), rgba(245,243,255,0.5))',
              border: '1px solid rgba(236, 72, 153, 0.08)'
            }}>
              <div className="h-7 w-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0" style={{
                background: 'linear-gradient(135deg, #ec4899, #db2777)',
                color: 'white'
              }}>i</div>
              <p className="text-[11px] font-bold leading-snug" style={{ color: '#64748b' }}>Payments are processed within 48 hours of booking completion.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;
