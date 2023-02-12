import React, { useState, useEffect } from "react";

const UpdatePlayer = (props) => {
    const [player, setPlayer] = useState({
        firstName: "",
        lastName: "",
        age: "",
        country: "",
        birthPlace: "",
        residence: "",
        height: "",
        weight: "",
        plays: "",
        backhand: "",
        favoriteSurface: "",
        coach: "",
        turnedPro: "",
        season: "",
        active: "",
        prizeMoney: "",
        wikipedia: "",
        website: "",
        titles: "",
        grandSlams: "",
        tourFinals: "",
        masters: "",
        davisCups: "",
        teamCups: "",
        currentRank: "",
        bestRank: "",
        currentEloRank: "",
        bestSeason: "",
        lastApperance: "",
    });

    const [player1, setplayer1] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/allPlayers/")
        .then(r => {
            r.json().then(data => {
            setplayer1(data);
            })
        });

    }, []);

    const handlePlayerChange = (event) => {
        fetch("http://localhost:5000/player/" + event.target.value)        
            .then(r => {
                r.json().then(data => {
                    setPlayer(data);
                })
            })
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPlayer({ ...player, [name]: value });
    };

    async function handleSubmit (event) { 
        if(event.nativeEvent.submitter.value === "delete") {
            fetch("http://localhost:5000/deletePlayer/" + event.target[0].value, {
                method: "DELETE"})
        }
        else {
            await fetch("http://localhost:5000/updatePlayer/" + event.target[0].value, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(player),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log("Igrac uspesno izmenjen:", data);
            })
            .catch((error) => {
                console.error("Greska prilikom uredjivanja igraca:", error);
            });
        }
    };

    return (
        <div style={{marginLeft: '300px', paddingTop:'20px', display: 'flex'}}>
            <form className="mx-auto mt-3" onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

                <label>
                    <select className="form-control" type="text" placeholder="Player 1" aria-label="Player 1"
                        name="player1Id"
                        onChange={handlePlayerChange}>
                        <option value="">Izaberi igraca</option>
                        {player1.map(first => (
                            <option key={first.firstName} value={first._id}>
                                {first.firstName + " " + first.lastName}
                            </option>
                        ))}
                    </select>
                </label>
                <hr></hr>

                <div style={{display: 'flex'}}>
                    <div style={{display: 'flex', marginRight:'15px', flexDirection: 'column'}}>
                        <label>
                            <input className="form-control" type="text" placeholder="First Name" aria-label="First Name"
                                name="firstName"
                                value={player.firstName}
                                onChange={handleInputChange}
                            ></input>
                        </label>
                        <br />

                        <label>
                            <input className="form-control " type="text" placeholder="Last Name" aria-label="Last Name"
                                name="lastName"
                                value={player.lastName}
                                onChange={handleInputChange}
                            ></input>
                        </label>
                        <br />

                        <label>
                            <input className="form-control " type="number" placeholder="Age" aria-label="Age"
                                name="age"
                                value={player.age}
                                onChange={handleInputChange}
                            ></input>
                        </label>
                        <br />

                        <label>
                            <input className="form-control " type="text" placeholder="Country" aria-label="Country"
                                name="country"
                                value={player.country}
                                onChange={handleInputChange}
                            ></input>
                        </label>
                        <br />

                        <label>
                            <input className="form-control " type="text" placeholder="Birth Place" aria-label="Birth Place"
                                name="birthPlace"
                                value={player.birthPlace}
                                onChange={handleInputChange}
                            ></input>
                        </label>
                        <br />

                        <label>
                            <input className="form-control " type="text" placeholder="Residence" aria-label="Residence"
                                name="residence"
                                value={player.residence}
                                onChange={handleInputChange}
                            ></input>
                        </label>
                        <br />

                        <label>
                            <input className="form-control " type="number" placeholder="Height" aria-label="Height"
                                name="height"
                                value={player.height}
                                onChange={handleInputChange}
                            ></input>
                        </label>
                        <br />

                        <label>
                            <input className="form-control " type="number" placeholder="Weight" aria-label="Weight"
                                name="weight"
                                value={player.weight}
                                onChange={handleInputChange}
                            ></input>
                        </label>
                        <br />

                        <label>
                            <input className="form-control " type="text" placeholder="Plays" aria-label="Plays"
                                name="plays"
                                value={player.plays}
                                onChange={handleInputChange}
                            ></input>
                        </label>
                        <br />

                        <label>
                            <input className="form-control " type="text" placeholder="Backhand" aria-label="Backhand"
                                name="backhand"
                                value={player.backhand}
                                onChange={handleInputChange}
                            ></input>
                        </label>
                        <br />
                    </div>
                
                    <div style={{display: 'flex',  marginRight:'15px', flexDirection: 'column'}}>
                        <label>
                            <input className="form-control " type="text" placeholder="Favorite Surface" aria-label="Favorite Surface"
                                name="favoriteSurface"
                                value={player.favoriteSurface}
                                onChange={handleInputChange}
                            ></input>
                        </label>
                        <br />

                        <label>
                            <input className="form-control " type="text" placeholder="Coach" aria-label="Coach"
                                name="coach"
                                value={player.coach}
                                onChange={handleInputChange}
                            ></input>
                        </label>
                        <br />

                        <label>
                            <input className="form-control " type="text" placeholder="Turned Pro" aria-label="Turned Pro"
                                name="turnedPro"
                                value={player.turnedPro}
                                onChange={handleInputChange}
                            ></input>
                        </label>
                        <br />

                        <label>
                            <input className="form-control " type="text" placeholder="Season" aria-label="Season"
                                name="season"
                                value={player.season}
                                onChange={handleInputChange}
                            ></input>
                        </label>
                        <br />
                        
                        <label>
                            <input className="form-control " type="text" placeholder="Active" aria-label="Active"
                                name="active"
                                value={player.active}
                                onChange={handleInputChange}
                            ></input>
                        </label>
                        <br />
                        
                        <label>
                            <input className="form-control " type="number" placeholder="Prize Money" aria-label="Prize Money"
                                name="prizeMoney"
                                value={player.prizeMoney}
                                onChange={handleInputChange}
                            ></input>
                        </label>
                        <br />
                        
                        <label>
                            <input className="form-control " type="text" placeholder="Wikipedia" aria-label="Wikipedia"
                                name="wikipedia"
                                value={player.wikipedia}
                                onChange={handleInputChange}
                            ></input>
                        </label>
                        <br />
                        
                        <label>
                            <input className="form-control " type="text" placeholder="Website" aria-label="Website"
                                name="website"
                                value={player.website}
                                onChange={handleInputChange}
                            ></input>
                        </label>
                        <br />
                        
                        <label>
                            <input className="form-control " type="text" placeholder="Titles" aria-label="Titles"
                                name="titles"
                                value={player.titles}
                                onChange={handleInputChange}
                            ></input>
                        </label>
                        <br />
                        
                        <label>
                            <input className="form-control " type="text" placeholder="Grand Slams" aria-label="Grand Slams"
                                name="grandSlams"
                                value={player.grandSlams}
                                onChange={handleInputChange}
                            ></input>
                        </label>
                        <br />
                    </div>
                
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <label>
                            <input className="form-control " type="text" placeholder="Tour Finals" aria-label="Tour Finals"
                                name="tourFinals"
                                value={player.tourFinals}
                                onChange={handleInputChange}
                            ></input>
                        </label>
                        <br />

                        <label>
                            <input className="form-control " type="text" placeholder="Masters" aria-label="Masters"
                                name="masters"
                                value={player.masters}
                                onChange={handleInputChange}
                            ></input>
                        </label>
                        <br />

                        <label>
                            <input className="form-control " type="text" placeholder="Davis Cups" aria-label="Davis Cups"
                                name="davisCups"
                                value={player.davisCups}
                                onChange={handleInputChange}
                            ></input>
                        </label>
                        <br />
                        
                        <label>
                            <input className="form-control " type="text" placeholder="Team Cups" aria-label="Team Cups"
                                name="teamCups"
                                value={player.teamCups}
                                onChange={handleInputChange}
                            ></input>
                        </label>
                        <br />
                        
                        <label>
                            <input className="form-control " type="number" placeholder="Current Rank" aria-label="Current Rank"
                                name="currentRank"
                                value={player.currentRank}
                                onChange={handleInputChange}
                            ></input>
                        </label>
                        <br />
                        
                        <label>
                            <input className="form-control " type="number" placeholder="Best Rank" aria-label="Best Rank"
                                name="bestRank"
                                value={player.bestRank}
                                onChange={handleInputChange}
                            ></input>
                        </label>
                        <br />
                        
                        <label>
                            <input className="form-control " type="number" placeholder="Current Elo Rank" aria-label="Current Elo Rank"
                                name="currentEloRank"
                                value={player.currentEloRank}
                                onChange={handleInputChange}
                            ></input>
                        </label>
                        <br />
                        
                        <label>
                            <input className="form-control " type="text" placeholder="Best Season" aria-label="Best Season"
                                name="bestSeason"
                                value={player.bestSeason}
                                onChange={handleInputChange}
                            ></input>
                        </label>
                        <br />
                        
                        <label>
                            <input className="form-control " type="text" placeholder="Last Appearance" aria-label="Last Appearance"
                                name="lastAppearance"
                                value={player.lastApperance}
                                onChange={handleInputChange}
                            ></input>
                        </label>
                        <br />
                    </div>
                </div>

                <div>
                    <button type="submit" className="mx-3 btn btn-primary fw-bold text-uppercase">Izmeni igraca</button>
                    <button type="submit" value="delete" className="btn btn-danger fw-bold text-uppercase">Obrisi igraca</button>
                </div>
            </form>
        </div>
    )
}

export default UpdatePlayer;
