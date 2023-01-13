const { Pool } = require('pg');

const PG_URI =
  'postgres://iivmthrj:CaOXq-3wenoRoE-6aWaN_UyWgRODn9qX@batyr.db.elephantsql.com/iivmthrj';

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    // console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
