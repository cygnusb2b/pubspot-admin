/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const path = require('path');
const Funnel = require('broccoli-funnel');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  app.import(path.join(app.bowerDirectory, 'Ionicons/css/ionicons.min.css'));

  app.import(path.join(app.bowerDirectory, 'tether/dist/js/tether.min.js'));
  app.import(path.join(app.bowerDirectory, 'bootstrap/dist/js/bootstrap.min.js'));
  app.import(path.join(app.bowerDirectory, 'bootstrap/dist/css/bootstrap.min.css.map'), { destDir : 'assets' });

  app.import(path.join(app.bowerDirectory, 'datatables.net/js/jquery.dataTables.min.js'));

  app.import(path.join(app.bowerDirectory, 'datatables.net-bs4/js/dataTables.bootstrap4.min.js'));
  app.import(path.join(app.bowerDirectory, 'datatables.net-bs4/css/dataTables.bootstrap4.min.css'));

  // For whatever reason, this library is required for the Excel export via the DataTables HTML 5 buttons!
  app.import(path.join(app.bowerDirectory, 'jszip/dist/jszip.min.js'));

  app.import(path.join(app.bowerDirectory, 'datatables-buttons/js/dataTables.buttons.js'));
  app.import(path.join(app.bowerDirectory, 'datatables-buttons/js/buttons.html5.js'));
  app.import(path.join(app.bowerDirectory, 'datatables-buttons/js/buttons.bootstrap4.js'));

  app.import(path.join(app.bowerDirectory, 'highcharts/highcharts.js'));

  var icons = new Funnel(path.join(app.bowerDirectory, 'Ionicons/fonts'), {
    srcDir: '/',
    include: ['**/*.svg', '**/*.eot', '**/*.ttf', '**/*.woff'],
    destDir: '/fonts'
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree(icons);
};
