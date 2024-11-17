const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');
const User = require('./models/User'); // Модель пользователя

// Загружаем переменные окружения
dotenv.config();

// Инициализируем приложение
const app = express();

// Подключаем MongoDB через mongoose
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

// Настройка middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Настройка сессий
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));

// Инициализация Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Настройка стратегии Passport для аутентификации пользователя
passport.use(new (require('passport-local')).Strategy({
  usernameField: 'username',
  passwordField: 'password',
}, async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    if (!user) return done(null, false, { message: 'No user found' });

    const isMatch = await require('bcryptjs').compare(password, user.password);
    if (!isMatch) return done(null, false, { message: 'Incorrect password' });

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// Сериализация пользователя
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Десериализация пользователя
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Маршруты
const authRoutes = require('./routes/authRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');

// Использование маршрутов
app.use('/auth', authRoutes); // Для регистрации, входа, выхода
app.use('/portfolio', portfolioRoutes); // Для работы с портфолио (только авторизованные)

// Главная страница
app.get('/', (req, res) => {
  res.render('index');
});

// Ошибки 404
app.use((req, res) => {
  res.status(404).render('404');
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
