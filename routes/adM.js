var ejs = require('ejs');
var mysql = require('./mysql');
require("client-sessions");
var dateFormat = require('dateformat');
var now = "2016-10-13T10:48:31.000Z";

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

exports.getAuctions = function(req,res){


		console.log("Trying dateformat");

			console.log(dateFormat(now, "fullDate"));



		if(req.session.username!=undefined)
		{

				var getAuctionquery = "select * from auctions where status='in-progress' AND expires >= NOW()";
				console.log("Query is:"+getAuctionquery);

				mysql.fetchData(function(err,results){
				if(err){
					throw err;
					}
				else 
				{
					if(results.length > 0){

					console.log(results[0]);

					res.json({'auctions':results});
						}
			 		else {
			 			 }

				}

				},getAuctionquery);


		}

		else {

			res.json({"logged-in":"false"})
		}




}


exports.postAd = function (req,res) {


	//if(req.session.username!=undefined)
		{
			console.log(req.body.item_quantity);


				var postAdquery = "insert into advertisements (`item_name`, `item_description`, `seller_name`, `item_price`, `item_quantity`) values ('"+req.body.item_name+"','"+req.body.item_description+"','"+req.session.username+"','"+req.body.item_price+"','"+req.body.item_quantity+"');";
				console.log("Query is:"+postAdquery);

				mysql.storeData(function(err,results){
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


exports.postAuction = function(req,res) {


	var expirydate = new Date();
	expirydate.setDate(expirydate.getDate() + 4);
	console.log(expirydate);
	expirydate=dateFormat(expirydate,"yyyy-mm-dd HH:MM:ss");
	console.log("expires:"+expirydate);

	var postAuctionQuery = "insert into auctions(`item_name`, `item_description`, `seller_name`, `item_price`,`status`,`expires`) values ('"+req.body.item_name+"','"+req.body.item_description+"','"+req.session.username+"','"+req.body.item_price+"','in-progress','"+expirydate+"');";
	console.log("Query is:"+postAuctionQuery);

	//INSERT INTO `ebay_schema`.`auctions` (`item_name`, `item_description`, `seller_name`, `item_price`, `status`) VALUES ('Auction1', 'Item2', 'apoorvmehta@sjsu.edu', '200', 'in-progress');

	mysql.storeData(function(err,results){
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

				},postAuctionQuery);



}





exports.addtoCart = function(req,res){

req.session.cartitems.push(req.body.product);
req.session.cartqty.push(req.body.quantity);
//console.log("cost for :"+req.body.product.item_name+" is:"+(req.body.product.item_price*req.body.quantity));
req.session.checkoutAmount = req.session.checkoutAmount + (req.body.product.item_price*req.body.quantity)
//console.log(req.body.product+"ordered quantity"+req.body.quantity);
	//console.log(req.session.cartitems);
	res.json({statusCode:200,"itemsincart":req.session.cartitems,"orderedquantities":req.session.cartqty});


}

exports.removeFromCart = function(req,res){

	console.log("remove cart called");
	console.log(req.body.product+" and quantity"+req.body.qty);
	console.log(req.session.cartitems[req.body.product]);

	console.log("removing");

	req.session.cartitems.splice(req.body.product,1);
	req.session.cartqty.splice(req.body.product,1);
	req.session.checkoutAmount = req.session.checkoutAmount - (req.body.product.item_price*req.body.qty)
	console.log("new items in cart:");
	console.log(req.session.cartitems);
	res.json({statusCode:200,"itemsincart":req.session.cartitems,"orderedquantities":req.session.cartqty})

	//console.log(req.session.cartitems);

	/*function checkProduct(element){

		console.log(element);

		return true;*/
		//return element==req.body.product;
		

//	var position = req.session.cartitems.findIndex(checkProduct);

	//req.session.cartitems.findIndex(checkProduct);

	//console.log(position);



}



exports.sellHome = function(req,res){

	if(req.session.username!=undefined)
	{
		res.render("sell",{"username":req.session.username});
	}

	else

	{
		res.redirect('/')
	}

}