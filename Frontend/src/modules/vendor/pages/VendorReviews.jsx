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
      {/* Header */}
      <div className="vendor-surface rounded-3xl p-7 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full opacity-15" style={{
          background: 'radial-gradient(circle, #ec4899, transparent 70%)'
        }}></div>
        <div className="relative z-10">
          <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: '#ec4899' }}>Reviews</p>
          <h2 className="text-2xl font-black text-slate-900 mt-1">Ratings and feedback</h2>
          <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>Respond to reviews and build trust.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-3 md:gap-4 md:grid-cols-3">
        <div className="vendor-surface rounded-[24px] md:rounded-3xl p-5 md:p-6 group cursor-default">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#94a3b8' }}>Overall rating</p>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 mt-1 md:mt-2">4.8</h3>
              <p className="text-[10px] md:text-xs font-bold mt-1 md:mt-1.5" style={{ color: '#ec4899' }}>Based on 48 reviews</p>
            </div>
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-xl transition-transform group-hover:scale-110" style={{
              background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)'
            }}>
              <span>&#11088;</span>
            </div>
          </div>
        </div>
        <div className="vendor-surface rounded-[24px] md:rounded-3xl p-5 md:p-6 md:col-span-2">
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider mb-4" style={{ color: '#94a3b8' }}>Rating distribution</p>
          <div className="space-y-3">
            {['5', '4', '3'].map((star, index) => (
              <div key={star} className="flex items-center gap-3">
                <span className="text-xs font-black w-8" style={{ color: '#64748b' }}>{star} <span style={{ color: '#ec4899' }}>&#9733;</span></span>
                <div className="h-2.5 flex-1 rounded-full overflow-hidden" style={{ background: 'rgba(236, 72, 153, 0.08)' }}>
                  <div className="h-full rounded-full transition-all duration-1000" style={{ 
                    width: `${80 - index * 20}%`,
                    background: 'linear-gradient(90deg, #ec4899, #db2777)'
                  }}></div>
                </div>
                <span className="text-xs font-bold w-10 text-right" style={{ color: '#94a3b8' }}>{80 - index * 20}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="vendor-surface rounded-3xl p-7">
        <div className="flex items-center gap-2 mb-5">
          <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{
            background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)'
          }}>
            <span className="text-sm">&#128172;</span>
          </div>
          <h3 className="text-lg font-black text-slate-900">Latest reviews</h3>
        </div>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-2xl p-5 transition-all hover:scale-[1.01]" style={{
              border: '1px solid rgba(236, 72, 153, 0.08)',
              background: 'rgba(253, 242, 248, 0.2)'
            }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full flex items-center justify-center text-sm font-black text-white" style={{
                    background: 'linear-gradient(135deg, #ec4899, #db2777)'
                  }}>{review.name.charAt(0)}</div>
                  <p className="text-sm font-bold text-slate-900">{review.name}</p>
                </div>
                <span className="text-xs font-black px-3 py-1 rounded-full" style={{
                  background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)',
                  color: '#be185d'
                }}>{review.rating} <span>&#9733;</span></span>
              </div>
              <p className="mt-3 text-sm font-medium" style={{ color: '#64748b' }}>{review.comment}</p>
              <button 
                type="button" 
                className="mt-4 rounded-xl px-4 py-2 text-xs font-bold transition-all active:scale-95 hover:scale-105" 
                style={{
                  background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)',
                  border: '1px solid rgba(236, 72, 153, 0.15)',
                  color: '#be185d'
                }}
                onClick={() => setSelectedReview(review)}
              >
                Reply
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Reply Modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{
          background: 'rgba(15, 23, 42, 0.5)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)'
        }}>
          <div className="w-full max-w-lg rounded-[2rem] p-8 shadow-2xl" style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #fdf2f8 100%)',
            border: '1px solid rgba(236, 72, 153, 0.1)'
          }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-slate-900">Reply to Review</h3>
              <button onClick={() => setSelectedReview(null)} className="h-10 w-10 flex items-center justify-center rounded-full text-slate-400 hover:text-rose-500 transition-all" style={{
                background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)'
              }}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl p-4 italic text-sm" style={{
                background: 'linear-gradient(135deg, rgba(253,242,248,0.5), rgba(245,243,255,0.5))',
                border: '1px solid rgba(236, 72, 153, 0.08)',
                color: '#64748b'
              }}>
                &quot;{selectedReview.comment}&quot;
                <p className="mt-2 text-[10px] font-black uppercase tracking-wider not-italic" style={{ color: '#94a3b8' }}>- {selectedReview.name}</p>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Your Response</label>
                <textarea 
                  className="w-full rounded-2xl px-4 py-3 text-sm transition-all outline-none h-32"
                  style={{
                    border: '1px solid rgba(236, 72, 153, 0.15)',
                    background: 'rgba(253, 242, 248, 0.3)'
                  }}
                  placeholder="Thank the client or address their feedback..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
              </div>

              <button 
                className="vendor-cta w-full rounded-2xl py-4 font-black text-lg mt-4 disabled:opacity-50"
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
