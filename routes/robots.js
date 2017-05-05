var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

// Handle New Robot
router.get('/robots/new', function(req, res, next) { // handle GET requests to the robots/new URL path
  res.render('robots/new', { // render the robots/new.ejs view
    title: "New Robot"
  })
})

// Handle List Robots
router.get('/robots', function(req, res, next) {
  var url = "https://southernct-443-robots-api.herokuapp.com/api/robots"

  fetch(url)
    .then(function(response) {
      response.json()
        .then(function(json){
          console.log("Listing Robots", json)
          res.render('robots/index', {robots: json, title: "All Robots"});
        })
    })
    .catch(function(err){
      console.log("Error:", err)
      res.send({error: `Server Error ${err}`});
    })
});

// Handle Show Robot
router.get('/robots/:id', function(req, res, next) {
  var robotId = req.params.id;
  var errorMessage = `Couldn't find robot ${robotId}`
  var url = `https://southernct-443-robots-api.herokuapp.com/api/robots/${robotId}`

  fetch(url)
    .then(function(response) {
      response.json()
        .then(function(json){
          console.log("SHOWING ROBOT", json)
          res.render('robots/show', {
            robot: json,
            title: `Robot ${robotId}`,
            requestUrl: url
          });
        })
        .catch(function(err){
          console.log("JSON Parse Error", err)
          res.send(errorMessage)
        })
    })
    .catch(function(err){
      console.log(errorMessage)
      res.send(errorMessage)
    })
});

// Handle Edit Robot
router.get('/robots/:id/edit', function(req, res, next) {
  var robotId = req.params.id
  var url = `https://southernct-443-robots-api.herokuapp.com/api/robots/${robotId}`

  fetch(url).then(function(response) {
    response.json().then(function(json){
      console.log("Populating form with robot to be edited", json)
      res.render('robots/edit', {
        robot: json,
        title: `Edit Robot ${robotId}`,
        requestUrl: url,
        requestMethod: "PUT"
      })
    })
  })
})

module.exports = router;
