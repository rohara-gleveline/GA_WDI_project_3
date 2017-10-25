const bcrypt = require('bcryptjs'),
      db = require('../db/config'),
      axios = require('axios')

const Jobs = {}
// models go here

Jobs.search = (req,res,next) => {
	// desc/loc can be any string
	// full_time has to be a boolean
	const { description, location, full_time } = req.body
	axios.get(`https://jobs.github.com/positions.json?description=${description}&location=${location}&full_time=${full_time}`)
	.then(jobData => {
		console.log('jobData is ', jobData.data);
		res.locals.jobResults = jobData.data;
		next();
	}).catch(err => console.log('error in Jobs.search ', err));
}

Jobs.save = (req,res,next) => {
	// need to add some logic here...
	// const github_job_id = req.body.github_job_id
	// then filter the res.locals.jobResults just for the result with that id
	// then grab all the const's below
	// then add to db just for that one job with that one id 
	const {id, created_at, title, location, type, description, how_to_apply, company, company_url, company_logo, url} = res.locals.jobResults;
	db.one(
            `INSERT INTO jobs_data (github_job_id,
																		  created_at,
																		  title,
																		  location,
																		  type,
																		  description,
																		  how_to_apply,
																		  company, 
																		  company_url,
																		  company_logo,
																		  github_jobs_url) 
							VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *`,
            [id, created_at, title, location, type, description, how_to_apply, company, company_url, company_logo, url]
            )
          next(); 

	}


module.exports = Jobs;      