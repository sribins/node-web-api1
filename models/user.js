var mongoose = require("mongoose");
var customerSchema = mongoose.Schema({
	name : {
		type: String,
		required: true
	},
	password : {
		type: String,
		required: true
	
	}
});
var Customer = module.exports = mongoose.
model("customer",customerSchema,"user");
module.exports.getCustomers = function(callback){
	return Customer.find(callback)

}

module.exports.createCustomer = function(customerObj, callback){
	return Customer.create(customerObj, callback)

}
