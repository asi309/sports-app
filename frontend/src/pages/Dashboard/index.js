import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Button, ButtonGroup } from 'reactstrap';

import api from '../../services/api';

import './dashboard.css';

export default function Dashboard ({ history }) {
    const [events, setEvents] = useState([]);
    const [rSelected, setRSelected] = useState(null);
    const userId = localStorage.getItem('userId');
    
    useEffect(() => {
        getEvents()
    }, []);
    
    const filterHandler = (query) => {
        setRSelected(query);
        getEvents(query);
    }

    const getEvents = async (filter) => {
        const url = filter ? `/dashboard/${filter}` : '/dashboard';
        const response = await api.get(url, { headers: {userId} });

        setEvents(response.data);
    }
    
    return (
        <>
            <div>
                <span>Filter: </span>
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
                            <header style={{ backgroundImage: `url(${event.thumbnail_url})`}} />
                            <strong>{ event.title }</strong>
                            <span>Event Date: { moment(event.date).format('l') }</span>
                            <span>Price: ${ parseFloat(event.price).toFixed(2) }</span>
                            <span>About: { event.description }</span>
                            <Button color='primary'>Subscribe</Button>
                        </li>
                    ))
                }
            </ul>
        </>
    );
}