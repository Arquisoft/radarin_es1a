var express = require("express");
var app = express();
var port =  process.env.PORT || 3000;
app.use(express.static("build"));
app.listen(port);
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}
app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'dist', 'index.html'));
});