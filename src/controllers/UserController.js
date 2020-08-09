const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    async store(request, response) {
        try {
            const { firstName, lastName, password, email } = request.body;

            const existing_user = await User.findOne({ email });

            if (!existing_user) {
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = await User.create({
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword
                });
                return response.json(user);
            }

            return response.status(400).json({
                message: 'email already in use'
            })

        } catch (error) {
            throw Error(`Error while registering new user: ${error}`);
        }
    }
}