const express = require('express')
const app = express()
const port = 3000
const axios = require('axios');

app.set('view engine', 'ejs')

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] = process.env.API_KEY;

const getCatBreeds = () => {
  app.get('/', (req, res) => {
    axios.get('/breeds')
      .then(response => res.render('index', {text: response.data[0].name, image: response.data[0].image.url}))
      .catch(error => console.log(error));
  })
}

// sort the breeds by ranking, add the 3 values (child friendly, stranger friendly, dog friendly) and rank by highest score (top 5)

const sortCatBreedsByScore = () => {
  var catScores = [];
  app.get('/', (req, res) => {
    axios.get('/breeds')
      .then(response => {
        response.data.forEach((cat) => {
          if(cat.image != undefined) {
            var catDetails = [cat.name, (parseInt(cat.child_friendly)+parseInt(cat.stranger_friendly)+parseInt(cat.dog_friendly)), cat.image.url];
            catScores.push(catDetails);
          }
        })
        // sorting the cat score list in descending order
        catScores.sort(function(a, b) {
          return b[1] - a[1];
        })
        // Slicing the top 5 cats 
        var topFiveCats = catScores.slice(0,5);
        console.log(topFiveCats);
        res.render('index', {catList: topFiveCats})
      })
      .catch(error => console.log(error));
  })
}

// getCatBreeds()
sortCatBreedsByScore()

app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
})


  