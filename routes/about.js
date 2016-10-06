/**
 * New node file
 */
var ejs = require('ejs');
var mysql = require('./mysql');
require("client-sessions");

exports.about = function (req,res){
	
	res.render('about',{"username":req.session.username});
	/*res.end;*/
}

exports.getProfile = function (req,res){


	if(req.session.username!=undefined)
	{


		var getUserQuery = "select * from users where email='"+req.session.username+"'";
		console.log("Query is:"+getUserQuery);
		mysql.fetchData(function(err,results){
		if(err){
			throw err;
			}
		else 
		{
			if(results.length > 0){

			console.log(results[0].birthday);

			res.send({"email":results[0].email,"firstName":results[0].firstName,"lastName":results[0].lastName,"birthday":results[0].birthday,"handle":results[0].handle,"contactinfo":results[0].contactinfo,"location":results[0].location})
				}
	 		else {
	 			 }

		}

		},getUserQuery);			
	
	}
}

exports.updateProfile = function (req,res){



	console.log('printing date');
	console.log(req.body.birthday.slice(0,10));

		var updateUserQuery = "update users set firstName='"+req.body.firstName+"', lastName = '"+req.body.lastName+"', handle = '"+req.body.handle+"', birthday = '"+req.body.birthday.slice(0,10)+"',contactinfo='"+req.body.contactinfo+"',location = '"+req.body.location+"' where email='"+req.body.email+"'";

	mysql.updateData(function(err,results){
		if(err){
			throw err;
			}
		else 
		{
			if(results.length > 0){

			console.log(results[0]);

			res.send({"email":results[0].email,"firstName":results[0].firstName,"lastName":results[0].lastName,"birthday":results[0].birthday,"handle":results[0].handle,"contactinfo":results[0].contactinfo,"location":results[0].location})
				}
	 		else {
	 			 }

		}

		},updateUserQuery);





	res.send("ok");

}