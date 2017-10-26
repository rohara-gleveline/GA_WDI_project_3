const bcrypt = require('bcryptjs'),
    db = require('../db/config'),
    axios = require('axios')

const Jobs = {};
// models go here

Jobs.search = (req, res, next) => {
	// desc/loc can be any string
        // full_time has to be a boolean
        // gitHub jobs search
        const { jobDescription, jobLocation, type } = req.body;
       	let full_time = true;
        if (type == 1) {
            full_time = true;
        } else if (type == 2) {
            full_time = false;
        }
        // logic for splitting search terms and then joining by , for authentic jobs search
        let keywords = jobDescription.split(' ');
        let joinKeywords = keywords.join(',');

        console.log('joined search terms are ', joinKeywords);
        console.log('full_time is ', full_time);

        const jobsData = [];
        axios.get(`https://jobs.github.com/positions.json?description=${jobDescription}&location=${jobLocation}&full_time=${full_time}`)
            .then(gitHubjobData => {
                // console.log('jobData is ', gitHubjobData.data);
                gitHubjobData.data.forEach(job => {
                		let job_id = job.id;
                		let created_at = job.created_at;
                		let title = job.title;
                		let location = job.location;
                		let type = job.type;
                		let description = job.description;
                		let how_to_apply = job.how_to_apply;
                		let company = job.company;
                		let company_url = job.company_url;
                		let company_logo = job.company_logo;
                		let url = job.url; 
                		jobsData.push({
                				searched_on: "GitHub Jobs",
						            job_id: job_id,
                				created_at: created_at,
                				title: title,
                				location: location,
                				type: type,
                				description: description,
                				how_to_apply : how_to_apply,
                				company: company,
                				company_url: company_url,
                				company_logo: company_logo,
                				url: url,
        							})//end of push
                	}) //end of forEach
             axios.get(`https://authenticjobs.com/api/?api_key=${process.env.AUTHENTIC_JOBS_API_KEY}&method=aj.jobs.search&keywords=${joinKeywords}&location=${jobLocation}&type=${type}&format=json`)
            	.then(authenticJobData => {
            		const jobs = authenticJobData.data.listings.listing;
                console.log('authenticJobData listing length is ', jobs.length);
                jobs.forEach(listing => {
                		let job_id = listing.id;
                		let created_at = listing.post_date;
                		let title = listing.title;
                		let location = listing.company.location.name;
                		let type = listing.type.name;
                		let description = listing.description;
                		let how_to_apply = listing.apply_url;
                		let company = listing.company.name;
                		let company_url = listing.company.url;
                		let company_logo = listing.company.logo;
                		let url = listing.url; 
                		jobsData.push({
                				searched_on: "Authentic Jobs",
						            job_id: job_id,
                				created_at: created_at,
                				title: title,
                				location: location,
                				type: type,
                				description: description,
                				how_to_apply : how_to_apply,
                				company: company,
                				company_url: company_url,
                				company_logo: company_logo,
                				url: url,
        							})
                res.locals.jobsData = jobsData;
            })
            next();
        }).catch(err => console.log('error in authJobs.search ', err)); //end of .then
      }) //end of 1st .then 
				// type is full-time (1) or freelance (2)
        // authenticJobs search
}, //end of Jobs.Search


    // adZuna jobs search
    // need to figure out how to do country code
    axios.get(`https://api.adzuna.com:443/v1/api/jobs/us/search/1?app_id=71f61f30&app_key=d350e2c3df1c3b913be9363df31b23a2&results_per_page=20&what=${description}&where=${location}`)
    	.then(adzunaJobData => {
    		console.log('adzunaJobData is ', adzunaJobData.data);
    		res.locals.adzunaJobResults = adzunaJobData.data;
    		next();
    	}).catch(err => console.log('error in adzunaJobs.search ', err));

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