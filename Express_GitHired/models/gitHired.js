const bcrypt = require('bcryptjs'),
      db = require('../db/config')

const Jobs = {}

	// models go here
  Jobs.findById = (req,res,next) => {
    const {id} = req.params;
    db.one(`SELECT * FROM jobs_data WHERE id = $1`, [id])
      .then(oneJobData => {
          res.locals.oneJobData = oneJobData;
          next();
      })
  }


module.exports = Jobs;
