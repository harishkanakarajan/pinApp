export const deleteCurrentRow = (savedPins, pinData) => {
    var data = savedPins ? savedPins : []

    // Filtering out the current deleted index
    return data.savedPins.filter((row) => row.pin !== pinData.pin)    
}