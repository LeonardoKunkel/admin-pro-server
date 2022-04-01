const User = require('../models/User')

exports.getUsers = (req, res) => {

    res.json({
        ok: true,
        msg: 'Users found',
        users: []
    });

}

exports.createUser = async (req, res) => {

    const { name, lastname, email, password } = req.body;

    const user = new User( req.body );

    await user.save();

    res.json({
        ok: true,
        msg: 'User Created',
        user
    })

}
