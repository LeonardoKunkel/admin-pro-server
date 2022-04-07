const { response } = require('express');
const bcrypt = require('bcryptjs')

const User = require('../models/User');

const { tokenGenerate } = require('../helpers/jwt');

exports.getUsers = async (req, res) => {

    // Pagination
    const from = Number(req.query.from) || 0;

    const [ users, totalUsers ] = await Promise.all([

        User
            .find({}, 'name email role google img')
            // Pagination
            .skip( from )
            .limit( 5 ),

        User.countDocuments()

    ]);

    res.json({
        ok: true,
        msg: 'Users found',
        users,
        totalUsers
    });

}

exports.createUser = async (req, res) => {

    const { name, lastname, email, password } = req.body;

    try {

        const existEmail = await User.findOne({ email })

        if( existEmail ) {
            return res.status(400).json({
                ok: false.valueOf,
                msg: 'Email is already registered'
            });
        }

        const user = new User( req.body );

        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync( password, salt );

        await user.save();

        const token = await tokenGenerate( user._id );

        res.json({
            ok: true,
            user,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error unexpected'
        })
    }

}

exports.updateUser = async (req, res) => {

    const uid = req.params.id;

    try {

        const userDB = await User.findById( uid );

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'User with the id does not exist'
            })
        }

        const { password, google, email, ...campos} = req.body;

        if ( userDB.email !== email ) {

            const existEmail = await User.findOne({ email });
            if ( existEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Email is already registered'
                })
            }

        }

        campos.email = email;

        const userUpdated = await User.findByIdAndUpdate( uid, campos, { new: true } )

        res.json({
            ok: true,
            user: userUpdated
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error unexpected'
        })
    }

}

exports.deleteUser = async (req, res) => {

    const uid = req.params.id;

    try {

        const userDB = await User.findById( uid );

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'User with the id does not exist'
            })
        }

        await User.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'User deleted'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error unexpected'
        })
    }

}
