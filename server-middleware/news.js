const app = require('express')()
const bodyParser = require('body-parser')
const request = require('request');

app.use(bodyParser.json());

app.post('/getArticles', (req, res) => {
  const reqBody = req.body;
  request(`https://newsapi.org/v2/everything?q=${reqBody.searchText}&from=${reqBody.from}&to=${reqBody.to}&sortBy=popularity&apiKey=${process.env.NUXT_ENV_NEWS_API_KEY}`, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    }
  });
})

module.exports = app