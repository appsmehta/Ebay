
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , login = require('./routes/login')
  , register = require('./routes/register')
  ,session = require('client-sessions')
  ,aboutM = require('./routes/about')
  ,adM = require('./routes/adM')
  ,checkout = require('./routes/checkout'),
  processCard = require('./routes/processCard');

var app = express();

// all environments
app.use(session({   
	  
	cookieName:'session',    
	secret: 'mystring',    
	duration: 30 * 60 * 1000,    //setting the time for active session
	activeDuration: 5 * 60 * 1000,  }));
app.set('port', process.env.PORT || 3050);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.disable('etag');

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/signIn', login.signIn);
app.get('/Register', login.signIn);
app.post('/Register',register.signup);
app.post('/checklogin',register.authenticate);
app.get('/about',aboutM.about);
app.get('/logout',register.logout);
app.get('/aboutProfile',aboutM.getProfile);
app.post('/updateAbout',aboutM.updateProfile);
app.get('/ads',adM.ad);
app.get('/getAds',adM.getAds);
app.post('/postAd',adM.postAd);
app.post('/addItem',adM.addtoCart);
app.get('/checkout',checkout.home);
app.get('/getCart',checkout.getCart);
app.post('/processCard',processCard.validate);
app.post('/removeItem',adM.removeFromCart);
app.get('/sell',adM.sellHome);
app.post('/postAuction',adM.postAuction);
app.get('/getAuctions',adM.getAuctions);
app.get('/getBoughtItems',aboutM.getBoughtItems);
app.get('/getSoldItems',aboutM.getSoldItems);
app.post('/registerBid',adM.registerBid);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
