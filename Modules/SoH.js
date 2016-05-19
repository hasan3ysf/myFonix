var sql = require("./sql.js");

module.exports = {
    ML : function (response) {
              var items = sql.query('items', 'SELECT OnHand FROM OITW');
              items.where('itemcode', '=', 'RM-mLLDPE');
              items.and();
              items.where('WhsCode', '=', 'RM');
              sql.exec(function(err, rows) {
              		if (!err)
                    response.write(JSON.stringify(rows.items));
                    response.end();
              });
    },
	
	EVA: function (response) {
              var items = sql.query('items', 'SELECT ItemCode, WhsCode, OnHand FROM OITW');
              items.where('itemcode', '=', 'RM-EVA');
              items.and();
              items.where('WhsCode', '=', 'RM');
              sql.exec(function(err, rows) {
              		if (!err)
                    response.write(JSON.stringify(rows.items));
                    response.end();
              });
    }	
}