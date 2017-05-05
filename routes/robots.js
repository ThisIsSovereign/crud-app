var express = require('express');
var router = express.Router();

var myRobots = [
  {"_id":"123abc", "name":"r2d2", "description":"holds a secret message", "in_stock":100},
  {"_id":"456def", "name":"bb8", "description":"rolls around", "in_stock":75},
  {"_id":"789xyz", "name":"c3po", "description":"specializes in language translation", "in_stock":50}
] // static hard-coded data (for example)

/* List Robots */

router.get('/robots', function(req, res, next) {
  console.log("LISTING ROBOTS", myRobots)
  res.render('robots/index', {robots: myRobots, title: "All Robots"});
});

/* Show Robot */

router.get('/robots/:id', function(req, res, next) {
  var robotId = req.params.id;
  var robot = myRobots.find(function(robot){ return robot._id == robotId })

  if (robot) {
    console.log("SHOWING ROBOT", robot)
    res.render('robots/show', {robot: robot, title: `Robot ${robotId}`});
  } else {
    var errorMessage = `OOPS - COULDN'T FIND ROBOT ${robotId}`
    console.log(errorMessage)
    res.send(errorMessage)
  }
});

module.exports = router;
