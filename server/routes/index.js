const { Router } = require('express');
const urlRoutes = require('./urlshorten');

const router = Router();

router.use('/item',urlRoutes);

module.exports = router;