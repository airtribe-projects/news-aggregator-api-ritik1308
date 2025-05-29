const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { default: axios } = require('axios');

const getNews = async (req, res, next) => {
    try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
            params: {
                country: 'us',
                apiKey: process.env.NEWS_API_KEYS
            }
        });
        const articles = response.data.articles;
        return res.status(200).send({
            status: 200,
            news: articles // <-- property should be 'news' to match your test
        });
    } catch (err) {
        console.error('Error fetching news:', err.message);
        return res.status(500).send({
            status: 500,
            message: 'Internal server error while fetching news.'
        });
    }
};

module.exports = {
    getNews
};
