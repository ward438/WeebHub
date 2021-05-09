const path = require('path');
const express = require('express');
// const exphbs = require('express-handlebars');
// const hbs = exphbs.create({});
const expbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const cookieParser = require('cookie-parser');
const { passport } = require('./auth');
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const session = require('express-session');
const Handlebars = require('handlebars')
const FileStore = require('session-file-store')(session);

const hbs = expbs.create({
    defaultLayout: 'index',
    layoutsDir: path.join(__dirname, 'views'),
    partialsDir: path.join(__dirname, 'views/partials'),

    helpers: {}
});

// const handlebars = require('express-handlebars').create({
//     layoutsDir: path.join(__dirname, "views"),
//     partialsDir: path.join(__dirname, "views/partials"),
//     defaultLayout: 'index',
//     extname: 'hbs'
// });

const app = express();
const PORT = process.env.PORT || 3002;


dotenv.config();
app.use(require('cookie-parser')());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: new FileStore({ path: path.join(__dirname, 'sessions') }),
}));
app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', hbs.engine);
// app.set('view engine', 'hbs');
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use('/bootstrap', express.static((__dirname + '/node_modules/bootstrap/dist')))
app.use(express.static(path.join(__dirname, '/public')));

app.use(routes);

sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});