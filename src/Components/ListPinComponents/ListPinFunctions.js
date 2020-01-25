export const deleteCurrentRow = (savedPins, pinData) => {
    var data = savedPins ? savedPins : []

    // Filtering out the current deleted index
    return data.savedPins.filter((row) => row.pin !== pinData.pin)
}

export const updateName = (savedPins, pinData, newName) => {
    var data = savedPins ? savedPins : []

    // Finds the index of current row
    const index = data.savedPins.findIndex((row) => row.pin === pinData.pin)

    // Assign value changed on to the main array
    data.savedPins[index].name = newName

    return data.savedPins
}