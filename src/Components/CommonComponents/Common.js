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
    if(!hasValue(arrList)) {
        return false
    }

    // Validates whether pin already exists in the saved pin list
    for(let i = 0;i<arrList.length;i++) {
        if(arrList[i].pin===value) {
            return true 
        }
    }

    return false
}