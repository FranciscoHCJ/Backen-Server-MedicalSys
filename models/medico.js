var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var medicoSchema = new Schema({

    nombres: { type: String, required: [true, 'El nombre es necesario'] },
    apellidoPaterno: { type: String, required: [true, 'El apellido paterno es necesario'] },
    apellidoMaterno: { type: String, required: [true, 'El apellido materno es necesario'] },
    cedula: { type: String, required: false },
    img: { type: String, required: false },
    telefono: { type: String, required: false },
    especialidad: { type: Schema.Types.ObjectId, ref: 'Especialidad', required: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    hospital: { type: Schema.Types.ObjectId, ref: 'Hospital', required: [true, 'El id hospital es un campo obligatorio'] }
}, { collection: 'medicos' });

module.exports = mongoose.model('Medico', medicoSchema);