// we don't have the pg dependency downloaded.. diff btwn pg and postgres dependencies??
const { Pool } = require('pg');

// changed PGURI to our elephantSQL database link
const PG_URI = 'postgres://bafpqitj:4FYxU51_p0BpOIRD8OuK88bQFgyaBnD3@stampy.db.elephantsql.com/bafpqitj';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
});

// Adding some notes about the database here will be helpful for future you or other developers.
// Schema for the database can be found below:
// https://github.com/CodesmithLLC/unit-10SB-databases/blob/master/docs/assets/images/schema.png

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database

// don't think any changes need to be made here
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
