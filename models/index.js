const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../../db.sqlite'
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.lyrics = require('./lyrics.model')(sequelize, Sequelize);
db.players = require('./player.model')(sequelize, Sequelize);

module.exports = db;
