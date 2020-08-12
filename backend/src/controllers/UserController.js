const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    async createUser(request, response) {
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
                return response.json({
                    _id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                });
            }

            return response.status(400).json({
                message: 'email already in use'
            })

        } catch (error) {
            throw Error(`Error while registering new user: ${error}`);
        }
    },

    async getUserById(request, response) {
        const { userId } = request.params;

        try {
            const user = await User.findById(userId);

            return response.json(user);
        } catch (error) {
            
            return response.status(400).json({
                message: 'User id doesnot exist'
            });
        }
    }
}