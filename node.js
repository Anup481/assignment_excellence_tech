const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'kushwaha',
  database: 'assignment',
});

//create new user
const app = express();
app.post('/users_insert', function (req, res) {
    var postData  = req.body;
    connection.query('INSERT INTO user(firstname,lastname,email,password) values("Anup", "kushwaha","anup@gmail.com","password");', postData, function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });

 //Edit user details
 app.post('/user_detailEdit', function (req, res) {
    var postData  = req.body;
    connection.query('UPDATE address INNER JOIN user ON address.user_id = user.user_id SET address.location = "tura, meghalaya", address.pincode = "794101",user.firstname = "Abc", user.lastname = "Abc", user.email="abc@gmail.com",user.password="abc" WHERE user.firstname = "Abc");', postData, function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });

//list all users details
app.get('/all_user', function(req, res) {
    connection.getConnection(function(err, connection) {
      connection.query('SELECT user.firstname, user.lastname, user.email, user.password, address.location, address.pincode FROM user JOIN address ON address.user_id = user.user_id;', function(error, results, fields) {
        if (error) {
          throw error;
        }
        res.send(results);
        console.log(results);
      });
    });
  });

  //Change password
  app.get('/change_password', function(req, res) {
    connection.getConnection(function(err, connection) {
      connection.query('UPDATE user SET password = "login" WHERE firstname = "Abc" ', function(error, results, fields) {
        if (error) {
          throw error;
        }
        res.send(results);
        console.log(results);
      });
    });
  });

  //Delete user
  app.post('/user_delete', function (req, res) {
    var postData  = req.body;
    connection.query('DELETE FROM user WHERE user_id = 2', postData, function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });

app.listen(4000, () => {
    console.log('Database port mounted at 4000');
  });