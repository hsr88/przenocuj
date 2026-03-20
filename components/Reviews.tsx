'use client';

import { useState, useEffect, useCallback } from 'react';
import { Star, ThumbsUp, ExternalLink, MessageSquare } from 'lucide-react';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import { Place } from '@/types';
import { Review, fetchReviews, addReview, getExternalReviewLinks, calculatePlaceRating } from '@/lib/reviews-api';

interface ReviewsProps {
  place: Place;
}

export function Reviews({ place }: ReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState('');
  const [newAuthor, setNewAuthor] = useState('');

  const loadReviews = useCallback(async () => {
    setLoading(true);
    const data = await fetchReviews(place.id);
    setReviews(data);
    setLoading(false);
  }, [place.id]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const handleSubmit = async () => {
    if (!newAuthor.trim()) return;
    
    await addReview(place.id, newRating, newText, newAuthor);
    await loadReviews();
    setShowAddModal(false);
    setNewText('');
    setNewAuthor('');
    setNewRating(5);
  };

  const { rating, source, count } = calculatePlaceRating(place, reviews);
  const externalLinks = getExternalReviewLinks(place);

  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      {/* Rating summary */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Star className="text-amber-400" size={20} fill="currentColor" />
          {count > 0 ? (
            <>
              <span className="font-bold text-lg">{rating}</span>
              <span className="text-gray-500 text-sm">/5 ({count} {source})</span>
            </>
          ) : (
            <span className="text-gray-500 text-sm">Brak opinii</span>
          )}
        </div>
        
        <Button size="sm" onClick={() => setShowAddModal(true)}>
          <MessageSquare size={14} className="mr-1" />
          Dodaj opinię
        </Button>
      </div>

      {/* Reviews list */}
      {loading ? (
        <p className="text-sm text-gray-400">Ładowanie...</p>
      ) : reviews.length > 0 ? (
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {reviews.slice(0, 3).map((review) => (
            <div key={review.id} className="bg-gray-50 rounded-lg p-2 text-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">{review.author}</span>
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-amber-400" fill="currentColor" />
                  <span>{review.rating}</span>
                </div>
              </div>
              <p className="text-gray-600">{review.text}</p>
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                <span>{new Date(review.createdAt).toLocaleDateString('pl-PL')}</span>
                <button className="flex items-center gap-1 hover:text-forest-600">
                  <ThumbsUp size={12} />
                  {review.helpful}
                </button>
              </div>
            </div>
          ))}
          {reviews.length > 3 && (
            <p className="text-xs text-center text-gray-400">
              +{reviews.length - 3} więcej opinii
            </p>
          )}
        </div>
      ) : (
        <p className="text-sm text-gray-400 italic mb-3">
          To miejsce nie ma jeszcze opinii. Bądź pierwszy!
        </p>
      )}

      {/* External links */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-500 mb-2">Zobacz też:</p>
        <div className="flex flex-wrap gap-2">
          {externalLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded flex items-center gap-1"
            >
              {link.name}
              <ExternalLink size={10} />
            </a>
          ))}
        </div>
      </div>

      {/* Add review modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Dodaj opinię"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Twoja ocena</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setNewRating(star)}
                  className="p-1"
                >
                  <Star
                    size={24}
                    className={star <= newRating ? 'text-amber-400' : 'text-gray-300'}
                    fill={star <= newRating ? 'currentColor' : 'none'}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Twoje imię/pseudonim</label>
            <input
              type="text"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
              placeholder="np. VanLifeKing"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Opinia</label>
            <textarea
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
              placeholder="Jak było? Co Ci się podobało/nie podobało?"
            />
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowAddModal(false)} className="flex-1">
              Anuluj
            </Button>
            <Button onClick={handleSubmit} disabled={!newAuthor.trim()} className="flex-1">
              Dodaj opinię
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
