// controllers/apiController.js
const axios = require('axios');

// Получение новостей
exports.getNews = async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=239e2c1968804f6da46054cbec03f7ac');
    const news = response.data.articles;
    res.render('news', { news });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error fetching news');
  }
};
