const priceController = require('../controllers/priceController');

describe('Testing priceController.getEstimate', () => {

  const req = { body: {
    type: 'Arm',
    memorySize: 128,
    storage: 512,
    billedDurationAvg: 20000,
    invocationsTotal: 100000
  }}
  const res = { locals: {} };
  const next = jest.fn()

  it('should calculate correct cost', async () => {
    await priceController.getEstimate(req, res, next);
    expect(res.locals.cost).toBe(3.35)
  })

  it('should invoke the next middlware', async () => {
    await priceController.getEstimate(req, res, next);
    expect(next).toHaveBeenCalled();
  })

})