const bcrypt = require('bcryptjs'),
      db = require('../db/config')

const Jobs = {}
	// models go here


Jobs.findAll = (req, res, next) => {
    const user_id = req.user.id;
    db.manyOrNone('SELECT * FROM jobs_data')
    .then(jobs => {
        res.locals.jobs = jobs;
        console.log('jobs from findAll: ', jobs)
        next();
    })
    .catch(err => {
        console.log(`Error returning all: ${err}`)
    })
};


Jobs.create = (req, res, next) => {
    const {user_id, github_job_id, created_at, title, location, type, description, how_to_apply, company, company_url, company_logo, github_jobs_url} = req.body;
    db.one(`INSERT INTO jobs_data (user_id, github_job_id, created_at, title, location, type, description, how_to_apply, company, company_url, company_logo, github_jobs_url) 
    	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) returning *`,
      [user_id, github_job_id, created_at, title, location, type, description, how_to_apply, company, company_url, company_logo, github_jobs_url]
  	)
      .then(job => {
        res.locals.job = job;
        next()
      })
      .catch(err=>console.log(err));
  }

module.exports = Jobs;      