import React, { useState, useMemo } from 'react';
import { Alert, Button, Container, Form, FormGroup, Label, Input } from 'reactstrap';

import api from '../../services/api';
import CameraIcon from '../../assets/camera.png';
import './events.css';

export default function Events () {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [sport, setSport] = useState('');
    const [price, setPrice] = useState(0);
    const [thumbnail, setThumbnail] = useState(null);
    const [date, setDate] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const user_id = localStorage.getItem('userId');
        const eventData = new FormData();

        eventData.append('thumbnail', thumbnail);
        eventData.append('sport', sport);
        eventData.append('title', title);
        eventData.append('description', description);
        eventData.append('price', price);
        eventData.append('date', date);

        try {
            if (
                title !== '' &&
                description !== '' &&
                sport !== '' &&
                thumbnail !== null &&
                price !== 0 &&
                date !== ''
            ) {
                await api.post('/event', eventData, { headers: { user_id }})
            } else {
                setError(true);
                setErrorMessage('Missing required information');
                setTimeout(() => {
                    setError(false);
                    setErrorMessage('');
                }, 5000);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container>
            <h2>Create New Event</h2>
            <Form onSubmit={ handleSubmit }>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="thumbnail" className="mr -sm-2">Upload Image</Label>
                    <Label 
                        className={ thumbnail ? 'has-thumbnail' : '' }
                        id="thumbnail"
                        style={{ backgroundImage: `url(${preview})` }}
                    >
                        <Input
                            type="file"
                            name="thumbnail"
                            id="thumbnail"
                            onChange={ e => setThumbnail(e.target.files[0]) }
                        />
                        <img src={ CameraIcon } style={{ maxWidth: "50px" }} alt="upload image icon" />
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label for="sport" className="mr-sm-2">Sport</Label>
                    <Input
                        type="text"
                        name="sport"
                        id="sport"
                        onChange={ e => setSport(e.target.value) }
                        placeholder="Sport Name"
                        value={ sport }
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="title" className="mr-sm-2">Title</Label>
                    <Input
                        type="text"
                        name="title"
                        id="title"
                        onChange={ e => setTitle(e.target.value) }
                        placeholder="Title for your event"
                        value={ title }
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="description" className="mr-sm-2">Event Description</Label>
                    <Input
                        type="text"
                        name="description"
                        id="description"
                        onChange={ e => setDescription(e.target.value) }
                        placeholder="Describe your event"
                        value={ description }
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="price" className="mr-sm-2">Price</Label>
                    <Input
                        type="text"
                        name="price"
                        id="price"
                        onChange={ e => setPrice(e.target.value) }
                        placeholder="Price for your event - ($0.00)"
                        value={ price }
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="date" className="mr-sm-2">Date</Label>
                    <Input
                        type="date"
                        name="date"
                        id="date"
                        onChange={ e => setDate(e.target.value) }
                        value={ date }
                    />
                </FormGroup>
                <FormGroup>
                    <button className="btn btn-submit">Create Event</button>
                </FormGroup>
            </Form>
            { error ? (
                <Alert className="event-validation" color="danger">{ errorMessage }</Alert>
            ) : '' }
        </Container>
    )
}