const User = require('../models/User');

// Получение всех пользователей
const getUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
};

// Обновление данных пользователя (например, роль)
const updateUserRole = async (req, res) => {
    const { role } = req.body;

    await User.findByIdAndUpdate(req.params.id, { role });

    res.status(200).send('Роль пользователя обновлена');
};

module.exports = {
    getUsers,
    updateUserRole
};
