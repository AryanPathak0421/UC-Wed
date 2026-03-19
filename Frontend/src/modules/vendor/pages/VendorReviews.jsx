import { useState, useEffect } from 'react';
import Icon from '../../../components/ui/Icon';

const VendorReviews = () => {
  const reviews = [
    { id: 'rev-1', name: 'Meera Kapoor', rating: 5, comment: 'Loved the stage decor and punctual setup.' },
    { id: 'rev-2', name: 'Sahil Jain', rating: 4, comment: 'Great execution, minor delay in floral delivery.' }
  ];

  const [selectedReview, setSelectedReview] = useState(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    if (selectedReview) { document.body.style.overflow = 'hidden'; }
    else { document.body.style.overflow = 'unset'; }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedReview]);

  const handleReplySubmit = () => {
    alert(`Reply sent to ${selectedReview.name}: ${replyText}`);
    setSelectedReview(null);
    setReplyText('');
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-7 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full opacity-15" style={{
          background: 'radial-gradient(circle, #D28A8C, transparent 70%)'
        }}></div>
        <div className="relative z-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#D28A8C' }}>Reviews</p>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5 sm:mt-1">Ratings and feedback</h2>
          <p className="text-xs sm:text-sm font-medium" style={{ color: '#94a3b8' }}>Respond to reviews and build trust.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-2.5 sm:gap-4 md:grid-cols-3">
        <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-6 group cursor-default">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider" style={{ color: '#94a3b8' }}>Overall rating</p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mt-0.5 sm:mt-2">4.8</h3>
              <p className="text-[9px] sm:text-[10px] md:text-xs font-semibold mt-0.5 sm:mt-1.5" style={{ color: '#D28A8C' }}>Based on 48 reviews</p>
            </div>
            <div className="h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110" style={{
              background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)'
            }}>
              <Icon name="star" size="sm" color="#A35E60" />
            </div>
          </div>
        </div>
        <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:col-span-2">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-4" style={{ color: '#94a3b8' }}>Rating distribution</p>
          <div className="space-y-2 sm:space-y-3">
            {['5', '4', '3'].map((star, index) => (
              <div key={star} className="flex items-center gap-2 sm:gap-3">
                <span className="text-[11px] sm:text-xs font-semibold w-7 sm:w-8" style={{ color: '#64748b' }}>{star} <span style={{ color: '#D28A8C' }}>★</span></span>
                <div className="h-2 sm:h-2.5 flex-1 rounded-full overflow-hidden" style={{ background: 'rgba(210, 138, 140, 0.08)' }}>
                  <div className="h-full rounded-full transition-all duration-1000" style={{ 
                    width: `${80 - index * 20}%`,
                    background: 'linear-gradient(90deg, #D28A8C, #C27A7C)'
                  }}></div>
                </div>
                <span className="text-[11px] sm:text-xs font-semibold w-8 sm:w-10 text-right" style={{ color: '#94a3b8' }}>{80 - index * 20}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="vendor-surface rounded-2xl sm:rounded-3xl p-4 sm:p-7">
        <div className="flex items-center gap-2 mb-3 sm:mb-5">
          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg sm:rounded-xl flex items-center justify-center" style={{
            background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)'
          }}>
            <Icon name="chat" size="xs" color="#A35E60" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">Latest reviews</h3>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-xl sm:rounded-2xl p-3.5 sm:p-5 transition-all hover:scale-[1.01]" style={{
              border: '1px solid rgba(210, 138, 140, 0.08)',
              background: 'rgba(253, 242, 248, 0.2)'
            }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold text-white" style={{
                    background: 'linear-gradient(135deg, #D28A8C, #C27A7C)'
                  }}>{review.name.charAt(0)}</div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900">{review.name}</p>
                </div>
                <span className="text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full" style={{
                  background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)',
                  color: '#A35E60'
                }}>{review.rating} <span>★</span></span>
              </div>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm font-medium" style={{ color: '#64748b' }}>{review.comment}</p>
              <button 
                type="button" 
                className="mt-3 sm:mt-4 rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold transition-all active:scale-95 hover:scale-105" 
                style={{
                  background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)',
                  border: '1px solid rgba(210, 138, 140, 0.15)',
                  color: '#A35E60'
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-hidden" style={{
          background: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }}>
          <div className="w-full max-w-lg rounded-[1.5rem] p-4 sm:p-6 shadow-2xl" style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #FAF2F2 100%)',
            border: '1px solid rgba(210, 138, 140, 0.1)'
          }}>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900">Reply to Review</h3>
              <button onClick={() => setSelectedReview(null)} className="h-8 w-8 flex items-center justify-center rounded-full text-slate-400 hover:text-rose-500 transition-all" style={{
                background: 'linear-gradient(135deg, #FAF2F2, #F4DFDF)'
              }}>
                <Icon name="close" size="xs" color="current" />
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="rounded-xl sm:rounded-2xl p-3 sm:p-4 italic text-xs sm:text-sm" style={{
                background: 'linear-gradient(135deg, rgba(253,242,248,0.5), rgba(245,243,255,0.5))',
                border: '1px solid rgba(210, 138, 140, 0.08)',
                color: '#64748b'
              }}>
                &quot;{selectedReview.comment}&quot;
                <p className="mt-1.5 sm:mt-2 text-[10px] font-semibold uppercase tracking-wider not-italic" style={{ color: '#94a3b8' }}>- {selectedReview.name}</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Your Response</label>
                <textarea 
                  className="w-full rounded-xl sm:rounded-2xl px-4 py-3 text-sm transition-all outline-none h-24 sm:h-32"
                  style={{
                    border: '1px solid rgba(210, 138, 140, 0.12)',
                    background: 'rgba(253, 242, 248, 0.25)'
                  }}
                  placeholder="Thank the client or address their feedback..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
              </div>

              <button 
                className="vendor-cta w-full rounded-xl py-3.5 font-semibold text-sm sm:text-base mt-2 disabled:opacity-50"
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
