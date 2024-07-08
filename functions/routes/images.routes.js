const router = require('express').Router();

// Middleware
const { verifyIdToken } = require('../middleware/auth');

// Controllers
const imageController = require('../controllers/image.controller');


router.post('/upload-images',  imageController.uploadImages);
router.get('/get-container-images', imageController.GetContainerImages);




module.exports = router