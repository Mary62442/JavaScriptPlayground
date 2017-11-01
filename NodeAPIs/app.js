
let http = require('http');
let express = require('express');
let app = express();
let flowers = require('./data/flowers.json');
let mongoClient =require('mongodb');
let config = require('./mongoconfig');
// the 5 http verbs
// post, get, put, delete, options


let allowCrossDomain = function(req, res, next) {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
   // intercept OPTIONS method
   if ('OPTIONS' == req.method) {
     res.send(200);
   }
   else {
     next();
   }
}


app.use(allowCrossDomain);
app.get('/flowerstatic', (req, res,next)=> {

	// example of url(uniform resource locator) query string
	// http://localhost:3000/?name=diego&email=diego@dmm888.com&phone=0123
	// http://localhost:3000/?color=white&value=%23ffffff
	// http:localhost:3000/?city=London&country=England&weather=bad
	// http:localhost:3000/flower/?flowerName=Rock%20Water
	let qs = req.query;
	let len = Object.keys(qs).length;
	
	if ( len != 1 ){
		res.send('Incorrect number of parameters in query string e.g. /flowers/?flowerName=Rock%20Water');
	}
	if (!qs.hasOwnProperty('flowerName')) {
		res.send('flowerName is missing. The query is incorrect e.g. /flowers/?flowerName=Rock%20Water');
	}
	

	let result = flowers.find((flower) => {
		return flower.Name === qs.flowerName;
	})
	
	res.send(result);
});

app.get('/flower', (req, res,next)=> {

	let qs = req.query;	

	mongoClient.connect(config.mongoConnectionString, (err, db) => {

	db.collection('BachFlowers').findOne({Name:qs.flowerName}, function(err, flower){
	db.close();
	if (err !== null){
		res.send('No flower has been found!');
	}

	res.send(flower);	
	});
	

});
}

);


app.get('/flowers', (req, res, next)=> {	
	mongoClient.connect(config.mongoConnectionString, (err, db) => {
	//assert.equal(null, err);
	db.collection('BachFlowers').find({}).toArray( (err, flowers) => {
		db.close();
		res.send(flowers);});
	});	
});


let server = http.createServer(app).listen(process.env.NODE_PORT || 3000,process.env.NODE_IP || 'localhost', function () {
 console.log('Server express running at. ' + server.address().address +':'+ server.address().port + ' ' );

});