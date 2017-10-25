const User = require('../models/user'),
      router = require('express').Router(),
      bcrypt = require('bcryptjs'),
      Jobs = require('../models/gitHired.js')

// routes go here
router.post('/search', 
	Jobs.search, 
	(req, res) => {
		const { jobResults } = res.locals;
		res.json( jobResults ); 
	});


module.exports = router;      