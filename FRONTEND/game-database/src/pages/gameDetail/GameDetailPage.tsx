import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Game} from "../../model/Game";
import ApiClient from "../../client/ApiClient";
import {Button, Card, Form, Stack} from "react-bootstrap";

const GameDetailPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState<Game | null>(null);
    useEffect(() => {
        ApiClient.getGame(Number(id)).then(b => setGame(b));
    }, [id]);
    const nameChange = (newName: string) => {
        const originalGame = Object.assign({}, game);
        originalGame.name = newName;
        setGame(originalGame);
    };

    const ratingChange = (newRating: string) => {
        const originalGame = Object.assign({}, game);
        originalGame.rating = Number(newRating);
        setGame(originalGame);
    };
    const descriptionChange = (newDescription: string) => {
        const originalGame = Object.assign({}, game);
        originalGame.description = (newDescription);
        setGame(originalGame);
    };
    const genreChange = (newGenre: string) => {
        const originalGame = Object.assign({}, game);
        originalGame.genre = (newGenre);
        setGame(originalGame);
    };
    const saveChanges = () => {
            ApiClient.updateGame(game!).then(g => {
                setGame(g);
        }).catch(err => alert(err))
    };
    return (
        <Card className='border-success shadow'>
            <Card.Header className='bg-success text-light'>Game detail</Card.Header>
            <Card.Body>
            <Form>
                <Form.Group>
                    <Form.Label>Game name</Form.Label>
                    <Form.Control type="text" value={game?.name} onChange={ev => nameChange(ev.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control type="number" value={game?.rating} onChange={ev => ratingChange(ev.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Genre</Form.Label>
                    <Form.Control type="text" value={game?.genre} onChange={ev => genreChange(ev.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" value={game?.description} onChange={ev => descriptionChange(ev.target.value)}/>
                </Form.Group>
            </Form>
            </Card.Body>
            <Card.Footer>
                <div className= 'd-flex flex-row justify-content-end gap-3'>
                    <Button variant="success" onClick={() => saveChanges()}>Save</Button>
                    <Button variant="danger" onClick={() => navigate("/games")}>Cancel</Button>
                </div>
            </Card.Footer>
        </Card>
    );
};
export default GameDetailPage;