const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const isAuthenticated = require('../middleware/auth');  

router.get('/', isAuthenticated, async (req, res) => {
    try {
        const portfolios = await Portfolio.find();
        res.json(portfolios);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', isAuthenticated, async (req, res) => {
    const { title, description, images } = req.body;
    const portfolio = new Portfolio({
        title,
        description,
        images,
    });

    try {
        const newPortfolio = await portfolio.save();
        res.status(201).json(newPortfolio);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/:id', isAuthenticated, getPortfolio, (req, res) => {
    res.json(res.portfolio);
});

router.put('/:id', isAuthenticated, getPortfolio, async (req, res) => {
    const { title, description, images } = req.body;

    if (title) res.portfolio.title = title;
    if (description) res.portfolio.description = description;
    if (images) res.portfolio.images = images;

    try {
        const updatedPortfolio = await res.portfolio.save();
        res.json(updatedPortfolio);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', isAuthenticated, getPortfolio, async (req, res) => {
    try {
        await res.portfolio.remove();
        res.json({ message: 'Portfolio item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getPortfolio(req, res, next) {
    let portfolio;
    try {
        portfolio = await Portfolio.findById(req.params.id);
        if (portfolio == null) {
            return res.status(404).json({ message: 'Cannot find portfolio item' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.portfolio = portfolio;
    next();
}

module.exports = router;
