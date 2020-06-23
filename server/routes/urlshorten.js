const { Router } = require('express');
const { getUrl, creatShortUrl} = require('../controllers/urlControll');

const router = Router()


  router.route('/:code').get(getUrl);

  router.route('/').post(creatShortUrl);

  module.exports = router;