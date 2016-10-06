var ejs = require('ejs');
var mysql = require('./mysql');
require("client-sessions");

exports.ad = function(req,res) {

if(req.session.username!=undefined)
{
	res.render("ads",{"username":req.session.username});
}

else

{
	res.redirect('/')
}



}

exports.getAds = function(req,res) {



		if(req.session.username!=undefined)
		{

				var getAdquery = "select * from advertisements";
				console.log("Query is:"+getAdquery);

				mysql.fetchData(function(err,results){
				if(err){
					throw err;
					}
				else 
				{
					if(results.length > 0){

					console.log(results[0]);

					res.json({'ads':results,"itemsincart":req.session.cartitems,"orderedquantities":req.session.cartqty});
						}
			 		else {
			 			 }

				}

				},getAdquery);


		}

		else {

			res.json({"logged-in":"false"})
		}

}

exports.postAd = function (req,res) {


	//if(req.session.username!=undefined)
		{

				var postAdquery = "insert into advertisements (`item_name`, `item_description`, `seller_name`, `item_price`, `item_quantity`) values ('"+req.body.item_name+"','"+req.body.item_description+"','"+req.body.seller_name+"','"+req.body.item_price+"','"+req.body.item_quantity+"');";
				console.log("Query is:"+postAdquery);

				mysql.storedata(function(err,results){
				if(err){
					res.json({"statusCode":500})
					throw err;
					}
				else 
				{
					if(results.length > 0){

					console.log(results[0]);

					res.json({ user: 'tobi' })
					res.end();
						}
			 		else {
			 			 }

				}

				},postAdquery);
		}
}

exports.addtoCart = function(req,res){

req.session.cartitems.push(req.body.product);
req.session.cartqty.push(req.body.quantity);
console.log("cost for :"+req.body.product.item_name+" is:"+(req.body.product.item_price*req.body.quantity));
req.session.checkoutAmount = req.session.checkoutAmount + (req.body.product.item_price*req.body.quantity)
console.log(req.body.product+"ordered quantity"+req.body.quantity);
	console.log(req.session.cartitems);
	res.json({statusCode:200,"itemsincart":req.session.cartitems,"orderedquantities":req.session.cartqty})


}