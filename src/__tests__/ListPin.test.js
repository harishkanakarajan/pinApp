import * as Common from '../Components/CommonComponents/Common'
import * as ListFunc from '../Components/ListPinComponents/ListPinFunctions';

describe('List Tab Validations', () => {

    test('PIN is not empty', () => {
        const state = {
            box_1: "1432",
        }

        let hasValue = Common.hasValue(state.box_1)
        expect(hasValue).toBe(true)
    })

    test('PIN is empty', () => {
        const state = {
            box_1: "",
        }

        let hasValue = Common.hasValue(state.box_1)
        expect(hasValue).toBe(false)
    })

    test('Verify Delete data', () => {
        const savedPins = {
            savedPins: [
                { name: "Pin 1", pin: "3465-0957-6795-0913-8926" },
                { name: "Pin 2", pin: "6415-0927-6595-0948-0526" },
                { name: "Pin 3", pin: "3965-0957-0795-0903-8538" }
            ]
        }
        const pinData = { name: "Pin 1", pin: "3465-0957-6795-0913-8926" }

        const expectedData = [
            { name: "Pin 2", pin: "6415-0927-6595-0948-0526" },
            { name: "Pin 3", pin: "3965-0957-0795-0903-8538" }
        ]

        // Call Delete function
        const remainingData = ListFunc.deleteCurrentRow(savedPins, pinData)
        expect(remainingData).toEqual(expectedData)
    })

    test('Verify Update Name data', () => {
        const savedPins = {
            savedPins: [
                { name: "New Pin", pin: "3465-0957-6795-0913-8926" },
                { name: "Pin 2", pin: "6415-0927-6595-0948-0526" },
                { name: "Pin 3", pin: "3965-0957-0795-0903-8538" }
            ]
        }
        const pinData = { name: "Updated Pin", pin: "3465-0957-6795-0913-8926" }

        const expectedData = [
            { name: "Updated Pin", pin: "3465-0957-6795-0913-8926" },
            { name: "Pin 2", pin: "6415-0927-6595-0948-0526" },
            { name: "Pin 3", pin: "3965-0957-0795-0903-8538" }
        ]

        // Call Delete function
        const updatedData = ListFunc.updateName(savedPins, pinData, "Updated Pin")
        expect(updatedData).toEqual(expectedData)
    })    
})