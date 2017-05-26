var express = require("express");
var app = express();

var router = express.Router();
var mongoose = require("mongoose");
var User = require("./user");
var bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/techminds",function(){
	console.log("Successfully connected to database !!!")
})

router.get("/users", function(request, response){
	User.getCustomers(function(err, customerData){
		if(err){
			throw err;
		}
		response.json(customerData);
	
	})
});
router.post("/user", function(request,response){
	var customerObj = request.body;
	User.createCustomer(customerObj, function(err, data){
		if(err){
			throw err;
		}
		response.json(data);
	})
})
app.use("/api", router)
var PORT = process.env.PORT || 4038;
app.listen(PORT,function(){
	console.log("Server Listening to PORT"+ PORT)
})