var express = require('express');

var app = express();

var Hospital = require('../models/hospital');
var Medico = require('../models/medico');
var Especialidad = require('../models/especialidad');
var Usuario = require('../models/usuario');

// ==========================================
// Busqueda por coleccion
// ==========================================
app.get('/coleccion/:tabla/:busqueda', (req, res) => {

    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');
    var tabla = req.params.tabla;

    var promesa;

    switch (tabla) {
        case 'usuarios':
            promesa = buscarUsuarios(busqueda, regex);
            break;

        case 'medicos':
            promesa = buscarMedicos(busqueda, regex);
            break;

        case 'hospitales':
            promesa = buscarHospitales(busqueda, regex);
            break;

        case 'especialidades':
            promesa = buscarEspecialidades(busqueda, regex);
            break;

        default:
            return res.status(400).json({
                ok: false,
                message: 'Los tipos de busqueda sólo son: usuarios, medicos, hospitales y especialidades',
                error: { message: 'Tipo de tabla/coleccion no válido' }
            });
            break;
    }

    promesa.then(data => {

        res.status(200).json({
            ok: true,
            [tabla]: data
        });
    })

})


// ==========================================
// Busqueda General
// ==========================================
app.get('/todo/:busqueda', (req, res, next) => {

    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');

    Promise.all([
            buscarHospitales(busqueda, regex),
            buscarMedicos(busqueda, regex),
            buscarEspecialidades(busqueda, regex),
            buscarUsuarios(busqueda, regex)
        ])
        .then(respuestas => {

            res.status(200).json({
                ok: true,
                hospitales: respuestas[0],
                medicos: respuestas[1],
                especialidades: respuestas[2],
                usuarios: respuestas[3]
            });
        })

});

function buscarHospitales(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Hospital.find({ nombre: regex })
            .populate('usuario', 'nombres email img')
            .exec((err, hospitales) => {

                if (err) {
                    reject('Error al cargar hospitales', err);
                } else {
                    resolve(hospitales)
                }
            })

    });

}

function buscarMedicos(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Medico.find({ nombres: regex })
            .populate('usuario', 'nombres email img')
            .populate('hospital')
            .populate('especialidad')
            .exec((err, medicos) => {

                if (err) {
                    reject('Error al cargar medicos', err);
                } else {
                    resolve(medicos)
                }
            })

    });

}

function buscarUsuarios(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Usuario.find({}, 'nombres img email role')
            .or([{ 'nombres': regex }, { 'email': regex }])
            .exec((err, usuarios) => {

                if (err) {
                    reject('Erro al cargar usuarios', err);
                } else {
                    resolve(usuarios)
                }
            })

    });

}

function buscarEspecialidades(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Especialidad.find({ nombre: regex }, (err, especialidades) => {

            if (err) {
                reject('Error al cargar especialidades', err);
            } else {
                resolve(especialidades)
            }
        })

    });

}

module.exports = app;