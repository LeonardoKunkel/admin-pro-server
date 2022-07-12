const bcrypt = require('bcryptjs');
const User = require('../models/User');

const { tokenGenerate } = require('../helpers/jwt');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');

exports.login = async (req, res) => {

    const { email, password } = req.body;

    try {

        // Verufy email
        const userDB = await User.findOne({ email });

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email not found'
            })
        }

        // Verify password
        const verifyPassword = bcrypt.compareSync( password, userDB.password );

        if ( !verifyPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password invalid'
            })
        }

        // Token creation
        const token = await tokenGenerate( userDB._id );

        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd( userDB.role )
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        })
    }

}

exports.renewToken = async (req, res) => {

    const uid = req.uid;

    const token = await tokenGenerate( uid );

    const user = await User.findById( uid );

    res.json({
        ok: true,
        token,
        user,
        menu: getMenuFrontEnd( user.role )
    })

}
