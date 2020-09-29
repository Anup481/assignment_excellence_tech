	var http = require("http");
	var express = require('express');
	var app = express();
	var mysql      = require('mysql');
  var bodyParser = require('body-parser');
  
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'kushwaha',
  database : 'assignment'
});
 
 
connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})


app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));