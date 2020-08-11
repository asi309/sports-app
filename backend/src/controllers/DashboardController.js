const Event = require('../models/Event');


module.exports = {
    async getEventById (req, res) {
        const { eventId } = req.params;
        try {
            const event = await Event.findById(eventId);

                return res.json(event);
        } catch (error) {
            
            return res.status(400).json({
                message: "Event with id doesnot exist"
            });
        }  
    },

    async getAllEvents (req, res) {
        const { sport } = req.params;
        let query = {};
        if (sport) {
            query = { sport };
        }
        try {
            const events = await Event.find(query);

            if (events) {
                return res.json(events);
            }
        } catch (error) {
            
            return res.status(400).json({
                message: "There are no events yet"
            });
        }
    }
}