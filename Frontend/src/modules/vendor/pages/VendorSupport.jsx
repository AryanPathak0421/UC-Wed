import { useState } from 'react';

const VendorSupport = () => {
  const [ticket, setTicket] = useState({ subject: '', description: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    if (!ticket.subject || !ticket.description) {
      alert('Please fill in both subject and description.');
      return;
    }
    // Simulate API call
    setShowSuccess(true);
    setTicket({ subject: '', description: '' });
  };
  return (
    <div className="space-y-6">
      <div className="vendor-surface rounded-2xl p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Support</p>
        <h2 className="text-2xl font-bold text-slate-900">Vendor help desk</h2>
        <p className="text-sm text-slate-500">Raise tickets and get dedicated vendor support.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <div className="vendor-surface rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-slate-900">Raise a ticket</h3>
          <div className="mt-4 space-y-3">
            <input 
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none transition-all focus:ring-4 focus:ring-emerald-50" 
              placeholder="Subject" 
              value={ticket.subject}
              onChange={(e) => setTicket({...ticket, subject: e.target.value})}
            />
            <textarea 
              className="h-32 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none transition-all focus:ring-4 focus:ring-emerald-50" 
              placeholder="Describe the issue"
              value={ticket.description}
              onChange={(e) => setTicket({...ticket, description: e.target.value})}
            ></textarea>
            <button 
              type="button" 
              className="vendor-cta rounded-xl px-6 py-3 text-sm font-semibold w-full sm:w-auto" 
              onClick={handleSubmit}
            >
              Submit ticket
            </button>
          </div>
        </div>

        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <div className="vendor-surface w-full max-w-sm rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-200 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 mb-6">
                <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Ticket Submitted!</h3>
              <p className="text-sm text-slate-500 mb-8">Out support team will get back to you within 24 hours.</p>
              <button 
                className="vendor-cta w-full rounded-2xl py-3 font-bold"
                onClick={() => setShowSuccess(false)}
              >
                Okay, got it
              </button>
            </div>
          </div>
        )}
        <div className="vendor-surface rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-slate-900">FAQ</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p>How do I get verified?</p>
            <p>How can I edit pricing?</p>
            <p>How do payouts work?</p>
            <p>How to upload contracts?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorSupport;
