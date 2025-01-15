import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import DragDrop from './DragDrop';

function AccessCodeCard({name = "Guest", event = "Place Holder Event..."}) {
  // defaulting to gues for now before forcing name adds

  return (
    <Card className="text-center">
      <Card.Header>Welcome {name}</Card.Header>
      <Card.Body>
        <Card.Title className='upload-message'>Upload Your Photos to...</Card.Title>
        <Card.Text>
          {event}
        </Card.Text>
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '150px' }}>
          <DragDrop />
        </div>
        <Button variant="primary">Submit</Button>
      </Card.Body>
      <Card.Footer className="text-muted"></Card.Footer>
    </Card>
  );
}

export default AccessCodeCard;