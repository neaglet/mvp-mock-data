const express = require('express');
const fs = require('fs');

// you can pass the parameter in the command line. e.g. node static_server.js 3000
const port = process.env.PORT || 8080;
const app = express();

app.get('/transactions', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  fs.readFile('./Transactions/transactions.json', 'utf-8', function(err, data) {
    res.send(data);
  });
});

app.listen(port, () =>
  console.log('Example app listening on port ' + port + '!'),
);

// transactions.addNewTransaction();
