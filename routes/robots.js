var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

/* List Robots */

router.get('/robots', function(req, res, next) {
  var url = "https://southernct-443-robots-api.herokuapp.com/api/robots"

  fetch(url)
    .then(function(response) {
      response.json()
        .then(function(json){
          console.log("LISTING ROBOTS", json)
          res.render('robots/index', {robots: json, title: "All Robots"});
        })
    })
    .catch(function(err){
      console.log("GOT AN ERROR:", err)
      res.send({error: `OOPS - SERVER ERROR ${err}`});
    })
});

/* Show Robot */

router.get('/robots/:id', function(req, res, next) {
  var robotId = req.params.id;
  var errorMessage = `OOPS - COULDN'T FIND ROBOT ${robotId}`
  var url = `https://southernct-443-robots-api.herokuapp.com/api/robots/${robotId}`

  fetch(url)
    .then(function(response) {
      response.json()
        .then(function(json){
          console.log("SHOWING ROBOT", json)
          res.render('robots/show', {robot: json, title: `Robot ${robotId}`});
        })
        .catch(function(err){
          console.log("JSON PARSE ERROR", err)
          res.send(errorMessage)
        })
    })
    .catch(function(err){
      console.log(errorMessage)
      res.send(errorMessage)
    })
});

module.exports = router;
