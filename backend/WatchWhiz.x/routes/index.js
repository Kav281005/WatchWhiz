// routes/index.js
const express = require('express');
const router = express.Router();
const userModel = require("../models/User");
const passport = require('passport');
const localStrategy = require("passport-local");
const fetch = require('node-fetch');

//passport.use(new localStrategy(userModel.authenticate()));
passport.use(userModel.createStrategy());

function isLoggedIn(req, res, next) {
  return req.isAuthenticated() ? next() : res.redirect('/login');
}


router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.get('/register', (req, res) => {
  res.render('register', { error: req.flash('error') });
});

router.post("/register", async (req, res) => {
  try {
    const user = new userModel({ username: req.body.username, email: req.body.email, fullname: req.body.fullname });
    await userModel.register(user, req.body.password);
    req.login(user, err => {
      if (err) throw err;
      return res.redirect("/profile");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/register");
  }
});


  // BACKEND
  router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ success: true, user: { username: req.user.username } });
  });
  
  
  router.post('/login',
    passport.authenticate('local', {
      successRedirect: '/profile',
      failureRedirect: "/login",
      failureFlash: true
    })
  );
  
  router.get("/logout", (req, res, next) => {
    req.logout(err => err ? next(err) : res.redirect("/"));
  });
  

    router.get("/profile", isLoggedIn, (req, res) => {
      res.render("profile", { user: req.user });
    });
    router.post('/add-to-watchlist', isLoggedIn, async (req, res) => {
      const user = await userModel.findByUsername(req.user.username);
      const {imdbID} = req.body;
  if (!user.watchlist.includes(imdbID)) {
    user.watchlist.push(imdbID);
    await user.save();
  }
  res.redirect("/watchlist");
});

router.post('/remove-from-watchlist', isLoggedIn, async (req, res) => {
  const user = await userModel.findByUsername(req.user.username);
  const {imdbID} = req.body;
  user.watchlist = user.watchlist.filter(id => id !== imdbID);
  await user.save();
  res.redirect("/watchlist");
});

router.get('/watchlist', isLoggedIn, async (req, res) => {
  const user = await userModel.findByUsername(req.user.username);
  const apiKey = process.env.OMDB_API_KEY;
  const movies = await Promise.all(
    user.watchlist.map(id =>
      fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
      .then(r => r.json())
    )
  );
  res.render('watchlist', { movies });
});

// router.get('/api/movies/:id', async (req, res) => {
//   const response = await fetch(`https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${req.params.id}`);
//   const data = await response.json();
//   res.json(data.Response === "False" ? { error: data.Error } : data);
// });<-- see this
router.get('/api/movies/:id', async (req, res) => {
  const id = req.params.id;
  const apiUrl = `https://movie-database-imdb-alternative.p.rapidapi.com/?i=${id}&r=json`;
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '2e6ed66fcfmshcac286cede5c40ep16fe73jsn6a4e61d05318',
        'X-RapidAPI-Host':'imdb236.p.rapidapi.com'
      }
    });
    const data = await response.json();
    if (data.Response === 'False') return res.status(404).json({ error: data.Error });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// const username = form.username.value;
// const password = form.password.value;
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ success: true, user: { username: req.user.username } });
});
// In backend (Express route), you'd write:
router.post('/watchlist', isLoggedIn, async (req, res) => {
  const { imdbID } = req.body;
  // Add to user's watchlist logic...
  res.json({ success: true });
});
module.exports = router;

