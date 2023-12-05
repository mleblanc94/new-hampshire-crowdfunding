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

// // Function to seed project types
// const seedProjectTypes = async () => {
//   try {
//     // Clean the existing project types
//     await cleanDB();

//     // Insert new project types
//     const insertedProjectTypes = await ProjectType.insertMany(projectTypeSeeds);

//     console.log('Project types seeded successfully:', insertedProjectTypes);
//   } catch (error) {
//     console.error('Error seeding project types:', error);
//   } finally {
//     // Close the database connection
//     mongoose.connection.close();
//   }
// };

// // Run the seeding function
// seedProjectTypes();
