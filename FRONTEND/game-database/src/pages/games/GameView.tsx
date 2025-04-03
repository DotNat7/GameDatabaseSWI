import {Game} from "../../model/Game";
import React from "react";
import {useNavigate} from "react-router-dom";
import {Button, Card, CardFooter, Stack} from "react-bootstrap";

interface GameViewParams{
    game: Game;
    deleteHandler: (id: number) => void;
    updateHandler: (id: number) => void;
}

const GameView:React.FC<GameViewParams> = ({game, deleteHandler, updateHandler}) => {
    return (
        <Card className='border-success shadow'>
            <Card.Header className='bg-success text-light'>
                <strong>{game.name} - {game.rating}</strong>
            </Card.Header>
            <Card.Body>
                <Stack direction='vertical' gap={1}>
                    {game.genre ? <span>Genre: {game.genre}</span> : <></>}
                    {game.rating ? <span>Rating: {game.rating}</span> : <></>}
                    {game.description ? <span>Description: {game.description}</span> : <></>}
                    {game.developers && game.developers.length > 0 ? <span>Developers count: {game.developers.length}</span> : <></>}
                </Stack>
            </Card.Body>
            <Card.Footer>
                <div className="d-flex flex-row gap-3 justify-content-around">
                    <Button variant='primary' onClick={() => updateHandler(game.id)}>Update</Button>
                    <Button variant='danger' onClick={() => deleteHandler(game.id)}>Delete</Button>
                </div>
            </Card.Footer>
        </Card>
    );
};

export default GameView;