const Event = require('../models/Event');
const User = require('../models/User');

module.exports = {
    async createEvent (req, res) {
        const { title, description, price, sport, date } = req.body;
        const { filename } = req.file;
        const { user_id } = req.headers;
        
        const user = await User.findById(user_id);

        if (!user) {
            return res.status(400).json({
                message: 'User does not exist'
            });
        }

        const event = await Event.create({
            title,
            description,
            price,
            thumbnail: filename,
            sport,
            date,
            user: user_id
        })

        await event
                .populate('user', '-password')
                .execPopulate();

        return res.json({
            message: 'Event created successfully',
            event
        });
    },

    async deleteEvent (req, res) {
        const { eventId } = req.params;
        console.log(req.params)
        try {
            await Event.findByIdAndDelete(eventId);
            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({
                message: 'Event with id doesnot exist'
            })
        }
    }
}