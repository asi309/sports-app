const Registration = require('../models/Registration');


module.exports = {
    async create (req, res) {
        const { user_id } = req.headers;
        const { eventId } = req.params;
        const { date } = req.body;

        const registration = await Registration.create ({
            user: user_id,
            event: eventId,
            date
        })

        await registration
            .populate('user', '-password')
            .populate('event')
            .execPopulate();

        return res.json(registration);
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