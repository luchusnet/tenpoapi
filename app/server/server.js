/* eslint-disable max-len */
'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');
const helmet = require('helmet');
const csp = require('helmet-csp');

const app = module.exports = loopback();

/************************************************************************
*************************************************************************
**                             HELMET                                  **
*************************************************************************
************************************************************************/
app.use(helmet());

let directives;

switch (process.env.NODE_ENV) {
  case 'prod':
    directives = {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:'],
        frameSrc: ["'self'"],
        objectSrc: ["'none'"],
        fontSrc: ["'self'"],
        mediaSrc: ["'self'", 'data:'],
        sandbox: ['allow-forms', 'allow-scripts', 'allow-same-origin', 'allow-popups', 'allow-modals', 'allow-downloads'],
      },
    };
    break;
  default:
    directives = {
      directives: {
        defaultSrc: ["'self'", 'localhost:3000', 'localhost:4200'],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'netdna.bootstrapcdn.com'],
        imgSrc: ["'self'", 'data:'],
        frameSrc: ["'self'"],
        objectSrc: ["'none'"],
        fontSrc: ["'self'"],
        mediaSrc: ["'self'", 'data:', 'localhost:3000', 'localhost:4200'],
        sandbox: ['allow-forms', 'allow-scripts', 'allow-same-origin', 'allow-popups', 'allow-modals', 'allow-downloads'],
      },
    };
}

app.use(csp(directives));

app.start = function() {
  // autoupdate de las tablas
  var ds = app.dataSources.tenpodb;
  ds.autoupdate(function(err, result) {
    if (err) throw err;
  });
  return app.listen(function() {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

boot(app, __dirname, function(err) {
  if (err) throw err;
  if (require.main === module)
    app.start();
});
