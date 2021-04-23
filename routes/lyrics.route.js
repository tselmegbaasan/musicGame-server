module.exports = (app) => {
    const lyrics_controller = require('../controllers/lyrics.controller');
    var router = require('express').Router();

    router.post('/', lyrics_controller.create);
    router.put('/:id', lyrics_controller.update);
    router.get('/', lyrics_controller.findAll);
    router.delete('/', lyrics_controller.deleteAll);
    router.get('/category/:category', lyrics_controller.findByCategory);
    router.get('/categories/',lyrics_controller.findAllCategories);

    app.use('/api/lyrics', router);
};