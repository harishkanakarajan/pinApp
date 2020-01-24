import * as types from '../ActionTypes/Types'

export const saveGeneratedPins = (savedPins) => ({
    type: types.MATTR_SAVE_PINS,
    payload: savedPins,
})