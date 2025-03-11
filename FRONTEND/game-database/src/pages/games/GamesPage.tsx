import {useEffect, useState} from "react";
import {Game} from "../../model/Game";
import {Button, Stack} from "react-bootstrap";
import GameView from "./GameView";
import ApiClient from "../../client/ApiClient";
import {GameRequest} from "../../model/GameRequest";
import NewGame from "./NewGame";
const GamesPage = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    useEffect(() => {
        ApiClient.getAllGames().then(games => {
            setGames(games);
        });
    }, []);
    const deleteGame = (id: number) => {
        ApiClient.deleteGame(id).then(() => {
            setGames(games.filter(g => g.id !== id));
        });
    };
    const saveGame = (gameRequest: GameRequest) => {
        ApiClient.saveGame(gameRequest).then(g => {
            const originalArray = games.slice();
            originalArray.push(g);
            setGames(originalArray);
        });
    };
    return (
        <>
            <Stack direction="horizontal" gap={3}>
                <h2>Games</h2>
            </Stack>
            <Stack direction="horizontal" gap={3} className="mt-3">
                {games.map((game, index) => <GameView onDelete={deleteGame} game={game} key={index} /> )}
                <Button variant="success" size="lg" onClick={() => setShowModal(true)}>Add more</Button>
            </Stack>
            <NewGame show={showModal} onClose={() => setShowModal(false)} onSave={gr => saveGame(gr)} />
        </>
    )
};
export default GamesPage;