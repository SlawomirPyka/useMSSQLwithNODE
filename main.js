const sql = require("mssql");

const config = {
  user: "sa",
  password: "myPassword",
  server: "LAPTOP-GCV6HQE2\\TESTDATABASE", // (In this case local server) run the Microsoft SQL Server Management Studio and on the top of the tree choose in context menu Properties
  // then in General look for the Name of the DB (and add additional "\" as it's in my case)
  database: "AdventureWorks2017",
  port: 0, // run the SQL Server Configuration Manager nad in the SQL Server Network Configuration -> Network Protocols for MyDataBaseName switch TCP/IP to Enabled
  // then open context menu -> Properties -> IP Address check the port for You server.
  options: {
    encrypt: false // Use this if you're on Windows Azure
  }
};

function getRequestedData() {
  const connection = new sql.ConnectionPool(config);
  connection.connect(function(err) {
    if (err) throw err;
    const request = new sql.Request(connection);
    const value = 8;
    // We will read the data from the AdventureWorks2017 db from Microsoft
    request.query(
      `select * from Person.Person where BusinessEntityID = ${value}`,
      function(err, recordset) {
        if (err) throw err;
        else console.log(recordset);

        connection.close();
      }
    );
  });
}

getRequestedData();
