exports.home = function (req,res)
{
		console.log("checkout page details:");
		console.log(req.session.cartqty);
		console.log(req.session.checkoutAmount);

		if(req.session.checkoutAmount!=null){


		res.render('checkout',{data:null,"username":req.session.username,"itemsincart":req.session.cartitems,"orderedquantities":req.session.cartqty,"cost":req.session.checkoutAmount});
	}	

	   else
	   	res.render('ads',{"username":req.session.username,"message":"Please order atleast one item"});


};

exports.getCart = function (req,res)
{



		res.json({"itemsincart":req.session.cartitems,"orderedquantities":req.session.cartqty,"cost":req.session.checkoutAmount});

}