const router = require('express').Router();

const containerRoutes = require('./container.routes');
const sidebarRoutes = require('./sidebar.routes');
const imageRoutes = require('./images.routes');


router.use('/', containerRoutes);
router.use('/', sidebarRoutes);
router.use('/', imageRoutes);


module.exports = router