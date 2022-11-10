const lambdaController = require('../controllers/lambdaController');

// const testFunc = async (req, res, next) => {
//   lambdaController.getFunctions(req, res, next)
// }

describe('Testing lambdaController.getFunctions', () => {

  const req = { body: {}}
  const res = { locals: {} };
  const next = jest.fn()

  lambdaController.getFunctions(req, res, runAssertions);
  function runAssertions() {
    it('should return an array', () => {
      expect(typeof(res.locals.functions)).toBe('object')
    })
  }

  it('one test', () => {
    expect(5).toBe(5)
  })

})