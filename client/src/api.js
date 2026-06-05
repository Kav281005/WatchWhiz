// client/src/api.js

export async function fetchMovieDetails(id) {
  const res = await fetch(`/api/movies/${id}`, { credentials: 'include' });
  if (!res.ok) throw new Error(`Failed to fetch movie`);
  return res.json();
}

export async function removeFromWatchlist(id) {
  const res = await fetch(`/api/watchlist/remove`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ imdbID: id }),
  });
  if (!res.ok) throw new Error(`Failed to remove movie`);
  return res.json();
}
