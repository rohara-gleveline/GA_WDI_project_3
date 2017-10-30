const pgp = require('pg-promise')({}),

config = process.env.DATABASE_URL || 'postgres://kiara@localhost:5432/gitHired_token_auth'
db = pgp(config);

module.exports = db;
