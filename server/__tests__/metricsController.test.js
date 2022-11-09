const express = require('express')
const supertest = require('supertest')

describe('Testing metricController', () => {
  it('testing metricsController.listMetrics', () => {
    const res = {}
  })
  // it('testing metricsController.getMetrics', () => {
  //   const res = 
  // })
})

// describe('Good Home Routes', function () {

//   test('responds to /', async () => {
//     const res = await request(app).get('/');
//     expect(res.header['content-type']).toBe('text/html; charset=utf-8');
//     expect(res.statusCode).toBe(200);
//     expect(res.text).toEqual('hello world!');
//   });
  
//   test('responds to /hello/:name', async () => {
//     const res = await request(app).get('/hello/jaxnode'); 
//     expect(res.header['content-type']).toBe('text/html; charset=utf-8');
//     expect(res.statusCode).toBe(200);
//     expect(res.text).toEqual('hello jaxnode!');
//   });

//   test('responds to /hello/Annie', async () => {
//     const res = await request(app).get('/hello/Annie'); 
//     expect(res.header['content-type']).toBe('text/html; charset=utf-8');
//     expect(res.statusCode).toBe(200);
//     expect(res.text).toEqual('hello Annie!');
//   });

// });