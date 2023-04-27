const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://cadencrowson:228899Cmc@cluster0.1hes4.mongodb.net/?retryWrites=true&w=majority';

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // Update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

MongoClient.connect(url, function(err, client) {
  // handle errors and continue with the application logic
  const db = client.db('click');
  const collection = db.collection('storages');

  // define a route handler for GET requests to '/data'
    app.get('/globaltotal', function(req, res) {
      collection.findOne({}, { _id: 0, value: 1 }, function(err, result) {
        if (err) throw err;
        res.send(result.value.toString());
      });
    });

  // start the server
  app.listen(3000, function() {
    console.log('Server listening on port 3000');
  });
});

