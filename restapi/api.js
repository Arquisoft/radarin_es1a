//const logger = require("./monitoring/logging/logger").logger;

const express = require("express");
const User = require("./models/users");
const Admin = require("./models/admins");
const router = express.Router();

// Get all users
router.get("/users/lista", async (req, res) => {
    // logger.info("Finding users");
    const users = await User.find({}).sort("-_id"); //Inverse order
    res.send(users);
});

router.post("/users/location", async (req, res) => {
    // logger.info("Saving users information");
    const solidId = req.body.solidId;
    const latitud = req.body.posicion.latitud;
    const longitud = req.body.posicion.longitud;
    const userState = req.body.userState;
    const timeStamp = req.body.timeStamp;

    let users = [];
    users = await User.find({ solidId });

    if (users.length == 0 || users == null || users == undefined) {
        var user = new User({
            latitud,
            longitud,
            solidId,
            userState,
            timeStamp
        });
        await user.save();
        res.send(user); //aqui debe devolver los amigos

    } else {
        // Si encuentra mas de un usuario borrar
        if (users.length != 1) {
            for (i = 0; i < users.length - 1; i++) {
                try {
                    await User.findOneAndRemove({ solidId });
                    console.log("borrado" + solidId);
                } catch (error) {
                    console.log("no se encontro " + solidId)
                }
            }
            console.log(solidId);
            await User.findOneAndUpdate(solidId, {
                latitud: latitud,
                longitud: longitud,
                userState: userState,
                timeStamp: timeStamp
            });
        } else {
            console.log(users);
            users[0].latitud = latitud;
            users[0].longitud = longitud;
            users[0].solidId = solidId;
            users[0].userState = userState;
            users[0].timeStamp = timeStamp;
            console.log("actualizado" + users[0])
            await users[0].save();
            res.send(users[0]); //aqui debe devolver los amigos
        }
    }

});

// Deletes the user that has the id send on the body.
router.post("/users/delete", async (req, res) => {
    //logger.info("Deleting users");
    const user = await User.find({ "solidId": req.body.solidId });
    await user[0].remove();
    res.send(true);
});

// Get all admins ids.
router.get("/admin/list", async (req, res) => {
    //logger.info("Getting users");
    const admins = await Admin.find({});
    res.send(admins);
});

router.post("/admin/add", async (req, res) => {
    //logger.info("Adding users information");
    const solidId = req.body.solidId;

    let admin = await Admin.findOne({ solidId });

    if (admin == null) {
        admin = new Admin({
            solidId
        });
    }
    await admin.save();
    res.send(admin); //aqui debe devolver el admin
});



module.exports = router;