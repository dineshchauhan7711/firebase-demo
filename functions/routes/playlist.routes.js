
const router = require('express').Router();

// Middleware
const { verifyIdToken } = require('../middleware/auth');

// Controllers
const playlistController = require('../controllers/playlist.controller');


router.post('/add-images-to-playlist', playlistController.AddImageToPlaylist);
router.get('/get-playlists', playlistController.GetPlaylists);




module.exports = router