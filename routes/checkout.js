exports.home = function (req,res)
{
		console.log("checkout page details:");
		console.log(req.session.cartqty);
		console.log(req.session.checkoutAmount);
		res.render('checkout',{"username":req.session.username});



};

exports.getCart = function (req,res)
{


		res.json({"itemsincart":req.session.cartitems,"orderedquantities":req.session.cartqty,"cost":req.session.checkoutAmount});

}