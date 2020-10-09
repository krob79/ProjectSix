const express = require('express');
const router = express.Router();
const { projects } = require('../data.json');
const { fadeOut } = require('../public/js/animation');

router.use('[\/]',(req, res, next) => {
    console.log("MIDDLEWARE FOR ROOT ONLY");
    next();
});
/* GET home page. */
router.get('/', function(req, res, next) {
      console.log('RENDERING INDEX');
      fadeOut();
      res.render('index', {projects});
});

router.get('/about', (req, res, next) => {
    res.render('about');
});

//redirects to root if project ID is not specified
router.get('/projects?/', (req, res, next) => {
    res.redirect('/');
});

/* GET projects page. RegEx (?) added to check for 'project' or 'projects' */
router.get('/projects?/:id', function(req, res, next) {
  const projectId = req.params.id;
  const project = projects.find( ({ id }) => id === +projectId );
  console.log(`This is the project: ${project}`);

  if (project) {
    const thumbs = project.image_urls[1];
    return res.render('project', { project, thumbs });
  } else {
    const err = new Error(`Project ${projectId} doesn't exist! Not yet, anyway...`);
    res.render('error', {message: err.message});
  }
});

router.get('/:page', function(req, res, next) {
    const pageName = req.params.page;
    const err = new Error();
    err.status = 404;
    res.render('page-not-found', {message: `${err.status}. It looks like the page you typed in (${pageName}) doesn't exist.`});
  });

module.exports = router;