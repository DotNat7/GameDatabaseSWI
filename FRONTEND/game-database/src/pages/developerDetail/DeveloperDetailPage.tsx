import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Developer} from "../../model/Developer";
import ApiClient from "../../client/ApiClient";
import {Button, Card, Form, Stack} from "react-bootstrap";
import {Game} from "../../model/Game";
import {GameChip} from "./GameChip";

export const DeveloperDetailPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [developer, setDeveloper] = useState<Developer | null>(null);
    const [games, setGames] = useState<Game[]>([]);
    useEffect(() => {
        ApiClient.getDeveloper(Number.parseInt(id as string)).then(d => {
            setDeveloper(d);
            ApiClient.getGamesForDeveloper(d.id).then(gms => {
                setGames(gms);
            }).catch(err => alert(err));
        }).catch(err => {
            navigate("/developers");
            alert(err);
        });
    }, [id, navigate]);

    const updateName = (newName: string) => {
      const originalDeveloper = Object.assign({}, developer);
      originalDeveloper.name = newName;
      setDeveloper(originalDeveloper);
    };
    const updateCountry = (newCountry: string) => {
        const originalDeveloper = Object.assign({}, developer);
        originalDeveloper.country = newCountry;
        setDeveloper(originalDeveloper);
    };

    const goToGame = (gameId: number) => {
        navigate("/games/"+gameId);
    };

    const saveChanges = () => {
        ApiClient.updateDeveloper(developer!).then(d => {
            setDeveloper(d);
        }).catch(err => alert(err))
    };
    return (
        <Card className='border-success shadow'>
            <Card.Header className='bg-success text-light'>Developer detail</Card.Header>
            <Card.Body>
            <Form>
                <Form.Group>
                    <Form.Label>Developer name</Form.Label>
                    <Form.Control value={developer?.name} onChange={ev => updateName(ev.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Country</Form.Label>
                    <Form.Control value={developer?.country} onChange={ev => updateCountry(ev.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Created</Form.Label>
                    <Form.Control defaultValue={developer?.created?.toString()} type='datetime' disabled />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Updated</Form.Label>
                    <Form.Control defaultValue={developer?.updated?.toString()} type='datetime' disabled />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Games</Form.Label>
                    <Stack direction='horizontal' gap={3}>
                        {games ? games.map((game, index) => <span key={index} className='clickable' onClick={() => goToGame(game.id)}><GameChip game={game} /></span>) : <p>No games found</p>}
                    </Stack>
                </Form.Group>
            </Form>
            </Card.Body>
            <Card.Footer>
                <div className='d-flex flex-row justify-content-end gap-3'>
                    <Button variant='success' onClick={saveChanges}>Save</Button>
                    <Button variant='danger' onClick={() => navigate("/developers")}>Cancel</Button>
                </div>
            </Card.Footer>
        </Card>
    )
}