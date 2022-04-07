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

exports.updateHospital = (req, res) => {

    res.json({
        ok: true,
        msg: 'Hospital updated'
    })

}

exports.deleteHospital = (req, res) => {

    res.json({
        ok: true,
        msg: 'Hospital Deleted'
    })

}
