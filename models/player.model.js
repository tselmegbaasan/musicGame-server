module.exports = (sequelize, Sequelize) => {
    const Player = sequelize.define("player", {
        username: {
            primaryKey: true, 
            type: Sequelize.STRING
        },
        score: {
            type: Sequelize.INTEGER
        },
    });

    return Player;
}
