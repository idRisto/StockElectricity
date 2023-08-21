const express = require("express");
const fetch = require("node-fetch");

const PORT = process.env.PORT || 3001;

const app = express();

let data = [];

app.get("/latest", async (req, res) => {
  const URL = "https://api.porssisahko.net/v1/latest-prices.json";
  const response = await fetch(URL);
  const price = await response.json();
  res.json( price );
})

app.get("/day/:date?", async (req, res) => {
  if (req.params.date) {
    const URL = "https://www.sahkohinta-api.fi/api/v1/halpa?tunnit=24&tulos=haja&aikaraja=" + req.params.date;
  const response = await fetch(URL);
  const data = await response.json();
  res.json( data );
  }
  else {
    res.json("No access to API");
  }
  
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});