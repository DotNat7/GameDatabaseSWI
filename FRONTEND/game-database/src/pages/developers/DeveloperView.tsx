import {Developer} from "../../model/Developer";
import React from "react";
import {useNavigate} from "react-router-dom";
import {Button, Card} from "react-bootstrap";

interface DeveloperViewParams {
    developer: Developer;
    deleteHandler: (id: number) => void;
    updateHandler: (id: number) => void;
}

const DeveloperView:React.FC<DeveloperViewParams> = ({developer, deleteHandler, updateHandler}) => {
  return (
      <Card className='mb-3 border-success shadow'>
          <Card.Header className='bg-success text-light'>
              <strong>{developer.name}</strong>
          </Card.Header>
          <Card.Body>
              {developer.country ? <span>Country: {developer.country}</span> : <></>}
          </Card.Body>
          <Card.Footer>
              <div className="d-flex justify-content-around gap-2">
                  <Button variant='primary' onClick={() => updateHandler.call(this, developer.id)}>Update</Button>
                  <Button variant='danger' onClick={() => deleteHandler.call(this, developer.id)}>Delete</Button>
              </div>
          </Card.Footer>
      </Card>
  );
};
export default DeveloperView;