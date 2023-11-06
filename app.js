const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const cors = require('cors');
const app = express();
const { checkDBConnect, sequelize } = require('./connect')
const blessing = require('./routes/blessing');
const service = require('./src/service')
app.use(cors());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.text()); 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('pages/welcome');
    return;
});
app.use('/blessing', multipartMiddleware, blessing);
app.use('/service', service)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
checkDBConnect()
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});



module.exports = app;
  