import {Game} from "../../model/Game";
import React from "react";
import {useNavigate} from "react-router-dom";
import {Button, Card, CardFooter, Stack} from "react-bootstrap";

interface GameViewParams{
    game: Game;
    onDelete: (id:number) => void;
}

const GameView:React.FC<GameViewParams> = ({game, onDelete}) => {
    const navigate = useNavigate();
    return (
        <Card className='border-success shadow'>
            <Card.Header className='bg-success text-light'>
                <strong>{game.name}</strong> ({game.rating})
            </Card.Header>
            <Card.Body>
                <Stack direction='vertical' gap={1}>
                    {game.description ? <span>Description: {game.description}</span> : <></>}
                    {game.developers && game.developers.length > 0 ? <span>Developers: {game.developers.length}</span> : <></>}
                </Stack>
            </Card.Body>
            <Card.Footer>
                <div className="d-flex flex-row gap-3 justify-content-around">
                    <Button variant="primary" onClick={() => navigate("/games/" + game.id)}>Detail</Button>
                    <Button variant="danger" onClick={() => onDelete(game.id)}>Delete</Button>
                </div>
            </Card.Footer>
        </Card>
    );
};

export default GameView;