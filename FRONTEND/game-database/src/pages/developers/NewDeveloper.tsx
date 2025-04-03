import {DeveloperRequest} from "../../model/DeveloperRequest";
import React, {useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";

interface NewDeveloperParams {
    createHandler: (developer: DeveloperRequest) => void;
    externalShow: boolean;
}
export const NewDeveloper: React.FC<NewDeveloperParams> = ({createHandler, externalShow}) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [newDeveloper, setNewDeveloper] = useState<DeveloperRequest>({ name: "", country: "" });

    useEffect(() => {
        setShowModal(externalShow);
    }, [externalShow]);

    const refreshNewDeveloper = () => {
        setNewDeveloper({ name: "", country: "" });
    };

    const updateName = (newName: string) => {
        const originalDeveloper = Object.assign({}, newDeveloper);
        originalDeveloper.name = newName;
        setNewDeveloper(originalDeveloper);
    };

    const updateCountry = (newCountry: string) => {
        const originalDeveloper = Object.assign({}, newDeveloper);
        originalDeveloper.country = newCountry;
        setNewDeveloper(originalDeveloper);
    };


    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Create Developer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Developer name</Form.Label>
                        <Form.Control type="text" value={newDeveloper?.name} onChange={ev => updateName(ev.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Country</Form.Label>
                        <Form.Control type="text" value={newDeveloper?.country} onChange={ev => updateCountry(ev.target.value)}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <div className="d-flex gap-2">
                    <Button variant="success" onClick={() => createHandler(newDeveloper)}>Save</Button>
                    <Button variant="danger" onClick={() => { setShowModal(false); refreshNewDeveloper(); }}>Cancel</Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};
