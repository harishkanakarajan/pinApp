//import config from '../CommonComponents/config'

/* Generates a 4 digit pin for each input box */
export const generateSinglePin = (validPins) => {
    return validPins[Math.floor(Math.random() * validPins.length)]
}