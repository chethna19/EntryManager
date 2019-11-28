var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const visitorSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    hostname: {
        type: String
    },
    hostemail: {
        type: String
    },
    hostphone: {
        type: String
    },
    checkintime: {
        type: String
    },
    checkouttime: {
        type: String
    }
});

const Visitor = mongoose.model("visitor", visitorSchema);
exports.Visitor = Visitor;