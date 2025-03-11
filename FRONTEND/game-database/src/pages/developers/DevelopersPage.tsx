import {useEffect, useState} from "react";
import {Developer} from "../../model/Developer";
import ApiClient from "../../client/ApiClient";
import {GameRequest} from "../../model/GameRequest";
import {DeveloperRequest} from "../../model/DeveloperRequest";
import {Button, Form, InputGroup, Stack} from "react-bootstrap";
import GameView from "../games/GameView";
import NewGame from "../games/NewGame";
import DeveloperView from "./DeveloperView";
import NewDeveloper from "./NewDeveloper";
import {useNavigate} from "react-router-dom";

const DevelopersPage = () => {
    const [developers, setDevelopers] = useState<Developer[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const navigate = useNavigate();
    useEffect(() => {
        if (searchQuery) {
            ApiClient.searchDevelopers(searchQuery).then(developers => {
                setDevelopers(developers);
            }).catch(err => alert(JSON.stringify(err)));
        } else {
            ApiClient.getAllDevelopers().then(developers => {
                setDevelopers(developers);
            }).catch(err => alert(JSON.stringify(err)));
        }
    }, [searchQuery]);
    const saveDeveloper = (developerRequest: DeveloperRequest) => {
        ApiClient.saveDeveloper(developerRequest).then(d => {
            const originalDevelopers = developers.slice();
            originalDevelopers?.push(d);
            setShowModal(false);
            setDevelopers(originalDevelopers);
        });
    };
    const deleteDeveloper = (id:number) => {
        ApiClient.deleteDeveloper(id).then(() => {
            let originalList = developers?.filter(x => x.id !== id);
            setDevelopers(originalList);
        }).catch(err => alert(JSON.stringify(err)));
    };
    const onUpdate = (id: number) => {
        navigate("/developers/" + id);
    };
    return (
        <>
            <Stack direction="horizontal" gap={4}>
                <h2>Developers</h2>
                <InputGroup>
                    <InputGroup.Text>Search</InputGroup.Text>
                    <Form.Control value={searchQuery} type="text" onChange={ev => setSearchQuery(ev.target.value)} />
                    {searchQuery ? <Button variant="danger" onClick={() => setSearchQuery("")}>X</Button> : ""}
                </InputGroup>
            </Stack>
            <Stack direction="horizontal" gap={3} className="mt-3">
                {developers.map((developer, index) => <DeveloperView onDelete={deleteDeveloper} developer={developer} key={index} /> )}
                <Button variant="success" size="lg" onClick={() => setShowModal(true)}>Add more</Button>
            </Stack>
            <NewDeveloper show={showModal} onClose={() => setShowModal(false)} onSave={dr => saveDeveloper(dr)} />
        </>
    );
};
export default DevelopersPage;