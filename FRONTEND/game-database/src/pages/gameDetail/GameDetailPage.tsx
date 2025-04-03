import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Game} from "../../model/Game";
import ApiClient from "../../client/ApiClient";
import {Button, Card, Form, Stack} from "react-bootstrap";
import {Developer} from "../../model/Developer";
import {DeveloperChip} from "./DeveloperChip";

const GameDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState<Game | null>(null);
    const [developers, setDevelopers] = useState<Developer[]>([])
    useEffect(() => {
        ApiClient.getGame(Number(id as string)).then(gm => {
            setGame(gm);
            ApiClient.getAllDevelopers().then(d => setDevelopers(d));
        }).catch(err => {
            alert(err);
            navigate("/games");
        });
    }, [id, navigate]);

    const updateName = (newName: string) => {
        const originalGame = Object.assign({}, game);
        originalGame.name = newName;
        setGame(originalGame);
    };

    const updateGenre = (newGenre: string) => {
        const originalGame = Object.assign({}, game);
        originalGame.genre = newGenre;
        setGame(originalGame);
    };


    const updateRating = (newRating: string) => {
        const originalGame = Object.assign({}, game);
        originalGame.rating = Number(newRating);
        setGame(originalGame);
    };


    const updateDescription = (newDescription: string) => {
        const originalGame = Object.assign({}, game);
        originalGame.description = newDescription;
        setGame(originalGame);
    };

    const saveChanges = () => {
            ApiClient.updateGame(game!).then(g => {
                setGame(g);
        }).catch(err => alert(err))
    };

    const removeDeveloper = (developerId: number) => {
        const originalGame = Object.assign({}, game);
        originalGame.developers = originalGame.developers.filter(d => d.id !== developerId);
        setGame(originalGame);
    };

    const addDeveloper = (developerId: string | null) => {
        if(developerId){
            const developer = developers.find(d => d.id === Number(developerId));
            if(developer){
                const originalGame = Object.assign({}, game);
                originalGame.developers.push(developer);
                setGame(originalGame);
            }
        }
    };

    return (
        <Card className='border-success shadow'>
            <Card.Header className='bg-success text-light'>Game detail</Card.Header>
            <Card.Body>
            <Form>
                <Form.Group>
                    <Form.Label>Game name</Form.Label>
                    <Form.Control type="text" value={game?.name} onChange={ev => updateName(ev.target.value)} required />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Genre</Form.Label>
                    <Form.Control type="text" value={game?.genre?.toString()} onChange={ev => updateGenre(ev.target.value) }/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control type="text" value={game?.rating?.toString()} onChange={ev => updateRating(ev.target.value) }/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" value={game?.description?.toString()} onChange={ev => updateDescription(ev.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Developers</Form.Label>
                    <Stack direction='horizontal' gap={3}>
                        {game?.developers.map((developer, index) => <DeveloperChip deleteHandler={removeDeveloper} key={index} developer={developer} />)}
                    </Stack>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Add developers</Form.Label>
                    <Form.Select onChange={ev => addDeveloper(ev.target.value)}>
                        <option>Select Developer to add</option>
                        {
                            developers.filter(d => !game?.developers.some(x => x.id === d.id)).map((developer, index) => <option key={index} value={developer.id}>{developer.name} ({developer.country})</option>)
                        }
                    </Form.Select>
                </Form.Group>
            </Form>
            </Card.Body>
            <Card.Footer>
                <div className= 'd-flex flex-row justify-content-end gap-3'>
                    <Button variant='success' onClick={saveChanges}>Save</Button>
                    <Button variant='danger' onClick={() => navigate("/games")}>Cancel</Button>
                </div>
            </Card.Footer>
        </Card>
    );
};
export default GameDetailPage;