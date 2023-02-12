import React, { useState, useEffect } from "react";
  
const Home = (props) => {
    const [matchesData, setMatchesData] = useState([]);
    const [players, setPlayers] = useState([]);
  
    useEffect(() => {
        fetch("http://localhost:5000/matchLastSix")
          .then(response => response.json())
          .then(data => setMatchesData(data))
          .catch(error => console.error(error));
      }, []);

    useEffect(() => {
        async function fetchPlayers() {
            const playerIds = Array.from(new Set(matchesData.flatMap(match => [match.player1Id, match.player2Id])));
            const playerPromises = playerIds.map(id => fetch(`http://localhost:5000/player/${id}`));
            const playerResponses = await Promise.all(playerPromises);
            const playerData = await Promise.all(playerResponses.map(response => response.json()));
            setPlayers(playerData);
        }
    
        fetchPlayers();
    }, [matchesData]);

    return (
        <div  className="mx-auto" style={{paddingLeft: "280px", maxWidth: "90%"}}>
            <h1 className="mt-3 mb-3 text-white fw-bold" align="center">POSLEDNJI MECEVI</h1>
            <div className="row">
                
            {players.length > 0 && matchesData.map((match, index) => {
                const player1 = players.find(player => player._id === match.player1Id);
                const player2 = players.find(player => player._id === match.player2Id);

                return(
                    <div className="card text-center mb-4 mx-auto" style={{width:"50%"}} key={index}>
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
        </div>
      );
}

export default Home;