const PINGS_KEY = 'saferoute_pings';
const REVIEWS_KEY = 'saferoute_reviews';

export function getPings() {
  const data = localStorage.getItem(PINGS_KEY);
  return data ? JSON.parse(data) : [];
}

export function savePing(ping) {
  const pings = getPings();
  const newPing = {
    ...ping,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  };
  pings.push(newPing);
  localStorage.setItem(PINGS_KEY, JSON.stringify(pings));
  return newPing;
}

export function deletePing(pingId) {
  let pings = getPings();
  pings = pings.filter(p => p.id !== pingId);
  localStorage.setItem(PINGS_KEY, JSON.stringify(pings));

  // Also delete the review under that ping being deleted
  let reviews = getReviewsAll();
  reviews = reviews.filter(r => r.pingId !== pingId);
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
}

export function getReviews(pingId) {
  const reviews = getReviewsAll();
  return reviews.filter(r => r.pingId === pingId);
}

export function getReviewsAll() {
  const data = localStorage.getItem(REVIEWS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveReview(review) {
  const reviews = getReviewsAll();
  const newReview = {
    ...review,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  };
  reviews.push(newReview);
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  return newReview;
}

export function seedDemoData() {
  const existingPings = getPings();
  if (existingPings.length === 0) {
    const demoPings = [
      {
        id: crypto.randomUUID(),
        latitude: 30.8650,
        longitude: 77.1180,
        category: 'Accident Prone',
        title: 'Dangerous Blind Turn',
        description: 'Sharp blind turn with frequent accidents reported near the campus entrance.',
        severity: 'High',
        createdAt: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        latitude: 30.8630,
        longitude: 77.1190,
        category: 'Poor Lighting',
        title: 'Poorly Lit Path',
        description: 'Very dark area at night, high risk for students walking back.',
        severity: 'Medium',
        createdAt: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        latitude: 30.8645,
        longitude: 77.1160,
        category: 'Road Damage',
        title: 'Deep Pothole',
        description: 'Large pothole on the main approach road.',
        severity: 'Medium',
        createdAt: new Date().toISOString()
      }
    ];

    localStorage.setItem(PINGS_KEY, JSON.stringify(demoPings));
  }
}

export function resetDemoData() {
  localStorage.removeItem(PINGS_KEY);
  localStorage.removeItem(REVIEWS_KEY);
  seedDemoData();
}
