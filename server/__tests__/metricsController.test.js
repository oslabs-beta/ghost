const express = require('express')
const supertest = require('supertest')
const metricsController = require('../controllers/metricsController')

describe('Testing metricController', () => {
  it('testing metricsController.listMetrics', () => {
    const req = {};
    const res = {};
    metricsController.listMetrics(req, res);
    expect(res).toEqual()
  })
  // it('testing metricsController.getMetrics', () => {
  //   const res = 
  // })
})
