const Hospital = require('../models/Hospital');

exports.getHospitals = async (req, res) => {

    const allHospitals = await Hospital.find().populate('user', 'name img');

    res.json({
        ok: true,
        allHospitals
    })

}

exports.createHospital = async (req, res) => {

    // Id del usuario
    const uid = req.uid;
    // console.log(uid);
    const newHospital = new Hospital({
        user: uid,
        ...req.body
    });

    try {

        await newHospital.save()

        res.json({
            ok: true,
            newHospital
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Verify with the admin'
        })
    }

}

exports.updateHospital = async (req, res) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const hospitalDB = await Hospital.findById( id );

        if ( !hospitalDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital not found by id'
            });
        }

        const hospitalChanges = {
            ...req.body,
            user: uid
        }

        const hospitalUpdated = await Hospital.findByIdAndUpdate( id, hospitalChanges, { new: true } )

        res.json({
            ok: true,
            msg: 'Hospital updated',
            hospitalDB: hospitalUpdated
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Verify with the admin'
        });
    }

}

exports.deleteHospital = async (req, res) => {

    const id = req.params.id;

    try {

        const hospitalDB = await Hospital.findById( id );

        if ( !hospitalDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital not found by id'
            });
        }

        await Hospital.findByIdAndDelete( id )

        res.json({
            ok: true,
            msg: 'Hospital deleted'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Verify with the admin'
        })
    }

}
