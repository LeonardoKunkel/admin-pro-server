const jwt = require('jsonwebtoken')
const User = require('../models/User')

const jwtValidation = (req, res, next) => {

    // Read token
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'There is no token in the request'
        })
    }

    try {

        const { uid } = jwt.verify( token, process.env.JWT_SECRET );

        req.uid = uid;

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Token invalid'
        })
    }

}

const adminValidation = async (req, res, next) => {

    const uid = req.uid;

    try {

        const userDB = await User.findById(uid);

        if( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'User does not exists'
            });
        }

        if( userDB.role !== 'ADMIN_ROLE' ) {
            return res.status(403).json({
                ok: false,
                msg: 'You do not have access'
            });
        }

        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Verify with admin'
        })
    }

}

const adminOrSameUserValidation = async (req, res, next) => {

    const uid = req.uid;
    const id = req.params.id;

    try {

        const userDB = await User.findById(uid);

        if( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'User does not exists'
            });
        }

        if( userDB.role === 'ADMIN_ROLE' || uid === id ) {
            
            nest();

        } else {
            return res.status(403).json({
                ok: false,
                msg: 'You do not have access'
            });
        }

        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Verify with admin'
        })
    }

}

module.exports = {
    jwtValidation,
    adminValidation,
    adminOrSameUserValidation
};
