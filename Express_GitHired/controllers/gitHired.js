const User = require('../models/user'),
      router = require('express').Router(),
      bcrypt = require('bcryptjs'),
      Jobs = require('../models/gitHired.js');

router.get('/',
	Jobs.findAll,
	(req, res) => {
		const {jobs} = res.locals
		res.json({ jobs });
	});

router.get('/:id',
  Jobs.findById,
  (req, res) => {
      const {oneJobData} = res.locals
      res.json({oneJobData: oneJobData});
  });

router.post('/create', Jobs.create, (req, res) => {
	const {job} = res.locals;
	res.json(job);
});

module.exports = router;
