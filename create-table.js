const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'mysql762.umbler.com',
  port     : 41890,
  user     : 'comerbem',
  password : '19667507a',
  database : 'comerbemdb'
});
 
connection.connect(function(err){
  if(err) return console.log(err);
  console.log('conectou!');
  createTable(connection);
})

function addRows(conn){
  const sql = "INSERT INTO RESTAURANTES(NOME,LOCALIZACAO) VALUES ?";
  const values = [
        ['teste1', '12345678901'],
        ['teste1', '09876543210'],
        ['teste3', '12312312399']
      ];
  conn.query(sql, [values], function (error, results, fields){
          if(error) return console.log(error);
          console.log('adicionou registros!');
          conn.end();//fecha a conexão
      });
}

function createTable(conn){

      const sql = "CREATE TABLE IF NOT EXISTS RESTAURANTES (\n"+
                  "ID int NOT NULL AUTO_INCREMENT,\n"+
                  "NOME varchar(150) NOT NULL,\n"+
                  "LOCALIZACAO VARCHAR(300) NOT NULL,\n"+
                  "PRIMARY KEY (ID)\n"+
                  ");";
      
      conn.query(sql, function (error, results, fields){
          if(error) return console.log(error);
          console.log('criou a tabela!');
          // addRows(conn);
      });
}