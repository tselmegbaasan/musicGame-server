const db = require('../models/index');
const Lyrics = db.lyrics;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    const song_title = req.body.song_title;
    const artist = req.body.artist;
    const lyrics = req.body.lyrics;
    const score = req.body.score;
    const category = req.body.category;

    if (!song_title || !artist) {
        res.status(400).send({
            message: "Body cannot be empty."
        });
        return;
    }

    const newLyrics = {
        song_title: song_title,
        artist: artist,
        lyrics: lyrics,
        score: score,
        category: category
    }

    Lyrics.create(newLyrics)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a new lyrics."
            });
        });
}

exports.findAll = (req, res) => {
    Lyrics.findAll({ where: {}, truncate: false })
        .then((data) => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving all lyrics."
            });
        });
};

exports.findByCategory = (req, res) => {
    const category = req.params.category;
    Lyrics.findAll({
        where: { category: category }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while getting all lyrics by category."
            })
        })
};

exports.deleteAll = (req, res) => {
    Lyrics.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} All lyrics were deleted succcessfully!` })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while deleting all lyrics."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Lyrics.update(req.body, {
        where: { id: id }
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: `Lyrics with id: ${id} has successfully been updated.`
                });
            } else {
                res.send({
                    message: "Could not update lyrics with id:" + id
                });
            };
        }).catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while updating lyrics with id: " + id
            });
        });
};

exports.findAllCategories = (req, res) => {
    Lyrics.findAll({ where: {}, attributes: ['category'], group: ['category'] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while getting all categories."
            })
        })
}

