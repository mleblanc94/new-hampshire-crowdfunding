const mongoose = require('mongoose');//imports mongoose
const ProjectType = require('../models/ProjectType');//imports ProjectType model
const db = require('../config/connection'); //Database connection
const cleanDB = require('./cleanDB'); // cleanDB function
const projectTypeSeeds = require('./projectTypesData.json');//imports projectType Seeds from ProjectType.json


db.once('open', async () => {
  await cleanDB('ProjectType', 'ProjectTypes');
  await ProjectType.create(projectTypeSeeds);

  console.log('all done!');
  process.exit(0);
});
