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

 router.post('/search/save', 
	Jobs.search, 
	Jobs.save,
	(req, res) => {
		// const { savedJobResults } = res.locals;
		// console.log('saved results are ', savedJobResults);
		res.send('results saved to db'); 
	});


module.exports = router;      