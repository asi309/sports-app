import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Alert, Button, ButtonGroup } from 'reactstrap';

import api from '../../services/api';

import './dashboard.css';

export default function Dashboard ({ history }) {
    const [events, setEvents] = useState([]);
    const [rSelected, setRSelected] = useState(null);
    const [filter, setFilter] = useState(null);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const user = localStorage.getItem('user');
    const userId = localStorage.getItem('userId');
    
    useEffect(() => {
        getEvents()
    }, []);
    
    const filterHandler = (query) => {
        setFilter(query);
        setRSelected(query);
        getEvents(query);
    }

    const myEventsHandler = async () => {
        try {
            setRSelected('myEvents');
            const response = await api.get('/user/events', { headers: { user } });
            setEvents(response.data.events);
        } catch (error) {
            history.push('/login');
        }
    }

    const getEvents = async (filter) => {
        try{
            const url = filter ? `/dashboard/${filter}` : '/dashboard';
            const response = await api.get(url, { headers: {user} });
    
            setEvents(response.data.events);
        } catch (error) {
            history.push('/login');
        }
    }

    const deleteEventHandler = async (eventId) => {
        try {
            await api.delete(`/event/${eventId}`, { headers: {user} });
            setSuccess(true);
            setSuccessMessage('Deleted event successfully');
            setTimeout(() => {
                setSuccess(false);
                setSuccessMessage('');
                filterHandler(filter);
            }, 3000);
        } catch (error) {
            setError(true);
            setErrorMessage('Cannot delete event');
            setTimeout(() => {
                setError(false);
                setErrorMessage('');
            }, 5000);
        }
    }

    return (
        <>
            <div className="filter-panel">
                <ButtonGroup>
                    <Button
                        color="primary"
                        onClick={() => filterHandler(null)}
                        active={rSelected === null}
                    >
                        All
                    </Button>
                    <Button
                        color="primary"
                        onClick={myEventsHandler}
                        active={rSelected === 'myEvents'}
                    >
                        My Events
                    </Button>
                    <Button
                        color="primary"
                        onClick={() => filterHandler('cycling')}
                        active={rSelected === 'cycling'}
                    >
                        Cycling
                    </Button>
                    <Button
                        color="primary"
                        onClick={() => filterHandler('running')}
                        active={rSelected === 'running'}
                    >
                        Running
                    </Button>
                    <Button
                        color="primary"
                        onClick={() => filterHandler('swimming')}
                        active={rSelected === 'swimming'}
                    >
                        Swimming
                    </Button>
                </ButtonGroup>
                <Button
                    color='secondary'
                    onClick={ () => history.push('/events') }
                >
                    Create New Event
                </Button>
            </div>
            <ul className='events-list'>
                {
                    events.map((event) => (
                        <li key={event._id}>
                            <header style={{ backgroundImage: `url(${event.thumbnail_url})`}}>
                                <div className="list-actions">    
                                    {event.user === userId ? 
                                        <Button
                                            color='danger'
                                            size="sm"
                                            onClick={ () => deleteEventHandler(event._id) }
                                        >
                                            Delete
                                        </Button> : ''
                                    }
                                </div>
                            </header>
                            <strong>{ event.title }</strong>
                            <span>Event Date: { moment(event.date).format('l') }</span>
                            <span>Price: ${ parseFloat(event.price).toFixed(2) }</span>
                            <span>About: { event.description }</span>
                            <Button color='primary'>Subscribe</Button>
                        </li>
                    ))
                }
            </ul>
            { success ? (
                <Alert className="event-validation" color="success">{ successMessage }</Alert>
            ) : '' }
            { error ? (
                <Alert className="event-validation" color="danger">{ errorMessage }</Alert>
            ) : '' }
        </>
    );
}