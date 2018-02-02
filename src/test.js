const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestSchema = new Schema({
    testname: String
});

const Test = mongoose.model('test', TestSchema);

module.exports = Test;