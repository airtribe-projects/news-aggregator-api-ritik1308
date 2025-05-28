const User= require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const preferences = async (req, res, next) => {
    try {
        const email = req.user.response.email;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({
                status: 404,
                message: 'User not found'
            });
        }

        return res.status(200).send({
            status: 200,
            preferences: user.preferences
        });

    } catch (err) {
        console.log(err);
        console.log(err.message);
        return res.status(500).send({ status: 500 });
    }
};


const setPreferences = async (req, res, next) => {
    try {
        const { preferences } = req.body;

        if (!preferences) {
            return res.status(400).send({
                status: 400,
                message: 'Preferences are required.'
            });
        }

        const data = await User.findByIdAndUpdate(
            req.user.response._id, 
            { preferences }, 
            { new: true } // Return the updated document
        );

        if (!data) {
            return res.status(404).send({
                status: 404,
                message: 'User not found.'
            });
        }

        return res.status(200).send({
            status: 200,
            data
        });

    } catch (err) {
        console.error(err.message);
        return res.status(500).send({
            status: 500,
            message: 'Internal server error'
        });
    }
};

module.exports={
    preferences,
    setPreferences
}

