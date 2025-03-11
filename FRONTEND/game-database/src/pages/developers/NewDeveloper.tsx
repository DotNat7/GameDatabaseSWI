import {DeveloperRequest} from "../../model/DeveloperRequest";
import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";

interface NewDeveloperParams {
    show: boolean;
    onClose: () => void;
    onSave: (developerRequest: DeveloperRequest) => void;
}
const NewDeveloper: React.FC<NewDeveloperParams> = ({show, onClose, onSave}) => {
    const [developerRequest, setDeveloperRequest] = useState<DeveloperRequest>({name: "", country: ""});
    const nameChange = (newName: string) => {
        const originalDeveloper = Object.assign({}, developerRequest);
        originalDeveloper.name = newName;
        setDeveloperRequest(originalDeveloper);
    };
    const countryChange = (newCountry: string) => {
        const originalDeveloper = Object.assign({}, developerRequest);
        originalDeveloper.country = newCountry;
        setDeveloperRequest(originalDeveloper);
    };
    const closeHandler = () => {
        onClose();
        setDeveloperRequest({name: "", country: ""});
    };
    const saveHandler = () => {
        onSave(developerRequest);
        closeHandler();
    };
    return (
        <Modal show={show} onHide={closeHandler}>
            <Modal.Header closeButton>
                <Modal.Title>New Developer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Developer name</Form.Label>
                        <Form.Control type="text" value={developerRequest?.name} onChange={ev => nameChange(ev.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Country name</Form.Label>
                        <Form.Control type="text" value={developerRequest?.country} onChange={ev => countryChange(ev.target.value)}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <div className="d-flex gap-2">
                    <Button variant="success" onClick={saveHandler}>Save</Button>
                    <Button variant="danger" onClick={closeHandler}>Cancel</Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};
export default NewDeveloper;