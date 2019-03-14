var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var hospitalSchema = new Schema({

    nombre: { type: String, required: [true, 'El nombre	es	necesario'] },
    img: { type: String, required: false },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    especialidad: { type: Schema.Types.ObjectId, ref: 'Especialidad' },
    direccion: { type: String, required: false },
    telefono: { type: String, required: false }
}, { collection: 'hospitales' });

module.exports = mongoose.model('Hospital', hospitalSchema);