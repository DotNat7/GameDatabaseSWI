import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import React from "react";

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <>
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '60vh' }}>
                <h1>GameDatabase</h1>
                <h3>Check it out</h3>
            <div className={"d-flex gap-3"}>
                <Button variant="outline-dark" size="lg" onClick={() => navigate("/games")}>Games</Button>
                <Button variant="success" size="lg" onClick={() => navigate("/developers")}>Developers</Button>
            </div>
        </div>
        </>
    );
};

export default HomePage;