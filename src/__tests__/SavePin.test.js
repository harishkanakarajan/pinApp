import * as Common from '../Components/CommonComponents/Common'

/* Generate Tab - Save PIN Validations */
describe('Generate Tab - Save PIN Validations', () => {
    test('PIN Already exists',() => {
        const list = [
            {name: "Pin 1", pin: "3465-0957-6795-0913-8926"},
            {name: "Pin 2", pin: "6415-0927-6595-0948-0526"},
            {name: "Pin 3", pin: "3965-0957-0795-0903-8538"}
        ]

        const searchPin = "3965-0957-0795-0903-8538"
        let exists = Common.pinAlreadyExists(list, searchPin)
        expect(exists).toBe(true)
    })

    test('PIN Does not exists',() => {
        const list = [
            {name: "Pin 1", pin: "3465-0957-6795-0913-8926"},
            {name: "Pin 2", pin: "6415-0927-6595-0948-0526"},
            {name: "Pin 3", pin: "3965-0957-0795-0903-8538"}
        ]

        const searchPin = "3965-0907-0925-0903-8538"
        let exists = Common.pinAlreadyExists(list, searchPin)
        expect(exists).toBe(false)
    })    
})