import React, { useState, useEffect } from "react";

const Tournament = (props) => {
    const [tournament, setTournament] = useState({
        tournamentName: "",
        surface: "",
        location: "",
        atpPoints: "",  
        startDate: "",
        endDate: "",
        matches: [],
    });

    const [matches, setMatches] = useState([]);
    const [players, setPlayers] = useState([]);

    const fetchData = async () => {
        const queryParameters = new URLSearchParams(window.location.search)
        const tournamentName = queryParameters.get("name");
        const result = await fetch(`http://localhost:5000/tournaments/${tournamentName}`);
        const data = await result.json();
        setTournament(data);
    };

    const fetchMatches = async () => {
        const promises = tournament.matches.map(async matchId => {
            const result = await fetch(`http://localhost:5000/match/${matchId}`);
            const data = await result.json();
            return data;
        });

        const matchesData = await Promise.all(promises);
        setMatches(matchesData);
    };        
    
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (tournament.matches.length > 0) {
            fetchMatches();
        }
    }, [tournament]);

    useEffect(() => {
        async function fetchPlayers() {
            const playerIds = Array.from(new Set(matches.flatMap(match => [match.player1Id, match.player2Id])));
            const playerPromises = playerIds.map(id => fetch(`http://localhost:5000/player/${id}`));
            const playerResponses = await Promise.all(playerPromises);
            const playerData = await Promise.all(playerResponses.map(response => response.json()));
            setPlayers(playerData);
        }
        if(matches.length > 0)
            fetchPlayers();
      }, [matches]);
      

    return (
        <div align="center" style={{marginLeft: "280px"}}>
            <h1 className="mt-3 text-white fw-bold text-uppercase">{tournament.tournamentName}</h1>
            <h2 className="text-white">{tournament.surface}, {tournament.atpPoints} points</h2>
            <h3 className="mb-5 text-white">{tournament.location}, {tournament.startDate} - {tournament.endDate}</h3>

            {players.length > 0 && matches.map((match, index) => {
                const player1 = players.find(player => player._id === match.player1Id);
                const player2 = players.find(player => player._id === match.player2Id);

                return(
                    <div className="card text-center mb-3 mx-auto" style={{width:"50%"}} key={index}>
                        <div className="card-body">
                            <h5 className="card-title text-uppercase fw-bold">{player1.firstName + " " + player1.lastName} vs {player2.firstName  + " " + player2.lastName}</h5>
                            <h5>{match.score}</h5>
                            <h5 className="card-title text-muted">score: {match.sets}</h5>
                        </div>

                        <div className="card-footer text-muted">
                            {new Date(match.date).toUTCString()}
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default Tournament;