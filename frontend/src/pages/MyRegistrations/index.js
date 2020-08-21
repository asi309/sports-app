import React, { useEffect, useState } from 'react';
import moment from 'moment';

import api from '../../services/api';

export default function MyRegistrations () {
    const [registrations, setRegistrations] = useState([]);
    const user = localStorage.getItem('user');

    useEffect(() => {
        getRegistrations();
    }, []);

    const getRegistrations = async () => {

        try {
            const response = await api.get('/registrations', { headers: { user } });
            setRegistrations(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ul className='registrations'>
            {registrations.map(registration => (
                <li key={registration._id}>
                    <div>{registration.eventTitle}</div>
                    <div className='event-details'>
                        <span>Date: {moment(registration.eventDate).format('L')}</span>
                    </div>
                </li>
            ))}
        </ul>
    )
}