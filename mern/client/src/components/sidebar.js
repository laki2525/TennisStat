import React from "react";
 
export default function Sidebar() {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white" style={{backgroundColor:'rgb(0,30,40)', width: '280px', height:'100%', position:'fixed'}}>
            <ul className="nav nav-pills flex-column mb-auto">
                <li>

                    <button className="btn btn-toggle align-items-center rounded collapsed text-white fw-bold" data-bs-toggle="collapse" data-bs-target="#grands" aria-expanded="true">
                        Grand Slams
                    </button>

                    <div className="collapse show" id="grands">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">

                            <li className="nav-item">
                                <a href="http://localhost:3000/Tournament?name=Australian Open" className="nav-link text-white" aria-current="page">
                                    <svg className="bi me-2" width="16" height="16"></svg>
                                        Australian Open
                                </a>
                            </li>

                            <li>
                                <a href="http://localhost:3000/Tournament?name=Roland Garros" className="nav-link text-white">
                                    <svg className="bi me-2" width="16" height="16"></svg>
                                        Roland Garros
                                </a>
                            </li>

                            <li>
                                <a href="http://localhost:3000/Tournament?name=Wimbledon" className="nav-link text-white">
                                    <svg className="bi me-2" width="16" height="16"></svg>
                                        Wimbledon
                                </a>
                            </li>

                            <li>
                                <a href="http://localhost:3000/Tournament?name=US Open" className="nav-link text-white">
                                    <svg className="bi me-2" width="16" height="16"></svg>
                                        US Open
                                </a>
                            </li>
                        </ul>
                    </div>
                    
                </li>     
            </ul>
        </div>
    );
}
