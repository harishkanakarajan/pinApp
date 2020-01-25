import * as Common from '../Components/CommonComponents/Common'
import * as GenPinFunc from '../Components/GeneratePinComponents/GeneratePinFunctions'

/* Custom Handler to validate */
expect.extend({
    toBeWithinRange(received, floor, ceiling) {
      const pass = received >= floor && received <= ceiling;
      if (pass) {
        return {
          message: () =>
            `expected ${received} not to be within range ${floor} - ${ceiling}`,
          pass: true,
        };
      } else {
        return {
          message: () =>
            `expected ${received} to be within range ${floor} - ${ceiling}`,
          pass: false,
        };
      }
    },
  });

/* Generate Tab - Validations before PIN generation */
describe('Generate Tab - Validations before PIN generation', () => {
    test('Whether number has consecutive 2 digits', () => {
        let num = Common.validateConsecutiveDigits("1122");
        expect(num).toBe(true)
    })

    test('Whether number has consecutive 2 or more digits', () => {
        let num = Common.validateConsecutiveDigits("1112");
        expect(num).toBe(true)
    })    

    test('Whether number has consecutive 2 or more digits', () => {
        let num = Common.validateConsecutiveDigits("3465");
        expect(num).toBe(false)
    })        

    test('Whether number has consecutive sequence in ASC order', () => {
        let num = Common.validateConsecutiveSequence("1236");
        expect(num).toBe(true)
    })   

    test('Whether number has consecutive sequence in DESC order', () => {
        let num = Common.validateConsecutiveSequence("5431");
        expect(num).toBe(true)
    })       

    test('Generate a single 4 digit pin and validate', () => {
        const validPins = Common.prepareExcludeNumbers()
        const generatedPin = GenPinFunc.generateSinglePin(validPins)
        expect(generatedPin).toBeWithinRange(1010, 9898)
    })

})