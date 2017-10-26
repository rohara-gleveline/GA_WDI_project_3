const bcrypt = require('bcryptjs'),
    db = require('../db/config'),
    axios = require('axios')

const Jobs = {};
// models go here

Jobs.search = (req, res, next) => {

        // desc/loc can be any string
        // full_time has to be a boolean
        // gitHub jobs search
        const { description, location, full_time } = req.body;

        let type = ''

        if (full_time === true) {
            type = 1;
        } else if (full_time === false) {
            type = 2;
        }

        console.log('type is ', type);

        const jobsData = {
            gitHub: [],
            authentic: []
        }

        let github_job_id,
            created_at,
            title,
            location,
            type,
            description,
            how_to_apply,
            company,
            company_url,
            company_logo,
            github_jobs_url;

        axios.get(`https://jobs.github.com/positions.json?description=${description}&location=${location}&full_time=${full_time}`)
            .then(gitHubjobData => {
                console.log('jobData is ', gitHubjobData.data);
                gitHubjobData.data.forEach(job => {

                })
                res.locals.gitJobResults = { gitJobs: gitHubjobData.data };
            }).catch(err => console.log('error in gitJobs.search ', err));

        // type is full-time (1) or freelance (2)
        // authenticJobs search

        axios.get(`https://authenticjobs.com/api/?api_key=8c6530e3c696987f1717c9859d830942&method=aj.jobs.search&keywords=${description}&location=${location}&type=${type}&format=json`)
            .then(authenticJobData => {
                console.log('authenticJobData is ', authenticJobData.data);
                res.locals.authJobResults = authenticJobData.data;
                next();
            }).catch(err => console.log('error in authJobs.search ', err));

    },

    // adZuna jobs search
    // need to figure out how to do country code
    // axios.get(`https://api.adzuna.com:443/v1/api/jobs/us/search/1?app_id=71f61f30&app_key=d350e2c3df1c3b913be9363df31b23a2&results_per_page=20&what=${description}&where=${location}`)
    // 	.then(adzunaJobData => {
    // 		console.log('adzunaJobData is ', adzunaJobData.data);
    // 		res.locals.adzunaJobResults = adzunaJobData.data;
    // 		next();
    // 	}).catch(err => console.log('error in adzunaJobs.search ', err));

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
    },

    Jobs.findById = (req, res, next) => {
        const { id } = req.params;
        db.one(`SELECT * FROM jobs_data WHERE id = $1`, [id])
            .then(oneJobData => {
                res.locals.oneJobData = oneJobData;
                next();
            })
    },

    Jobs.create = (req, res, next) => {
        const { user_id, github_job_id, created_at, title, location, type, description, how_to_apply, company, company_url, company_logo, github_jobs_url } = req.body;
        db.one(`INSERT INTO jobs_data (user_id, github_job_id, created_at, title, location, type, description, how_to_apply, company, company_url, company_logo, github_jobs_url) 
    	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) returning *`, [user_id, github_job_id, created_at, title, location, type, description, how_to_apply, company, company_url, company_logo, github_jobs_url])
            .then(job => {
                res.locals.job = job;
                next()
            })
            .catch(err => console.log(err));
    },

    Jobs.save = (req, res, next) => {
        // need to add some logic here...
        // const github_job_id = req.body.github_job_id
        // then filter the res.locals.jobResults just for the result with that id
        // then grab all the const's below
        // then add to db just for that one job with that one id 
        const { id, created_at, title, location, type, description, how_to_apply, company, company_url, company_logo, url } = res.locals.jobResults;
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
							VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *`, [id, created_at, title, location, type, description, how_to_apply, company, company_url, company_logo, url]
        )
        next();

    }


module.exports = Jobs;