const User = require('../models/User');
const Hospital = require('../models/Hospital');
const Medic = require('../models/Medic')

exports.getAll = async ( req, res ) => {

    const search = req.params.search;
    const regex = new RegExp( search, 'i' );

    const [ users, hospitals, medics ] = await Promise.all([
        User.find({ name: regex }),
        Hospital.find({ name: regex }),
        Medic.find({ name: regex })
    ])

    res.json({
        ok: true,
        users,
        hospitals,
        medics
    })
}

exports.getCollection = async (req, res) => {

    const table = req.params.table;
    const search = req.params.search;

    // Búsqueda sensible. Si colocamos una letra, nos trae todos los datos que tengan esa letra
    const regex = new RegExp( search, 'i' );

    let data = [];

    switch ( table ) {
        case 'medics':
            data = await Medic.find({ name: regex })
                                .populate('user', 'name img')
                                .populate('hospital', 'name img');
        break;

        case 'hospitals':
            data = await Hospital.find({ name: regex })
                                    .populate('user', 'name img');
        break;

        case 'users':
            data = await User.find({ name: regex });
        break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'Table must be users/medics/hospitals'
            });

    }

    res.status(200).json({
        ok: true,
        results: data
    });

}
