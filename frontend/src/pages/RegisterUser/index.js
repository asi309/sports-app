import React, { useState } from 'react';
import { Alert, Container, Form, FormGroup, Input } from 'reactstrap';

import api from '../../services/api';

export default function RegisterUser ({ history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (
                email !== '' &&
                password != '' &&
                firstName != '' &&
                lastName != ''
               ) {

                    const response = await api.post('/user/register', {firstName, lastName, email, password});
                    const userId = response.data._id || false;
                    
                    if (userId) {
                        localStorage.setItem('userId', userId);
                        history.push('/dashboard');
                    } else {
                        const { message } = response.data;
                        setError(true);
                        setErrorMessage(message);
                        setTimeout(() => {
                            setError(false);
                            setErrorMessage('');
                        }, 5000);
                    }
               } else {
                    setError(true);
                    setErrorMessage(`Required field missing! Fill all the fields to register`);
                    setTimeout(() => {
                        setError(false);
                        setErrorMessage('');
                    }, 5000);
               }
    
        } catch (error) {
            console.log(`Request failed - ${error}`)
        }
    }

    return (
        <Container>
            <h2>Signup</h2>
            <Form onSubmit={ handleSubmit }>
                <div className="input-group">
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Input
                                type="text" 
                                name="firstName" 
                                id="firstName" 
                                onChange = { (e) => setFirstName (e.target.value) }
                                placeholder="Your First Name"
                                value={ firstName }
                            />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Input
                                type="text" 
                                name="lastName" 
                                id="lastName" 
                                onChange = { (e) => setLastName (e.target.value) }
                                placeholder="Your Last Name"
                                value={ lastName }
                            />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input
                            type="email" 
                            name="email" 
                            id="email" 
                            onChange = { (e) => setEmail (e.target.value) }
                            placeholder="Enter email"
                            value={ email }
                        />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input
                            type="password" 
                            name="password" 
                            id="password" 
                            onChange = { (e) => setPassword (e.target.value) }
                            placeholder="Choose a password" />
                    </FormGroup>
                </div>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <button className="btn btn-submit">Signup</button>
                    <button className="btn btn-secondary" onClick={ () => history.push('/login')}>
                        Login instead?
                    </button>
                </FormGroup>
            </Form>
            { error ? (
                <Alert className="event-validation" color="danger">{ errorMessage }</Alert>
            ) : '' }
        </Container>
    );
}