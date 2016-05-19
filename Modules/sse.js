var sql = require("./sql.js");
var Request = require('tedious').Request;

var addElem = (obj, elem)=> [].push.call(obj, elem);
var result = {}, tmpCol = {}, tmpRow = {};
var sqlExecutionAllowed = true;
module.exports = {

      displayStock: function (es) {
		  var dloop = setInterval(function() {
		  if(result.error !== null)
		        if (es) es.send(JSON.stringify(result), {event: 'rmSoH', id: (new Date()).toLocaleTimeString()});
		  if(result.error === null)
		        if (es) es.send('connection ios closed');
	 //         if (es) es.send('ta ta', {event: 'tata', id: (new Date()).toLocaleTimeString()});
	      }, 1000);
      },

      fetchStock: function () {
		 //   request = new Request("SELECT ItemCode, WhsCode, OnHand FROM OITW where itemcode like 'RM%' and WhsCode ='RM';", function(err, rowCount, rows) {
                request = new Request("SELECT ItemCode, WhsCode, OnHand FROM OITW where OnHand > 0 and (WhsCode ='RM' or WhsCode ='FG');", function(err, rowCount, rows) {
			    if (err) {
			    	result = {'error': err};
			    	console.log((new Date()).toLocaleTimeString()+' err : '+err);
			     }
                 if(rows)
                 {  
			         rows.forEach(function(row){
                         tmpCol = {};
					     row.forEach(function(column){
					         var colName = column.metadata.colName;
					         var value = column.value;
					         addElem(tmpCol, {colName: value})
					      });
				     addElem(tmpRow,{'item': tmpCol[0].colName, 'Whs': tmpCol[1].colName, 'Qty': tmpCol[2].colName});
			         });
			       result = tmpRow;
			//   tmpRow={};
                 }
                 sqlExecutionAllowed = true;   // To confirm Data Processing, had been completed, so new SQL execution is allowed.
		   }); 

         if(sqlExecutionAllowed){
            sqlExecutionAllowed = false;    // To prevent the re-run of the SQL execuation before processing its data.
           	tmpRow={};
            sql.execSql(request);
         }        
      }
}
