import React, { useState, useEffect } from "react";

const Player = (props) => {
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

	useEffect(() => {
		const fetchData = async () => {
		const queryParameters = new URLSearchParams(window.location.search)
		const id = queryParameters.get("id");
		const result = await fetch(`http://localhost:5000/player/${id}`);
		const data = await result.json();
		setPlayer(data);
		};

		fetchData();
	}, []);

	return (
		<div className="row" style={{marginLeft: "280px"}}>
			
			<h1 className="fw-bold text-white text-uppercase">{player.firstName} {player.lastName}</h1>

			<div className="col-md-4 col-lg-3">
				<table className="table table-condensed text-nowrap text-white text-uppercase">
					
					<tbody>
						<tr>
							<th>Age</th>
							<td>{player.age}</td>
						</tr>
						
						<tr>
							<th>Country</th>
							<td><img crossOrigin="anonymous" src={"https://countryflagsapi.com/png/" + player.country} title="flag" width="24" height="20"/> <span>{player.country}</span></td>
						</tr>

						<tr>
							<th>Birthplace</th>
							<td>{player.birthPlace}</td>
						</tr>

						<tr>
							<th>Residence</th>
							<td>{player.residence}</td>
						</tr>
						
						<tr>
							<th>Height</th>
							<td>{player.height}</td>
						</tr>
						
						<tr>
							<th>Weight</th>
							<td>{player.weight}</td>
						</tr>
						
						<tr>
							<th>Plays</th>
							<td>{player.plays}</td>
						</tr>
						
						<tr>
							<th>Backhand</th>
							<td>{player.backhand}</td>
						</tr>
						
						<tr>
							<th>Favorite Surface</th>
							<td>{player.favoriteSurface}</td>
						</tr>
						
						<tr>
							<th>Coach</th>
							<td>{player.coach}</td>
						</tr>
						
						<tr>
							<th>Turned Pro</th>
							<td>{player.turnedPro}</td>
						</tr>
						
						<tr>
							<th>Seasons</th>
							<td>{player.season}</td>
						</tr>
						
						<tr>
							<th>Active</th>
							<td>{player.active}</td>
						</tr>
						
						<tr>
							<th>Prize Money</th>
							<td>{player.prizeMoney}</td>
						</tr>
						
						<tr>
							<th>Wikipedia</th>
							<td><a href={player.wikipedia} target="_blank" rel="noopener noreferrer" className="external">Wikipedia</a></td>
						</tr>
						
						<tr>
							<th>Website</th>
							<td><a href={player.website} target="_blank" rel="noopener noreferrer" className="external">Website</a></td>
						</tr>
						</tbody>
					</table>
				</div>

				<div className="col-lg-1">&nbsp;</div>

				<div className="col-md-4 col-lg-3">
					<table className="table table-condensed text-nowrap text-white text-uppercase">
						
						<tbody><tr>
							<th>Titles</th>
							<td>{player.titles}</td>
						</tr>
						<tr>
							<th>Grand Slams</th>
							<td>{player.grandSlams}</td>
						</tr>
						<tr>
							<th>Tour Finals</th>
							<td>{player.tourFinals}</td>
						</tr>
						
						<tr>
							<th>Masters</th>
							<td>{player.masters}</td>
						</tr>
						
						<tr>
							<th>Davis Cups</th>
							<td>{player.davisCups}</td>
						</tr>
						<tr>
							<th>Team Cups</th>
							<td>{player.teamCups}</td>
						</tr>

						<tr><td colSpan="2">&nbsp;</td></tr>
						
						<tr>
							<th>Current Rank</th>
							<td>{player.currentRank}</td>
						</tr>
						<tr>
							<th>Best Rank</th>
							<td>{player.bestRank}</td>
						</tr>
						<tr>
							<th>Current Elo Rank</th>
							<td>{player.currentEloRank}</td>
						</tr>
						<tr><td colSpan="2">&nbsp;</td></tr>
						<tr>
							<th>Best Season</th>
							<td>{player.bestSeason}</td>
						</tr>
						
						<tr>
							<th>Last Appearance</th>
							<td>{player.lastApperance}</td>
						</tr>
					</tbody>

				</table>
			</div>
		</div>
	);
};

export default Player;
