import {Developer} from "../../model/Developer";
import React from "react";
import {useNavigate} from "react-router-dom";
import {Button, Card} from "react-bootstrap";

interface DeveloperViewParams {
    developer: Developer;
    onDelete: (id:number) => void;
}

const DeveloperView:React.FC<DeveloperViewParams> = ({developer, onDelete}) => {
  const navigate = useNavigate();
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
                  <Button variant="primary" onClick={() => navigate("/developers/" + developer.id)}>Detail</Button>
                  <Button variant="danger" onClick={() => onDelete(developer.id)}>Delete</Button>
              </div>
          </Card.Footer>
      </Card>
  );
};
export default DeveloperView;