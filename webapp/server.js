var express = require("express");
var app = express();
var port =  process.env.PORT || 3000;
app.use(express.static("build"));
app.listen(port);

app.get('*' , (req, res) => {
    res.sendFile(path.join(__dirname,'build','index.html')); 
});
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}
