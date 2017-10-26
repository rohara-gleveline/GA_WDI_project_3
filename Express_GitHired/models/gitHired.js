const bcrypt = require('bcryptjs'),
      db = require('../db/config')

const Jobs = {}
	// models go here


	// models go here
  Jobs.findById = (req,res,next) => {
    const {id} = req.params;
    db.one(`SELECT * FROM jobs_data WHERE id = $1`, [id])
      .then(oneJobData => {
          res.locals.oneJobData = oneJobData;
          next();
      })
  }




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
