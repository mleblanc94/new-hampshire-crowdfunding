const mongoose = require('mongoose');
// need the mango url inside ' '
mongoose.connect(process.env.MONGODB_URI || '');

module.exports = mongoose.connection;