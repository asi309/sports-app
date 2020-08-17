import React, { useState } from 'react';
import { Alert, Container, Form, FormGroup, Input } from 'reactstrap';

import api from '../../services/api';

export default function Login ({ history }) {
    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState ('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await api.post('/login', { email, password });
        const userId = response.data._id || false;

        try {
            if (userId) {
                localStorage.setItem('userId', userId);
                history.push('/');
            } else {
                const { message } = response.data;
                setError(true);
                setErrorMessage(message);
                setTimeout(() => {
                    setError(false);
                    setErrorMessage('')
                }, 5000);
            }
        } catch (error) {
            setError(true);
            setErrorMessage('ERROR: The server cannot process the request');
        }
    }

    return (
        <Container>
            <h2>Login</h2>
            <Form onSubmit={ handleSubmit }>
                <div className="input-group">
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input
                            type="email" 
                            name="email" 
                            id="email" 
                            onChange = { (e) => setEmail (e.target.value) }
                            placeholder="Enter email" />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input
                            type="password" 
                            name="password" 
                            id="password" 
                            onChange = { (e) => setPassword (e.target.value) }
                            placeholder="Enter password" />
                    </FormGroup>
                </div>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <button className="btn submit-btn">Login</button>
                    <button className="btn secondary-btn" onClick={ () => history.push('/user/register') }>
                        Register
                    </button>
                </FormGroup>
            </Form>
            { error ? (
                <Alert className="event-validation" color="danger">{ errorMessage }</Alert>
            ) : '' }
        </Container>
    );
}