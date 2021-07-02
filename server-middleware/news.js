const app = require('express')()
const bodyParser = require('body-parser')
const request = require('request');

app.use(bodyParser.json());

app.post('/getArticles', (req, res) => {
  const reqBody = req.body;
  // res.send();
  request(`https://newsapi.org/v2/everything?q=${reqBody.searchText}&from=${reqBody.from}&to=${reqBody.to}&sortBy=popularity&apiKey=28ffa31431614b7aa2cb9a828c4740c3`, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    }
  });
})

module.exports = app