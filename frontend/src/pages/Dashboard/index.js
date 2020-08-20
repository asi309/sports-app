import React, { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { Alert, Button, ButtonGroup } from 'reactstrap';
import socketio from 'socket.io-client';

import api from '../../services/api';

import './dashboard.css';

export default function Dashboard ({ history }) {
    const [events, setEvents] = useState([]);
    const [rSelected, setRSelected] = useState(null);
    const [filter, setFilter] = useState(null);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [messageHandler, setMessageHandler] = useState('');
    const [eventRequest, setEventRequest] = useState([]);
    const user = localStorage.getItem('user');
    const userId = localStorage.getItem('userId');
    
    useEffect(() => {
        getEvents()
    }, []);


    const socket = useMemo(() => (
            socketio('http://localhost:8000', { query: { user: userId } })
            ), [userId]);


    useEffect(() => {
        socket.on('registration_req', data => (setEventRequest([...eventRequest, data])))
    }, [eventRequest, socket]);
    
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
            setMessageHandler('Event deleted successfully')
            setTimeout(() => {
                setSuccess(false);
                setMessageHandler('')
                filterHandler(filter);
            }, 3000);
        } catch (error) {
            setError(true);
            setMessageHandler('Cannot delete event')
            setTimeout(() => {
                setError(false);
                setMessageHandler('');
            }, 5000);
        }
    }

    const registrationRequest = async (eventId) => {
        try{
            await api.post(`/registration/${eventId}`, {}, { headers: { user } });
            setSuccess(true);
            setMessageHandler('Registration Request Sent');
            setTimeout(() => {
                setSuccess(false);
                setMessageHandler('');
            }, 3000);
        } catch (error) {
            setError(true);
            setMessageHandler('Cannot register to this event');
            setTimeout(() => {
                setError(false);
                setMessageHandler('');
            }, 3000);
        }
    }

    const logoutHandler = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        history.push('/login');
    }

    return (
        <>
            <ul className='notifications'>
                {
                    eventRequest.map(request => {
                        console.log(request);
                        return (
                            <li key={request._id}>
                                <div>
                                    <p>
                                        <strong>{ request.user.email }</strong> requested to join your event
                                        <strong>&nbsp;{ request.event.title }</strong>
                                    </p>
                                    <ButtonGroup>
                                        <Button
                                            color='secondary'
                                            onClick={ () => {} }
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            color='danger'
                                            onClick={ () => {} }
                                        >
                                            Reject
                                        </Button>
                                    </ButtonGroup>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
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
                <ButtonGroup>
                    <Button
                        color='secondary'
                        onClick={ () => history.push('/events') }
                    >
                        Create New Event
                    </Button>
                    <Button
                        color='secondary'
                        onClick={ logoutHandler }
                    >
                        Logout
                    </Button>
                </ButtonGroup>
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
                            <Button
                                color='primary'
                                onClick={() => registrationRequest(event._id)}
                            >
                                Register
                            </Button>
                        </li>
                    ))
                }
            </ul>
            { success ? (
                <Alert className="event-validation" color="success">{ messageHandler }</Alert>
            ) : '' }
            { error ? (
                <Alert className="event-validation" color="danger">{ messageHandler }</Alert>
            ) : '' }
        </>
    );
}