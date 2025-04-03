import {useEffect, useState} from "react";
import {Developer} from "../../model/Developer";
import ApiClient from "../../client/ApiClient";
import DeveloperView from "./DeveloperView";
import {Button, Form, InputGroup, Stack} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {DeveloperRequest} from "../../model/DeveloperRequest";
import { NewDeveloper } from "./NewDeveloper";


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

    const onDelete = (id:number) => {
        ApiClient.deleteDeveloper(id).then(() => {
            let originalList = developers?.filter(x => x.id !== id);
            setDevelopers(originalList);
        }).catch(err => alert(JSON.stringify(err)));
    };

    const onUpdate = (id: number) => {
        navigate("/developers/" + id);
    };

    const createDeveloper = (newDeveloper: DeveloperRequest) => {
        ApiClient.createDeveloper(newDeveloper).then(d => {
            const originalDevelopers = developers?.slice();
            originalDevelopers?.push(d);
            setShowModal(false);
            setDevelopers(originalDevelopers);
        });
    };


    return (
        <>
            <Stack direction="horizontal" gap={4}>
                <h2>Developers</h2>
                <Button variant="success" size="sm" onClick={() => setShowModal(true)}>+</Button>
                <InputGroup>
                    <InputGroup.Text>Search</InputGroup.Text>
                    <Form.Control value={searchQuery} type="text" onChange={ev => setSearchQuery(ev.target.value)} />
                    {searchQuery ? <Button variant="danger" onClick={() => setSearchQuery("")}>X</Button> : ""}
                </InputGroup>
            </Stack>
            <hr />
            <Stack direction="horizontal" gap={3} className="mt-3">
                {
                    developers ? developers.map((developer, i) => <DeveloperView key={i} developer={developer} deleteHandler={onDelete} updateHandler={onUpdate} />) : <p>No developers was found</p>
                }
                <Button variant="success" size="lg" onClick={() => setShowModal(true)}>Add more</Button>
            </Stack>
            <NewDeveloper externalShow={showModal} createHandler={developer => createDeveloper(developer)} />
        </>
    );
};
export default DevelopersPage;