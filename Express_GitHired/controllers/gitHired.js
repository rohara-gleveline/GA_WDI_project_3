const User = require('../models/user'),

    router = require('express').Router(),
    bcrypt = require('bcryptjs'),
    Jobs = require('../models/gitHired.js');

// get all job data saved in db
router.get('/',
    Jobs.findAll,
    (req, res) => {
        const { jobs } = res.locals
        res.json({ jobs });
    });

// search gitHub jobs & adzuna jobs
router.post('/search',
    Jobs.search,
    Jobs.salary,
    (req, res) => {
        // adzunaJobResults 
        // adzunaJobs: adzunaJobResults
        const { jobsData, salaryData } = res.locals;
        res.json({ "JobsData": jobsData, "salaryData": salaryData });
    });

// route for show one job
router.get('/:jobId',
    Jobs.findById,
    (req, res) => {
        const { oneJobData } = res.locals
        res.json({ oneJobData: oneJobData });
    });

//route to save searched job to database 
router.post('/save',
    Jobs.saveResults,
    (req, res) => {
        // const { savedJobResults } = res.locals;
        // console.log('saved results are ', savedJobResults);
        res.send('results saved to db');
    });

// route to edit job based on jobId
router.post('/:jobId/edit',
    Jobs.update,
    (req, res) => {
        const { editedJobsData } = res.locals
        res.json({ editedJobsData: editedJobsData });
    });

// route to create a new job from scratch (not saved from GitHub jobs)
router.post('/create', 
	Jobs.create, 
	(req, res) => {
    const { newJob } = res.locals;
    res.json({ newJob: newJob });
	});

module.exports = router;
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

router.post('/create',
  Jobs.create,
  (req, res) => {
	   const {job} = res.locals;
	    res.json(job);
});

module.exports = router;

