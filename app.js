var express = require("express");
var bodyParser = require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/examportal', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
	console.log("connection succeeded");
})

var app = express()

app.use(bodyParser.json());
app.use('/assets', express.static('assets'))
app.use(bodyParser.urlencoded({
	extended: true
}));

// setting template engine
app.set('view engine','ejs');

app.post('/sign_up', function (req, res) {
	var name = req.body.rname;
	var mob = req.body.rmob;
	var clg = req.body.rclg;
	var city = req.body.rcity;
	var mail = req.body.rmail;
	var psw = req.body.rpsw;

	var data = {
		"name": name,
		"mob": mob,
		"clg": clg,
		"city": city,
		"mail": mail,
		"psw": psw
	}
	db.collection('details').insertOne(data, function (err, collection) {
		if (err) throw err;
		console.log("Record inserted Successfully");
	});
	return res.redirect('index');
});

app.get('/', function (req, res) {
	res.set({
		'Access-control-Allow-Origin': '*'
	});
	return res.redirect('index');
})

// Making Routes for all other pages
app.get("/index", function(req, res){
	res.render('index')
})
app.get("/about", function(req, res){
	res.render('about')
})
app.get("/articles", function(req, res){
	res.render('articles')
})
app.get("/blog", function(req, res){
	res.render('blog')
})
app.get("/clgCalc", function(req, res){
	res.render('clgCalc')
})
app.get("/contact", function(req, res){
	res.render('contact')
})
app.get("/Exam-first", function(req, res){
	res.render('Exam-first')
})
app.get("/Exam-second", function(req, res){
	res.render('Exam-second')
})
app.get("/Exam-model", function(req, res){
	res.render('Exam-model')
})
app.get("/ExamRegForm", function(req, res){
	res.render('ExamRegForm')
})
app.get("/faculties", function(req, res){
	res.render('faculties')
})
app.get("/faqs", function(req, res){
	res.render('faqs')
})
app.get("/features", function(req, res){
	res.render('features')
})
app.get("/FWExam", function(req, res){
	res.render('FWExam')
})
app.get("/gallery", function(req, res){
	res.render('gallery')
})
app.get("/news", function(req, res){
	res.render('news')
})
app.get("/teachers_login", function(req, res){
	res.render('teachers_login')
})
app.get("/terms&conditions", function(req, res){
	res.render('terms&conditions')
})
app.get("/testimonials", function(req, res){
	res.render('testimonials')
})
app.listen(4500);