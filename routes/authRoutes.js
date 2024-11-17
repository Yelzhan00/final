const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();
const nodemailer = require('nodemailer');

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    try {
        const { username, firstName, lastName, email, age, gender, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.render('register', { error: 'Пароли не совпадают' });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.render('register', { error: 'Пользователь с таким именем уже существует' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            firstName,
            lastName,
            email,
            age,
            gender,
            password: hashedPassword 
        });

        await newUser.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Добро пожаловать на платформу портфолио!',
            text: 'Спасибо за регистрацию на нашей платформе.'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Ошибка отправки email:', error);
            } else {
                console.log('Email отправлен:', info.response);
            }
        });

        res.redirect('/login');
    } catch (err) {
        console.error('Ошибка при регистрации:', err);
        res.render('register', { error: 'Произошла ошибка при регистрации. Попробуйте ещё раз.' });
    }
});

// Вход
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

// Выход
router.get('/logout', async (req, res) => {
    try {
        await req.logout();
        res.redirect('/');
    } catch (err) {
        console.error('Ошибка при выходе из системы:', err);
        res.redirect('/');
    }
});

module.exports = router;
