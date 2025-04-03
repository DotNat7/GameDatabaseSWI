import {useEffect, useState} from "react";
import {Game} from "../../model/Game";
import {Button, Stack} from "react-bootstrap";
import GameView from "./GameView";
import ApiClient from "../../client/ApiClient";
import {GameRequest} from "../../model/GameRequest";
import NewGame from "./NewGame";
import {useNavigate} from "react-router-dom";
const GamesPage = () => {
    const navigate = useNavigate();
    const [games, setGames] = useState<Game[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    useEffect(() => {
        ApiClient.getAllGames().then(games => {
            setGames(games);
        });
    }, []);

    const onDelete = (id: number) => {
        ApiClient.deleteGame(id).then(() => {
            let originalList = games?.filter(x => x.id !== id);
            setGames(originalList);
        }).catch(err => alert(JSON.stringify(err)));
    };

    const onUpdate = (id: number) => {
        navigate("/games/" + id);
    };

    const createGame = (game: GameRequest) => {
        ApiClient.createGame(game).then(g => {
            let originalList = games.slice();
            originalList.push(g);
            setGames(originalList);
            setShowModal(false);
        });
    };

    return (
        <>
            <Stack direction="horizontal" gap={3}>
                <h2>Games</h2>
                <Button variant="success" size="sm" onClick={() => setShowModal(true)}>+</Button>
            </Stack>

            <hr />
            <Stack direction="horizontal" gap={3}>
                {games ? games.map((game, index) => <GameView key={index} game={game} deleteHandler={onDelete} updateHandler={onUpdate} />) : <p>No games was found</p>}
            </Stack>
            <NewGame externalShow={showModal} createHandler={game => createGame(game)} />
        </>
    );
};
export default GamesPage;