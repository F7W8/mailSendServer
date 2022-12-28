const schedule = require("node-schedule");
const mongoose = require("mongoose");
require("dotenv").config();

const MongoURI = process.env.MongoURI;

mongoose.connect(MongoURI);
var db = mongoose.connection;
db.once("open", function () {
    console.log("DB connected");
});
db.on("error", function (err) {
    console.log("DB ERROR : ", err);
});

var mail = require("./db");
var MAIL = mail.mailSchema(mongoose, "planes");

schedule.scheduleJob("1 * * * * *", function () {
    // console.log(new Date() + ' scheduler running!');
    console.log("---------------------------------------");

    mail.showMailData(MAIL);
});
