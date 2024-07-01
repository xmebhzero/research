// Load dotenv config
require('dotenv').config({path: `${process.cwd()}/.env`});

// Make sure the module is in correct order
require('./project');