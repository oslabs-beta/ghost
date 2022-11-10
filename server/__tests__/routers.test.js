const express = require('express');
const request = require('supertest');

const server = 'http://localhost:3000';

describe('Route integration', () => {
  describe('/main/functions', () => {
    describe('GET', () => {
      //mainRouter
      it('responds with status code 200 and application/json content type', () => {
        return request(server)
          .get('/main/functions')
          .expect(200)
          .expect('Content-Type', /application\/json/)
        
      });
      it('functionARN(string) and functionName(string) are in body of response', async () => {
        const response = await request(server)
          .get('/main/functions')
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              "functionARN": expect.any(String),
              "functionName": expect.any(String)
            })
          ])
        )
      })
    })
  })
  describe('/main/changeRegion', () => {
    describe('POST', () => {
      const newRegion = { region: "us-west-1" };

      it('responds with 200 status code and application/json content type', () => {
        return request(server)
          .post('/main/changeRegion')
          .send(newRegion)
          .expect('Content-Type', /application\/json/)
          .expect(200)
      })

      it('responds with region changed on success', () => {
        return request(server)
        .post('/main/changeRegion')
        .send(newRegion)
        .expect('Content-Type', /application\/json/)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual("region changed")
        })
      })

      it('responds with invalid region when region is invalid', () => {
        const invalidRegion = { region: "us-north-20" };
        return request(server)
        .post('/main/changeRegion')
        .send(invalidRegion)
        .expect('Content-Type', /application\/json/)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual("invalid region")
        })
      })
    })
  })
  describe('/metric/recent', () => {
    describe('POST', () => {
      const body = {
        "functionName": "spamTest",
      };

      it('responds with status code 200 and application/json content type', () => {
        return request(server)
          .post('/metric/recent')
          .send(body)
          .expect(200)
          .expect('Content-Type', /application\/json/)
      });

      it('a valid request returns a valid response', () => {
        return request(server)
        .post('/metric/recent')
        .send(body)
        .expect('Content-Type', /application\/json/)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                "requestId": expect.any(String),
                "duration": expect.any(String),
                "billedDuration": expect.any(String),
                "memorySize": expect.any(String),
                "maxMemoryUsed": expect.any(String),
                "initDuration": expect.any(String),
                "timestamp": expect.any(String)
              })
            ])
          );
        });
      });
      it('responds to invalid requests with 400 status and error message in body', () => {
        return request(server)
          .post('/metric/recent')
          .send({})
          .expect(400)
          .then((err, res) => {
            expect(err);
          });
      });
    });
  });

  describe('/metric/custom', () => {
    describe('POST', () => {
      const body = {
        functionName: "spamTest",
        startTime: "10/27/2022, 2:51:00 AM",
        endTime: "10/27/2022, 2:52:00 AM",
        metricName: "Invocations"
      };
      it('responds with 200 status code and application/json content type', () => {
        return request(server)
          .post('/metric/custom')
          .send(body)
          .expect('Content-Type', /application\/json/)
          .expect(200)
      });
      it('a valid request returns a valid response', () => {
        return request(server)
          .post('/metric/custom')
          .send(body)
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual(
              expect.objectContaining({
                "Label": expect.any(String),
                "Datapoints": expect.arrayContaining([
                  expect.objectContaining({
                    "Average": expect.any(Number),
                    "Maximum": expect.any(Number),
                    "Minimum": expect.any(Number),
                    "Sum": expect.any(Number),
                    "Timestamp": expect.any(String),
                    "Unit": expect.any(String)
                  })
                ])
              })
            )
          });
      });
      it('responds to invalid requests with 400 status and error message in body', () => {
        return request(server)
          .post('/metric/custom')
          .send({})
          .expect(400)
          .then((err, res) => {
            expect(err);
          });
      });
    });
  });

  describe('/metric/cold', () => {
    describe('POST', () => {
      const body = {
        functionName: "basicTest"
      }
      it('responds with status code 200 and application/json content type', () => {
        return request(server)
          .post('/metric/cold')
          .send(body)
          .expect(200)
          .expect('Content-Type', /application\/json/)
      });

      it('a valid request returns a valid response', () => {
        return request(server)
        .post('/metric/cold')
        .send(body)
        .expect('Content-Type', /application\/json/)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                "initDuration": expect.any(String),
                "timestamp": expect.any(String)
              })
            ])
          );
        });
      });
      it('responds to invalid requests with 400 status and error message in body', () => {
        return request(server)
          .post('/metric/cold')
          .send({})
          .expect(400)
          .then((err, res) => {
            expect(err);
          });
      });
    })
  })
  
  describe('/price/defaultConfig', () => {
    describe('POST', () => {
      const body = { functionName: "spamTest" }
      it('responds with 200 status code and application/json content type', () => {
        return request(server)
          .post('/price/defaultConfig')
          .send(body)
          .expect('Content-Type', /application\/json/)
          .expect(200)
      })
      it('a valid request returns a valid response', () => {
        return request(server)
          .post('/price/defaultConfig')
          .send(body)
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual(
              expect.objectContaining({
                "type": expect.any(String),
                "memorySize": expect.any(Number),
                "storage": expect.any(Number),
                "runtime": expect.any(String)
              })
            )
          })
      })
      it('responds to invalid requests with 400 status and error message in body', () => {
        return request(server)
          .post('/price/defaultConfig')
          .send({})
          .expect(400)
          .then((err, res) => {
            expect(err);
          });
      });
    });
  });

  describe('/price/calc', () => {
    describe('POST', () => {
      const body = {
        type: "x86_64",
        memorySize: 128,
        invocationsTotal: 10000000005,
        storage: 512,
        billedDurationAvg: 5
      }
      it('responds with 200 status code and application/json content type', () => {
        return request(server)
          .post('/price/calc')
          .send(body)
          .expect('Content-Type', /application\/json/)
          .expect(200)
      })
      it('a valid request returns a valid response', () => {
        return request(server)
          .post('/price/calc')
          .send(body)
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual(2104.17)
          })
      })
      it('responds to invalid requests with 400 status and error message in body', () => {
        return request(server)
          .post('/price/calc')
          .send({})
          .expect(400)
          .then((err, res) => {
            expect(err);
          });
      });
    });
  });

  describe('/price/history', () => {
    describe('POST', () => {
      const body = { functionName: "spamTest" }
      it('responds with 200 status code and application/json content type', () => {
        return request(server)
          .post('/price/history')
          .send(body)
          .expect('Content-Type', /application\/json/)
          .expect(200)
      })
      it('a valid request returns a valid response', () => {
        return request(server)
          .post('/price/history')
          .send(body)
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual(123.6)
          })
      })
      it('responds to invalid requests with 400 status and error message in body', () => {
        return request(server)
          .post('/price/defaultConfig')
          .send({})
          .expect(400)
          .then((err, res) => {
            expect(err);
          });
      });
    });
});

  describe('/permission/list', () => {
    describe('POST', () => {
      const body = { functionName: "spamTest" }
      it('responds with 200 status code and application/json content type', () => {
        return request(server)
          .post('/permission/list')
          .send(body)
          .expect('Content-Type', /application\/json/)
          .expect(200)
      })
      it('a valid request returns a valid response', () => {
        return request(server)
          .post('/permission/list')
          .send(body)
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  "statementId": expect.any(String),
                  "action": expect.any(String),
                  "resource": expect.any(String),
                  "principal": expect.any(String)
                })
              ])
            )
          })
      })
      it('responds to invalid requests with 400 status and error message in body', () => {
        return request(server)
          .post('/permission/list')
          .send({})
          .expect(400)
          .then((err, res) => {
            expect(err);
          });
      });
    });
  });

  describe('/log/logStreams', () => {
    describe('POST', () => {
      const body = { functionName: "spamTest" }
      it('responds with 200 status code and application/json content type', () => {
        return request(server)
          .post('/log/logStreams')
          .send(body)
          .expect('Content-Type', /application\/json/)
          .expect(200)
      })
      it('a valid request returns a valid response', () => {
        return request(server)
          .post('/log/logStreams')
          .send(body)
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  "arn": expect.any(String),
                  "streamName": expect.any(String)
                })
              ])
            )
          })
      })
      it('responds to invalid requests with 400 status and error message in body', () => {
        return request(server)
          .post('/log/logStreams')
          .send({})
          .expect(400)
          .then((err, res) => {
            expect(err);
          });
      });
    });
  });

  describe('/log/rawLogs', () => {
    describe('POST', () => {
      const body = {
        functionName: "spamTest",
        streamName: "2022/10/27/[$LATEST]c0e6d8e9c0e94bf497086a055159bd18"
      }
      it('responds with 200 status code and application/json content type', () => {
        return request(server)
          .post('/log/rawLogs')
          .send(body)
          .expect('Content-Type', /application\/json/)
          .expect(200)
      })
      it('a valid request returns a valid response', () => {
        return request(server)
          .post('/log/rawLogs')
          .send(body)
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  "ingestionTime": expect.any(Number),
                  "message": expect.any(String),
                  "timestamp": expect.any(Number)
                })
              ])
            )
          })
      })
      it('responds to invalid requests with 400 status and error message in body', () => {
        return request(server)
          .post('/log/rawLogs')
          .send({})
          .expect(400)
          .then((err, res) => {
            expect(err);
          });
      });
    });
  });

  describe('/log/parsedLogs', () => {
    describe('POST', () => {
      const body = {
        functionName: "spamTest",
        streamName: "2022/10/27/[$LATEST]c0e6d8e9c0e94bf497086a055159bd18"
      };

      it('responds with 200 status code and application/json content type', () => {
        return request(server)
          .post('/log/parsedLogs')
          .send(body)
          .expect('Content-Type', /application\/json/)
          .expect(200)
      });

      it('a valid request returns a valid response', () => {
        return request(server)
          .post('/log/parsedLogs')
          .send(body)
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  "requestId": expect.any(String),
                  "duration": expect.any(String),
                  "billedDuration": expect.any(String),
                  "memorySize": expect.any(String),
                  "maxMemoryUsed": expect.any(String),
                  "initDuration": expect.any(String),
                  "timestamp": expect.any(String)
                })
              ])
            );
          });
      });

      it('responds to invalid requests with 400 status and error message in body', () => {
        return request(server)
          .post('/log/parsedLogs')
          .send({})
          .expect(400)
          .then((err, res) => {
            expect(err);
          });
      });
    });
  });
})