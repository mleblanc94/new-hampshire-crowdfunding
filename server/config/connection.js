const path = require('path');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
}

//imports mongoose
const mongoose = require('mongoose');

//connects to mongodb database 'crowdfunding' - if it doesn't exist, it will create it| added mongoDBURI
const mongoDBUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/crowdfunding';
mongoose.connect(mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose.connection;//exports connection