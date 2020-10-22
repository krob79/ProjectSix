const express = require('express');
const router = express.Router();
const { projects } = require('../data.json');


/* GET home page. */
router.get('/', function(req, res) {
      res.render('index', {projects});
});

router.get('/about', (req, res) => {
    res.render('about');
});

//redirects to root if project ID is not specified
router.get('/projects?/', (req, res) => {
    res.redirect('/');
});

/* GET projects page. RegEx (?) added to check for 'project' or 'projects' */
router.get('/projects?/:id', function(req, res) {
  const projectId = req.params.id;
  const project = projects.find( ({ id }) => id === +projectId );

  if (project) {
    const thumbs = project.image_urls[1];
    return res.render('project', { project, thumbs });
  } else {
    const err = new Error();
    err.status = 404;
    console.log(`ERROR: ${err.status}. Project '${projectId}' doesn't exist! Not yet, anyway...`);
    res.render('error', {message: `${err.status}. Project '${projectId}' doesn't exist! Not yet, anyway...`});
  }
});

router.get('/favicon.ico', function(req, res) {
    res.sendFile("/static/favicon.io");
});

router.get('/:page', function(req, res) {
  const pageName = req.params.page;
  const err = new Error();
  err.status = 404;
  console.log(`Hey, ERROR: ${err.status}. It looks like the page you typed in (${pageName}) doesn't exist.`);
  res.render('page-not-found', {message: `${err.status}. It looks like the page you typed in (${pageName}) doesn't exist.`});
  
  });

module.exports = router;