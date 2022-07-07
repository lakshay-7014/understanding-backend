const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// importing required controller(s)
const getController = require('./controllers/error');
// const User = require('./models/user');

const app = express(); // running express as function

app.set('view engine', 'ejs'); // this would set template engine to ejs
app.set('views', 'views'); // this can be omitted here, as it is useful when we uses name other than views

// importing route(s)
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//     User.findById('62c4696244884fe398dd7ff5')
//         .then((user) => {
//             req.user = new User(user.name, user.email, user.cart, user._id);
//             next();
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// utilizing the imported route(s)
app.use('/admin', adminRoutes); // '/admin' is used to filter url
app.use(shopRoutes);

// utilizing the imported controller(s)
app.use(getController.get404);

mongoose
    .connect(
        'mongodb+srv://arpit:admin@cluster0.numu8.mongodb.net/shop?retryWrites=true&w=majority'
    )
    .then((result) => {
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });
