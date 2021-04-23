module.exports = dbSetup = (db, playlists) => {
    const fetch = require('node-fetch');
    const songs_base_url = "https://api.spotify.com/v1/playlists/";
    let access_token_spotify = "BQBO6ubmoYl3Ic-lSg1LNEX59ofXhUuWRDX8nRd5C7yLxprGQ3TsW3iAl7EYhSkQ6B-EIIbjHIBB7Fg6lvE-OnFqF07p7q10Vh83_zg7aBLlbM-qzirAmEOc645EgVV3QSaSL8qNupvRDlGZL0C8dG43";
    const lyrics_api_key = "&apikey=bad7a7cb3f70ef6141da43acd7cd5cc9";
    let nbr_songs = 0;

    


    fill_songs = (playlist_id) => {
        fetch(songs_base_url + playlist_id, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${access_token_spotify}`
            }
        })
            .then(response => response.json())
            .then(data => {
                let tracks = data.tracks.items;
                nbr_songs += tracks.length;

                tracks.map((track) => {
                    let song_title = track.track.name;
                    let artists = [];
                    track.track.artists.forEach(artist => {
                        artists.push(artist.name);
                    });
                    let track_score = 100 - track.track.popularity;
                    let encoded_song_title = encodeURI(song_title);
                    let encoded_artist = encodeURI(artists[0]);
                    let playlist_name = data.name;

                //    console.log("Song: " + song_title + ", Artists: " + artists + ", Score: " + track_score + ", playlist: " + playlist_name)
                    fetch("https://api.musixmatch.com/ws/1.1/" + `matcher.lyrics.get` + '?format=json&callback=callback' + `&q_track=${encoded_song_title}&q_artist=${encoded_artist}` + lyrics_api_key)
                        .then(response => response.json())
                        .then(data => {
                            if (data.message.body.lyrics) {
                                let lyrics = data.message.body.lyrics.lyrics_body.split("...")[0].split("\n").join(", ");
                                let new_lyrics = {
                                    song_title: song_title,
                                    artist: artists[0],
                                    lyrics: lyrics,
                                    score: track_score,
                                    category: playlist_name
                                }
                                console.log(new_lyrics);
                                db.lyrics.create(new_lyrics);
                            } else {
                                console.log("No lyrics were found for this particular song: " + song_title)
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
            })
            .catch(err => {
                if (err instanceof TypeError) {
                    console.log("Data is empty, probably due to unauthorized requests to the spotify API.")
                } else {
                    console.log(err);
                }
            })
    }
    playlists.forEach(playlist => {
        fill_songs(playlist)
    });

};