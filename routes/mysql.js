var ejs= require('ejs');
var mysql = require('mysql');

//Put your mysql configuration settings - user, password, database and port
function getConnection(){
	var connection = mysql.createConnection({
	    host     : 'localhost',
	    user     : 'apoorv',
	    password : 'root1234',
	    database : 'ebay_schema',
	    port	 : 3306
	});
	return connection;
}


function fetchData(callback,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=getConnection();
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}	

function storeData(callback,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=getConnection();
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
	
	
	
}


function updateData(callback,sqlQuery){

	console.log("update Query:"+sqlQuery);

	var connection = getConnection();

	connection.query(sqlQuery,function(err,rows,fields){

				if(err){
					console.log("ERROR: " + err.message);
				}
				else 
				{	// return err or result
					console.log("DB Results:"+rows);
					callback(err, rows);
				}
			});
			console.log("\nConnection closed..");
			connection.end();

	}





exports.storeData=storeData;
exports.fetchData=fetchData;
exports.updateData = updateData;