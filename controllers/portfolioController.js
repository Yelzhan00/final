const PortfolioItem = require('../models/PortfolioItem');
const path = require('path');
const fs = require('fs');

// Функция для отображения портфолио
exports.getPortfolio = async (req, res) => {
  try {
    const portfolioItems = await PortfolioItem.find();
    res.render('portfolio', { portfolioItems });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Функция для добавления нового элемента в портфолио
exports.addPortfolioItem = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send('Permission denied');
  }

  const { title, description } = req.body;
  const image1 = req.files.image1;
  const image2 = req.files.image2;
  const image3 = req.files.image3;

  const image1Path = path.join(__dirname, '../public/uploads', image1.name);
  const image2Path = path.join(__dirname, '../public/uploads', image2.name);
  const image3Path = path.join(__dirname, '../public/uploads', image3.name);

  image1.mv(image1Path, (err) => {
    if (err) return res.status(500).send(err);
  });
  image2.mv(image2Path, (err) => {
    if (err) return res.status(500).send(err);
  });
  image3.mv(image3Path, (err) => {
    if (err) return res.status(500).send(err);
  });

  try {
    const newItem = new PortfolioItem({
      title,
      description,
      image1: `/uploads/${image1.name}`,
      image2: `/uploads/${image2.name}`,
      image3: `/uploads/${image3.name}`,
    });

    await newItem.save();
    res.redirect('/portfolio');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Функция для редактирования элемента портфолио
exports.editPortfolioItem = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const portfolioItem = await PortfolioItem.findById(id);

    if (!portfolioItem) {
      return res.status(404).send('Portfolio item not found');
    }

    portfolioItem.title = title || portfolioItem.title;
    portfolioItem.description = description || portfolioItem.description;

    if (req.files) {
      const image1 = req.files.image1;
      const image2 = req.files.image2;
      const image3 = req.files.image3;

      fs.unlinkSync(path.join(__dirname, '..', portfolioItem.image1));
      fs.unlinkSync(path.join(__dirname, '..', portfolioItem.image2));
      fs.unlinkSync(path.join(__dirname, '..', portfolioItem.image3));

      const image1Path = path.join(__dirname, '../public/uploads', image1.name);
      const image2Path = path.join(__dirname, '../public/uploads', image2.name);
      const image3Path = path.join(__dirname, '../public/uploads', image3.name);

      image1.mv(image1Path, (err) => {
        if (err) return res.status(500).send(err);
      });
      image2.mv(image2Path, (err) => {
        if (err) return res.status(500).send(err);
      });
      image3.mv(image3Path, (err) => {
        if (err) return res.status(500).send(err);
      });

      portfolioItem.image1 = `/uploads/${image1.name}`;
      portfolioItem.image2 = `/uploads/${image2.name}`;
      portfolioItem.image3 = `/uploads/${image3.name}`;
    }

    await portfolioItem.save();
    res.redirect('/portfolio');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Функция для удаления элемента портфолио
exports.deletePortfolioItem = async (req, res) => {
  const { id } = req.params;

  try {
    const portfolioItem = await PortfolioItem.findById(id);

    if (!portfolioItem) {
      return res.status(404).send('Portfolio item not found');
    }

    fs.unlinkSync(path.join(__dirname, '..', portfolioItem.image1));
    fs.unlinkSync(path.join(__dirname, '..', portfolioItem.image2));
    fs.unlinkSync(path.join(__dirname, '..', portfolioItem.image3));

    await portfolioItem.remove();
    res.redirect('/portfolio');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
