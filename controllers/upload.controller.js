const path = require('path');
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');
const updateImg = require('../helpers/updateImg');



exports.fileUpload = async (req, res) => {

    const type = req.params.type;
    const id = req.params.id;

    const validTypes = ['users', 'hospitals', 'medics'];
    if ( !validTypes.includes(type) ) {
        return res.status(500).json({
            ok: false,
            msg: 'Type invalid - must be user, medic or hospital'
        });
    }

    // Image Validation
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded'
        });
    }

    // Batch files
    const file = req.files.image;

    const cutName = file.name.split('.');
    const extension = cutName[ cutName.length - 1 ];

    // Extension validation
    const validExtension = ['png', 'jpg', 'jpeg', 'gif'];
    if( !validExtension.includes(extension) ) {
        return res.status(400).json({
            ok: false,
            masg: 'Invalid extension'
        })
    }

    // Name's file generation
    const fileName = `${ uuidv4() }.${ extension }`;

    // File's path
    const path = `./uploads/${ type }/${ fileName }`;

    // Move file
    file.mv(path, (err) => {
        if (err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Moving image error'
            });
        }

        // Update Database
        updateImg( type, id, fileName )


        res.json({
            ok: true,
            msg: 'File uploaded!',
            fileName
        });

    });

}

exports.returnFile = async (req, res) => {

    const type = req.params.type;
    const photo = req.params.photo;

    const pathImg = path.join( __dirname, `../uploads/${ type }/${ photo }` );

    // Default image
    if( fs.existsSync( pathImg ) ) {
        res.sendFile( pathImg );
    } else {
        const noImg = path.join( __dirname, `../uploads/no-img.jpg` );
        res.sendFile( noImg );
    }

}
