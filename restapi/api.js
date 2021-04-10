const express = require("express");
const User = require("./models/users");
const Admin = require("./models/admins");
const router = express.Router();

// Get all users
router.get("/users/lista", async (req, res) => {
    const users = await User.find({}).sort("-_id"); //Inverse order
    res.send(users);
});

router.post("/users/location", async (req, res) => {
    const solidId = req.body.solidId;
    const latitud = req.body.posicion.latitud;
    const longitud = req.body.posicion.longitud;

    let user = await User.findOne({ solidId });

    if (user == null) {
        user = new User({
            latitud,
            longitud,
            solidId
        });
    }
    await user.save();
    res.send(user); //aqui debe devolver los amigos

});

// Get all admins ids.
router.get("/admin/list", async (req, res) => {
    const admins = await Admin.find({});
    res.send(admins);
});

router.post("/admin/add", async (req, res) => {
    const solidId = req.body.solidId;
   
    let admin = await Admin.findOne({ solidId });

    if (admin == null) {
        admin = new Admin({
            solidId
        });
        Admin.insertOne(admin);
    }
    await admin.save();
    res.send(admin); //aqui debe devolver el admin
});


module.exports = router;