const router = require('express').Router();

// Middleware
const { verifyIdToken } = require('../middleware/auth');

// Controllers
const containerController = require('../controllers/container.controller');


router.post('/add-container', containerController.AddContainer);
router.get('/get-containers', containerController.GetContainers);




module.exports = router