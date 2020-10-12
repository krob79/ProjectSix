const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'pug');

app.use('/static', express.static('public'));

var indexRouter = require('./routes/index');
app.use('/', indexRouter);

/* Global error handler */
app.use((err, req, res, next) => {

    if (err) {
      console.log('Global error handler called', err);
    }
      if(err.status === 404){
         res.status(404).render('page-not-found', {message: err.message});
      } else {
          err.message = err.message || `Oops! It looks like something went wrong on the server`;
          console.log(`ERROR: ${err.message}`);
          res.status(err.status || 500).render(`error`, {message: err.message});
      }
  });

app.listen(port, () => {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log(`     PROJECT SIX IS RUNNING!`); //http://localhost:3000/
    console.log(`     http://localhost:${port}/`);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
});
  