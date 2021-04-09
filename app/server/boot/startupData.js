/* eslint-disable max-len */
'use strict';
/***
 * Script de inicilización de datos bases
 */
module.exports = function(app) {
  const Role = app.models['Role'];

  // Se crea el rol user
  Role.findOne({where: {name: 'user'}},
    function(err, role) {
      if (!role) {
        Role.create([
          {name: 'user', description: 'User role', created: new Date(), modified: new Date(), emailVerified: true},
        ], function(err, role) {
          if (err) return console.log(err);
        });
      }
    });
};
