var crypto = require('crypto');
var mysql = require('./mysql');
require('ejs');

exports.signup = function(req, res){


	console.log("inside new signup register");
	//console.log(req);

	var emailId = req.param('inputemail');
	reenteredemail=req.param('inputreenteredemail');
	password=req.param('inputpassword');
	firstName=req.param('inputfirstName');
	lastName=req.param('inputlastName');
   
   console.log(emailId+reenteredemail+password+firstName+lastName);

	var salt = "theSECRETString";
	password = crypto.createHash('sha512').update(password + salt).digest("hex");

	
	console.log(password);

	var getUser="Insert INTO users (`password`, `email`, `firstName`, `lastName`) VALUES ('"+password+"','"+emailId+"','"+firstName+"','"+lastName+"');";
	console.log("Query is:"+getUser);
	
	mysql.storeData(function(err,results){
		if(err){
			throw err;
		}
		else
			{
			 console.log("entered data");
			 console.log(results);
			 
			 res.send("Tamaru Thai Gyu!");
			}
	},getUser);
	
	
}

exports.authenticate= function(req,res){
	console.log("inside signin register");
	
	var username = req.param('username');
	var password = req.param('password');
	
	console.log(username+password);
	
	var salt = "theSECRETString";
	password = crypto.createHash('sha512').update(password + salt).digest("hex");
	
	var checkUser = "select * from users where email='"+username+"' and password ='"+password+"'";
	
	console.log("Query is:"+checkUser);
	mysql.fetchData(function(err,results){
	if(err){
		throw err;
	}
	else 
	{
		if(results.length > 0){
			console.log("valid Login");
			req.session.username = username;
			console.log("Session initialized");
		/*	ejs.renderFile('./views/successLogin.ejs', { data: results } , function(err, result) {
		        // render on success
		        if (!err) {
		            res.end(result);
		        }
		        // render or error
		        else {
		            res.end('An error occurred');
		            console.log(err);
		        }
		    });*/
			json_responses = {"statusCode" : 200,"username":req.session.username};
			res.send(json_responses);
			
			 
		}
		else {    
			
			console.log("Invalid Login");
			/*ejs.renderFile('./views/failLogin.ejs',function(err, result) {
		        // render on success
		        if (!err) {
		            res.end(result);
		        }
		        // render or error
		        else {
		            res.end('An error occurred');
		            console.log(err);
		        }
		    });*/
			res.send("Na thyu !");
		}
		 
		
	}  
},checkUser);

		
}
exports.logout = function(req,res)
	{



		req.session.destroy();
	res.redirect('/');
	}
	
	
	//res.send("SignIN API success");
  //	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  	//res.render('login', { title : 'About'});

  	//res.render("login",{selectedSignIn : "false"});