import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
const EventCreatedWithCode = ({ event }) => {
    return (
        <div>
            <h1>Event Created!</h1>
            <p>Here is the Access Code needed to access the Event Gallery: <span className='fw-bold text-primary'>{event.access_code}</span></p>
            <Button variant="secondary" onClick={() => {
                navigator.clipboard.writeText(event.access_code);
            }} className='mx-2'>Copy Access Code</Button>
            <Button variant="primary">Take me to the Event Gallery!</Button>
        </div>
    );
};

export default EventCreatedWithCode;

EventCreatedWithCode.propTypes = {
    event: PropTypes.shape({
        event_title: PropTypes.string.isRequired,
        event_description: PropTypes.string.isRequired,
        event_date: PropTypes.string.isRequired,
        access_code: PropTypes.string.isRequired
    }).isRequired
};
