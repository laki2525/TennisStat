import React, { useState, useEffect } from "react";
import DateTimePicker from 'react-datetime-picker'

const AddMatch = (props) => {
    const [match, setMatch] = useState({
        tournamentId: "",
        player1Id: "",
        player2Id: "",
        winnerId: "",
        score: "",
        sets: "",
        date: new Date()
    });

    const [tournaments, setTournaments] = useState([]);
    const [player1, setplayer1] = useState([]);
    const [player2, setplayer2] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/tournament/")
        .then(r => {
            r.json().then(data => {
            setTournaments(data);
            })
        });

        fetch("http://localhost:5000/allPlayers/")
        .then(r => {
            r.json().then(data => {
            setplayer1(data);
            setplayer2(data);
            })
        });
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setMatch({ ...match, [name]: value });
    };

    const handleDateChange = (date) => {
        setMatch({ ...match, date });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:5000/match/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(match),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("Match added successfully:", data);
        })
        .catch((error) => {
            console.error("Error adding match:", error);
        });
    };

    return (
    <div style={{marginLeft: '300px', paddingTop:'20px', display: 'flex'}}>
        <form className="mx-auto" onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

            <label>
                <select className="form-control" type="text" placeholder="Tournament Name" aria-label="Tournament Name" name="tournamentName" onChange={handleInputChange}>
                    <option value="">Izaberi turnir</option>
                    {tournaments.map(tournament => (
                        <option key={tournament.tournamentName} value={tournament.tournamentName}>
                            {tournament.tournamentName}
                        </option>
                    ))}
                </select>
            </label>
            
            <br />
            
            <label>
                <select className="form-control" type="text" placeholder="Player 1" aria-label="Player 1" name="player1Id" onChange={handleInputChange}>
                    <option value="">Izaberi prvog igraca</option>
                    {player1.map(first => (
                        <option key={first.firstName} value={first._id}>
                            {first.firstName + " " + first.lastName}
                        </option>
                    ))}
                </select>
            </label>

            <br />
            
            <label>
                <select className="form-control" type="text" placeholder="Player 2 ID" aria-label="Player 2 ID" style={{width:"auto"}} name="player2Id" onChange={handleInputChange}>
                    <option value="">Izaberi drugog igraca</option>
                    {player2.map(second => (
                        <option key={second.firstName} value={second._id}>
                            {second.firstName + " " + second.lastName}
                        </option>
                    ))}
                </select>
            </label>

            <br />
            
            <label>
                <div style={{background:"white"}}>
                    <DateTimePicker  name="date" onChange={handleDateChange}  value={match.date} />
                </div>
            </label>
            
            <br />
            
            <label>
                <input className="form-control" type="text" placeholder="Rezultat" aria-label="Score" name="score" value={match.score} onChange={handleInputChange}></input>
            </label>

            <br />
            
            <label>
                <input className="form-control" type="text" placeholder="Setovi" aria-label="Sets" name="sets" value={match.sets} onChange={handleInputChange}></input>
            </label>

            <br />
        
            <button type="submit" className="btn btn-primary fw-bold text-uppercase">Dodaj mec</button>
        </form>
    </div>
    );
};

export default AddMatch;