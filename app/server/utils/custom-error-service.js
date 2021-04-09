/* eslint-disable max-len */
'use strict';

module.exports = function(CustomErrorService) {
  CustomErrorService.response404 = (msg) => {
    let error =  new Error(msg);
    error.status = 404;
    return error;
  };
};
