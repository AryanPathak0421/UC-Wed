import { useState, useEffect } from 'react';
import Icon from '../../../components/ui/Icon';

const VendorSupport = () => {
  const [ticket, setTicket] = useState({ subject: '', description: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (showSuccess) { document.body.style.overflow = 'hidden'; }
    else { document.body.style.overflow = 'unset'; }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showSuccess]);

  const handleSubmit = () => {
    if (!ticket.subject || !ticket.description) {
      alert('Please fill in both subject and description.');
      return;
    }
    setShowSuccess(true);
    setTicket({ subject: '', description: '' });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-7 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full opacity-15" style={{
          background: 'radial-gradient(circle, #D28A8C, transparent 70%)'
        }}></div>
        <div className="relative z-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#D28A8C' }}>Support</p>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5 sm:mt-1">Vendor help desk</h2>
          <p className="text-xs sm:text-sm font-medium" style={{ color: '#94a3b8' }}>Raise tickets and get dedicated vendor support.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 xl:grid-cols-[1.2fr_1fr]">
        {/* Ticket Form */}
        <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-7">
          <div className="flex items-center gap-2 mb-3 sm:mb-5">
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg sm:rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)'
            }}>
              <Icon name="mail" size="xs" color="#A35E60" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900">Raise a ticket</h3>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <input 
              className="w-full rounded-xl sm:rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3.5 text-sm font-semibold transition-all"
              style={{
                border: '1px solid rgba(210, 138, 140, 0.12)',
                background: 'rgba(253, 242, 248, 0.25)'
              }}
              placeholder="Subject" 
              value={ticket.subject}
              onChange={(e) => setTicket({...ticket, subject: e.target.value})}
            />
            <textarea 
              className="h-24 sm:h-32 w-full rounded-xl sm:rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3.5 text-sm font-semibold transition-all resize-none"
              style={{
                border: '1px solid rgba(210, 138, 140, 0.12)',
                background: 'rgba(253, 242, 248, 0.25)'
              }}
              placeholder="Describe the issue"
              value={ticket.description}
              onChange={(e) => setTicket({...ticket, description: e.target.value})}
            ></textarea>
            <button 
              type="button" 
              className="vendor-cta rounded-xl sm:rounded-2xl px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold w-full sm:w-auto tracking-wide" 
              onClick={handleSubmit}
            >
              Submit ticket
            </button>
          </div>
        </div>

        {/* Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-hidden" style={{
            background: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
          }}>
            <div className="w-full max-w-sm rounded-[1.5rem] p-5 sm:p-8 shadow-2xl text-center" style={{
              background: 'linear-gradient(180deg, #ffffff 0%, #FAF2F2 100%)',
              border: '1px solid rgba(210, 138, 140, 0.1)'
            }}>
              <div className="mx-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full mb-4 sm:mb-6" style={{
                background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)'
              }}>
                <Icon name="checkList" size="lg" color="#A35E60" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1 sm:mb-2">Ticket Submitted!</h3>
              <p className="text-xs sm:text-sm font-medium mb-5 sm:mb-8" style={{ color: '#94a3b8' }}>Our support team will get back to you within 24 hours.</p>
              <button 
                className="vendor-cta w-full rounded-xl sm:rounded-2xl py-3 sm:py-3.5 font-semibold text-sm"
                onClick={() => setShowSuccess(false)}
              >
                Okay, got it
              </button>
            </div>
          </div>
        )}

        {/* FAQ */}
        <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-7">
          <div className="flex items-center gap-2 mb-3 sm:mb-5">
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg sm:rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)'
            }}>
              <Icon name="help" size="xs" color="#A35E60" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900">FAQ</h3>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {[
              'How do I get verified?',
              'How can I edit pricing?',
              'How do payouts work?',
              'How to upload contracts?'
            ].map((q) => (
              <div key={q} className="rounded-xl sm:rounded-2xl p-3 sm:p-4 text-xs sm:text-sm font-medium cursor-pointer transition-all hover:scale-[1.01]" style={{
                background: 'rgba(253, 242, 248, 0.3)',
                border: '1px solid rgba(210, 138, 140, 0.06)',
                color: '#64748b'
              }}>
                {q}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorSupport;
