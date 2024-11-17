const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();
const nodemailer = require('nodemailer');

// Страница регистрации
router.get('/register', (req, res) => {
    res.render('register');
});

// Обработка регистрации
router.post('/register', async (req, res) => {
    const { username, firstName, lastName, age, gender, password, confirmPassword } = req.body;
    
    if (password !== confirmPassword) {
        return res.render('register', { error: 'Пароли не совпадают' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.render('register', { error: 'Пользователь с таким именем уже существует' });
    }

    const newUser = new User({
        username,
        firstName,
        lastName,
        age,
        gender,
        password
    });

    await newUser.save();

    // Отправка письма на email (настройка через Nodemailer)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: 'Добро пожаловать на платформу портфолио!',
        text: 'Спасибо за регистрацию на нашей платформе.'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.redirect('/login');
});

// Страница логина
router.get('/login', (req, res) => {
    res.render('login');
});

// Обработка логина
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

// Выход
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
