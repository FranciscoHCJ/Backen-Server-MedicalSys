var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var especialidadSchema = new Schema({

    nombre: { type: String, required: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    medico: { type: Schema.Types.ObjectId, ref: 'Medico', required: true },
    hospital: { type: Schema.Types.ObjectId, ref: 'Hospital', required: [true, 'El id hospital es un campo obligatorio'] }
}, { collection: 'especialidades' });

module.exports = mongoose.model('Especialidad', especialidadSchema);