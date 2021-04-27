const express = require("express");
const promMid = require("express-prometheus-middleware");
const cors = require("cors");
const mongoose = require("mongoose");
const api = require("./api");
//const logger = require("./monitoring/logging/logger").logger;

function connect() {
    //The MONGO_URI variable is the connection string to MongoDB Atlas (for production). This env variable is created in heroku.
    mongo_uri = "mongodb+srv://aswuser:arquisoft2021.@radarines1a.rxhgw.mongodb.net/radarin?retryWrites=true&w=majority";
    mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        const app = express();


        app.use(promMid({
            metricsPath: "/metrics",
            collectDefaultMetrics: true,
            requestDurationBuckets: [0.1, 0.5, 1, 1.5],
        }));

        app.use(cors());
        app.options("*", cors());
        app.use(express.json());
        app.use("/api", api);


        app.listen(process.env.PORT || 5000, () => {
            //logger.info("Server has started! Using db in " + mongo_uri);
            console.log("Server has started! Using db in " + mongo_uri);
        });
    });
}

// Connect to MongoDB database, the wait is for giving time to mongodb to finish loading
setTimeout(connect, 5000);