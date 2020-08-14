import React, { useState } from 'react';
import { Container, Form, FormGroup, Label, Input } from 'reactstrap';

import api from '../../services/api';

export default function RegisterUser ({ history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/user/register', {firstName, lastName, email, password});
            const userId = response.data._id || false;
    
            if (userId) {
                localStorage.setItem('userId', userId);
                history.push('/dashboard');
            } else {
                const { message } = response.data;
                console.log(message);
            }
        } catch (error) {
            console.log(`Request failed - ${error}`)
        }
    }

    return (
        <Container>
            <h2>Signup</h2>
            <Form onSubmit={ handleSubmit }>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="firstName" className="mr-sm-2">First Name</Label>
                        <Input
                            type="text" 
                            name="firstName" 
                            id="firstName" 
                            onChange = { (e) => setFirstName (e.target.value) }
                            placeholder="Your First Name"
                            value={ firstName }
                        />
                </FormGroup>
                <FormGroup>
                    <Label for="lastName" className="mr-sm-2">Last Name</Label>
                        <Input
                            type="text" 
                            name="lastName" 
                            id="lastName" 
                            onChange = { (e) => setLastName (e.target.value) }
                            placeholder="Your Last Name"
                            value={ lastName }
                        />
                </FormGroup>
                <FormGroup>
                    <Label for="email" className="mr-sm-2">Email</Label>
                    <Input
                        type="email" 
                        name="email" 
                        id="email" 
                        onChange = { (e) => setEmail (e.target.value) }
                        placeholder="johndoe@example.com"
                        value={ email }
                    />
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
                <button className="btn btn-submit">Signup</button>
            </Form>
        </Container>
    );
}