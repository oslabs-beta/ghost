// import request from 'supertest';
// import express from 'express';

// const app = new express();
// app.use('/', router);

// const request = require("supertest")
// request("https://icanhazdadjoke.com")
// .get('/slack')
// .end(function(err, res) {
// 	if (err) throw err;
// 	console.log(res.body.attachments);
// });

describe('Test Handlers', () => {
  test('responds to /function', () => {
    const req = { };
    const res = { lol: 'string', 
    // fuk: 'string',
      send: function(input) {
        this.lol = input
        // this.fuk = input
      }
    };
   lambdaController.getFunctions(req, res, next);

    expect(res.lol).toEqual('string')
    expect(res.fuk).toEqual('string')
    // const req = { };
    // const res = { text: '',
    //   send: function(input) {
    //     this.text = input
    //   }
    // };
    // index(req, res);
    // expect(res.text).toEqual('hello world!');
  });

  // test('responds to ur mom', () => {
  //   const req = { params: {} }
  // })
})

// import { index, hello } from '../routes/default.js';

// describe('Test Handlers', function () {

//     test('responds to /', () => {
//         const req = {  };

//         const res = { text: '',
//             send: function(input) { this.text = input } 
//         };
//         index(req, res);
        
//         expect(res.text).toEqual('hello world!');
//     });

//     test('responds to /hello/:name', () => {
//         const req = { params: { name: 'Bob' }  };

//         const res = { text: '',
//             send: function(input) { this.text = input } 
//         };
//         hello(req, res);
        
//         expect(res.text).toEqual('hello Bob!');
//     });

// });
