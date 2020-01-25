const config = {
    maxLengthPin:  4,
    inputBoxes: [1,2,3,4,5],
    minPinValue: 1010, // As we know number starting from 1000 - 1009 has 2 zeros inbetween so excluding it from start number
    maxPinValue: 9898, // As we know number from 9899 - 9999 has 2 consecutive 9's so excluding it from end index
    consecutiveSequence: 3,
    successRes: "success",
    errorRes: "error",
    pinSavedSuccess: "PIN saved successfully",
    pinEmptyMsg: "Invalid/Empty PINS found. Kindly generate and save pin again",
    pinExistsMsg: "PIN already exists. Kindly regenerate",
    noPinGenerated: "No Pins generated yet. Kindly generate and save pin"
}

export default config;