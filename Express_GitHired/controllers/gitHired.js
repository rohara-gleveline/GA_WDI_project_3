const User = require('../models/user'),
      router = require('express').Router(),
      bcrypt = require('bcryptjs'),
      Jobs = require('../models/gitHired.js')

  // routes go here
  router.get('/:id',
    Jobs.findById,
    (req, res) => {
        const {oneJobData} = res.locals
        res.json({oneJobData: oneJobData});
    });


module.exports = router;
