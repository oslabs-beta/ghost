const request = require('supertest');

const server = 'http://localhost:3000';

describe('Route integration', () => {
  //mainRouter
  describe('/function', () => {
    describe('', () => {
      
    })
  });

  // test('responds to /changeRegion', () => {
  //   const req = { };
  //   const res = {
  //     locals: {
  //       response: {
  //         functionName: "string",
  //         functionArn: "string"
  //       }
  //     }
  //   };
  //   lambdaController.getFunctions(req, res)
  //   expect(res.locals.functions.functionName).toEqual("string")
  // })

  // test('responds to /recent', () => {
  //   const req = { };
  //   const res = {
  //     locals: {
  //       functions: {
  //         functionName: "string",
  //         functionArn: "string"
  //       }
  //     }
  //   };
  //   lambdaController.getFunctions(req, res)
  //   expect(res.locals.functions.functionName).toEqual("string")
  // });

  test('responds to /custom', async () => {
    const res = await request(app).get('/custom');
    expect(res.locals.metricStats).toBe("");
    expect(res.status).toBe(200)
    // const req = {
    //   body: {
    //     startTime: "1/1/2022, 12:00:00 AM",
    //     endTime: "1/2/2022, 12:00:00 AM"
    //   }
    // };
    // const res = {
    //   locals: {
    //     metricStats: {
    //       Label: "green",
    //       Datapoints: "blue",
    //     }
    //   }
    // };
    // metricsController.getMetrics(req, res)
    // expect(res.locals.metricStats.Label).toEqual("green");
    // expect(res.locals.metricStats.Datapoints).toEqual("blue")
  });
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

  // test('responds to /cold', () => {
  //   const req = { };
  //   const res = {
  //     locals: {
  //       functions: {
  //         functionName: "string",
  //         functionArn: "string"
  //       }
  //     }
  //   };
  //   lambdaController.getFunctions(req, res)
  //   expect(res.locals.functions.functionName).toEqual("string")
  // })
})