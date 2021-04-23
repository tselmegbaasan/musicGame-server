const express = require('express');
const cors = require('cors');
const db = require('./models/index');
const dbSetup = require('./dbSetup');
// db.sequelize.sync();

const playlists = {
    top_50_global: "37i9dQZEVXbMDoHDwVN2tF",
    top_50_sweden: "37i9dQZEVXbLoATJ81JYXz",
    sommarhits_2020: "37i9dQZF1DWTh5RC6ek3nb",
    songs_to_sing_in_the_car: "37i9dQZF1DWWMOmoXKqHTD",
    songs_to_sing_in_the_shower: "37i9dQZF1DWSqmBTGDYngZ",
    guilty_pleasures: "37i9dQZF1DX4pUKG1kS0Ac",
    indie_hits: "37i9dQZF1DWYBF1dYDPlHw",
    heard_it_before: "37i9dQZF1DWZh2e6r48GWn",
    all_of_00s: "37i9dQZF1DX4o1oenSJRJd",
    _90_tals_hits: "2zjuWmM0JKtQdm5RpLhf5p",
    all_of_80s: "37i9dQZF1DX4UtSsGT1Sbe",
    all_of_70s: "37i9dQZF1DWTJ7xPn4vNaz",
    one_hit_wonders: "37i9dQZF1DX0Ew6u9sRtTY"
}

const playlists_id = [
    playlists.top_50_global,
    playlists.top_50_sweden,
    playlists.sommarhits_2020,
    playlists.songs_to_sing_in_the_car,
    playlists.songs_to_sing_in_the_shower,
    playlists.guilty_pleasures,
    playlists.indie_hits,
    playlists.heard_it_before,
    playlists.all_of_00s,
    playlists._90_tals_hits,
    playlists.all_of_80s,
    playlists.all_of_70s,
    playlists.one_hit_wonders
]

// dbSetup(db, playlists_id);


const app = express();
app.use(express.json());

var corsConfig = {
    origin: "http://localhost:8081"
};

app.use(cors(corsConfig));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json("Welcome to my application server.")
});


require('./routes/lyrics.route')(app);
require('./routes/player.route')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}.`)
});