import { useState, useEffect } from 'react';
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

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

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
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-7 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full opacity-15" style={{
          background: 'radial-gradient(circle, #D28A8C, transparent 70%)'
        }}></div>
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 relative z-10">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: '#D28A8C' }}>Profile</p>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5 sm:mt-1">Vendor profile details</h2>
            <p className="text-xs sm:text-sm font-medium" style={{ color: '#94a3b8' }}>Update business information and verification assets.</p>
          </div>
          <button 
            type="button" 
            className="vendor-cta rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 text-[11px] sm:text-xs font-bold tracking-wide active:scale-95 transition-all flex items-center gap-1.5 sm:gap-2"
            onClick={handleOpenModal}
          >
            <Icon name="edit" size="xs" /> Edit Profile
          </button>
        </div>
      </div>

      {/* Edit Modal (Ultra-Compact Version) */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 overflow-hidden" style={{
          background: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }}>
          <div className="w-full max-w-xl rounded-[1.5rem] p-4 sm:p-6 shadow-2xl relative my-auto animate-in zoom-in-95 duration-200" style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #FAF2F2 100%)',
            border: '1px solid rgba(210, 138, 140, 0.1)'
          }}>
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <div>
                <h3 className="text-xl font-bold text-slate-900 leading-none">Edit Profile</h3>
                <p className="text-[11px] font-medium mt-1" style={{ color: '#94a3b8' }}>Update your business details quickly.</p>
              </div>
              <button 
                onClick={() => setShowModal(false)} 
                className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:text-rose-500 transition-all active:scale-90"
                style={{ background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)' }}
              >
                <Icon name="close" size="xs" color="current" />
              </button>
            </div>

            <div className="space-y-4 sm:space-y-5 max-h-[75vh] overflow-y-auto pr-2 no-scrollbar">
              {/* Business Section */}
              <div className="space-y-3 sm:space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] pl-2.5" style={{
                  color: '#D28A8C',
                  borderLeft: '3px solid #D28A8C'
                }}>Business Info</h4>
                <div className="grid gap-2.5 sm:gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Name</label>
                    <input 
                      className="w-full rounded-xl px-4 py-2 sm:py-2.5 text-sm font-semibold transition-all"
                      style={{
                        border: '1px solid rgba(210, 138, 140, 0.12)',
                        background: 'rgba(253, 242, 248, 0.25)'
                      }}
                      value={tempProfile.businessName}
                      onChange={(e) => setTempProfile({...tempProfile, businessName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Category</label>
                    <input 
                      className="w-full rounded-xl px-4 py-2 sm:py-2.5 text-sm font-semibold transition-all"
                      style={{
                        border: '1px solid rgba(210, 138, 140, 0.12)',
                        background: 'rgba(253, 242, 248, 0.25)'
                      }}
                      value={tempProfile.category}
                      onChange={(e) => setTempProfile({...tempProfile, category: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>City</label>
                    <input 
                      className="w-full rounded-xl px-4 py-2 sm:py-2.5 text-sm font-semibold transition-all"
                      style={{
                        border: '1px solid rgba(210, 138, 140, 0.12)',
                        background: 'rgba(253, 242, 248, 0.25)'
                      }}
                      value={tempProfile.city}
                      onChange={(e) => setTempProfile({...tempProfile, city: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Exp.</label>
                      <input 
                        type="number"
                        className="w-full rounded-xl px-4 py-2 sm:py-2.5 text-sm font-semibold transition-all"
                        style={{
                          border: '1px solid rgba(210, 138, 140, 0.12)',
                          background: 'rgba(253, 242, 248, 0.25)'
                        }}
                        value={tempProfile.years}
                        onChange={(e) => setTempProfile({...tempProfile, years: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Team Size</label>
                      <input 
                        type="number"
                        className="w-full rounded-xl px-4 py-2 sm:py-2.5 text-sm font-semibold transition-all"
                        style={{
                          border: '1px solid rgba(210, 138, 140, 0.12)',
                          background: 'rgba(253, 242, 248, 0.25)'
                        }}
                        value={tempProfile.teamSize}
                        onChange={(e) => setTempProfile({...tempProfile, teamSize: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bank Section */}
              <div className="space-y-3 sm:space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] pl-2.5" style={{
                  color: '#D28A8C',
                  borderLeft: '3px solid #D28A8C'
                }}>Bank Details</h4>
                <div className="grid gap-2.5 sm:gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Account Name</label>
                    <input 
                      className="w-full rounded-xl px-4 py-2 sm:py-2.5 text-sm font-semibold transition-all"
                      style={{
                        border: '1px solid rgba(210, 138, 140, 0.12)',
                        background: 'rgba(253, 242, 248, 0.25)'
                      }}
                      value={tempProfile.accountName}
                      onChange={(e) => setTempProfile({...tempProfile, accountName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Acc Number</label>
                    <input 
                      className="w-full rounded-xl px-4 py-2 sm:py-2.5 text-sm font-semibold transition-all"
                      style={{
                        border: '1px solid rgba(210, 138, 140, 0.12)',
                        background: 'rgba(253, 242, 248, 0.25)'
                      }}
                      value={tempProfile.accountNumber}
                      onChange={(e) => setTempProfile({...tempProfile, accountNumber: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>IFSC Code</label>
                    <input 
                      className="w-full rounded-xl px-4 py-2 sm:py-2.5 text-sm font-semibold transition-all"
                      style={{
                        border: '1px solid rgba(210, 138, 140, 0.12)',
                        background: 'rgba(253, 242, 248, 0.25)'
                      }}
                      value={tempProfile.ifsc}
                      onChange={(e) => setTempProfile({...tempProfile, ifsc: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>UPI ID</label>
                    <input 
                      className="w-full rounded-xl px-4 py-2 sm:py-2.5 text-sm font-semibold transition-all"
                      style={{
                        border: '1px solid rgba(210, 138, 140, 0.12)',
                        background: 'rgba(253, 242, 248, 0.25)'
                      }}
                      value={tempProfile.upiId}
                      onChange={(e) => setTempProfile({...tempProfile, upiId: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <button 
                type="button"
                className="vendor-cta w-full rounded-xl py-3.5 font-bold text-sm sm:text-base mt-2 flex items-center justify-center gap-2 active:scale-[0.98] transition-all uppercase tracking-widest"
                onClick={handleSave}
              >
                💾 Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Business Overview + Profile Strength */}
      <div className="grid gap-4 sm:gap-6 xl:grid-cols-[1.2fr_1fr]">
        <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)'
            }}>
              <Icon name="briefcase" size="xs" color="currentColor" />
            </div>
            Business overview
          </h3>
          <div className="mt-3 sm:mt-4 grid gap-2.5 sm:gap-4 sm:grid-cols-2 text-sm">
            {[
              { label: 'Business Name', value: vendorState?.registration?.businessName || 'Emerald Studio' },
              { label: 'Category', value: vendorState?.registration?.category || 'Decorator' },
              { label: 'Location', value: vendorState?.registration?.city || 'Indore' }
            ].map(item => (
              <div key={item.label} className="space-y-0.5 p-2.5 sm:p-3.5 rounded-lg sm:rounded-xl transition-all hover:bg-white" style={{
                background: 'rgba(253, 242, 248, 0.3)',
                border: '1px solid rgba(210, 138, 140, 0.05)'
              }}>
                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest" style={{ color: '#94a3b8' }}>{item.label}</p>
                <p className="font-semibold text-slate-900 text-xs sm:text-[15px]">{item.value}</p>
              </div>
            ))}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div className="space-y-0.5 p-2.5 sm:p-3.5 rounded-lg sm:rounded-xl transition-all hover:bg-white" style={{
                background: 'rgba(253, 242, 248, 0.3)',
                border: '1px solid rgba(210, 138, 140, 0.05)'
              }}>
                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest" style={{ color: '#94a3b8' }}>Experience</p>
                <p className="font-semibold text-slate-900 text-xs sm:text-[15px]">{vendorState?.businessDetails?.years || '0'} Years</p>
              </div>
              <div className="space-y-0.5 p-2.5 sm:p-3.5 rounded-lg sm:rounded-xl transition-all hover:bg-white" style={{
                background: 'rgba(253, 242, 248, 0.3)',
                border: '1px solid rgba(210, 138, 140, 0.05)'
              }}>
                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest" style={{ color: '#94a3b8' }}>Team Size</p>
                <p className="font-semibold text-slate-900 text-xs sm:text-[15px]">{vendorState?.businessDetails?.teamSize || '0'} Max</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Strength */}
        <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-8 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full opacity-20" style={{
            background: 'radial-gradient(circle, #D28A8C, transparent 70%)'
          }}></div>
          <div className="relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 sm:mb-4" style={{ color: '#D28A8C' }}>Profile strength</p>
            <div className="flex items-end gap-2 sm:gap-3 mb-3 sm:mb-4">
              <h3 className="text-4xl sm:text-5xl font-bold leading-none bg-clip-text text-transparent" style={{
                backgroundImage: 'linear-gradient(135deg, #D28A8C, #C27A7C, #a855f7)'
              }}>{completion}%</h3>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-0.5 sm:mb-1" style={{ color: '#cbd5e1' }}>COMPLETED</p>
            </div>
            <div className="h-2 sm:h-3 w-full rounded-full overflow-hidden" style={{ background: 'rgba(210, 138, 140, 0.08)' }}>
              <div className="h-full rounded-full" style={{ 
                width: `${completion}%`,
                background: 'linear-gradient(90deg, #D28A8C, #C27A7C, #a855f7)',
                boxShadow: '0 0 15px rgba(210, 138, 140, 0.4)'
              }}></div>
            </div>
            <p className="mt-4 sm:mt-6 text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed">
              Complete your documents and bank details to achieve a 100% verified badge and improve your visibility to customers.
            </p>
          </div>
        </div>
      </div>

      {/* Documents + Bank */}
      <div className="grid gap-4 sm:gap-6 xl:grid-cols-2 pb-6 sm:pb-10">
        <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-8">
          <h3 className="text-base sm:text-xl font-bold text-slate-900 mb-3 sm:mb-6 flex items-center gap-2 sm:gap-3">
            <div className="h-7 w-7 sm:h-9 sm:w-9 rounded-lg sm:rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)'
            }}>
              <Icon name="checkList" size="xs" color="currentColor" />
            </div>
            Documents Status
          </h3>
          <div className="space-y-2.5 sm:space-y-4">
            {[
              { label: 'ID Proof', key: 'idProof' },
              { label: 'GST Certificate', key: 'gst' },
              { label: 'Service Contract', key: 'contract' }
            ].map(doc => (
              <div key={doc.key} className="flex items-center justify-between rounded-xl sm:rounded-2xl p-3 sm:p-4 transition-all hover:scale-[1.01]" style={{
                background: 'rgba(253, 242, 248, 0.3)',
                border: '1px solid rgba(210, 138, 140, 0.06)'
              }}>
                <span className="text-xs sm:text-sm font-bold text-slate-700">{doc.label}</span>
                <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider" style={
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

        <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-8 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full opacity-10" style={{
            background: 'radial-gradient(circle, #a855f7, transparent 70%)'
          }}></div>
          <h3 className="text-base sm:text-xl font-bold text-slate-900 mb-3 sm:mb-6 flex items-center gap-2 sm:gap-3 relative z-10">
            <div className="h-7 w-7 sm:h-9 sm:w-9 rounded-lg sm:rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)'
            }}>
              <Icon name="bank" size="xs" color="currentColor" />
            </div>
            Bank Accounts
          </h3>
          <div className="space-y-3 sm:space-y-5 relative z-10">
            <div className="grid grid-cols-2 gap-y-3 sm:gap-y-5 text-xs sm:text-sm">
              {[
                { label: 'Account Name', value: vendorState?.bank?.accountName || 'Not added' },
                { label: 'Account Number', value: vendorState?.bank?.accountNumber || 'Not added' },
                { label: 'IFSC Code', value: vendorState?.bank?.ifsc || 'Not added' },
                { label: 'UPI ID', value: vendorState?.bank?.upiId || 'Not added', highlight: true }
              ].map(item => (
                <div key={item.label} className="space-y-0.5 sm:space-y-1">
                  <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest" style={{ color: '#94a3b8' }}>{item.label}</p>
                  <p className={`font-bold ${item.highlight ? '' : 'text-slate-800 uppercase'}`} style={item.highlight ? { color: '#D28A8C' } : {}}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3" style={{
              background: 'linear-gradient(135deg, rgba(253,242,248,0.5), rgba(245,243,255,0.5))',
              border: '1px solid rgba(210, 138, 140, 0.08)'
            }}>
              <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold flex-shrink-0" style={{
                background: 'linear-gradient(135deg, #D28A8C, #C27A7C)',
                color: 'white'
              }}>i</div>
              <p className="text-[10px] sm:text-[11px] font-bold leading-snug" style={{ color: '#64748b' }}>Payments are processed within 48 hours of booking completion.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;
