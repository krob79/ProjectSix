const express = require('express');
const router = express.Router();
const { projects } = require('../data.json');
const { gsap } = require('gsap');

router.use('[\/]',(req, res, next) => {
    console.log("MIDDLEWARE FOR ROOT ONLY");
    next();
});
/* GET home page. */
router.get('/', function(req, res, next) {
      res.render('index', {projects}, (err, html) => {
        console.log("I AM AT ROOT sending html");
        res.send(html);
      });
});


router.get('/about', (req, res, next) => {
    res.render('about');
});

router.get('/projects?/', (req, res, next) => {
    res.redirect('/');
});

/* GET projects page. */
router.get('/projects?/:id', function(req, res, next) {
  const projectId = req.params.id;
  const project = projects.find( ({ id }) => id === +projectId );
  
  if (project) {
    console.log(`Going to project ${projectId}...`);
    return res.render('project', { project });
  } else {
    const err = new Error("This project doesn't exist!");
    res.render('error', {message: err.message});
  }
});

router.get('/:page', function(req, res, next) {
    const pageName = req.params.page;
    const err = new Error();
    err.status = 404;
    err.message = `Looks like the page (${pageName}) you're looking for doesn't exist.`;
    res.render('page-not-found', {message: `Looks like the page (${pageName}) you're looking for doesn't exist.`});
  });

module.exports = router;