/* eslint-disable max-len */
'use strict';

module.exports = (UserRepository) => {
  // Models
  const _userModel = ()=>{ return  UserRepository.app.models.Client; };
  const _roleModel = ()=>{ return  UserRepository.app.models.Role; };
  const _operationModel = ()=>{ return  UserRepository.app.models.Operation; };
  /**
   * Recupera un usuario
   * @param {*} userId
   */
  UserRepository.findOne = async (userId) => {
    return await _userModel().findOne({where: {id: userId}});
  };
  /**
   * Crea un usuario con rol USER
   * @param {*} aUsername
   * @param {*} aPassword
   * @param {*} aEmail
   */
  UserRepository.createUser = async (aUsername, aPassword, aEmail) =>{
    let newUser = await _userModel().create({username: aUsername, password: aPassword, email: aEmail, emailVerified: true, realm: 'user'});
    let role = await _roleModel().findOne({where: {principalType: _roleModel().USER}});
    await role.principals.create({principalType: 'user', principalId: newUser.id});
    return newUser;
  };

  /**
   *
   * @param {*} operandA
   * @param {*} operandB
   */
  UserRepository.saveSum = async (aOperandA, aOperandB, aUserId) => {
    let r = aOperandA + aOperandB;
    await _operationModel().create({operandA: aOperandA, operandB: aOperandB, result: r, userId: aUserId, modification: new Date()});
    return r;
  };

  /**
   *
   * @param {*} aUserId
   */
  UserRepository.getOperations = async (aUserId) => {
    return await _operationModel().find({where: {userId: aUserId}});
  };
};
