const User = require('../models/user'),
      router = require('express').Router(),
      bcrypt = require('bcryptjs'),
      Jobs = require('../models/gitHired.js')

// routes go here



router.post('/create', Jobs.create, (req, res) => {
	const {job} = res.locals;
	res.json(job);
});

module.exports = router;      