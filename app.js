let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors')
let indexRouter = require('./routes/index');
const connection = require('./db/connect');
const sequelize = require('./db/connect');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


const port = process.env.PORT || 3000;
sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log("Сервер запущен на порту ", port);
        console.log("К бд подключен успешно");
    })
})
