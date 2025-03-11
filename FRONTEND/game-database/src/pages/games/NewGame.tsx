import {GameRequest} from "../../model/GameRequest";
import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";

interface NewGameParams {
    show: boolean;
    onClose: () => void;
    onSave: (gameRequest: GameRequest) => void;
}
const NewGame: React.FC<NewGameParams> = ({show, onClose, onSave}) => {
    const [gameRequest, setGameRequest] = useState<GameRequest>({name: "", rating:0, genre: "", description: "", developerIds: []});
    const nameChange = (newName: string) => {
    const originalGame = Object.assign({}, gameRequest);
    originalGame.name = newName;
    setGameRequest(originalGame);
    };

    const ratingChange = (newRating: string) => {
        const originalRating = Object.assign({}, gameRequest);
        originalRating.rating = Number(newRating);
        setGameRequest(originalRating);
    };
    const genreChange = (newGenre: string) => {
        const originalGenre = Object.assign({}, gameRequest);
        originalGenre.genre = newGenre;
        setGameRequest(originalGenre);
    };
    const closeHandler = () => {
        onClose();
        setGameRequest({name: "", rating: 0, genre: "", description: "", developerIds: []});
    };
    const saveHandler = () => {
        onSave(gameRequest);
        closeHandler();
    };
    const descriptionChange = (newDescription: string) => {
        const originalDescription = Object.assign({}, gameRequest);
        originalDescription.description = newDescription;
        setGameRequest(originalDescription);
    };
    return (
        <Modal show={show} onHide={closeHandler}>
            <Modal.Header closeButton>
                <Modal.Title>New Game</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Game name</Form.Label>
                        <Form.Control type="text" value={gameRequest?.name} onChange={ev => nameChange(ev.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control type="number" value={gameRequest?.rating} onChange={ev => ratingChange(ev.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Genre</Form.Label>
                        <Form.Control type="number" value={gameRequest?.genre} onChange={ev => genreChange(ev.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" value={gameRequest?.description} onChange={ev => descriptionChange(ev.target.value)}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <div className="d-flex flex-row gap-3 justify-content-end">
                    <Button variant="success" onClick={saveHandler}>Save</Button>
                    <Button variant="danger" onClick={closeHandler}>Cancel</Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};
export default NewGame;


