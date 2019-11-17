var mongojs = require('mongojs');
var exp = require('express');
var app = exp();

var databaseName = "demo";
var db = mongojs(databaseName);

var title = 1;

//FRONT PAGE
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/display.html');
    //__dirname : It will resolve to your project folder.
});


//ADDING TO DATABASE
app.get('/add/:version', function (req, res) {
    res.send("New Note Added: " + req.params.version);
    title += 1;
    db.notes.insert({ "title": title, "message": req.params.version });
});


//SHOWING FROM DATABASE
app.get('/list/', function (req, res) {
    db.notes.find({}).toArray(function (err, resultId) {
        res.send(resultId);
    });
});


//REMOVING FROM DATABASE
app.get('/remove/:version', function (req, res) {
    //res.send(req.params.version);
    var parsed = parseInt(req.params.version)
    db.notes.remove({ "title": parsed }, function (err, resultId) {
        res.send("Deleted");
    });
});


//UPDATE FROM DATABASE
app.get('/update/:title/:msg', function (req, res) {
    //res.send(req.params.version);
    var parsed = parseInt(req.params.title)
    db.notes.update({ "title": parsed }, { $set: { "message": req.params.msg } }, function (err, resultId) {
        res.send("Updated");
    });
});


//REMOVE ALL FROM DATABASE
app.get('/removeAll', function (req, res) {
    //res.send(req.params.version);
    db.notes.remove({}, function (err, resultId) {
        res.send("Deleted All Notes");
    });
});



app.listen(3000);