var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

/* GET home page. */
router.get('/:docID', function(req, res, next) {
  res.render('index', {reference: req.params.docID});
});

module.exports = router;
