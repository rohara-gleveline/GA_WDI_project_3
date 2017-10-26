const bcrypt = require('bcryptjs'),
      db = require('../db/config');

const Jobs = {};
	// models go here


Jobs.findAll = (req, res, next) => {
	const user_id = req.user.id;
	db.manyOrNone('SELECT * FROM jobs_data')
	.then((jobs) => {
		res.locals.jobs = jobs;
		console.log('jobs from findAll: ', jobs)
		next();
	})
	.catch(err => {
		console.log(`Error returning all: ${err}`)
	})
};






module.exports = Jobs;      