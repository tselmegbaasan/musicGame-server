module.exports = (app) => {
    const player_controller = require('../controllers/players.controller');
    var router = require('express').Router();

    router.post('/', player_controller.create);
    router.get('/', player_controller.findAll);
    router.put('/:username', player_controller.update);
    router.delete('/:username', player_controller.delete);
    router.delete('/', player_controller.deleteAll);

    app.use('/api/players', router)
};