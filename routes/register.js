var crypto = require('crypto');


exports.signup = function(req, res){


	console.log("inside register");
	console.log(req);

	var emailId = req.param('inputemail');
	reenteredemail=req.param('inputreenteredemail');
	password=req.param('inputpassword');
	firstName=req.param('inputfirstName');
	lastName=req.param('inputlastName');
   
   console.log(emailId+reenteredemail+password+firstName+lastName);

	var salt = "theSECRETString";
	password = crypto.createHash('sha512').update(password + salt).digest("hex");

	console.log(password);


	res.send("Tamaru Thai Gyu!");
	//res.send("SignIN API success");
  //	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  	//res.render('login', { title : 'About'});

  	//res.render("login",{selectedSignIn : "false"});
};