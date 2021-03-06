var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

// ==========================================
// Verificar token
// ==========================================
exports.verificaToken = function(req, res, next) {

    var token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto',
                errors: err
            });
        }

        req.usuario = decoded.usuario;

        next();
    });
}

// ==========================================
// Verificar Admin
// ==========================================
exports.verificaAdmin_ROLE = function(req, res, next) {

    var usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
        return;
    } else {
        return res.status(401).json({
            ok: false,
            mensaje: 'Token incorrecto',
            errors: err
        });
    }
}

// ==========================================
// Verificar Admin o mismo usuario
// ==========================================
exports.verificaAdmin_o_MismoUsuario = function(req, res, next) {

    var usuario = req.usuario;
    var id = req.body;

    if (usuario.role === 'ADMIN_ROLE' || usuario._id === id) {
        next();
        return;
    } else {
        return res.status(401).json({
            ok: false,
            mensaje: 'Token incorrecto',
            errors: err
        });
    }
}