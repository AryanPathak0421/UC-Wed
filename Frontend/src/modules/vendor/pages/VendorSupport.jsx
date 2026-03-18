import { useState } from 'react';

const VendorSupport = () => {
  const [ticket, setTicket] = useState({ subject: '', description: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    if (!ticket.subject || !ticket.description) {
      alert('Please fill in both subject and description.');
      return;
    }
    setShowSuccess(true);
    setTicket({ subject: '', description: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="vendor-surface rounded-3xl p-7 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full opacity-15" style={{
          background: 'radial-gradient(circle, #ec4899, transparent 70%)'
        }}></div>
        <div className="relative z-10">
          <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: '#ec4899' }}>Support</p>
          <h2 className="text-2xl font-black text-slate-900 mt-1">Vendor help desk</h2>
          <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>Raise tickets and get dedicated vendor support.</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        {/* Ticket Form */}
        <div className="vendor-surface rounded-3xl p-7">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)'
            }}>
              <span className="text-sm">&#128233;</span>
            </div>
            <h3 className="text-lg font-black text-slate-900">Raise a ticket</h3>
          </div>
          <div className="space-y-4">
            <input 
              className="w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all"
              style={{
                border: '1px solid rgba(236, 72, 153, 0.15)',
                background: 'rgba(253, 242, 248, 0.3)'
              }}
              placeholder="Subject" 
              value={ticket.subject}
              onChange={(e) => setTicket({...ticket, subject: e.target.value})}
            />
            <textarea 
              className="h-32 w-full rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all resize-none"
              style={{
                border: '1px solid rgba(236, 72, 153, 0.15)',
                background: 'rgba(253, 242, 248, 0.3)'
              }}
              placeholder="Describe the issue"
              value={ticket.description}
              onChange={(e) => setTicket({...ticket, description: e.target.value})}
            ></textarea>
            <button 
              type="button" 
              className="vendor-cta rounded-2xl px-6 py-3.5 text-sm font-black w-full sm:w-auto tracking-wide" 
              onClick={handleSubmit}
            >
              Submit ticket
            </button>
          </div>
        </div>

        {/* Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{
            background: 'rgba(15, 23, 42, 0.5)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)'
          }}>
            <div className="w-full max-w-sm rounded-[2rem] p-8 shadow-2xl text-center" style={{
              background: 'linear-gradient(180deg, #ffffff 0%, #fdf2f8 100%)',
              border: '1px solid rgba(236, 72, 153, 0.1)'
            }}>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full mb-6" style={{
                background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)'
              }}>
                <span className="text-3xl">&#10003;</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Ticket Submitted!</h3>
              <p className="text-sm font-medium mb-8" style={{ color: '#94a3b8' }}>Our support team will get back to you within 24 hours.</p>
              <button 
                className="vendor-cta w-full rounded-2xl py-3.5 font-black"
                onClick={() => setShowSuccess(false)}
              >
                Okay, got it
              </button>
            </div>
          </div>
        )}

        {/* FAQ */}
        <div className="vendor-surface rounded-3xl p-7">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)'
            }}>
              <span className="text-sm">&#10068;</span>
            </div>
            <h3 className="text-lg font-black text-slate-900">FAQ</h3>
          </div>
          <div className="space-y-3">
            {[
              'How do I get verified?',
              'How can I edit pricing?',
              'How do payouts work?',
              'How to upload contracts?'
            ].map((q) => (
              <div key={q} className="rounded-2xl p-4 text-sm font-medium cursor-pointer transition-all hover:scale-[1.01]" style={{
                background: 'rgba(253, 242, 248, 0.3)',
                border: '1px solid rgba(236, 72, 153, 0.06)',
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
