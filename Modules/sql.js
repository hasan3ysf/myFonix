/*var Agent = require('sqlagent/sqlserver');

var sql = new Agent({server: '62.149.89.140', database: 'BKMEC_Live', user: 'sa', password: 'sql@123' });

*/
var Connection = require('tedious').Connection;

var config = {
   // database: 'BKMEC_Live',
    userName: 'sa',
    password: 'sql@123',
 //   server: '192.168.10.1',
   server: '62.149.89.140',
    options: {
    	database: 'BKMEC_Live',
        rowCollectionOnRequestCompletion: true,
        rowCollectionOnDone: true
	},
    // If you are on Microsoft Azure, you need this:
    //options: {encrypt: true, database: 'AdventureWorks'}
};
var sql = new Connection(config);
sql.on('connect', function(err) {
// If no error, then good to proceed.
    console.log("Connected at: "+(new Date()).toLocaleTimeString()+' to database: '+config.options.database);
});

sql.on('error', function(err) {
	// ... error handler 
       	console.log((new Date()).toLocaleTimeString()+' : '+err);
});


/*

var sql = require('mssql');
 
var config = {
    user: 'sa',
    password: 'sql@123',
    server: '192.168.10.1', // You can use 'localhost\\instance' to connect to named instance 
    database: 'BKMEC_Live',
 
 //   options: {
 //       encrypt: true // Use this if you're on Windows Azure 
 //   }
}
*/

module.exports = sql;
