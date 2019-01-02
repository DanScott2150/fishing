// RIVERS routes

var express     = require("express"),
    router      = express.Router(),
    River       = require("../models/river"),
    middleware  = require("../middleware");

// RIVER SHOW ROUTE
// Individual river page. Gets weather forecast & USGS data via middleware
    router.get("/:id", middleware.findWeather, middleware.usgsData, function(req, res){
    //Lookup River, and populate any Journal Entries associated with it:
        River.findById(req.params.id).populate("journals").exec(function(err, currentRiver){
            if(err){
                console.log(err);
            } else {
                res.render("rivers/show", {
                    river: currentRiver, 
                    weather: res.locals.weatherData, 
                    usgsData: res.locals.usgsData
                });
            }
        });
    });

// RIVER EDIT ROUTE
    router.get("/:id/edit", function(req, res){
        River.findById(req.params.id, function(err, currentRiver){
            if(err){console.log(err)}
            else{
                res.render("rivers/edit", {river: currentRiver});
            }
        });
    });

// RIVER UPDATE ROUTE
    router.put("/:id", function(req, res){
        River.findByIdAndUpdate(req.params.id, req.body.river, function(err, river){
            if(err){
                console.log(err);
                res.redirect("back");
            } else {
                res.redirect("/rivers/" + river._id);    
            }
        });
    });

// RIVER DESTROY ROUTE
    router.delete("/:id", function(req, res){
        River.findByIdAndRemove(req.params.id, function(err){
            if(err){
                console.log(err);
                res.redirect("back");
            } else {
                res.redirect("/");
            }
        });
    });

// RIVER NEW ROUTE
    router.get("/new", function(req, res){
        res.render("rivers/new");
    });

// RIVER CREATE ROUTE
    router.post("/", function(req, res){
        var name = req.body.name,
            lat = req.body.lat,
            lng = req.body.lng,
            location = req.body.location,
            description = req.body.description,
            usgs = req.body.usgs;
    
        var newRiver = {
                name:name, 
                location:location, 
                lat:lat, 
                lng:lng, 
                usgsID:usgs, 
                description: description
            };

        River.create(newRiver, function(err, newlyCreated){
            if(err){console.log(err)} 
            else {
                res.redirect("/");
            }
        });
    });

module.exports = router;