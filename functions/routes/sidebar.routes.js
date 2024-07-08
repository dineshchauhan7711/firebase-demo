const router = require('express').Router();

// Middleware
const { verifyIdToken } = require('../middleware/auth');

// Controllers
const sidebarController = require('../controllers/sidebar_controller');


router.post('/add-sidebar', sidebarController.AddSidebar);
router.get('/get-sidebars', sidebarController.GetSidebarList);


module.exports = router