const mongoose = require("mongoose");


const schema = mongoose.Schema({
    latitud: {
        type: Number,
        required: true
    },
    longitud: {
        type: Number,
        required: true
    },
    solidId: {
        type: String,
        required: true
    },
    userState: {
        type: String,
        require: true
    },
    timeStamp: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("User", schema);