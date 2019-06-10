// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


// Inicializar variables
var app = express();

// CORS
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "POST", "GET", "PUT", "DELETE", "OPTIONS");
//     next();
// });

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Importar rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var especialidadRoutes = require('./routes/especialidad');
var medicoRoutes = require('./routes/medico');
var hospitalRoutes = require('./routes/hospital');
var busquedaRoutes = require('./routes/busqueda');
var uploadRoutes = require('./routes/upload');
var imagenesRoutes = require('./routes/imagenes');


// Conexión a la base de datos
mongoose.connect('mongodb+srv://FranciscoHC:Carolinayjuan123*45@cluster0-pbius.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true
}, (err, res) => {

    if (err) throw err;

    console.log('Base de Datos: \x1b[32m%s\x1b[0m', 'online')
})

// Rutas
app.use('/upload', uploadRoutes);
app.use('/especialidad', especialidadRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/medico', medicoRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/login', loginRoutes);
app.use('/img', imagenesRoutes);

app.use('/', appRoutes);

port = process.env.PORT || 3000;
// Escuchar peticiones
app.listen(port, () => {
    console.log(`Express server puerto ${ port }: Servidor online`)
});