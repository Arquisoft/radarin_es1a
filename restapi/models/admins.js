const mongoose = require("mongoose");

const schema = mongoose.Schema({
    solidId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Admin", schema);