const { model, Schema } = require('mongoose');

const hospitalScehma = Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { collection: 'Hospitals' });

hospitalScehma.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object
})

module.exports = model('Hospital', hospitalScehma);
