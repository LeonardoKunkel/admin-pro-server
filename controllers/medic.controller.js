const Medic = require('../models/Medic');

exports.getMedics = async (req, res) => {

    const allMedics = await Medic.find().populate('user', 'name img').populate('hospital', 'name img');

    res.json({
        ok: true,
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

exports.updateMedic = (req, res) => {

    res.json({
        ok: true,
        msg: 'Medic Updated'
    })

}

exports.deleteMedic = (req, res) => {

    res.json({
        ok: true,
        msg: 'Medic deleted'
    })

}
