const jwt = require('jsonwebtoken')

const tokenGenerate = ( uid ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '10h'
        }, (err, token) => {

            if ( err ) {
                console.log(err);
                reject('Token not generated');
            } else {
                resolve( token )
            }

        })

    })

}

module.exports = {
    tokenGenerate
};
