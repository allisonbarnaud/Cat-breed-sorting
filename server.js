const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
})

const axios = require('axios');

axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
  .then(response => {
    console.log(response.data.url);
    console.log(response.data.explanation);
  })
  .catch(error => {
    console.log(error);
  });
