import React, { useState } from 'react';
import { Button, Container, Form, FormGroup, Label, Input } from 'reactstrap';

import api from '../services/api';

export default function LoginComponent({ history }) {
    const [email, setEmail] = useState ('')
    const [password, setPassword] = useState ('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await api.post('/login', { email, password });
        const userId = response.data._id || false;

        if (userId) {
            localStorage.setItem('userId', userId);
            history.push('/dashboard');
        } else {
            const { message } = response.data;
            console.log(message);
        }
    }

    return (
        <Container>
            <h2>Login</h2>
            <Form onSubmit={ handleSubmit }>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="email" className="mr-sm-2">Email</Label>
                    <Input
                        type="email" 
                        name="email" 
                        id="email" 
                        onChange = { (e) => setEmail (e.target.value) }
                        placeholder="johndoe@example.com" />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="password" className="mr-sm-2">Password</Label>
                    <Input
                        type="password" 
                        name="password" 
                        id="password" 
                        onChange = { (e) => setPassword (e.target.value) }
                        placeholder="password" />
                </FormGroup>
                <br />
                <Button color="primary">Submit</Button>
            </Form>
        </Container>
    );
}