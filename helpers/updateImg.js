const fs = require('fs');

const User = require('../models/User');
const Medic = require('../models/Medic');
const Hospital = require('../models/Hospital');

const deleteImage = ( path ) => {

    if( fs.existsSync( path ) ) {
        // Old image deleted
        fs.unlinkSync( path );
    }

}

const updateImage = async ( type, id, fileName ) => {

    let oldPath = '';

    switch ( type ) {
        case 'medics':
            const medic = await Medic.findById(id);
            if( !medic ) {
                console.log('No medic');
                return false;
            }

            oldPath = `./uploads/medics/${ medic.img }`;
            deleteImage(oldPath);

            medic.img = fileName;
            await medic.save()
            return true;

        break;

        case 'hospitals':
            const hospital = await Hospital.findById(id);
            if( !hospital ) {
                console.log('No hospital');
                return false;
            }

            oldPath = `./uploads/hospitals/${ hospital.img }`;
            deleteImage(oldPath);

            hospital.img = fileName;
            await hospital.save()
            return true;
        break;
        case 'users':
            const user = await User.findById(id);
            if( !user ) {
                console.log('No user');
                return false;
            }

            oldPath = `./uploads/users/${ user.img }`;
            deleteImage(oldPath);

            user.img = fileName;
            await user.save()
            return true;
        break;
    
        default:
            break;
    }

}

module.exports = updateImage;
