const express = require('express');
const app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('public'));

var indexRouter = require('./routes/index');
app.use('/', indexRouter);


app.listen(3000, () => {
    console.log("The application is running! Yee haw!");
});

app.get('/about', (req, res, next) => {
    res.render('about');
});

// error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = err;
    res.status(err.status || 500);
    res.render('error');
});
  