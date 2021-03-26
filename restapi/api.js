const express = require("express")
const User = require("./models/users")
const router = express.Router()

// Get all users
router.get("/users/lista", async (req, res) => {
    const users = await User.find({}).sort('-_id') //Inverse order
	res.send(users)
})

//register a new user
/*
router.post("/users/add", async (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    //Check if the device is already in the db
    let user = await User.findOne({ email: email })
    if (user)
        res.send({error:"Error: This user is already registered"})
    else{
        user = new User({
            name: name,
            email: email,
        })
        await user.save()
        res.send(user)
    }
    */
    router.post("/users/location", async (req, res) => {
        const solidId= req.body.solidId;
        const latitud = req.body.posicion.latitud;
        const longitud = req.body.posicion.longitud;
     
        let user = await User.findOne({ solidId });
     
        if (user==null){
            user = new User({
                latitud,
                longitud,
                solidId
            });
        }
        await user.save();
         res.send(user); //aqui debe devolver los amigos

     })

module.exports = router