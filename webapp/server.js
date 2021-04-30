var express = require("express");
var app = express();
var port =  process.env.PORT || 3000;
const path = require("path");
app.use(express.static("build"));
app.listen(port);

app.get("*" , (req, res) => {
    res.sendFile(path.join(__dirname,"build","index.html")); 
});
