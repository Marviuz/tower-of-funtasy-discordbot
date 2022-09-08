const { userPulls } = require('../db/database');

exports.insertUserPull = (doc) => userPulls.insert(doc);
