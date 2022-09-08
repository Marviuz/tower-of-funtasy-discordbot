const { userPulls } = require('../db/database');

exports.findUserPulls = (doc) => userPulls.find(doc);
