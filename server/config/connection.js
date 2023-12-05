//imports mongoose
const mongoose = require('mongoose');

//connects to mongodb database 'crowdfunding' - if it doesn't exist, it will create it
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/crowdfunding');

module.exports = mongoose.connection;//exports connection