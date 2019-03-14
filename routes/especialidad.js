var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Especialidad = require('../models/especialidad');

// ==========================================
// Obtener todos las Especialidades
// ==========================================
app.get('/', (req, res, netx) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Especialidad.find({})
        .skip(desde)
        .limit(5)
        .exec(
            (err, especialidades) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando especialidad',
                        errors: err
                    });
                }

                Especialidad.count({}, (err, conteo) => {

                    res.status(200).json({
                        ok: true,
                        especialidades,
                        total: conteo
                    });
                })

            })
});

// ==========================================
// Actualizar Especialidad
// ==========================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Especialidad.findById(id, (err, especialidad) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar especialidad',
                errors: err
            });
        }

        if (!especialidad) {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'La especialidad con el id ' + id + ' no existe!',
                    errors: { message: 'No existe una especialidad con ese ID' }
                });
            }
        }

        especialidad.nombre = body.nombre;
        especialidad.usuario = req.usuario._id;
        especialidad.hospital = body.hospital;
        especialidad.medico = body.medico;

        especialidad.save((err, especialidadGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Erro al actualizar especialidad',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                especialidad: especialidadGuardado
            });

        });

    });

});

// ==========================================
// Crear una nueva Especialidad
// ==========================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var especialidad = new Especialidad({
        nombre: body.nombre,
        usuario: req.usuario._id,
        medico: body.medico,
        hospital: body.hospital
    });

    especialidad.save((err, especialidadGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear especialidad',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            especialidad: especialidadGuardado
        });

    });
});

// ==========================================
// Borrar una especialidad por el id
// ==========================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;

    Especialidad.findByIdAndRemove(id, (err, especialidadBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar especialidad',
                errors: err
            });
        }

        if (!especialidadBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe una especialidad con ese id',
                errors: { message: 'No existe una especialidad con ese id: ' + id }
            });
        }

        res.status(200).json({
            ok: true,
            especialidad: especialidadBorrado
        });
    })
});

module.exports = app;