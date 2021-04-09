/* eslint-disable max-len */
'use strict';

module.exports = (UserService) => {
    // Repositories
  const _userRepository = ()=>{ return  UserService.app.models.UserRepository; };
    // Models
  const _userModel = ()=>{ return  UserService.app.models.Client; };

  /**
   * Loguea un usuario
   * @param {*} username
   * @param {*} password
   */
  UserService.login = async (aUsername, aPassword) => {
    let token = await _userModel().login({username: aUsername, password: aPassword});
    let user = await _userRepository().findOne(token.userId);
    user['token'] = token.id;
    return user;
  };
  /**
   * Register an User
   * @param {*} aUsername
   * @param {*} aPassword
   * @param {*} aEmail
   */
  UserService.register = async (aUsername, aPassword, aEmail) => {
    return await _userRepository().createUser(aUsername, aPassword, aEmail);
  };

  /**
   * Sum operands
   * @param {*} operandA
   * @param {*} operandB
   * @returns
   */
  UserService.sum = async (operandA, operandB, user) => {
    return await _userRepository().saveSum(operandA, operandB, user.accessToken.$userId);
  };

  /**
   *
   * @param {*} aUserId
   * @returns
   */
  UserService.operations = async (aUserId) => {
    return await _userRepository().getOperations(aUserId);
  };
};
