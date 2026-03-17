import { useState } from 'react';

const VendorReviews = () => {
  const reviews = [
    { id: 'rev-1', name: 'Meera Kapoor', rating: 5, comment: 'Loved the stage decor and punctual setup.' },
    { id: 'rev-2', name: 'Sahil Jain', rating: 4, comment: 'Great execution, minor delay in floral delivery.' }
  ];

  const [selectedReview, setSelectedReview] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleReplySubmit = () => {
    alert(`Reply sent to ${selectedReview.name}: ${replyText}`);
    setSelectedReview(null);
    setReplyText('');
  };

  return (
    <div className="space-y-6">
      <div className="vendor-surface rounded-2xl p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Reviews</p>
        <h2 className="text-2xl font-bold text-slate-900">Ratings and feedback</h2>
        <p className="text-sm text-slate-500">Respond to reviews and build trust.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="vendor-surface rounded-2xl p-5">
          <p className="text-xs font-semibold text-slate-500">Overall rating</p>
          <h3 className="text-3xl font-bold text-slate-900">4.8</h3>
          <p className="text-xs text-emerald-600">Based on 48 reviews</p>
        </div>
        <div className="vendor-surface rounded-2xl p-5 md:col-span-2">
          <p className="text-xs font-semibold text-slate-500">Rating distribution</p>
          <div className="mt-3 space-y-2">
            {['5', '4', '3'].map((star, index) => (
              <div key={star} className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-500">{star}★</span>
                <div className="h-2 flex-1 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${80 - index * 20}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="vendor-surface rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-slate-900">Latest reviews</h3>
        <div className="mt-4 space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-2xl border border-slate-100 px-4 py-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">{review.name}</p>
                <span className="text-xs font-semibold text-emerald-700">{review.rating}★</span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{review.comment}</p>
              <button 
                type="button" 
                className="mt-3 rounded-xl border border-emerald-200 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors" 
                onClick={() => setSelectedReview(review)}
              >
                Reply
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="vendor-surface w-full max-w-lg rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Reply to Review</h3>
              <button onClick={() => setSelectedReview(null)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 italic text-sm text-slate-600">
                "{selectedReview.comment}"
                <p className="mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">— {selectedReview.name}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Your Response</label>
                <textarea 
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-emerald-500 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-50 h-32"
                  placeholder="Thank the client or address their feedback..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
              </div>

              <button 
                className="vendor-cta w-full rounded-2xl py-4 font-bold text-lg mt-4 disabled:opacity-50"
                disabled={!replyText.trim()}
                onClick={handleReplySubmit}
              >
                Post Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorReviews;
