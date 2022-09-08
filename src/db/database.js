const Loki = require('lokijs');

const db = new Loki('tower-of-funtasy.db');
const userPulls = db.addCollection('pulls');

exports.userPulls = userPulls;