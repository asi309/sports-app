const jwt = require('jsonwebtoken');
const Registration = require('../models/Registration');


module.exports = {
    create (req, res) {
        jwt.verify(req.token, 'secret', async (error, authData) => {
            if (error) {
                res.status(401).send();
            } else {
                const { user } = authData;
                const { eventId } = req.params;
        
                const registration = await Registration.create ({
                    user: user._id,
                    event: eventId
                })
        
                await registration
                    .populate('user', '-password')
                    .populate('event')
                    .execPopulate();
                    
                const ownerSocket = req.connectedUsers[registration.event.user];

                if (ownerSocket) {
                    req.io.to(ownerSocket).emit('registration_req', registration);
                }
        
                return res.json(registration);
            }
        })
    },

    async getRegistration (req, res) {
        const { registrationId } = req.params;
        try {
            const registration = await Registration.findById(registrationId);
            await registration
                .populate('user', '-password')
                .populate('event')
                .execPopulate();
                
            res.json(registration);
        } catch (error) {

            res.status(400).json({
                message: 'Registration not found'
            })
        }
    }
}