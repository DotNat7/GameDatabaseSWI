import {GameRequest} from "../../model/GameRequest";
import React, {useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";

interface NewGameParams {
    createHandler: (band: GameRequest) => void;
    externalShow: boolean;
}
const NewGame: React.FC<NewGameParams> = ({createHandler, externalShow}) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [newGame, setNewGame] = useState<GameRequest>({ name: "", genre: "", rating: 0, description: "", developerIds: [] });

    useEffect(() => {
        setShowModal(externalShow);
    }, [externalShow]);

    const refreshNewGame = () => {
        setNewGame({ name: "", genre: "", rating: 0, description: "", developerIds: [] });
    };

    const updateName = (newName: string) => {
        const originalGame = Object.assign({}, newGame);
        originalGame.name = newName;
        setNewGame(originalGame);
    };

    const updateGenre = (newGenre: string) => {
        const originalGame = Object.assign({}, newGame);
        originalGame.genre = newGenre;
        setNewGame(originalGame);
    };


    const updateRating = (newRating: string) => {
        const originalGame = Object.assign({}, newGame);
        originalGame.rating = Number(newRating);
        setNewGame(originalGame);
    };


    const updateDescription = (newDescription: string) => {
        const originalGame = Object.assign({}, newGame);
        originalGame.description = newDescription;
        setNewGame(originalGame);
    };


    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Create game</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Game name</Form.Label>
                        <Form.Control type="text" value={newGame?.name} onChange={ev => updateName(ev.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Genre</Form.Label>
                        <Form.Control type="text" value={newGame?.genre?.toString()} onChange={ev => updateGenre(ev.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control type="number" value={newGame?.rating?.toString()} onChange={ev => updateRating(ev.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" value={newGame?.description?.toString()} onChange={ev => updateDescription(ev.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <div className="d-flex flex-row gap-3 justify-content-end">
                    <Button variant="success" onClick={() => createHandler(newGame)}>Save</Button>
                    <Button variant="danger" onClick={() => { setShowModal(false); refreshNewGame(); }}>Cancel</Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
};
export default NewGame;


