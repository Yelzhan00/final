const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send('Пароли не совпадают');
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).send('Пользователь с таким именем уже существует');
    }

    const newUser = new User({
        username,
        password
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    res.status(201).send('Пользователь успешно зарегистрирован');
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).send('Пользователь не найден');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).send('Неверный пароль');
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION
    });

    res.status(200).json({ token });
};

module.exports = {
    registerUser,
    loginUser
};
