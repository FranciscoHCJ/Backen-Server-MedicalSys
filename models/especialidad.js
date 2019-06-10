var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var especialidadSchema = new Schema({

    nombre: { type: String, required: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
}, { collection: 'especialidades' });

module.exports = mongoose.model('Especialidad', especialidadSchema);