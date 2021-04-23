module.exports = (sequelize, Sequelize) => {
    const Lyrics = sequelize.define("lyrics", {
        song_title: {
            type: Sequelize.STRING
        },
        artist: {
            type: Sequelize.STRING
        },
        lyrics: {
            type: Sequelize.TEXT
        },
        score: {
            type: Sequelize.INTEGER
        },
        category: {
            type: Sequelize.STRING
        }
    });

    return Lyrics;
}