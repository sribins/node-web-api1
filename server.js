var express = require("express");
var app = express();
var router = express.Router();
var mongoose = require("mongoose");
var Customer = require("./customer");
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect("mongodb://localhost/techminds",function(){
	console.log("Successfully connected to database !!!")
})

/*router.get("/", function(reuest, response){
	response.send({name: "johnGalt"})
})*/
router.get("/customers", function(request, response){
	Customer.getCustomers(function(err, customerData){
		if(err){
			throw err;
		}
		response.json(customerData);
	
	})
});
router.post("/customer", function(request,response){
	var customerObj = request.body;
	Customer.createCustomer(customerObj, function(err, data){
		if(err){
			throw err;
		}
		response.json(data);
	})
})
router.put("/customer/:id", function(request, response){
	var userId = request.params.id;
	var customerObj = request.body;
	Customer.editCustomer (userId,customerObj,function(err, data){
		if(err){

				throw err;
		}
		response.json(data);
	})
})

router.delete("/customer/:id",function(request, response){
	var userId = request.params.id;
	var customerObj = request.body;

	Customer.deleteCustomer(userId,function(err,data){
		if(err){
			throw err;
		}
		response.json(data)
	})
})

router.put("/customer/:id",function(request,response){
	var userId = request.params.id;
	var dataFromPostman = request.body;
	var newObj = {};
	Customer.getCustomerById(userId,function(err,datafromdb){
		if(err){
			throw err;

		}
		console.log(data)
		newObj.data = data
		response.json(data)
	
	console.log(newObj.data)
	console.log(customerObj)
	var bodyObj = {
		name : dataFromPostman.name || datafromdb.name,
		email : dataFromPostman.email || datafromdb.email,
		mobile : dataFromPostman.mobile || datafromdb.mobile,
	}
	Customer.editCustomer(userId,bodyObj,function(err, data){
		if(err){
			throw err;

		}
		response.json(data)
	})
});
})


router.get("/customer/:id",function(request,response){
	var userId = request.params.id;
	Customer.getCustomerById(userId,function(err,data){
		if(err){
			throw err;

		}
		response.json(data)
	})
})


app.use("/api", router)
var PORT = process.env.PORT || 4038;
app.listen(PORT,function(){
	console.log("Server Listening to PORT"+ PORT)
})