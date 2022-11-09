const express = require('express')
const supertest = require('supertest')

const { request } = require('supertest')
const lambdaController = require('../controllers/lambdaController')
beforeAll(() => {
  
})

describe('Testing lambdaController', () => {
  it('testing lambdaController.getFunctions', () => {
    const req = { };
    const res = { params: { functionName: "string", functionArn: "string"} }
    lambdaController.getFunctions(req, res); //undefined
    expect(res.functionName).toBe("string");
  })
  // it('testing lambdaController.functionConfig', () => {
  //   const res = 
  // })
  // it('testing lambdaController.getPolicies', () => {
  //   const res = 
  // })
  // it('testing lambdaController.addPermission', () => {
  //   const res = 
  // })
})