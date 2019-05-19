require('dotenv').config();

const server = require('./api/server.js');

const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`\n** server up on port ${port} **\n`));

// let r = Math.random().toString(36).substring(7);
// console.log('random', typeof r);
// console.log(r.length);
