const authAdmin = (req, res, next) => {
    // Проверяем, что пользователь существует и имеет роль администратора
    if (res.locals.user && res.locals.user.isAdmin) {
        next();
    } else {
        // Если пользователь не существует или не админ, отправляем ошибку
        res.status(403).json({ message: 'Доступ запрещен: требуется админский доступ.' });
    }
};

module.exports = authAdmin;
