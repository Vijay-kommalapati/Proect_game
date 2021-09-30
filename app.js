// requiring all the needed modules
const mongoose = require('mongoose');
const express = require('express');
const bodyParser1 = require('body-parser');
const ejs = require('ejs');
const app = express();

// =======================================================================
// connecting to mongoDB database
mongoose.connect("", { useNewUrlParser: true, useUnifiedTopology: true });
// creating schema
const userSchema = mongoose.Schema({
    _id: String,
    password: String,
    level: Number
})
// creating a model named User
const User = mongoose.model("User", userSchema);



app.use(express.static(__dirname + "/public/"));
app.use(bodyParser1.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// ======================================link routing================================
app.get("/", (req, res) => {
    res.render('login', { msg: "" });
})
app.get("/createaccount", (req, res) => {
    res.render('createaccount', { msg: "" });
})
app.get("/game", (req, res) => {
    res.render('game', { name: "", score: "" });
})
// ==================================posts=========================================
// sign in data gets routed here
app.post("/", (req, res) => {
    User.findOne({ _id: req.body.user_id }, function (err, thing) {
        if (thing != null) {
            if (thing.password === req.body.password) {

                res.render("game", { name: thing._id, score: thing.level });
                console.log("succefully logged in");
            } else {

                res.render("login", { msg: "incorrect password try again!" });
            }
        } else {
            res.render("login", { msg: "invalid username" })
        }
    })

})
app.post("/game", (req, res) => {
    if (req.body.name === "") {
        res.redirect("/game");
        console.log(req.body.name);
    }else {
        User.findOne({ _id: req.body.name }, function (err, thing) {
            console.log(thing);
            if (thing.level >= req.body.level) {
                res.render("game", { name: req.body.name, score: thing.level });
            } else {
                User.updateOne({ _id: req.body.name }, { level: req.body.level }, function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("level updated");
                    }
                });
                res.render("game", { name: req.body.name, score: req.body.level });
            }
        })
    }
})
// create new account data post rout
app.post("/createaccount", (req, res) => {
    User.findOne({ _id: req.body.user_id }, function (err, thing) {
        if (thing != null) {
            res.render('createaccount', { msg: "user id already exist try unique id" });
        } else {
            var newentry = new User({
                _id: req.body.user_id,
                password: req.body.password1,
                level: 0
            })
            newentry.save();
            res.redirect("/");
        }
    })
})



var port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}




app.listen(port, () => {
    console.log("listening at 3000");
})

