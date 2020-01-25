import config from './config'

export const hasValue = (value) => {
    if (value === "" || value === undefined || value === false) {
        return false
    }
    return true
}

// Validate whether 2 digits are been repeated
export const validateConsecutiveDigits = (numArray) => {
    for (let i = 0; i < numArray.length - 1; i++) {
        if (numArray[i] === numArray[i + 1]) {
            return true
        } else {
            continue
        }
    }
    return false
}

// Validate value in ASC & DESC order
export const validateConsecutiveSequence = (numArray) => {
    var loopIndex = numArray.length % config.consecutiveSequence

    for (let i = 0; i <= loopIndex; i++) {
        if (parseInt(numArray[i]) + 1 === parseInt(numArray[i + 1]) && parseInt(numArray[i + 1]) + 1 === parseInt(numArray[i + 2])) {
            return true
        } else if (parseInt(numArray[i]) - 1 === parseInt(numArray[i + 1]) && parseInt(numArray[i + 1]) - 1 === parseInt(numArray[i + 2])) {
            return true
        } else {
            continue
        }
    }
    return false
}

// Validate PIN Already exists
export const pinAlreadyExists = (arrList, value) => {
    // Return false if no prior key is found in list
    if (!hasValue(arrList)) {
        return false
    }

    // Validates whether pin already exists in the saved pin list
    return arrList.some((row) => row.pin === value)
}

// Prepare valid numbers upfront to generate pin
export const prepareExcludeNumbers = () => {
    var validPins = []

    //Total exclusion between 1010 - 9899 is 2579
    for (let i = config.minPinValue; i <= config.maxPinValue; i++) {
        // Breaking the 4 digit pin into array
        var numArray = i.toString().split('')

        // Validate whether 2 digits are been repeated
        if (validateConsecutiveDigits(numArray)) {
            continue
        } else if (validateConsecutiveSequence(numArray)) {
            // Checking consective 3 or more ascending or descending digits in both ASC & DESC order
            continue
        } else {
            validPins.push(i)
        }
    }
    //console.log(validPins) - 6310
    return validPins
}