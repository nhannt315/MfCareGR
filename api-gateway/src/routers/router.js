var express = require('express');
var router = express.Router();
var articleRouter = require('./articleService');
var diseaseMedicineRouter = require('./diseaseMedicineService');
var sharedService = require('./sharedService');
var authService = require('./authService');
var threadService = require('./threadService');
var tagService = require('./tagService');
var searchService = require('./searchService');
var doctorService = require('./doctorService');

router.use((req, res, next) => {
  console.log('Called: ', req.path);
  next();
});

router.use(articleRouter);
router.use(diseaseMedicineRouter);
router.use(sharedService);
router.use(authService);
router.use(threadService);
router.use(tagService);
router.use(searchService);
router.use(doctorService);

module.exports = router;
