const User = require('../models/user'),
      router = require('express').Router(),
      bcrypt = require('bcryptjs'),
      Jobs = require('../models/gitHired.js');



// routes go here


router.get('/',
	Jobs.findAll, 
	(req, res) => {
		const {jobs} = res.locals
		res.json({ jobs });
	});






module.exports = router;      