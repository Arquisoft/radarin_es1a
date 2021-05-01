const express = require("express");
const User = require("./models/users");
const router = express.Router();

// Get all users
router.get("/users/lista", async (req, res) => {
    const users = await User.find({}).sort("-_id"); //Inverse order
    res.send(users);
});

// Update the user data on MongoDB.
router.post("/users/location", async (req, res) => {
    const solidId = req.body.solidId;
    const latitud = req.body.posicion.latitud;
    const longitud = req.body.posicion.longitud;
    const userState = req.body.userState;
    const timeStamp = req.body.timeStamp;

    let users = [];
    users = await User.find({ solidId });

    if (users.length === 0 || users === null || users === undefined) {
        var user = new User(
            {
                latitud,
                longitud,
                solidId,
                userState,
                timeStamp
            });
        await user.save();
        res.send(user); 

    } else {
        // Si encuentra mas de un usuario  con el mismo id borrar
        if (users.length !== 1) {
            for (var i = 0; i < users.length - 1; i++)
                try {
                    await User.findOneAndRemove({ solidId });
                    console.log("borrado" + solidId);
                } catch (error) {
                    console.log("no se encontro " + solidId);
                }

            await User.findOneAndUpdate(solidId,
                {
                    latitud: latitud,
                    longitud: longitud,
                    userState: userState,
                    timeStamp: timeStamp
                });
        } else {
            users[0].latitud = latitud;
            users[0].longitud = longitud;
            users[0].solidId = solidId;
            users[0].userState = userState;
            users[0].timeStamp = timeStamp;
            await users[0].save();
            res.send(users[0]); 
        }
    }

});

// Deletes the user that has the id send on the body.
router.post("/users/delete", async (req, res) => {
    const user = await User.find({ "solidId": req.body.solidId });
    await user[0].remove();
    res.send(true);
});

module.exports = router;