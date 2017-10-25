const bcrypt = require('bcryptjs'),
      db = require('../db/config'),
      axios = require('axios')

const Jobs = {}
// models go here

Jobs.search = (req,res,next) => {
	const { description, location, full_time } = req.body
	axios.get(`https://jobs.github.com/positions.json?description=${description}&location=${location}&full_time=${full_time}`)
	.then(jobData => {
		console.log('jobData is ', jobData.data);
		res.locals.jobResults = jobData.data;
		next();
	}).catch(err => console.log('error in Jobs.search ', err));
}


module.exports = Jobs;      