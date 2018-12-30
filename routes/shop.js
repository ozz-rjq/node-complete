const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('<h1>Hello From Express.js</h1>');
});

router.get('**', (req, res, next) => {
  res.send('<h1>You\'ve enetred somu bullsh*t, please try again</h1>');
});

module.exports = router;