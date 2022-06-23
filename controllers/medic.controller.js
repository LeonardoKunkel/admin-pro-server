const Medic = require('../models/Medic');

exports.getMedics = async (req, res) => {

    const allMedics = await Medic.find().populate('user', 'name img').populate('hospital', 'name img');

    res.json({
        ok: true,
        msg: 'Medics found',
        allMedics
    })

}

exports.createMedic = async (req, res) => {

    // User ID
    const uid = req.uid;
    // console.log(uid);

    const newMedic = new Medic({
        user: uid,
        ...req.body
    })

    try {

        await newMedic.save()

        res.json({
            ok: true,
            msg: 'Medic created!',
            newMedic
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Verify with admin'
        })
    }

}

exports.updateMedic = async (req, res) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const medicDB = await Medic.findById( id );

        if ( !medicDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Medic not found by id'
            });
        }

        const medicChanges = {
            ...req.body,
            user: uid
        }

        const medicUpdated = await Medic.findByIdAndUpdate( id, medicChanges, { new: true } )

        res.json({
            ok: true,
            msg: 'Medic updated!',
            medicDB: medicUpdated
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Verify with the admin'
        });
    }

}

exports.deleteMedic = async (req, res) => {

    const id = req.params.id;

    try {

        const medicDB = await Medic.findById( id );

        if ( !medicDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Medic not found by id'
            });
        }

        await Medic.findByIdAndDelete( id )

        res.json({
            ok: true,
            msg: 'Medic deleted!'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Verify with the admin'
        })
    }

}
