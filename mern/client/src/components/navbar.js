import React, { useState } from "react";

const Navbar = () => {
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedId, setSelectedId] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);

        if (e.target.value === "") {
            setShowSuggestions(false);
        }
        else if (e.target.value.length > 1) {
            var suggestionData = [];
            const result = fetch(`http://localhost:5000/playerSearch/${inputValue}`);
            result.then(r => {
                r.json().then(data => {
                    data.forEach(element => {
                        suggestionData.push({
                            name: `${element.firstName} ${element.lastName} (${element.country})`,
                            id: element._id,
                        });
                    });
                    setSuggestions(suggestionData);         
                })
            })
            setShowSuggestions(true);
        }
    };

    const filteredData = suggestions.filter((suggestion) =>
        suggestion.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    const handleClick = (id) => { 
        setSelectedId(id);
        window.location.href = `http://localhost:3000/player?id=${id}`;
    };

    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark fw-bold" style={{backgroundColor: 'rgb(0,30,40)'}}>
            <div className="container-fluid">
                
                <a className="navbar-brand" href="/"> 
                    <img crossOrigin="anonymous" src={"logo192.png"} alt="TennisStat" height="30" className="d-inline-block align-text-top" /> 
                </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> 
                    <span className="navbar-toggler-icon"></span> 
                </button> 

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0"> 
                        <li className="nav-item"> 
                            <a className="nav-link active" aria-current="page" href="/AddMatch">Dodaj mec</a> 
                        </li> 

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Igraci</a>  
                            <ul className="dropdown-menu active">
                                
                            <li><a className="dropdown-item" href="/AddPlayer">Dodaj igraca</a></li>
                            <li><hr className="dropdown-divider"/></li>
                            <li><a className="dropdown-item" href="/UpdatePlayer">Uredi / obrisi igraca</a></li>
                            </ul>
                        </li>
                    </ul> 

                    <form className="autocomplete-search d-flex" role="search">
                        <input className="form-control me-2" type="text" placeholder="Pretrazi igrace" aria-label="Search" value={inputValue} onChange={handleInputChange}/>
                        {showSuggestions && (
                            <ul className="suggestions">
                                {filteredData.map((suggestion) => (
                                    <li key={suggestion.name} onClick={() => handleClick(suggestion.id)}>{suggestion.name}</li>
                                ))}
                            </ul>
                        )}
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;