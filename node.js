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
    connection.query('INSERT INTO user ?', postData, function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });

 //Edit user details
 app.post('/user_detailEdit/:firstname', function (req, res) {
    var postData  = req.param.firstname;
    connection.query('UPDATE address INNER JOIN user ON address.user_id = user.user_id SET address.location = "tura, meghalaya", address.pincode = "794101",user.firstname = "Abc", user.lastname = "Abc", user.email="abc@gmail.com",user.password="abc" WHERE user.firstname = ?);', postData, function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });

//list all users details
app.get('/all_user/:id', function(req, res) {
    var postData  = req.param.id;
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
  app.get('/change_password/:firstname', function(req, res) {
    var postData  = req.param.firstname;
    connection.getConnection(function(err, connection) {
      connection.query('UPDATE user SET password = "login" WHERE firstname = ? ', function(error, results, fields) {
        if (error) {
          throw error;
        }
        res.send(results);
        console.log(results);
      });
    });
  });

  //Delete user
  app.delete('/user_delete/:id', function (req, res) {
    var postData  = req.param.id;
    connection.query('DELETE FROM user WHERE user_id = ?', postData, function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });

app.listen(3000, () => {
    console.log('Database port mounted at 3000');
  });