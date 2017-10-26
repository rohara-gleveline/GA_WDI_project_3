const User = require('../models/user'),
      router = require('express').Router(),
      bcrypt = require('bcryptjs'),
      Jobs = require('../models/gitHired.js');

// get all job data saved in db
router.get('/',
	Jobs.findAll, 
	(req, res) => {
		const {jobs} = res.locals
		res.json({ jobs });
	});

// search gitHub jobs & authentic jobs
router.post('/search', 
	Jobs.search, 
	(req, res) => {
		 // adzunaJobResults 
		 // adzunaJobs: adzunaJobResults
		const { jobsData } = res.locals;
		res.json({ "JobsData": jobsData }); 
	});

//save job to database 
 router.post('/save', 
	Jobs.search, 
	Jobs.save,
	(req, res) => {
		// const { savedJobResults } = res.locals;
		// console.log('saved results are ', savedJobResults);
		res.send('results saved to db'); 
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

