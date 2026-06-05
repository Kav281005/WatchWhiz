const router = require('express').Router();
const User = require('../models/User');

function isLoggedIn(req, res, next) {
  req.isAuthenticated() ? next() : res.status(401).json({ error: 'Unauthorized' });
}

router.use(isLoggedIn);

// GET /api/watchlist - Returns the stored movie objects directly
router.get('/', async (req, res) => {
  try {
    res.json({ watchlist: req.user.watchlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve watchlist' });
  }
});

// POST /api/watchlist - Adds the full movie object
router.post('/', async (req, res) => {
  try {
    const { movie } = req.body; // Expecting { movie: { imdbID, Title, Poster, Year } }
    
    if (!movie || !movie.imdbID) {
      return res.status(400).json({ error: 'Invalid movie data' });
    }

    // Check if already in watchlist
    const exists = req.user.watchlist.some(m => m.imdbID === movie.imdbID);
    
    if (!exists) {
      req.user.watchlist.push({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Poster: movie.Poster,
        Year: movie.Year
      });
      await req.user.save();
    }

    res.json({ success: true, watchlist: req.user.watchlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add to watchlist' });
  }
});

// DELETE /api/watchlist - Removes by imdbID
router.delete('/', async (req, res) => {
  try {
    const { imdbID } = req.body;
    req.user.watchlist = req.user.watchlist.filter(m => m.imdbID !== imdbID);
    await req.user.save();
    res.json({ success: true, watchlist: req.user.watchlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove from watchlist' });
  }
});

module.exports = router;
