const jwt = require('jsonwebtoken')

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

module.exports = jwtValidation;
